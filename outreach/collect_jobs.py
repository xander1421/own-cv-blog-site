#!/usr/bin/env python3
"""Collect FinOps / cloud-cost hiring signals from public job APIs.

A company hiring for FinOps or cloud-cost roles is publicly signalling
cloud-cost pain + allocated budget — a consulting lead. This collector
pulls from public, keyless JSON APIs only (no LinkedIn/Indeed scraping,
no ToS violations):

  - Remotive        https://remotive.com/api/remote-jobs
  - Arbeitnow       https://www.arbeitnow.com/api/job-board-api  (EU-heavy)
  - RemoteOK        https://remoteok.com/api
  - Hacker News     https://hn.algolia.com/api/v1  ("Who is hiring" threads)

Output: out/leads.csv (ranked) + out/leads.jsonl (full records).
A seen-cache (out/seen.json) makes re-runs surface only NEW postings,
so this can run on a cron/schedule.

Usage:
  python3 collect_jobs.py            # collect, score, rank
  python3 collect_jobs.py --min-score 4   # only strong signals
Stdlib only — no dependencies.
"""
import argparse, csv, hashlib, html, json, os, re, sys, time, urllib.request
from datetime import date

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
UA = "job-signal-collector/1.0 (personal consulting-lead research; contact: site owner)"

# Signal keywords → weight. Title hits count double.
SIGNALS = {
    "finops": 5, "cloud cost": 4, "cost optimization": 4, "cost optimisation": 4,
    "karpenter": 4, "eks": 3, "aws cost": 4, "cloud economics": 3,
    "cloud financial": 3, "spot instance": 2, "savings plan": 2,
    "kubernetes": 2, "aws": 1, "terraform": 1, "graviton": 3,
}
# Must match at least one of these to be considered at all.
GATE = re.compile(r"finops|cloud cost|cost optimi|cloud econom|cloud financial|karpenter|\beks\b|kubernetes", re.I)
BLOCK_TITLES = re.compile(r"sales|account exec|customer success|recruit|marketing|business develop", re.I)
SEARCH_TERMS = ["finops", "cloud cost", "cost optimization", "kubernetes aws"]


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.load(r)


def score(title, text):
    t, x, s = title.lower(), (text or "").lower(), 0
    for kw, w in SIGNALS.items():
        if kw in t:
            s += w * 2
        elif kw in x:
            s += w
    return s


def clean(s, limit=280):
    s = html.unescape(re.sub(r"<[^>]+>", " ", s or ""))
    return re.sub(r"\s+", " ", s).strip()[:limit]


def rec(company, title, url, source, location, text, posted=""):
    return {
        "company": clean(company, 80), "title": clean(title, 120), "url": url,
        "source": source, "location": clean(location, 60), "posted": posted,
        "snippet": clean(text), "score": score(title, text),
    }


def remotive():
    for term in SEARCH_TERMS:
        try:
            data = fetch(f"https://remotive.com/api/remote-jobs?search={urllib.parse.quote(term)}&limit=50")
            for j in data.get("jobs", []):
                yield rec(j.get("company_name"), j.get("title"), j.get("url"),
                          "remotive", j.get("candidate_required_location", ""),
                          j.get("description", ""), (j.get("publication_date") or "")[:10])
        except Exception as e:
            print(f"  ! remotive[{term}]: {e}", file=sys.stderr)
        time.sleep(1)


def arbeitnow():
    for page in (1, 2, 3):
        try:
            data = fetch(f"https://www.arbeitnow.com/api/job-board-api?page={page}")
            for j in data.get("data", []):
                yield rec(j.get("company_name"), j.get("title"), j.get("url"),
                          "arbeitnow", j.get("location", ""), j.get("description", ""))
        except Exception as e:
            print(f"  ! arbeitnow[p{page}]: {e}", file=sys.stderr)
        time.sleep(1)


def remoteok():
    try:
        data = fetch("https://remoteok.com/api")
        for j in data[1:]:  # element 0 is the legal notice
            if not isinstance(j, dict):
                continue
            yield rec(j.get("company"), j.get("position"), j.get("url"),
                      "remoteok", j.get("location", ""),
                      f"{' '.join(j.get('tags', []))} {j.get('description', '')}",
                      (j.get("date") or "")[:10])
    except Exception as e:
        print(f"  ! remoteok: {e}", file=sys.stderr)


def hn_whoishiring():
    """Comments in the latest 'Ask HN: Who is hiring?' thread that match signals."""
    try:
        s = fetch("https://hn.algolia.com/api/v1/search_by_date?query=%22who%20is%20hiring%22&tags=story,author_whoishiring&hitsPerPage=5")
        # whoishiring posts 3 monthly threads; keep only "Who is hiring?" (companies posting)
        hits = [h for h in s.get("hits", []) if "who is hiring" in (h.get("title") or "").lower()][:1]
        if not hits:
            return
        thread = fetch(f"https://hn.algolia.com/api/v1/items/{hits[0]['objectID']}")
        for c in thread.get("children", []):
            text = clean(c.get("text", ""), 2000)
            if not text or not GATE.search(text):
                continue
            company = text.split("|")[0].strip()[:60] or "HN posting"
            yield rec(company, text.split("|")[1].strip()[:100] if "|" in text else "see posting",
                      f"https://news.ycombinator.com/item?id={c['id']}",
                      "hn-whoishiring", "", text)
    except Exception as e:
        print(f"  ! hn: {e}", file=sys.stderr)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--min-score", type=int, default=3)
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)

    seen_path = os.path.join(OUT, "seen.json")
    seen = set(json.load(open(seen_path))) if os.path.exists(seen_path) else set()

    rows, new_count = {}, 0
    for src in (remotive, arbeitnow, remoteok, hn_whoishiring):
        print(f"source: {src.__name__} ...")
        for r in src():
            if r["score"] < args.min_score or not GATE.search(r["title"] + " " + r["snippet"]) or BLOCK_TITLES.search(r["title"]):
                continue
            key = hashlib.sha1((r["company"] + r["title"]).lower().encode()).hexdigest()[:16]
            r["id"], r["new"] = key, key not in seen
            # keep highest-scoring duplicate
            if key not in rows or r["score"] > rows[key]["score"]:
                rows[key] = r

    new_count = sum(r["new"] for r in rows.values())
    ranked = sorted(rows.values(), key=lambda r: (-r["new"], -r["score"]))
    with open(os.path.join(OUT, "leads.csv"), "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["score", "new", "company", "title", "location", "source", "posted", "url", "id"], extrasaction="ignore")
        w.writeheader()
        w.writerows(ranked)
    with open(os.path.join(OUT, "leads.jsonl"), "w") as f:
        for r in ranked:
            f.write(json.dumps(r) + "\n")
    json.dump(sorted(seen | set(rows)), open(seen_path, "w"))

    print(f"\n{len(ranked)} leads ({new_count} new since last run) → out/leads.csv")
    for r in ranked[:10]:
        flag = "NEW " if r["new"] else "    "
        print(f"  {flag}[{r['score']:>2}] {r['company']:<28} — {r['title'][:60]}  ({r['source']})")
    print(f"\nrun date: {date.today()}  |  next: python3 draft_emails.py --top 10")


if __name__ == "__main__":
    main()
