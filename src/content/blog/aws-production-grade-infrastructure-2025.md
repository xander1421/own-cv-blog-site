---
title: "Building Production-Grade AWS Infrastructure in 2025"
date: "2025-10-05"
description: "How to architect secure, scalable, and cost-efficient AWS infrastructure for businesses using multi-account strategy, Landing Zones, and the Well-Architected Framework"
tags: ["AWS", "Cloud Architecture", "DevOps", "Security", "Infrastructure"]
image: "./aws-production-grade-infrastructure-2025.webp"
---

After years of building cloud infrastructure in production, I've learned that production-grade AWS isn't about using every service—it's about using the right services correctly. Here's how to build AWS infrastructure that scales, stays secure, and doesn't bankrupt your company.

## The Foundation: Multi-Account Strategy

**Single AWS account for everything is a rookie mistake.**

In 2025, if you're running production workloads in the same AWS account as development, you're doing it wrong. Here's why:

### Why Multi-Account Matters

1. **Blast radius containment**: Compromised dev account can't access production
2. **Cost allocation**: Know exactly what each team/project costs
3. **Compliance**: Separate PCI/HIPAA workloads from non-compliant ones
4. **Access control**: Junior devs get full access to dev, zero access to prod
5. **Service limits**: Each account has separate quotas (no more "we hit the VPC limit")

### AWS Organizations Structure

```text
Root Organization
├── Management Account (no workloads here!)
│   └── Billing consolidated
├── Security OU
│   ├── Security Tooling Account (GuardDuty, Security Hub)
│   └── Log Archive Account (all CloudTrail logs)
├── Infrastructure OU
│   ├── Shared Services Account (CI/CD, artifact registry)
│   └── Network Account (Transit Gateway, VPN)
├── Development OU
│   ├── Dev Account 1
│   └── Dev Account 2
└── Production OU
    ├── Prod Account 1
    └── Prod Account 2
```

**Key principle: Management account should NEVER run workloads.** It's for billing and organization management only.

### Setting Up AWS Organizations

```bash
# Create organization (run in management account)
aws organizations create-organization --feature-set ALL

# Create organizational units
aws organizations create-organizational-unit \
  --parent-id r-xxxx \
  --name "Production"

aws organizations create-organizational-unit \
  --parent-id r-xxxx \
  --name "Development"

aws organizations create-organizational-unit \
  --parent-id r-xxxx \
  --name "Security"

# Create production account
aws organizations create-account \
  --email aws-prod@company.com \
  --account-name "Production" \
  --role-name OrganizationAccountAccessRole

# Create development account
aws organizations create-account \
  --email aws-dev@company.com \
  --account-name "Development" \
  --role-name OrganizationAccountAccessRole
```

### Service Control Policies (SCPs)

SCPs are guardrails that prevent even account admins from doing dangerous things.

**Prevent region usage outside US/EU (compliance requirement):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyAllOutsideAllowedRegions",
      "Effect": "Deny",
      "Action": "*",
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "aws:RequestedRegion": [
            "us-east-1",
            "us-west-2",
            "eu-west-1",
            "eu-central-1"
          ]
        },
        "ArnNotLike": {
          "aws:PrincipalArn": [
            "arn:aws:iam::*:role/OrganizationAccountAccessRole"
          ]
        }
      }
    }
  ]
}
```

**Prevent disabling critical security services:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PreventSecurityServiceDisable",
      "Effect": "Deny",
      "Action": [
        "guardduty:DeleteDetector",
        "guardduty:DisassociateFromMasterAccount",
        "securityhub:DisableSecurityHub",
        "config:DeleteConfigurationRecorder",
        "config:StopConfigurationRecorder",
        "cloudtrail:DeleteTrail",
        "cloudtrail:StopLogging"
      ],
      "Resource": "*"
    }
  ]
}
```

**Require encryption for all S3 buckets:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RequireS3Encryption",
      "Effect": "Deny",
      "Action": "s3:PutObject",
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": [
            "AES256",
            "aws:kms"
          ]
        }
      }
    },
    {
      "Sid": "DenyUnencryptedBuckets",
      "Effect": "Deny",
      "Action": "s3:CreateBucket",
      "Resource": "*",
      "Condition": {
        "StringNotEquals": {
          "s3:x-amz-server-side-encryption": [
            "AES256",
            "aws:kms"
          ]
        }
      }
    }
  ]
}
```

Apply SCP to production OU:
```bash
aws organizations attach-policy \
  --policy-id p-xxxx \
  --target-id ou-prod-xxxx
