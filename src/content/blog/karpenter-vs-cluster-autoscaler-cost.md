---
title: "Karpenter vs Cluster Autoscaler: The Real Cost Difference on EKS (2026)"
date: "2026-08-11"
description: "Karpenter vs Cluster Autoscaler on EKS: mechanics, Spot, and consolidation — where the documented 20–50% cost savings come from, and when the gap shrinks."
tags: ["AWS", "Kubernetes", "EKS", "Karpenter", "Cluster Autoscaler", "Cost Optimization", "FinOps", "DevOps"]
image: "./karpenter-vs-cluster-autoscaler-cost.webp"
faqs:
  - q: "Is Karpenter better than Cluster Autoscaler?"
    a: "For most EKS clusters, yes — Karpenter provisions right-sized instances directly from the EC2 API and continuously consolidates underused nodes, which Cluster Autoscaler doesn't do. But Cluster Autoscaler is still actively maintained, works on every cloud, and is perfectly adequate for small or homogeneous clusters. 'Better' here means a lower bill and faster scaling, not that the old tool is broken."
  - q: "How much money does Karpenter save compared to Cluster Autoscaler?"
    a: "Published third-party comparisons typically land in the 20–40% range for compute, and named case studies go higher: PicPay reported a 50% reduction in monthly costs and Vorwerk a 60% decrease in compute usage after adopting Karpenter on EKS. Your result depends on how heterogeneous your workloads are and how much waste consolidation can reclaim — a well-tuned homogeneous cluster will see far less."
  - q: "Should I use EKS Auto Mode or self-managed Karpenter?"
    a: "EKS Auto Mode runs Karpenter for you as a managed, off-cluster service, but adds a management fee of roughly 10–12% of the On-Demand instance price — and Savings Plans don't discount that surcharge. Small teams who don't want to operate the controller often come out ahead on total cost of ownership; larger fleets usually save more running Karpenter themselves and keeping the surcharge."
  - q: "Can Karpenter and Cluster Autoscaler run together?"
    a: "Yes, and that's the standard migration path. Cluster Autoscaler keeps managing your existing node groups while Karpenter NodePools take on new or migrated workloads, so you can move per-workload and roll back easily. Just make sure their scopes don't overlap — Karpenter should not provision for pods a node group already covers, or the two will fight over scale-down."
  - q: "Is Cluster Autoscaler deprecated?"
    a: "No. Cluster Autoscaler is maintained by Kubernetes SIG Autoscaling and still ships releases aligned with every Kubernetes version — 1.36 was tagged in 2026. AWS's default recommendation for EKS has clearly shifted to Karpenter and EKS Auto Mode, but Cluster Autoscaler remains supported, widely deployed, and the safer choice for multi-cloud consistency."
---

A client came to me last year with a familiar complaint. They'd "enabled autoscaling" on their EKS cluster six months earlier — Cluster Autoscaler, three managed node groups, the works. The cluster scaled up fine during the day and scaled down at night. Boxes ticked.

The bill hadn't moved. Not down 30%. Not down 10%. Basically flat.

The problem wasn't that autoscaling was broken. It was doing exactly what it was designed to do: adding and removing copies of the same `m5.2xlarge` from a fixed node group. Nobody had asked the harder question — whether those were the right nodes in the first place, and whether the pods spread across twelve of them could fit on seven. That question is the actual difference between **Cluster Autoscaler** and **Karpenter**, and it's worth real money.

## The short answer (for the skimmers and the AI answers)

