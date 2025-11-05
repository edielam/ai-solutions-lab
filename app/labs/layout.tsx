'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LabNavigation } from '@/components/labs/lab-navigation'

// Define all lab configurations
const labConfigs = {
  'lab1': {
    title: 'Lab 1: Environment Setup & Project Introduction',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'part-a', title: 'Part A: Create Accounts' },
      { id: 'github-setup', title: '1. GitHub Setup' },
      { id: 'gemini-api', title: '2. Google Gemini API' },
      { id: 'aws-account', title: '3. AWS Account' },
      { id: 'neon-database', title: '4. Neon Database' },
      { id: 'resend-email', title: '5. Resend Email' },
      { id: 'part-b', title: 'Part B: Install Tools' },
      { id: 'nodejs', title: '1. Node.js Installation' },
      { id: 'python', title: '2. Python Installation' },
      { id: 'git', title: '3. Git Installation' },
      { id: 'vscode', title: '4. VS Code' },
      { id: 'part-c', title: 'Part C: Project Setup' },
      { id: 'fork-repo', title: '1. Fork Repository' },
      { id: 'clone-fork', title: '2. Clone Your Fork' },
      { id: 'install-deps', title: '3. Install Dependencies' },
      { id: 'env-config', title: '4. Environment Config' },
      { id: 'run-app', title: '5. Run Application' },
      { id: 'test-flow', title: '6. Test Complete Flow' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  },
  'lab2': {
    title: 'Lab 2: AI Lifecycle & MLOps Integration',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'prerequisites', title: 'Prerequisites' },
      { id: 'database-setup', title: 'Database Setup' },
      { id: 'part-a', title: 'Part A: Flask MLOps Service' },
      { id: 'project-structure', title: '1. Project Structure' },
      { id: 'python-deps', title: '2. Python Dependencies' },
      { id: 'env-vars', title: '3. Environment Variables' },
      { id: 'flask-app', title: '4. Flask Application' },
      { id: 'startup-script', title: '5. Startup Script' },
      { id: 'test-flask', title: '6. Test Flask Service' },
      { id: 'part-b', title: 'Part B: Prometheus Integration' },
      { id: 'prometheus-setup', title: '1. Prometheus Setup' },
      { id: 'metrics-endpoint', title: '2. Metrics Endpoint' },
      { id: 'prometheus-logging', title: '3. Prometheus Logging' },
      { id: 'update-tracking', title: '4. Update Tracking' },
      { id: 'test-prometheus', title: '5. Test Prometheus' },
      { id: 'part-c', title: 'Part C: Next.js Integration' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  },
  'lab3': {
    title: 'Lab 3: Testing AI Systems',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'prerequisites', title: 'Prerequisites Check' },
      { id: 'part-a', title: 'Part A: Install Testing Tools' },
      { id: 'pytest-setup', title: '1. Install Pytest' },
      { id: 'part-b', title: 'Part B: Understanding Tests' },
      { id: 'test-structure', title: '1. Test File Overview' },
      { id: 'test-categories', title: '2. Test Categories' },
      { id: 'part-c', title: 'Part C: Running Tests' },
      { id: 'basic-test-run', title: '1. Basic Test Execution' },
      { id: 'test-output', title: '2. Understanding Output' },
      { id: 'test-scenarios', title: '3. Test Scenarios' },
      { id: 'part-d', title: 'Part D: Test-Driven Development' },
      { id: 'add-test', title: '1. Add Your Own Test' },
      { id: 'optional-configs', title: '2. Optional Configuration' },
      { id: 'part-e', title: 'Part E: Integration Testing' },
      { id: 'end-to-end', title: '1. End-to-End Test' },
      { id: 'ai-integration', title: '2. AI Integration Test' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  },
  'lab4': {
    title: 'Lab 4: Deployment Pipelines (CI/CD)',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'prerequisites', title: 'Prerequisites Check' },
      { id: 'part-a', title: 'Part A: GitHub Repository Setup' },
      { id: 'repo-setup', title: '1. Repository Configuration' },
      { id: 'secrets-setup', title: '2. Environment Secrets' },
      { id: 'part-b', title: 'Part B: Next.js CI/CD Pipeline' },
      { id: 'nextjs-workflow', title: '1. GitHub Actions Workflow' },
      { id: 'trigger-workflow', title: '2. Trigger Your First Workflow' },
      { id: 'part-c', title: 'Part C: MLOps Service CI/CD' },
      { id: 'mlops-workflow', title: '1. MLOps Workflow Overview' },
      { id: 'test-mlops-pipeline', title: '2. Test MLOps Pipeline' },
      { id: 'part-d', title: 'Part D: Environment Management' },
      { id: 'env-strategy', title: '1. Environment Strategy' },
      { id: 'env-files', title: '2. Environment File Template' },
      { id: 'part-e', title: 'Part E: Advanced Pipeline Features' },
      { id: 'branch-protection', title: '1. Branch Protection Rules' },
      { id: 'deployment-environments', title: '2. Deployment Environments' },
      { id: 'monitoring-deployments', title: '3. Monitoring Deployments' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  },
  'lab5': {
    title: 'Lab 5: Containerization with Docker',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'prerequisites', title: 'Prerequisites Check' },
      { id: 'part-a', title: 'Part A: Understanding Docker' },
      { id: 'what-is-docker', title: '1. What is Docker?' },
      { id: 'why-docker', title: '2. Why Use Docker?' },
      { id: 'key-concepts', title: '3. Key Docker Concepts' },
      { id: 'part-b', title: 'Part B: Install Docker' },
      { id: 'install-docker', title: '1. Install Docker Desktop' },
      { id: 'verify-install', title: '2. Verify Installation' },
      { id: 'part-c', title: 'Part C: Containerize Flask Service' },
      { id: 'create-dockerfile', title: '1. Create Dockerfile' },
      { id: 'dockerignore', title: '2. Create .dockerignore' },
      { id: 'build-image', title: '3. Build Docker Image' },
      { id: 'run-container', title: '4. Run Docker Container' },
      { id: 'test-container', title: '5. Test Containerized Service' },
      { id: 'test-with-nextjs', title: '6. Test with Next.js' },
      { id: 'part-d', title: 'Part D: Container Management' },
      { id: 'basic-commands', title: '1. Essential Docker Commands' },
      { id: 'debugging', title: '2. Debugging Containers' },
      { id: 'part-e', title: 'Part E: Docker Compose (Optional)' },
      { id: 'what-is-compose', title: '1. What is Docker Compose?' },
      { id: 'create-compose', title: '2. Create docker-compose.yml' },
      { id: 'env-file', title: '3. Create .env File' },
      { id: 'use-compose', title: '4. Use Docker Compose' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  },
  'lab6': {
    title: 'Lab 6: Orchestration & Scaling with Kubernetes',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'prerequisites', title: 'Prerequisites Check' },
      { id: 'part-a', title: 'Part A: Understanding Kubernetes' },
      { id: 'what-is-kubernetes', title: '1. What is Kubernetes?' },
      { id: 'why-kubernetes', title: '2. Why Use Kubernetes?' },
      { id: 'key-concepts', title: '3. Key Kubernetes Concepts' },
      { id: 'part-b', title: 'Part B: Install Kubernetes' },
      { id: 'what-is-minikube', title: '1. What is minikube?' },
      { id: 'install-minikube', title: '2. Install minikube' },
      { id: 'install-kubectl', title: '3. Install kubectl' },
      { id: 'start-minikube', title: '4. Start minikube' },
      { id: 'part-c', title: 'Part C: Kubernetes Config Files' },
      { id: 'k8s-folder', title: '1. Verify Kubernetes Folder' },
      { id: 'deployment-config', title: '2. Understanding deployment.yaml' },
      { id: 'service-config', title: '3. Understanding service.yaml' },
      { id: 'part-d', title: 'Part D: Deploy to Kubernetes' },
      { id: 'prepare-image', title: '1. Prepare Docker Image' },
      { id: 'deploy-k8s', title: '2. Deploy to Kubernetes' },
      { id: 'verify-deployment', title: '3. Verify Deployment' },
      { id: 'access-service', title: '4. Access Your Service' },
      { id: 'part-e', title: 'Part E: Scaling Your Service' },
      { id: 'understanding-scaling', title: '1. Understanding Scaling' },
      { id: 'scale-up', title: '2. Scale Up (Add Pods)' },
      { id: 'scale-down', title: '3. Scale Down (Remove Pods)' },
      { id: 'test-load-balancing', title: '4. Test Load Balancing' },
      { id: 'part-f', title: 'Part F: kubectl Commands' },
      { id: 'viewing-resources', title: '1. Viewing Resources' },
      { id: 'viewing-logs', title: '2. Viewing Logs' },
      { id: 'describing-resources', title: '3. Describing Resources' },
      { id: 'managing-deployment', title: '4. Managing Deployment' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  },
  'lab7': {
    title: 'Lab 7: Cloud Deployment with AWS',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'prerequisites', title: 'Prerequisites Check' },
      { id: 'part-a', title: 'Part A: Understanding Cloud Deployment' },
      { id: 'what-is-cloud', title: '1. What is Cloud Deployment?' },
      { id: 'why-cloud', title: '2. Why Deploy to Cloud?' },
      { id: 'architecture', title: '3. Our Cloud Architecture' },
      { id: 'ec2-basics', title: '4. AWS EC2 Basics' },
      { id: 'part-b', title: 'Part B: Deploy Next.js to Vercel' },
      { id: 'vercel-setup', title: '1. What is Vercel?' },
      { id: 'connect-github', title: '2. Connect GitHub' },
      { id: 'env-variables', title: '3. Configure Environment Variables' },
      { id: 'deploy-vercel', title: '4. Deploy to Vercel' },
      { id: 'test-deployment', title: '5. Test Your Deployment' },
      { id: 'part-c', title: 'Part C: AWS Account & IAM Setup' },
      { id: 'aws-console', title: '1. Sign in to AWS Console' },
      { id: 'select-region', title: '2. Select Your Region' },
      { id: 'key-pair', title: '3. Create EC2 Key Pair' },
      { id: 'security-group', title: '4. Create Security Group' },
      { id: 'part-d', title: 'Part D: Deploy Flask to AWS EC2' },
      { id: 'launch-instance', title: '1. Launch EC2 Instance' },
      { id: 'configure-instance', title: '2. Configure Instance Details' },
      { id: 'get-public-ip', title: '4. Get Instance Public IP' },
      { id: 'connect-ec2', title: '5. Connect to EC2' },
      { id: 'install-docker', title: '6. Install Docker on EC2' },
      { id: 'transfer-image', title: '7. Transfer Docker Image' },
      { id: 'create-env', title: '8. Create Environment File' },
      { id: 'run-container', title: '9. Run Docker Container' },
      { id: 'test-flask', title: '10. Test Flask Service' },
      { id: 'part-e', title: 'Part E: Connect Services' },
      { id: 'update-vercel', title: '1. Update Vercel Environment' },
      { id: 'test-integration', title: '2. Test End-to-End' },
      { id: 'configure-cors', title: '3. Configure CORS' },
      { id: 'part-f', title: 'Part F: Cost Monitoring' },
      { id: 'costs', title: '1. Understanding AWS Costs' },
      { id: 'billing-alerts', title: '2. Set Up Billing Alerts' },
      { id: 'monitor-usage', title: '3. Monitor Your Usage' },
      { id: 'cost-optimization', title: '4. Cost Optimization Tips' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  },
  'lab8': {
    title: 'Lab 8: Serverless Deployment with AWS Lambda',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'prerequisites', title: 'Prerequisites Check' },
      { id: 'part-a', title: 'Part A: Understanding Serverless' },
      { id: 'what-is-serverless', title: '1. What is Serverless?' },
      { id: 'ec2-vs-lambda', title: '2. EC2 vs Lambda' },
      { id: 'when-to-use', title: '3. When to Use Each' },
      { id: 'serverless-architecture', title: '4. Our Serverless Architecture' },
      { id: 'lambda-basics', title: '5. AWS Lambda Basics' },
      { id: 'part-b', title: 'Part B: Prepare Flask Code' },
      { id: 'lambda-handler', title: '1. Understanding Lambda Handler' },
      { id: 'create-handler', title: '2. Create Lambda Handler File' },
      { id: 'update-requirements', title: '3. Update Requirements' },
      { id: 'test-handler', title: '4. Test Handler Locally' },
      { id: 'part-c', title: 'Part C: Package Lambda' },
      { id: 'deployment-package', title: '1. Understanding Deployment Package' },
      { id: 'create-package', title: '2. Create Deployment Package' },
      { id: 'docker-alternative', title: '3. Alternative: Docker Image' },
      { id: 'part-d', title: 'Part D: Create Lambda Function' },
      { id: 'lambda-console', title: '1. Navigate to Lambda Console' },
      { id: 'create-function', title: '2. Create Lambda Function' },
      { id: 'upload-package', title: '3. Upload Deployment Package' },
      { id: 'configure-handler', title: '4. Configure Handler' },
      { id: 'env-vars', title: '5. Configure Environment Variables' },
      { id: 'timeout-memory', title: '6. Configure Timeout and Memory' },
      { id: 'part-e', title: 'Part E: Set Up API Gateway' },
      { id: 'what-is-api-gateway', title: '1. What is API Gateway?' },
      { id: 'create-api', title: '2. Create HTTP API' },
      { id: 'get-endpoint', title: '3. Get API Endpoint URL' },
      { id: 'test-lambda', title: '4. Test Lambda Function' },
      { id: 'test-metrics', title: '5. Test Metrics Endpoint' },
      { id: 'part-f', title: 'Part F: Connect Vercel' },
      { id: 'update-vercel', title: '1. Update Vercel Environment' },
      { id: 'redeploy', title: '2. Trigger Redeployment' },
      { id: 'test-integration', title: '3. Test End-to-End Integration' },
      { id: 'monitor-lambda', title: '4. Monitor Lambda Executions' },
      { id: 'part-g', title: 'Part G: Performance Comparison' },
      { id: 'test-response-times', title: '1. Test Response Times' },
      { id: 'cold-starts', title: '2. Understanding Cold Starts' },
      { id: 'cost-comparison', title: '3. Cost Comparison' },
      { id: 'when-to-use-each', title: '4. When to Use Each' },
      { id: 'part-h', title: 'Part H: Clean Up' },
      { id: 'keep-or-choose', title: '1. Keep Both or Choose One?' },
      { id: 'stop-ec2', title: '2. Stop EC2 Instance' },
      { id: 'delete-lambda', title: '3. Delete Lambda Function' },
      { id: 'monitor-usage', title: '4. Monitor Your Usage' },
      { id: 'part-i', title: 'Part I: Cold Start Optimization' },
      { id: 'scheduled-warming', title: '1. Scheduled Warming' },
      { id: 'provisioned-concurrency', title: '2. Provisioned Concurrency' },
      { id: 'code-optimization', title: '3. Code Optimization' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  },
  'lab9': {
    title: 'Lab 9: Monitoring & Logging for Production AI Systems',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'prerequisites', title: 'Prerequisites Check' },
      { id: 'part-a', title: 'Part A: Understanding Production Monitoring' },
      { id: 'golden-signals', title: '1. The 4 Golden Signals' },
      { id: 'monitoring-vs-logging', title: '2. Monitoring vs Logging vs Tracing' },
      { id: 'why-monitor', title: '3. Why Monitor Production Systems?' },
      { id: 'part-b', title: 'Part B: Explore AWS CloudWatch' },
      { id: 'what-is-cloudwatch', title: '1. What is AWS CloudWatch?' },
      { id: 'view-metrics', title: '2. View Lambda Metrics' },
      { id: 'view-logs', title: '3. View Lambda Logs' },
      { id: 'test-lambda', title: '4. Test and Observe Metrics' },
      { id: 'part-c', title: 'Part C: CloudWatch Alarms' },
      { id: 'why-alarms', title: '1. Why Set Up Alarms?' },
      { id: 'create-sns', title: '2. Create SNS Topic' },
      { id: 'create-alarm', title: '3. Create Error Rate Alarm' },
      { id: 'test-alarm', title: '4. Test Alarm (Optional)' },
      { id: 'part-d', title: 'Part D: Enhanced Prometheus Dashboard' },
      { id: 'production-monitoring', title: '1. What We\'re Adding' },
      { id: 'update-dependencies', title: '2. Update Flask Dependencies' },
      { id: 'code-enhancements', title: '3. Code Enhancements' },
      { id: 'test-endpoints', title: '4. Test Enhanced Endpoints' },
      { id: 'view-dashboard', title: '5. View Enhanced Dashboard' },
      { id: 'part-e', title: 'Part E: Production Best Practices' },
      { id: 'alert-thresholds', title: '1. Setting Alert Thresholds' },
      { id: 'cost-tracking', title: '2. Track AI API Costs' },
      { id: 'log-levels', title: '3. Use Appropriate Log Levels' },
      { id: 'retention', title: '4. Log and Metric Retention' },
      { id: 'part-f', title: 'Part F: CloudWatch vs Prometheus' },
      { id: 'comparison-table', title: 'CloudWatch vs Prometheus' },
      { id: 'when-to-use', title: 'When to Use Each' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  },
  'lab10': {
    title: 'Lab 10: Security & Compliance for AI Systems',
    sections: [
      { id: 'overview', title: 'Lab Overview' },
      { id: 'prerequisites', title: 'Prerequisites Check' },
      { id: 'part-a', title: 'Part A: Understanding Security' },
      { id: 'part-b', title: 'Part B: Secure Environment Variables' },
      { id: 'part-c', title: 'Part C: API Rate Limiting' },
      { id: 'part-d', title: 'Part D: API Key Authentication' },
      { id: 'part-e', title: 'Part E: GDPR Compliance' },
      { id: 'part-f', title: 'Part F: Security Best Practices' },
      { id: 'troubleshooting', title: 'Troubleshooting' },
    ]
  }
}

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Extract current lab ID from pathname
  const currentLabId = pathname.split('/').pop() as keyof typeof labConfigs
  const currentLab = labConfigs[currentLabId]
  
  // If we're on the main labs page, don't show the lab layout
  if (pathname === '/labs') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Fixed */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="py-3 sm:py-4 space-y-1 sm:space-y-2">
            <Link
              href="/labs"
              className="inline-block text-xs sm:text-sm text-gray-600 hover:text-gray-900"
            >
              ← Labs
            </Link>
            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">
              {currentLab?.title || 'Lab'}
            </h1>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <div className="flex">
        <div className="w-full lg:max-w-7xl lg:mx-auto lg:px-8 lg:py-6 lg:flex lg:gap-6">
          {/* Navigation Sidebar - Desktop only, Mobile uses overlay */}
          <div className="hidden lg:block lg:flex-shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <LabNavigation
                currentLabId={currentLabId}
                sections={currentLab?.sections || []}
              />
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 lg:max-w-4xl px-3 sm:px-4 lg:px-0 py-4 lg:py-0">
            <div className="pb-16 lg:pb-20">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Mobile Navigation - Show for mobile/tablet */}
      <div className="lg:hidden">
        <LabNavigation
          currentLabId={currentLabId}
          sections={currentLab?.sections || []}
        />
      </div>
    </div>
  )
}