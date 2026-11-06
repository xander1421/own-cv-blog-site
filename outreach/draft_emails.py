#!/usr/bin/env python3
"""Generate PERSONALIZED outreach drafts from collected leads — for manual sending.

This deliberately does NOT send anything. Job postings don't contain
decision-makers' emails, auto-sent cold mail is legally fraught in the EU
(and torches your domain's sender reputation), and unpersonalized blasts
don't convert anyway. Instead: one draft file per company, with the
signal-specific hook pre-written and [BRACKETS] where 30 seconds of human
research goes. Send max ~10/day, ideally as a LinkedIn message to the
hiring manager / CTO, or a reply through the posting itself.

Usage:
  python3 draft_emails.py --top 10        # draft the 10 best NEW leads
  python3 draft_emails.py --id <leadid>   # draft one specific lead
"""
import argparse, json, os, re
from datetime import date

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "out")
SITE = "https://www.alexpruteanu.cloud"
# UTM tag on site links so email clicks are attributable in Vercel Analytics
# (email clients strip referrers, so without this they show as "direct").
UTM = "?utm_source=outreach&utm_medium=email&utm_campaign=finops-leads"

# Hook picked by the strongest signal present in the posting text.
HOOKS = [
    (r"karpenter", "I noticed the role mentions Karpenter — I've done these migrations in production and wrote up the real cost math here: {site}/blog/karpenter-vs-cluster-autoscaler-cost{utm}"),
    (r"\beks\b|kubernetes", "Since the role touches Kubernetes on AWS: I published a data-backed playbook on cutting EKS bills 30–50% that maps almost 1:1 to what this position will own: {site}/blog/reduce-eks-aws-costs-2026{utm}"),
    (r"finops|cloud cost|cost optimi", "FinOps hires typically take 3+ months to land and another 3 to ramp — I do fixed-scope cost audits that bank the first 30–50% of savings in weeks, and hand the runbook to whoever you hire: {site}/blog/reduce-eks-aws-costs-2026{utm}"),
    (r".", "I help teams cut AWS/Kubernetes spend 30–50% on a fixed-scope basis — details and method here: {site}/services/cost-optimization{utm}"),
]

TEMPLATE = """# {company} — outreach draft ({today})

**Lead:** {title}
**Posting:** {url}
**Signal score:** {score}  |  Source: {source}

## Before sending — 3 minutes of research (do NOT skip)
- [ ] Open the posting. Confirm it's still live and note ONE specific detail (team size, stack, a pain phrase they wrote).
- [ ] Find the right human: hiring manager / VP Eng / CTO on LinkedIn — not a generic inbox.
- [ ] Skim their eng blog or GitHub for anything cloud-cost related to reference.

## Subject options
1. Your {short_title} search — an interim option
2. {company}: banking cloud savings while you hire

## Draft (~110 words — keep it this short)

Hi [FIRST NAME],

Saw {company} is hiring for {title_lc} — [ONE SPECIFIC OBSERVATION FROM THEIR POSTING OR ENG BLOG. NO GENERIC FLATTERY. IF YOU CAN'T WRITE THIS LINE, DON'T SEND].

{hook}

Roles like this usually take a quarter to fill. I do fixed-scope AWS/EKS cost audits in the meantime: I find the waste, cut it without touching reliability, and hand a runbook to the person you eventually hire — so the role starts from a clean baseline instead of a fire.

Worth a 30-minute look at your bill? No obligation either way: https://cal.eu/alexpruteanu

— Alexandru Pruteanu
DevOps & Cloud Cost Engineer · {site}

## Rules
- Max ~10 sends/day, every one personalized. A skipped send beats a template send.
- Prefer LinkedIn DM or the posting's own channel over a scraped/guessed email address.
- DE/AT recipients: unsolicited commercial email without consent is restricted (UWG §7) — use LinkedIn there.
- US recipients via email: include your physical mailing address + honor any opt-out (CAN-SPAM).
- Log the send + response in out/sent-log.csv so follow-ups don't double-touch.
"""


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--top", type=int, default=10)
    ap.add_argument("--id")
    ap.add_argument("--include-old", action="store_true", help="also draft leads already seen in prior runs")
    args = ap.parse_args()

    leads_path = os.path.join(OUT, "leads.jsonl")
    if not os.path.exists(leads_path):
        raise SystemExit("no out/leads.jsonl — run collect_jobs.py first")
    leads = [json.loads(l) for l in open(leads_path)]

    if args.id:
        picked = [l for l in leads if l["id"] == args.id]
    else:
        pool = leads if args.include_old else [l for l in leads if l.get("new")]
        picked = sorted(pool, key=lambda r: -r["score"])[:args.top]

    day_dir = os.path.join(OUT, "drafts", str(date.today()))
    os.makedirs(day_dir, exist_ok=True)
    for i, l in enumerate(picked, 1):
        text = (l["title"] + " " + l["snippet"]).lower()
        hook = next(h for pat, h in HOOKS if re.search(pat, text)).format(site=SITE, utm=UTM)
        slug = re.sub(r"[^a-z0-9]+", "-", l["company"].lower()).strip("-")[:40] or "lead"
        body = TEMPLATE.format(
            company=l["company"], title=l["title"], title_lc=l["title"][0].lower() + l["title"][1:],
            short_title=re.sub(r"(?i)\b(senior|staff|lead|principal)\b", "", l["title"]).strip()[:40],
            url=l["url"], score=l["score"], source=l["source"], hook=hook,
            today=date.today(), site=SITE,
        )
        path = os.path.join(day_dir, f"{i:02d}-{slug}.md")
        open(path, "w").write(body)
        print(f"  drafted: {path}")
    if not picked:
        print("no new leads to draft (use --include-old to re-draft previously seen ones)")
    else:
        print(f"\n{len(picked)} drafts in {day_dir} — review, personalize the [BRACKETS], send max ~10/day.")


if __name__ == "__main__":
    main()
