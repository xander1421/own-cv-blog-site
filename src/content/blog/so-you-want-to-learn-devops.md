---
title: "So You Want to Learn DevOps: A Practical Roadmap from Zero to Hired"
date: "2025-10-30"
description: "A no-nonsense guide to learning DevOps fundamentals: Linux, AWS, Docker, Python, and everything you need to land your first permanent DevOps role"
tags: ["DevOps", "Career", "Learning", "Linux", "AWS", "Docker", "Python"]
image: "./so-you-want-to-learn-devops.webp"
---

A friend recently asked me to help guide someone into DevOps. They're doing junior freelance work but want a permanent DevOps position. The problem? They need to learn the fundamentals.

I can't personally mentor everyone who wants to break into DevOps. But I can write down the exact learning path I'd recommend - the skills that actually matter, the courses worth taking, and the hands-on practice that'll get you hired.

This isn't theory. This is the stack you need to know to be useful on day one.

## The Hard Truth About Learning DevOps

**DevOps is not an entry-level position.** You need to understand:
- Operating systems (Linux primarily)
- Networking fundamentals
- At least one programming language
- Cloud platforms
- Containerization
- Infrastructure as Code
- CI/CD pipelines

That's a lot. If someone tells you that you can "learn DevOps in 30 days," they're lying to you.

**Realistic timeline:** 6-12 months of focused learning and hands-on practice to be job-ready. That's if you're studying seriously, building projects, and actually deploying things.

## Prerequisites: What You Actually Need

**Your setup (Windows 11):**
- Install **WSL2** (Windows Subsystem for Linux) - This is non-negotiable
- Install **Windows Terminal** - Much better than CMD
- Install **Visual Studio Code** - You'll live in this
- Get comfortable with the command line

Everything I recommend will work on WSL2. You don't need to dual-boot Linux or buy a Mac.

## Phase 1: Linux Fundamentals (Month 1-2)

**Why it matters:** 95% of servers run Linux. If you don't know Linux, you can't do DevOps.

### What You Need to Learn

**File System & Navigation:**
- `cd`, `ls`, `pwd`, `mkdir`, `rm`, `cp`, `mv`
- Understanding `/etc`, `/var`, `/home`, `/opt`
- File permissions: `chmod`, `chown`, `chgrp`
- Understanding `rwx` permissions and octal notation

**Text Processing:**
- `cat`, `less`, `head`, `tail`
- `grep`, `awk`, `sed` - You'll use these daily
- `find` - Finding files by name, size, modification time

**Process Management:**
- `ps`, `top`, `htop`, `kill`
- Understanding PIDs and signals
- Background/foreground jobs: `&`, `fg`, `bg`
- `systemd` and `systemctl` - How services work on modern Linux

**Networking:**
- `ping`, `curl`, `wget`
- `netstat`, `ss`, `lsof` - Debugging network issues
- `ssh` - Remote server access
- Basic firewall concepts: `ufw`, `iptables`

**Package Management:**
- `apt` (Ubuntu/Debian) or `yum`/`dnf` (RedHat/CentOS)
- Installing, updating, removing packages
- Understanding repositories

### Recommended Learning Path

