---
name: masterful-writing:fact-check
description: Verify specific claims in an article using tools
---

<objective>
Rigorously verify specific claims in an article. Do NOT trust the article's assertions - verify using actual tools, commands, and primary sources.
</objective>

# Fact-Check Protocol

## Claim Categories

### 1. Code Metrics
Claims about lines of code, file sizes, dependency counts.

**Verification Method:**
```bash
# Line counts
find <path> -name "*.ext" | xargs wc -l | tail -1

# File/folder sizes
du -sh <path>
ls -lh <file>

# Dependency counts
jq '.dependencies | length' package.json
cargo metadata --format-version=1 | jq '.packages | length'
```

**Red Flags:**
- Round numbers (exactly 1,000 lines? Suspicious)
- Comparisons without both sides measured
- "Reduced by X%" without showing math

### 2. Package/Library Names
Claims about specific packages, imports, or dependencies.

**Verification Method:**
```bash
# npm packages
npm info <package-name> 2>/dev/null | head -5

# Rust crates
cargo search <crate-name> | head -3

# Python packages
pip index versions <package> 2>/dev/null | head -3

# Check actual imports in code
grep -r "import.*<package>" <codebase>
grep -r "from.*<package>" <codebase>
```

**Red Flags:**
- Package names with unusual prefixes (@aspect/, my-, etc.)
- Imports that don't match package.json/Cargo.toml
- Version numbers that don't exist

### 3. Performance Claims
Claims about speed, memory, startup time.

**Verification Method:**
- Was it actually benchmarked?
- With what tool?
- Under what conditions?
- Can it be reproduced?

**Red Flags:**
- "Faster" without numbers
- "~X MB" without measurement method
- Comparisons across different workloads
- Future tense presented as fact

### 4. Feature Claims
Claims about what software can or cannot do.

**Verification Method:**
```bash
# Check documentation
<tool> --help | grep <feature>

# Check if feature is implemented
grep -r "<feature>" <codebase>

# Check TODO/FIXME comments
grep -r "TODO\|FIXME" <codebase> | grep -i "<feature>"
```

**Red Flags:**
- "Supports X" when X is a TODO
- "Will support" presented as "supports"
- Features that exist only in config, not in code

### 5. External Claims
Claims about other projects, standards, or organizations.

**Verification Method:**
- Find the PRIMARY source (not a blog post about it)
- Check the date of the source
- Verify quotes are verbatim

**Red Flags:**
- "Signal does X" without checking Signal's actual code
- "The standard says" without citing the standard
- Paraphrased quotes presented as direct quotes

## Output Format

For each claim checked, report:

```
CLAIM: "<exact text from article>"
LOCATION: Line X / Section Y
VERIFICATION: <command run or source checked>
RESULT: <what was found>
STATUS: CONFIRMED | FALSE | UNVERIFIED | NEEDS QUALIFIER
FIX: <if needed, exact replacement text>
```

## Severity Levels

- **CRITICAL**: Factually wrong, could embarrass author
- **MODERATE**: Misleading without more context
- **MINOR**: Imprecise but not harmful
- **STYLE**: Opinion stated as fact (add "I believe" or "in my experience")
