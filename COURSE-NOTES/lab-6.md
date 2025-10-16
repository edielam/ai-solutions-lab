# Lab 6: Orchestration & Scaling with Kubernetes

**Level:** Advanced
**Technology:** Kubernetes (minikube)

Learn Kubernetes basics and deploy your Flask MLOps service to a local Kubernetes cluster for scaling and orchestration.

## Lab Overview

**What You'll Do:** Install Kubernetes locally (minikube), deploy your containerized Flask service, and learn how to scale it up and down

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

## 🚨 Prerequisites Required

You must complete Labs 1-5 with a working containerized Flask service before starting Lab 6.

## Prerequisites Check

**Before starting Lab 6, ensure you have:**

- ✅ Docker Desktop installed and running (from Lab 5)
- ✅ Working Flask MLOps service container
- ✅ Docker image built successfully: `docker images | grep mlops-service`
- ✅ At least 4GB free RAM (minikube needs resources)

### 🔍 Quick Test

```bash
# Check Docker is running
docker ps

# Check your image exists
docker images | grep mlops-service

# You should see mlops-service in the list
```

**All checked?** → You're ready for Lab 6!

### 📝 Important Note

This lab runs Kubernetes **locally on your computer** using minikube. You're NOT deploying to the cloud yet - that comes in Lab 7. This is a safe learning environment!

---

## Part A: Understanding Kubernetes

*Learn what Kubernetes is and why it's useful*

### 1. What is Kubernetes?

**Kubernetes (K8s)** is a platform that manages and orchestrates containers across multiple machines. Think of it as a manager for your Docker containers.

**💡 Simple Analogy:**

Imagine you're running a restaurant:
- **Docker** = One chef making food
- **Kubernetes** = A restaurant manager who:
  - Assigns chefs to different stations
  - Replaces chefs if they get sick
  - Adds more chefs during busy hours
  - Makes sure each table gets served

### 2. Why Use Kubernetes? (You Already Have Docker!)

Good question! Here's why:

**Docker alone:**
- ✅ Runs one container at a time
- ❌ If container crashes, you must manually restart it
- ❌ Can't easily run multiple copies of your app
- ❌ Manual scaling (add more containers yourself)
- ❌ No automatic load balancing

**Kubernetes:**
- ✅ Runs multiple containers automatically
- ✅ Restarts crashed containers automatically
- ✅ Easily scale to 10, 100, or 1000 containers
- ✅ Automatic load balancing across containers
- ✅ Rolling updates (update without downtime)

**Real Example:** Your Flask service handles 10 requests/second fine. Suddenly, 1000 users connect. With Docker alone, you're stuck. With Kubernetes, it automatically starts more Flask containers to handle the load!

### 3. Key Kubernetes Concepts

**Pod**
- The smallest unit in Kubernetes
- A wrapper around one or more containers
- Think: "A pod is like a box containing your Docker container"

**Deployment**
- Describes how many pods you want running
- Kubernetes keeps that many pods running automatically
- If one crashes, Kubernetes starts a new one
- Example: "I want 3 pods of my Flask service running at all times"

**Service**
- A stable address to access your pods
- Even if pods restart (and get new IP addresses), the service address stays the same
- Think: "Like a phone number that forwards to whoever's on-call"

**Node**
- A physical or virtual machine running Kubernetes
- In our case, minikube creates one virtual node on your laptop

### 4. Kubernetes Architecture (Simplified)

```
┌─────────────────────────────────────┐
│        Kubernetes Cluster            │
│  ┌────────────────────────────────┐ │
│  │           Master                │ │
│  │  (Controls everything)          │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │           Node                  │ │
│  │  ┌──────┐  ┌──────┐  ┌──────┐ │ │
│  │  │ Pod  │  │ Pod  │  │ Pod  │ │ │
│  │  │Flask │  │Flask │  │Flask │ │ │
│  │  └──────┘  └──────┘  └──────┘ │ │
│  └────────────────────────────────┘ │
└─────────────────────────────────────┘
```

