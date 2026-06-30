---
name: masterful-writing:validate
description: Run full validation checklist on an article draft
---

<objective>
Validate an article draft for accuracy, logic, and structure. This is the "shield" that protects credibility.

IMPORTANT: Do NOT trust claims in the article. VERIFY everything using tools.
</objective>

# Article Validation Protocol

Read the article specified by the user, then perform these checks IN ORDER:

## Step 1: Extract All Claims

Create a list of every verifiable claim:
- Numbers (line counts, file sizes, percentages, metrics)
- Package/library names
- Version numbers
- Performance claims (faster, smaller, fewer)
- Commands and code snippets
- Dates and timelines
- Quotes attributed to sources

## Step 2: Verify Each Claim

For EACH claim, use appropriate tools:

### Code/Tech Claims
```bash
# Package exists?
npm info <package> 2>/dev/null || echo "NOT FOUND"
cargo search <crate> | head -3

# Line counts accurate?
find <path> -name "*.ts" | xargs wc -l | tail -1

# File/folder sizes?
du -sh <path>

# Commands work?
<command> --version
```

### Metric Claims
- If article says "X is faster" - was it benchmarked?
- If article says "X MB RAM" - was it measured?
- If speculative, must be marked as "estimated" or "projected"

## Step 3: Logic Check

Read as a skeptic. For each paragraph ask:
- Is the source clear? ("According to..." not "Studies show...")
- Is this causation or correlation?
- Could this be interpreted differently?
- Is the tone neutral or emotive?

## Step 4: Report Findings

Present findings in this format:

### Verified Claims
| Claim | Verification | Status |
|-------|--------------|--------|
| "1,531 lines of IPC" | `wc -l` returned 1531 | CONFIRMED |

### Unverified/False Claims
| Claim | Issue | Suggested Fix |
|-------|-------|---------------|
| "@aspect/libsignal" | Package doesn't exist | Use "@signalapp/libsignal-client" |

### Missing Context
- Claims that need qualifiers ("estimated", "projected", "in testing")
- Comparisons that aren't apples-to-apples

### Structural Issues
- Paragraphs too long
- Missing definitions
- Skim test failures

## Step 5: Offer Fixes

For each issue found, provide the exact edit needed to fix it.