```

## AWS Control Tower: Landing Zone Automation

**Don't build your multi-account setup manually.** Use AWS Control Tower to automate it.

Control Tower gives you:
- Pre-configured account factory
- Guardrails (SCPs + Config rules)
- Centralized logging
- SSO integration
- Account vending machine

### Enable Control Tower

```bash
# Use AWS Console for initial setup (Control Tower → Set up landing zone)
# Specify:
# - Home region: us-east-1
# - Log archive account email
# - Audit account email
# - Enable GuardDuty, SecurityHub, CloudTrail

# Once enabled, create accounts via Account Factory
aws servicecatalog provision-product \
  --product-name "AWS Control Tower Account Factory" \
  --provisioning-artifact-name "AWS Control Tower Account Factory" \
  --provisioned-product-name "Production-App-Account" \
  --provisioning-parameters \
    Key=AccountEmail,Value=prod-app@company.com \
    Key=AccountName,Value=Production-App \
    Key=ManagedOrganizationalUnit,Value=Production \
    Key=SSOUserEmail,Value=admin@company.com \
    Key=SSOUserFirstName,Value=Admin \
    Key=SSOUserLastName,Value=User
```

### Pre-Built Guardrails

Control Tower includes pre-configured guardrails:

**Mandatory (always enforced):**
- Disallow public read access to S3 buckets
- Disallow public write access to S3 buckets
- Enable CloudTrail in all regions
- Integrate CloudTrail with CloudWatch Logs

**Strongly Recommended:**
- Enable MFA for root user
- Disallow root user access keys
- Enable AWS Config in all regions
- Disallow internet connection through VPC peering

**Elective (optional):**
- Disallow unencrypted EBS volumes
- Disallow RDS instances without backup
- Disallow RDS instances not encrypted

Enable guardrails:
```bash
aws controltower enable-guardrail \
  --guardrail-identifier arn:aws:controltower:us-east-1::guardrail/STRONGLY_RECOMMENDED_DISALLOW_ROOT_ACCESS_KEYS \
  --target-identifier arn:aws:organizations::123456789012:ou/o-xxx/ou-prod-xxx
```

## Network Architecture: Hub-and-Spoke with Transit Gateway

**VPC peering is dead. Use Transit Gateway.**

### Why Transit Gateway?

VPC peering is **O(n²)** complexity:
- 3 VPCs: 3 peering connections
- 10 VPCs: 45 peering connections
- 50 VPCs: 1,225 peering connections (unmanageable)

Transit Gateway is **O(n)** complexity:
- 50 VPCs: 50 Transit Gateway attachments
- Centralized routing
- Transitive routing (VPC A → VPC B → VPC C)
- On-premises connectivity (single VPN/Direct Connect)

### Hub-and-Spoke Architecture

```text
                    ┌─────────────────┐
                    │ Transit Gateway │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼────┐         ┌────▼────┐         ┌────▼────┐
   │  Shared │         │   Prod  │         │   Dev   │
   │ Services│         │   VPC   │         │   VPC   │
   │   VPC   │         └─────────┘         └─────────┘
   └────┬────┘
        │
   ┌────▼─────────┐
   │ VPN Gateway  │
   │ (On-premises)│
   └──────────────┘
```

### Create Transit Gateway

```bash
# Create Transit Gateway
aws ec2 create-transit-gateway \
  --description "Production Transit Gateway" \
  --options \
    AmazonSideAsn=64512,\
    DefaultRouteTableAssociation=enable,\
    DefaultRouteTablePropagation=enable,\
    DnsSupport=enable,\
    VpnEcnSupport=enable \
  --tag-specifications \
    ResourceType=transit-gateway,Tags=[{Key=Name,Value=prod-tgw}]

# Create Transit Gateway attachment for each VPC
aws ec2 create-transit-gateway-vpc-attachment \
  --transit-gateway-id tgw-xxxx \
  --vpc-id vpc-prod-xxxx \
  --subnet-ids subnet-az1-xxxx subnet-az2-xxxx subnet-az3-xxxx \
  --tag-specifications \
    ResourceType=transit-gateway-attachment,Tags=[{Key=Name,Value=prod-vpc-attachment}]

# Update VPC route table to use Transit Gateway
aws ec2 create-route \
  --route-table-id rtb-xxxx \
  --destination-cidr-block 10.0.0.0/8 \
  --transit-gateway-id tgw-xxxx
```

### VPC Design: Production-Grade Subnets

**Bad: Single subnet per AZ**
```text
VPC: 10.0.0.0/16
├── Public Subnet AZ1: 10.0.1.0/24
├── Private Subnet AZ1: 10.0.2.0/24
└── Private Subnet AZ2: 10.0.3.0/24
```

**Good: Purpose-specific subnets with isolation**
```text
VPC: 10.0.0.0/16
├── Public Subnets (Internet-facing load balancers only)
│   ├── AZ1: 10.0.0.0/24
│   ├── AZ2: 10.0.1.0/24
│   └── AZ3: 10.0.2.0/24
├── Private App Subnets (ECS, EKS, EC2 workloads)
│   ├── AZ1: 10.0.10.0/24
│   ├── AZ2: 10.0.11.0/24
│   └── AZ3: 10.0.12.0/24
├── Private Data Subnets (RDS, ElastiCache, isolated)
│   ├── AZ1: 10.0.20.0/24
│   ├── AZ2: 10.0.21.0/24
│   └── AZ3: 10.0.22.0/24
└── Private Management Subnets (bastion, VPN)
    ├── AZ1: 10.0.30.0/24
    ├── AZ2: 10.0.31.0/24
    └── AZ3: 10.0.32.0/24