**For this lab:**
- Master + Node = All running on your laptop via minikube
- Pods = Copies of your Flask MLOps service
- Service = How Next.js will access your Flask pods

---

## Part B: Install Kubernetes (minikube)

*Get Kubernetes running on your computer*

### 1. What is minikube?

**minikube** creates a local Kubernetes cluster on your computer. It's perfect for learning because:
- Runs entirely on your laptop (no cloud costs)
- Easy to start and stop
- Safe to experiment with
- Same commands work in production Kubernetes

### 2. Install minikube

**Mac:**
```bash
# Install with Homebrew
brew install minikube

# Verify installation
minikube version
```

**Windows:**
```powershell
# Download installer from: https://minikube.sigs.k8s.io/docs/start/
# Or use Chocolatey:
choco install minikube

# Verify installation
minikube version
```

**Linux:**
```bash
# Download and install
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Verify installation
minikube version
```

### 3. Install kubectl (Kubernetes Command Tool)

**kubectl** is the command-line tool to control Kubernetes.

**Mac:**
```bash
# Install with Homebrew
brew install kubectl

# Verify installation
kubectl version --client
```

**Windows:**
```powershell
# Download from: https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/
# Or use Chocolatey:
choco install kubernetes-cli

# Verify installation
kubectl version --client
```

**Linux:**
```bash
# Download and install
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Verify installation
kubectl version --client
```

**✅ Success Check:** Both `minikube version` and `kubectl version --client` should show version numbers.

### 4. Start minikube

**Start your local Kubernetes cluster:**

```bash
# Start minikube with Docker driver
minikube start --driver=docker

# This will:
# - Download Kubernetes components (first time only)
# - Create a virtual machine
# - Start Kubernetes cluster
# - Configure kubectl to use it
```

**⏱️ First time takes 3-5 minutes!** Be patient.

**Verify it's running:**

```bash
# Check minikube status
minikube status

# You should see:
# minikube: Running
# kubelet: Running
# apiserver: Running

# Check Kubernetes is working
kubectl get nodes

# You should see one node with STATUS: Ready
```

**✅ Success Check:** If you see one node with "Ready" status, your Kubernetes cluster is running!

### 5. Understanding Your Setup

Now you have:
- ✅ Docker Desktop (running containers)
- ✅ minikube (running Kubernetes)
- ✅ kubectl (tool to control Kubernetes)

**Architecture:**
```
Your Laptop
  ├── Docker Desktop (running)
  └── minikube (creates Kubernetes cluster using Docker)
        └── kubectl (sends commands to cluster)
```

---

## Part C: Create Kubernetes Configuration Files

*Define how your Flask service should run in Kubernetes*

### 1. Create Kubernetes Folder

```bash
# Navigate to mlops-service
cd mlops-service

# Create folder for Kubernetes files
mkdir -p k8s
```

### 2. Create Deployment Configuration

A **Deployment** tells Kubernetes how to run your Flask service.

**Create `mlops-service/k8s/deployment.yaml`:**

```yaml
# Kubernetes Deployment for Flask MLOps Service
# This file tells Kubernetes how to run your Flask application

apiVersion: apps/v1
kind: Deployment
metadata:
  name: mlops-deployment
  labels:
    app: mlops-service

spec:
  # How many copies (pods) of your Flask service to run
  replicas: 2

  # How to find the pods this deployment manages
  selector:
    matchLabels:
      app: mlops-service

  # Template for creating pods
  template:
    metadata:
      labels:
        app: mlops-service

    spec:
      containers:
      - name: mlops-container
        # Use the Docker image you built in Lab 5
        image: mlops-service:latest
        # Tell Kubernetes to never pull from Docker Hub (use local image)
        imagePullPolicy: Never

        ports:
        - containerPort: 5001
          name: http

        # Environment variables your Flask app needs
        env:
        - name: FLASK_ENV
          value: "development"
        - name: SERVICE_PORT
          value: "5001"

        # Health check: Kubernetes will check if your app is alive
        livenessProbe:
          httpGet:
            path: /health
            port: 5001
          initialDelaySeconds: 10
          periodSeconds: 10

        # Readiness check: Is your app ready to receive traffic?
        readinessProbe:
          httpGet:
            path: /health
            port: 5001
          initialDelaySeconds: 5
          periodSeconds: 5
```

