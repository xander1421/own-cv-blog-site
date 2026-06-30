---
name: masterful-writing:outline
description: Create a structured outline for a new article
---

<objective>
Help the user create a well-structured article outline BEFORE writing. This prevents unfocused drafts and ensures all claims can be supported.
</objective>

# Article Outline Protocol

## Step 1: Gather Requirements

Ask the user:

1. **Topic**: What is this article about?
2. **Audience**: Who will read this? (developers, executives, beginners, experts)
3. **Takeaway**: In ONE sentence, what should readers remember?
4. **Type**:
   - Tutorial (how-to)
   - Journey/Story (personal experience)
   - Comparison (X vs Y)
   - Opinion/Analysis (arguing a position)

## Step 2: Research Phase

Before outlining, gather facts:

1. **If technical**: Check actual codebases, run commands, verify package names
2. **If comparative**: Get real metrics for both sides
3. **If personal journey**: Establish timeline of what actually happened

Create a "Facts Bank":
```
VERIFIED FACTS:
- [fact 1] - source: [how verified]
- [fact 2] - source: [how verified]

CLAIMS TO VERIFY:
- [claim needing verification]

OPINIONS (will mark as such):
- [opinion 1]
```

## Step 3: Structure Selection

Based on article type, recommend structure:

### For Journey/Story Articles:
```
1. Hook - The problem or starting point
2. Context - Why you started down this path
3. Attempt 1 - What you tried, what you learned
4. Attempt 2 - Next iteration, new lessons
5. [More attempts as needed]
6. Current State - Where you landed
7. Trade-offs - Honest downsides of your solution
8. Lessons - What others can learn
9. Kicker - Circle back to the hook
```

### For Comparison Articles:
```
1. Hook - Why this comparison matters
2. Context - When you'd choose either
3. Option A - Strengths AND weaknesses
4. Option B - Strengths AND weaknesses
5. Head-to-Head - Direct comparison table
6. Recommendation - With caveats
7. Kicker - Final thought
```

### For Tutorial Articles:
```
1. Hook - What you'll build/learn
2. Prerequisites - What readers need
3. Step 1-N - Clear, tested steps
4. Troubleshooting - Common issues
5. Next Steps - Where to go from here
```

## Step 4: Generate Outline

Create outline with:
- Section headers
- Key points per section
- Facts/data to include (from Facts Bank)
- Claims that need verification before writing

## Step 5: Pre-Flight Check

Before user starts writing, confirm:
- [ ] All facts in outline are verified
- [ ] No speculative claims unmarked
- [ ] Structure matches article type
- [ ] Takeaway is achievable with this outline
