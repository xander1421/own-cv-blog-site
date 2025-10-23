---
title: "Terraform Best Practices for Production in 2025"
date: "2025-09-22"
description: "Battle-tested patterns for Infrastructure as Code: state management, CI/CD pipelines, and environment separation from real-world production experience"
tags: ["Terraform", "IaC", "DevOps", "CI/CD", "AWS"]
image: "./terraform-best-practices-2025.webp"
---

After years of managing infrastructure across AWS and GCP, I've seen what separates hobbyist Terraform from production-grade Infrastructure as Code. Here's what actually works when you're managing hundreds of resources across multiple environments.

## The Great Debate: Workspaces vs Separate Configurations

This is the first question everyone asks: "Should I use Terraform workspaces or separate directories for staging/prod?"

**Short answer: Separate directories. Always.**

### Why Workspaces Are Dangerous in Production

Terraform workspaces seem elegant—one codebase, multiple environments. But they're a footgun:

```bash
# The horror story
$ terraform workspace select prod
$ terraform apply  # Oops, still had staging values in variables
$ # You just destroyed production
```

**Problems with workspaces:**
1. **Easy to apply to wrong environment**: `terraform workspace select` is error-prone
2. **State files in same backend**: One misconfiguration affects all environments
3. **No code differences**: Staging and prod should have different configurations (instance sizes, replica counts, etc.)
4. **No separate access controls**: Can't restrict prod access at the code level

### The Right Way: Directory-Based Separation

```text
terraform/
├── modules/
│   ├── vpc/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   ├── eks/
│   └── rds/
├── environments/
│   ├── staging/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   └── production/
│       ├── main.tf
│       ├── variables.tf
│       ├── terraform.tfvars
│       └── backend.tf
└── .gitignore
```

**Benefits:**
- **Impossible to mix environments**: You're physically in different directories
- **Separate state backends**: `staging.tfstate` and `production.tfstate` in different S3 buckets
- **Different configurations**: Prod uses `m5.2xlarge`, staging uses `t3.medium`
- **Access control**: Prod backend requires MFA, staging doesn't

### Environment-Specific Configurations

**environments/staging/main.tf:**
```hcl
module "eks" {
  source = "../../modules/eks"

  cluster_name    = "staging-cluster"
  instance_types  = ["t3.medium"]
  desired_size    = 2
  min_size        = 1
  max_size        = 5

  # Staging-specific: allow public access for testing
  endpoint_public_access = true
}
```

**environments/production/main.tf:**
```hcl
module "eks" {
  source = "../../modules/eks"

  cluster_name    = "production-cluster"
  instance_types  = ["m5.2xlarge", "m5.4xlarge"]
  desired_size    = 10
  min_size        = 5
  max_size        = 50

  # Production: private only
  endpoint_public_access = false
  endpoint_private_access = true
}
```

See the difference? Staging and prod have fundamentally different requirements. Workspaces can't handle this elegantly.

## State Management: Remote State is Non-Negotiable

**Never commit `.tfstate` to git.** Ever. State files contain secrets, and local state doesn't support locking.

### S3 Backend with DynamoDB Locking

**environments/production/backend.tf:**
```hcl
terraform {
  backend "s3" {
    bucket         = "company-terraform-state-prod"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock-prod"

    # Require MFA for production state access
    # Configure this in AWS IAM policies
  }
}
```

**Why DynamoDB locking matters:**

Without locking, this happens:
1. Engineer A runs `terraform apply` (takes 5 minutes)
2. Engineer B runs `terraform apply` simultaneously
3. Both read the same state version
4. Both write conflicting changes
5. State corruption, resources destroyed

DynamoDB prevents this with pessimistic locking.

### State Backend Setup

```bash
# Create S3 bucket for state
aws s3api create-bucket \
  --bucket company-terraform-state-prod \
  --region us-east-1 \
  --versioning-configuration Status=Enabled

# Enable encryption
aws s3api put-bucket-encryption \
  --bucket company-terraform-state-prod \
  --server-side-encryption-configuration \
    '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'

# Create DynamoDB table for locking
aws dynamodb create-table \
  --table-name terraform-state-lock-prod \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

**Pro tip:** Enable S3 versioning. When (not if) you corrupt state, you can roll back:

```bash
# List state versions
aws s3api list-object-versions --bucket company-terraform-state-prod