**💡 What each part means:**

- `replicas: 2` → Run 2 copies of your Flask service
- `image: mlops-service:latest` → Use your Docker image from Lab 5
- `imagePullPolicy: Never` → Don't download from internet, use local image
- `containerPort: 5001` → Flask runs on port 5001 inside container
- `livenessProbe` → Kubernetes checks `/health` endpoint every 10 seconds
- `readinessProbe` → Checks if app is ready before sending traffic

### 3. Create Service Configuration

A **Service** gives your pods a stable network address.

**Create `mlops-service/k8s/service.yaml`:**

```yaml
# Kubernetes Service for Flask MLOps Service
# This creates a stable address to access your Flask pods

apiVersion: v1
kind: Service
metadata:
  name: mlops-service
  labels:
    app: mlops-service

spec:
  # NodePort: Accessible from your laptop
  type: NodePort

  # Which pods should this service route traffic to?
  selector:
    app: mlops-service

  ports:
  - port: 5001          # Port on the service
    targetPort: 5001    # Port on the pod
    nodePort: 30001     # Port you'll access from your laptop (30000-32767 range)
    protocol: TCP
    name: http
```

**💡 What each part means:**

- `type: NodePort` → Makes service accessible from outside Kubernetes
- `selector: app: mlops-service` → Routes traffic to pods with this label
- `port: 5001` → Service listens on port 5001
- `targetPort: 5001` → Forwards to pod's port 5001
- `nodePort: 30001` → Access service at `http://localhost:30001` from your laptop

### 4. Understanding the Configuration

**How it works together:**

```
Your Laptop (localhost:30001)
    ↓
Service (routes traffic)
    ↓
Deployment (manages pods)
    ↓
Pod 1 (Flask)    Pod 2 (Flask)
```

**When you visit `http://localhost:30001`:**
1. Request goes to Kubernetes Service
2. Service picks one of the 2 Flask pods
3. Request goes to that pod
4. Flask responds
5. Response comes back to you

---

## Part D: Deploy to Kubernetes

*Get your Flask service running in Kubernetes*

### 1. Prepare Docker Image for minikube

minikube runs in its own environment, so we need to make your Docker image available to it.

**Option 1: Build image inside minikube (Recommended)**

```bash
# Tell Docker to use minikube's Docker environment
eval $(minikube docker-env)

# Now build your image (it will be inside minikube)
cd mlops-service
docker build -t mlops-service:latest .

# Verify image is available
docker images | grep mlops-service
```

**Option 2: Load existing image into minikube**

```bash
# If you already built the image before
minikube image load mlops-service:latest
```

**💡 Important:** Any time you rebuild your image, run these commands again!

### 2. Deploy to Kubernetes

**Apply your configuration files:**

```bash
# Make sure you're in the mlops-service directory
cd mlops-service

# Deploy your Flask service
kubectl apply -f k8s/deployment.yaml

# You should see:
# deployment.apps/mlops-deployment created

# Create the service
kubectl apply -f k8s/service.yaml

# You should see:
# service/mlops-service created
```

**✅ Success Check:** Both commands should say "created"

### 3. Verify Deployment

**Check if pods are running:**

```bash
# See all pods
kubectl get pods

# You should see 2 pods (because replicas: 2)
# STATUS should be "Running"
```

**Example output:**
```
NAME                               READY   STATUS    RESTARTS   AGE
mlops-deployment-xxxxx-yyyyy       1/1     Running   0          30s
mlops-deployment-xxxxx-zzzzz       1/1     Running   0          30s
```

**Check the service:**

```bash
# See all services
kubectl get services

# You should see mlops-service with PORT 30001
```

**Example output:**
```
NAME            TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
mlops-service   NodePort   10.96.100.200   <none>        5001:30001/TCP   1m
```

### 4. Access Your Service

