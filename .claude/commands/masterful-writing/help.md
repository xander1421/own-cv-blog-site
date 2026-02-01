---
name: masterful-writing:help
description: Show masterful-writing guide and available commands
---

<objective>
Guide the user through writing a professional, defensible article. This skill ensures articles are accurate, well-structured, and free of unsupported claims.

When invoked, ask the user what they need:
1. **Outline a new article** - Define audience, purpose, and structure
2. **Validate an existing draft** - Run the full validation checklist
3. **Fact-check specific claims** - Verify numbers, quotes, and assertions
</objective>

# Masterful Writing Guide

Professional writing requires **preparation**, **structure**, and **validation**.

## Part 1: Before Writing

### Define the "Why" and "Who"
Before typing a word, answer:
- **Who is the audience?** (Experts need data; generalists need context)
- **What is the takeaway?** Summarize purpose in one sentence

### Research First, Write Second
Gather data, quotes, and studies BEFORE writing. Group into themes. This prevents confirmation bias.

## Part 2: Article Structure

### The Argumentative Arc (Technical Blog)
1. **The Hook** - Surprising stat, anecdote, or question
2. **The Nut Graph** - Why this matters right now
3. **The Evidence** - 3-4 points supported by data
4. **The Counter-Argument** - Acknowledge opposing views (adds credibility)
5. **The Trade-offs** - Honest limitations
6. **The Kicker** - Concluding thought that circles back to hook

## Part 3: Validation Checklist

### 1. Fact-Check (Red Pen Method)
Highlight every specific claim and verify:
- [ ] Names spelled correctly?
- [ ] Numbers accurate AND in context?
- [ ] Hyperlinks go where expected?
- [ ] Quotes verbatim? (Use `[brackets]` for changes)
- [ ] Package names, versions, commands actually exist?

### 2. Logic & Bias Check
- [ ] Clear attribution? ("According to..." not "It is said...")
- [ ] Causation vs correlation distinguished?
- [ ] Emotive language removed? (No "shocking", "incredible", "disastrous")
- [ ] Claims you can't verify marked as opinions?

### 3. Structural Check
- [ ] Skim test: Do headings alone tell the story?
- [ ] Paragraphs under 4-5 lines?
- [ ] Acronyms defined on first use?
- [ ] Code examples tested and working?

### 4. Verification Actions
For technical articles, ACTUALLY VERIFY:
```bash
# Check if packages exist
npm info <package-name>
cargo search <crate-name>

# Check if commands work
<command> --version

# Check file counts, line counts
wc -l <files>
du -sh <directory>
```

## Part 4: Common Pitfalls

| Pitfall | Fix |
|---------|-----|
| Made-up package names | Search npm/crates.io/pub.dev |
| Speculative metrics | Only cite measured data |
| "Fewer lines of code" | Actually count both codebases |
| "Faster startup" | Actually benchmark |
| Future features as present | Mark clearly as "planned" |

## Commands

- `/masterful-writing` - This guide
- `/masterful-writing:validate` - Run full validation on a draft
- `/masterful-writing:outline` - Create article outline with structure
- `/masterful-writing:fact-check` - Verify specific claims in article
