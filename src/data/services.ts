import { defaultLang, type Lang } from '../i18n/ui';

export interface ServiceFaq {
  q: string;
  a: string;
}

export type ServiceCategory = 'devops' | 'product';

// Structural, NON-translatable fields for a service.
// slug/url ordering + icon are language-independent.
export interface ServiceMeta {
  slug: string;
  category: ServiceCategory;
  /** Inner SVG markup for the thematic icon, drawn on a 24x24 viewBox */
  icon: string;
}

// User-visible, translatable content for one service.
export interface ServiceContent {
  nav: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  problems: string[];
  deliverables: string[];
  outcome: string;
  faqs: ServiceFaq[];
}

// A fully resolved service = structural meta + resolved content (all fields present).
export interface Service extends ServiceMeta, ServiceContent {}

// Display order + structural data. The order of this array is the render order.
export const SERVICE_META: ServiceMeta[] = [
  {
    slug: 'cloud-migration',
    category: 'devops',
    icon: '<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6-1.5A4 4 0 0 0 6 19z"/><path d="M12 16.5v-5.5"/><path d="m9.3 13 2.7-2.7 2.7 2.7"/>',
  },
  {
    slug: 'kubernetes',
    category: 'devops',
    icon: '<path d="M12 2.5 20 7v10l-8 4.5L4 17V7z"/><path d="M12 7v5l4 2"/><path d="m12 12-4 2"/>',
  },
  {
    slug: 'cost-optimization',
    category: 'devops',
    icon: '<path d="M4.5 3.5v8"/><rect x="3" y="5.5" width="3" height="4" rx="0.4"/><path d="M9.5 6v9.5"/><rect x="8" y="8" width="3" height="5" rx="0.4" fill="currentColor"/><path d="M14.5 9v9.5"/><rect x="13" y="11" width="3" height="5" rx="0.4"/><path d="M19.5 12v8.5"/><rect x="18" y="14" width="3" height="5" rx="0.4" fill="currentColor"/>',
  },
  {
    slug: 'cicd-iac',
    category: 'devops',
    icon: '<path d="M3.5 12a8.5 8.5 0 0 1 14.4-6.2"/><path d="M18.5 2.5v3.6h-3.6"/><path d="M20.5 12a8.5 8.5 0 0 1-14.4 6.2"/><path d="M5.5 21.5v-3.6h3.6"/>',
  },
  {
    slug: 'ai-app-audit',
    category: 'product',
    icon: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-5-5"/><path d="m7.8 10.6 2 2 3.4-3.4"/>',
  },
  {
    slug: 'architecture-review',
    category: 'product',
    icon: '<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="m2 12 10 5 10-5"/><path d="m2 17 10 5 10-5"/>',
  },
  {
    slug: 'idea-to-production',
    category: 'product',
    icon: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2Z"/>',
  },
  {
    slug: 'building-blocks',
    category: 'product',
    icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  },
];

// Per-language, per-slug translatable content.
// English is the source of truth and is fully populated below.
// de/es/pt/fr are intentionally empty for now — every missing field (or missing
// slug) falls back to English via getService(). Translation happens later.
type LocalizedContent = Partial<Record<string, Partial<ServiceContent>>>;