**Get the service URL:**

```bash
# minikube gives you the URL
minikube service mlops-service --url

# You'll see something like: http://192.168.49.2:30001
```

**Test the health endpoint:**

```bash
# Using the URL from above
curl http://192.168.49.2:30001/health

# Or use localhost (usually works)
curl http://localhost:30001/health
```

**You should see:**
```json
{
  "status": "healthy",
  "service": "mlops-service",
  "timestamp": "2024-01-15T10:30:00.000000",
  "monitoring": "prometheus"
}
```

**✅ Success Check:** If you see the healthy response, your Flask service is running in Kubernetes!

### 5. Test Prometheus Metrics

```bash
# Check metrics endpoint
curl http://localhost:30001/metrics

# You should see Prometheus metrics output
```

### 6. Test with Next.js (Optional)

**To connect your Next.js app to Kubernetes Flask service:**

1. Get the service URL:
   ```bash
   minikube service mlops-service --url
   ```

2. Update your `.env` file (in project root):
   ```env
   MLOPS_SERVICE_URL=http://localhost:30001
   ```

3. Start Next.js:
   ```bash
   npm run dev
   ```

4. Test the AI chat at http://localhost:3000

5. Check metrics are being tracked:
   ```bash
   curl http://localhost:30001/metrics
   ```

---

## Part E: Scaling Your Service

*Learn how to add or remove pods*

### 1. Understanding Scaling

Right now you have 2 Flask pods running. Let's learn how to scale up (add more) or scale down (remove some).

**Why scale?**
- More users → Add more pods to handle traffic
- Fewer users → Remove pods to save resources
- Testing → See how Kubernetes manages multiple pods

### 2. Check Current Scale

```bash
# See how many pods are running
kubectl get pods

# Should show 2 pods (from replicas: 2)
```

### 3. Scale Up (Add More Pods)

**Increase to 4 pods:**

```bash
# Scale the deployment to 4 replicas
kubectl scale deployment mlops-deployment --replicas=4

# You should see:
# deployment.apps/mlops-deployment scaled

# Watch new pods being created
kubectl get pods -w

# Press Ctrl+C to stop watching
```

**What you'll see:**
- Kubernetes immediately creates 2 new pods
- New pods go through: ContainerCreating → Running
- Now you have 4 Flask services running!

### 4. Scale Down (Remove Pods)

**Decrease to 1 pod:**

```bash
# Scale down to 1 replica
kubectl scale deployment mlops-deployment --replicas=1

# Watch pods being terminated
kubectl get pods -w
```

**What you'll see:**
- Kubernetes terminates 3 pods
- 1 pod remains running
- Service continues working (no downtime!)

### 5. Test Load Balancing

**Scale to 3 pods and test:**

```bash
# Scale to 3 replicas
kubectl scale deployment mlops-deployment --replicas=3

# Wait for all pods to be ready
kubectl get pods

# Test the service multiple times
for i in {1..10}; do
  curl -s http://localhost:30001/health | grep timestamp
done
```

**💡 Notice:** Requests are distributed across different pods! Each pod might respond slightly differently (different timestamps show different pods responding).

### 6. Return to Normal

```bash
# Scale back to 2 replicas (our normal)
kubectl scale deployment mlops-deployment --replicas=2
```

### 7. What Just Happened?

You just demonstrated Kubernetes orchestration:
- ✅ Easily scaled from 1 to 4 pods with one command
- ✅ Kubernetes managed starting/stopping pods automatically
- ✅ Service stayed available the whole time (no downtime)
- ✅ Load balanced traffic across all pods

**In production:** This same command could scale to 100 pods across multiple servers!

---

## Part F: Essential kubectl Commands

*Commands you'll use regularly with Kubernetes*

### 1. Viewing Resources

```bash
# See all pods
kubectl get pods

# See all services
kubectl get services

# See all deployments
kubectl get deployments

# See everything at once
kubectl get all

# More detailed information
kubectl get pods -o wide
```

### 2. Viewing Logs