```

**Why separate data subnets?**
- Network ACLs can restrict app → data traffic
- Security groups are simpler (data subnet = database security group)
- Compliance: Easy to prove data isolation
- No accidental internet routes

### VPC Terraform Example

```hcl
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "production-vpc"
  cidr = "10.0.0.0/16"

  azs = ["us-east-1a", "us-east-1b", "us-east-1c"]

  # Public subnets (load balancers, NAT gateways)
  public_subnets = ["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24"]

  # Private app subnets (ECS, EKS)
  private_subnets = ["10.0.10.0/24", "10.0.11.0/24", "10.0.12.0/24"]

  # Database subnets (RDS, ElastiCache)
  database_subnets = ["10.0.20.0/24", "10.0.21.0/24", "10.0.22.0/24"]

  # Isolated management subnets
  intra_subnets = ["10.0.30.0/24", "10.0.31.0/24", "10.0.32.0/24"]

  # High availability NAT gateways (one per AZ)
  enable_nat_gateway     = true
  single_nat_gateway     = false  # Production: NAT per AZ
  one_nat_gateway_per_az = true

  # DNS resolution
  enable_dns_hostnames = true
  enable_dns_support   = true

  # VPC Flow Logs (critical for security)
  enable_flow_log                      = true
  create_flow_log_cloudwatch_iam_role  = true
  create_flow_log_cloudwatch_log_group = true
  flow_log_retention_in_days           = 90

  # Tags
  tags = {
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}
```

### VPC Endpoints: Keep Traffic Private

**Never route AWS API traffic through internet.**

AWS PrivateLink lets you access AWS services without leaving AWS network.

```hcl
# S3 Gateway Endpoint (free!)
resource "aws_vpc_endpoint" "s3" {
  vpc_id       = module.vpc.vpc_id
  service_name = "com.amazonaws.us-east-1.s3"

  route_table_ids = module.vpc.private_route_table_ids

  tags = {
    Name = "s3-endpoint"
  }
}

# Interface endpoints (use PrivateLink)
locals {
  interface_endpoints = [
    "ec2",
    "ecr.api",
    "ecr.dkr",
    "ecs",
    "ecs-agent",
    "ecs-telemetry",
    "logs",
    "ssm",
    "ssmmessages",
    "ec2messages",
    "kms",
    "secretsmanager",
    "rds",
    "sns",
    "sqs"
  ]
}

resource "aws_vpc_endpoint" "interface" {
  for_each = toset(local.interface_endpoints)

  vpc_id              = module.vpc.vpc_id
  service_name        = "com.amazonaws.us-east-1.${each.value}"
  vpc_endpoint_type   = "Interface"
  subnet_ids          = module.vpc.private_subnets
  security_group_ids  = [aws_security_group.vpc_endpoints.id]
  private_dns_enabled = true

  tags = {
    Name = "${each.value}-endpoint"
  }
}

# Security group for VPC endpoints
resource "aws_security_group" "vpc_endpoints" {
  name_description = "Allow HTTPS to VPC endpoints"
  vpc_id           = module.vpc.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

**Cost savings:** Interface endpoints cost ~$7/month each, but save on NAT Gateway data processing (~$0.045/GB). If you push >150GB/month through NAT to AWS APIs, endpoints pay for themselves.

## Security: Defense in Depth

Security isn't one service—it's layers.

### Layer 1: IAM - Identity and Access Management

**Never use root account. Ever.**

```bash
# Enable MFA for root (do this NOW)
# 1. Go to IAM → Security credentials
# 2. Activate MFA on root account
# 3. Store recovery codes in password manager
# 4. Delete root access keys if they exist

# Create IAM users with MFA required
aws iam create-user --user-name john.doe

# Attach MFA enforcement policy
aws iam put-user-policy \
  --user-name john.doe \
  --policy-name RequireMFA \
  --policy-document file://require-mfa.json
```

**require-mfa.json:**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "DenyAllExceptListedIfNoMFA",
      "Effect": "Deny",
      "NotAction": [
        "iam:CreateVirtualMFADevice",
        "iam:EnableMFADevice",
        "iam:GetUser",
        "iam:ListMFADevices",
        "iam:ListVirtualMFADevices",
        "iam:ResyncMFADevice",
        "sts:GetSessionToken"
      ],
      "Resource": "*",
      "Condition": {
        "BoolIfExists": {
          "aws:MultiFactorAuthPresent": "false"
        }
      }
    }
  ]
}
```

### IAM Roles for Everything

**Never use access keys. Use IAM roles.**

```hcl
# EC2 instance role
resource "aws_iam_role" "app_server" {
  name = "app-server-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
    }]
  })
}