const en: Record<string, ServiceContent> = {
  'cloud-migration': {
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
  kubernetes: {
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
  'cost-optimization': {
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
  'cicd-iac': {
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
  'ai-app-audit': {
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
  'architecture-review': {
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
  'idea-to-production': {
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
  'building-blocks': {
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
};

const de: LocalizedContent = {
  'cloud-migration': {
    nav: "Cloud Migration",
    title: "Cloud Migration Beratung",
    description:
      "Cloud Migration Beratung, die Sie Schritt für Schritt zu AWS oder GCP bringt – der Betrieb läuft weiter, ohne riskante Hauruck-Umstellung. In der Regel günstiger als das, was ersetzt wird.",
    h1: "Cloud Migration ohne Ausfallzeiten",
    lead: "Der Umstieg auf AWS oder GCP – ohne das Geschäft an einem Big-Bang-Wochenende aufs Spiel zu setzen. Ich migriere, was sich zu migrieren lohnt, lasse den Rest weg und halte den Betrieb die gesamte Zeit über am Laufen.",
    problems: [
      "Ihre Server veralten, die Kosten schleichen nach oben, oder ein Rechenzentrums-Vertrag läuft aus.",
      "Sie haben schon einmal versucht, alles auf einmal umzustellen – oder Sie haben genau davor Angst.",
      "Niemand im Team hat je einen produktiven Betrieb in dieser Größenordnung migriert.",
    ],
    deliverables: [
      "Ein stufenweiser Migrationsplan – das risikoärmste zuerst, mit einem Rollback bei jedem Schritt. Kein Big-Bang-Wochenende.",
      "Ein Multi-Account-Setup auf AWS (getrennte Konten für Produktion, Entwicklung und Security), damit ein Fehler in der Entwicklung niemals die Produktion berühren kann und Kosten sich pro Team nachvollziehen lassen.",
      "Ein Netzwerk, das mitwächst: Transit Gateway im Hub-and-Spoke-Modell statt einem Wirrwarr aus VPC-Peering, private Subnetze für Anwendungen und Daten sowie VPC Endpoints, sodass AWS-Traffic nie das öffentliche Internet durchquert.",
      "Tiefengestaffelte Sicherheit von Tag eins an – IAM-Rollen statt Access Keys, GuardDuty und Security Hub als Wächter und KMS-Verschlüsselung für alles.",
      "Alles neu aufgebaut als Terraform mit Remote State und Locking – reproduzierbar, überprüfbar und wiederherstellbar, nicht per Hand in einer Konsole zusammengeklickt.",
      "Multi-AZ, damit ein einzelnes Amazon-Rechenzentrum ausfallen kann, ohne Sie lahmzulegen – dazu Backups, die tatsächlich getestet sind.",
      "Ihr Team geschult und das Setup dokumentiert – keine dauerhafte Abhängigkeit von mir.",
    ],
    outcome:
      "Die meisten Migrationen laufen ab, ohne dass Nutzer etwas bemerken – und meist günstiger als das, was sie ersetzt haben.",
    faqs: [
      {
        q: "Wird es Ausfallzeiten geben?",
        a: "Keine geplanten. Wir migrieren schrittweise und halten die alte Umgebung aktiv, bis die neue sich bewährt hat – mit einem Rollback bei jedem Schritt.",
      },
      {
        q: "Lift-and-Shift oder vollständige Neu-Architektur?",
        a: "Was sich auszahlt – oft eine pragmatische Mischung: die unkritischen Teile einfach umziehen, neu architektieren nur dort, wo es klar Vorteile bringt.",
      },
      {
        q: "Richten Sie einfach ein einziges AWS-Konto ein?",
        a: "Nein. Ein einziges Konto für alles ist ein Anfängerfehler. Getrennte Konten für Produktion, Entwicklung und Security begrenzen die Auswirkungen jedes Fehlers und machen Kosten pro Team nachvollziehbar – durchgesetzt mit Control-Tower-Guardrails.",
      },
    ],
  },
  kubernetes: {
    nav: "Kubernetes",
    title: "Kubernetes Beratung",
    description:
      "Kubernetes Beratung für den Produktivbetrieb: EKS/GKE-Cluster, die bei Bedarf skalieren und mit Ihrer Rechnung schrumpfen – dank Karpenter, ohne YAML-Wildwuchs. Dazu eine ehrliche Antwort, ob Sie es überhaupt brauchen.",
    h1: "Kubernetes – nur dort, wo es sich rechnet",
    lead: "Produktionsreife Cluster, die bei Lastspitzen hochskalieren und (samt Rechnung) schrumpfen, wenn die Last nachlässt – ohne die Tausenden Zeilen YAML, die niemand versteht.",
    problems: [
      "Ihre Cluster sind überdimensioniert, und die Rechnung zeigt es.",
      "Deployments sind fragil, und nur eine einzige Person versteht die Helm-Charts.",
      "Sie sind sich nicht sicher, ob Sie Kubernetes überhaupt gebraucht haben – aber nun sind Sie hier.",
    ],
    deliverables: [
      "Zuerst eine ehrliche Antwort: Wenn Managed Services oder eine Handvoll Container den Job erledigen, hören Sie das – Kubernetes kommt nur dann ins Spiel, wenn Ihre Größenordnung oder Teamgröße es rechtfertigt.",
      "Richtig dimensionierte Workloads auf Basis realer 95th-Percentile-Nutzung aus Prometheus, nicht aus Vermutungen. Die meisten Cluster dümpeln bei rund 10 % CPU – für den Rest zahlen Sie umsonst.",
      "Karpenter-Autoscaling, das Spot und On-Demand kombiniert (zustandslose Workloads laufen auf Spot rund 70 % günstiger), Nodes in Sekunden bereitstellt und die ungenutzten konsolidiert.",
      "Nicht verhandelbare Health Probes – Liveness, Readiness und Startup –, damit ein defekter Pod aus dem Load Balancer ausscheidet, statt still und leise Fehler auszuliefern.",
      "Gehärtete Container: distroless Images (rund 80× kleiner als Ubuntu, winzige Angriffsfläche), non-root, read-only Root-Dateisystem, entzogene Linux-Capabilities und Trivy-Scanning, das den Build bei kritischen CVEs abbricht.",
      'Zero-Trust-Networking mit Network Policies (Cilium), auf "restricted" gesetzte Pod Security Standards und Secrets im Secrets Manager oder Vault – niemals in Umgebungsvariablen.',
      "GitOps mit ArgoCD: Der Cluster entspricht immer dem Git-Stand, jede Änderung ist ein Commit, und ein Rollback ist ein git revert.",
    ],
    outcome: "Cluster, die weniger kosten, sich selbst erholen und keinen Aufpasser brauchen.",
    faqs: [
      {
        q: "Brauche ich Kubernetes wirklich?",
        a: "Vielleicht nicht. Wenn Managed Services oder ein paar Container den Job erledigen, sage ich Ihnen das – und erspare Ihnen den operativen Aufwand.",
      },
      {
        q: "EKS oder GKE?",
        a: "Beides funktioniert. Ich wähle danach, wo Ihr Team und der Rest Ihres Stacks bereits zu Hause sind.",
      },
      {
        q: "Wie halten Sie die Container sicher?",
        a: "Distroless Images ohne Shell oder Paketmanager, non-root laufend auf einem read-only Dateisystem mit entzogenen Linux-Capabilities, dazu Image-Scanning in der CI. Sollte es je zu Remote Code Execution kommen, gibt es innen nichts auszunutzen – das ist der Unterschied zwischen einem Vorfall und einer Katastrophe.",
      },
    ],
  },
  'cost-optimization': {
    nav: "Kosten & Zuverlässigkeit",
    title: "Cloud Kostenoptimierung",
    description:
      "Beratung zur Cloud Kostenoptimierung. Senken Sie Ihre AWS- oder GCP-Rechnung mit ARM/Graviton, Right-Sizing und Autoscaling – ohne die Zuverlässigkeit zu gefährden. Typische Einsparungen 20–40 %.",
    h1: "Senken Sie Ihre Cloud-Rechnung, ohne Zuverlässigkeit zu verlieren",
    lead: "Die Posten aufspüren, die still und leise Ihr Budget aufzehren, sie kappen und dabei sicherstellen, dass nichts kaputtgeht. Unaufgeregt, zuverlässig und günstiger.",
    problems: [
      "Ihre Cloud-Rechnung klettert immer weiter, und niemand weiß so recht, warum.",
      "Die Finanzabteilung stellt Fragen, die Sie nicht Posten für Posten beantworten können.",
      "Sie vermuten, dass Sie für ungenutzte Kapazität zahlen – aber sie zu kappen fühlt sich riskant an.",
    ],
    deliverables: [
      "Eine Aufschlüsselung Posten für Posten nach Team und Projekt (sauberes Tagging plus Cost Explorer), damit Sie endlich wissen, wohin das Geld tatsächlich fließt.",
      "Right-Sizing der überdimensionierten Instances – die m5.2xlarge bei 5 % CPU – meist der schnellste Gewinn auf der Rechnung.",
      "ARM/Graviton und Spot für zustandslose Workloads (rund 70 % günstiger), dazu Savings Plans und Reserved Instances für gleichmäßige Last (20–60 % unter On-Demand).",
      "S3 Intelligent-Tiering, sodass kalte Daten von selbst in günstigeren Speicher wandern – bis zu 95 % Ersparnis im Archiv, ohne manuelle Policies zu betreuen.",
      "Autoscaling, das tatsächlich herunterskaliert – und bis auf null, wenn die Last einbricht.",
      "Zuverlässigkeit bleibt unangetastet: Multi-AZ, Read Replicas, Health Checks und Observability mit CloudWatch/X-Ray. Günstiger, nicht instabiler.",
    ],
    outcome: "Oft 20–40 % weniger auf der Rechnung – ohne einen einzigen zusätzlichen Alarm um 3 Uhr nachts.",
    faqs: [
      {
        q: "Leidet die Zuverlässigkeit, wenn ich Kosten senke?",
        a: "Genau darum geht es – ich kürze Verschwendung, nicht Sicherheitsreserven. Die Zuverlässigkeit verbessert sich oft sogar, weil das Setup einfacher wird.",
      },
      {
        q: "Welche Einsparungen sind realistisch?",
        a: "Das variiert, aber 20–40 % sind üblich, wenn ARM, Spot, Savings Plans und Right-Sizing bislang ungenutzt geblieben sind. Spot allein bringt rund 70 % Ersparnis bei zustandslosen Workloads; reservierte RDS-Instanzen laufen 35–60 % günstiger.",
      },
      {
        q: "Woher kommen die Einsparungen üblicherweise?",
        a: "Meist aus den unspektakulären Dingen: Right-Sizing überdimensionierter Instances, Verlagerung zustandsloser Workloads auf ARM und Spot, Bindung gleichmäßiger Last an Savings Plans und das Abschalten dessen, was ungenutzt herumsteht.",
      },
    ],
  },
  'cicd-iac': {
    nav: "CI/CD & IaC",
    title: "CI/CD & Infrastructure as Code",
    description:
      "Beratung zu CI/CD und Infrastructure as Code. Unaufgeregte, wiederholbare Deployments und mit Terraform verwaltete Infrastruktur, die überprüft, versioniert und von Grund auf wiederherstellbar ist.",
    h1: "Machen Sie das Ausliefern zur Nebensache",
    lead: "Sie pushen, es deployt, alle machen weiter. Ihr gesamtes Setup liegt in Terraform – überprüft, versioniert und von Grund auf wiederherstellbar.",
    problems: [
      "Deployments sind manuell, stressig oder hängen an einer einzigen Person mit einem guten Tag.",
      "Ihre Infrastruktur existiert nur im Kopf einer Person oder in der Cloud-Konsole.",
      "Rollbacks bedeuten Panik statt einen Knopfdruck.",
    ],
    deliverables: [
      "CI/CD-Pipelines (GitHub Actions, GitLab oder Jenkins), die beim Push bauen, testen, scannen und deployen – wobei Trivy den Build bei kritischen CVEs abbricht, bevor irgendetwas die Produktion erreicht.",
      "Rolling Deployments ohne Ausfallzeit, richtig gemacht: maxSurge/maxUnavailable feinjustiert, Connection Draining und sauberes SIGTERM-Handling – damit Instanzen ausgetauscht werden, ohne Requests zu verlieren, auch unter Last.",
      "Sichere Schemaänderungen nach dem Expand-Contract-Muster, damit Datenbank-Migrationen nie die noch laufende Version mitten im Rollout brechen.",
      "Sämtliche Infrastruktur als Terraform – Remote State in S3 mit DynamoDB-Locking, ein eigenes Verzeichnis pro Umgebung (niemals Workspaces), Plan bei jedem PR und eine manuelle Freigabe zum Anwenden.",
      "OIDC statt langlebiger Cloud-Keys, Secrets im Secrets Manager (niemals eingecheckt) und Least-Privilege-IAM, damit die Pipeline die Produktion nicht plätten kann.",
      "Dokumentation und Übergabe, damit jeder Engineer ausliefern kann – nicht nur die Person, die es gebaut hat.",
    ],
    outcome: "Ausliefern wird zur Routine – und Ihre Infrastruktur lässt sich aus einem Git-Repository wiederherstellen.",
    faqs: [
      {
        q: "Welche CI/CD-Werkzeuge nutzen Sie?",
        a: "Was zu Ihrem Stack passt – GitHub Actions, GitLab CI, CircleCI oder Jenkins. Ich dränge Ihnen keinen Favoriten auf.",
      },
      {
        q: "Terraform oder etwas anderes?",
        a: "Meist Terraform wegen seines Ökosystems und seiner Portabilität, aber ich arbeite mit dem, was Sie bereits einsetzen, sofern es solide ist.",
      },
      {
        q: "Wie deployen Sie ohne Ausfallzeit?",
        a: "Rolling Updates mit maxSurge 1 und maxUnavailable 0, Readiness Probes, die den Traffic steuern, und Connection Draining, damit Instanzen ausgetauscht werden, ohne Requests zu verlieren. Blue-Green oder Canary, wenn eine Änderung es erfordert.",
      },
    ],
  },
  'ai-app-audit': {
    nav: "KI-App-Audit",
    title: "Audit & Rettung KI-gebauter Apps",
    description:
      "Audit und Härtung von Apps, die mit Cursor, Claude oder Copilot gebaut wurden. Finden Sie die Sicherheitslücken und architektonischen Minen, die KI hinterlässt – bevor sie Sie teuer zu stehen kommen.",
    h1: "Ihre KI-gebaute App – auditiert und entschärft",
    lead: "Etwas ausgeliefert, das größtenteils von Cursor, Claude oder Copilot gebaut wurde, und die leise Sorge, dass es zusammenbricht? Ich finde die Sicherheitslücken und architektonischen Minen, die KI-Werkzeuge hinterlassen – und sage Ihnen genau, was zu beheben ist, in klarer Sprache.",
    problems: [
      "Der Großteil Ihrer Codebasis wurde von einer KI geschrieben, und niemand mit Erfahrung hat ihn je gelesen.",
      "Die Demo läuft gut, aber Sie können nicht sagen, ob das Ganze sicher, skalierbar oder ein Kartenhaus ist.",
      "Sie sind kurz davor, darauf Zahlungen, Nutzerdaten oder Investorengeld aufzusetzen.",
    ],
    deliverables: [
      'Ein vollständiges Audit des KI-generierten Codes – Sicherheit, Architektur, Datenmodell und die "großen Entscheidungen", die KI meist auf subtile Weise falsch trifft.',
      "Ein priorisierter Befundbericht (kritisch → wünschenswert) in klarer Sprache, mit dem konkreten Risiko jedes Punkts benannt.",
      "Security-Review: Authentifizierung, Autorisierung, Secrets, Eingabevalidierung, Injection, freigelegte Daten und Abhängigkeits-CVEs.",
      "Architektur-Review: Trägt die Struktur, oder braucht sie bei der zehnfachen Nutzerzahl ein Rewrite?",
      "Fixes auf Wunsch – ich behebe die kritischen Befunde selbst oder übergebe Ihrem Team einen klaren Plan. Ihre Entscheidung.",
    ],
    outcome: "Sie erfahren, ob Sie auf einer soliden App oder einer Haftungsfalle sitzen – bevor es Ihre Nutzer oder ein Angreifer tun.",
    faqs: [
      {
        q: "Code welcher KI-Werkzeuge auditieren Sie?",
        a: "Alle – Cursor, Claude Code, GitHub Copilot, ChatGPT, v0, Lovable, egal was es gebaut hat. Die Fehlermuster ähneln sich, unabhängig davon, welches Modell den Code geschrieben hat.",
      },
      {
        q: "Was finden Sie üblicherweise?",
        a: "Branchen-Audits bis 2025–2026 förderten in praktisch jeder KI-gebauten Codebasis mindestens ein kritisches oder hochgradig schwerwiegendes Problem zutage, und ich suche nach denselben: freigelegte Secrets, fehlende Autorisierungsprüfungen, naive Datenmodelle und Architektur, die echten Traffic nicht überlebt. Sie erhalten eine klare, priorisierte Liste dessen, was wirklich riskant ist.",
      },
      {
        q: "Berichten Sie nur, oder beheben Sie es auch?",
        a: "Beides. Den Bericht erhalten Sie in jedem Fall; die kritischen Punkte kann ich selbst beheben oder Ihr Team dabei anleiten.",
      },
    ],
  },
  'architecture-review': {
    nav: "Architektur-Review",
    title: "Software-Architektur-Review",
    description:
      "Eine ehrliche Zweitmeinung zu Ihrer Software-Architektur – was skaliert, was bricht und was zu beheben ist, bevor es teuer wird. Untermauert davon, selbst eine Ende-zu-Ende-verschlüsselte App aus einer einzigen plattformübergreifenden Codebasis gebaut zu haben.",
    h1: "Ist Ihre Architektur für die Dauer gebaut?",
    lead: "Eine klarsichtige Zweitmeinung dazu, wie Ihr System gebaut ist – was trägt, was bei Skalierung bricht und was Sie still und leise Geld kosten wird. Kein Dogma, nur Abwägungen.",
    problems: [
      "Sie sind sich nicht sicher, ob Ihre Architektur die zehnfache Nutzerzahl übersteht – oder das nächste Quartal.",
      "Jedes Feature dauert länger als das vorherige, und niemand weiß so recht, warum.",
      "Sie wählen zwischen einem Monolithen und Microservices und bekommen Glaubensbekenntnisse statt Antworten.",
    ],
    deliverables: [
      "Ein Review Ihrer Architektur gemessen daran, wohin sich das Geschäft tatsächlich entwickelt – nicht an einem Lehrbuch-Ideal.",
      "Ehrliche Entscheidungen bei den großen Fragen: Monolith vs. Microservices, Datenmodell, Service-Grenzen, synchron vs. asynchron.",
      'Der "Ball of Mud"-Check – wo Kopplung still und leise jede Änderung schwerer und riskanter macht.',
      "Eine priorisierte Liste dessen, was jetzt zu beheben ist, was zu beobachten und was in Ruhe zu lassen ist – auch Over-Engineering kostet.",
      "Muster, die zu Ihrer Teamgröße und Phase passen: unaufgeregt und wartbar statt clever.",
    ],
    outcome: "Sie hören auf, über Ihr Fundament zu rätseln, und erhalten einen klaren, priorisierten Weg – behalten, was funktioniert, beheben, was zählt.",
    faqs: [
      {
        q: "Monolith oder Microservices?",
        a: "Meist ein gut strukturierter Monolith, bis Sie echte Belege dafür haben, dass Sie aufteilen müssen – getrennte Teams, die einander in die Quere kommen, oder stark unterschiedliche Skalierungsanforderungen. Einen sauberen Monolithen können Sie in Tagen aufteilen; einen Ball of Mud lässt sich ohne Rewrite nicht entwirren.",
      },
      {
        q: "Werden Sie mir raten, alles neu zu schreiben?",
        a: "Fast nie. Rewrites sind der Ort, an dem Projekte sterben. Ich finde die wenigen Änderungen, die am meisten bringen, und lasse den Rest in Ruhe.",
      },
    ],
  },
  'idea-to-production': {
    nav: "Idee → Produktion",
    title: "Von der Idee in die Produktion",
    description:
      "Von der Idee zu einer echten, ausgelieferten, produktionsreifen App – Architektur, Umsetzung, Sicherheit und die Infrastruktur, um sie zu betreiben. Untermauert davon, allein einen verschlüsselten Messenger aus einer einzigen plattformübergreifenden Codebasis gebaut zu haben.",
    h1: "Von der Idee zu einem echten, ausgelieferten Produkt",
    lead: "Sie haben eine Idee – oder einen groben Prototyp – und brauchen jemanden, der sie den ganzen Weg bringt: sauber architektiert, auf Dauer gebaut, abgesichert und tatsächlich deployt. Keine Präsentation. Ein Produkt.",
    problems: [
      "Sie haben die Idee, vielleicht einen Prototyp, aber nicht die erfahrene Engineering-Kraft, um sie Wirklichkeit werden zu lassen.",
      "Sie wollen kein Wegwerf-MVP, das Sie in dem Moment neu bauen müssen, in dem es funktioniert.",
      "Sie brauchen eine Person, die Architektur, Umsetzung, Sicherheit und Deployment verantworten kann – nicht fünf zu koordinieren.",
    ],
    deliverables: [
      "Eine Architektur und ein Plan, die einfach beginnen und sich Komplexität erst dann verdienen, wenn das Produkt es tut.",
      "Die eigentliche Umsetzung – Backend, Daten, APIs und die schweren Teile (Auth, Zahlungen, Echtzeit, Verschlüsselung) richtig gemacht.",
      "Produktionsinfrastruktur: CI/CD, Terraform, Monitoring und ein Deployment, auf das Sie sich verlassen können.",
      "Sicherheit von Tag eins an eingebaut, nicht nach dem Einbruch nachgerüstet.",
      "Dokumentation und Übergabe, damit Ihr Team oder Ihre nächste Einstellung es ohne mich betreiben kann.",
    ],
    outcome: "Sie erhalten ein Produkt, das tatsächlich in Produktion und auf Wachstum ausgelegt ist – keinen Prototyp, den Sie wegwerfen müssen.",
    faqs: [
      {
        q: "Können Sie das wirklich alles allein stemmen?",
        a: "Ja – nebenbei baue ich Chatter, einen Ende-zu-Ende-verschlüsselten Messenger: ein Rust-Client für jede Plattform (heute Linux, Windows und Android, iOS und macOS geplant) auf einem Go-Backend mit Signal-Protocol-Kryptografie. Das hält mich über den gesamten Stack hinweg praktisch involviert, von der Kryptografie bis zum Deployment – sodass ich auch bei Ihrem Projekt die Architektur und die schweren Teile verantworten kann.",
      },
      {
        q: "Anteilig oder vollständige Umsetzung?",
        a: "Beides. Ich kann es von Anfang bis Ende leiten oder an der Seite Ihres Teams arbeiten und die Architektur sowie die schweren Teile verantworten.",
      },
    ],
  },
  'building-blocks': {
    nav: "Bausteine",
    title: "Bausteine für die Produktion",
    description:
      "Einsatzfertige Services für Ihre App – Authentifizierung, Nutzerverwaltung und verschlüsselte Dateiverarbeitung – adaptiert aus einer echten Messenger-Codebasis, die ich gebaut habe. Ersparen Sie sich den Neuaufbau der schweren, riskanten Teile von Grund auf.",
    h1: "Die schweren Teile, schon richtig gebaut",
    lead: "Auth, Nutzerverwaltung, verschlüsselte Dateiverarbeitung – die Bausteine, die alle auf subtile Weise falsch machen (besonders KI-Werkzeuge). Starten Sie von Primitiven, adaptiert aus einer echten verschlüsselten Messenger-Codebasis, statt sie von Grund auf neu zu bauen und zu hoffen.",
    problems: [
      "Sie sind kurz davor, Auth von Grund auf zu bauen – oder ein KI-Werkzeug es tun zu lassen – zum dritten Mal.",
      "Die sicherheitskritischen Teile (Login, Sessions, Datei-Uploads) sind genau dort, wo ein Fehler am meisten schmerzt.",
      "Jede Woche, die mit dem Neuerfinden von Primitiven verbracht wird, ist eine Woche, die nicht in Ihr eigentliches Produkt fließt.",
    ],
    deliverables: [
      "Authentifizierung sowie Geräte-/Session-Verwaltung – tokenbasiert, Multi-Device, ohne die halbgaren JWT-Fallstricke. Aus einer echten Plattform extrahiert und gehärtet.",
      "Ein User- und Identity-Service – Profile, Multi-Device und ein Beziehungs-/Berechtigungsmodell nach bewährten Mustern (SpiceDB / Zanzibar).",
      "Ein verschlüsselter Datei-Service – gechunkte AES-256-GCM-Uploads, Virenscanning und Zugriff über Presigned URLs, statt eines naiven öffentlichen Buckets.",
      "Saubere Service-Grenzen (DDD), damit jedes Primitiv in Ihre App einfügt, ohne den Rest mitzuschleppen.",
      "In Ihren Stack integriert und dokumentiert – Ihr Eigentum zum Prüfen, keine Black Box.",
    ],
    outcome: "Sie sparen sich Monate des Neuaufbaus der riskanten, unspektakulären Grundlagen und starten von Primitiven, die dem Standard eines echten verschlüsselten Messengers gebaut sind.",
    faqs: [
      {
        q: "Sind das Standardlösungen oder maßgeschneidert?",
        a: "Es sind Services, die ich bereits für ein echtes verschlüsseltes Messenger-Projekt (Chatter) gebaut habe, an Ihren Stack angepasst – sodass Sie von einem funktionierenden Fundament starten statt bei null, ohne SaaS-Lock-in.",
      },
      {
        q: "Welche Primitive sind verfügbar?",
        a: "Authentifizierung sowie Geräte-/Session-Verwaltung, User/Identity mit feingranularen Berechtigungen und verschlüsselte Dateiverarbeitung heute – die Bounded Contexts aus einer echten DDD-Codebasis, extrahierbar als eigenständige Services.",
      },
      {
        q: "Warum nicht einfach Auth0 oder Firebase nutzen?",
        a: "Können Sie – aber Sie tauschen dafür Kontrolle, Kosten bei Skalierung und Lock-in ein. Diese Primitive gehören Ihnen: selbst gehostet, überprüfbar und zum Standard eines verschlüsselten Messengers gebaut, nicht zu dem eines generischen SaaS.",
      },
    ],
  },
};

const es: LocalizedContent = {
  'cloud-migration': {
    nav: 'Migración a la nube',
    title: 'Consultoría de migración a la nube',
    description:
      'Consultoría de migración a la nube que te lleva a AWS o GCP por partes: la producción sigue funcionando, sin reescrituras arriesgadas de golpe. Normalmente más barato que lo que reemplaza.',
    h1: 'Migración a la nube sin caídas del servicio',
    lead: 'Llega a AWS o GCP sin jugarte el negocio en un despliegue masivo de fin de semana. Migro lo que vale la pena mover, dejo lo que no y mantengo la producción funcionando durante todo el proceso.',
    problems: [
      'Tus servidores están envejeciendo, los costes se disparan poco a poco o se acaba el contrato de tu centro de datos.',
      'Ya intentaste "moverlo todo a la vez" antes, o te da miedo hacerlo.',
      'Nadie en el equipo ha migrado producción a esta escala.',
    ],
    deliverables: [
      'Un plan de migración por fases: primero lo de menor riesgo, con marcha atrás en cada paso. Sin operaciones masivas de fin de semana.',
      'Una configuración de AWS multicuenta (cuentas separadas para prod, dev y seguridad) para que un error en dev nunca pueda afectar a producción y los costes sean rastreables por equipo.',
      'Una red que escala: topología hub-and-spoke con Transit Gateway en lugar de una maraña de VPC peering, subredes privadas para aplicaciones y datos, y VPC endpoints para que el tráfico de AWS nunca cruce la internet pública.',
      'Defensa en profundidad desde el primer día: roles de IAM en lugar de claves de acceso, GuardDuty y Security Hub vigilando, y cifrado con KMS en todo.',
      'Todo reconstruido como Terraform con estado remoto y bloqueo: reproducible, revisable y reconstruible, no configurado a mano en una consola.',
      'Multi-AZ para que un solo centro de datos de Amazon pueda fallar sin tumbarte, además de copias de seguridad que se prueban de verdad.',
      'Tu equipo formado y la configuración documentada: sin dependencia permanente de mí.',
    ],
    outcome:
      'La mayoría de las migraciones terminan sin que los usuarios lo noten, y normalmente más baratas que aquello que reemplazan.',
    faqs: [
      {
        q: '¿Habrá caídas del servicio?',
        a: 'De las planificadas, no. Migramos de forma incremental y mantenemos el entorno antiguo activo hasta que el nuevo esté probado, con marcha atrás en cada paso.',
      },
      {
        q: '¿Lift-and-shift o rearquitectura completa?',
        a: 'Lo que resulte rentable, a menudo una mezcla pragmática: mover tal cual las partes aburridas y rearquitecturar solo lo que claramente lo merece.',
      },
      {
        q: '¿Solo configuras una única cuenta de AWS?',
        a: 'No. Una sola cuenta para todo es un error de principiante. Cuentas separadas para prod, dev y seguridad contienen el radio de impacto de cualquier error y hacen los costes rastreables por equipo, todo reforzado con las barreras de Control Tower.',
      },
    ],
  },
  kubernetes: {
    nav: 'Kubernetes',
    title: 'Consultoría de Kubernetes',
    description:
      'Consultoría de Kubernetes en producción: clústeres EKS/GKE que escalan bajo demanda y se reducen junto con tu factura gracias a Karpenter, sin el caos de YAML. Y una respuesta honesta sobre si de verdad lo necesitas.',
    h1: 'Kubernetes, solo donde se gana su sueldo',
    lead: 'Clústeres de nivel producción que escalan cuando el tráfico se dispara y se reducen (junto con la factura) cuando no, sin las miles de líneas de YAML que nadie entiende.',
    problems: [
      'Tus clústeres están sobredimensionados y la factura lo demuestra.',
      'Los despliegues son frágiles y solo una persona entiende los Helm charts.',
      'No estás seguro de haber necesitado Kubernetes siquiera, pero aquí estás.',
    ],
    deliverables: [
      'Primero una respuesta honesta: si con servicios gestionados o un puñado de contenedores basta, te lo diré. Kubernetes entra en juego solo cuando tu escala o el tamaño de tu equipo lo justifican.',
      'Cargas de trabajo dimensionadas correctamente según el uso real en el percentil 95 medido con Prometheus, no según conjeturas. La mayoría de los clústeres están inactivos en torno al 10% de CPU: estás pagando por el resto.',
      'Autoescalado con Karpenter que combina spot y bajo demanda (las cargas sin estado corren ~70% más barato en spot), aprovisiona nodos en segundos y consolida los inactivos.',
      'Sondas de salud innegociables (liveness, readiness y startup) para que un pod averiado salga del balanceador de carga en lugar de servir errores en silencio.',
      'Contenedores endurecidos: imágenes distroless (~80× más pequeñas que Ubuntu, superficie de ataque mínima), sin root, con sistema de archivos raíz de solo lectura, capacidades de Linux eliminadas y escaneo con Trivy que hace fallar la compilación ante CVEs críticas.',
      'Redes de confianza cero con network policies (Cilium), Pod Security Standards fijados en "restricted" y secretos en Secrets Manager o Vault, nunca en variables de entorno.',
      'GitOps con ArgoCD: el clúster siempre coincide con git, cada cambio es un commit y la marcha atrás es un git revert.',
    ],
    outcome: 'Clústeres que cuestan menos, se recuperan solos y no necesitan una niñera.',
    faqs: [
      {
        q: '¿De verdad necesito Kubernetes?',
        a: 'Puede que no. Si con servicios gestionados o unos pocos contenedores basta, te lo diré, y te ahorraré el peaje operativo.',
      },
      {
        q: '¿EKS o GKE?',
        a: 'Ambos funcionan. Elijo según dónde ya vivan tu equipo y el resto de tu stack.',
      },
      {
        q: '¿Cómo mantienes seguros los contenedores?',
        a: 'Imágenes distroless sin shell ni gestor de paquetes, ejecutándose sin root sobre un sistema de archivos de solo lectura y con las capacidades de Linux eliminadas, más escaneo de imágenes en CI. Si algún día se produce una ejecución remota de código, no hay nada dentro que explotar: esa es la diferencia entre un incidente y una catástrofe.',
      },
    ],
  },
  'cost-optimization': {
    nav: 'Costes y fiabilidad',
    title: 'Optimización de costes en la nube',
    description:
      'Consultoría de optimización de costes en la nube. Reduce tu factura de AWS o GCP con ARM/Graviton, dimensionamiento correcto y autoescalado, sin sacrificar la fiabilidad. Ahorro típico del 20-40%.',
    h1: 'Reduce tu factura de la nube sin perder fiabilidad',
    lead: 'Encuentra las partidas que drenan tu presupuesto en silencio, córtalas y asegúrate de que nada se rompa en el proceso. Aburrido, fiable y más barato.',
    problems: [
      'Tu factura de la nube no para de subir y nadie tiene claro por qué.',
      'Finanzas hace preguntas que no puedes responder línea por línea.',
      'Sospechas que pagas por capacidad inactiva, pero recortarla parece arriesgado.',
    ],
    deliverables: [
      'Un desglose línea por línea por equipo y proyecto (etiquetado correcto más Cost Explorer) para que por fin sepas a dónde va realmente el dinero.',
      'Dimensionamiento correcto de las instancias sobredimensionadas (esa m5.2xlarge al 5% de CPU): normalmente la victoria más rápida en la factura.',
      'ARM/Graviton y Spot para cargas sin estado (~70% más barato), además de Savings Plans y Reserved Instances para carga estable (20-60% menos que bajo demanda).',
      'S3 Intelligent-Tiering para que los datos fríos migren solos a almacenamiento más barato: hasta un 95% menos en archivo, sin políticas manuales que vigilar.',
      'Autoescalado que de verdad reduce, hasta cero, cuando baja la carga.',
      'Fiabilidad intacta: Multi-AZ, réplicas de lectura, health checks y observabilidad con CloudWatch/X-Ray. Más barato, no más inestable.',
    ],
    outcome: 'A menudo un 20-40% menos en la factura, sin añadir una sola alerta a las 3 de la madrugada.',
    faqs: [
      {
        q: '¿Recortar costes perjudicará la fiabilidad?',
        a: 'De eso se trata precisamente: recorto el desperdicio, no los márgenes de seguridad. La fiabilidad suele mejorar porque la configuración se simplifica.',
      },
      {
        q: '¿Qué ahorro es realista?',
        a: 'Varía, pero un 20-40% es habitual cuando aún no se han usado ARM, Spot, Savings Plans ni el dimensionamiento correcto. Solo Spot supone ~70% menos para cargas sin estado; RDS reservado sale entre un 35-60% más barato.',
      },
      {
        q: '¿De dónde suele salir el ahorro?',
        a: 'Sobre todo de lo aburrido: dimensionar correctamente las instancias sobredimensionadas, mover cargas sin estado a ARM y Spot, comprometer la carga estable con Savings Plans y apagar lo que está inactivo.',
      },
    ],
  },
  'cicd-iac': {
    nav: 'CI/CD e IaC',
    title: 'CI/CD e infraestructura como código',
    description:
      'Consultoría de CI/CD e infraestructura como código. Despliegues aburridos y repetibles, e infraestructura gestionada con Terraform que se revisa, versiona y reconstruye desde cero.',
    h1: 'Convierte los despliegues en un no-evento',
    lead: 'Haces push, se despliega y todos siguen con lo suyo. Toda tu configuración vive en Terraform: revisada, versionada y reconstruible desde cero.',
    problems: [
      'Los despliegues son manuales, estresantes o los hace una sola persona en un buen día.',
      'Tu infraestructura solo existe en la cabeza de alguien o en la consola de la nube.',
      'Las marchas atrás significan pánico en lugar de un botón.',
    ],
    deliverables: [
      'Pipelines de CI/CD (GitHub Actions, GitLab o Jenkins) que compilan, prueban, escanean y despliegan con cada push, con Trivy haciendo fallar la compilación ante CVEs críticas antes de que nada llegue a producción.',
      'Despliegues progresivos sin caídas hechos como es debido: maxSurge/maxUnavailable ajustados, drenaje de conexiones y gestión ordenada de SIGTERM, para que las instancias roten sin perder peticiones, incluso bajo carga.',
      'Cambios de esquema seguros con el patrón expand-contract, para que las migraciones de base de datos nunca rompan la versión que sigue en marcha a mitad del despliegue.',
      'Toda la infraestructura como Terraform: estado remoto en S3 con bloqueo en DynamoDB, un directorio separado por entorno (nunca workspaces), plan en cada PR y una aprobación manual para aplicar.',
      'OIDC en lugar de claves de nube de larga duración, secretos en Secrets Manager (nunca versionados) e IAM de mínimo privilegio para que el pipeline no pueda cargarse la producción.',
      'Documentación y traspaso para que cualquier ingeniero pueda desplegar, no solo quien lo construyó.',
    ],
    outcome: 'Desplegar se vuelve rutina, y tu infraestructura puede reconstruirse desde un repositorio git.',
    faqs: [
      {
        q: '¿Qué herramientas de CI/CD usas?',
        a: 'Las que encajen con tu stack: GitHub Actions, GitLab CI, CircleCI o Jenkins. No impongo una favorita.',
      },
      {
        q: '¿Terraform u otra cosa?',
        a: 'Normalmente Terraform por su ecosistema y portabilidad, pero trabajaré con lo que ya uses si está bien planteado.',
      },
      {
        q: '¿Cómo despliegas sin caídas del servicio?',
        a: 'Actualizaciones progresivas con maxSurge 1 y maxUnavailable 0, sondas de readiness que controlan el tráfico y drenaje de conexiones, para que las instancias roten sin perder peticiones. Blue-green o canary cuando el cambio lo justifique.',
      },
    ],
  },
  'ai-app-audit': {
    nav: 'Auditoría de app con IA',
    title: 'Auditoría y rescate de apps creadas con IA',
    description:
      'Audita y refuerza aplicaciones creadas con Cursor, Claude o Copilot. Encuentra los agujeros de seguridad y las minas arquitectónicas que la IA deja atrás, antes de que te cuesten caro.',
    h1: 'Tu app creada con IA, auditada y sin riesgos ocultos',
    lead: '¿Has lanzado algo construido en gran parte con Cursor, Claude o Copilot y te preocupa en silencio que se venga abajo? Encuentro los agujeros de seguridad y las minas arquitectónicas que dejan atrás las herramientas de IA, y te digo exactamente qué corregir, en lenguaje claro.',
    problems: [
      'La mayor parte de tu código lo escribió una IA y nadie con experiencia lo ha leído de verdad.',
      'La demo funciona bien, pero no sabes si es segura, escalable o un castillo de naipes.',
      'Estás a punto de aceptar pagos, datos de usuarios o inversión sobre esa base.',
    ],
    deliverables: [
      'Una auditoría completa del código generado por IA: seguridad, arquitectura, modelo de datos y las "grandes decisiones" que la IA suele equivocar de forma sutil.',
      'Un informe de hallazgos priorizados (crítico → deseable) en lenguaje llano, con el riesgo real de cada punto explicado con claridad.',
      'Revisión de seguridad: autenticación, autorización, secretos, validación de entradas, inyección, datos expuestos y CVEs en dependencias.',
      'Revisión de arquitectura: ¿la estructura aguanta o necesitará una reescritura con 10 veces los usuarios?',
      'Correcciones a demanda: yo mismo remedio los hallazgos críticos, o le entrego a tu equipo un plan claro. Tú decides.',
    ],
    outcome: 'Descubres si tienes entre manos una app sólida o un pasivo, antes de que lo hagan tus usuarios o un atacante.',
    faqs: [
      {
        q: '¿El código de qué herramientas de IA auditas?',
        a: 'El de todas: Cursor, Claude Code, GitHub Copilot, ChatGPT, v0, Lovable, lo que sea que lo haya construido. Los patrones de fallo son similares sin importar qué modelo lo escribió.',
      },
      {
        q: '¿Qué sueles encontrar?',
        a: 'Las auditorías del sector a lo largo de 2025-2026 detectaron al menos un problema crítico o de alta severidad en prácticamente todos los códigos creados con IA, y yo busco lo mismo: secretos expuestos, comprobaciones de autorización ausentes, modelos de datos ingenuos y arquitecturas que no sobreviven al tráfico real. Recibes una lista clara y priorizada de lo que de verdad es arriesgado.',
      },
      {
        q: '¿Solo informas o también lo arreglas?',
        a: 'Ambas cosas. El informe lo recibes en cualquier caso; puedo remediar yo mismo los puntos críticos o guiar a tu equipo para que lo haga.',
      },
    ],
  },
  'architecture-review': {
    nav: 'Revisión de arquitectura',
    title: 'Revisión de arquitectura de software',
    description:
      'Una segunda opinión honesta sobre la arquitectura de tu software: qué escala, qué se rompe y qué corregir antes de que salga caro. Respaldado por haber construido yo mismo una app cifrada de extremo a extremo desde un único código multiplataforma.',
    h1: '¿Tu arquitectura está hecha para durar?',
    lead: 'Una segunda opinión sin rodeos sobre cómo está construido tu sistema: qué aguanta, qué se rompe a escala y qué te va a costar dinero en silencio. Sin dogmas, solo compensaciones.',
    problems: [
      'No estás seguro de que tu arquitectura sobreviva a 10 veces los usuarios, ni al próximo trimestre.',
      'Cada funcionalidad tarda más que la anterior y nadie sabe bien por qué.',
      'Estás eligiendo entre un monolito y microservicios y recibes religión en lugar de respuestas.',
    ],
    deliverables: [
      'Una revisión de tu arquitectura frente a hacia dónde va realmente el negocio, no frente a un ideal de manual.',
      'Decisiones honestas sobre lo importante: monolito vs microservicios, modelo de datos, límites de servicios, síncrono vs asíncrono.',
      'La prueba de la "bola de barro": dónde el acoplamiento está haciendo, en silencio, que cada cambio sea más difícil y arriesgado.',
      'Una lista priorizada de qué corregir ahora, qué vigilar y qué dejar en paz: sobre-diseñar también cuesta.',
      'Patrones acordes al tamaño y la etapa de tu equipo: aburridos y mantenibles antes que ingeniosos.',
    ],
    outcome: 'Dejas de adivinar sobre tus cimientos y obtienes un camino claro y priorizado: conserva lo que funciona, corrige lo que importa.',
    faqs: [
      {
        q: '¿Monolito o microservicios?',
        a: 'Normalmente un monolito bien estructurado hasta que tengas pruebas reales de que necesitas dividirlo: equipos distintos pisándose, necesidades de escalado muy diferentes. Un monolito limpio se puede dividir en días; una bola de barro no se desenreda sin una reescritura.',
      },
      {
        q: '¿Me dirás que lo reescriba todo?',
        a: 'Casi nunca. Las reescrituras son el lugar donde los proyectos van a morir. Encuentro los pocos cambios que más aportan y dejo el resto en paz.',
      },
    ],
  },
  'idea-to-production': {
    nav: 'De la idea a producción',
    title: 'De la idea a producción',
    description:
      'Lleva una idea hasta una app real, lanzada y de nivel producción: arquitectura, desarrollo, seguridad y la infraestructura para operarla. Respaldado por haber construido un mensajero cifrado desde un único código multiplataforma, en solitario.',
    h1: 'De la idea a un producto real y lanzado',
    lead: 'Tienes una idea, o un prototipo tosco, y necesitas a alguien que pueda llevarla hasta el final: bien arquitecturada, construida para durar, asegurada y realmente desplegada. No una presentación. Un producto.',
    problems: [
      'Tienes la idea, quizá un prototipo, pero no la ingeniería senior para hacerla realidad.',
      'No quieres un MVP desechable que tengas que reconstruir en cuanto funcione.',
      'Necesitas a una sola persona que pueda asumir arquitectura, desarrollo, seguridad y despliegue, no coordinar a cinco.',
    ],
    deliverables: [
      'Arquitectura y un plan que empieza simple y solo se gana complejidad cuando el producto lo hace.',
      'El desarrollo en sí: backend, datos, APIs y las partes difíciles (autenticación, pagos, tiempo real, cifrado) hechas como es debido.',
      'Infraestructura de producción: CI/CD, Terraform, monitorización y un despliegue en el que puedas confiar.',
      'Seguridad integrada desde el primer día, no añadida a posteriori tras la brecha.',
      'Documentación y traspaso para que tu equipo, o tu próxima contratación, pueda operarlo sin mí.',
    ],
    outcome: 'Consigues un producto que de verdad está en producción y construido para crecer, no un prototipo que tengas que tirar.',
    faqs: [
      {
        q: '¿De verdad puedes hacerlo todo en solitario?',
        a: 'Sí. En paralelo estoy construyendo Chatter, un mensajero cifrado de extremo a extremo: un único cliente en Rust para cada plataforma (hoy Linux, Windows y Android; iOS y macOS previstos) sobre un backend en Go con criptografía del Signal Protocol. Me mantiene con las manos en la masa a lo largo de todo el stack, desde la criptografía hasta el despliegue, así que también puedo asumir la arquitectura y las partes difíciles de tu proyecto.',
      },
      {
        q: '¿Colaboración parcial o desarrollo completo?',
        a: 'Cualquiera de las dos. Puedo liderarlo de principio a fin, o trabajar junto a tu equipo y asumir la arquitectura y las partes difíciles.',
      },
    ],
  },
  'building-blocks': {
    nav: 'Componentes base',
    title: 'Componentes base de producción',
    description:
      'Servicios listos para integrar en tu app (autenticación, gestión de usuarios y manejo de archivos cifrados) adaptados de un código real de mensajero cifrado que construí. Ahórrate reconstruir desde cero las partes difíciles y arriesgadas.',
    h1: 'Las partes difíciles, ya construidas como es debido',
    lead: 'Autenticación, gestión de usuarios, manejo de archivos cifrados: las piezas que todo el mundo equivoca de forma sutil (especialmente las herramientas de IA). Empieza desde primitivas adaptadas de un código real de mensajero cifrado en lugar de reconstruirlas desde cero y cruzar los dedos.',
    problems: [
      'Estás a punto de construir la autenticación desde cero, o de dejar que una herramienta de IA lo haga, por tercera vez.',
      'Las piezas críticas para la seguridad (login, sesiones, subida de archivos) son justo donde un error hace más daño.',
      'Cada semana reinventando primitivas es una semana que no dedicas a tu producto de verdad.',
    ],
    deliverables: [
      'Autenticación y gestión de dispositivos/sesiones: basada en tokens, multidispositivo, sin los peligros a medias de JWT. Extraída y endurecida a partir de una plataforma real.',
      'Servicio de usuario e identidad: perfiles, multidispositivo y un modelo de relaciones/permisos hecho con patrones probados (SpiceDB / Zanzibar).',
      'Servicio de archivos cifrados: subidas fragmentadas con AES-256-GCM, análisis de virus y acceso mediante URLs prefirmadas, no un bucket público ingenuo.',
      'Límites de servicio limpios (DDD) para que cada primitiva se integre en tu app sin arrastrar todo lo demás consigo.',
      'Integrado en tu stack y documentado: tuyo para poseerlo e inspeccionarlo, no una caja negra.',
    ],
    outcome: 'Te saltas meses reconstruyendo los cimientos arriesgados y aburridos, y empiezas desde primitivas construidas al estándar de un mensajero cifrado real.',
    faqs: [
      {
        q: '¿Son componentes estándar o a medida?',
        a: 'Son servicios que ya he construido para un proyecto real de mensajero cifrado (Chatter), adaptados a tu stack, para que empieces desde una base que funciona en lugar de desde cero, y sin la dependencia de un SaaS.',
      },
      {
        q: '¿Qué primitivas están disponibles?',
        a: 'Autenticación y gestión de dispositivos/sesiones, usuario/identidad con permisos de grano fino y manejo de archivos cifrados hoy: los contextos delimitados de un código DDD real, extraíbles como servicios independientes.',
      },
      {
        q: '¿Por qué no usar simplemente Auth0 o Firebase?',
        a: 'Puedes hacerlo, pero renuncias a control, coste a escala y quedas atado al proveedor. Estas primitivas son tuyas: autoalojadas, inspeccionables y construidas al estándar de un mensajero cifrado, no de un SaaS genérico.',
      },
    ],
  },
};

const pt: LocalizedContent = {
  'cloud-migration': {
    nav: 'Migração para nuvem',
    title: 'Consultoria em Migração para Nuvem',
    description:
      'Consultoria em migração para nuvem que leva você para a AWS ou GCP aos poucos — a produção continua no ar, sem reescrita arriscada de uma vez só. Normalmente mais barato do que aquilo que substitui.',
    h1: 'Migração para nuvem sem downtime',
    lead: 'Chegue à AWS ou GCP sem apostar o negócio em um fim de semana de virada total. Eu movo o que vale a pena mover, deixo de lado o que não vale e mantenho a produção rodando o tempo todo.',
    problems: [
      'Seus servidores estão envelhecendo, os custos estão subindo aos poucos ou o contrato do data center está acabando.',
      'Você já tentou "mover tudo de uma vez" antes — ou tem medo de tentar.',
      'Ninguém no time já migrou uma produção em escala antes.',
    ],
    deliverables: [
      'Um plano de migração em etapas — o de menor risco primeiro, com rollback em cada passo. Sem virada total num fim de semana.',
      'Uma estrutura AWS multi-conta (contas separadas para prod, dev e segurança) para que um erro em dev nunca possa afetar a produção e os custos sejam rastreáveis por time.',
      'Uma rede que escala: Transit Gateway em topologia hub-and-spoke em vez de um emaranhado de VPC peering, subnets privadas para aplicações e dados, e VPC endpoints para que o tráfego da AWS nunca passe pela internet pública.',
      'Defesa em profundidade desde o primeiro dia — roles do IAM em vez de chaves de acesso, GuardDuty e Security Hub monitorando, e criptografia KMS em tudo.',
      'Tudo reconstruído como Terraform, com state remoto e locking — reproduzível, revisável e reconstruível, não configurado clicando à mão no console.',
      'Multi-AZ para que um único data center da Amazon possa falhar sem derrubar você, além de backups que são de fato testados.',
      'Seu time treinado e o ambiente documentado — sem dependência permanente de mim.',
    ],
    outcome:
      'A maioria das migrações termina sem que os usuários percebam — e geralmente mais barata do que aquilo que substituiu.',
    faqs: [
      {
        q: 'Vai haver downtime?',
        a: 'Não do tipo planejado. Movemos de forma incremental e mantemos o ambiente antigo no ar até o novo estar comprovado, com rollback em cada passo.',
      },
      {
        q: 'Lift-and-shift ou rearquitetura completa?',
        a: 'O que compensar — muitas vezes uma mistura pragmática: mova as partes chatas, rearquitete apenas o que claramente se beneficia disso.',
      },
      {
        q: 'Você só configura uma conta AWS?',
        a: 'Não. Uma única conta para tudo é erro de iniciante. Contas separadas para prod, dev e segurança contêm o raio de impacto de qualquer erro e tornam os custos rastreáveis por time — reforçado com os guardrails do Control Tower.',
      },
    ],
  },
  kubernetes: {
    nav: 'Kubernetes',
    title: 'Consultoria em Kubernetes',
    description:
      'Consultoria em Kubernetes para produção: clusters EKS/GKE que escalam sob demanda e encolhem junto com a sua fatura via Karpenter — sem o excesso de YAML. Além de uma resposta honesta sobre se você realmente precisa disso.',
    h1: 'Kubernetes, só onde ele se paga',
    lead: 'Clusters de nível produção que escalam quando o tráfego dispara e encolhem (junto com a conta) quando não — sem os milhares de linhas de YAML que ninguém entende.',
    problems: [
      'Seus clusters estão superdimensionados e a fatura mostra isso.',
      'Os deploys são frágeis e só uma pessoa entende os Helm charts.',
      'Você nem tem certeza se precisava de Kubernetes — mas aqui está você.',
    ],
    deliverables: [
      'Uma resposta honesta primeiro: se serviços gerenciados ou um punhado de containers resolvem, você vai ouvir isso — Kubernetes entra só quando sua escala ou o tamanho do time justificam.',
      'Cargas de trabalho dimensionadas com base no uso real de percentil 95 vindo do Prometheus, não em chutes. A maioria dos clusters fica ociosa perto de 10% de CPU — você está pagando pelo resto.',
      'Autoscaling com Karpenter que combina spot e on-demand (cargas stateless rodam ~70% mais barato em spot), provisiona nodes em segundos e consolida os ociosos.',
      'Health probes inegociáveis — liveness, readiness e startup — para que um pod quebrado saia do load balancer em vez de servir erros silenciosamente.',
      'Containers endurecidos: imagens distroless (~80× menores que Ubuntu, superfície de ataque mínima), non-root, filesystem raiz somente leitura, capabilities do Linux removidas e scan com Trivy que quebra o build em CVEs críticas.',
      'Rede zero-trust com network policies (Cilium), Pod Security Standards em "restricted" e secrets no Secrets Manager ou Vault — nunca em variáveis de ambiente.',
      'GitOps com ArgoCD: o cluster sempre reflete o git, toda mudança é um commit e o rollback é um git revert.',
    ],
    outcome: 'Clusters que custam menos, se recuperam sozinhos e não precisam de babá.',
    faqs: [
      {
        q: 'Eu realmente preciso de Kubernetes?',
        a: 'Talvez não. Se serviços gerenciados ou alguns containers resolvem, eu te digo — e te poupo do custo operacional.',
      },
      {
        q: 'EKS ou GKE?',
        a: 'Os dois funcionam. Eu escolho com base em onde seu time e o resto da sua stack já estão.',
      },
      {
        q: 'Como você mantém os containers seguros?',
        a: 'Imagens distroless sem shell nem gerenciador de pacotes, rodando non-root em um filesystem somente leitura com as capabilities do Linux removidas, além de scan de imagem no CI. Se algum dia acontecer uma execução remota de código, não há nada dentro para explorar — essa é a diferença entre um incidente e uma catástrofe.',
      },
    ],
  },
  'cost-optimization': {
    nav: 'Custo e confiabilidade',
    title: 'Otimização de Custos na Nuvem',
    description:
      'Consultoria em otimização de custos na nuvem. Reduza sua fatura da AWS ou GCP com ARM/Graviton, right-sizing e autoscaling — sem prejudicar a confiabilidade. Economia típica de 20 a 40%.',
    h1: 'Reduza a fatura da nuvem, mantenha a confiabilidade',
    lead: 'Encontre os itens que drenam seu orçamento silenciosamente, corte-os e garanta que nada quebre no processo. Chato, confiável e mais barato.',
    problems: [
      'Sua fatura da nuvem não para de subir e ninguém sabe ao certo por quê.',
      'O financeiro faz perguntas que você não consegue responder linha por linha.',
      'Você suspeita que está pagando por capacidade ociosa — mas cortar parece arriscado.',
    ],
    deliverables: [
      'Um detalhamento linha por linha por time e projeto (tagueamento adequado mais Cost Explorer) para que você finalmente saiba para onde o dinheiro realmente vai.',
      'Right-sizing das instâncias superdimensionadas — o m5.2xlarge parado em 5% de CPU — geralmente o ganho mais rápido na fatura.',
      'ARM/Graviton e Spot para cargas stateless (~70% mais barato), além de Savings Plans e Reserved Instances para carga constante (20 a 60% de desconto sobre o on-demand).',
      'S3 Intelligent-Tiering para que dados frios migrem sozinhos para armazenamento mais barato — até 95% de desconto em arquivamento, sem políticas manuais para gerenciar.',
      'Autoscaling que de fato reduz, até zero, quando a carga cai.',
      'Confiabilidade preservada: Multi-AZ, réplicas de leitura, health checks e observabilidade com CloudWatch/X-Ray. Mais barato, não mais instável.',
    ],
    outcome: 'Muitas vezes de 20 a 40% de redução na fatura — sem adicionar um único alerta às 3 da manhã.',
    faqs: [
      {
        q: 'Cortar custos vai prejudicar a confiabilidade?',
        a: 'É justamente esse o ponto — eu corto desperdício, não margens de segurança. A confiabilidade muitas vezes melhora porque o ambiente fica mais simples.',
      },
      {
        q: 'Que economia é realista?',
        a: 'Varia, mas 20 a 40% é comum quando ARM, Spot, Savings Plans e right-sizing ainda não foram usados. Só o Spot já dá ~70% de desconto para cargas stateless; RDS reservado roda com 35 a 60% de desconto.',
      },
      {
        q: 'De onde costuma vir a economia?',
        a: 'Na maior parte, do trivial: right-sizing de instâncias superdimensionadas, migração de cargas stateless para ARM e Spot, compromisso de carga constante em Savings Plans e desligar o que fica ocioso.',
      },
    ],
  },
  'cicd-iac': {
    nav: 'CI/CD e IaC',
    title: 'CI/CD e Infraestrutura como Código',
    description:
      'Consultoria em CI/CD e Infraestrutura como Código. Deployments chatos e repetíveis e infraestrutura gerenciada com Terraform, revisada, versionada e reconstruível do zero.',
    h1: 'Faça do deploy um não-evento',
    lead: 'Você dá o push, ele faz o deploy, todo mundo segue em frente. Todo o seu ambiente vive no Terraform — revisado, versionado e reconstruível do zero.',
    problems: [
      'Os deploys são manuais, estressantes ou feitos por uma pessoa só num dia bom.',
      'Sua infraestrutura existe só na cabeça de alguém ou no console da nuvem.',
      'Rollbacks significam pânico em vez de um botão.',
    ],
    deliverables: [
      'Pipelines de CI/CD (GitHub Actions, GitLab ou Jenkins) que fazem build, testam, escaneiam e fazem deploy a cada push — com o Trivy quebrando o build em CVEs críticas antes de qualquer coisa chegar à produção.',
      'Rolling deploys sem downtime, feitos direito: maxSurge/maxUnavailable ajustados, connection draining e tratamento gracioso de SIGTERM — para que as instâncias sejam recicladas sem derrubar requisições, mesmo sob carga.',
      'Mudanças de schema seguras com o padrão expand-contract, para que migrações de banco de dados nunca quebrem a versão que ainda está rodando no meio do rollout.',
      'Toda a infraestrutura como Terraform — state remoto no S3 com locking via DynamoDB, um diretório separado por ambiente (nunca workspaces), plan em cada PR e uma aprovação manual para aplicar.',
      'OIDC em vez de chaves de nuvem de longa duração, secrets no Secrets Manager (nunca commitados) e IAM de menor privilégio para que a pipeline não consiga destruir a produção.',
      'Documentação e handover para que qualquer engenheiro consiga fazer deploy — não só quem construiu.',
    ],
    outcome: 'Fazer deploy vira rotina — e sua infraestrutura pode ser reconstruída a partir de um repositório git.',
    faqs: [
      {
        q: 'Quais ferramentas de CI/CD você usa?',
        a: 'O que se encaixar na sua stack — GitHub Actions, GitLab CI, CircleCI ou Jenkins. Eu não imponho uma favorita.',
      },
      {
        q: 'Terraform ou outra coisa?',
        a: 'Geralmente Terraform, pelo ecossistema e portabilidade, mas eu trabalho com o que você já usa se estiver sólido.',
      },
      {
        q: 'Como você faz deploy sem downtime?',
        a: 'Rolling updates com maxSurge 1 e maxUnavailable 0, readiness probes que controlam o tráfego e connection draining, para que as instâncias sejam recicladas sem derrubar requisições. Blue-green ou canary quando a mudança justificar.',
      },
    ],
  },
  'ai-app-audit': {
    nav: 'Auditoria de app com IA',
    title: 'Auditoria e Resgate de Apps Feitos com IA',
    description:
      'Audite e reforce apps construídos com Cursor, Claude ou Copilot. Encontre as falhas de segurança e as armadilhas arquiteturais que a IA deixa para trás — antes que custem caro.',
    h1: 'Seu app feito com IA, auditado e sem riscos',
    lead: 'Lançou algo construído em boa parte por Cursor, Claude ou Copilot e, no fundo, teme que ele desmorone? Eu encontro as falhas de segurança e as armadilhas arquiteturais que as ferramentas de IA deixam para trás — e te digo exatamente o que corrigir, em português claro.',
    problems: [
      'A maior parte do seu código foi escrita por uma IA, e ninguém sênior de fato leu isso.',
      'Ele funciona bem na demo, mas você não sabe dizer se é seguro, escalável ou um castelo de cartas.',
      'Você está prestes a receber pagamentos, dados de usuários ou investimento em cima disso.',
    ],
    deliverables: [
      'Uma auditoria completa do código gerado por IA — segurança, arquitetura, modelo de dados e as "grandes decisões" que a IA costuma errar de forma sutil.',
      'Um relatório de achados priorizados (crítico → desejável) em linguagem clara, com o risco real de cada item explicado.',
      'Revisão de segurança: autenticação, autorização, secrets, validação de entrada, injeção, dados expostos e CVEs de dependências.',
      'Revisão de arquitetura: a estrutura se sustenta ou vai precisar de uma reescrita com 10× de usuários?',
      'Correções sob demanda — eu mesmo remedio os achados críticos ou entrego ao seu time um plano claro. A escolha é sua.',
    ],
    outcome: 'Você descobre se está sentado sobre um app sólido ou uma bomba-relógio — antes dos seus usuários, ou de um atacante, descobrirem.',
    faqs: [
      {
        q: 'De quais ferramentas de IA você audita o código?',
        a: 'Todas elas — Cursor, Claude Code, GitHub Copilot, ChatGPT, v0, Lovable, seja o que for que construiu. Os padrões de falha são parecidos independentemente do modelo que escreveu.',
      },
      {
        q: 'O que você costuma encontrar?',
        a: 'Auditorias do setor ao longo de 2025–2026 revelaram pelo menos um problema crítico ou de alta severidade em praticamente todo código construído com IA, e eu procuro exatamente isso: secrets expostos, verificações de autorização ausentes, modelos de dados ingênuos e arquitetura que não sobrevive a tráfego real. Você recebe uma lista clara e priorizada do que é de fato arriscado.',
      },
      {
        q: 'Você só reporta ou também corrige?',
        a: 'As duas coisas. Você recebe o relatório de qualquer forma; eu posso remediar os itens críticos eu mesmo ou orientar seu time a fazê-lo.',
      },
    ],
  },
  'architecture-review': {
    nav: 'Revisão de arquitetura',
    title: 'Revisão de Arquitetura de Software',
    description:
      'Uma segunda opinião honesta sobre a arquitetura do seu software — o que escala, o que quebra e o que corrigir antes que fique caro. Respaldada por eu mesmo ter construído um app com criptografia ponta a ponta a partir de um único código-base multiplataforma.',
    h1: 'Sua arquitetura foi feita para durar?',
    lead: 'Uma segunda opinião sem ilusões sobre como seu sistema é construído — o que se sustenta, o que quebra em escala e o que vai silenciosamente te custar caro. Sem dogma, só trade-offs.',
    problems: [
      'Você não tem certeza se sua arquitetura sobrevive a 10× de usuários — ou ao próximo trimestre.',
      'Cada funcionalidade demora mais que a anterior, e ninguém sabe ao certo por quê.',
      'Você está escolhendo entre monolito e microsserviços e recebendo religião em vez de respostas.',
    ],
    deliverables: [
      'Uma revisão da sua arquitetura frente a para onde o negócio de fato está indo — não a um ideal de livro-texto.',
      'Posições honestas sobre as grandes decisões: monolito vs microsserviços, modelo de dados, fronteiras de serviço, síncrono vs assíncrono.',
      'A checagem de "bola de lama" — onde o acoplamento está silenciosamente tornando cada mudança mais difícil e arriscada.',
      'Uma lista priorizada do que corrigir agora, o que monitorar e o que deixar quieto — over-engineering também custa.',
      'Padrões que se encaixam no tamanho e no estágio do seu time: chato e sustentável em vez de esperto.',
    ],
    outcome: 'Você para de adivinhar sobre a sua base e ganha um caminho claro e priorizado — mantenha o que funciona, corrija o que importa.',
    faqs: [
      {
        q: 'Monolito ou microsserviços?',
        a: 'Geralmente um monolito bem estruturado até você ter evidência real de que precisa dividir — times separados atropelando uns aos outros, necessidades de escala muito diferentes. Você divide um monolito limpo em dias; você não desenreda uma bola de lama sem uma reescrita.',
      },
      {
        q: 'Você vai me mandar reescrever tudo?',
        a: 'Quase nunca. Reescritas são onde os projetos vão morrer. Eu encontro as poucas mudanças que trazem mais retorno e deixo o resto quieto.',
      },
    ],
  },
  'idea-to-production': {
    nav: 'Ideia → produção',
    title: 'Da Ideia à Produção',
    description:
      'Leve uma ideia a um app real, lançado e de nível produção — arquitetura, construção, segurança e a infraestrutura para rodá-lo. Respaldado por ter construído um mensageiro criptografado a partir de um único código-base multiplataforma, sozinho.',
    h1: 'Da ideia a um produto real e lançado',
    lead: 'Você tem uma ideia — ou um protótipo tosco — e precisa de alguém que consiga levá-la até o fim: arquitetada direito, construída para durar, protegida e de fato implantada. Não um slide. Um produto.',
    problems: [
      'Você tem a ideia, talvez um protótipo, mas não a engenharia sênior para torná-la real.',
      'Você não quer um MVP descartável que terá que reconstruir no momento em que ele funcionar.',
      'Você precisa de uma pessoa que possa ser dona da arquitetura, da construção, da segurança e do deploy — não de coordenar cinco.',
    ],
    deliverables: [
      'Arquitetura e um plano que começa simples e ganha complexidade só quando o produto ganha.',
      'A construção de verdade — backend, dados, APIs e as partes difíceis (auth, pagamentos, tempo real, criptografia) feitas direito.',
      'Infraestrutura de produção: CI/CD, Terraform, monitoramento e um deploy no qual você pode confiar.',
      'Segurança incorporada desde o primeiro dia, não parafusada depois do vazamento.',
      'Documentação e handover para que seu time, ou sua próxima contratação, consiga rodar sem mim.',
    ],
    outcome: 'Você fica com um produto que está de fato em produção e construído para crescer — não um protótipo que precisa jogar fora.',
    faqs: [
      {
        q: 'Você consegue mesmo fazer tudo isso sozinho?',
        a: 'Sim — nas horas vagas estou construindo o Chatter, um mensageiro com criptografia ponta a ponta: um cliente em Rust para toda plataforma (Linux, Windows e Android hoje, iOS e macOS planejados) sobre um backend em Go com criptografia do Signal Protocol. Isso me mantém com a mão na massa em toda a stack, da criptografia ao deploy — então eu consigo ser dono da arquitetura e das partes difíceis do seu projeto também.',
      },
      {
        q: 'Fracionado ou construção completa?',
        a: 'Qualquer um dos dois. Eu posso liderar de ponta a ponta ou trabalhar junto com seu time e ser dono da arquitetura e das partes difíceis.',
      },
    ],
  },
  'building-blocks': {
    nav: 'Blocos de construção',
    title: 'Blocos de Construção para Produção',
    description:
      'Serviços prontos para acoplar ao seu app — autenticação, gestão de usuários e manipulação de arquivos criptografados — adaptados de um código-base real de mensageiro criptografado que eu construí. Pule a etapa de reconstruir as partes difíceis e arriscadas do zero.',
    h1: 'As partes difíceis, já construídas do jeito certo',
    lead: 'Auth, gestão de usuários, manipulação de arquivos criptografados — as peças que todo mundo erra de forma sutil (especialmente as ferramentas de IA). Comece a partir de primitivas adaptadas de um código-base real de mensageiro criptografado, em vez de reconstruí-las do zero na esperança de acertar.',
    problems: [
      'Você está prestes a construir auth do zero — ou deixar uma ferramenta de IA fazer — pela terceira vez.',
      'As peças críticas de segurança (login, sessões, uploads de arquivos) são exatamente onde um erro dói mais.',
      'Cada semana gasta reinventando primitivas é uma semana não gasta no seu produto de verdade.',
    ],
    deliverables: [
      'Autenticação e gestão de dispositivos/sessões — baseada em tokens, multi-dispositivo, sem os footguns de JWT mal resolvidos. Extraída e endurecida de uma plataforma real.',
      'Serviço de usuário e identidade — perfis, multi-dispositivo e um modelo de relacionamento/permissão feito com padrões comprovados (SpiceDB / Zanzibar).',
      'Serviço de arquivos criptografados — uploads em chunks com AES-256-GCM, varredura de vírus e acesso via URLs pré-assinadas, não um bucket público ingênuo.',
      'Fronteiras de serviço limpas (DDD) para que cada primitiva se acople ao seu app sem arrastar o resto junto.',
      'Integrado à sua stack e documentado — seu para possuir e inspecionar, não uma caixa-preta.',
    ],
    outcome: 'Você pula meses reconstruindo as fundações arriscadas e chatas e começa a partir de primitivas construídas no padrão de um mensageiro criptografado real.',
    faqs: [
      {
        q: 'São prontas de prateleira ou sob medida?',
        a: 'São serviços que eu já construí para um projeto real de mensageiro criptografado (Chatter), adaptados à sua stack — então você começa de uma fundação que funciona em vez do zero, sem o aprisionamento de um SaaS.',
      },
      {
        q: 'Quais primitivas estão disponíveis?',
        a: 'Autenticação e gestão de dispositivos/sessões, usuário/identidade com permissões granulares e manipulação de arquivos criptografados hoje — os bounded contexts de um código-base real em DDD, extraíveis como serviços independentes.',
      },
      {
        q: 'Por que não usar simplesmente Auth0 ou Firebase?',
        a: 'Você pode — mas troca controle, custo em escala e fica preso ao fornecedor. Essas primitivas são suas: self-hosted, inspecionáveis e construídas no padrão de um mensageiro criptografado, não de um SaaS genérico.',
      },
    ],
  },
};

const fr: LocalizedContent = {
  'cloud-migration': {
    nav: 'Migration cloud',
    title: "Conseil en migration cloud",
    description:
      "Conseil en migration cloud qui vous fait passer vers AWS ou GCP par étapes — la production reste en ligne, sans réécriture risquée en big-bang. Généralement moins cher que ce qu'elle remplace.",
    h1: "La migration cloud sans interruption de service",
    lead: "Passez à AWS ou GCP sans miser toute votre activité sur un week-end en big-bang. Je migre ce qui mérite de l'être, laisse de côté ce qui ne l'est pas, et maintiens la production en fonctionnement du début à la fin.",
    problems: [
      "Vos serveurs vieillissent, les coûts grimpent, ou un bail de data-center arrive à échéance.",
      "Vous avez déjà tenté le « tout migrer d'un coup » — ou l'idée vous effraie.",
      "Personne dans l'équipe n'a déjà migré une production à grande échelle.",
    ],
    deliverables: [
      "Un plan de migration par étapes — le moins risqué d'abord, avec un rollback à chaque étape. Pas de week-end en big-bang.",
      "Une architecture AWS multi-comptes (comptes prod, dev et sécurité séparés) pour qu'une erreur en dev ne puisse jamais toucher la production et que les coûts soient traçables par équipe.",
      "Un réseau qui passe à l'échelle : un hub-and-spoke Transit Gateway au lieu d'un enchevêtrement de peering VPC, des sous-réseaux privés pour les applications et les données, et des VPC endpoints pour que le trafic AWS ne traverse jamais l'internet public.",
      "Une défense en profondeur dès le premier jour — des rôles IAM plutôt que des clés d'accès, GuardDuty et Security Hub en surveillance, et le chiffrement KMS sur tout.",
      "Tout reconstruit en Terraform avec état distant et verrouillage — reproductible, révisable et reconstructible, pas cliqué à la main dans une console.",
      "Du Multi-AZ pour qu'un seul data center Amazon puisse tomber sans vous mettre hors ligne, plus des sauvegardes réellement testées.",
      "Votre équipe formée et l'installation documentée — aucune dépendance permanente à mon égard.",
    ],
    outcome:
      "La plupart des migrations s'achèvent sans que les utilisateurs s'en aperçoivent — et généralement pour moins cher que ce qu'elles remplacent.",
    faqs: [
      {
        q: "Y aura-t-il une interruption de service ?",
        a: "Pas d'interruption planifiée. Nous migrons de façon incrémentale et gardons l'ancien environnement actif jusqu'à ce que le nouveau ait fait ses preuves, avec un rollback à chaque étape.",
      },
      {
        q: "Lift-and-shift ou ré-architecture complète ?",
        a: "Celle qui est rentable — souvent un mélange pragmatique : on soulève les parties sans enjeu, on ré-architecture uniquement ce qui en tire clairement bénéfice.",
      },
      {
        q: "Vous configurez simplement un seul compte AWS ?",
        a: "Non. Un compte unique pour tout est une erreur de débutant. Des comptes prod, dev et sécurité séparés limitent le rayon d'impact de toute erreur et rendent les coûts traçables par équipe — le tout imposé par les garde-fous de Control Tower.",
      },
    ],
  },
  kubernetes: {
    nav: 'Kubernetes',
    title: "Conseil Kubernetes",
    description:
      "Conseil Kubernetes en production : des clusters EKS/GKE qui montent en charge à la demande et se réduisent avec votre facture grâce à Karpenter — sans la prolifération de YAML. Et une réponse honnête sur le fait d'en avoir besoin ou non.",
    h1: "Kubernetes, uniquement là où il est rentable",
    lead: "Des clusters de qualité production qui montent en charge quand le trafic explose et se réduisent (avec la facture) quand ce n'est pas le cas — moins les milliers de lignes de YAML que personne ne comprend.",
    problems: [
      "Vos clusters sont surdimensionnés et la facture le montre.",
      "Les déploiements sont fragiles, et une seule personne comprend les charts Helm.",
      "Vous n'êtes pas sûr d'avoir vraiment eu besoin de Kubernetes — mais vous voilà avec.",
    ],
    deliverables: [
      "Une réponse honnête d'abord : si des services managés ou une poignée de conteneurs font l'affaire, vous l'entendrez — Kubernetes n'entre en jeu que lorsque votre échelle ou la taille de votre équipe le justifie.",
      "Des charges de travail correctement dimensionnées à partir de l'usage réel au 95e centile mesuré par Prometheus, pas de suppositions. La plupart des clusters tournent au ralenti à près de 10 % de CPU — vous payez pour le reste.",
      "Un autoscaling Karpenter qui combine spot et on-demand (les charges stateless tournent environ 70 % moins cher en spot), provisionne des nœuds en quelques secondes et consolide ceux qui sont inactifs.",
      "Des sondes de santé non négociables — liveness, readiness et startup — pour qu'un pod défaillant quitte le load balancer au lieu de servir silencieusement des erreurs.",
      "Des conteneurs durcis : des images distroless (environ 80× plus petites qu'Ubuntu, surface d'attaque minime), non-root, système de fichiers racine en lecture seule, capabilities Linux supprimées, et un scan Trivy qui fait échouer le build en cas de CVE critiques.",
      "Un réseau zero-trust avec des network policies (Cilium), des Pod Security Standards réglés sur « restricted », et les secrets dans Secrets Manager ou Vault — jamais dans des variables d'environnement.",
      "Du GitOps avec ArgoCD : le cluster correspond toujours à git, chaque changement est un commit, et le rollback est un git revert.",
    ],
    outcome: "Des clusters qui coûtent moins cher, se rétablissent tout seuls et n'ont pas besoin de baby-sitter.",
    faqs: [
      {
        q: "Ai-je vraiment besoin de Kubernetes ?",
        a: "Peut-être pas. Si des services managés ou quelques conteneurs font l'affaire, je vous le dirai — et je vous épargnerai la taxe opérationnelle.",
      },
      {
        q: "EKS ou GKE ?",
        a: "Les deux fonctionnent. Je choisis en fonction de là où votre équipe et le reste de votre stack se trouvent déjà.",
      },
      {
        q: "Comment sécurisez-vous les conteneurs ?",
        a: "Des images distroless sans shell ni gestionnaire de paquets, tournant en non-root sur un système de fichiers en lecture seule avec les capabilities Linux supprimées, plus un scan des images en CI. Si jamais quelque chose obtient une exécution de code à distance, il n'y a rien à l'intérieur à exploiter — c'est la différence entre un incident et une catastrophe.",
      },
    ],
  },
  'cost-optimization': {
    nav: 'Coûts & fiabilité',
    title: "Optimisation des coûts cloud",
    description:
      "Conseil en optimisation des coûts cloud. Réduisez votre facture AWS ou GCP avec ARM/Graviton, le right-sizing et l'autoscaling — sans nuire à la fiabilité. Économies typiques de 20 à 40 %.",
    h1: "Réduisez votre facture cloud, gardez la fiabilité",
    lead: "Repérez les postes qui vident discrètement votre budget, éliminez-les, et assurez-vous que rien ne casse au passage. Ennuyeux, fiable et moins cher.",
    problems: [
      "Votre facture cloud ne cesse de grimper et personne ne sait vraiment pourquoi.",
      "La finance pose des questions auxquelles vous ne pouvez pas répondre poste par poste.",
      "Vous soupçonnez de payer pour de la capacité inutilisée — mais la couper semble risqué.",
    ],
    deliverables: [
      "Une ventilation poste par poste par équipe et par projet (un tagging correct plus Cost Explorer) pour enfin savoir où part réellement l'argent.",
      "Le right-sizing des instances surdimensionnées — la m5.2xlarge tournant à 5 % de CPU — souvent le gain le plus rapide sur la facture.",
      "ARM/Graviton et Spot pour les charges stateless (environ 70 % moins cher), plus les Savings Plans et les Reserved Instances pour la charge stable (20 à 60 % de réduction sur l'on-demand).",
      "S3 Intelligent-Tiering pour que les données froides glissent d'elles-mêmes vers un stockage moins cher — jusqu'à 95 % de réduction sur l'archivage, sans politiques manuelles à surveiller.",
      "Un autoscaling qui réduit réellement la voilure, et jusqu'à zéro, quand la charge baisse.",
      "La fiabilité préservée : Multi-AZ, réplicas en lecture, health checks, et l'observabilité CloudWatch/X-Ray. Moins cher, pas plus instable.",
    ],
    outcome: "Souvent 20 à 40 % de réduction sur la facture — sans ajouter une seule alerte à 3 h du matin.",
    faqs: [
      {
        q: "Réduire les coûts va-t-il nuire à la fiabilité ?",
        a: "C'est justement tout l'enjeu — je coupe le gaspillage, pas les marges de sécurité. La fiabilité s'améliore souvent parce que l'installation devient plus simple.",
      },
      {
        q: "Quelles économies sont réalistes ?",
        a: "Cela varie, mais 20 à 40 % est courant lorsque ARM, Spot, les Savings Plans et le right-sizing n'ont pas encore été utilisés. Le Spot à lui seul représente environ 70 % de réduction pour les charges stateless ; du RDS réservé tourne 35 à 60 % moins cher.",
      },
      {
        q: "D'où viennent généralement les économies ?",
        a: "Surtout des choses ennuyeuses : le right-sizing des instances surdimensionnées, le déplacement des charges stateless vers ARM et Spot, l'engagement de la charge stable sur des Savings Plans, et l'extinction de ce qui reste inactif.",
      },
    ],
  },
  'cicd-iac': {
    nav: 'CI/CD & IaC',
    title: "CI/CD & Infrastructure as Code",
    description:
      "Conseil en CI/CD et Infrastructure as Code. Des déploiements ennuyeux et reproductibles et une infrastructure gérée par Terraform, révisée, versionnée et reconstructible de zéro.",
    h1: "Faites de la mise en production un non-événement",
    lead: "Vous poussez, ça se déploie, tout le monde passe à autre chose. Toute votre installation vit dans Terraform — révisée, versionnée et reconstructible de zéro.",
    problems: [
      "Les déploiements sont manuels, stressants, ou effectués par une seule personne les bons jours.",
      "Votre infrastructure n'existe que dans la tête de quelqu'un ou dans la console cloud.",
      "Les rollbacks se traduisent par la panique au lieu d'un simple bouton.",
    ],
    deliverables: [
      "Des pipelines CI/CD (GitHub Actions, GitLab ou Jenkins) qui buildent, testent, scannent et déploient au push — avec Trivy qui fait échouer le build sur les CVE critiques avant que quoi que ce soit n'atteigne la production.",
      "Des déploiements progressifs sans interruption faits correctement : maxSurge/maxUnavailable réglés, drainage des connexions, et gestion propre du SIGTERM — pour que les instances tournent sans perdre de requêtes, même sous charge.",
      "Des changements de schéma sûrs avec le pattern expand-contract, pour que les migrations de base de données ne cassent jamais la version encore en cours d'exécution pendant le rollout.",
      "Toute l'infrastructure en Terraform — état distant dans S3 avec verrouillage DynamoDB, un répertoire séparé par environnement (jamais de workspaces), un plan sur chaque PR, et une approbation manuelle pour appliquer.",
      "OIDC au lieu de clés cloud à longue durée de vie, les secrets dans Secrets Manager (jamais commités), et un IAM au moindre privilège pour que le pipeline ne puisse pas détruire la production.",
      "De la documentation et une passation pour que n'importe quel ingénieur puisse livrer — pas seulement celui qui l'a construit.",
    ],
    outcome: "La mise en production devient une routine — et votre infrastructure peut être reconstruite à partir d'un dépôt git.",
    faqs: [
      {
        q: "Quels outils CI/CD utilisez-vous ?",
        a: "Ceux qui conviennent à votre stack — GitHub Actions, GitLab CI, CircleCI ou Jenkins. Je n'impose pas de préféré.",
      },
      {
        q: "Terraform ou autre chose ?",
        a: "Généralement Terraform pour son écosystème et sa portabilité, mais je travaillerai avec ce que vous utilisez déjà si c'est solide.",
      },
      {
        q: "Comment déployez-vous sans interruption ?",
        a: "Des mises à jour progressives avec maxSurge à 1 et maxUnavailable à 0, des sondes de readiness qui conditionnent le trafic, et un drainage des connexions, pour que les instances tournent sans perdre de requêtes. Blue-green ou canary quand un changement le justifie.",
      },
    ],
  },
  'ai-app-audit': {
    nav: "Audit d'app IA",
    title: "Audit & sauvetage d'app construite par IA",
    description:
      "Auditez et durcissez les applications construites avec Cursor, Claude ou Copilot. Trouvez les failles de sécurité et les pièges architecturaux que l'IA laisse derrière elle — avant qu'ils ne vous coûtent cher.",
    h1: "Votre app construite par IA, auditée et dé-risquée",
    lead: "Vous avez livré quelque chose construit essentiellement par Cursor, Claude ou Copilot et vous craignez discrètement que ça s'effondre ? Je trouve les failles de sécurité et les pièges architecturaux que les outils d'IA laissent derrière eux — et je vous dis exactement quoi corriger, en clair.",
    problems: [
      "La majeure partie de votre code a été écrite par une IA, et personne de senior ne l'a réellement lue.",
      "Ça fonctionne en démo, mais vous ne pouvez pas dire si c'est sécurisé, scalable, ou un château de cartes.",
      "Vous êtes sur le point d'accepter des paiements, des données utilisateurs ou un investissement par-dessus.",
    ],
    deliverables: [
      "Un audit complet du code généré par IA — sécurité, architecture, modèle de données, et les « grandes décisions » que l'IA a tendance à se tromper de façon subtile.",
      "Un rapport de constats priorisés (critique → confort) en langage clair, avec le risque concret de chaque point détaillé.",
      "Une revue de sécurité : authentification, autorisation, secrets, validation des entrées, injection, données exposées et CVE des dépendances.",
      "Une revue d'architecture : la structure tient-elle, ou faudra-t-il une réécriture avec 10× plus d'utilisateurs ?",
      "Des corrections sur demande — je remédie moi-même aux constats critiques, ou je remets à votre équipe un plan clair. À vous de choisir.",
    ],
    outcome: "Vous découvrez si vous êtes assis sur une application solide ou sur une bombe à retardement — avant vos utilisateurs, ou un attaquant.",
    faqs: [
      {
        q: "Le code de quels outils d'IA auditez-vous ?",
        a: "Tous — Cursor, Claude Code, GitHub Copilot, ChatGPT, v0, Lovable, quel que soit l'outil. Les schémas de défaillance sont similaires quel que soit le modèle qui a écrit le code.",
      },
      {
        q: "Que trouvez-vous habituellement ?",
        a: "Les audits du secteur menés jusqu'en 2025-2026 ont révélé au moins un problème critique ou de gravité élevée dans pratiquement chaque base de code construite par IA, et je cherche la même chose : secrets exposés, contrôles d'autorisation manquants, modèles de données naïfs, et une architecture qui ne survivra pas à un vrai trafic. Vous obtenez une liste claire et priorisée de ce qui est réellement risqué.",
      },
      {
        q: "Vous vous contentez de rapporter, ou vous corrigez aussi ?",
        a: "Les deux. Vous obtenez le rapport dans tous les cas ; je peux remédier moi-même aux points critiques ou guider votre équipe pour le faire.",
      },
    ],
  },
  'architecture-review': {
    nav: "Revue d'architecture",
    title: "Revue d'architecture logicielle",
    description:
      "Un second avis honnête sur votre architecture logicielle — ce qui passe à l'échelle, ce qui casse, et ce qu'il faut corriger avant que ça ne coûte cher. Appuyé sur la construction d'une application chiffrée de bout en bout à partir d'une seule base de code multiplateforme.",
    h1: "Votre architecture est-elle bâtie pour durer ?",
    lead: "Un second avis lucide sur la façon dont votre système est construit — ce qui tient, ce qui casse à l'échelle, et ce qui va discrètement vous coûter cher. Pas de dogme, juste des compromis.",
    problems: [
      "Vous n'êtes pas sûr que votre architecture survivra à 10× plus d'utilisateurs — ou au trimestre prochain.",
      "Chaque fonctionnalité prend plus de temps que la précédente, et personne ne sait vraiment pourquoi.",
      "Vous hésitez entre un monolithe et des microservices et vous récoltez de la religion au lieu de réponses.",
    ],
    deliverables: [
      "Une revue de votre architecture au regard de là où va réellement l'entreprise — pas d'un idéal théorique.",
      "Des positions honnêtes sur les grandes décisions : monolithe vs microservices, modèle de données, frontières de services, synchrone vs asynchrone.",
      "Le test de la « boule de boue » — là où le couplage rend discrètement chaque changement plus difficile et plus risqué.",
      "Une liste priorisée de ce qu'il faut corriger maintenant, surveiller, et laisser tranquille — la sur-ingénierie coûte cher elle aussi.",
      "Des patterns adaptés à la taille et au stade de votre équipe : ennuyeux et maintenable plutôt que malin.",
    ],
    outcome: "Vous cessez de spéculer sur vos fondations et obtenez un chemin clair et priorisé — gardez ce qui marche, corrigez ce qui compte.",
    faqs: [
      {
        q: "Monolithe ou microservices ?",
        a: "Généralement un monolithe bien structuré jusqu'à ce que vous ayez de vraies preuves qu'il faut le découper — des équipes distinctes qui se marchent dessus, des besoins de scaling radicalement différents. On peut découper un monolithe propre en quelques jours ; on ne démêle pas une boule de boue sans réécriture.",
      },
      {
        q: "Allez-vous me dire de tout réécrire ?",
        a: "Presque jamais. Les réécritures sont là où les projets vont mourir. Je trouve les quelques changements qui rapportent le plus et je laisse le reste tranquille.",
      },
    ],
  },
  'idea-to-production': {
    nav: "Idée → production",
    title: "De l'idée à la production",
    description:
      "Menez une idée jusqu'à une application réelle, livrée et de qualité production — architecture, développement, sécurité, et l'infrastructure pour la faire tourner. Appuyé sur la construction en solo d'une messagerie chiffrée à partir d'une seule base de code multiplateforme.",
    h1: "De l'idée à un produit réel et livré",
    lead: "Vous avez une idée — ou un prototype grossier — et il vous faut quelqu'un capable de la mener jusqu'au bout : architecturée correctement, construite pour durer, sécurisée, et réellement déployée. Pas une présentation. Un produit.",
    problems: [
      "Vous avez l'idée, peut-être un prototype, mais pas l'ingénierie senior pour la concrétiser.",
      "Vous ne voulez pas d'un MVP jetable que vous devrez reconstruire dès qu'il fonctionne.",
      "Il vous faut une seule personne capable de porter l'architecture, le développement, la sécurité et le déploiement — pas d'en coordonner cinq.",
    ],
    deliverables: [
      "Une architecture et un plan qui commencent simple et ne gagnent en complexité que lorsque le produit le fait.",
      "Le développement réel — backend, données, API, et les parties difficiles (auth, paiements, temps réel, chiffrement) faites correctement.",
      "Une infrastructure de production : CI/CD, Terraform, monitoring, et un déploiement auquel vous pouvez vous fier.",
      "La sécurité intégrée dès le premier jour, pas rajoutée après la brèche.",
      "De la documentation et une passation pour que votre équipe, ou votre prochaine recrue, puisse la faire tourner sans moi.",
    ],
    outcome: "Vous obtenez un produit réellement en production et bâti pour grandir — pas un prototype à jeter.",
    faqs: [
      {
        q: "Pouvez-vous vraiment tout faire en solo ?",
        a: "Oui — en parallèle je construis Chatter, une messagerie chiffrée de bout en bout : un client Rust unique pour chaque plateforme (Linux, Windows et Android aujourd'hui, iOS et macOS prévus) sur un backend Go avec la cryptographie du Signal Protocol. Cela me garde impliqué concrètement sur toute la stack, du chiffrement au déploiement — pour que je puisse porter l'architecture et les parties difficiles sur votre projet aussi.",
      },
      {
        q: "Mission fractionnée ou construction complète ?",
        a: "Les deux. Je peux la piloter de bout en bout, ou travailler aux côtés de votre équipe et porter l'architecture et les parties difficiles.",
      },
    ],
  },
  'building-blocks': {
    nav: "Briques de base",
    title: "Briques de production prêtes à l'emploi",
    description:
      "Des services prêts à intégrer dans votre application — authentification, gestion des utilisateurs et gestion de fichiers chiffrés — adaptés d'une vraie base de code de messagerie chiffrée que j'ai construite. Évitez de reconstruire de zéro les parties difficiles et risquées.",
    h1: "Les parties difficiles, déjà construites correctement",
    lead: "Auth, gestion des utilisateurs, gestion de fichiers chiffrés — les pièces que tout le monde rate de façon subtile (surtout les outils d'IA). Partez de primitives adaptées d'une vraie base de code de messagerie chiffrée au lieu de les reconstruire de zéro en croisant les doigts.",
    problems: [
      "Vous êtes sur le point de construire l'auth de zéro — ou de laisser un outil d'IA le faire — pour la troisième fois.",
      "Les pièces critiques pour la sécurité (connexion, sessions, uploads de fichiers) sont exactement là où une erreur fait le plus mal.",
      "Chaque semaine passée à réinventer des primitives est une semaine non consacrée à votre vrai produit.",
    ],
    deliverables: [
      "Authentification et gestion des appareils/sessions — basée sur des tokens, multi-appareils, sans les pièges à moitié aboutis des JWT. Extraite et durcie à partir d'une vraie plateforme.",
      "Service d'utilisateurs et d'identité — profils, multi-appareils, et un modèle de relations/permissions réalisé avec des patterns éprouvés (SpiceDB / Zanzibar).",
      "Service de fichiers chiffrés — uploads chunkés en AES-256-GCM, scan antivirus, et accès pré-signé, pas un bucket public naïf.",
      "Des frontières de services propres (DDD) pour que chaque primitive s'insère dans votre application sans traîner le reste avec elle.",
      "Intégrées à votre stack et documentées — à vous de les posséder et de les inspecter, pas une boîte noire.",
    ],
    outcome: "Vous économisez des mois à reconstruire des fondations risquées et ennuyeuses et partez de primitives bâties au niveau d'exigence d'une vraie messagerie chiffrée.",
    faqs: [
      {
        q: "Sont-elles sur étagère ou sur mesure ?",
        a: "Ce sont des services que j'ai déjà construits pour un vrai projet de messagerie chiffrée (Chatter), adaptés à votre stack — pour que vous partiez d'une base fonctionnelle plutôt que de zéro, sans verrouillage propriétaire SaaS.",
      },
      {
        q: "Quelles primitives sont disponibles ?",
        a: "Authentification et gestion des appareils/sessions, utilisateur/identité avec permissions fines, et gestion de fichiers chiffrés aujourd'hui — les bounded contexts d'une vraie base de code DDD, extractibles en services autonomes.",
      },
      {
        q: "Pourquoi ne pas simplement utiliser Auth0 ou Firebase ?",
        a: "Vous le pouvez — mais vous échangez du contrôle, du coût à l'échelle et du verrouillage. Ces primitives sont les vôtres : auto-hébergées, inspectables, et bâties au niveau d'exigence d'une messagerie chiffrée, pas d'un SaaS générique.",
      },
    ],
  },
};

const ro: LocalizedContent = {
  'cloud-migration': {
    nav: 'Migrare în cloud',
    title: 'Consultanță pentru migrarea în cloud',
    description:
      'Consultanță pentru migrarea în cloud care vă mută pe AWS sau GCP bucată cu bucată — producția rămâne funcțională, fără rescrieri riscante de tip big-bang. De obicei mai ieftin decât ceea ce înlocuiește.',
    h1: 'Migrare în cloud fără downtime',
    lead: 'Ajungeți pe AWS sau GCP fără să pariați afacerea pe un weekend de tip big-bang. Mut ce merită mutat, las deoparte ce nu, și mențin producția funcțională pe tot parcursul.',
    problems: [
      'Serverele dumneavoastră îmbătrânesc, costurile cresc pe nesimțite sau un contract de data-center se apropie de final.',
      'Ați încercat deja „mutăm tot deodată” — sau vă e teamă să o faceți.',
      'Nimeni din echipă nu a mai migrat producție la scară.',
    ],
    deliverables: [
      'Un plan de migrare în etape — mai întâi cele cu risc minim, cu rollback la fiecare pas. Fără weekenduri de tip big-bang.',
      'O configurație AWS cu mai multe conturi (conturi separate pentru prod, dev și securitate) astfel încât o greșeală în dev să nu poată atinge niciodată producția, iar costurile să fie urmăribile per echipă.',
      'O rețea care scalează: Transit Gateway în topologie hub-and-spoke în locul unui hățiș de VPC peering, subrețele private pentru aplicații și date și VPC endpoints astfel încât traficul AWS să nu traverseze niciodată internetul public.',
      'Apărare pe mai multe niveluri din prima zi — roluri IAM în locul cheilor de acces, GuardDuty și Security Hub care supraveghează, și criptare KMS pe tot.',
      'Totul reconstruit ca Terraform cu remote state și locking — reproductibil, revizuibil și reconstruibil, nu clicuit manual într-o consolă.',
      'Multi-AZ astfel încât un singur data-center Amazon să poată pica fără să vă doboare, plus backup-uri care sunt testate cu adevărat.',
      'Echipa dumneavoastră instruită și configurația documentată — fără dependență permanentă de mine.',
    ],
    outcome:
      'Cele mai multe migrări se încheie fără ca utilizatorii să observe — și de obicei mai ieftin decât ceea ce au înlocuit.',
    faqs: [
      {
        q: 'Va exista downtime?',
        a: 'Nu de tipul planificat. Migrăm incremental și menținem vechiul mediu activ până când cel nou este validat, cu rollback la fiecare pas.',
      },
      {
        q: 'Lift-and-shift sau re-arhitecturare completă?',
        a: 'Oricare aduce beneficii — adesea un amestec pragmatic: mutăm ca atare părțile banale, re-arhitecturăm doar ce beneficiază clar.',
      },
      {
        q: 'Configurați doar un singur cont AWS?',
        a: 'Nu. Un singur cont pentru tot este o greșeală de începător. Conturile separate pentru prod, dev și securitate limitează raza de impact a oricărei greșeli și fac costurile urmăribile per echipă — impus prin guardrails Control Tower.',
      },
    ],
  },
  kubernetes: {
    nav: 'Kubernetes',
    title: 'Consultanță Kubernetes',
    description:
      'Consultanță Kubernetes pentru producție: clustere EKS/GKE care scalează la cerere și se micșorează împreună cu factura prin Karpenter — fără proliferarea de YAML. Plus un răspuns onest dacă aveți nevoie de el.',
    h1: 'Kubernetes, doar acolo unde își merită locul',
    lead: 'Clustere de nivel producție care scalează la vârfuri de trafic și se micșorează (împreună cu factura) când nu — fără miile de linii de YAML pe care nu le înțelege nimeni.',
    problems: [
      'Clusterele dumneavoastră sunt supradimensionate, iar factura o arată.',
      'Deploy-urile sunt fragile, iar o singură persoană înțelege chart-urile Helm.',
      'Nu sunteți sigur că aveați nevoie de Kubernetes — dar iată-vă.',
    ],
    deliverables: [
      'Mai întâi un răspuns onest: dacă serviciile gestionate sau o mână de containere rezolvă problema, veți auzi asta — Kubernetes intră doar când scara sau mărimea echipei o justifică.',
      'Workload-uri dimensionate corect pe baza utilizării reale la percentila 95 din Prometheus, nu pe presupuneri. Cele mai multe clustere stau inactive la aproape 10% CPU — plătiți pentru rest.',
      'Autoscaling cu Karpenter care combină spot și on-demand (workload-urile stateless rulează cu ~70% mai ieftin pe spot), provizionează noduri în câteva secunde și consolidează pe cele inactive.',
      'Health probe-uri obligatorii — liveness, readiness și startup — astfel încât un pod defect să părăsească load balancer-ul în loc să servească erori pe tăcute.',
      'Containere consolidate: imagini distroless (~80× mai mici decât Ubuntu, suprafață de atac minusculă), non-root, sistem de fișiere root doar-citire, capabilități Linux eliminate și scanare Trivy care oprește build-ul la CVE-uri critice.',
      'Rețelistică zero-trust cu network policies (Cilium), Pod Security Standards setate pe "restricted" și secrete în Secrets Manager sau Vault — niciodată în variabile de mediu.',
      'GitOps cu ArgoCD: clusterul corespunde mereu cu git, fiecare schimbare este un commit, iar rollback-ul este un git revert.',
    ],
    outcome: 'Clustere care costă mai puțin, se recuperează singure și nu au nevoie de supraveghere.',
    faqs: [
      {
        q: 'Am cu adevărat nevoie de Kubernetes?',
        a: 'Poate că nu. Dacă serviciile gestionate sau câteva containere rezolvă problema, vă voi spune — și vă scutesc de taxa operațională.',
      },
      {
        q: 'EKS sau GKE?',
        a: 'Ambele funcționează. Aleg în funcție de unde se află deja echipa dumneavoastră și restul stack-ului.',
      },
      {
        q: 'Cum mențineți containerele în siguranță?',
        a: 'Imagini distroless fără shell sau manager de pachete, rulând non-root pe un sistem de fișiere doar-citire, cu capabilitățile Linux eliminate, plus scanarea imaginilor în CI. Dacă vreodată se obține remote code execution, nu există nimic în interior de exploatat — aceasta este diferența dintre un incident și o catastrofă.',
      },
    ],
  },
  'cost-optimization': {
    nav: 'Costuri & fiabilitate',
    title: 'Optimizarea costurilor cloud',
    description:
      'Consultanță pentru optimizarea costurilor cloud. Reduceți factura AWS sau GCP cu ARM/Graviton, dimensionare corectă și autoscaling — fără a afecta fiabilitatea. Economii tipice de 20–40%.',
    h1: 'Reduceți factura cloud, păstrați fiabilitatea',
    lead: 'Găsim liniile de cost care vă golesc discret bugetul, le eliminăm și ne asigurăm că nimic nu se strică în proces. Fără surprize, fiabil și mai ieftin.',
    problems: [
      'Factura cloud continuă să crească și nimeni nu e sigur de ce.',
      'Departamentul financiar pune întrebări la care nu puteți răspunde linie cu linie.',
      'Bănuiți că plătiți pentru capacitate inactivă — dar reducerea ei pare riscantă.',
    ],
    deliverables: [
      'O defalcare linie cu linie pe echipe și proiecte (tagging corect plus Cost Explorer) ca să știți în sfârșit unde se duc de fapt banii.',
      'Dimensionarea corectă a instanțelor supradimensionate — m5.2xlarge care stă la 5% CPU — de obicei cel mai rapid câștig pe factură.',
      'ARM/Graviton și Spot pentru workload-urile stateless (~70% mai ieftin), plus Savings Plans și Reserved Instances pentru sarcina constantă (20–60% reducere față de on-demand).',
      'S3 Intelligent-Tiering astfel încât datele reci să migreze singure către stocare mai ieftină — până la 95% reducere la arhivare, fără politici manuale de supravegheat.',
      'Autoscaling care chiar scalează în jos, până la zero, când sarcina scade.',
      'Fiabilitatea păstrată intactă: Multi-AZ, read replicas, health checks și observabilitate CloudWatch/X-Ray. Mai ieftin, nu mai instabil.',
    ],
    outcome: 'Adesea 20–40% reducere pe factură — fără să adăugăm nici măcar o alertă la 3 dimineața.',
    faqs: [
      {
        q: 'Reducerea costurilor va afecta fiabilitatea?',
        a: 'Exact acesta este scopul — tai risipa, nu marjele de siguranță. Fiabilitatea se îmbunătățește adesea pentru că configurația devine mai simplă.',
      },
      {
        q: 'Ce economii sunt realiste?',
        a: 'Variază, dar 20–40% este obișnuit atunci când ARM, Spot, Savings Plans și dimensionarea corectă nu au fost încă folosite. Doar Spot aduce ~70% reducere pentru workload-urile stateless; RDS rezervat rulează cu 35–60% mai ieftin.',
      },
      {
        q: 'De unde vin de obicei economiile?',
        a: 'În cea mai mare parte din lucrurile banale: dimensionarea corectă a instanțelor supradimensionate, mutarea workload-urilor stateless pe ARM și Spot, angajarea sarcinii constante în Savings Plans și oprirea a ceea ce stă inactiv.',
      },
    ],
  },
  'cicd-iac': {
    nav: 'CI/CD & IaC',
    title: 'CI/CD & Infrastructure as Code',
    description:
      'Consultanță CI/CD și Infrastructure as Code. Deployment-uri fără surprize, repetabile, și infrastructură gestionată cu Terraform, care este revizuită, versionată și reconstruibilă de la zero.',
    h1: 'Transformați lansarea într-un non-eveniment',
    lead: 'Dați push, se face deploy, toată lumea își vede de treabă. Întreaga configurație trăiește în Terraform — revizuită, versionată și reconstruibilă de la zero.',
    problems: [
      'Deploy-urile sunt manuale, stresante sau făcute de o singură persoană într-o zi bună.',
      'Infrastructura dumneavoastră există doar în mintea cuiva sau în consola cloud.',
      'Rollback-urile înseamnă panică în loc de un buton.',
    ],
    deliverables: [
      'Pipeline-uri CI/CD (GitHub Actions, GitLab sau Jenkins) care fac build, testare, scanare și deploy la push — cu Trivy care oprește build-ul la CVE-uri critice înainte ca ceva să ajungă în producție.',
      'Rolling deploy-uri fără downtime făcute corect: maxSurge/maxUnavailable ajustate, connection draining și tratare grațioasă a SIGTERM — astfel încât instanțele să fie rotite fără a pierde cereri, chiar și sub sarcină.',
      'Modificări sigure de schemă cu pattern-ul expand-contract, astfel încât migrările de bază de date să nu strice niciodată versiunea încă în rulare în timpul rollout-ului.',
      'Toată infrastructura ca Terraform — remote state în S3 cu locking prin DynamoDB, un director separat per mediu (niciodată workspaces), plan la fiecare PR și o aprobare manuală pentru apply.',
      'OIDC în locul cheilor cloud de lungă durată, secrete în Secrets Manager (niciodată comise) și IAM cu privilegii minime, astfel încât pipeline-ul să nu poată distruge producția.',
      'Documentație și predare astfel încât orice inginer să poată lansa — nu doar cel care a construit-o.',
    ],
    outcome: 'Lansarea devine rutină — iar infrastructura dumneavoastră poate fi reconstruită dintr-un repo git.',
    faqs: [
      {
        q: 'Ce instrumente CI/CD folosiți?',
        a: 'Orice se potrivește stack-ului dumneavoastră — GitHub Actions, GitLab CI, CircleCI sau Jenkins. Nu impun un favorit.',
      },
      {
        q: 'Terraform sau altceva?',
        a: 'De obicei Terraform pentru ecosistemul și portabilitatea sa, dar lucrez cu ce folosiți deja dacă este solid.',
      },
      {
        q: 'Cum faceți deploy fără downtime?',
        a: 'Rolling updates cu maxSurge 1 și maxUnavailable 0, readiness probe-uri care controlează traficul și connection draining, astfel încât instanțele să fie rotite fără a pierde cereri. Blue-green sau canary când o schimbare o justifică.',
      },
    ],
  },
  'ai-app-audit': {
    nav: 'Audit aplicații IA',
    title: 'Audit & salvare a aplicațiilor create cu IA',
    description:
      'Auditați și consolidați aplicațiile create cu Cursor, Claude sau Copilot. Găsiți breșele de securitate și minele arhitecturale pe care IA le lasă în urmă — înainte să vă coste.',
    h1: 'Aplicația dumneavoastră creată cu IA, auditată și cu riscuri reduse',
    lead: 'Ați lansat ceva construit în mare parte de Cursor, Claude sau Copilot și vă temeți în tăcere că se va prăbuși? Găsesc breșele de securitate și minele arhitecturale pe care instrumentele IA le lasă în urmă — și vă spun exact ce să reparați, pe înțelesul tuturor.',
    problems: [
      'Cea mai mare parte a codului dumneavoastră a fost scrisă de o IA, iar nimeni cu experiență nu l-a citit cu adevărat.',
      'Arată bine la demo, dar nu puteți spune dacă este sigur, scalabil sau un castel din cărți de joc.',
      'Sunteți pe cale să acceptați plăți, date ale utilizatorilor sau investiții pe deasupra.',
    ],
    deliverables: [
      'Un audit complet al codului generat de IA — securitate, arhitectură, model de date și „deciziile mari” pe care IA tinde să le greșească subtil.',
      'Un raport de constatări prioritizate (critice → utile) în limbaj clar, cu riscul real al fiecărui element explicat.',
      'Analiză de securitate: autentificare, autorizare, secrete, validarea intrărilor, injecție, date expuse și CVE-uri ale dependențelor.',
      'Analiză de arhitectură: rezistă structura sau va necesita o rescriere la de 10× mai mulți utilizatori?',
      'Reparații la cerere — remediez eu însumi constatările critice sau predau echipei dumneavoastră un plan clar. Decizia vă aparține.',
    ],
    outcome: 'Aflați dacă stați pe o aplicație solidă sau pe o vulnerabilitate — înaintea utilizatorilor sau a unui atacator.',
    faqs: [
      {
        q: 'Codul căror instrumente IA îl auditați?',
        a: 'Pe toate — Cursor, Claude Code, GitHub Copilot, ChatGPT, v0, Lovable, orice l-a construit. Tiparele de defectare sunt similare indiferent de modelul care l-a scris.',
      },
      {
        q: 'Ce găsiți de obicei?',
        a: 'Auditurile din industrie de-a lungul lui 2025–2026 au scos la iveală cel puțin o problemă critică sau de severitate ridicată în practic fiecare cod creat cu IA, iar eu caut același lucru: secrete expuse, verificări de autorizare lipsă, modele de date naive și arhitectură care nu va supraviețui traficului real. Primiți o listă clară și prioritizată a ceea ce este cu adevărat riscant.',
      },
      {
        q: 'Doar raportați sau și reparați?',
        a: 'Oricare. Primiți raportul în orice caz; pot remedia eu însumi elementele critice sau vă pot ghida echipa prin ele.',
      },
    ],
  },
  'architecture-review': {
    nav: 'Analiză de arhitectură',
    title: 'Analiză de arhitectură software',
    description:
      'O a doua opinie onestă asupra arhitecturii dumneavoastră software — ce scalează, ce se strică și ce trebuie reparat înainte să devină costisitor. Susținută de faptul că am construit chiar eu o aplicație criptată end-to-end dintr-o singură bază de cod multiplatformă.',
    h1: 'Este arhitectura dumneavoastră construită să dureze?',
    lead: 'O a doua opinie lucidă asupra modului în care este construit sistemul dumneavoastră — ce rezistă, ce se strică la scară și ce vă va costa pe tăcute. Fără dogme, doar compromisuri.',
    problems: [
      'Nu sunteți sigur că arhitectura va supraviețui la de 10× mai mulți utilizatori — sau trimestrului următor.',
      'Fiecare funcționalitate durează mai mult decât precedenta, și nimeni nu e sigur de ce.',
      'Alegeți între un monolit și microservicii și primiți dogme în loc de răspunsuri.',
    ],
    deliverables: [
      'O analiză a arhitecturii dumneavoastră raportată la direcția reală a afacerii — nu la un ideal din manual.',
      'Decizii oneste asupra marilor alegeri: monolit vs microservicii, model de date, granițe de servicii, sincron vs asincron.',
      'Verificarea „bulgărelui de noroi” — unde cuplarea face pe tăcute fiecare schimbare mai grea și mai riscantă.',
      'O listă prioritizată a ceea ce trebuie reparat acum, ce trebuie urmărit și ce trebuie lăsat în pace — și supra-ingineria costă.',
      'Tipare care se potrivesc mărimii și stadiului echipei dumneavoastră: banale și ușor de întreținut în locul celor ingenioase.',
    ],
    outcome: 'Nu mai ghiciți despre fundația dumneavoastră și obțineți o cale clară și prioritizată — păstrați ce funcționează, reparați ce contează.',
    faqs: [
      {
        q: 'Monolit sau microservicii?',
        a: 'De obicei un monolit bine structurat, până când aveți dovezi reale că trebuie să îl împărțiți — echipe separate care se calcă pe picioare, nevoi de scalare radical diferite. Puteți împărți un monolit curat în câteva zile; nu puteți descâlci un bulgăre de noroi fără o rescriere.',
      },
      {
        q: 'Îmi veți spune să rescriu totul?',
        a: 'Aproape niciodată. Rescrierile sunt locul unde proiectele mor. Găsesc cele câteva schimbări care aduc cel mai mult și las restul în pace.',
      },
    ],
  },
  'idea-to-production': {
    nav: 'Idee → producție',
    title: 'De la idee la producție',
    description:
      'Duceți o idee până la o aplicație reală, lansată, de nivel producție — arhitectură, dezvoltare, securitate și infrastructura pentru a o rula. Susținut de construirea unui mesager criptat dintr-o singură bază de cod multiplatformă, de unul singur.',
    h1: 'De la idee la un produs real, lansat',
    lead: 'Aveți o idee — sau un prototip brut — și aveți nevoie de cineva care să o ducă până la capăt: arhitecturată corect, construită să dureze, securizată și chiar pusă în producție. Nu o prezentare. Un produs.',
    problems: [
      'Aveți ideea, poate un prototip, dar nu și expertiza de inginerie senior pentru a o face reală.',
      'Nu vreți un MVP de unică folosință pe care va trebui să îl reconstruiți în momentul în care funcționează.',
      'Aveți nevoie de o singură persoană care să își asume arhitectura, dezvoltarea, securitatea și deployment-ul — nu să coordoneze cinci.',
    ],
    deliverables: [
      'O arhitectură și un plan care încep simplu și câștigă complexitate doar când o face și produsul.',
      'Dezvoltarea propriu-zisă — backend, date, API-uri și părțile grele (autentificare, plăți, timp real, criptare) făcute cum trebuie.',
      'Infrastructură de producție: CI/CD, Terraform, monitorizare și un deploy în care puteți avea încredere.',
      'Securitate integrată din prima zi, nu adăugată după breșă.',
      'Documentație și predare astfel încât echipa dumneavoastră, sau următoarea angajare, să o poată rula fără mine.',
    ],
    outcome: 'Obțineți un produs care este cu adevărat în producție și construit să crească — nu un prototip pe care trebuie să îl aruncați.',
    faqs: [
      {
        q: 'Chiar puteți face totul de unul singur?',
        a: 'Da — în paralel construiesc Chatter, un mesager criptat end-to-end: un singur client Rust pentru fiecare platformă (Linux, Windows și Android astăzi, iOS și macOS planificate) pe un backend Go cu criptografie Signal Protocol. Mă ține implicat practic în întregul stack, de la criptografie la deployment — așa că îmi pot asuma arhitectura și părțile grele și la proiectul dumneavoastră.',
      },
      {
        q: 'Colaborare parțială sau dezvoltare completă?',
        a: 'Oricare. O pot conduce de la cap la coadă sau pot lucra alături de echipa dumneavoastră și îmi pot asuma arhitectura și părțile grele.',
      },
    ],
  },
  'building-blocks': {
    nav: 'Componente de bază',
    title: 'Componente de bază pentru producție',
    description:
      'Servicii gata de integrat pentru aplicația dumneavoastră — autentificare, gestionarea utilizatorilor și manipularea criptată a fișierelor — adaptate dintr-o bază de cod reală de mesager criptat pe care am construit-o. Evitați reconstruirea de la zero a părților grele și riscante.',
    h1: 'Părțile grele, deja construite corect',
    lead: 'Autentificare, gestionarea utilizatorilor, manipularea criptată a fișierelor — piesele pe care toată lumea le greșește subtil (mai ales instrumentele IA). Porniți de la primitive adaptate dintr-o bază de cod reală de mesager criptat, în loc să le reconstruiți de la zero și să sperați.',
    problems: [
      'Sunteți pe cale să construiți autentificarea de la zero — sau să lăsați un instrument IA să o facă — pentru a treia oară.',
      'Piesele critice pentru securitate (login, sesiuni, încărcări de fișiere) sunt exact acolo unde o greșeală doare cel mai tare.',
      'Fiecare săptămână petrecută reinventând primitive este o săptămână nepetrecută pe produsul dumneavoastră real.',
    ],
    deliverables: [
      'Autentificare și gestionarea dispozitivelor/sesiunilor — bazată pe token-uri, multi-dispozitiv, fără capcanele JWT făcute pe jumătate. Extrasă și consolidată dintr-o platformă reală.',
      'Serviciu de utilizatori și identitate — profiluri, multi-dispozitiv și un model de relații/permisiuni realizat cu tipare dovedite (SpiceDB / Zanzibar).',
      'Serviciu de fișiere criptate — încărcări AES-256-GCM pe bucăți, scanare antivirus și acces presemnat, nu un bucket public naiv.',
      'Granițe de servicii curate (DDD) astfel încât fiecare primitivă să se integreze în aplicația dumneavoastră fără a le târî pe celelalte după ea.',
      'Integrate în stack-ul dumneavoastră și documentate — ale dumneavoastră, de deținut și de inspectat, nu o cutie neagră.',
    ],
    outcome: 'Săriți peste luni de reconstruire a fundațiilor riscante și banale și porniți de la primitive construite la standardul unui mesager criptat real.',
    faqs: [
      {
        q: 'Sunt acestea gata făcute sau personalizate?',
        a: 'Sunt servicii pe care le-am construit deja pentru un proiect real de mesager criptat (Chatter), adaptate la stack-ul dumneavoastră — astfel încât să porniți de la o fundație funcțională în loc de la zero, fără dependență de un SaaS.',
      },
      {
        q: 'Ce primitive sunt disponibile?',
        a: 'Autentificare și gestionarea dispozitivelor/sesiunilor, utilizator/identitate cu permisiuni granulare și manipularea criptată a fișierelor în prezent — bounded contexts dintr-o bază de cod DDD reală, extractibile ca servicii de sine stătătoare.',
      },
      {
        q: 'De ce să nu folosesc pur și simplu Auth0 sau Firebase?',
        a: 'Puteți — dar renunțați la control, la costuri la scară și acceptați dependența. Aceste primitive sunt ale dumneavoastră: auto-găzduite, inspectabile și construite la standardul unui mesager criptat, nu al unui SaaS generic.',
      },
    ],
  },
};

export const serviceContent: Record<Lang, LocalizedContent> = {
  en,
  de,
  es,
  pt,
  fr,
  ro,
};

// Resolve a service for a given language, filling any missing field (or an
// entirely missing slug) from English. Always returns every field populated.
export function getService(slug: string, lang: Lang = defaultLang): Service {
  const meta = SERVICE_META.find((m) => m.slug === slug);
  if (!meta) throw new Error(`Unknown service slug: ${slug}`);

  const base = en[slug];
  if (!base) throw new Error(`Missing English content for service: ${slug}`);

  const loc = serviceContent[lang]?.[slug] ?? {};

  const content: ServiceContent = {
    nav: loc.nav ?? base.nav,
    title: loc.title ?? base.title,
    description: loc.description ?? base.description,
    h1: loc.h1 ?? base.h1,
    lead: loc.lead ?? base.lead,
    problems: loc.problems ?? base.problems,
    deliverables: loc.deliverables ?? base.deliverables,
    outcome: loc.outcome ?? base.outcome,
    faqs: loc.faqs ?? base.faqs,
  };

  return { ...meta, ...content };
}

// Resolve every service (in display order) for a given language.
export function getServices(lang: Lang = defaultLang): Service[] {
  return SERVICE_META.map((m) => getService(m.slug, lang));
}

// Backwards-compatible English array for language-agnostic consumers
// (global search index, home-page ItemList schema).
export const SERVICES: Service[] = getServices(defaultLang);