```bash
# Get logs from a pod (replace pod-name with actual name)
kubectl logs mlops-deployment-xxxxx-yyyyy

# Follow logs in real-time (like tail -f)
kubectl logs -f mlops-deployment-xxxxx-yyyyy

# Get logs from all pods with the same label
kubectl logs -l app=mlops-service

# Get last 50 lines
kubectl logs mlops-deployment-xxxxx-yyyyy --tail=50
```

### 3. Describing Resources

```bash
# Get detailed information about a pod
kubectl describe pod mlops-deployment-xxxxx-yyyyy

# Get detailed information about the deployment
kubectl describe deployment mlops-deployment

# Get detailed information about the service
kubectl describe service mlops-service
```

**💡 Use `describe` when debugging - it shows events, errors, and configuration!**

### 4. Executing Commands in Pods

```bash
# Open a shell inside a pod (replace pod-name)
kubectl exec -it mlops-deployment-xxxxx-yyyyy -- /bin/bash

# Once inside, you can:
# - Check files: ls -la
# - Test Python: python --version
# - Check environment: env
# - Exit: exit

# Run a single command without opening shell
kubectl exec mlops-deployment-xxxxx-yyyyy -- env
kubectl exec mlops-deployment-xxxxx-yyyyy -- ls -la
```

### 5. Deleting Resources

```bash
# Delete a specific pod (Kubernetes will restart it automatically)
kubectl delete pod mlops-deployment-xxxxx-yyyyy

# Delete the deployment (stops all pods)
kubectl delete deployment mlops-deployment

# Delete the service
kubectl delete service mlops-service

# Delete everything from your configuration files
kubectl delete -f k8s/
```

### 6. Updating Deployment

```bash
# After changing deployment.yaml
kubectl apply -f k8s/deployment.yaml

# Kubernetes will:
# - Update the deployment with new configuration
# - Gradually replace old pods with new ones (rolling update)
# - Keep service available during update
```

### 7. Monitoring Resource Usage

```bash
# See resource usage (CPU, memory)
kubectl top pods

# If this doesn't work, it's okay - requires metrics server (advanced)
```

### 8. Quick Reference Card

**Daily Commands:**
```bash
# Status check
kubectl get pods
kubectl get services

# View logs
kubectl logs -f <pod-name>

# Scale
kubectl scale deployment mlops-deployment --replicas=3

# Apply changes
kubectl apply -f k8s/

# Describe (debugging)
kubectl describe pod <pod-name>
```

---

## Troubleshooting

### Issue: Pods stuck in "ImagePullBackOff" or "ErrImagePull"

**Problem:** Kubernetes can't find your Docker image.

**Solution:**
```bash
# Build image inside minikube
eval $(minikube docker-env)
cd mlops-service
docker build -t mlops-service:latest .

# Delete existing pods to force recreation
kubectl delete pods -l app=mlops-service

# Verify imagePullPolicy is "Never" in deployment.yaml
```

### Issue: Pods stuck in "CrashLoopBackOff"

**Problem:** Your Flask app is crashing.

**Solution:**
```bash
# Check pod logs to see the error
kubectl logs mlops-deployment-xxxxx-yyyyy

# Common causes:
# - Missing environment variables
# - Database connection issues
# - Python errors in app.py

# Check environment variables
kubectl describe pod mlops-deployment-xxxxx-yyyyy | grep -A 10 Environment
```

### Issue: Can't access service at localhost:30001

**Problem:** NodePort not accessible.

**Solution:**
```bash
# Get the correct URL
minikube service mlops-service --url

# Try using that IP address instead of localhost
curl http://192.168.49.2:30001/health

# On Mac, you might need to use minikube tunnel in another terminal
minikube tunnel
# Then try localhost:30001 again
```

### Issue: "No resources found" when running kubectl get pods

**Problem:** Nothing deployed yet.

**Solution:**
```bash
# Apply your configuration files
cd mlops-service
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# Wait a moment, then check
kubectl get pods
```

### Issue: Pods show "0/1 Ready"

**Problem:** Health checks failing.