**Free Resources:**
1. **Linux Journey** (https://linuxjourney.com/) - Best beginner-friendly resource
2. **OverTheWire Bandit** (https://overthewire.org/wargames/bandit/) - Learn by doing challenges
3. **The Linux Command Line** book by William Shotts (free PDF)

**Paid Course (Worth It):**
- **Linux Foundation: Introduction to Linux** (edX) - $200-300, certificate included
- **Learn Linux in 5 Days** (Udemy) - Often on sale for $15

### Hands-On Practice

**Don't just watch videos. Do this:**

1. **Set up WSL2 on Windows 11:**
```bash
# Open PowerShell as Administrator
wsl --install -d Ubuntu-22.04
```

2. **Daily Linux challenges:**
- Spend 30 minutes daily in the terminal
- Do OverTheWire Bandit levels (at least 1-15)
- Practice writing bash scripts for automation

3. **Build something:**
- Write a bash script that backs up files
- Create a log parser that finds errors
- Automate user creation with a script

**You're ready for Phase 2 when:**
- You can navigate Linux without Googling basic commands
- You understand file permissions and can fix permission issues
- You can write basic bash scripts
- You're comfortable with SSH

## Phase 2: Python for DevOps (Month 2-3)

**Why Python?** Because every DevOps engineer needs a scripting language, and Python dominates:
- AWS CLI and Boto3 (AWS SDK) are Python
- Ansible is Python
- Most automation scripts are Python
- Reading other people's tools requires Python knowledge

### What You Need to Learn

**Core Python:**
- Variables, data types, loops, conditionals
- Functions and modules
- File I/O (reading logs, config files)
- Exception handling
- Working with JSON and YAML

**DevOps-Specific Python:**
- `subprocess` module - Running shell commands from Python
- `requests` library - API calls
- `paramiko` - SSH automation
- `boto3` - AWS SDK
- `psutil` - System monitoring

### Recommended Courses

**Free:**
1. **Python Crash Course** (first half of the book is free online)
2. **Automate the Boring Stuff with Python** - Free online book
3. **Corey Schafer's Python Tutorials** (YouTube) - Best Python YouTuber

**Paid:**
- **Python for Everybody** (Coursera) - Free to audit, $50 for certificate
- **100 Days of Code: Python** (Udemy) - Often $15-20

### Hands-On Practice

**Projects to build:**

1. **Server Health Monitor:**
```python
# Monitor CPU, memory, disk usage
# Send alerts if thresholds exceeded
# Log metrics to a file
```

2. **Log Analyzer:**
```python
# Parse Apache/Nginx logs
# Find most common errors
# Generate daily reports
```

3. **Backup Automation:**
```python
# Compress directories
# Upload to AWS S3
# Clean up old backups
```

4. **API Integration:**
```python
# Call GitHub API
# Fetch repository info
# Generate reports
```

**You're ready for Phase 3 when:**
- You can write scripts without constantly Googling syntax
- You understand error handling and debugging
- You've built at least 3 small automation tools
- You can read and modify other people's Python code

## Phase 3: AWS Cloud Fundamentals (Month 3-5)

**Why AWS?** It's the market leader. 32% of cloud market share. Most jobs require AWS knowledge.

### What You Need to Learn

**Core Services (Learn in This Order):**

1. **IAM (Identity and Access Management)**
   - Users, groups, roles, policies
   - Least privilege principle
   - MFA setup

2. **EC2 (Elastic Compute Cloud)**
   - Launch instances
   - Security groups
   - SSH access
   - Instance types and pricing

3. **VPC (Virtual Private Cloud)**
   - Subnets (public vs private)
   - Internet Gateway
   - NAT Gateway
   - Route tables
   - Network ACLs vs Security Groups

4. **S3 (Simple Storage Service)**
   - Buckets and objects
   - Versioning
   - Lifecycle policies
   - Static website hosting

5. **RDS (Relational Database Service)**
   - PostgreSQL/MySQL setup
   - Multi-AZ deployments
   - Backup strategies

6. **CloudWatch**
   - Metrics and logs
   - Alarms
   - Dashboards

7. **Lambda**
   - Serverless functions
   - Event triggers
   - Use cases

### Recommended Learning Path

**Free Resources:**
1. **AWS Free Tier** - You get 12 months free (sign up immediately)
2. **AWS Skill Builder** - Official AWS training (free tier available)
3. **AWS Documentation** - Surprisingly well-written

**Paid Course:**
- **Ultimate AWS Certified Solutions Architect Associate** by Stephane Maarek (Udemy) - $15-20
  - Yes, it's for the cert, but it's the best AWS course
  - You'll learn by doing, not just watching

**Certification Path:**
- **AWS Certified Cloud Practitioner** (optional, but good for absolute beginners)
- **AWS Certified Solutions Architect Associate** (highly recommended)

### Hands-On Practice

**DON'T JUST WATCH VIDEOS. BUILD THINGS.**

**Project 1: Deploy a Web Application**
```
1. Create a VPC with public and private subnets
2. Launch an EC2 instance in public subnet
3. Install Nginx
4. Configure security groups (only allow 80/443)
5. Point a domain to your instance
6. Add SSL with Let's Encrypt
```

**Project 2: Static Website on S3**
```
1. Create S3 bucket
2. Enable static website hosting
3. Upload HTML/CSS/JS
4. Configure CloudFront CDN
5. Add custom domain with Route53
```

**Project 3: Automated Backups**
```
1. Create Lambda function
2. Trigger daily with EventBridge
3. Snapshot EC2 volumes
4. Delete old snapshots
5. Send SNS notification on completion
```

**Project 4: Multi-Tier Application**
```
1. Application Load Balancer
2. EC2 Auto Scaling Group
3. RDS database in private subnet
4. S3 for static assets
5. CloudWatch monitoring and alarms
```

**Cost Management:**
- Use AWS Free Tier wisely
- Set up billing alerts immediately
- Destroy resources when done practicing
- Use `t2.micro` or `t3.micro` instances

**You're ready for Phase 4 when:**
- You can launch and configure EC2 instances without tutorials
- You understand VPC networking (public/private subnets, routing)
- You've deployed at least 2 real applications on AWS
- You can troubleshoot common issues (security groups, IAM permissions)

## Phase 4: Docker & Containerization (Month 5-6)

**Why Docker?** Containers are how modern applications are packaged and deployed. Non-negotiable skill.

### What You Need to Learn

**Docker Basics:**
- Images vs Containers
- Dockerfile syntax
- Building images
- Running containers
- Port mapping
- Volume mounts
- Container networking

**Docker Compose:**
- Multi-container applications
- Service definitions
- Networks and volumes
- Environment variables

**Container Registry:**
- Docker Hub
- AWS ECR (Elastic Container Registry)
- Pushing/pulling images

### Recommended Courses

**Free:**
1. **Docker Documentation** - Excellent getting started guide
2. **Play with Docker** (https://labs.play-with-docker.com/) - Free online playground
3. **TechWorld with Nana** (YouTube) - Docker and Kubernetes tutorials

**Paid:**
- **Docker Mastery** by Bret Fisher (Udemy) - $15-20, best Docker course

### Hands-On Practice

**Project 1: Containerize a Python App**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["python", "app.py"]
```

**Project 2: Multi-Container App with Docker Compose**
```yaml
# Web app + PostgreSQL + Redis
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - db
      - redis
    environment:
      DATABASE_URL: postgresql://postgres:password@db:5432/myapp

  db:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: password

  redis:
    image: redis:7-alpine

volumes:
  postgres_data:
```

**Project 3: Deploy to AWS ECS**
```
1. Create ECR repository
2. Push Docker image
3. Create ECS cluster
4. Define ECS task
5. Create service with load balancer
```

**You're ready for Phase 5 when:**
- You can containerize any application
- You understand Docker networking and volumes
- You've written Docker Compose files for multi-tier apps
- You can debug container issues

## Phase 5: Infrastructure as Code (Month 6-7)

**Why IaC?** Clicking in AWS console doesn't scale. Everything should be code.

### What You Need to Learn

**Terraform:**
- HCL syntax
- Resources, data sources, variables
- Modules
- State management
- Remote backends (S3 + DynamoDB)
- Workspaces vs separate directories (use directories)

**Recommended Courses:**
- **Complete Terraform Course** by Zeal Vora (Udemy) - $15-20
- **HashiCorp Learn Terraform** (free official tutorials)

### Hands-On Practice

**Start Small:**
```hcl
# main.tf
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"

  tags = {
    Name = "HelloTerraform"
  }
}
```

**Build Up:**
1. VPC with public/private subnets
2. EC2 instances with user data scripts
3. RDS database
4. Load balancer
5. Auto Scaling Group
6. Full production environment

**Pro Tip:** Read my article "Terraform Best Practices for Production in 2025" for production patterns.

## Phase 6: CI/CD Pipelines (Month 7-8)

**Why CI/CD?** Automating testing and deployment is the core of DevOps.

### What You Need to Learn

**CI/CD Concepts:**
- Build automation
- Automated testing
- Deployment pipelines
- Blue-green deployments
- Canary releases

**Tools (Pick One to Start):**
- **GitHub Actions** (easiest to learn, free for public repos)
- **GitLab CI** (great for self-hosted)
- **Jenkins** (older but still widely used)

### GitHub Actions Example

```yaml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Login to Amazon ECR
        run: aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY

      - name: Build and push Docker image
        run: |
          docker build -t myapp .
          docker tag myapp:latest $ECR_REGISTRY/myapp:latest
          docker push $ECR_REGISTRY/myapp:latest

      - name: Deploy to ECS
        run: aws ecs update-service --cluster production --service myapp --force-new-deployment
```

### Hands-On Practice

**Build a complete pipeline:**
1. Code commit triggers build
2. Run tests
3. Build Docker image
4. Push to ECR
5. Deploy to ECS/EC2
6. Run smoke tests
7. Rollback on failure

## Phase 7: Kubernetes (Month 8-10) - Optional But Increasingly Required

**Do you need Kubernetes?** Depends on the job. Many companies use ECS or plain Docker. But K8s is increasingly common.

### What You Need to Learn

**Core Concepts:**
- Pods, Deployments, Services
- ConfigMaps and Secrets
- Namespaces
- Ingress controllers
- Persistent volumes

**Managed Kubernetes:**
- AWS EKS
- Google GKE
- Azure AKS

### Recommended Learning

**Free:**
- **Kubernetes Documentation** - Start here
- **Kubernetes the Hard Way** - Kelsey Hightower (advanced but enlightening)

**Paid:**
- **Kubernetes for Absolute Beginners** - Mumshad Mannambeth (Udemy) - $15-20
- **Certified Kubernetes Administrator (CKA)** course

### Hands-On Practice

**Start with Minikube:**
```bash
# Install Minikube on WSL2
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

minikube start
```

**Deploy an app:**
```bash
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=LoadBalancer
kubectl get services
```

**Graduate to EKS:**
1. Create EKS cluster with Terraform
2. Deploy multi-tier application
3. Set up monitoring with Prometheus
4. Implement auto-scaling
5. Blue-green deployments

## Phase 8: Monitoring & Observability (Month 10-11)

**Why it matters:** If you can't monitor it, you can't operate it.

### What You Need to Learn

**Logging:**
- Centralized logging (ELK stack, CloudWatch Logs)
- Log aggregation
- Search and analysis

**Metrics:**
- Prometheus
- Grafana dashboards
- CloudWatch metrics

**Tracing:**
- Understanding distributed tracing
- AWS X-Ray

**Alerting:**
- Alert rules
- Notification channels (PagerDuty, Slack)
- Alert fatigue prevention

### Hands-On Practice

**Build a monitoring stack:**
```
1. Deploy Prometheus on Kubernetes
2. Set up node exporters
3. Create Grafana dashboards
4. Configure alerting rules
5. Send alerts to Slack
```

## Phase 9: Security & Best Practices (Ongoing)

**DevOps = DevSecOps**

### Critical Skills

**Infrastructure Security:**
- Principle of least privilege (IAM)
- Security groups and NACLs
- Encryption at rest and in transit
- Secrets management (AWS Secrets Manager, Vault)
- VPN and bastion hosts

**Application Security:**
- Container scanning (Trivy, Snyk)
- Dependency scanning
- SAST/DAST tools
- Security headers

**Compliance:**
- Audit logging
- Compliance as code
- Infrastructure scanning (Checkov, tfsec)

## The Complete Learning Timeline

**Month 1-2:** Linux fundamentals
**Month 2-3:** Python scripting
**Month 3-5:** AWS core services
**Month 5-6:** Docker and containers
**Month 6-7:** Terraform (IaC)
**Month 7-8:** CI/CD pipelines
**Month 8-10:** Kubernetes (if needed)
**Month 10-11:** Monitoring and logging
**Month 11-12:** Practice, build portfolio, interview prep

**Total: 12 months of focused learning**

## The Portfolio That Gets You Hired

Don't just learn. Build things and show them off.

**Your GitHub should have:**

1. **Infrastructure as Code project**
   - Complete AWS environment with Terraform
   - VPC, EC2, RDS, S3, CloudFront
   - README explaining architecture

2. **Containerized application**
   - Multi-tier app with Docker Compose
   - CI/CD pipeline
   - Deployed to AWS ECS or EKS

3. **Automation scripts**
   - Python tools for common DevOps tasks
   - Backup automation
   - Log analysis
   - Server provisioning

4. **Monitoring setup**
   - Prometheus + Grafana
   - Custom dashboards
   - Alert rules

5. **Documentation**
   - Well-written READMEs
   - Architecture diagrams
   - Setup instructions

**Make it public. Make it good. This is your resume.**

## Certifications: Worth It or Waste of Time?

**Worth getting:**
- **AWS Certified Solutions Architect - Associate** - Opens doors, proves AWS knowledge
- **AWS Certified Developer - Associate** - If you're also doing development
- **Certified Kubernetes Administrator (CKA)** - If targeting K8s-heavy roles
- **HashiCorp Certified: Terraform Associate** - Good for resume parsing

**Skip these (for now):**
- CompTIA certifications - Too general
- Cloud Practitioner - Too basic if you're serious
- Multiple cloud certs - Master one cloud first

**Reality check:** Certs help get past HR filters. They don't replace hands-on experience. Prioritize projects over certifications.

## The Skills You Can't Learn from Courses

**Troubleshooting:** This comes from breaking things and fixing them. Intentionally break your lab environments and fix them.

**Reading Documentation:** Most learning happens reading docs, not watching videos. Get comfortable with official documentation.

**Communication:** DevOps is a bridge between development and operations. Learn to:
- Write clear documentation
- Explain technical concepts to non-technical people
- Create runbooks and postmortems

**Incident Management:** How to respond when production is down:
- Stay calm under pressure
- Methodical debugging
- Clear communication
- Root cause analysis

## Common Mistakes to Avoid

**1. Tutorial Hell**
Don't watch 10 Docker courses. Watch one, then build something.

**2. Not Using the Free Tier**
AWS Free Tier gives you 12 months of resources. Use it immediately.

**3. Only Learning, Never Building**
Employers want to see what you've built, not what courses you've completed.

**4. Skipping the Fundamentals**
You can't learn Kubernetes without understanding Linux and Docker first.

**5. Analysis Paralysis**
"Should I learn AWS or GCP? Docker or Podman? Terraform or Pulumi?"
**Just pick one and start.** AWS, Docker, Terraform are solid choices.

**6. Not Cleaning Up Resources**
You'll get a $500 AWS bill if you leave resources running. Always destroy what you create.

**7. Learning Too Many Tools Superficially**
Better to know 5 tools deeply than 20 tools superficially.

## Cost Breakdown: How Much Will This Cost?

**Free:**
- WSL2 on Windows 11
- Linux learning resources
- Python learning resources
- AWS Free Tier (12 months)
- GitHub (public repositories)
- Docker Desktop
- Terraform
- VS Code

**Paid (Optional but Recommended):**
- Udemy courses: ~$100 total (wait for sales, never pay full price)
- AWS after free tier: $20-50/month if careful
- Domain name: $12/year
- AWS Solutions Architect cert: $150 exam fee

**Total first year: $300-500**

That's cheaper than a single college course. And infinitely more practical.

## Your First DevOps Job: What to Expect

**Reality check on job titles:**
- "Junior DevOps Engineer" - Rare, most want 2-3 years experience
- "Platform Engineer" - Often entry-level friendly
- "Site Reliability Engineer (SRE)" - Usually requires experience
- "Cloud Engineer" - Good entry point
- "Systems Engineer" - Traditional but DevOps-adjacent

**What "junior" actually means:**
You won't be architecting infrastructure day one. You'll be:
- Writing automation scripts
- Maintaining CI/CD pipelines
- Monitoring and responding to alerts
- Deploying updates
- Writing documentation
- Learning from senior engineers

**Salary expectations (US, 2025):**
- Junior/Entry: $70k-90k
- Mid-level (2-4 years): $100k-130k
- Senior (5+ years): $130k-180k+
- Staff/Principal: $180k-250k+

Location matters. Remote jobs are competitive but possible.

## The Honest Truth About Breaking Into DevOps

**It's harder than it looks.** Most "junior" DevOps jobs want 2-3 years of experience. You're competing with:
- Former sysadmins transitioning to DevOps
- Developers moving into infrastructure
- CS graduates with internships

**How to stand out:**
1. **Strong portfolio** - Show, don't tell
2. **Contribute to open source** - Real-world experience
3. **Write about what you learn** - Blog posts, documentation
4. **Network** - LinkedIn, local meetups, conferences
5. **Start as adjacent role** - Systems admin, junior developer, then transition

**Alternative entry points:**
- **Managed service providers** - Often hire less experienced engineers
- **Startups** - Willing to train if you show potential
- **Internal transfer** - Start in support/QA, move to DevOps
- **Contract/freelance** - Build experience while job hunting

## Resources Checklist

**Bookmark these:**

**Learning Platforms:**
- Udemy (wait for sales)
- A Cloud Guru / Linux Academy
- Coursera
- AWS Skill Builder

**Practice:**
- AWS Free Tier
- OverTheWire
- KodeKloud (Kubernetes practice)
- CatOps (Terraform challenges)

**Documentation:**
- AWS Documentation
- Kubernetes Documentation
- Terraform Registry
- Docker Documentation

**Communities:**
- r/devops (Reddit)
- DevOps Discord servers
- AWS Community Builders
- Local DevOps meetups

**News/Blogs:**
- DevOps Weekly newsletter
- Last Week in AWS
- CloudSkills.io
- AWS Blog

## Final Thoughts: Is It Worth It?

**DevOps is hard.** It's a wide field that requires knowing multiple disciplines:
- Linux administration
- Programming
- Cloud platforms
- Networking
- Security
- Automation

**But it's also rewarding:**
- High demand
- Good salaries
- Remote-friendly
- Always learning
- Tangible impact (you ship code to production)

**The path forward:**
1. Start with Linux and Python (Months 1-3)
2. Get AWS certified (Months 3-6)
3. Learn Docker and IaC (Months 6-8)
4. Build portfolio projects (Months 8-12)
5. Apply to jobs, expect rejections, keep learning

**You don't need to know everything to start.** You need to know enough to be useful and willing to learn the rest.

**My friend's friend who wants to transition from freelance to permanent?** Here's my advice:

1. Take the AWS Solutions Architect Associate exam within 3 months
2. Build 3 portfolio projects showing end-to-end systems
3. Contribute to an open-source DevOps tool
4. Document everything you build
5. Network aggressively - LinkedIn, meetups, conferences
6. Apply to 50+ jobs, expect 5 interviews, hope for 1 offer

It's a grind. But it's doable.

And once you're in, the learning never stops. That's the beauty of DevOps - there's always something new to learn, something to optimize, something to automate.

Now stop reading and start building. Your lab environment isn't going to set itself up.

**Further Reading:**
- The Phoenix Project (book) - Understand DevOps culture
- The DevOps Handbook (book) - DevOps practices explained
- Site Reliability Engineering (free online) - How Google does operations
- AWS Well-Architected Framework - How to build on AWS properly