# Restore previous version
aws s3api copy-object \
  --copy-source company-terraform-state-prod/terraform.tfstate?versionId=VERSION_ID \
  --bucket company-terraform-state-prod \
  --key terraform.tfstate
```

## Module Design: DRY Without Losing Flexibility

Modules are where most Terraform codebases become unmaintainable. Here's how to avoid that.

### Bad Module: Too Rigid

```hcl
# modules/database/main.tf - TOO INFLEXIBLE
resource "aws_db_instance" "this" {
  identifier     = "myapp-db"
  instance_class = "db.t3.micro"  # Hardcoded!
  engine         = "postgres"
  engine_version = "15.4"         # What if I need 14.x?
}
```

This module is useless. You can't customize anything.

### Bad Module: Too Flexible

```hcl
# modules/database/variables.tf - TOO MANY VARIABLES
variable "identifier" { type = string }
variable "instance_class" { type = string }
variable "engine" { type = string }
variable "engine_version" { type = string }
variable "allocated_storage" { type = number }
variable "storage_type" { type = string }
variable "iops" { type = number }
variable "multi_az" { type = bool }
variable "publicly_accessible" { type = bool }
# ... 30 more variables
```

This is just wrapping the AWS API. No value added.

### Good Module: Sensible Defaults with Overrides

```hcl
# modules/database/variables.tf
variable "name" {
  description = "Database identifier"
  type        = string
}

variable "environment" {
  description = "Environment (staging, production)"
  type        = string
  validation {
    condition     = contains(["staging", "production"], var.environment)
    error_message = "Environment must be staging or production"
  }
}

variable "instance_class" {
  description = "Instance class (default: t3.medium for staging, r5.2xlarge for prod)"
  type        = string
  default     = null  # Computed based on environment
}

variable "backup_retention_days" {
  description = "Backup retention period"
  type        = number
  default     = null  # 7 for staging, 30 for production
}

variable "multi_az" {
  description = "Enable Multi-AZ (default: false for staging, true for prod)"
  type        = bool
  default     = null
}

# modules/database/main.tf
locals {
  # Smart defaults based on environment
  instance_class = var.instance_class != null ? var.instance_class : (
    var.environment == "production" ? "db.r5.2xlarge" : "db.t3.medium"
  )

  backup_retention = var.backup_retention_days != null ? var.backup_retention_days : (
    var.environment == "production" ? 30 : 7
  )

  multi_az = var.multi_az != null ? var.multi_az : (
    var.environment == "production" ? true : false
  )
}

resource "aws_db_instance" "this" {
  identifier     = "${var.name}-${var.environment}"
  instance_class = local.instance_class

  engine         = "postgres"
  engine_version = "15.4"

  allocated_storage     = 100
  max_allocated_storage = 1000  # Enable storage autoscaling

  backup_retention_period = local.backup_retention
  multi_az                = local.multi_az

  # Security: Never publicly accessible
  publicly_accessible = false

  # Encryption required
  storage_encrypted = true

  # Enable Performance Insights
  performance_insights_enabled = true

  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}
```

**Usage:**

```hcl
# Staging: uses all defaults (t3.medium, 7-day backup)
module "db" {
  source      = "../../modules/database"
  name        = "myapp"
  environment = "staging"
}

# Production: override instance class, keep smart defaults
module "db" {
  source         = "../../modules/database"
  name           = "myapp"
  environment    = "production"
  instance_class = "db.r5.4xlarge"  # Bigger than default
}
```

This module provides **guardrails** (never publicly accessible, always encrypted) while allowing **flexibility** where needed.

## CI/CD Pipeline: Automated Plan, Manual Apply

**Golden rule: Always run `terraform plan` automatically, but require approval for `apply`.**

### GitLab CI Pipeline

**.gitlab-ci.yml:**
```yaml
stages:
  - validate
  - plan
  - apply

