---
title: "How to Reduce EKS and AWS Costs 30–50% in 2026 (Without Hurting Reliability)"
date: "2026-08-08"
description: "A data-backed 2026 playbook to reduce EKS and AWS costs 30–50% — right-sizing, Karpenter, Graviton, Spot, and Savings Plans — without touching reliability."
tags: ["AWS", "Kubernetes", "EKS", "Cost Optimization", "FinOps", "DevOps", "Graviton", "Karpenter"]
image: "./reduce-eks-aws-costs-2026.webp"
faqs:
  - q: "How much can you realistically save on an EKS bill?"
    a: "For a cluster that has never been tuned, 30–50% off the compute bill is a realistic, sustainable target. The reason is structural: independent studies put the average Kubernetes cluster at roughly 10% CPU utilization, so most teams are paying for capacity they never use. Already-optimized clusters see less — often 10–20%."
  - q: "What is the single biggest lever to reduce Kubernetes costs?"
    a: "Right-sizing pod requests. Kubernetes provisions nodes based on the CPU and memory you request, not what you use. With average utilization near 10%, setting requests from real usage data is almost always the largest and lowest-risk saving, and it makes every later lever (consolidation, Spot, Savings Plans) cheaper."
  - q: "Are AWS Spot Instances safe for production?"
    a: "Yes, for interruptible workloads. Spot capacity can be reclaimed with a two-minute warning, so it is ideal for stateless services, batch jobs, CI, and many ML workloads — protected by Pod Disruption Budgets and multiple instance types. Keep databases, stateful singletons, and anything that can't tolerate interruption on On-Demand or Savings Plans."
  - q: "Does migrating to AWS Graviton require rewriting my application?"
    a: "Usually not. Graviton is ARM64, so you need multi-architecture container images, but most modern languages and base images already support ARM. The migration is typically rebuild-and-test rather than rewrite, and AWS advertises up to 40% better price-performance versus comparable x86 instances."
  - q: "What is the EKS extended support trap?"
    a: "When your cluster's Kubernetes version leaves standard support, EKS automatically moves it to extended support and the control-plane fee jumps from $0.10/hour to $0.60/hour — roughly $73 to $438 per month per cluster, a 6x increase. Staying on a supported version avoids the surcharge entirely."
---

It's the first of the month. Finance forwards you the AWS invoice with a single line: *"Is this normal?"* The number is bigger than last month. It was bigger than the month before that, too. Nobody shipped anything that should have doubled it — the bill just grows on its own, quietly, like it has a metabolism.

If that's you, here's the good news: most of that money is buying nothing. And you can prove it.

## The short version (for the skimmers and the AI answers)

**To reduce your EKS and AWS costs in 2026, work these levers in order of return: (1) right-size pod requests, (2) let Karpenter consolidate and bin-pack your nodes, (3) move eligible workloads to Graviton (ARM) and Spot, and (4) cover your stable baseline with a Compute Savings Plan.** For a cluster that has never been tuned, that stack lands most teams at **30–50% off the compute bill** — without touching reliability, because each lever removes waste rather than capacity.

The rest of this article is the *why* and the *how*, with the numbers to back every claim.

## Why the waste is structural, not accidental

You didn't misconfigure anything. Overprovisioning is the *default* state of a Kubernetes cluster, and the data is blunt about it.

Cast AI's [2025 Kubernetes Cost Benchmark](https://cast.ai/reports/kubernetes-cost-benchmark/) — built from 2,100+ organizations running real production clusters on AWS, GCP, and Azure — found the **average cluster uses just 10% of its provisioned CPU** (down from 13% the year before) and **23% of its memory**. That's not a rounding error. It means for every ten cores you're paying for, roughly nine are idle.