# Attach specific permissions
resource "aws_iam_role_policy" "app_server_s3" {
  name = "s3-access"
  role = aws_iam_role.app_server.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "s3:GetObject",
        "s3:PutObject"
      ]
      Resource = "arn:aws:s3:::my-app-bucket/*"
    }]
  })
}

# Instance profile (attaches role to EC2)
resource "aws_iam_instance_profile" "app_server" {
  name = "app-server-profile"
  role = aws_iam_role.app_server.name
}

# Use in EC2 instance
resource "aws_instance" "app" {
  ami                  = data.aws_ami.amazon_linux_2.id
  instance_type        = "t3.medium"
  iam_instance_profile = aws_iam_instance_profile.app_server.name

  # Application automatically gets S3 access, no keys needed
}
```

**In your application:**
```go
// No credentials needed! Uses instance role automatically
sess := session.Must(session.NewSession())
s3Client := s3.New(sess)

// Just works
s3Client.PutObject(&s3.PutObjectInput{
    Bucket: aws.String("my-app-bucket"),
    Key:    aws.String("file.txt"),
    Body:   strings.NewReader("content"),
})
```

### Layer 2: GuardDuty - Threat Detection

GuardDuty monitors:
- CloudTrail logs for suspicious API calls
- VPC Flow Logs for malicious IPs
- DNS logs for C&C communication

```bash
# Enable GuardDuty (do this in ALL accounts)
aws guardduty create-detector --enable

# Get findings
aws guardduty list-findings \
  --detector-id xxxx \
  --finding-criteria '{"Criterion":{"severity":{"Gte":7}}}'

# Send findings to SNS for alerting
aws guardduty create-publish-destination \
  --detector-id xxxx \
  --destination-type SNS \
  --destination-properties \
    DestinationArn=arn:aws:sns:us-east-1:123456789012:security-alerts
```

**Common GuardDuty findings:**
- **UnauthorizedAccess:EC2/SSHBruteForce** - Someone is brute-forcing SSH
- **Recon:EC2/PortProbeUnprotectedPort** - Port scanning detected
- **CryptoCurrency:EC2/BitcoinTool.B!DNS** - Instance mining Bitcoin
- **Trojan:EC2/DNSDataExfiltration** - Data exfil through DNS

**Critical: Set up automated response:**
```python
# Lambda function triggered by GuardDuty findings
import boto3

ec2 = boto3.client('ec2')
sns = boto3.client('sns')

def lambda_handler(event, context):
    finding = event['detail']
    severity = finding['severity']

    # High severity: isolate instance immediately
    if severity >= 7.0:
        instance_id = finding['resource']['instanceDetails']['instanceId']

        # Quarantine security group (no ingress/egress)
        ec2.modify_instance_attribute(
            InstanceId=instance_id,
            Groups=['sg-quarantine']
        )

        # Alert security team
        sns.publish(
            TopicArn='arn:aws:sns:us-east-1:123456789012:security-alerts',
            Subject=f'CRITICAL: Instance {instance_id} quarantined',
            Message=f'GuardDuty finding: {finding["title"]}\nSeverity: {severity}'
        )
```

### Layer 3: Security Hub - Centralized Security

Security Hub aggregates findings from:
- GuardDuty
- AWS Config
- Inspector
- Macie
- IAM Access Analyzer
- Third-party tools (Palo Alto, CrowdStrike)

```bash
# Enable Security Hub
aws securityhub enable-security-hub \
  --enable-default-standards

# Enable standards
aws securityhub batch-enable-standards \
  --standards-subscription-requests \
    StandardsArn=arn:aws:securityhub:us-east-1::standards/aws-foundational-security-best-practices/v/1.0.0 \
    StandardsArn=arn:aws:securityhub:::ruleset/cis-aws-foundations-benchmark/v/1.2.0

# Get critical findings
aws securityhub get-findings \
  --filters '{"SeverityLabel":[{"Value":"CRITICAL","Comparison":"EQUALS"}]}'
```

**CIS AWS Foundations Benchmark checks:**
- 1.1: Avoid root account usage
- 1.2: MFA enabled for root
- 1.3: Credentials unused for 90 days
- 1.4: Access keys rotated every 90 days
- 2.1: CloudTrail enabled in all regions
- 2.3: S3 bucket logging enabled
- 2.8: KMS key rotation enabled

### Layer 4: AWS Config - Compliance Monitoring

Config continuously monitors resource configurations and flags violations.

```hcl
resource "aws_config_configuration_recorder" "main" {
  name     = "default"
  role_arn = aws_iam_role.config.arn

  recording_group {
    all_supported = true
    include_global_resource_types = true
  }
}