variables:
  TF_ROOT: ${CI_PROJECT_DIR}/environments/${ENVIRONMENT}
  TF_VERSION: "1.7.0"

# Run on every commit
terraform:validate:
  stage: validate
  image: hashicorp/terraform:${TF_VERSION}
  script:
    - cd ${TF_ROOT}
    - terraform init -backend=false
    - terraform fmt -check
    - terraform validate
  only:
    changes:
      - "environments/**/*.tf"
      - "modules/**/*.tf"

# Run plan for staging on every MR
terraform:plan:staging:
  stage: plan
  image: hashicorp/terraform:${TF_VERSION}
  variables:
    ENVIRONMENT: staging
  before_script:
    # Assume AWS role for staging
    - export AWS_ROLE_ARN="arn:aws:iam::STAGING_ACCOUNT:role/TerraformRole"
    - export $(aws sts assume-role --role-arn ${AWS_ROLE_ARN} --role-session-name gitlab-ci | jq -r '.Credentials | "AWS_ACCESS_KEY_ID=\(.AccessKeyId) AWS_SECRET_ACCESS_KEY=\(.SecretAccessKey) AWS_SESSION_TOKEN=\(.SessionToken)"')
  script:
    - cd ${TF_ROOT}
    - terraform init
    - terraform plan -out=tfplan
    - terraform show -no-color tfplan > plan.txt
  artifacts:
    paths:
      - ${TF_ROOT}/tfplan
      - ${TF_ROOT}/plan.txt
    expire_in: 1 week
  only:
    - merge_requests

# Manual apply for staging (require button click)
terraform:apply:staging:
  stage: apply
  image: hashicorp/terraform:${TF_VERSION}
  variables:
    ENVIRONMENT: staging
  before_script:
    - export AWS_ROLE_ARN="arn:aws:iam::STAGING_ACCOUNT:role/TerraformRole"
    - export $(aws sts assume-role --role-arn ${AWS_ROLE_ARN} --role-session-name gitlab-ci | jq -r '.Credentials | "AWS_ACCESS_KEY_ID=\(.AccessKeyId) AWS_SECRET_ACCESS_KEY=\(.SecretAccessKey) AWS_SESSION_TOKEN=\(.SessionToken)"')
  script:
    - cd ${TF_ROOT}
    - terraform init
    - terraform apply tfplan
  dependencies:
    - terraform:plan:staging
  when: manual  # Require manual approval
  only:
    - main

# Production: separate jobs with extra protection
terraform:plan:production:
  stage: plan
  image: hashicorp/terraform:${TF_VERSION}
  variables:
    ENVIRONMENT: production
  before_script:
    - export AWS_ROLE_ARN="arn:aws:iam::PRODUCTION_ACCOUNT:role/TerraformRole"
    - export $(aws sts assume-role --role-arn ${AWS_ROLE_ARN} --role-session-name gitlab-ci | jq -r '.Credentials | "AWS_ACCESS_KEY_ID=\(.AccessKeyId) AWS_SECRET_ACCESS_KEY=\(.SecretAccessKey) AWS_SESSION_TOKEN=\(.SessionToken)"')
  script:
    - cd ${TF_ROOT}
    - terraform init
    - terraform plan -out=tfplan
    - terraform show -no-color tfplan > plan.txt
  artifacts:
    paths:
      - ${TF_ROOT}/tfplan
      - ${TF_ROOT}/plan.txt
    expire_in: 1 week
  only:
    - main  # Only on main branch

terraform:apply:production:
  stage: apply
  image: hashicorp/terraform:${TF_VERSION}
  variables:
    ENVIRONMENT: production
  before_script:
    - export AWS_ROLE_ARN="arn:aws:iam::PRODUCTION_ACCOUNT:role/TerraformRole"
    - export $(aws sts assume-role --role-arn ${AWS_ROLE_ARN} --role-session-name gitlab-ci | jq -r '.Credentials | "AWS_ACCESS_KEY_ID=\(.AccessKeyId) AWS_SECRET_ACCESS_KEY=\(.SecretAccessKey) AWS_SESSION_TOKEN=\(.SessionToken)"')
  script:
    - cd ${TF_ROOT}
    - terraform init
    - terraform apply tfplan
  dependencies:
    - terraform:plan:production
  when: manual  # ALWAYS manual for production
  only:
    - main
  # Optional: require protected environment approval
  environment:
    name: production
    action: deploy
