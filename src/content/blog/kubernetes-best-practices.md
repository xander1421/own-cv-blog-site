---
title: "Kubernetes Best Practices for Production in 2025"
date: "2025-09-08"
description: "Battle-tested practices for running secure, cost-efficient, and scalable Kubernetes clusters in production"
tags: ["Kubernetes", "DevOps", "Best Practices", "Cloud Native"]
image: "./kubernetes-best-practices.webp"
---

After years of managing Kubernetes clusters across AWS and GCP, I've learned what separates hobbyist clusters from production-grade infrastructure. Here are the practices that actually matter in 2025.

## 1. Resource Management: Stop Wasting 90% of Your Budget

According to the [2025 Kubernetes Benchmark Report](https://www.cloudzero.com/blog/kubernetes-best-practices/), **average CPU utilization is just 10%**, while memory sits at 23%. You're literally burning money on unused resources.

### Set Requests Based on Reality, Not Guesses

**Bad (typical overprovisioning):**
```yaml
resources:
  requests:
    memory: "2Gi"    # "Just to be safe"
    cpu: "1000m"
  limits:
    memory: "4Gi"
    cpu: "2000m"
```

**Good (data-driven):**
```yaml
resources:
  requests:
    memory: "256Mi"   # Based on 95th percentile actual usage
    cpu: "100m"       # Observed average + headroom
  limits:
    memory: "256Mi"   # Same as request for guaranteed QoS
    cpu: unlimited    # Allow bursting (CPU is compressible)
```

### Why This Matters

**Memory requests = limits** gives you [Guaranteed QoS class](https://kubernetes.io/docs/tasks/configure-pod-container/quality-service-pod/), preventing OOMKills during node pressure.

**CPU limits = undefined** lets pods burst during load spikes. CPU is throttled, not killed, so there's no downside to bursting.

**How to find the right numbers:**
```bash
# Get 95th percentile usage from Prometheus
kubectl top pods -n production --sort-by=memory
# Or query Prometheus
avg_over_time(container_memory_working_set_bytes[7d])
```

### Use Vertical Pod Autoscaler (VPA)

VPA automatically right-sizes your pods based on actual usage:

```yaml
apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: my-app-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  updatePolicy:
    updateMode: "Auto"  # Automatically apply recommendations
  resourcePolicy:
    containerPolicies:
    - containerName: app
      minAllowed:
        cpu: 50m
        memory: 128Mi
      maxAllowed:
        cpu: 1000m
        memory: 1Gi
```

VPA will observe usage and adjust requests automatically, significantly reducing overprovisioning.

## 2. Health Probes: The Difference Between Downtime and Resilience

Kubernetes won't know your app is broken unless you tell it. **Liveness** and **readiness** probes are non-negotiable.

### Readiness: "Can I serve traffic?"

```yaml
readinessProbe:
  httpGet:
    path: /health/ready
    port: 8080
  initialDelaySeconds: 5   # Wait for app startup
  periodSeconds: 5          # Check frequently
  timeoutSeconds: 2
  successThreshold: 1
  failureThreshold: 3       # 3 failures = remove from service
```

**What readiness checks:**
- Database connection pool healthy?
- External API dependencies reachable?
- Cache warmed up?

If any fail, **remove pod from Service endpoints**. Don't kill it—just stop sending traffic.

### Liveness: "Should I restart this pod?"

```yaml
livenessProbe:
  httpGet:
    path: /health/alive
    port: 8080
  initialDelaySeconds: 30  # Give app time to start
  periodSeconds: 10         # Check less frequently
  timeoutSeconds: 5
  failureThreshold: 3       # Be conservative!
```

**What liveness checks:**
- Is the process responsive?
- Are critical goroutines/threads alive?
- Is there a deadlock?

If checks fail, **kill and restart** the pod. Be conservative—false positives cause cascading failures.

### Startup Probes for Slow Apps

If your app takes >30s to start (database migrations, cache warming), use a startup probe:

```yaml
startupProbe:
  httpGet:
    path: /health/started
    port: 8080
  initialDelaySeconds: 0
  periodSeconds: 5
  failureThreshold: 60      # 60 * 5s = 5 minutes to start
```

Startup probe runs first. Once it succeeds, liveness and readiness take over.

## 3. Security: Pod Security Standards (PSP is Dead)

**Pod Security Policies (PSP) were deprecated in 1.21 and removed in 1.25**. If you're still using them, you're on legacy tech.

The replacement: [Pod Security Standards (PSS)](https://kubernetes.io/docs/concepts/security/pod-security-standards/)

### Three Security Levels

1. **Privileged**: Unrestricted (use sparingly)
2. **Baseline**: Prevents known privilege escalations (minimum for production)
3. **Restricted**: Hardened, defense-in-depth (recommended)

### Apply at Namespace Level

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

**What `restricted` blocks:**
- Running as root
- Privileged containers
- Host network/PID/IPC access
- Unsafe sysctls
- Volume types (hostPath blocked)

### Example: Restricted-Compliant Pod

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 1000
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: app
    image: my-app:v1.0
    securityContext:
      allowPrivilegeEscalation: false
      capabilities:
        drop:
        - ALL
      readOnlyRootFilesystem: true
    volumeMounts:
    - name: tmp
      mountPath: /tmp
  volumes:
  - name: tmp
    emptyDir: {}
```

**Key points:**
- Non-root user (1000)
- Read-only root filesystem (write to `/tmp` only)
- Drop all capabilities
- No privilege escalation
- Seccomp profile enabled

### Network Policies: Zero Trust Networking

Default Kubernetes allows **all pods to talk to all pods**. Fix this with [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/):

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-policy
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
  - Ingress
  - Egress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
  egress:
  - to:
    - podSelector:
        matchLabels:
          app: database
    ports:
    - protocol: TCP
      port: 5432
  - to:  # Allow DNS
    - namespaceSelector:
        matchLabels:
          name: kube-system
    ports:
    - protocol: UDP
      port: 53
```

This policy says: **API pods can only receive traffic from frontend, and only send traffic to database (+ DNS)**.

**Pro tip:** Use [Cilium](https://cilium.io/) instead of kube-proxy for L7-aware network policies and eBPF-based performance.

## 4. Autoscaling: Horizontal, Vertical, and Event-Driven

Manual scaling is for 2015. In 2025, you have three autoscalers:

### Horizontal Pod Autoscaler (HPA)

Scale replicas based on CPU/memory/custom metrics:

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api
  minReplicas: 3
  maxReplicas: 50
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300  # Wait 5min before scaling down
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60  # Max 50% reduction per minute
    scaleUp:
      stabilizationWindowSeconds: 0    # Scale up immediately
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15  # Double capacity every 15s if needed
```

**Why `stabilizationWindowSeconds` matters:** Prevents flapping. Scaling up is aggressive (traffic spike!), scaling down is conservative (avoid thrashing).

### Vertical Pod Autoscaler (VPA)

Automatically adjust resource requests (covered earlier).

### Karpenter: Intelligent Node Autoscaling

[Karpenter](https://karpenter.sh/) is a flexible, high-performance node autoscaler that provisions right-sized nodes based on pending pods. Unlike Cluster Autoscaler, it provisions nodes in seconds and optimizes for cost and performance.

```yaml
apiVersion: karpenter.sh/v1beta1
kind: NodePool
metadata:
  name: default
spec:
  template:
    spec:
      requirements:
        - key: karpenter.sh/capacity-type
          operator: In
          values: ["spot", "on-demand"]
        - key: kubernetes.io/arch
          operator: In
          values: ["amd64"]
      nodeClassRef:
        name: default
  limits:
    cpu: 1000
  disruption:
    consolidationPolicy: WhenUnderutilized
    expireAfter: 720h
```

Karpenter automatically provisions optimally-sized nodes based on pod requirements, consolidates underutilized nodes, and can mix spot and on-demand instances for cost savings.

**Real-world benefits:** Karpenter provisions nodes in seconds when workloads spike, and aggressively consolidates underutilized nodes when idle, leading to significant cost savings compared to static node pools.

## 5. Cost Optimization: FinOps for Kubernetes

Cloud costs spiral out of control fast. Here's how to reign them in:

### Use Spot Instances Aggressively

According to [CloudZero's research](https://www.cloudzero.com/blog/kubernetes-best-practices/), **Spot instances save 59-77%** compared to on-demand.

**Strategy:**
- **Stateless workloads**: 100% Spot (web servers, API workers)
- **Stateful workloads**: On-Demand for databases, Spot for replicas
- **Cluster autoscaler**: Use mixed instance types

```yaml
# EKS Node Group with Spot
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: production
  region: us-east-1
managedNodeGroups:
- name: spot-workers
  instanceTypes:
  - m5.large
  - m5a.large
  - m5n.large
  spot: true
  minSize: 3
  maxSize: 100
  labels:
    workload: stateless
  taints:
  - key: spot
    value: "true"
    effect: NoSchedule
```

**Tolerate the taint** in your Deployments:

```yaml
tolerations:
- key: spot
  operator: Equal
  value: "true"
  effect: NoSchedule
```

### Cluster Autoscaler: Scale Nodes Automatically

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cluster-autoscaler-config
  namespace: kube-system
data:
  scale-down-delay-after-add: 10m
  scale-down-unneeded-time: 10m
  skip-nodes-with-local-storage: "false"
  balance-similar-node-groups: "true"
```

**Key settings:**
- `scale-down-delay-after-add: 10m` - Wait 10min after adding nodes before considering scale-down (avoid thrashing)
- `balance-similar-node-groups: true` - Distribute pods evenly across AZs

### Use ARM Instances (Graviton on AWS)

[ARM CPUs save 20-65%](https://www.cloudzero.com/blog/kubernetes-best-practices/) vs x86 with same performance.

**Multi-arch images:**
```dockerfile
# Build for both amd64 and arm64
docker buildx build --platform linux/amd64,linux/arm64 -t my-app:v1 .
```

**Node affinity:**
```yaml
affinity:
  nodeAffinity:
    requiredDuringSchedulingIgnoredDuringExecution:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/arch
          operator: In
          values:
          - arm64
          - amd64  # Works on both
```

## 6. GitOps: Infrastructure as Code, for Real

Manual `kubectl apply` is error-prone and unauditable. Use GitOps with [ArgoCD](https://argo-cd.readthedocs.io/) or [Flux](https://fluxcd.io/).

### ArgoCD Application

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: production-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/k8s-manifests
    targetRevision: main
    path: production/app
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true      # Delete resources removed from git
      selfHeal: true   # Revert manual changes
    syncOptions:
    - CreateNamespace=true
```

**What this gives you:**
- **Single source of truth**: Git is the only way to deploy
- **Audit trail**: Every change is a git commit
- **Rollback**: `git revert` instantly rolls back
- **Drift detection**: ArgoCD alerts if cluster state != git state

GitOps dramatically reduces deployment issues by providing full auditability, automatic rollback capabilities, and eliminating manual kubectl commands.

## 7. Observability: You Can't Fix What You Can't See

### The Three Pillars

1. **Metrics**: Prometheus + Grafana
2. **Logs**: Loki or ELK
3. **Traces**: Jaeger or Tempo

### Prometheus Scraping Config

```yaml
apiVersion: v1
kind: ServiceMonitor
metadata:
  name: api-metrics
spec:
  selector:
    matchLabels:
      app: api
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics
```

**Essential metrics to track:**
- Pod CPU/memory usage (avoid OOMKills)
- Request rate, error rate, duration (RED metrics)
- Saturation (queue depth, connection pool usage)

### Structured Logging

**Bad:**
```go
log.Println("User login failed for user:", userID)
```

**Good:**
```go
logger.Error("user login failed",
    "user_id", userID,
    "reason", "invalid_password",
    "ip", clientIP,
)
```

Structured logs are queryable:
```bash
# Find all failed logins for user 12345
kubectl logs -l app=api | grep 'user_id=12345' | grep 'login failed'
```

### Distributed Tracing

For microservices, tracing shows where latency lives:

```go
import "go.opentelemetry.io/otel"

func HandleRequest(ctx context.Context, req *Request) {
    ctx, span := otel.Tracer("api").Start(ctx, "HandleRequest")
    defer span.End()

    // Call database
    ctx, dbSpan := otel.Tracer("api").Start(ctx, "QueryDatabase")
    result := db.Query(ctx, "SELECT ...")
    dbSpan.End()

    // Call external API
    ctx, apiSpan := otel.Tracer("api").Start(ctx, "CallExternalAPI")
    resp := http.Get(ctx, "https://api.example.com")
    apiSpan.End()
}
```

Jaeger will show: "Request took 500ms: 450ms in external API, 30ms in DB, 20ms in app code."

## 8. Image Best Practices

### Use Distroless or Alpine

**Bad (1.2GB image):**
```dockerfile
FROM ubuntu:22.04
RUN apt-get update && apt-get install -y my-app
```

**Good (15MB image):**
```dockerfile
FROM gcr.io/distroless/static-debian11
COPY --from=builder /app/binary /app
ENTRYPOINT ["/app"]
```

**Why it matters:**
- **Faster pulls**: Dramatically smaller images mean faster pod startup times
- **Smaller attack surface**: Distroless has no shell, no package manager
- **Lower costs**: Less registry storage

### Multi-Stage Builds

```dockerfile
# Stage 1: Build
FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /app/server

# Stage 2: Runtime
FROM gcr.io/distroless/static-debian11
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]
```

Build stage: 800MB. Runtime stage: 15MB.

### Scan for Vulnerabilities

Use [Trivy](https://trivy.dev/) in CI:

```bash
# Scan image before pushing
trivy image --severity HIGH,CRITICAL my-app:v1

# Fail CI if critical CVEs found
trivy image --exit-code 1 --severity CRITICAL my-app:v1
```

## 9. Backup and Disaster Recovery

Kubernetes is not a backup solution. You need [Velero](https://velero.io/):

```bash
# Install Velero
velero install --provider aws --bucket k8s-backups --backup-location-config region=us-east-1

# Backup entire namespace
velero backup create production-backup --include-namespaces production

# Schedule daily backups
velero schedule create daily-backup --schedule="0 2 * * *" --include-namespaces production

# Restore from backup
velero restore create --from-backup production-backup
```

**What Velero backs up:**
- All Kubernetes resources (Deployments, Services, ConfigMaps, Secrets)
- Persistent volumes (with volume snapshots)

**Test your restore process monthly.** Backups you've never tested are useless.

## 10. Multi-Tenancy and Isolation

### Separate Clusters vs Namespaces

**Use separate clusters for:**
- Production vs staging/dev
- Different security zones (PCI, HIPAA)
- Different teams with conflicting requirements

**Use namespaces within a cluster for:**
- Different environments (staging-1, staging-2)
- Different apps in the same environment

### Resource Quotas

Prevent one team from hogging resources:

```yaml
apiVersion: v1
kind: ResourceQuota
metadata:
  name: team-a-quota
  namespace: team-a
spec:
  hard:
    requests.cpu: "100"
    requests.memory: 200Gi
    limits.cpu: "200"
    limits.memory: 400Gi
    pods: "50"
    services.loadbalancers: "3"
```

Team A can't exceed 100 CPU cores of requests, even if cluster has 1000 cores.

### Limit Ranges (Per-Pod Defaults)

```yaml
apiVersion: v1
kind: LimitRange
metadata:
  name: default-limits
  namespace: production
spec:
  limits:
  - max:
      cpu: "2"
      memory: 4Gi
    min:
      cpu: 100m
      memory: 128Mi
    default:
      cpu: 500m
      memory: 512Mi
    defaultRequest:
      cpu: 200m
      memory: 256Mi
    type: Container
```

If a pod doesn't specify resources, it gets these defaults. Prevents teams from deploying unbounded pods.

## Common Mistakes to Avoid

### 1. Running as Root

**Never do this:**
```yaml
securityContext:
  runAsUser: 0  # Root!
```

If your app requires root, **fix your app**. Use capabilities or file permissions instead.

### 2. Using `latest` Tag

**Never do this:**
```yaml
image: nginx:latest
```

`latest` is not reproducible. Use specific versions:
```yaml
image: nginx:1.25.3
```

### 3. No Resource Limits

**Never do this:**
```yaml
# No resources specified
containers:
- name: app
  image: my-app:v1
```

Result: Pod can consume entire node, killing other pods.

### 4. Exposing Insecure Services

**Never do this:**
```yaml
apiVersion: v1
kind: Service
metadata:
  name: api
spec:
  type: LoadBalancer  # Publicly exposed!
  ports:
  - port: 8080
```

Use an Ingress with TLS:
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: api-ingress
  annotations:
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - api.example.com
    secretName: api-tls
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: api
            port:
              number: 8080
```

## Conclusion: Start Simple, Iterate

Kubernetes is complex, but you don't need to implement everything on day one. Here's my recommended adoption path:

**Week 1:**
- Set resource requests/limits
- Add health probes
- Enable Pod Security Standards (baseline)

**Month 1:**
- Set up HPA
- Implement GitOps (ArgoCD)
- Configure Network Policies

**Month 3:**
- Add VPA
- Use Spot instances
- Implement comprehensive monitoring

**Month 6:**
- Karpenter for intelligent node autoscaling
- Velero for backups
- Multi-cluster setup

**Production-ready checklist:**
- ✅ Resource requests and limits on all pods
- ✅ Liveness and readiness probes
- ✅ Pod Security Standards enforced
- ✅ Network Policies for zero-trust
- ✅ Horizontal Pod Autoscaler configured
- ✅ Cluster Autoscaler enabled
- ✅ GitOps with ArgoCD/Flux
- ✅ Prometheus monitoring
- ✅ Velero backups tested
- ✅ Distroless images
- ✅ Image vulnerability scanning
- ✅ Separate clusters for prod/staging

---

**Key Takeaways:**

1. **Right-size resources** based on actual usage (VPA helps)
2. **Pod Security Standards** are mandatory (PSP is deprecated)
3. **Autoscale everything**: HPA for replicas, VPA for resources, Cluster Autoscaler for nodes
4. **Use Spot instances** for 60-70% cost savings
5. **GitOps** eliminates manual kubectl apply
6. **Observability** is non-negotiable (metrics, logs, traces)
7. **Distroless images** are 80x smaller than Ubuntu-based images
8. **Test your disaster recovery** monthly

Kubernetes is powerful but unforgiving. Follow these practices, and you'll have a production cluster that's secure, cost-efficient, and scales effortlessly.

**Further Reading:**
- [Official Kubernetes Best Practices](https://kubernetes.io/docs/setup/production-environment/)
- [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
- [Komodor's 2025 Best Practices](https://komodor.com/learn/14-kubernetes-best-practices-you-must-know-in-2025/)
- [CNCF Landscape](https://landscape.cncf.io/) - Find tools for every use case