resource "aws_config_delivery_channel" "main" {
  name           = "default"
  s3_bucket_name = aws_s3_bucket.config.id
  sns_topic_arn  = aws_sns_topic.config.arn

  depends_on = [aws_config_configuration_recorder.main]
}

# Start recording
resource "aws_config_configuration_recorder_status" "main" {
  name       = aws_config_configuration_recorder.main.name
  is_enabled = true

  depends_on = [aws_config_delivery_channel.main]
}

# Managed rules
resource "aws_config_config_rule" "encrypted_volumes" {
  name = "encrypted-volumes"

  source {
    owner             = "AWS"
    source_identifier = "ENCRYPTED_VOLUMES"
  }

  depends_on = [aws_config_configuration_recorder.main]
}

resource "aws_config_config_rule" "rds_multi_az" {
  name = "rds-multi-az-support"

  source {
    owner             = "AWS"
    source_identifier = "RDS_MULTI_AZ_SUPPORT"
  }

  depends_on = [aws_config_configuration_recorder.main]
}

resource "aws_config_config_rule" "s3_bucket_public_read_prohibited" {
  name = "s3-bucket-public-read-prohibited"

  source {
    owner             = "AWS"
    source_identifier = "S3_BUCKET_PUBLIC_READ_PROHIBITED"
  }

  depends_on = [aws_config_configuration_recorder.main]
}
```

**Config auto-remediation:**
```hcl
resource "aws_config_remediation_configuration" "s3_block_public_access" {
  config_rule_name = aws_config_config_rule.s3_bucket_public_read_prohibited.name

  target_type      = "SSM_DOCUMENT"
  target_identifier = "AWS-PublishSNSNotification"

  parameter {
    name         = "AutomationAssumeRole"
    static_value = aws_iam_role.remediation.arn
  }

  parameter {
    name           = "TopicArn"
    static_value   = aws_sns_topic.config.arn
  }

  automatic = true
  maximum_automatic_attempts = 5
  retry_attempt_seconds      = 60
}
```

### Layer 5: KMS - Encryption Key Management

**Encrypt everything with KMS. Everything.**

```hcl
# Create customer-managed key
resource "aws_kms_key" "main" {
  description             = "Production encryption key"
  deletion_window_in_days = 30
  enable_key_rotation     = true  # Automatic annual rotation

  tags = {
    Name = "production-key"
  }
}

resource "aws_kms_alias" "main" {
  name          = "alias/production"
  target_key_id = aws_kms_key.main.key_id
}

# Key policy (who can use this key)
resource "aws_kms_key_policy" "main" {
  key_id = aws_kms_key.main.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "Enable IAM policies"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      },
      {
        Sid    = "Allow services to use key"
        Effect = "Allow"
        Principal = {
          Service = [
            "ec2.amazonaws.com",
            "rds.amazonaws.com",
            "s3.amazonaws.com",
            "logs.amazonaws.com"
          ]
        }
        Action = [
          "kms:Decrypt",
          "kms:GenerateDataKey"
        ]
        Resource = "*"
      }
    ]
  })
}

# Use KMS with RDS
resource "aws_db_instance" "main" {
  # ... other config
  storage_encrypted = true
  kms_key_id        = aws_kms_key.main.arn
}

# Use KMS with S3
resource "aws_s3_bucket_server_side_encryption_configuration" "main" {
  bucket = aws_s3_bucket.main.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm     = "aws:kms"
      kms_master_key_id = aws_kms_key.main.arn
    }
    bucket_key_enabled = true  # Reduces KMS API calls by 99%
  }
}

# Use KMS with Secrets Manager
resource "aws_secretsmanager_secret" "db_password" {
  name       = "production/db/password"
  kms_key_id = aws_kms_key.main.id

  recovery_window_in_days = 30
}
```

## High Availability and Disaster Recovery

### Multi-AZ is Non-Negotiable

**Production must survive AZ failure.**

```hcl
# RDS: Multi-AZ automatic failover
resource "aws_db_instance" "main" {
  identifier = "production-db"

  engine         = "postgres"
  engine_version = "15.4"
  instance_class = "db.r5.2xlarge"

  # Multi-AZ: synchronous replication to standby
  multi_az = true

  # Automated backups
  backup_retention_period = 30
  backup_window          = "03:00-04:00"
  maintenance_window     = "mon:04:00-mon:05:00"

  # Deletion protection
  deletion_protection = true
  skip_final_snapshot = false
  final_snapshot_identifier = "production-db-final-snapshot"

  # Encryption
  storage_encrypted = true
  kms_key_id        = aws_kms_key.main.arn

  # Performance Insights
  performance_insights_enabled    = true
  performance_insights_kms_key_id = aws_kms_key.main.arn

  # Enhanced monitoring
  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]
  monitoring_interval             = 60
  monitoring_role_arn             = aws_iam_role.rds_monitoring.arn
}