```

### GitHub Actions Pipeline

**.github/workflows/terraform.yml:**
```yaml
name: Terraform

on:
  pull_request:
    paths:
      - 'environments/**'
      - 'modules/**'
  push:
    branches:
      - main

env:
  TF_VERSION: "1.7.0"

jobs:
  validate:
    name: Validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: ${{ env.TF_VERSION }}

      - name: Terraform Format
        run: terraform fmt -check -recursive

      - name: Validate Staging
        working-directory: ./environments/staging
        run: |
          terraform init -backend=false
          terraform validate

      - name: Validate Production
        working-directory: ./environments/production
        run: |
          terraform init -backend=false
          terraform validate

  plan-staging:
    name: Plan - Staging
    runs-on: ubuntu-latest
    needs: validate
    if: github.event_name == 'pull_request'
    permissions:
      id-token: write  # OIDC
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: ${{ env.TF_VERSION }}

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::STAGING_ACCOUNT:role/GitHubActions
          aws-region: us-east-1

      - name: Terraform Init
        working-directory: ./environments/staging
        run: terraform init

      - name: Terraform Plan
        id: plan
        working-directory: ./environments/staging
        run: |
          terraform plan -no-color -out=tfplan
          terraform show -no-color tfplan > plan.txt

      - name: Comment Plan on PR
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const plan = fs.readFileSync('./environments/staging/plan.txt', 'utf8');
            const output = `### Terraform Plan - Staging

            <details><summary>Show Plan</summary>

            \`\`\`hcl
            ${plan}
            \`\`\`

            </details>`;

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: output
            });

      - name: Upload Plan
        uses: actions/upload-artifact@v4
        with:
          name: staging-tfplan
          path: ./environments/staging/tfplan

  apply-staging:
    name: Apply - Staging
    runs-on: ubuntu-latest
    needs: plan-staging
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: staging  # Requires manual approval in GitHub settings
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: ${{ env.TF_VERSION }}

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::STAGING_ACCOUNT:role/GitHubActions
          aws-region: us-east-1

      - name: Download Plan
        uses: actions/download-artifact@v4
        with:
          name: staging-tfplan
          path: ./environments/staging

      - name: Terraform Init
        working-directory: ./environments/staging
        run: terraform init

      - name: Terraform Apply
        working-directory: ./environments/staging
        run: terraform apply tfplan

  plan-production:
    name: Plan - Production
    runs-on: ubuntu-latest
    needs: validate
    if: github.ref == 'refs/heads/main'
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: ${{ env.TF_VERSION }}

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::PRODUCTION_ACCOUNT:role/GitHubActions
          aws-region: us-east-1

      - name: Terraform Init
        working-directory: ./environments/production
        run: terraform init

      - name: Terraform Plan
        working-directory: ./environments/production
        run: |
          terraform plan -no-color -out=tfplan
          terraform show -no-color tfplan > plan.txt

      - name: Upload Plan
        uses: actions/upload-artifact@v4
        with:
          name: production-tfplan
          path: ./environments/production/tfplan

  apply-production:
    name: Apply - Production
    runs-on: ubuntu-latest
    needs: plan-production
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production  # Requires manual approval + CODEOWNERS
    permissions:
      id-token: write
      contents: read
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: ${{ env.TF_VERSION }}

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::PRODUCTION_ACCOUNT:role/GitHubActions
          aws-region: us-east-1

      - name: Download Plan
        uses: actions/download-artifact@v4
        with:
          name: production-tfplan
          path: ./environments/production

      - name: Terraform Init
        working-directory: ./environments/production
        run: terraform init

      - name: Terraform Apply
        working-directory: ./environments/production
        run: terraform apply tfplan
