import Link from "next/link";
import { CodeBlock } from "@/components/labs/code-block";

export default function Lab5Page() {
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
            <div className="text-sm sm:text-lg font-semibold text-blue-900">Docker</div>
            <div className="text-xs sm:text-sm text-blue-700">Technology</div>
          </div>
        </div>

        <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
          Learn Docker basics and containerize your Flask MLOps service for consistent deployment across different environments.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none prose-sm sm:prose-base">
        <h2 id="overview" className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-4 sm:mb-6 text-gray-900">Lab Overview</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What You'll Do:</strong> Install Docker, understand containerization basics, and containerize your Flask MLOps service to prepare for cloud deployment
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
            You must complete Labs 1-4 with a working Flask MLOps service before starting Lab 5.
          </p>
        </div>

        <h2 id="prerequisites" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Prerequisites Check</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Before starting Lab 5, ensure you have:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">✅ Working Flask MLOps service from Lab 2</li>
          <li className="text-gray-700">✅ Passing tests from Lab 3</li>
          <li className="text-gray-700">✅ GitHub Actions pipeline from Lab 4</li>
          <li className="text-gray-700">✅ Flask service runs locally on port 5001</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">🔍 Quick Test</h4>
          <p className="text-blue-700 mb-2"><strong>Mac/Linux:</strong></p>
          <ol className="text-blue-700 space-y-1 mb-3">
            <li>1. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">cd mlops-service</code></li>
            <li>2. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">source venv/bin/activate</code></li>
            <li>3. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">python app.py</code></li>
          </ol>
          <p className="text-blue-700 mb-2"><strong>Windows:</strong></p>
          <ol className="text-blue-700 space-y-1 mb-3">
            <li>1. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">cd mlops-service</code></li>
            <li>2. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">venv\Scripts\activate</code></li>
            <li>3. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">python app.py</code></li>
          </ol>
          <p className="text-blue-700">4. Visit http://localhost:5001/health - should return healthy status</p>
          <p className="text-blue-700">5. If this works, you're ready for Lab 5!</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">📝 Important Note</h4>
          <p className="text-yellow-700">
            In this lab, we'll ONLY containerize the Flask MLOps service. Your Next.js app will continue running locally with <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">npm run dev</code> and will eventually be deployed to Vercel (not containerized).
          </p>
        </div>

        <h2 id="part-a" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part A: Understanding Docker</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Learn what Docker is and why it's essential for modern application deployment
        </p>

        <h3 id="what-is-docker" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. What is Docker?</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Docker</strong> is a platform that packages your application and all its dependencies into a standardized unit called a <strong>container</strong>.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Think of it this way:</h4>
          <p className="text-blue-700 mb-2">
            A container is like a shipping container for your code:
          </p>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Contains everything needed to run your app (code, Python, libraries, etc.)</li>
            <li>• Works the same way on any computer (your laptop, AWS, Google Cloud)</li>
            <li>• Isolated from other applications</li>
            <li>• Easy to start, stop, and move around</li>
          </ul>
        </div>

        <h3 id="why-docker" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Why Use Docker?</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>The "Works on My Machine" Problem:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">❌ Your Flask app works on your laptop but breaks on the server</li>
          <li className="text-gray-700">❌ Different Python versions cause issues</li>
          <li className="text-gray-700">❌ Missing dependencies or libraries</li>
          <li className="text-gray-700">❌ Environment variable conflicts</li>
        </ul>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Docker Solution:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">✅ Package your app with exact Python version</li>
          <li className="text-gray-700">✅ Include all dependencies</li>
          <li className="text-gray-700">✅ Run the same container anywhere</li>
          <li className="text-gray-700">✅ Consistent behavior across development, testing, and production</li>
        </ul>

        <h3 id="key-concepts" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Key Docker Concepts</h3>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-blue-400 pl-4">
            <p className="font-semibold text-gray-900">Docker Image</p>
            <p className="text-gray-700">A blueprint/template for your container. Like a recipe that describes how to build your container.</p>
          </div>

          <div className="border-l-4 border-green-400 pl-4">
            <p className="font-semibold text-gray-900">Container</p>
            <p className="text-gray-700">A running instance of an image. Like the actual meal made from the recipe.</p>
          </div>

          <div className="border-l-4 border-purple-400 pl-4">
            <p className="font-semibold text-gray-900">Dockerfile</p>
            <p className="text-gray-700">A text file with instructions to build a Docker image. Contains steps like "install Python", "copy code", "install dependencies".</p>
          </div>

          <div className="border-l-4 border-orange-400 pl-4">
            <p className="font-semibold text-gray-900">Docker Hub</p>
            <p className="text-gray-700">A repository of pre-built images (like GitHub for Docker images). We'll use Python base images from here.</p>
          </div>
        </div>

        <h2 id="part-b" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part B: Install Docker</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Get Docker Desktop installed on your computer
        </p>

        <h3 id="install-docker" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Install Docker Desktop</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>All Platforms:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to <a href="https://www.docker.com/products/docker-desktop" className="text-blue-600 hover:text-blue-800 underline" target="_blank">docker.com/products/docker-desktop</a></li>
          <li className="text-gray-700">Download Docker Desktop for your operating system</li>
          <li className="text-gray-700">Install with default settings</li>
          <li className="text-gray-700">Start Docker Desktop (it will run in the background)</li>
        </ol>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">⚠️ System Requirements</h4>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• <strong>Windows:</strong> Windows 10 64-bit or newer, WSL 2 enabled</li>
            <li>• <strong>Mac:</strong> macOS 10.15 or newer</li>
            <li>• <strong>Linux:</strong> Most modern distributions supported</li>
          </ul>
        </div>

        <h3 id="verify-install" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Verify Installation</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Open a terminal and run:</strong>
        </p>

        <CodeBlock language="bash">{`# Check Docker version
docker --version

# Check Docker is running
docker ps

# Test with hello-world container
docker run hello-world`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> If you see "Hello from Docker!" message, Docker is installed correctly!
          </p>
        </div>

        <h2 id="part-c" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part C: Containerize Flask MLOps Service</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Create a Docker container for your Flask service
        </p>

        <h3 id="create-dockerfile" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Create Dockerfile</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Your repository already includes a Dockerfile in the <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">mlops-service/</code> directory. Let's understand what it does:
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>View the Dockerfile:</strong>
        </p>

        <p className="mb-2 text-gray-700"><strong>Mac/Linux:</strong></p>
        <CodeBlock language="bash">{`cd mlops-service
cat Dockerfile`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows (Command Prompt):</strong></p>
        <CodeBlock language="cmd">{`cd mlops-service
type Dockerfile`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows (PowerShell):</strong></p>
        <CodeBlock language="powershell">{`cd mlops-service
Get-Content Dockerfile`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Understanding each line:</strong>
        </p>

        <CodeBlock language="dockerfile">{`# Start from official Python 3.11 image
FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port 5001 (Flask runs on this port)
EXPOSE 5001

# Command to run when container starts
CMD ["python", "app.py"]`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 What Each Command Does:</h4>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">FROM</code>: Base image to start from (Python 3.11)</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">WORKDIR</code>: Sets the working directory inside container</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">COPY</code>: Copies files from your computer to the container</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">RUN</code>: Executes commands during image build</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">EXPOSE</code>: Documents which port the app uses</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">CMD</code>: Command to run when container starts</li>
          </ul>
        </div>

        <h3 id="dockerignore" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Create .dockerignore File</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Just like <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">.gitignore</code>, we need a <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">.dockerignore</code> file to exclude unnecessary files from the Docker image.
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Check if .dockerignore exists:</strong>
        </p>

        <p className="mb-2 text-gray-700"><strong>Mac/Linux:</strong></p>
        <CodeBlock language="bash">{`# In mlops-service directory
ls -la .dockerignore`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows (Command Prompt):</strong></p>
        <CodeBlock language="cmd">{`REM In mlops-service directory
dir .dockerignore`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows (PowerShell):</strong></p>
        <CodeBlock language="powershell">{`# In mlops-service directory
ls .dockerignore`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>The .dockerignore file should contain:</strong>
        </p>

        <CodeBlock language="text">{`# Virtual environment
venv/
__pycache__/
*.pyc
*.pyo
*.pyd

# Environment files
.env
.env.local

# Test files
test_*.py
tests/
*.pytest_cache

# Git
.git/
.gitignore

# IDE
.vscode/
.idea/
*.swp

# Documentation
README.md
*.md`}</CodeBlock>

        <h3 id="build-image" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Build Docker Image</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Build your first Docker image (works on all platforms):</strong>
        </p>

        <CodeBlock language="bash">{`# Make sure you're in the mlops-service directory
cd mlops-service

# Build the Docker image
# -t names the image "mlops-service"
# . means use current directory as build context
docker build -t mlops-service .`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>💡 Note:</strong> Docker commands are the same on Windows, Mac, and Linux! Once Docker Desktop is installed, use the same commands everywhere.
          </p>
        </div>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What happens during the build:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">1. Docker downloads the Python 3.11 base image</li>
          <li className="text-gray-700">2. Creates a working directory</li>
          <li className="text-gray-700">3. Installs all Python dependencies from requirements.txt</li>
          <li className="text-gray-700">4. Copies your Flask application code</li>
          <li className="text-gray-700">5. Creates a complete image ready to run</li>
        </ul>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Verify the image was created:</strong>
        </p>

        <CodeBlock language="bash">{`# List Docker images
docker images

# You should see mlops-service in the list`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> If you see <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">mlops-service</code> in the images list, your image is built successfully!
          </p>
        </div>

        <h3 id="run-container" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Run Docker Container</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Start your containerized Flask service:</strong>
        </p>

        <p className="mb-2 text-gray-700"><strong>Mac/Linux:</strong></p>
        <CodeBlock language="bash">{`# Run the container
docker run -d \\
  --name mlops-container \\
  -p 5001:5001 \\
  -e DATABASE_URL="your_database_url_here" \\
  -e FLASK_ENV=development \\
  mlops-service`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows (Command Prompt):</strong></p>
        <CodeBlock language="cmd">{`REM Run the container
docker run -d ^
  --name mlops-container ^
  -p 5001:5001 ^
  -e DATABASE_URL="your_database_url_here" ^
  -e FLASK_ENV=development ^
  mlops-service`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows (PowerShell):</strong></p>
        <CodeBlock language="powershell">{`# Run the container
docker run -d \`
  --name mlops-container \`
  -p 5001:5001 \`
  -e DATABASE_URL="your_database_url_here" \`
  -e FLASK_ENV=development \`
  mlops-service`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Explanation:</strong>
        </p>
        <ul className="mb-6 ml-6 space-y-1">
          <li className="text-gray-700"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">-d</code>: Run in detached mode (background)</li>
          <li className="text-gray-700"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">--name</code>: Give container a friendly name</li>
          <li className="text-gray-700"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">-p 5001:5001</code>: Map port 5001 from container to your computer</li>
          <li className="text-gray-700"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">-e</code>: Set environment variables</li>
          <li className="text-gray-700"><code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">mlops-service</code>: The image to run</li>
        </ul>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Line Continuation Characters</h4>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>• <strong>Mac/Linux:</strong> Use backslash <code className="bg-white px-1 py-0.5 rounded font-mono">\</code> at end of line</li>
            <li>• <strong>Windows Command Prompt:</strong> Use caret <code className="bg-white px-1 py-0.5 rounded font-mono">^</code> at end of line</li>
            <li>• <strong>Windows PowerShell:</strong> Use backtick <code className="bg-white px-1 py-0.5 rounded font-mono">`</code> at end of line</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 Environment Variables</h4>
          <p className="text-yellow-700 mb-2">Replace <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">your_database_url_here</code> with your actual Neon database URL from your <code className="bg-white px-1 py-0.5 rounded text-xs font-mono">.env</code> file.</p>
        </div>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Check if container is running:</strong>
        </p>

        <CodeBlock language="bash">{`# List running containers
docker ps

# You should see mlops-container in the list`}</CodeBlock>

        <h3 id="test-container" className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. Test Containerized Service</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Test the health endpoint:</strong>
        </p>

        <CodeBlock language="bash">{`curl http://localhost:5001/health`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>You should see:</strong>
        </p>

        <CodeBlock language="json">{`{
  "status": "healthy",
  "service": "mlops-service",
  "timestamp": "2024-01-15T10:30:00.000000",
  "monitoring": "prometheus"
}`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Test Prometheus metrics:</strong>
        </p>

        <CodeBlock language="bash">{`curl http://localhost:5001/metrics`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> If both endpoints work, your containerized Flask service is running correctly!
          </p>
        </div>

        <h3 id="test-with-nextjs" className="text-xl font-semibold mt-8 mb-4 text-gray-900">6. Test with Next.js Application</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Now test that your Next.js app can communicate with the containerized Flask service:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Make sure the Docker container is running (<code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">docker ps</code>)</li>
          <li className="text-gray-700">In a new terminal, start your Next.js app: <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">npm run dev</code></li>
          <li className="text-gray-700">Go to http://localhost:3000</li>
          <li className="text-gray-700">Chat with the AI</li>
          <li className="text-gray-700">Check http://localhost:5001/metrics to see if new metrics appear</li>
        </ol>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800 mb-2">
            <strong>✅ Success Indicators:</strong>
          </p>
          <ul className="text-green-700 space-y-1">
            <li>• Next.js app loads at http://localhost:3000</li>
            <li>• AI chat responds to your messages</li>
            <li>• Prometheus metrics update at http://localhost:5001/metrics</li>
            <li>• No errors in Docker logs</li>
          </ul>
        </div>

        <h2 id="part-d" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part D: Docker Container Management</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Learn essential Docker commands for managing your containers
        </p>

        <h3 id="basic-commands" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Essential Docker Commands</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>View container logs:</strong>
        </p>

        <CodeBlock language="bash">{`# View logs from your container
docker logs mlops-container

# Follow logs in real-time (like tail -f)
docker logs -f mlops-container`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Stop the container:</strong>
        </p>

        <CodeBlock language="bash">{`docker stop mlops-container`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Start the container again:</strong>
        </p>

        <CodeBlock language="bash">{`docker start mlops-container`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Restart the container:</strong>
        </p>

        <CodeBlock language="bash">{`docker restart mlops-container`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Remove the container:</strong>
        </p>

        <CodeBlock language="bash">{`# Stop first, then remove
docker stop mlops-container
docker rm mlops-container`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Remove the image:</strong>
        </p>

        <CodeBlock language="bash">{`docker rmi mlops-service`}</CodeBlock>

        <h3 id="debugging" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Debugging Containers</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Execute commands inside a running container:</strong>
        </p>

        <p className="mb-2 text-gray-700"><strong>Mac/Linux:</strong></p>
        <CodeBlock language="bash">{`# Open a shell inside the container
docker exec -it mlops-container /bin/bash

# Once inside, you can:
# - Check files: ls -la
# - View environment: env
# - Test Python: python --version
# - Exit: exit`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows:</strong></p>
        <CodeBlock language="cmd">{`REM Open a shell inside the container
docker exec -it mlops-container /bin/bash

REM Once inside, you can:
REM - Check files: ls -la
REM - View environment: env
REM - Test Python: python --version
REM - Exit: exit`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>💡 Note:</strong> Once inside the container, you're in a Linux environment regardless of your host OS. The commands inside the container are the same for all platforms.
          </p>
        </div>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>View container resource usage:</strong>
        </p>

        <CodeBlock language="bash">{`docker stats mlops-container`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Inspect container details:</strong>
        </p>

        <CodeBlock language="bash">{`docker inspect mlops-container`}</CodeBlock>

        <h2 id="part-e" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part E: Docker Compose (Optional)</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Use docker-compose for easier container management
        </p>

        <h3 id="what-is-compose" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. What is Docker Compose?</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Docker Compose</strong> is a tool for defining and running Docker applications using a YAML configuration file. Instead of typing long docker commands, you define everything in a file.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Benefits:</h4>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• No need to remember complex docker run commands</li>
            <li>• Easy to share configuration with team</li>
            <li>• Start/stop everything with one command</li>
            <li>• Environment variables managed in one place</li>
          </ul>
        </div>

        <h3 id="create-compose" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Create docker-compose.yml</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Your repository already includes a <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">docker-compose.yml</code> file in the <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">mlops-service/</code> directory.
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>View the file:</strong>
        </p>

        <p className="mb-2 text-gray-700"><strong>Mac/Linux:</strong></p>
        <CodeBlock language="bash">{`cat mlops-service/docker-compose.yml`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows (Command Prompt):</strong></p>
        <CodeBlock language="cmd">{`type mlops-service\\docker-compose.yml`}</CodeBlock>

        <p className="mb-2 text-gray-700"><strong>Windows (PowerShell):</strong></p>
        <CodeBlock language="powershell">{`Get-Content mlops-service/docker-compose.yml`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Understanding the configuration:</strong>
        </p>

        <CodeBlock language="yaml">{`version: '3.8'

services:
  mlops-service:
    build: .
    container_name: mlops-container
    ports:
      - "5001:5001"
    environment:
      - DATABASE_URL=\${DATABASE_URL}
      - FLASK_ENV=development
      - FLASK_DEBUG=True
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs`}</CodeBlock>

        <h3 id="env-file" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Create .env File for Docker Compose</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Docker Compose can read environment variables from a <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">.env</code> file.
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Your mlops-service/.env should have:</strong>
        </p>

        <CodeBlock language="env">{`# Database Configuration
DATABASE_URL=your_neon_database_url_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Service Configuration
SERVICE_PORT=5001`}</CodeBlock>

        <h3 id="use-compose" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Use Docker Compose</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Start the service with Docker Compose (same on all platforms):</strong>
        </p>

        <CodeBlock language="bash">{`# Navigate to mlops-service directory
cd mlops-service

# Build and start the container
docker-compose up -d

# -d runs in detached mode (background)`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>💡 Note:</strong> Docker Compose commands are identical on Windows, Mac, and Linux!
          </p>
        </div>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>View logs:</strong>
        </p>

        <CodeBlock language="bash">{`docker-compose logs -f`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Stop the service:</strong>
        </p>

        <CodeBlock language="bash">{`docker-compose down`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Rebuild and restart after code changes:</strong>
        </p>

        <CodeBlock language="bash">{`docker-compose up -d --build`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Much Easier!</strong> Docker Compose simplifies container management with simple commands.
          </p>
        </div>

        <h2 id="troubleshooting" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Troubleshooting</h2>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Port 5001 already in use:</p>
            <p className="text-gray-700">Stop any local Flask service running on port 5001, or use a different port in docker run command: <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">-p 5002:5001</code></p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Container exits immediately:</p>
            <p className="text-gray-700">Check logs with <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">docker logs mlops-container</code> - usually missing environment variables</p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Cannot connect to database:</p>
            <p className="text-gray-700">Verify DATABASE_URL is correct and includes <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">?sslmode=require</code></p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Docker build fails:</p>
            <p className="text-gray-700">Ensure you're in the mlops-service directory and requirements.txt exists</p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Next.js can't reach Flask:</p>
            <p className="text-gray-700">Check MLOPS_SERVICE_URL in main .env is set to http://localhost:5001</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Lab 5 Summary - What You Built</h2>

        <p className="mb-6 text-gray-700 leading-relaxed">
          Congratulations! You've successfully containerized your Flask MLOps service. Here's what you accomplished:
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">✅ Docker Skills Gained</h3>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Docker Fundamentals:</strong> Understanding containers, images, and Dockerfiles</li>
          <li className="text-gray-700"><strong>Containerization:</strong> Packaged Flask service with all dependencies</li>
          <li className="text-gray-700"><strong>Container Management:</strong> Start, stop, debug, and monitor containers</li>
          <li className="text-gray-700"><strong>Docker Compose:</strong> Simplified container orchestration (optional)</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🚀 What You Can Now Do</h3>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Consistent Environment:</strong> Flask service runs the same everywhere</li>
          <li className="text-gray-700"><strong>Easy Deployment:</strong> Ready to deploy to any cloud platform</li>
          <li className="text-gray-700"><strong>Isolated Service:</strong> No conflicts with other applications</li>
          <li className="text-gray-700"><strong>Professional Workflow:</strong> Industry-standard containerization</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🎯 Why This Matters</h3>

        <p className="mb-6 text-gray-700 leading-relaxed">
          You've now containerized your Flask MLOps service, which is the first step toward cloud deployment. In upcoming labs, you'll deploy this container to AWS, Google Cloud, or Azure. Your Next.js app will stay on Vercel (no containerization needed), while your Flask service runs in the cloud.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <strong>Industry Relevance:</strong> Docker is the standard for deploying applications in production. Companies like Netflix, Uber, and Spotify use Docker to deploy thousands of services.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">📝 Key Takeaways</h3>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Containers solve the "works on my machine" problem</li>
          <li className="text-gray-700">Dockerfile defines how to build your container image</li>
          <li className="text-gray-700">Docker images are blueprints, containers are running instances</li>
          <li className="text-gray-700">Docker Compose simplifies multi-container applications</li>
          <li className="text-gray-700">Only the Flask service needs containerization (Next.js stays on Vercel)</li>
        </ul>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <div>
            <Link href="/labs/lab4" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Lab 4: Deployment Pipelines
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
