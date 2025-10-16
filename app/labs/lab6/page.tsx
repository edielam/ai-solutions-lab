import Link from "next/link";
import { CodeBlock } from "@/components/labs/code-block";

export default function Lab6Page() {
  return (
    <>
      {/* Lab Header */}
      <div className="mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4 sm:mb-6">
          <div className="text-center py-1 sm:py-0">
            <div className="text-sm sm:text-lg font-semibold text-blue-900">Advanced</div>
            <div className="text-xs sm:text-sm text-blue-700">Level</div>
          </div>
          <div className="text-center py-1 sm:py-0">
            <div className="text-sm sm:text-lg font-semibold text-blue-900">Kubernetes</div>
            <div className="text-xs sm:text-sm text-blue-700">Technology</div>
          </div>
        </div>

        <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
          Learn Kubernetes basics and deploy your Flask MLOps service to a local Kubernetes cluster for scaling and orchestration.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none prose-sm sm:prose-base">
        <h2 id="overview" className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-4 sm:mb-6 text-gray-900">Lab Overview</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What You'll Do:</strong> Install Kubernetes locally (minikube), deploy your containerized Flask service, and learn how to scale it up and down
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Lab Collaborators:</strong>
        </p>
        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Edward Lampoh - Software Developer & Collaborator</li>
          <li className="text-gray-700">Oluwafemi Adebayo, PhD - Academic Professor & Collaborator</li>
        </ul>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-red-800 mb-2">🚨 Prerequisites Required</h3>
          <p className="text-red-700">
            You must complete Labs 1-5 with a working containerized Flask service before starting Lab 6.
          </p>
        </div>

        <h2 id="prerequisites" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Prerequisites Check</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Before starting Lab 6, ensure you have:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">✅ Docker Desktop installed and running (from Lab 5)</li>
          <li className="text-gray-700">✅ Working Flask MLOps service container</li>
          <li className="text-gray-700">✅ Docker image built successfully: <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono">docker images | grep mlops-service</code></li>
          <li className="text-gray-700">✅ At least 4GB free RAM (minikube needs resources)</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">🔍 Quick Test</h4>
          <CodeBlock language="bash">{`# Check Docker is running
docker ps

# Check your image exists
docker images | grep mlops-service

# You should see mlops-service in the list`}</CodeBlock>
          <p className="text-blue-700 mt-2">All checked? → You're ready for Lab 6!</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">📝 Important Note</h4>
          <p className="text-yellow-700">
            This lab runs Kubernetes <strong>locally on your computer</strong> using minikube. You're NOT deploying to the cloud yet - that comes in Lab 7. This is a safe learning environment!
          </p>
        </div>

        <h2 id="part-a" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part A: Understanding Kubernetes</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Learn what Kubernetes is and why it's useful
        </p>

        <h3 id="what-is-kubernetes" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. What is Kubernetes?</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Kubernetes (K8s)</strong> is a platform that manages and orchestrates containers across multiple machines. Think of it as a manager for your Docker containers.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Simple Analogy:</h4>
          <p className="text-blue-700 mb-2">
            Imagine you're running a restaurant:
          </p>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• <strong>Docker</strong> = One chef making food</li>
            <li>• <strong>Kubernetes</strong> = A restaurant manager who:
              <ul className="ml-4 mt-1 space-y-1">
                <li>- Assigns chefs to different stations</li>
                <li>- Replaces chefs if they get sick</li>
                <li>- Adds more chefs during busy hours</li>
                <li>- Makes sure each table gets served</li>
              </ul>
            </li>
          </ul>
        </div>

        <h3 id="why-kubernetes" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Why Use Kubernetes? (You Already Have Docker!)</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Good question! Here's why:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <p className="font-semibold text-red-900 mb-2">Docker alone:</p>
            <ul className="text-red-700 space-y-1 text-sm">
              <li>✅ Runs one container at a time</li>
              <li>❌ Manual restart if container crashes</li>
              <li>❌ Can't easily run multiple copies</li>
              <li>❌ Manual scaling</li>
              <li>❌ No automatic load balancing</li>
            </ul>
          </div>
          <div className="border border-green-200 rounded-lg p-4 bg-green-50">
            <p className="font-semibold text-green-900 mb-2">Kubernetes:</p>
            <ul className="text-green-700 space-y-1 text-sm">
              <li>✅ Runs multiple containers automatically</li>
              <li>✅ Restarts crashed containers</li>
              <li>✅ Easily scale to 10, 100, 1000 containers</li>
              <li>✅ Automatic load balancing</li>
              <li>✅ Rolling updates (no downtime)</li>
            </ul>
          </div>
        </div>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Real Example:</strong> Your Flask service handles 10 requests/second fine. Suddenly, 1000 users connect. With Docker alone, you're stuck. With Kubernetes, it automatically starts more Flask containers to handle the load!
        </p>

        <h3 id="key-concepts" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Key Kubernetes Concepts</h3>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-blue-400 pl-4">
            <p className="font-semibold text-gray-900">Pod</p>
            <p className="text-gray-700">The smallest unit in Kubernetes. A wrapper around one or more containers. Think: "A pod is like a box containing your Docker container"</p>
          </div>

          <div className="border-l-4 border-green-400 pl-4">
            <p className="font-semibold text-gray-900">Deployment</p>
            <p className="text-gray-700">Describes how many pods you want running. Kubernetes keeps that many pods running automatically. Example: "I want 3 pods of my Flask service running at all times"</p>
          </div>

          <div className="border-l-4 border-purple-400 pl-4">
            <p className="font-semibold text-gray-900">Service</p>
            <p className="text-gray-700">A stable address to access your pods. Even if pods restart, the service address stays the same. Think: "Like a phone number that forwards to whoever's on-call"</p>
          </div>

          <div className="border-l-4 border-orange-400 pl-4">
            <p className="font-semibold text-gray-900">Node</p>
            <p className="text-gray-700">A physical or virtual machine running Kubernetes. In our case, minikube creates one virtual node on your laptop</p>
          </div>
        </div>

        <h2 id="part-b" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part B: Install Kubernetes (minikube)</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Get Kubernetes running on your computer
        </p>

        <h3 id="what-is-minikube" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. What is minikube?</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>minikube</strong> creates a local Kubernetes cluster on your computer. It's perfect for learning because:
        </p>

        <ul className="mb-6 ml-6 space-y-1">
          <li className="text-gray-700">• Runs entirely on your laptop (no cloud costs)</li>
          <li className="text-gray-700">• Easy to start and stop</li>
          <li className="text-gray-700">• Safe to experiment with</li>
          <li className="text-gray-700">• Same commands work in production Kubernetes</li>
        </ul>

        <h3 id="install-minikube" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Install minikube</h3>

        <p className="mb-2 text-gray-700"><strong>Mac:</strong></p>
        <CodeBlock language="bash">{`# Install with Homebrew
brew install minikube

# Verify installation
minikube version`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows:</strong></p>
        <CodeBlock language="powershell">{`# Download installer from: https://minikube.sigs.k8s.io/docs/start/
# Or use Chocolatey:
choco install minikube

# Verify installation
minikube version`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Linux:</strong></p>
        <CodeBlock language="bash">{`# Download and install
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
sudo install minikube-linux-amd64 /usr/local/bin/minikube

# Verify installation
minikube version`}</CodeBlock>

        <h3 id="install-kubectl" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Install kubectl (Kubernetes Command Tool)</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>kubectl</strong> is the command-line tool to control Kubernetes.
        </p>

        <p className="mb-2 text-gray-700"><strong>Mac:</strong></p>
        <CodeBlock language="bash">{`# Install with Homebrew
brew install kubectl

# Verify installation
kubectl version --client`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows:</strong></p>
        <CodeBlock language="powershell">{`# Download from: https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/
# Or use Chocolatey:
choco install kubernetes-cli

# Verify installation
kubectl version --client`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Linux:</strong></p>
        <CodeBlock language="bash">{`# Download and install
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Verify installation
kubectl version --client`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> Both <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">minikube version</code> and <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">kubectl version --client</code> should show version numbers.
          </p>
        </div>

        <h3 id="start-minikube" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Start minikube</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Start your local Kubernetes cluster:</strong>
        </p>

        <CodeBlock language="bash">{`# Start minikube with Docker driver
minikube start --driver=docker

# This will:
# - Download Kubernetes components (first time only)
# - Create a virtual machine
# - Start Kubernetes cluster
# - Configure kubectl to use it`}</CodeBlock>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            <strong>⏱️ First time takes 3-5 minutes!</strong> Be patient.
          </p>
        </div>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Verify it's running:</strong>
        </p>

        <CodeBlock language="bash">{`# Check minikube status
minikube status

# You should see:
# minikube: Running
# kubelet: Running
# apiserver: Running

# Check Kubernetes is working
kubectl get nodes

# You should see one node with STATUS: Ready`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> If you see one node with "Ready" status, your Kubernetes cluster is running!
          </p>
        </div>

        <h2 id="part-c" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part C: Create Kubernetes Configuration Files</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Define how your Flask service should run in Kubernetes
        </p>

        <h3 id="k8s-folder" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Verify Kubernetes Folder</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Your repository already includes Kubernetes configuration files in <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">mlops-service/k8s/</code> directory. Let's understand what they do:
        </p>

        <CodeBlock language="bash">{`# Navigate to mlops-service
cd mlops-service

# Check k8s folder exists
ls k8s/

# You should see: deployment.yaml  service.yaml`}</CodeBlock>

        <h3 id="deployment-config" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Understanding deployment.yaml</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          A <strong>Deployment</strong> tells Kubernetes how to run your Flask service.
        </p>

        <CodeBlock language="yaml">{`# Kubernetes Deployment for Flask MLOps Service
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
        # Tell Kubernetes to never pull from Docker Hub
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

        # Health check: Kubernetes checks if app is alive
        livenessProbe:
          httpGet:
            path: /health
            port: 5001
          initialDelaySeconds: 10
          periodSeconds: 10

        # Readiness check: Is app ready for traffic?
        readinessProbe:
          httpGet:
            path: /health
            port: 5001
          initialDelaySeconds: 5
          periodSeconds: 5`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 What each part means:</h4>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">replicas: 2</code> → Run 2 copies of your Flask service</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">image: mlops-service:latest</code> → Use your Docker image from Lab 5</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">imagePullPolicy: Never</code> → Don't download from internet, use local image</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">livenessProbe</code> → Kubernetes checks /health endpoint every 10 seconds</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">readinessProbe</code> → Checks if app is ready before sending traffic</li>
          </ul>
        </div>

        <h3 id="service-config" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Understanding service.yaml</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          A <strong>Service</strong> gives your pods a stable network address.
        </p>

        <CodeBlock language="yaml">{`# Kubernetes Service for Flask MLOps Service
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
    nodePort: 30001     # Port you'll access from laptop
    protocol: TCP
    name: http`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 What each part means:</h4>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">type: NodePort</code> → Makes service accessible from outside Kubernetes</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">selector</code> → Routes traffic to pods with this label</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">nodePort: 30001</code> → Access at localhost:30001 from your laptop</li>
          </ul>
        </div>

        <h2 id="part-d" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part D: Deploy to Kubernetes</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Get your Flask service running in Kubernetes
        </p>

        <h3 id="prepare-image" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Prepare Docker Image for minikube</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          minikube runs in its own environment, so we need to make your Docker image available to it.
        </p>

        <CodeBlock language="bash">{`# Tell Docker to use minikube's Docker environment
eval $(minikube docker-env)

# Now build your image (it will be inside minikube)
cd mlops-service
docker build -t mlops-service:latest .

# Verify image is available
docker images | grep mlops-service`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>💡 Important:</strong> Any time you rebuild your image, run these commands again!
          </p>
        </div>

        <h3 id="deploy-k8s" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Deploy to Kubernetes</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Apply your configuration files:</strong>
        </p>

        <CodeBlock language="bash">{`# Make sure you're in the mlops-service directory
cd mlops-service

# Deploy your Flask service
kubectl apply -f k8s/deployment.yaml

# You should see:
# deployment.apps/mlops-deployment created

# Create the service
kubectl apply -f k8s/service.yaml

# You should see:
# service/mlops-service created`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> Both commands should say "created"
          </p>
        </div>

        <h3 id="verify-deployment" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Verify Deployment</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Check if pods are running:</strong>
        </p>

        <CodeBlock language="bash">{`# See all pods
kubectl get pods

# You should see 2 pods (because replicas: 2)
# STATUS should be "Running"`}</CodeBlock>

        <p className="mb-4 text-gray-700">
          <strong>Example output:</strong>
        </p>

        <CodeBlock language="text">{`NAME                               READY   STATUS    RESTARTS   AGE
mlops-deployment-xxxxx-yyyyy       1/1     Running   0          30s
mlops-deployment-xxxxx-zzzzz       1/1     Running   0          30s`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Check the service:</strong>
        </p>

        <CodeBlock language="bash">{`# See all services
kubectl get services

# You should see mlops-service with PORT 30001`}</CodeBlock>

        <h3 id="access-service" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Access Your Service</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Get the service URL:</strong>
        </p>

        <CodeBlock language="bash">{`# minikube gives you the URL
minikube service mlops-service --url

# You'll see something like: http://192.168.49.2:30001`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Test the health endpoint:</strong>
        </p>

        <CodeBlock language="bash">{`# Using the URL from above
curl http://192.168.49.2:30001/health

# Or use localhost (usually works)
curl http://localhost:30001/health`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> If you see the healthy response, your Flask service is running in Kubernetes!
          </p>
        </div>

        <h2 id="part-e" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part E: Scaling Your Service</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Learn how to add or remove pods
        </p>

        <h3 id="understanding-scaling" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Understanding Scaling</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Right now you have 2 Flask pods running. Let's learn how to scale up (add more) or scale down (remove some).
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Why scale?</strong>
        </p>
        <ul className="mb-6 ml-6 space-y-1">
          <li className="text-gray-700">• More users → Add more pods to handle traffic</li>
          <li className="text-gray-700">• Fewer users → Remove pods to save resources</li>
          <li className="text-gray-700">• Testing → See how Kubernetes manages multiple pods</li>
        </ul>

        <h3 id="scale-up" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Scale Up (Add More Pods)</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Increase to 4 pods:</strong>
        </p>

        <CodeBlock language="bash">{`# Scale the deployment to 4 replicas
kubectl scale deployment mlops-deployment --replicas=4

# You should see:
# deployment.apps/mlops-deployment scaled

# Watch new pods being created
kubectl get pods -w

# Press Ctrl+C to stop watching`}</CodeBlock>

        <p className="mb-4 text-gray-700">
          <strong>What you'll see:</strong> Kubernetes immediately creates 2 new pods. Now you have 4 Flask services running!
        </p>

        <h3 id="scale-down" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Scale Down (Remove Pods)</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Decrease to 1 pod:</strong>
        </p>

        <CodeBlock language="bash">{`# Scale down to 1 replica
kubectl scale deployment mlops-deployment --replicas=1

# Watch pods being terminated
kubectl get pods -w`}</CodeBlock>

        <p className="mb-4 text-gray-700">
          <strong>What you'll see:</strong> Kubernetes terminates 3 pods. 1 pod remains running. Service continues working (no downtime!)
        </p>

        <h3 id="test-load-balancing" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Test Load Balancing</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Scale to 3 pods and test:</strong>
        </p>

        <CodeBlock language="bash">{`# Scale to 3 replicas
kubectl scale deployment mlops-deployment --replicas=3

# Wait for all pods to be ready
kubectl get pods

# Test the service multiple times
for i in {1..10}; do
  curl -s http://localhost:30001/health | grep timestamp
done`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>💡 Notice:</strong> Requests are distributed across different pods! Each pod might respond slightly differently (different timestamps show different pods responding).
          </p>
        </div>

        <h2 id="part-f" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part F: Essential kubectl Commands</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Commands you'll use regularly with Kubernetes
        </p>

        <h3 id="viewing-resources" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Viewing Resources</h3>

        <CodeBlock language="bash">{`# See all pods
kubectl get pods

# See all services
kubectl get services

# See all deployments
kubectl get deployments

# See everything at once
kubectl get all

# More detailed information
kubectl get pods -o wide`}</CodeBlock>

        <h3 id="viewing-logs" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Viewing Logs</h3>

        <CodeBlock language="bash">{`# Get logs from a pod (replace pod-name with actual name)
kubectl logs mlops-deployment-xxxxx-yyyyy

# Follow logs in real-time (like tail -f)
kubectl logs -f mlops-deployment-xxxxx-yyyyy

# Get logs from all pods with the same label
kubectl logs -l app=mlops-service

# Get last 50 lines
kubectl logs mlops-deployment-xxxxx-yyyyy --tail=50`}</CodeBlock>

        <h3 id="describing-resources" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Describing Resources</h3>

        <CodeBlock language="bash">{`# Get detailed information about a pod
kubectl describe pod mlops-deployment-xxxxx-yyyyy

# Get detailed information about the deployment
kubectl describe deployment mlops-deployment

# Get detailed information about the service
kubectl describe service mlops-service`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>💡 Use <code className="bg-white px-1 py-0.5 rounded font-mono">describe</code> when debugging</strong> - it shows events, errors, and configuration!
          </p>
        </div>

        <h3 id="managing-deployment" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Managing Deployment</h3>

        <CodeBlock language="bash">{`# After changing deployment.yaml
kubectl apply -f k8s/deployment.yaml

# Kubernetes will:
# - Update the deployment with new configuration
# - Gradually replace old pods with new ones (rolling update)
# - Keep service available during update

# Delete everything
kubectl delete -f k8s/`}</CodeBlock>

        <h2 id="troubleshooting" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Troubleshooting</h2>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Pods stuck in "ImagePullBackOff"</p>
            <p className="text-gray-700 mb-2"><strong>Problem:</strong> Kubernetes can't find your Docker image.</p>
            <CodeBlock language="bash">{`# Build image inside minikube
eval $(minikube docker-env)
cd mlops-service
docker build -t mlops-service:latest .

# Delete existing pods to force recreation
kubectl delete pods -l app=mlops-service`}</CodeBlock>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Pods stuck in "CrashLoopBackOff"</p>
            <p className="text-gray-700 mb-2"><strong>Problem:</strong> Your Flask app is crashing.</p>
            <CodeBlock language="bash">{`# Check pod logs to see the error
kubectl logs mlops-deployment-xxxxx-yyyyy

# Common causes:
# - Missing environment variables
# - Database connection issues
# - Python errors in app.py`}</CodeBlock>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Can't access service at localhost:30001</p>
            <p className="text-gray-700 mb-2"><strong>Solution:</strong></p>
            <CodeBlock language="bash">{`# Get the correct URL
minikube service mlops-service --url

# Try using that IP address instead of localhost
curl http://192.168.49.2:30001/health

# On Mac, you might need to use minikube tunnel
minikube tunnel
# Then try localhost:30001 again`}</CodeBlock>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Lab 6 Summary - What You Built</h2>

        <p className="mb-6 text-gray-700 leading-relaxed">
          Congratulations! You've successfully deployed your Flask service to Kubernetes. Here's what you accomplished:
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">✅ Kubernetes Skills Gained</h3>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Kubernetes Basics:</strong> Understanding pods, deployments, and services</li>
          <li className="text-gray-700"><strong>Local Cluster:</strong> Running Kubernetes on your laptop with minikube</li>
          <li className="text-gray-700"><strong>Deployment:</strong> Containerized Flask service running in K8s</li>
          <li className="text-gray-700"><strong>Scaling:</strong> Manually scale pods up and down</li>
          <li className="text-gray-700"><strong>kubectl Commands:</strong> Essential commands for managing Kubernetes</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🚀 What You Can Now Do</h3>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Multiple Instances:</strong> Run multiple copies of your Flask service</li>
          <li className="text-gray-700"><strong>Automatic Restarts:</strong> Kubernetes restarts crashed pods automatically</li>
          <li className="text-gray-700"><strong>Load Balancing:</strong> Traffic distributed across all pods</li>
          <li className="text-gray-700"><strong>Easy Scaling:</strong> Scale with one command</li>
          <li className="text-gray-700"><strong>Professional Skills:</strong> Using the same tools as Netflix, Google, Uber</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <strong>Industry Relevance:</strong> The Kubernetes skills you learned today are the same ones used by Netflix (thousands of services), Spotify (millions of requests per day), Uber (global scale), and Airbnb (dynamic scaling).
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">📝 Important Commands to Remember</h3>

        <CodeBlock language="bash">{`# Start/Stop minikube
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
kubectl describe pod <pod-name>`}</CodeBlock>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <div>
            <Link href="/labs/lab5" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Lab 5: Containerization
            </Link>
          </div>
          <div>
            <Link href="/labs" className="text-blue-600 hover:text-blue-700 font-medium">
              Back to Labs →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