```

### Key Pipeline Patterns

1. **Validate on every commit**: Catch syntax errors immediately
2. **Plan on every PR**: Show exactly what will change
3. **Comment plan on PR**: Non-technical stakeholders can review
4. **Apply only on main**: Feature branches can't modify infrastructure
5. **Manual approval required**: No automatic applies
6. **Separate AWS accounts**: Staging and prod are isolated
7. **OIDC authentication**: No long-lived AWS credentials in CI

## IAM Permissions: Least Privilege for Terraform

**Bad: Admin access**
```json
{
  "Effect": "Allow",
  "Action": "*",
  "Resource": "*"
}
```

Never give Terraform admin. If Terraform is compromised (leaked credentials, supply chain attack), your entire AWS account is owned.

**Good: Scoped permissions**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:*",
        "eks:*",
        "rds:*",
        "s3:*",
        "iam:GetRole",
        "iam:GetRolePolicy",
        "iam:ListRolePolicies",
        "iam:ListAttachedRolePolicies"
      ],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "iam:CreateRole",
        "iam:DeleteRole",
        "iam:AttachRolePolicy",
        "iam:DetachRolePolicy",
        "iam:PutRolePolicy"
      ],
      "Resource": "arn:aws:iam::*:role/terraform-managed-*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::company-terraform-state-prod/*"
    },
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:PutItem",
        "dynamodb:GetItem",
        "dynamodb:DeleteItem"
      ],
      "Resource": "arn:aws:dynamodb:*:*:table/terraform-state-lock-prod"
    }
  ]
}
```

Only allow IAM role creation if the role name matches `terraform-managed-*`. This prevents Terraform from creating admin roles.

## Security Best Practices

### 1. Never Commit Secrets

**Bad:**
```hcl
resource "aws_db_instance" "this" {
  username = "admin"
  password = "MyP@ssw0rd123"  # NEVER
}
```

**Good:**
```hcl
resource "aws_db_instance" "this" {
  username = "admin"
  password = random_password.db_password.result
}

resource "random_password" "db_password" {
  length  = 32
  special = true
}

# Store in AWS Secrets Manager
resource "aws_secretsmanager_secret" "db_password" {
  name = "${var.name}-db-password"
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = random_password.db_password.result
}

output "db_password_secret_arn" {
  value       = aws_secretsmanager_secret.db_password.arn
  description = "ARN of DB password in Secrets Manager"
}
```

### 2. Use `.gitignore`

```gitignore
# Local .terraform directories
**/.terraform/*

# .tfstate files
*.tfstate
*.tfstate.*

# Crash log files
crash.log
crash.*.log

# Exclude all .tfvars files, which might contain sensitive data
*.tfvars
*.tfvars.json

# Ignore override files
override.tf
override.tf.json
*_override.tf
*_override.tf.json

# Ignore CLI configuration files
.terraformrc
terraform.rc

# Ignore plan files
*.tfplan
```

### 3. Encrypt Everything

```hcl
# S3 bucket: always encrypted
resource "aws_s3_bucket" "this" {
  bucket = var.bucket_name
}

resource "aws_s3_bucket_server_side_encryption_configuration" "this" {
  bucket = aws_s3_bucket.this.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.this.arn
    }
  }
}

resource "aws_s3_bucket_public_access_block" "this" {
  bucket = aws_s3_bucket.this.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# EBS volumes: always encrypted
resource "aws_ebs_volume" "this" {
  availability_zone = "us-east-1a"
  size              = 100
  encrypted         = true
  kms_key_id        = aws_kms_key.this.arn
}

# RDS: always encrypted
resource "aws_db_instance" "this" {
  # ... other config
  storage_encrypted = true
  kms_key_id        = aws_kms_key.this.arn
}
```

### 4. Prevent Accidental Deletion

```hcl
resource "aws_db_instance" "production" {
  # ... config

  # Prevent accidental deletion
  deletion_protection = true

  # Require manual snapshot before deletion
  skip_final_snapshot = false
  final_snapshot_identifier = "${var.name}-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"

  lifecycle {
    prevent_destroy = true  # Terraform will refuse to destroy this
  }
}
```