**Both tools are free and open source — the cost difference is in the EC2 bill they leave behind. Karpenter typically cuts EKS compute costs by 20–40% versus a Cluster Autoscaler setup, because it picks right-sized instances per workload, actively consolidates underused nodes, and makes diverse Spot usage practical. Named case studies go higher — [PicPay reported 50%](https://aws.amazon.com/solutions/case-studies/picpay-eks-case-study) and [Vorwerk 60%](https://repost.aws/articles/AR5C03QTEyRgKoDI-XO5UC7w/optimizing-your-amazon-eks-compute-costs-with-karpenter). The caveat: if your workloads are homogeneous and your node groups are already well-tuned, the gap shrinks to single digits.**

That's the verdict. The rest of this article is where those numbers come from, when they *don't* apply to you, and how to migrate without a big-bang rewrite.

## Two tools, two completely different questions

Quick history, because it explains the design gap. [Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler) is the decade-old Kubernetes SIG Autoscaling project — cloud-agnostic, battle-tested, releases aligned to every Kubernetes version ([1.36 shipped in 2026](https://github.com/kubernetes/autoscaler/releases); no, it's not deprecated). Karpenter is AWS's answer to its limitations: [open-sourced in late 2021](https://aws.amazon.com/about-aws/whats-new/2021/11/aws-karpenter-v0-5/), [donated to the CNCF under SIG Autoscaling](https://www.cncf.io/blog/2024/11/06/karpenter-v1-0-0-beta/), and [GA with v1.0 in August 2024](https://aws.amazon.com/blogs/containers/announcing-karpenter-1-0). It's been boring, stable production software for two years now.

The mechanical difference is the whole story:

**Cluster Autoscaler asks: "Which of my node groups should get one more node?"** It watches for unschedulable pods, then increments the desired count on a pre-defined Auto Scaling Group. Every node group is a box you designed up front — instance type, AZ spread, labels — and CA can only add or remove identical copies within those boxes. The [EKS best practices guide](https://docs.aws.amazon.com/eks/latest/best-practices/cas.html) spells out the constraint: even with mixed instance policies, the instance types in a group must have roughly the same CPU, memory, and GPU shape, because CA assumes every node in a group is interchangeable. You can tune *which* box grows with [expanders](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md) like `--expander=least-waste` or `priority` — and you should — but you're always choosing among boxes you built last quarter.

**Karpenter asks: "What is the cheapest instance that fits these exact pending pods?"** No node groups. It reads the pod spec — CPU, memory, architecture, topology constraints — and calls the EC2 Fleet API directly to launch whatever fits best from the full instance catalog allowed by your `NodePool`. Pods needing 3 vCPUs get something shaped like 3 vCPUs, not two copies of whatever your node group happened to standardize on.

That's also why Karpenter is faster. Because it skips the ASG machinery, new capacity is typically usable in **under a minute**, versus the **several minutes** Cluster Autoscaler needs to poll, simulate, and wait for the node group to converge ([Cast AI's comparison](https://cast.ai/blog/karpenter-vs-cluster-autoscaler/) measures roughly 45–60 seconds vs 3–5 minutes). Speed isn't a cost line by itself, but it's what makes aggressive scale-down safe: you can run leaner headroom when replacement capacity arrives in seconds.

## Where the money actually comes from

Four mechanisms, in descending order of impact for most clusters I audit.

### 1. Consolidation — the feature Cluster Autoscaler simply doesn't have

This is the big one. Karpenter runs [continuous consolidation](https://karpenter.sh/docs/concepts/disruption/): it constantly checks whether the pods currently running could fit on fewer nodes, or on a *cheaper* node, and if so it drains and replaces — respecting your `PodDisruptionBudget`s and `do-not-disrupt` annotations while it does. It's active bin-packing of your whole fleet, all day, every day.

Cluster Autoscaler's scale-down is far more passive: it removes a node when the *requested* resources of its pods fall below a threshold of the node's capacity (50% by default) *and* those pods can be rehomed. It will never say "these four half-empty `m5.2xlarge`s should be two `m5.2xlarge`s," and it will never swap a node for a cheaper instance type. Given that the [average cluster runs around 10% CPU utilization](https://cast.ai/reports/kubernetes-cost-benchmark/), the difference between passively trimming empty-ish nodes and actively repacking the fleet is where most of the 20–40% lives.

### 2. Instance flexibility — right-sized and right-priced per workload

With CA, instance selection happened months ago, when someone designed the node groups. If your workloads have diverged since — and they always do — you're paying the mismatch tax on every node. Karpenter selects from hundreds of instance types at scheduling time, which also makes **Graviton adoption** trivial: allow `arm64` in the `NodePool`, and multi-arch workloads start landing on cheaper ARM instances with zero node-group redesign.

### 3. Spot handling that's actually operable

Both tools *can* use Spot, but the ergonomics differ enormously. With CA, Spot means maintaining parallel node groups and keeping their instance lists diversified by hand. Karpenter treats capacity type as just another constraint: one `NodePool` with `karpenter.sh/capacity-type: ["spot", "on-demand"]` and it diversifies across the widest possible set of pools, falls back to On-Demand when Spot is tight, and handles the two-minute interruption drain. Since v0.34 it also does [Spot-to-Spot consolidation](https://aws.amazon.com/blogs/compute/applying-spot-to-spot-consolidation-best-practices-with-karpenter/) — replacing a running Spot node with a cheaper Spot node when one appears (off by default behind a feature gate, because more churn means more interruptions; turn it on deliberately).

Given [Spot runs up to 90% below On-Demand](https://aws.amazon.com/ec2/spot/), making it *easy* to run 30–50% of your fleet on Spot is arguably Karpenter's single most valuable trait. [Tinybird's engineering write-up](https://www.tinybird.co/blog/how-we-cut-aws-costs-while-scaling-faster-with-eks-karpenter-and-spot-instances) is a good honest example: **20% off the overall AWS bill**, and **up to 90% on CI/CD workloads**, from the EKS + Karpenter + Spot combination.

### 4. Controlled, faster scale-down

Karpenter v1.0 added [disruption budgets by reason and a tunable `consolidateAfter`](https://aws.amazon.com/blogs/containers/announcing-karpenter-1-0), so you can allow aggressive repacking at night and near-zero disruption during business hours. The project has kept shipping since — [2025–2026 releases](https://github.com/kubernetes-sigs/karpenter/releases) added static capacity and capacity buffers for teams that need warm headroom. Practical upshot: you no longer have to choose between "consolidation saves money" and "consolidation restarts pods at noon." You schedule the savings.

## The real-world numbers (with receipts)

Numbers I'm comfortable citing, because they're published and attributable:

- **[PicPay](https://aws.amazon.com/solutions/case-studies/picpay-eks-case-study)** (Brazilian fintech, ~35M active users): **50% reduction in monthly costs** after modernizing on EKS with Karpenter — plus cluster upgrades down from 3 weeks to 2 hours.
- **[Vorwerk](https://repost.aws/articles/AR5C03QTEyRgKoDI-XO5UC7w/optimizing-your-amazon-eks-compute-costs-with-karpenter)** (via AWS's own write-up): a **60% decrease in compute usage** across environments with Karpenter consolidation and disruption budgets.
- **[Tinybird](https://www.tinybird.co/blog/how-we-cut-aws-costs-while-scaling-faster-with-eks-karpenter-and-spot-instances)**: **~20% off the total AWS bill**, up to **90% on CI/CD**, running 200+ microservices.
- Vendor-neutral-ish comparisons ([ScaleOps](https://scaleops.com/blog/karpenter-vs-cluster-autoscaler/), [Cast AI](https://cast.ai/blog/karpenter-vs-cluster-autoscaler/)) generally put the typical switch at **20–40% compute savings**.

Read those honestly, though. The headline cases combined Karpenter with Spot, Graviton, and right-sizing — Karpenter was the *enabler*, not the sole cause. Migrating the controller while keeping everything else identical yields the consolidation-and-fit savings, which is the lower end of the range. That's also why I treat the autoscaler as one lever among several in [my EKS cost-reduction playbook](/blog/reduce-eks-aws-costs-2026): the levers compound, and Karpenter is the machinery that makes the Spot and Graviton levers cheap to pull.

## When Cluster Autoscaler is actually fine

A fair comparison cuts both ways. I don't recommend a migration when:

- **Your workloads are homogeneous.** If everything is the same shape and a well-chosen instance type genuinely fits, per-pod instance selection has little to optimize. Tune `--expander=least-waste`, lower the scale-down thresholds, and move on.
- **You're multi-cloud and want one tool.** CA behaves consistently across AWS, GCP, and Azure. Karpenter is AWS-first — Azure has a [Karpenter-based node auto-provisioning](https://learn.microsoft.com/en-us/azure/aks/node-auto-provisioning) for AKS now, but the AWS provider is the mature one.
- **The cluster is small.** On a handful of nodes, the absolute savings may not repay the migration and the new operational surface (Karpenter runs as a controller *you* operate, with IAM roles, interruption queues, and CRDs to manage — unless you buy Auto Mode, next section).
- **Strict compliance pins your instance catalog.** If policy dictates exactly which instance types may run, you've deleted Karpenter's main degree of freedom.

Cluster Autoscaler is not deprecated, not abandonware, and not embarrassing to run in 2026. It's just optimizing for schedulability, while Karpenter optimizes for schedulability *and* cost.

## The EKS Auto Mode option: managed Karpenter, with a fee

Since re:Invent 2024, [EKS Auto Mode](https://docs.aws.amazon.com/eks/latest/best-practices/automode.html) runs Karpenter for you — as an off-cluster managed service, alongside managed nodes with automated AMI patching. You get Karpenter's cost behavior with none of the controller operations.

The trade-off is a **management fee of roughly 10–12% of the On-Demand instance price** per managed node, billed on top of EC2 ([pricing](https://aws.amazon.com/eks/pricing/), [breakdown](https://cast.ai/blog/eks-auto-mode/)) — and note that **Savings Plans and RIs discount only the EC2 portion, not the surcharge**. (If you run GPUs: AWS [cut Auto Mode fees on accelerated instances by 35–60% in July 2026](https://aws.amazon.com/about-aws/whats-new/2026/07/amazon-eks-auto-mode-gpu-price/), which changes that math meaningfully for ML fleets.)

My rule of thumb: for a small team with no platform engineer, Auto Mode's fee is often cheaper than the engineering time it replaces. At tens of thousands a month in compute, a ~12% skim on the fleet usually costs more than operating Karpenter yourself. Run the arithmetic on your actual bill — it's a 10-minute spreadsheet, and it's part of what I do in a [cost-optimization engagement](/services/cost-optimization).

## Migrating: run both, move per-workload

You don't flip a switch. The [official migration guide](https://karpenter.sh/docs/getting-started/migrating-from-cas/) has both tools coexisting, and that's how I do it in production:

1. **Install Karpenter alongside Cluster Autoscaler.** CA keeps managing the existing node groups; Karpenter starts with an empty `NodePool` scope.
2. **Move one workload class at a time.** Start with stateless, interruption-tolerant services. Migrate by taints/labels so pods land on Karpenter-managed capacity deliberately.
3. **Guardrails before consolidation.** `PodDisruptionBudget`s on everything that matters, `karpenter.sh/do-not-disrupt` on the truly sensitive, disruption budgets tightened for business hours.
4. **Shrink the old node groups as they empty.** Keep a small static group for cluster-critical add-ons (and for Karpenter's own controller) — it can't schedule itself.
5. **Retire CA** when the last legacy node group goes.

The two tools must not manage overlapping capacity — if Karpenter can provision for pods a CA node group also serves, they'll disagree about scale-down. Scoped correctly, side-by-side operation is uneventful, and every step is reversible.

## Karpenter vs Cluster Autoscaler at a glance

| Dimension | Cluster Autoscaler | Karpenter |
|---|---|---|
| Scaling model | Grows/shrinks pre-defined node groups (ASGs) | Provisions individual nodes from pending pods, via EC2 API |
| Instance selection | Fixed per node group, same shape within a group | Any allowed type/size/AZ/arch, chosen per workload at runtime |
| Provisioning speed | Typically [3–5 minutes](https://cast.ai/blog/karpenter-vs-cluster-autoscaler/) | Typically [under 60 seconds](https://cast.ai/blog/karpenter-vs-cluster-autoscaler/) |
| Consolidation / bin-packing | None — only removes underutilized nodes | Continuous: repacks fleet, replaces with cheaper nodes |
| Spot support | Separate node groups, manual diversification | Native: diversification, OD fallback, [spot-to-spot consolidation](https://aws.amazon.com/blogs/compute/applying-spot-to-spot-consolidation-best-practices-with-karpenter/) |
| Multi-cloud | AWS, GCP, Azure and more | AWS mature; [Azure provider](https://learn.microsoft.com/en-us/azure/aks/node-auto-provisioning) newer |
| Config surface | Node groups + flags (`--expander`, thresholds) | `NodePool` / `EC2NodeClass` CRDs, disruption budgets |
| Typical cost outcome | Baseline; tunable but structurally limited | **20–40% lower compute** typical; [50–60% in published cases](https://aws.amazon.com/solutions/case-studies/picpay-eks-case-study) |

## Frequently asked questions

### Is Karpenter better than Cluster Autoscaler?

For most EKS clusters in 2026, **yes** — it provisions right-sized instances directly from the EC2 API in under a minute and continuously consolidates underused nodes, which Cluster Autoscaler structurally can't. But "better" means a lower bill and faster scaling, not that CA is broken: it's still actively maintained, cloud-agnostic, and perfectly adequate for small or homogeneous clusters where there's little for per-pod instance selection to optimize.

### How much money does Karpenter save compared to Cluster Autoscaler?

Third-party comparisons typically land at **20–40% off compute**. Published case studies go higher — [PicPay reported a 50% reduction in monthly costs](https://aws.amazon.com/solutions/case-studies/picpay-eks-case-study) and [Vorwerk a 60% decrease in compute usage](https://repost.aws/articles/AR5C03QTEyRgKoDI-XO5UC7w/optimizing-your-amazon-eks-compute-costs-with-karpenter) — but those combined Karpenter with Spot and right-sizing. If your cluster is already tightly tuned and homogeneous, expect single digits, not headlines.

### Should I use EKS Auto Mode or self-managed Karpenter?

**EKS Auto Mode is managed Karpenter plus a fee** — roughly 10–12% of the On-Demand price per managed instance, and [Savings Plans don't discount the surcharge](https://aws.amazon.com/eks/pricing/). Small teams without a platform engineer often come out ahead on total cost of ownership; at larger spend, self-managed Karpenter usually wins because the surcharge outgrows the operational cost it replaces. Price it against your actual bill before deciding.

### Can Karpenter and Cluster Autoscaler run together?

**Yes — that's the recommended migration path.** Cluster Autoscaler keeps managing existing node groups while Karpenter `NodePool`s absorb workloads one class at a time, so every step is reversible. The one rule: don't let them manage overlapping capacity, or they'll fight over scale-down decisions. The [official migration guide](https://karpenter.sh/docs/getting-started/migrating-from-cas/) covers the coexistence setup.

### Is Cluster Autoscaler deprecated?

**No.** It's maintained by Kubernetes SIG Autoscaling, with [releases aligned to every Kubernetes version](https://github.com/kubernetes/autoscaler/releases) — 1.36 was tagged in 2026. AWS's default recommendation for EKS has shifted to Karpenter and EKS Auto Mode, but CA remains supported and widely deployed, and it's still the consistency play for multi-cloud shops.

---

The autoscaler swap is one lever. If you want the full stack — right-sizing, Spot, Graviton, Savings Plans, and the order to pull them in — start with the [complete 2026 EKS cost-reduction playbook](/blog/reduce-eks-aws-costs-2026), or have me [run your cluster properly](/services/kubernetes) end to end.

*I'm a DevOps and cloud cost engineer who does exactly this for a living: fixed-scope EKS and AWS cost audits that cut the bill 30–50% without touching reliability — Karpenter migrations included, runbook handed over. If your "autoscaled" cluster's bill looks suspiciously flat, [book a free 30-minute discovery call](https://cal.eu/alexpruteanu) and we'll find out where the money is going.*