Zoom out and it's an industry-wide leak. Flexera's [2026 State of the Cloud report](https://www.flexera.com/blog/finops/) puts **wasted cloud spend at ~29%** — and 2026 was the first year in five that the number went *up*, not down, as AI and new services added complexity. The [FinOps Foundation's State of FinOps 2025](https://data.finops.org/2025-report/) survey agrees on the priority: **workload optimization and waste reduction is the #1 focus** for practitioners, ahead of everything else.

So the question isn't *whether* there's 30–50% to cut. For an untuned cluster, it's almost guaranteed. The question is how to cut it without becoming the person who caused an outage to save a few dollars.

## How much can you actually save? (Set expectations honestly)

Savings depend entirely on your starting point:

- **Never-tuned cluster** (on-demand x86, Cluster Autoscaler, requests copied from a tutorial): **30–50%** is realistic and sustainable.
- **Partially optimized** (some right-sizing, maybe Spot): **10–25%** left on the table.
- **Already lean** (Karpenter, Graviton, Savings Plans in place): single digits — and at that point you optimize *architecture*, not instances.

Anyone promising a fixed percentage sight-unseen is guessing. The levers below are ranked by return-on-effort, so you get the biggest wins first.

## Lever 1 — Right-size pod requests (the biggest, cheapest win)

Kubernetes schedules and scales on what you **request**, not what you **use**. Ask for 2 vCPU and use 0.2, and the scheduler dutifully reserves 2 vCPU of node capacity you'll never touch. Multiply across every pod and you get that 10% utilization number.

Fixing it costs nothing but attention:

- Pull actual usage (P95/P99 over 2–4 weeks) from Prometheus, [Kubecost/OpenCost](https://www.opencost.io/), or your APM.
- Set **requests** to real usage plus sane headroom. Set **limits** deliberately — CPU limits throttle, memory limits kill.
- Use the **Vertical Pod Autoscaler** in *recommendation* mode, or [Goldilocks](https://github.com/FairwindsOps/goldilocks), to generate right-sizing suggestions instead of eyeballing them.

This is the highest-leverage change you can make, and it's *reliability-neutral to reliability-positive* — right-sized pods pack more predictably and reduce noisy-neighbor contention. It also multiplies every later lever: a smaller footprint means fewer nodes to consolidate, fewer to run on Spot, and a smaller baseline to commit to.

## Lever 2 — Let Karpenter consolidate and bin-pack

Once requests are honest, you need something to actually *pack* pods onto fewer, cheaper nodes and remove the empties. That's [Karpenter](https://karpenter.sh/), AWS's open-source node autoscaler, and it's a step change from the old Cluster Autoscaler.

Instead of scaling fixed node groups, Karpenter looks at pending pods and provisions the *right* instance for the shape of the work — then continuously **consolidates**, moving pods onto cheaper or fuller nodes and terminating the rest. In production, consolidation routinely **reduces node counts by 30–50%**.

The case studies are consistent:

- **PicPay** cut EKS compute **over 50%** using Karpenter with spot-to-spot consolidation ([AWS case study](https://aws.amazon.com/solutions/case-studies/picpay-eks-case-study)).
- **Tinybird** reported ~20% lower AWS costs *while scaling faster* by pairing EKS, Karpenter, and Spot.

Reliability guardrails come built in: set **Pod Disruption Budgets**, use `do-not-disrupt` annotations for sensitive pods, and let Karpenter respect them during consolidation.

## Lever 3 — Move eligible workloads to Graviton (ARM)

AWS's [Graviton](https://aws.amazon.com/ec2/graviton/) processors are ARM-based and cheaper per unit of work than comparable Intel/AMD instances — AWS advertises **up to 40% better price-performance**, and the current Graviton4 generation is roughly **30% faster than Graviton3**. Real-world migrations commonly land in the **20–30% cost-reduction** range for the moved fleet.

The catch is architecture, not effort: Graviton runs ARM64, so you need **multi-arch container images**. In 2026 that's mostly a solved problem — most official base images and modern language runtimes ship ARM builds, so it's usually a rebuild-and-test, not a rewrite. Build multi-arch with `docker buildx`, roll out behind a canary, and keep an x86 node pool for the occasional dependency that isn't ARM-ready yet.

## Lever 4 — Put interruptible work on Spot (up to 90% off)

[Spot Instances](https://aws.amazon.com/ec2/spot/) are spare AWS capacity at **up to 90% off On-Demand**. The trade-off: AWS can reclaim them with a **two-minute warning**. That makes Spot perfect for anything interruption-tolerant and a bad idea for anything that isn't.

**Good on Spot:** stateless web/API services (behind a load balancer with several replicas), batch and data pipelines, CI/CD runners, and most ML training/inference that can checkpoint.

**Keep off Spot:** primary databases, stateful singletons, and anything where losing a node mid-request corrupts state.

Karpenter is what makes Spot safe at scale: give it a **diverse set of instance types** so AWS can't reclaim your whole fleet at once, and let it drain and reschedule gracefully on the interruption signal. Diversification plus PDBs is the difference between "90% cheaper" and "90% cheaper *and* nobody noticed."

## Lever 5 — Cover the stable baseline with Savings Plans

Right-sizing, Spot, and Graviton shrink your bill. **Savings Plans** discount what's *left*. In exchange for a 1- or 3-year commit to a steady hourly spend, AWS gives you:

- **Compute Savings Plans** — up to **66% off**, and the flexible option: they apply across instance families, regions, EC2, Fargate, and Lambda.
- **EC2 Instance Savings Plans** — up to **72% off**, but locked to an instance family in a region.

The sequencing matters: **optimize first, commit second.** Right-size and consolidate *before* you buy a Savings Plan, or you'll lock in a commitment to waste you were about to delete. Commit to the floor of your usage — the baseline you're confident you'll run 24/7 — and leave the spiky top on On-Demand or Spot. Savings Plans carry **zero reliability impact**: it's a billing construct, not an infrastructure change.

## Lever 6 — Stop bleeding on storage

Storage waste is quiet and constant:

- **Switch gp2 volumes to gp3.** gp3 is about **20% cheaper per GB** ($0.08 vs $0.10/GiB-month) and includes **3,000 IOPS and 125 MiB/s baseline for free**, with performance you can scale independently of size. See [EBS volume types](https://aws.amazon.com/ebs/volume-types/). Migrating is an online modify — no downtime.
- **Delete orphaned EBS volumes and stale snapshots.** Unattached volumes bill at full rate forever. In Kubernetes, set `reclaimPolicy: Delete` on non-critical StorageClasses so PVs don't outlive their pods.
- **Add S3 lifecycle policies** to move cold data to cheaper tiers instead of paying Standard rates for logs nobody reads.

## Lever 7 — The EKS-specific traps

Two line items are unique to EKS and catch almost everyone:

**The control-plane tax.** Every EKS cluster costs **$0.10/hour (~$73/month)** for the control plane before a single pod runs ([EKS pricing breakdown](https://www.cloudzero.com/blog/eks-pricing/)). Run a cluster per team per environment and that overhead compounds fast. Consolidate low-traffic environments with **namespaces and RBAC** instead of spinning up a new cluster for every boundary.

**The extended-support 6x jump.** When your Kubernetes version ages out of standard support, EKS *automatically* moves the cluster to extended support and the fee leaps from **$0.10 to $0.60/hour — about $73 to $438/month per cluster** ([AWS extended support pricing](https://aws.amazon.com/blogs/containers/amazon-eks-extended-support-for-kubernetes-versions-pricing/)). It's the single most expensive way to procrastinate. **Keep a routine upgrade cadence** and this line item stays at zero.

One more: **EKS Auto Mode** is genuinely convenient, but it adds roughly a **12% management surcharge** on top of your EC2 cost — and Savings Plans discount only the underlying EC2, not the surcharge. Worth it for small teams who want AWS to run the data plane; worth pricing out before you assume it's free.

## Lever 8 — Networking, the invisible line item

Data transfer and NAT don't show up in your mental model, but they show up on the invoice:

- A **NAT Gateway** costs **$0.045/hour (~$32.40/month)** *plus* **$0.045/GB processed**. Pull large images or ship logs to the internet through it and the per-GB charge dwarfs the hourly one. Use **VPC endpoints** for S3, ECR, and other AWS services to route around the NAT entirely.
- **Cross-AZ traffic** costs **$0.01/GB in each direction**. A chatty service mesh spread across three AZs pays a tax on every hop. Use **topology-aware routing** to keep traffic in-zone where you safely can.

*(AWS added a Regional NAT Gateway mode in late 2025 that auto-spans AZs — handy operationally, but you still pay per-AZ-hour, so it's not a discount. Measure before you migrate.)*

## How the levers stack to 30–50%

The levers **compound** — each one works on the bill the previous one left behind. Here's an illustrative cluster starting at **$100,000/month** in compute (on-demand x86, Cluster Autoscaler, ~10% utilization). Your numbers will differ; the *shape* is what matters:

| Step | Action | Effect | Running monthly spend |
|------|--------|--------|----------------------|
| 0 | Starting point | — | $100,000 |
| 1 | Right-size requests + Karpenter consolidation | −25% | $75,000 |
| 2 | Shift interruptible workloads (~35% of fleet) to Spot | −18% | $61,500 |
| 3 | Migrate the On-Demand remainder to Graviton | −8% | $56,580 |
| 4 | Compute Savings Plan on the stable baseline | −12% | ~$49,800 |

**Net: ~50% off**, and every dollar came from removing waste — idle capacity, overpriced instances, uncommitted baseline — not from removing redundancy. A partially-tuned cluster starts further down this table and lands closer to 30%. Either way, the reliability posture is the same or better than where you started.

## The 30-day sequence

Don't do everything at once. Order matters, because each step makes the next one cheaper and safer:

1. **Week 1 — Measure.** Stand up Kubecost/OpenCost. Find your real utilization and your top 10 cost centers. You can't cut what you can't see.
2. **Week 2 — Right-size.** Apply VPA/Goldilocks recommendations to your biggest workloads. Bank the easy win first.
3. **Week 3 — Automate the nodes.** Roll out Karpenter with consolidation, a diverse instance set, and PDBs. Introduce Spot for clearly interruptible workloads.
4. **Week 4 — Commit and clean up.** *Now* that usage is stable, buy a Compute Savings Plan for the baseline. Migrate gp2→gp3, delete orphaned volumes, add VPC endpoints.

Measure, cut, automate, commit — in that order.

## The one rule that keeps it safe

Every lever here shares a property: **it removes waste, not resilience.** Right-sizing keeps headroom. Spot only touches workloads built to lose a node. Savings Plans are pure billing. Consolidation respects disruption budgets. That's the whole reason a 30–50% cut doesn't cost you a single nine of availability — you're not trimming muscle, you're draining the water weight your cluster has been carrying since day one.

## Frequently asked questions

### How much can you realistically save on an EKS bill?

For a cluster that has never been tuned, **30–50% off the compute bill** is a realistic, sustainable target. The reason is structural: independent studies put the average Kubernetes cluster at roughly **10% CPU utilization**, so most teams are paying for capacity they never use. Already-optimized clusters see less — often 10–20%.

### What is the single biggest lever to reduce Kubernetes costs?

**Right-sizing pod requests.** Kubernetes provisions nodes based on the CPU and memory you *request*, not what you use. With average utilization near 10%, setting requests from real usage data is almost always the largest and lowest-risk saving — and it makes every later lever (consolidation, Spot, Savings Plans) cheaper.

### Are AWS Spot Instances safe for production?

Yes, **for interruptible workloads**. Spot capacity can be reclaimed with a two-minute warning, so it's ideal for stateless services, batch jobs, CI, and many ML workloads — protected by Pod Disruption Budgets and a diverse set of instance types. Keep databases, stateful singletons, and anything that can't tolerate interruption on On-Demand or Savings Plans.

### Does migrating to AWS Graviton require rewriting my application?

Usually not. Graviton is ARM64, so you need **multi-architecture container images**, but most modern languages and base images already support ARM. It's typically a rebuild-and-test, not a rewrite — and AWS advertises up to 40% better price-performance versus comparable x86 instances.

### What is the EKS extended-support trap?

When your cluster's Kubernetes version leaves standard support, EKS automatically moves it to extended support and the control-plane fee jumps from **$0.10/hour to $0.60/hour** — roughly **$73 to $438 per month per cluster**, a 6x increase. Staying on a supported version avoids the surcharge entirely.

---

*I'm a DevOps and cloud cost engineer who does exactly this for a living: fixed-scope EKS and AWS cost audits that cut the bill 30–50% without touching reliability — and I hand you the runbook so it stays cut. If your AWS bill is growing faster than your revenue, [book a free 30-minute discovery call](https://cal.eu/alexpruteanu) and we'll find the waste together.*