If you try to `terraform destroy`, you'll get:
```
Error: Instance cannot be destroyed

  on main.tf line 12:
  12: resource "aws_db_instance" "production" {

Resource has lifecycle.prevent_destroy set
```

## Advanced Patterns

### 1. Data Sources for Existing Infrastructure

Don't recreate what already exists:

```hcl
# Reference existing VPC (created by network team)
data "aws_vpc" "main" {
  tags = {
    Name = "production-vpc"
  }
}

# Use it in your resources
resource "aws_security_group" "app" {
  vpc_id = data.aws_vpc.main.id
  # ...
}
```

### 2. Dynamic Blocks for Repetitive Config

**Bad:**
```hcl
resource "aws_security_group" "app" {
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/8"]
  }
}
```

**Good:**
```hcl
locals {
  ingress_rules = [
    { port = 80,   description = "HTTP" },
    { port = 443,  description = "HTTPS" },
    { port = 8080, description = "App" },
  ]
}

resource "aws_security_group" "app" {
  dynamic "ingress" {
    for_each = local.ingress_rules
    content {
      description = ingress.value.description
      from_port   = ingress.value.port
      to_port     = ingress.value.port
      protocol    = "tcp"
      cidr_blocks = ["10.0.0.0/8"]
    }
  }
}
```

### 3. Conditional Resources

```hcl
variable "enable_monitoring" {
  type    = bool
  default = false
}

# Only create CloudWatch alarms in production
resource "aws_cloudwatch_metric_alarm" "cpu" {
  count = var.enable_monitoring ? 1 : 0

  alarm_name          = "${var.name}-high-cpu"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Average"
  threshold           = 80
}
```

In staging: `enable_monitoring = false` (no alarms created)
In production: `enable_monitoring = true` (alarms created)

### 4. Remote State Data Sources

Share outputs between Terraform projects:

**Network team's Terraform:**
```hcl
# environments/production/vpc/outputs.tf
output "vpc_id" {
  value = aws_vpc.main.id
}

output "private_subnet_ids" {
  value = aws_subnet.private[*].id
}
```

**App team's Terraform:**
```hcl
# environments/production/app/data.tf
data "terraform_remote_state" "network" {
  backend = "s3"
  config = {
    bucket = "company-terraform-state-prod"
    key    = "network/terraform.tfstate"
    region = "us-east-1"
  }
}

# Use network team's outputs
resource "aws_instance" "app" {
  subnet_id = data.terraform_remote_state.network.outputs.private_subnet_ids[0]
  # ...
}
```

This enables **separation of concerns**: Network team manages VPC, app team uses it without duplicating infrastructure.

## Testing Terraform

### 1. `terraform validate` - Syntax Check

```bash
terraform validate
```

Catches:
- Syntax errors
- Missing required variables
- Invalid references

### 2. `terraform plan` - Dry Run

```bash
terraform plan -out=tfplan
```

Shows:
- What will be created/changed/destroyed
- Resource dependencies
- Potential errors before applying

### 3. Pre-commit Hooks

**.pre-commit-config.yaml:**
```yaml
repos:
  - repo: https://github.com/antonbabenko/pre-commit-terraform
    rev: v1.88.0
    hooks:
      - id: terraform_fmt
      - id: terraform_validate
      - id: terraform_docs
      - id: terraform_tflint
```

Install:
```bash
pip install pre-commit
pre-commit install
```

Now every commit automatically runs:
- `terraform fmt` - Format code
- `terraform validate` - Validate syntax
- `tflint` - Lint for best practices
- `terraform-docs` - Generate docs

### 4. Terratest for Integration Testing

**tests/staging_test.go:**
```go
package test

import (
    "testing"
    "github.com/gruntwork-io/terratest/modules/terraform"
    "github.com/stretchr/testify/assert"
)

func TestStagingInfrastructure(t *testing.T) {
    terraformOptions := &terraform.Options{
        TerraformDir: "../environments/staging",
    }

    defer terraform.Destroy(t, terraformOptions)
    terraform.InitAndApply(t, terraformOptions)

    // Verify VPC was created
    vpcID := terraform.Output(t, terraformOptions, "vpc_id")
    assert.NotEmpty(t, vpcID)

    // Verify EKS cluster is accessible
    clusterName := terraform.Output(t, terraformOptions, "cluster_name")
    assert.Equal(t, "staging-cluster", clusterName)
}
```

