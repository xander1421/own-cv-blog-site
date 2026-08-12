# Outreach toolkit — FinOps hiring signals → personalized drafts

Companies hiring FinOps / cloud-cost / platform roles are publicly
signalling cloud-cost pain with budget attached. This toolkit finds them
and drafts personalized outreach — **it never sends anything**. See
"Why no auto-sender" below before you're tempted to change that.

## Daily workflow (~30 min)

```bash
cd outreach
python3 collect_jobs.py          # 1. pull + rank new postings (public APIs only)
python3 draft_emails.py --top 10 # 2. one draft file per best NEW lead
# 3. open out/drafts/<today>/, do the 3-minute research checklist per draft,
#    fill the [BRACKETS], send via LinkedIn DM or the posting's own channel.
# 4. log sends in out/sent-log.csv (company, date, channel, response)
```

Re-runs only surface postings you haven't seen before (`out/seen.json`),
so a daily cron works: `0 8 * * 1-5 cd .../outreach && python3 collect_jobs.py`.

## Sources (all public, keyless JSON APIs — no ToS-violating scraping)

| Source | Coverage | Notes |
|---|---|---|
| Remotive | remote tech jobs | keyword search |
| Arbeitnow | EU-heavy job board | good DACH coverage |
| RemoteOK | remote tech jobs | tags + descriptions |
| HN "Who is hiring" | monthly thread | startups, often founder-posted — best response rates |

LinkedIn and Indeed are deliberately excluded: scraping them violates
their ToS and gets accounts banned. If a lead matters, look the company
up on LinkedIn manually.

## Why no auto-sender (read before "improving" this)

1. **Legal.** EU/EEA cold B2B email is country-dependent: Germany/Austria
   effectively prohibit unsolicited commercial email without consent
   (UWG §7) — fines and cease-and-desist letters are routine. US requires
   CAN-SPAM compliance (physical address, working opt-out). An automated
   sender can't make per-recipient jurisdiction calls.
2. **Deliverability.** Automated cold volume from alexpruteanu.cloud will
   get the domain blacklisted — the same domain the SEO strategy depends on.
3. **Effectiveness.** Postings don't contain decision-makers' emails, and
   template blasts convert at ~0%. Ten personalized messages beat a
   thousand automated ones — we know, because we receive the automated kind.
4. **Reputation.** The pitch is "trustworthy expert." Spam is the
   opposite of the pitch.

## Data hygiene

`out/` is gitignored — scraped listings and any notes about contacts
must never be committed to this (public) repository. Treat exported
lead data as personal data where it names individuals: keep it local,
delete what you don't use (GDPR data-minimization).

## Semi-automated mode (scheduled Routine + Gmail drafts)

A weekday-morning Routine runs the collector in a fresh cloud session and,
for each new qualified lead, creates a **Gmail draft** (empty To: field,
subject + body prefilled, research notes appended below the signature).
Sending remains manual by design: open Drafts, do the research checklist,
fill the [BRACKETS], delete the notes block, set the recipient, send.

The dedupe cache (`outreach/seen.json`, hashes only) is committed back by
the Routine so runs never re-draft the same posting.