# Read replicas for scaling
resource "aws_db_instance" "read_replica" {
  count = 2

  identifier = "production-db-replica-${count.index + 1}"

  replicate_source_db = aws_db_instance.main.identifier
  instance_class      = "db.r5.xlarge"

  # Place in different AZs
  availability_zone = data.aws_availability_zones.available.names[count.index]

  # Auto minor version upgrades
  auto_minor_version_upgrade = true

  # Performance Insights
  performance_insights_enabled = true
}
```

### Application Load Balancer: Multi-AZ

```hcl
resource "aws_lb" "main" {
  name               = "production-alb"
  load_balancer_type = "application"

  # Subnets in multiple AZs
  subnets = module.vpc.public_subnets

  # Security
  drop_invalid_header_fields = true

  # Access logs
  access_logs {
    bucket  = aws_s3_bucket.alb_logs.id
    enabled = true
  }

  tags = {
    Name = "production-alb"
  }
}

resource "aws_lb_target_group" "app" {
  name     = "app-targets"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id

  # Health checks
  health_check {
    enabled             = true
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
    path                = "/health"
    matcher             = "200"
  }

  # Connection draining
  deregistration_delay = 30

  # Stickiness
  stickiness {
    type            = "lb_cookie"
    cookie_duration = 86400
    enabled         = true
  }
}

resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate.main.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

# Redirect HTTP to HTTPS
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      protocol    = "HTTPS"
      port        = "443"
      status_code = "HTTP_301"
    }
  }
}
```

### Cross-Region Disaster Recovery

**RPO (Recovery Point Objective): How much data can you lose?**
**RTO (Recovery Time Objective): How long to recover?**

```hcl
# S3 Cross-Region Replication
resource "aws_s3_bucket_replication_configuration" "main" {
  bucket = aws_s3_bucket.main.id
  role   = aws_iam_role.replication.arn

  rule {
    id     = "replicate-all"
    status = "Enabled"

    filter {}

    destination {
      bucket        = aws_s3_bucket.replica.arn
      storage_class = "STANDARD_IA"

      # Replicate encryption
      encryption_configuration {
        replica_kms_key_id = aws_kms_key.replica_region.arn
      }

      # Replicate delete markers
      replication_time {
        status = "Enabled"
        time {
          minutes = 15
        }
      }

      metrics {
        status = "Enabled"
        event_threshold {
          minutes = 15
        }
      }
    }

    delete_marker_replication {
      status = "Enabled"
    }
  }
}

# RDS Cross-Region Read Replica
resource "aws_db_instance" "dr_replica" {
  provider = aws.us_west_2  # Different region

  identifier = "production-db-dr"

  replicate_source_db = aws_db_instance.main.arn
  instance_class      = "db.r5.2xlarge"

  # Can be promoted to standalone in DR scenario
  backup_retention_period = 30

  storage_encrypted = true
  kms_key_id        = aws_kms_key.us_west_2.arn
}
```

**Promote DR replica to primary:**
```bash
# In disaster scenario
aws rds promote-read-replica \
  --db-instance-identifier production-db-dr \
  --backup-retention-period 30
```

## Cost Optimization

### 1. Use Savings Plans and Reserved Instances

**On-demand pricing is for suckers.**

```bash
# Compute Savings Plan (most flexible)
# 1 year, no upfront: ~20% savings
# 3 year, all upfront: ~40% savings

# Purchase Savings Plan (do this via AWS Console → Cost Management → Savings Plans)
# - Commit to $100/hour of compute for 1 year
# - Covers EC2, Fargate, Lambda
# - Automatically applies to all matching usage

# Reserved Instances for RDS (bigger discounts than Savings Plans)
aws rds purchase-reserved-db-instances-offering \
  --reserved-db-instances-offering-id xxxx \
  --reserved-db-instance-id production-db-ri \
  --db-instance-count 1
```

**Typical savings:**
- RDS 1-year RI: 35% off
- RDS 3-year RI: 60% off
- EC2 Savings Plan 1-year: 20% off
- EC2 Savings Plan 3-year: 40% off

### 2. Right-Size Your Instances

**Most instances are overprovisioned.**

```bash
# Get utilization data
aws cloudwatch get-metric-statistics \
  --namespace AWS/EC2 \
  --metric-name CPUUtilization \
  --dimensions Name=InstanceId,Value=i-xxxx \
  --start-time 2025-01-01T00:00:00Z \
  --end-time 2025-01-22T00:00:00Z \
  --period 86400 \
  --statistics Average

