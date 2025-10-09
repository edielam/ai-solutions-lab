import Link from "next/link";
import { CodeBlock } from "@/components/labs/code-block";

export default function Lab4Page() {
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
            <div className="text-sm sm:text-lg font-semibold text-blue-900">GitHub Actions</div>
            <div className="text-xs sm:text-sm text-blue-700">Technology</div>
          </div>
        </div>

        <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
          Set up automated testing with GitHub Actions and deploy your Next.js application to Vercel staging environment.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none prose-sm sm:prose-base">
        <h2 id="overview" className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-4 sm:mb-6 text-gray-900">Lab Overview</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What You'll Do:</strong> Set up GitHub Actions for automated testing, deploy Next.js to Vercel, and configure staging environment
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
            You must complete Labs 1, 2, & 3 with working tests before starting Lab 4.
          </p>
        </div>

        <h2 id="prerequisites" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Prerequisites Check</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Before starting Lab 4, ensure you have:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">✅ GitHub repository with your code (forked from the lab)</li>
          <li className="text-gray-700">✅ Working Next.js application</li>
          <li className="text-gray-700">✅ Working Flask MLOps service</li>
          <li className="text-gray-700">✅ Passing tests from Lab 3: <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">pytest test_app.py</code></li>
          <li className="text-gray-700">✅ GitHub account with push access to your repository</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">🔍 Quick Test</h4>
          <ol className="text-blue-700 space-y-1">
            <li>1. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">git status</code> - should show your repo</li>
            <li>2. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">npm run build</code> - should build successfully</li>
            <li>3. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">cd mlops-service && pytest test_app.py</code> - all tests pass</li>
            <li>4. If all work, you're ready for Lab 4!</li>
          </ol>
        </div>

        <h2 id="part-a" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part A: GitHub Actions Setup</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Configure automated testing for your Next.js and Flask applications
        </p>

        <h3 id="repo-setup" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Repository Configuration</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Enable GitHub Actions (if not already enabled):</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to your GitHub repository</li>
          <li className="text-gray-700">Click the "Actions" tab</li>
          <li className="text-gray-700">If prompted, click "I understand my workflows, go ahead and enable them"</li>
          <li className="text-gray-700">You should see a message about workflows being enabled</li>
        </ol>

        <h3 id="test-setup" className="text-xl font-semibent mt-8 mb-4 text-gray-900">2. Test Configuration</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Install testing dependencies:</strong>
        </p>

        <CodeBlock language="bash">{`npm install --save-dev jest jest-environment-node`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Your repository already includes comprehensive test suites and Jest configuration.
        </p>

        <h2 id="part-b" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part B: Automated Testing</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          GitHub Actions will automatically test your code on every commit
        </p>

        <h3 id="nextjs-workflow" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Create Next.js Workflow</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Create the workflow directory structure:</strong>
        </p>

        <CodeBlock language="bash">{`# Create .github/workflows directory
mkdir -p .github/workflows`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Create the Next.js workflow file:</strong>
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          Create a file at <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">.github/workflows/nextjs-ci.yml</code> with the following content:
        </p>

        <CodeBlock language="yaml">{`name: Next.js Testing
# Lab 4: Deployment Pipelines (CI/CD)
# This workflow handles automated testing of the Next.js application

on:
  push:
    branches: [ main, develop, test-cicd ]
    paths:
      - 'app/**'
      - 'components/**'
      - 'lib/**'
      - 'package.json'
      - 'package-lock.json'
      - 'next.config.js'
      - 'tailwind.config.js'
  pull_request:
    branches: [ main ]
    paths:
      - 'app/**'
      - 'components/**'
      - 'lib/**'
      - 'package.json'
      - 'package-lock.json'

jobs:
  # Test Job - Runs comprehensive testing
  test:
    name: Test Next.js Application
    runs-on: ubuntu-latest

    steps:
      # Checkout the repository
      - name: Checkout code
        uses: actions/checkout@v4

      # Set up Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      # Install dependencies
      - name: Install dependencies
        run: npm ci

      # Run comprehensive test suite
      - name: Run test suite
        run: npm test
        env:
          # Test environment variables
          NODE_ENV: test

      # Run linting (if ESLint is configured)
      - name: Run linting
        run: npm run lint || echo "Linting not configured, skipping..."
        continue-on-error: true

      # Run type checking (if TypeScript is configured)
      - name: Type check
        run: npx tsc --noEmit || echo "TypeScript not configured, skipping..."
        continue-on-error: true

      # Build the application
      - name: Build application
        run: npm run build

      # Verify build output
      - name: Verify build output
        run: |
          if [ -d ".next" ]; then
            echo "Build successful - .next directory exists"
            ls -la .next/
          else
            echo "Build failed - .next directory not found"
            exit 1
          fi`}</CodeBlock>

        <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900">What This Workflow Does:</h4>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Triggers:</strong> Runs on push to main/develop, or pull requests</li>
          <li className="text-gray-700"><strong>Setup:</strong> Installs Node.js 18 and dependencies with <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">npm ci</code></li>
          <li className="text-gray-700"><strong>Testing:</strong> Runs comprehensive test suite with Jest</li>
          <li className="text-gray-700"><strong>Linting:</strong> Runs ESLint to check code quality (optional)</li>
          <li className="text-gray-700"><strong>Type Checking:</strong> Validates TypeScript types (optional)</li>
          <li className="text-gray-700"><strong>Building:</strong> Creates production build to verify deployment readiness</li>
        </ul>

        <h3 id="trigger-workflow" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Test Your Workflows</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Run tests locally first:</strong>
        </p>

        <CodeBlock language="bash">{`# Run Next.js tests
npm test

# Run MLOps tests
cd mlops-service
pytest test_app.py -v`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Trigger GitHub Actions:</strong>
        </p>

        <CodeBlock language="bash">{`# Make a small change to trigger CI
echo "<!-- Testing Pipeline -->" >> README.md

# Commit and push
git add README.md
git commit -m "test: trigger testing pipeline"
git push origin main`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Watch your workflow run:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to your GitHub repository</li>
          <li className="text-gray-700">Click the "Actions" tab</li>
          <li className="text-gray-700">You should see your workflow running</li>
          <li className="text-gray-700">Click on the workflow to see detailed logs</li>
        </ol>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-green-800 mb-2">✅ Success Indicators</h4>
          <ul className="text-green-700 space-y-1">
            <li>• Green checkmark next to your commit</li>
            <li>• "Test Next.js Application" job completes successfully</li>
            <li>• Build creates <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">.next</code> directory</li>
          </ul>
        </div>

        <h3 id="mlops-workflow" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Create MLOps Service Workflow</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Create the MLOps workflow file:</strong>
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          Create a file at <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">.github/workflows/mlops-ci.yml</code> with the following content:
        </p>

        <CodeBlock language="yaml">{`name: MLOps Service Testing
# Lab 4: Deployment Pipelines (CI/CD)
# This workflow handles automated testing of the Flask MLOps service

on:
  push:
    branches: [ main, develop, test-cicd ]
    paths:
      - 'mlops-service/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'mlops-service/**'

jobs:
  # Test Job - Runs pytest suite from Lab 3
  test:
    name: Test MLOps Service
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: ./mlops-service

    steps:
      # Checkout the repository
      - name: Checkout code
        uses: actions/checkout@v4

      # Set up Python
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.9'

      # Install dependencies
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      # Run pytest suite (from Lab 3)
      - name: Run tests
        run: |
          echo "Running MLOps service tests..."
          pytest test_app.py -v --tb=short
        env:
          # Test environment variables
          FLASK_ENV: testing
          TESTING: true

      # Test Flask app can start
      - name: Test Flask startup
        run: |
          echo "Testing Flask service startup..."
          timeout 10s python app.py &
          sleep 5

          # Test health endpoint
          curl -f http://localhost:5001/health || {
            echo "Health check failed"
            exit 1
          }

          echo "Flask service starts successfully"

      # Security scan
      - name: Security scan
        run: |
          echo "Running basic security checks..."
          pip install safety
          safety check || echo "Security warnings found, review before production"
        continue-on-error: true`}</CodeBlock>

        <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900">What This Workflow Does:</h4>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Triggers:</strong> Runs when mlops-service/ files change</li>
          <li className="text-gray-700"><strong>Setup:</strong> Installs Python 3.9 and Flask dependencies</li>
          <li className="text-gray-700"><strong>Testing:</strong> Runs your Lab 3 pytest suite automatically</li>
          <li className="text-gray-700"><strong>Flask Startup:</strong> Verifies the service can start and respond</li>
          <li className="text-gray-700"><strong>Security Scan:</strong> Checks for vulnerable dependencies</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 What Gets Tested</h4>
          <p className="text-blue-700 mb-2">
            The MLOps workflow automatically runs all the tests you created in Lab 3:
          </p>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Health endpoint availability</li>
            <li>• Prometheus metrics endpoint</li>
            <li>• Metrics tracking functionality</li>
            <li>• Error handling and validation</li>
          </ul>
        </div>

        <h2 id="part-c" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part C: Vercel Deployment</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Deploy your Next.js application to Vercel staging environment
        </p>

        <h3 id="vercel-setup" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Vercel Account Setup</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Create your Vercel account:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to <a href="https://vercel.com" className="text-blue-600 hover:text-blue-800 underline" target="_blank">vercel.com</a></li>
          <li className="text-gray-700">Click "Sign up with GitHub"</li>
          <li className="text-gray-700">Authorize Vercel to access your repositories</li>
          <li className="text-gray-700">Import your project repository</li>
        </ol>

        <h3 id="vercel-deploy" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Deploy to Vercel</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Configure deployment settings:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">In Vercel dashboard, click "Import Project"</li>
          <li className="text-gray-700">Select your GitHub repository</li>
          <li className="text-gray-700">Vercel will auto-detect Next.js settings</li>
          <li className="text-gray-700">Add environment variables in Vercel dashboard:</li>
        </ol>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-2">Environment Variables to Add:</h4>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">DATABASE_URL</code> - Your Neon database URL</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">GOOGLE_GENERATIVE_AI_API_KEY</code> - Your Gemini API key</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">MLOPS_SERVICE_URL</code> - http://localhost:5001 for now</li>
          </ul>
        </div>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Deploy your application:</strong>
        </p>

        <CodeBlock language="bash">{`# Click "Deploy" in Vercel dashboard
# Wait for build to complete
# Get your staging URL: https://your-app-name.vercel.app`}</CodeBlock>

        <h2 id="part-d" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part D: Testing Integration</h2>

        <h3 id="workflow-status" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Monitor Workflow Status</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Check that both workflows are running:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to your GitHub repository</li>
          <li className="text-gray-700">Click the "Actions" tab</li>
          <li className="text-gray-700">You should see both workflows running on commits</li>
          <li className="text-gray-700">Green checkmarks mean tests passed</li>
        </ol>

        <h3 id="test-quality-gates" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Quality Gates</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Your tests now act as quality gates:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Next.js tests:</strong> Validate API structure and business logic</li>
          <li className="text-gray-700"><strong>MLOps tests:</strong> Ensure Flask service works correctly</li>
          <li className="text-gray-700"><strong>Build verification:</strong> Confirms deployment readiness</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Key Learning</h4>
          <p className="text-blue-700 mb-2">Your Lab 3 tests are now part of CI/CD:</p>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Every commit runs both test suites automatically</li>
            <li>• Failed tests show up as red X marks on commits</li>
            <li>• This prevents broken code from reaching staging</li>
          </ul>
        </div>

        <h2 id="part-e" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part E: Workflow Monitoring</h2>

        <h3 id="deployment-status" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Check Deployment Status</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Verify your Vercel deployment:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to your Vercel dashboard</li>
          <li className="text-gray-700">Click on your project</li>
          <li className="text-gray-700">See deployment history and status</li>
          <li className="text-gray-700">Click "Visit" to see your live staging site</li>
        </ol>

        <h3 id="test-staging" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Test Your Staging Environment</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Verify your staging deployment works:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Visit your Vercel URL</li>
          <li className="text-gray-700">Try creating a test business</li>
          <li className="text-gray-700">Test the chat functionality</li>
          <li className="text-gray-700">Note: MLOps service will still be local for now</li>
        </ol>

        <h3 id="debugging-workflows" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Debug Failed Workflows</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>When tests fail in GitHub Actions:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to Actions tab → Click failed workflow</li>
          <li className="text-gray-700">Click the failed job to see detailed logs</li>
          <li className="text-gray-700">Look for error messages in red</li>
          <li className="text-gray-700">Fix the issue locally and push again</li>
        </ol>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-green-800 mb-2">✅ Success Indicators</h4>
          <ul className="text-green-700 space-y-1">
            <li>• Green checkmarks next to commits in GitHub</li>
            <li>• Vercel shows successful deployment</li>
            <li>• Your staging site loads and functions correctly</li>
          </ul>
        </div>

        <h2 id="troubleshooting" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Troubleshooting</h2>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Tests failing in GitHub Actions:</p>
            <p className="text-gray-700">Run tests locally first: <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">npm test</code> and <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">pytest test_app.py</code></p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Vercel build failing:</p>
            <p className="text-gray-700">Check that environment variables are set in Vercel dashboard</p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Workflow not triggering:</p>
            <p className="text-gray-700">Ensure you're pushing to main or develop branch</p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Jest tests failing:</p>
            <p className="text-gray-700">Check that <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">jest</code> and <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">jest-environment-node</code> are installed</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Lab 4 Summary - What You Built</h2>

        <p className="mb-6 text-gray-700 leading-relaxed">
          Congratulations! You've implemented a complete CI/CD pipeline for your AI application. Here's what you accomplished:
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">✅ What You Built</h3>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Automated Testing:</strong> GitHub Actions run tests on every commit</li>
          <li className="text-gray-700"><strong>Next.js Test Suite:</strong> Comprehensive application validation</li>
          <li className="text-gray-700"><strong>Flask Test Integration:</strong> Lab 3 pytest suite runs automatically</li>
          <li className="text-gray-700"><strong>Vercel Deployment:</strong> Live staging environment</li>
          <li className="text-gray-700"><strong>Quality Gates:</strong> Failed tests prevent broken deployments</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🚀 Skills Gained</h3>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>GitHub Actions:</strong> Automated testing workflows</li>
          <li className="text-gray-700"><strong>Vercel Deployment:</strong> Staging environment setup</li>
          <li className="text-gray-700"><strong>Test Integration:</strong> Quality gates for code changes</li>
          <li className="text-gray-700"><strong>Environment Management:</strong> Development vs staging configuration</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🎯 Next Steps</h3>

        <p className="mb-6 text-gray-700 leading-relaxed">
          Lab 5 will cover containerization with Docker, and Lab 7 will handle cloud deployment of your Flask service.
        </p>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <div>
            <Link href="/labs/lab3" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Lab 3: Testing AI Systems
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