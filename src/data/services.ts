export interface ServiceFaq {
  q: string;
  a: string;
}

export type ServiceCategory = 'devops' | 'product';

export interface Service {
  slug: string;
  category: ServiceCategory;
  nav: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  problems: string[];
  deliverables: string[];
  outcome: string;
  faqs: ServiceFaq[];
  /** Inner SVG markup for the thematic icon, drawn on a 24x24 viewBox */
  icon: string;
}

export const SERVICES: Service[] = [
  {
    slug: 'cloud-migration',
    category: 'devops',
    nav: 'Cloud migration',
    title: 'Cloud Migration Consulting',
    description:
      'Cloud migration consulting that moves you to AWS or GCP piece by piece — production stays up, no risky big-bang rewrite. Typically cheaper than what it replaces.',
    h1: 'Cloud migration without the downtime',
    lead: "Get onto AWS or GCP without betting the business on a big-bang weekend. I move what's worth moving, skip what isn't, and keep production running the whole way.",
    problems: [
      'Your servers are aging, costs are creeping, or a data-center lease is ending.',
      "You tried 'move everything at once' before — or you're scared to.",
      'Nobody on the team has migrated production at scale before.',
    ],
    deliverables: [
      'A staged migration plan — lowest-risk first, with a rollback at every step. No big-bang weekend.',
      'A multi-account AWS setup (separate prod, dev, and security accounts) so a mistake in dev can never touch production and costs are traceable per team.',
      'A network that scales: Transit Gateway hub-and-spoke instead of a tangle of VPC peering, private subnets for apps and data, and VPC endpoints so AWS traffic never crosses the public internet.',
      'Defense in depth from day one — IAM roles instead of access keys, GuardDuty and Security Hub watching, and KMS encryption on everything.',
      'Everything rebuilt as Terraform with remote state and locking — reproducible, reviewable, and rebuildable, not hand-clicked in a console.',
      'Multi-AZ so a single Amazon data center can fail without taking you down, plus backups that are actually tested.',
      'Your team trained and the setup documented — no permanent dependency on me.',
    ],
    outcome:
      'Most migrations finish without users noticing — and usually cheaper than the thing they replaced.',
    icon: '<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6-1.5A4 4 0 0 0 6 19z"/><path d="M12 16.5v-5.5"/><path d="m9.3 13 2.7-2.7 2.7 2.7"/>',
    faqs: [
      {
        q: 'Will there be downtime?',
        a: 'Not the planned kind. We move incrementally and keep the old environment live until the new one is proven, with a rollback at every step.',
      },
      {
        q: 'Lift-and-shift or full re-architecture?',
        a: 'Whichever pays off — often a pragmatic mix: lift the boring parts, re-architect only what clearly benefits.',
      },
      {
        q: 'Do you just set up one AWS account?',
        a: 'No. A single account for everything is a rookie mistake. Separate prod, dev, and security accounts contain the blast radius of any mistake and make costs traceable per team — enforced with Control Tower guardrails.',
      },
    ],
  },
  {
    slug: 'kubernetes',
    category: 'devops',
    nav: 'Kubernetes',
    title: 'Kubernetes Consulting',
    description:
      'Production Kubernetes consulting: EKS/GKE clusters that scale on demand and shrink with your bill via Karpenter — without the YAML sprawl. Plus an honest answer on whether you need it.',
    h1: 'Kubernetes, only where it earns its keep',
    lead: "Production-grade clusters that scale when traffic spikes and shrink (with the bill) when it doesn't — minus the thousands of lines of YAML nobody understands.",
    problems: [
      'Your clusters are over-provisioned and the bill shows it.',
      'Deploys are fragile, and only one person understands the Helm charts.',
      "You're not sure you even needed Kubernetes — but here you are.",
    ],
    deliverables: [
      'An honest answer first: if managed services or a handful of containers do the job, you will hear that — Kubernetes goes in only when your scale or team size earns it.',
      'Right-sized workloads based on real 95th-percentile usage from Prometheus, not guesses. Most clusters idle near 10% CPU — you are paying for the rest.',
      'Karpenter autoscaling that mixes spot and on-demand (stateless workloads run ~70% cheaper on spot), provisions nodes in seconds, and consolidates the idle ones.',
      'Non-negotiable health probes — liveness, readiness, and startup — so a broken pod leaves the load balancer instead of quietly serving errors.',
      'Hardened containers: distroless images (~80× smaller than Ubuntu, tiny attack surface), non-root, read-only root filesystem, dropped Linux capabilities, and Trivy scanning that fails the build on critical CVEs.',
      'Zero-trust networking with network policies (Cilium), Pod Security Standards set to "restricted", and secrets in Secrets Manager or Vault — never environment variables.',
      'GitOps with ArgoCD: the cluster always matches git, every change is a commit, and rollback is a git revert.',
    ],
    outcome: "Clusters that cost less, recover on their own, and don't need a babysitter.",
    icon: '<path d="M12 2.5 20 7v10l-8 4.5L4 17V7z"/><path d="M12 7v5l4 2"/><path d="m12 12-4 2"/>',
    faqs: [
      {
        q: 'Do I actually need Kubernetes?',
        a: "Maybe not. If managed services or a few containers do the job, I'll tell you — and save you the operational tax.",
      },
      {
        q: 'EKS or GKE?',
        a: 'Both work. I pick based on where your team and the rest of your stack already live.',
      },
      {
        q: 'How do you keep the containers secure?',
        a: 'Distroless images with no shell or package manager, running non-root on a read-only filesystem with Linux capabilities dropped, plus image scanning in CI. If something ever gets remote code execution, there is nothing inside to exploit — that is the difference between an incident and a catastrophe.',
      },
    ],
  },
  {
    slug: 'cost-optimization',
    category: 'devops',
    nav: 'Cost & reliability',
    title: 'Cloud Cost Optimization',
    description:
      'Cloud cost optimization consulting. Cut your AWS or GCP bill with ARM/Graviton, right-sizing, and autoscaling — without hurting reliability. Typical savings 20–40%.',
    h1: 'Cut your cloud bill, keep the reliability',
    lead: 'Find the line items quietly draining your budget, cut them, and make sure nothing breaks in the process. Boring, reliable, and cheaper.',
    problems: [
      "Your cloud bill keeps climbing and nobody's sure why.",
      "Finance is asking questions you can't answer line by line.",
      "You suspect you're paying for idle capacity — but cutting it feels risky.",
    ],
    deliverables: [
      'A line-by-line breakdown by team and project (proper tagging plus Cost Explorer) so you finally know where the money actually goes.',
      'Right-sizing the overprovisioned instances — the m5.2xlarge sitting at 5% CPU — usually the fastest win on the bill.',
      'ARM/Graviton and Spot for stateless workloads (~70% cheaper), plus Savings Plans and Reserved Instances for steady load (20–60% off on-demand).',
      'S3 Intelligent-Tiering so cold data drifts to cheaper storage on its own — up to 95% off on archive, no manual policies to babysit.',
      'Autoscaling that actually scales down, and to zero, when load drops.',
      'Reliability kept intact: Multi-AZ, read replicas, health checks, and CloudWatch/X-Ray observability. Cheaper, not flakier.',
    ],
    outcome: 'Often 20–40% off the bill — without adding a single 3am page.',
    icon: '<path d="M4.5 3.5v8"/><rect x="3" y="5.5" width="3" height="4" rx="0.4"/><path d="M9.5 6v9.5"/><rect x="8" y="8" width="3" height="5" rx="0.4" fill="currentColor"/><path d="M14.5 9v9.5"/><rect x="13" y="11" width="3" height="5" rx="0.4"/><path d="M19.5 12v8.5"/><rect x="18" y="14" width="3" height="5" rx="0.4" fill="currentColor"/>',
    faqs: [
      {
        q: 'Will cutting costs hurt reliability?',
        a: "That's the whole point — I cut waste, not safety margins. Reliability often improves because the setup gets simpler.",
      },
      {
        q: 'What savings are realistic?',
        a: 'It varies, but 20–40% is common when ARM, Spot, Savings Plans, and right-sizing have not been used yet. Spot alone is ~70% off for stateless workloads; reserved RDS runs 35–60% off.',
      },
      {
        q: 'Where do the savings usually come from?',
        a: 'Mostly the boring stuff: right-sizing overprovisioned instances, moving stateless workloads to ARM and Spot, committing steady load to Savings Plans, and turning off what sits idle.',
      },
    ],
  },
  {
    slug: 'cicd-iac',
    category: 'devops',
    nav: 'CI/CD & IaC',
    title: 'CI/CD & Infrastructure as Code',
    description:
      'CI/CD and Infrastructure as Code consulting. Boring, repeatable deployments and Terraform-managed infrastructure that is reviewed, versioned, and rebuildable from scratch.',
    h1: 'Make shipping a non-event',
    lead: 'You push, it deploys, everyone moves on. Your whole setup lives in Terraform — reviewed, versioned, and rebuildable from scratch.',
    problems: [
      'Deploys are manual, stressful, or done by one person on a good day.',
      "Your infrastructure exists only in someone's head or the cloud console.",
      'Rollbacks mean panic instead of a button.',
    ],
    deliverables: [
      'CI/CD pipelines (GitHub Actions, GitLab, or Jenkins) that build, test, scan, and deploy on push — with Trivy failing the build on critical CVEs before anything reaches production.',
      'Zero-downtime rolling deploys done properly: maxSurge/maxUnavailable tuned, connection draining, and graceful SIGTERM handling — so instances cycle out without dropping requests, even under load.',
      'Safe schema changes with the expand-contract pattern, so database migrations never break the version still running mid-rollout.',
      'All infrastructure as Terraform — remote state in S3 with DynamoDB locking, a separate directory per environment (never workspaces), plan on every PR, and a manual approval to apply.',
      'OIDC instead of long-lived cloud keys, secrets in Secrets Manager (never committed), and least-privilege IAM so the pipeline can not nuke production.',
      'Docs and handover so any engineer can ship — not just the one who built it.',
    ],
    outcome: 'Shipping becomes routine — and your infrastructure can be rebuilt from a git repo.',
    icon: '<path d="M3.5 12a8.5 8.5 0 0 1 14.4-6.2"/><path d="M18.5 2.5v3.6h-3.6"/><path d="M20.5 12a8.5 8.5 0 0 1-14.4 6.2"/><path d="M5.5 21.5v-3.6h3.6"/>',
    faqs: [
      {
        q: 'Which CI/CD tools do you use?',
        a: "Whatever fits your stack — GitHub Actions, GitLab CI, CircleCI, or Jenkins. I don't force a favorite.",
      },
      {
        q: 'Terraform or something else?',
        a: "Usually Terraform for its ecosystem and portability, but I'll work with what you already run if it is sound.",
      },
      {
        q: 'How do you deploy without downtime?',
        a: 'Rolling updates with maxSurge 1 and maxUnavailable 0, readiness probes that gate traffic, and connection draining, so instances cycle out without dropping requests. Blue-green or canary when a change warrants it.',
      },
    ],
  },
  {
    slug: 'ai-app-audit',
    category: 'product',
    nav: 'AI-app audit',
    title: 'AI-Built App Audit & Rescue',
    description:
      'Audit and harden apps built with Cursor, Claude, or Copilot. Find the security holes and architectural landmines AI leaves behind — before they cost you.',
    h1: 'Your AI-built app, audited and de-risked',
    lead: "Shipped something built mostly by Cursor, Claude, or Copilot and quietly worried it'll fall over? I find the security holes and architectural landmines AI tools leave behind — and tell you exactly what to fix, in plain English.",
    problems: [
      'Most of your codebase was written by an AI, and nobody senior has actually read it.',
      "It demos fine, but you can't tell if it's secure, scalable, or a house of cards.",
      "You're about to take payments, user data, or investment on top of it.",
    ],
    deliverables: [
      "A full audit of the AI-generated code — security, architecture, data model, and the 'big decisions' AI tends to get subtly wrong.",
      'A prioritized findings report (critical → nice-to-have) in plain language, with the real-world risk of each item spelled out.',
      'Security review: authentication, authorization, secrets, input validation, injection, exposed data, and dependency CVEs.',
      "Architecture review: does the structure hold up, or will it need a rewrite at 10× the users?",
      'Fixes on request — I remediate the critical findings myself, or hand your team a clear plan. Your call.',
    ],
    outcome: "You find out whether you're sitting on a solid app or a liability — before your users, or an attacker, do.",
    icon: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-5-5"/><path d="m7.8 10.6 2 2 3.4-3.4"/>',
    faqs: [
      {
        q: "Which AI tools' code do you audit?",
        a: 'All of them — Cursor, Claude Code, GitHub Copilot, ChatGPT, v0, Lovable, whatever built it. The failure patterns are similar regardless of which model wrote it.',
      },
      {
        q: 'What do you usually find?',
        a: "Industry audits through 2025–2026 turned up at least one critical or high-severity issue in essentially every AI-built codebase, and I look for the same: exposed secrets, missing authorization checks, naive data models, and architecture that won't survive real traffic. You get a clear, prioritized list of what's actually risky.",
      },
      {
        q: 'Do you just report, or fix it too?',
        a: 'Either. You get the report regardless; I can remediate the critical items myself or guide your team through them.',
      },
    ],
  },
  {
    slug: 'architecture-review',
    category: 'product',
    nav: 'Architecture review',
    title: 'Software Architecture Review',
    description:
      'An honest second opinion on your software architecture — what scales, what breaks, and what to fix before it gets expensive. Backed by building an end-to-end encrypted app from a single cross-platform codebase myself.',
    h1: 'Is your architecture built to last?',
    lead: "A clear-eyed second opinion on how your system is built — what holds up, what breaks at scale, and what's quietly going to cost you. No dogma, just trade-offs.",
    problems: [
      "You're not sure your architecture will survive 10× the users — or next quarter.",
      "Every feature takes longer than the last, and nobody's sure why.",
      "You're choosing between a monolith and microservices and getting religion instead of answers.",
    ],
    deliverables: [
      'A review of your architecture against where the business is actually going — not a textbook ideal.',
      'Honest calls on the big decisions: monolith vs microservices, data model, service boundaries, sync vs async.',
      "The 'ball of mud' check — where coupling is quietly making every change harder and riskier.",
      'A prioritized list of what to fix now, what to watch, and what to leave alone — over-engineering costs too.',
      'Patterns that fit your team size and stage: boring and maintainable over clever.',
    ],
    outcome: 'You stop guessing about your foundation and get a clear, prioritized path — keep what works, fix what matters.',
    icon: '<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>',
    faqs: [
      {
        q: 'Monolith or microservices?',
        a: 'Usually a well-structured monolith until you have real evidence you need to split — separate teams stepping on each other, wildly different scaling needs. You can split a clean monolith in days; you cannot untangle a ball of mud without a rewrite.',
      },
      {
        q: 'Will you tell me to rewrite everything?',
        a: 'Almost never. Rewrites are where projects go to die. I find the few changes that buy the most and leave the rest alone.',
      },
    ],
  },
  {
    slug: 'idea-to-production',
    category: 'product',
    nav: 'Idea → production',
    title: 'Idea to Production',
    description:
      'Take an idea to a real, shipped, production-grade app — architecture, build, security, and the infrastructure to run it. Backed by building an encrypted messenger from a single cross-platform codebase, solo.',
    h1: 'From idea to a real, shipped product',
    lead: 'You have an idea — or a rough prototype — and need someone who can take it all the way: architected properly, built to last, secured, and actually deployed. Not a deck. A product.',
    problems: [
      "You've got the idea, maybe a prototype, but not the senior engineering to make it real.",
      "You don't want a throwaway MVP you'll have to rebuild the moment it works.",
      'You need one person who can own architecture, build, security, and deployment — not coordinate five.',
    ],
    deliverables: [
      'Architecture and a plan that starts simple and earns complexity only when the product does.',
      'The actual build — backend, data, APIs, and the hard parts (auth, payments, real-time, encryption) done right.',
      'Production infrastructure: CI/CD, Terraform, monitoring, and a deploy you can trust.',
      'Security baked in from day one, not bolted on after the breach.',
      'Docs and handover so your team, or your next hire, can run it without me.',
    ],
    outcome: "You get a product that's actually in production and built to grow — not a prototype you have to throw away.",
    icon: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z"/>',
    faqs: [
      {
        q: 'Can you really do all of it solo?',
        a: "Yes — on the side I'm building Chatter, an end-to-end encrypted messenger: one Rust client for every platform (Linux, Windows, and Android today, iOS and macOS planned) on a Go backend with Signal Protocol cryptography. It keeps me hands-on across the whole stack, from crypto to deployment — so I can own the architecture and the hard parts on your build too.",
      },
      {
        q: 'Fractional or full build?',
        a: 'Either. I can lead it end-to-end, or work alongside your team and own the architecture and the hard parts.',
      },
    ],
  },
  {
    slug: 'building-blocks',
    category: 'product',
    nav: 'Building blocks',
    title: 'Production Building Blocks',
    description:
      'Drop-in services for your app — authentication, user management, and encrypted file handling — adapted from a real encrypted-messenger codebase I built. Skip rebuilding the hard, risky parts from scratch.',
    h1: 'The hard parts, already built right',
    lead: "Auth, user management, encrypted file handling — the pieces everyone gets subtly wrong (especially AI tools). Start from primitives adapted from a real encrypted-messenger codebase instead of rebuilding them from scratch and hoping.",
    problems: [
      "You're about to build auth from scratch — or let an AI tool do it — for the third time.",
      'The security-critical pieces (login, sessions, file uploads) are exactly where a mistake hurts most.',
      'Every week spent reinventing primitives is a week not spent on your actual product.',
    ],
    deliverables: [
      'Authentication and device/session management — token-based, multi-device, without the half-baked JWT footguns. Extracted and hardened from a real platform.',
      'User and identity service — profiles, multi-device, and a relationship/permission model done with proven patterns (SpiceDB / Zanzibar).',
      'Encrypted file service — chunked AES-256-GCM uploads, virus scanning, and presigned access, not a naive public bucket.',
      'Clean service boundaries (DDD) so each primitive drops into your app without dragging the rest along.',
      'Integrated into your stack and documented — yours to own and inspect, not a black box.',
    ],
    outcome: "You skip months of rebuilding the risky, boring foundations and start from primitives built to a real encrypted-messenger's standard.",
    icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    faqs: [
      {
        q: 'Are these off-the-shelf or custom?',
        a: "They're services I've already built for a real encrypted-messenger project (Chatter), adapted to your stack — so you start from a working foundation instead of from scratch, without SaaS lock-in.",
      },
      {
        q: 'Which primitives are available?',
        a: 'Authentication and device/session management, user/identity with fine-grained permissions, and encrypted file handling today — the bounded contexts from a real DDD codebase, extractable as standalone services.',
      },
      {
        q: 'Why not just use Auth0 or Firebase?',
        a: 'You can — but you trade control, cost at scale, and lock-in. These primitives are yours: self-hosted, inspectable, and built to the standard of an encrypted messenger, not a generic SaaS.',
      },
    ],
  },
];