# Use AWS Compute Optimizer
aws compute-optimizer get-ec2-instance-recommendations

# Typical finding: "m5.2xlarge with 5% CPU → downsize to m5.large, save $120/month"
```

### 3. Use Spot Instances

**For stateless workloads, Spot is 70% cheaper.**

```hcl
# ECS with Spot
resource "aws_ecs_capacity_provider" "spot" {
  name = "spot"

  auto_scaling_group_provider {
    auto_scaling_group_arn = aws_autoscaling_group.spot.arn

    managed_scaling {
      maximum_scaling_step_size = 10
      minimum_scaling_step_size = 1
      status                    = "ENABLED"
      target_capacity           = 100
    }
  }
}

resource "aws_autoscaling_group" "spot" {
  name = "ecs-spot"

  min_size         = 3
  max_size         = 100
  desired_capacity = 10

  vpc_zone_identifier = module.vpc.private_subnets

  mixed_instances_policy {
    instances_distribution {
      on_demand_base_capacity                  = 2   # 2 on-demand for stability
      on_demand_percentage_above_base_capacity = 0   # Rest is Spot
      spot_allocation_strategy                 = "price-capacity-optimized"
    }

    launch_template {
      launch_template_specification {
        launch_template_id = aws_launch_template.ecs.id
        version            = "$Latest"
      }

      # Multiple instance types for Spot diversification
      override {
        instance_type = "m5.large"
      }
      override {
        instance_type = "m5a.large"
      }
      override {
        instance_type = "m5n.large"
      }
      override {
        instance_type = "m6i.large"
      }
    }
  }
}
```

### 4. S3 Intelligent Tiering

```hcl
resource "aws_s3_bucket_intelligent_tiering_configuration" "main" {
  bucket = aws_s3_bucket.main.id
  name   = "EntireBucket"

  tiering {
    access_tier = "ARCHIVE_ACCESS"
    days        = 90
  }

  tiering {
    access_tier = "DEEP_ARCHIVE_ACCESS"
    days        = 180
  }
}
```

**How it works:**
- Frequent access: STANDARD tier
- No access for 30 days: Moves to INFREQUENT_ACCESS (40% cheaper)
- No access for 90 days: Moves to ARCHIVE (80% cheaper)
- No access for 180 days: Moves to DEEP_ARCHIVE (95% cheaper)

### 5. Enable Cost Allocation Tags

```hcl
locals {
  common_tags = {
    Environment = var.environment
    Project     = var.project
    Team        = var.team
    CostCenter  = var.cost_center
    ManagedBy   = "Terraform"
  }
}

# Apply to all resources
resource "aws_instance" "app" {
  # ... config
  tags = merge(local.common_tags, {
    Name = "app-server"
  })
}
```

**Enable in AWS Cost Explorer:**
```bash
# Activate cost allocation tags
aws ce create-cost-category-definition \
  --name "By Team" \
  --rules file://cost-category-rules.json
```

Now you can see: "Team A spent $50k this month, Team B spent $30k"

## Monitoring and Observability

### CloudWatch Alarms

```hcl
# CPU alarm
resource "aws_cloudwatch_metric_alarm" "cpu" {
  alarm_name          = "production-high-cpu"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 300
  statistic           = "Average"
  threshold           = 80

  alarm_description = "CPU above 80% for 10 minutes"
  alarm_actions     = [aws_sns_topic.alerts.arn]

  dimensions = {
    AutoScalingGroupName = aws_autoscaling_group.app.name
  }
}

# Database connections alarm
resource "aws_cloudwatch_metric_alarm" "db_connections" {
  alarm_name          = "production-db-connections"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "DatabaseConnections"
  namespace           = "AWS/RDS"
  period              = 300
  statistic           = "Average"
  threshold           = 80  # Assume max 100 connections

  alarm_description = "Database connection pool near limit"
  alarm_actions     = [aws_sns_topic.alerts.arn]

  dimensions = {
    DBInstanceIdentifier = aws_db_instance.main.id
  }
}

# ALB 5xx errors
resource "aws_cloudwatch_metric_alarm" "alb_5xx" {
  alarm_name          = "production-alb-5xx"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 1
  metric_name         = "HTTPCode_Target_5XX_Count"
  namespace           = "AWS/ApplicationELB"
  period              = 60
  statistic           = "Sum"
  threshold           = 10

  alarm_description = "More than 10 5xx errors in 1 minute"
  alarm_actions     = [aws_sns_topic.alerts.arn]

  dimensions = {
    LoadBalancer = aws_lb.main.arn_suffix
  }
}
```

### CloudWatch Logs Insights

```bash
# Find errors in last hour
aws logs start-query \
  --log-group-name /aws/ecs/production \
  --start-time $(date -u -d '1 hour ago' +%s) \
  --end-time $(date -u +%s) \
  --query-string 'fields @timestamp, @message | filter @message like /ERROR/ | sort @timestamp desc | limit 100'