Run tests:
```bash
cd tests
go test -v -timeout 30m
```

## Common Mistakes to Avoid

### 1. Not Using `terraform fmt`

**Always format your code:**
```bash
terraform fmt -recursive
```

Inconsistent formatting makes code reviews painful.

### 2. Hardcoding Values

**Bad:**
```hcl
resource "aws_instance" "app" {
  ami           = "ami-0c55b159cbfafe1f0"  # What region? What version?
  instance_type = "t2.micro"
}
```

**Good:**
```hcl
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

resource "aws_instance" "app" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = var.instance_type
}
```

### 3. Not Tagging Resources

**Always tag:**
```hcl
locals {
  common_tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
    Project     = var.project_name
    CostCenter  = var.cost_center
    Owner       = var.team_email
  }
}

resource "aws_instance" "app" {
  # ... config
  tags = merge(local.common_tags, {
    Name = "${var.project_name}-app-${var.environment}"
  })
}
```

Tags enable cost tracking, automation, and compliance.

### 4. Ignoring `terraform plan` Output

**READ THE PLAN.** I've seen engineers blindly run `terraform apply` and:
- Delete production databases
- Change security group rules, breaking connectivity
- Recreate instances, causing downtime

**Before applying:**
1. Look for `-/+` (destroy and recreate)
2. Check what's being destroyed
3. Verify change reasons make sense

## OpenTofu: The Terraform Fork

In 2023, HashiCorp changed Terraform's license from MPL to BSL (Business Source License), prompting the community to fork Terraform as **OpenTofu** under the Linux Foundation.

**Should you use OpenTofu?**

**Use OpenTofu if:**
- You want a truly open-source alternative
- You're concerned about HashiCorp's license changes
- You're using Terraform Cloud alternatives (Spacelift, Env0, Scalr)

**Stick with Terraform if:**
- You use Terraform Cloud/Enterprise
- You need official HashiCorp support
- You want the latest features first

**Migration is trivial:**
```bash
# OpenTofu is a drop-in replacement
brew install opentofu

# Same commands
tofu init
tofu plan
tofu apply
```

Your existing `.tf` files work unchanged. State format is identical (for now).

## Conclusion: Terraform is About Discipline

Terraform doesn't prevent you from shooting yourself in the foot. It gives you a loaded gun and hopes you're careful.

**Production-ready checklist:**
- ✅ Remote state with S3 + DynamoDB locking
- ✅ Separate directories for staging/prod (not workspaces)
- ✅ CI/CD pipeline with automatic plan, manual apply
- ✅ Separate AWS accounts for environments
- ✅ OIDC authentication (no long-lived credentials)
- ✅ Least-privilege IAM roles
- ✅ Never commit secrets (use Secrets Manager)
- ✅ Enable deletion protection on critical resources
- ✅ Pre-commit hooks for validation
- ✅ Comprehensive tagging strategy
- ✅ State file versioning enabled
- ✅ Module design with sensible defaults
- ✅ `terraform validate` in CI
- ✅ Required manual approval for production applies

**Key Takeaways:**

1. **Workspaces are dangerous** - Use separate directories
2. **State management is critical** - Remote backend with locking
3. **Modules should have smart defaults** - Don't expose every AWS parameter
4. **Always plan before apply** - Read the diff
5. **Separate AWS accounts** - Staging can't destroy production
6. **Automate validation** - Pre-commit hooks catch errors early
7. **Never commit secrets** - Use Secrets Manager or Parameter Store
8. **Tag everything** - Cost allocation depends on it

Terraform is the best IaC tool we have, but it demands discipline. Follow these practices and you'll have infrastructure that's reproducible, auditable, and safe to modify.

**Further Reading:**
- Official Terraform documentation: https://developer.hashicorp.com/terraform/docs
- Terraform Best Practices Guide: https://www.terraform-best-practices.com/
- AWS Provider Documentation: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
- OpenTofu: https://opentofu.org/