**Solution:**
```bash
# Check pod logs for errors
kubectl logs <pod-name>

# Check if /health endpoint works
kubectl describe pod <pod-name>

# Common cause: Flask not starting on 0.0.0.0
# Make sure app.py has: app.run(host='0.0.0.0', port=5001)
```

### Issue: Changes to code not reflected

**Problem:** Need to rebuild image and restart pods.

**Solution:**
```bash
# 1. Rebuild image in minikube
eval $(minikube docker-env)
docker build -t mlops-service:latest .

# 2. Delete existing pods (they'll be recreated with new image)
kubectl delete pods -l app=mlops-service

# 3. Wait for new pods
kubectl get pods -w
```

### Issue: minikube won't start

**Problem:** Various startup issues.

**Solution:**
```bash
# Delete and restart
minikube delete
minikube start --driver=docker

# Check Docker Desktop is running first

# If still issues, check system resources:
# - At least 4GB RAM available
# - At least 10GB disk space
```

### Issue: kubectl commands very slow

**Problem:** minikube performance issues.

**Solution:**
```bash
# Restart minikube with more resources
minikube stop
minikube start --driver=docker --cpus=2 --memory=4096

# Or reset completely
minikube delete
minikube start --driver=docker
```

---

## Lab 6 Summary - What You Built

Congratulations! You've successfully deployed your Flask service to Kubernetes. Here's what you accomplished:

### ✅ Kubernetes Skills Gained

- **Kubernetes Basics:** Understanding pods, deployments, and services
- **Local Cluster:** Running Kubernetes on your laptop with minikube
- **Deployment:** Containerized Flask service running in K8s
- **Scaling:** Manually scale pods up and down
- **kubectl Commands:** Essential commands for managing Kubernetes

### 🚀 What You Can Now Do

- **Multiple Instances:** Run multiple copies of your Flask service
- **Automatic Restarts:** Kubernetes restarts crashed pods automatically
- **Load Balancing:** Traffic distributed across all pods
- **Easy Scaling:** Scale with one command
- **Professional Skills:** Using the same tools as Netflix, Google, Uber

### 🎯 Real-World Impact

You've learned container orchestration - the foundation of modern cloud infrastructure:

- **Development:** Test your app with multiple instances locally
- **Production Ready:** Same concepts apply to cloud Kubernetes (AWS EKS, Google GKE, Azure AKS)
- **Industry Standard:** Kubernetes is the #1 container orchestration platform
- **Career Skills:** Kubernetes experience is highly valued by employers

### 📊 What's Running Now

```
Your Laptop
  └── minikube (Kubernetes cluster)
      └── mlops-deployment
          ├── Pod 1 (Flask MLOps Service)
          └── Pod 2 (Flask MLOps Service)
      └── mlops-service (Load Balancer)
          └── localhost:30001
```

### 🔑 Key Takeaways

- **Orchestration:** Kubernetes manages containers automatically
- **Scaling:** Easy to run 1, 10, or 100 instances
- **Reliability:** Automatic restarts and health checks
- **Load Balancing:** Traffic distributed across pods
- **Same Everywhere:** Local minikube → Production cloud

### 📝 Important Commands to Remember

```bash
# Start/Stop minikube
minikube start
minikube stop

# Deploy changes
kubectl apply -f k8s/

# Check status
kubectl get pods
kubectl get services

# Scale
kubectl scale deployment mlops-deployment --replicas=3

# View logs
kubectl logs -f <pod-name>

# Debug
kubectl describe pod <pod-name>
```

### 🎓 Next Steps: Lab 7

In Lab 7, you'll deploy your application to the cloud (AWS, Google Cloud, or Azure). You'll use the same Kubernetes concepts but on real cloud infrastructure!

**Industry Relevance:** The Kubernetes skills you learned today are the same ones used by:
- Netflix (thousands of services)
- Spotify (millions of requests per day)
- Uber (global scale)
- Airbnb (dynamic scaling)

---

**Navigation:**
- [← Lab 5: Containerization](/labs/lab5)
- [Back to Labs →](/labs)