# API latency analysis
aws logs start-query \
  --log-group-name /aws/apigateway/production \
  --start-time $(date -u -d '1 hour ago' +%s) \
  --end-time $(date -u +%s) \
  --query-string 'stats avg(latency), max(latency), pct(latency, 95), pct(latency, 99) by endpoint'
```

### X-Ray Distributed Tracing

```hcl
# Enable X-Ray on Lambda
resource "aws_lambda_function" "api" {
  # ... config

  tracing_config {
    mode = "Active"
  }
}

# X-Ray daemon on ECS
resource "aws_ecs_task_definition" "app" {
  family = "app"

  container_definitions = jsonencode([
    {
      name  = "app"
      image = "myapp:latest"
      # ... config
    },
    {
      name  = "xray-daemon"
      image = "amazon/aws-xray-daemon"
      portMappings = [{
        containerPort = 2000
        protocol      = "udp"
      }]
    }
  ])
}
```

## Well-Architected Framework Checklist

AWS provides the [Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) with 6 pillars:

### 1. Operational Excellence
- ✅ Infrastructure as Code (Terraform/CloudFormation)
- ✅ CI/CD pipelines
- ✅ Runbooks for common operations
- ✅ Automated deployments
- ✅ Monitoring and alerting

### 2. Security
- ✅ Multi-account strategy
- ✅ IAM roles, no access keys
- ✅ MFA enforced
- ✅ GuardDuty enabled
- ✅ Security Hub enabled
- ✅ All data encrypted (KMS)
- ✅ VPC Flow Logs enabled
- ✅ CloudTrail in all regions

### 3. Reliability
- ✅ Multi-AZ deployment
- ✅ Auto Scaling groups
- ✅ RDS Multi-AZ
- ✅ Automated backups
- ✅ Cross-region DR replicas
- ✅ Health checks on all services

### 4. Performance Efficiency
- ✅ Right-sized instances
- ✅ Auto Scaling based on demand
- ✅ CloudFront CDN for static assets
- ✅ ElastiCache for database caching
- ✅ RDS read replicas for read scaling

### 5. Cost Optimization
- ✅ Savings Plans / Reserved Instances
- ✅ Spot instances for stateless workloads
- ✅ S3 Intelligent Tiering
- ✅ Cost allocation tags
- ✅ Budget alerts
- ✅ Regular cost reviews

### 6. Sustainability
- ✅ Use Graviton instances (ARM, lower power)
- ✅ Scale down non-prod environments overnight
- ✅ Use managed services (AWS optimizes power)
- ✅ S3 Glacier for archival (lower energy)

## Conclusion: Build for Scale from Day One

Production-grade AWS isn't about perfection on day one—it's about having the right foundation.

**Day 1 (Mandatory):**
- ✅ Multi-account setup (Control Tower)
- ✅ GuardDuty, Security Hub, Config enabled
- ✅ CloudTrail logging
- ✅ MFA enforced
- ✅ No root account usage

**Week 1:**
- ✅ VPC design with public/private/data subnets
- ✅ Transit Gateway for multi-VPC
- ✅ VPC endpoints for AWS services
- ✅ KMS encryption for all data

**Month 1:**
- ✅ Multi-AZ for all critical services
- ✅ Automated backups with testing
- ✅ CloudWatch alarms for key metrics
- ✅ Cost allocation tags

**Month 3:**
- ✅ Cross-region DR
- ✅ Savings Plans purchased
- ✅ Security incident response runbook
- ✅ Well-Architected Review completed

**Key Takeaways:**

1. **Multi-account is mandatory** - Blast radius containment
2. **Security is layers** - GuardDuty + Security Hub + Config + KMS
3. **Transit Gateway over VPC peering** - Scales to hundreds of VPCs
4. **Encrypt everything** - KMS for all data at rest
5. **Multi-AZ is non-negotiable** - Survive AZ failures
6. **Use IAM roles** - Never access keys
7. **Tag everything** - Cost allocation depends on it
8. **Automate compliance** - Config rules + auto-remediation
9. **Right-size and use Spot** - 40-70% cost savings
10. **DR must be tested** - Untested backups are useless

**Further Reading:**
- AWS Well-Architected Framework: https://aws.amazon.com/architecture/well-architected/
- AWS Security Best Practices: https://docs.aws.amazon.com/security/
- AWS Organizations User Guide: https://docs.aws.amazon.com/organizations/
- AWS Control Tower Guide: https://docs.aws.amazon.com/controltower/
- CIS AWS Foundations Benchmark: https://www.cisecurity.org/benchmark/amazon_web_services
