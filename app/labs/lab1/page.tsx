import Link from "next/link";
import { CodeBlock } from "@/components/labs/code-block";

export default function Lab1Page() {
  return (
    <>
      {/* Lab Header */}
      <div className="mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4 sm:mb-6">
          <div className="text-center py-1 sm:py-0">
            <div className="text-sm sm:text-lg font-semibold text-blue-900">Foundation</div>
            <div className="text-xs sm:text-sm text-blue-700">Level</div>
          </div>
          <div className="text-center py-1 sm:py-0">
            <div className="text-sm sm:text-lg font-semibold text-blue-900">Next.js + Setup</div>
            <div className="text-xs sm:text-sm text-blue-700">Technology</div>
          </div>
        </div>

        <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
          Create accounts for the services we need, install coding tools on your computer, and get the AI receptionist app running on your machine.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none prose-sm sm:prose-base">
        <h2 id="overview" className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-4 sm:mb-6 text-gray-900">Lab Overview</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What You'll Do:</strong> Create accounts for the services we need, install coding tools on your computer, and get the AI receptionist app running on your machine
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Lab Collaborators:</strong>
        </p>
        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Edward Lampoh - Software Developer & Collaborator</li>
          <li className="text-gray-700">Oluwafemi Adebayo, PhD - Academic Professor & Collaborator</li>
        </ul>

        <p className="mb-4 text-gray-700 leading-relaxed">
          This lab has 3 main parts. <strong>Complete each part fully before moving to the next.</strong>
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-3">Lab Parts Overview</h3>
          <ul className="text-blue-700 space-y-2">
            <li><strong>Part A:</strong> Create Your Accounts (GitHub, Google Gemini, AWS, Neon, Resend)</li>
            <li><strong>Part B:</strong> Install Development Tools (Node.js, Python, Git, VS Code)</li>
            <li><strong>Part C:</strong> Project Setup (Fork, clone, install, configure, test)</li>
          </ul>
          <p className="text-blue-700 mt-3 text-sm">
            <em>All these services have free tiers - you won't pay anything during this course.</em>
          </p>
        </div>

        <h2 id="part-a" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part A: Create Your Accounts</h2>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>Good news:</strong> All these services have free tiers - you won't pay anything during this course.
          </p>
        </div>

        <h3 id="github-setup" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. GitHub Setup</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Create Account:</strong>
        </p>
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to <a href="https://github.com" className="text-blue-600 hover:text-blue-800 underline" target="_blank">github.com</a> and click "Sign up"</li>
          <li className="text-gray-700">Use your student email if available (gets you free GitHub Pro features!)</li>
          <li className="text-gray-700">Choose a professional username (you'll use this publicly)</li>
          <li className="text-gray-700">Verify your email address</li>
        </ol>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Connect Git to GitHub:</strong>
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <h4 className="font-semibold mb-2">Video Tutorials by Platform:</h4>
          <ul className="space-y-1 text-sm">
            <li><strong>Windows:</strong> <a href="https://youtu.be/AdzKzlp66sQ?si=_B-0h1qM3OIV3bn5" className="text-blue-600 hover:text-blue-800 underline" target="_blank">Git & GitHub Setup Tutorial</a></li>
            <li><strong>Mac:</strong> <a href="https://www.youtube.com/watch?v=p0Js7IF17yI" className="text-blue-600 hover:text-blue-800 underline" target="_blank">Git & GitHub Setup for Mac</a></li>
            <li><strong>Linux:</strong> <a href="https://www.youtube.com/watch?v=bc3_FL9zWWs" className="text-blue-600 hover:text-blue-800 underline" target="_blank">Git & GitHub Setup for Linux</a></li>
          </ul>
        </div>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Quick Setup Commands:</strong>
        </p>
        <CodeBlock language="bash">{`# Tell Git your name (use your real name)
git config --global user.name "Your Full Name"

# Tell Git your email (use the SAME email as your GitHub account)
git config --global user.email "your.email@example.com"`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Test Your Connection:</strong>
        </p>
        <CodeBlock language="bash">{`# This should show your name and email
git config --global --list`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> If you see your name and email listed, you're ready to go!
          </p>
        </div>

        <h3 id="gemini-api" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Google Gemini API</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What You Need:</strong> A Gmail or Google account (most people already have this!)
        </p>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Get Your AI Key:</strong>
        </p>
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Search "google gemini api" in your browser</li>
          <li className="text-gray-700">Click on the "Google AI Studio" link that appears</li>
          <li className="text-gray-700">Sign in with your Google account</li>
          <li className="text-gray-700">Click "Get Started"</li>
          <li className="text-gray-700">Click "Get a new API key"</li>
          <li className="text-gray-700">Follow the instructions to create your key</li>
          <li className="text-gray-700"><strong>Copy and save this key somewhere safe</strong></li>
        </ol>

        <h3 id="aws-account" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. AWS Account</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Sign Up:</strong>
        </p>
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to <a href="https://aws.amazon.com" className="text-blue-600 hover:text-blue-800 underline" target="_blank">aws.amazon.com</a></li>
          <li className="text-gray-700">Click "Create a Free Account"</li>
          <li className="text-gray-700">You'll need to verify your phone number and add a payment method (but you won't be charged)</li>
          <li className="text-gray-700">Choose "Basic Support - Free" when asked</li>
        </ol>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <strong>Note:</strong> We'll only use free services! This is for later when we deploy your app.
          </p>
        </div>

        <h3 id="neon-database" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Neon Database</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Sign Up:</strong>
        </p>
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to <a href="https://neon.tech" className="text-blue-600 hover:text-blue-800 underline" target="_blank">neon.tech</a></li>
          <li className="text-gray-700">Click "Sign up with GitHub" (easiest option)</li>
          <li className="text-gray-700">Create a new project and name it: "ai-receptionist-lab"</li>
          <li className="text-gray-700"><strong>Copy the connection string</strong> - it looks like:</li>
        </ol>

        <CodeBlock language="text">{`postgresql://neondb_owner:abc123@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require`}</CodeBlock>

        <p className="mb-6 text-gray-700 leading-relaxed">
          <strong>Save this entire string</strong> - you'll paste it into your <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">.env</code> file next
        </p>

        <h3 id="resend-email" className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. Resend Email Service</h3>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> Email functionality is not yet implemented in the codebase. This is a placeholder for future implementation.
          </p>
        </div>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Sign Up:</strong>
        </p>
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to <a href="https://resend.com" className="text-blue-600 hover:text-blue-800 underline" target="_blank">resend.com</a></li>
          <li className="text-gray-700">Sign up for a free account</li>
          <li className="text-gray-700">Once logged in, get your API key from the dashboard</li>
          <li className="text-gray-700"><strong>Save this key</strong></li>
        </ol>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Part A Completion Check</h4>
          <p className="text-yellow-700 mb-2">Before proceeding to Part B, ensure you have:</p>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>✓ GitHub account created and Git configured</li>
            <li>✓ Google Gemini API key saved</li>
            <li>✓ AWS account created</li>
            <li>✓ Neon database project created with connection string saved</li>
            <li>✓ Resend API key saved</li>
          </ul>
          <p className="text-yellow-700 mt-2 text-sm">
            <strong>Have all 5 items checked?</strong> → Proceed to Part B<br/>
            <strong>Missing something?</strong> → Complete the missing steps above
          </p>
        </div>

        <h2 id="part-b" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part B: Install Development Tools</h2>

        <h3 id="nodejs" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Node.js Installation</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>All Platforms:</strong>
        </p>
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to <a href="https://nodejs.org" className="text-blue-600 hover:text-blue-800 underline" target="_blank">nodejs.org</a></li>
          <li className="text-gray-700">Download <strong>LTS version</strong> (v18 or v20)</li>
          <li className="text-gray-700">Install with default settings</li>
        </ol>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Verify:</strong>
        </p>
        <CodeBlock language="bash">{`node --version
npm --version`}</CodeBlock>

        <h3 id="python" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Python Installation</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Windows:</strong>
        </p>
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to <a href="https://python.org/downloads" className="text-blue-600 hover:text-blue-800 underline" target="_blank">python.org/downloads</a></li>
          <li className="text-gray-700">Download Python 3.9 or newer</li>
          <li className="text-gray-700"><strong>Check "Add Python to PATH"</strong> during installation</li>
        </ol>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>macOS:</strong>
        </p>
        <CodeBlock language="bash">{`brew install python@3.9`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Linux (Ubuntu/Debian):</strong>
        </p>
        <CodeBlock language="bash">{`sudo apt update
sudo apt install python3 python3-pip python3-venv`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Verify:</strong>
        </p>
        <CodeBlock language="bash">{`python --version  # or python3 --version
pip --version      # or pip3 --version`}</CodeBlock>

        <h3 id="git" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Git Installation</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Windows:</strong>
        </p>
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Download from <a href="https://git-scm.com" className="text-blue-600 hover:text-blue-800 underline" target="_blank">git-scm.com</a></li>
          <li className="text-gray-700">Install with default settings</li>
        </ol>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>macOS:</strong>
        </p>
        <CodeBlock language="bash">{`# Git usually comes pre-installed, if not:
brew install git`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Linux:</strong>
        </p>
        <CodeBlock language="bash">{`sudo apt install git`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Verify:</strong>
        </p>
        <CodeBlock language="bash">{`git --version`}</CodeBlock>

        <h3 id="vscode" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Code Editor (Recommended)</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Visual Studio Code:</strong>
        </p>
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Download from <a href="https://code.visualstudio.com" className="text-blue-600 hover:text-blue-800 underline" target="_blank">code.visualstudio.com</a></li>
          <li className="text-gray-700">Install helpful extensions:
            <ul className="ml-4 mt-2 space-y-1">
              <li>• Python</li>
              <li>• JavaScript ES6 code snippets</li>
              <li>• Prettier - Code formatter</li>
            </ul>
          </li>
        </ol>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">Part B Completion Check</h4>
          <p className="text-yellow-700 mb-2">Before proceeding to Part C, ensure you have:</p>
          <ul className="text-yellow-700 space-y-1 text-sm">
            <li>✓ Node.js and npm installed and verified</li>
            <li>✓ Python 3.9+ installed and verified</li>
            <li>✓ Git installed and verified</li>
            <li>✓ VS Code installed with recommended extensions</li>
          </ul>
          <p className="text-yellow-700 mt-2 text-sm">
            <strong>Have all 4 items checked?</strong> → Proceed to Part C<br/>
            <strong>Missing something?</strong> → Complete the missing steps above
          </p>
        </div>

        <h2 id="part-c" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part C: Project Setup</h2>

        <h3 id="fork-repo" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Fork Repository</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Why Fork?</strong> You need your own copy to make changes throughout the course.
        </p>
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to: https://github.com/edielam/ai-solutions-lab</li>
          <li className="text-gray-700">Click the <strong>"Fork"</strong> button (top-right corner)</li>
          <li className="text-gray-700">This creates your personal copy at <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">https://github.com/YOUR_USERNAME/ai-solutions-lab</code></li>
        </ol>

        <h3 id="clone-fork" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Clone Your Fork</h3>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800">
            <strong>Important:</strong> Clone YOUR fork, not the original repository!
          </p>
        </div>

        <CodeBlock language="bash">{`# Replace YOUR_USERNAME with your actual GitHub username
git clone https://github.com/YOUR_USERNAME/ai-solutions-lab.git
cd ai-solutions-lab`}</CodeBlock>

        <h3 id="install-deps" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Install Dependencies</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Frontend (Next.js):</strong>
        </p>
        <CodeBlock language="bash">{`npm install`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Backend (Python):</strong><br/>
          <em>No backend setup needed for Lab 1 - we'll do this in later labs.</em>
        </p>

        <h3 id="env-config" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Environment Configuration</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          Create <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">.env</code> file in the root directory:
        </p>

        <CodeBlock language="env">{`# Database (from Neon)
DATABASE_URL=your_neon_connection_string_here

# AI API (from Google)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Email Service (from Resend) - NOTE: Not yet implemented, placeholder for future
RESEND_API_KEY=your_resend_api_key_here

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
SECRET_KEY=change_this_to_something_secure
DEBUG=true`}</CodeBlock>

        <h3 id="run-app" className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. Run the Application</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Start Frontend:</strong>
        </p>
        <CodeBlock language="bash">{`npm run dev`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Open Browser:</strong><br/>
          Go to <a href="http://localhost:3000" className="text-blue-600 hover:text-blue-800 underline" target="_blank">http://localhost:3000</a>
        </p>

        <h3 id="test-flow" className="text-xl font-semibold mt-8 mb-4 text-gray-900">6. Test the Complete Flow</h3>
        
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Landing Page:</strong> Click "TRY IT FREE - NO SIGNUP"</li>
          <li className="text-gray-700"><strong>Business Setup:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• Enter business name and description</li>
              <li>• Choose a brand color</li>
              <li>• Click "Continue to Documents"</li>
            </ul>
          </li>
          <li className="text-gray-700"><strong>Document Upload:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• Skip for now or upload a sample document</li>
              <li>• Click "Continue"</li>
            </ul>
          </li>
          <li className="text-gray-700"><strong>Generated URL:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• Copy your unique chat URL</li>
              <li>• Click "Try Your AI Receptionist"</li>
            </ul>
          </li>
          <li className="text-gray-700"><strong>Chat Interface:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• Test asking questions</li>
              <li>• Try booking an appointment</li>
              <li>• Verify emails are sent (check spam folder)</li>
            </ul>
          </li>
        </ol>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-green-800 mb-2">Part C Completion Check</h4>
          <p className="text-green-700 mb-2">Before completing Lab 1, ensure you have:</p>
          <ul className="text-green-700 space-y-1 text-sm">
            <li>✓ Forked the repository to your GitHub account</li>
            <li>✓ Cloned your fork to your computer</li>
            <li>✓ Installed frontend dependencies</li>
            <li>✓ Created .env file with all API keys</li>
            <li>✓ Application runs at http://localhost:3000</li>
            <li>✓ Free trial flow works end-to-end</li>
            <li>✓ Chat interface responds to messages</li>
            <li>✓ Appointment booking functions</li>
          </ul>
          <p className="text-green-700 mt-2 text-sm">
            <strong>Have all 8 items checked?</strong> → Lab 1 Complete! 🎉<br/>
            <strong>Missing something?</strong> → Complete the missing steps above
          </p>
        </div>

        <h2 id="troubleshooting" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Troubleshooting & Next Steps</h2>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Common Issues</h3>
        
        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">"npm install" fails:</p>
            <p className="text-gray-700">Try deleting <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">node_modules</code> and <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">package-lock.json</code>, then run <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">npm install</code> again</p>
          </div>
          
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Python virtual environment issues:</p>
            <p className="text-gray-700">Make sure you're in the project directory. Try <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">python3 -m venv venv</code> instead of <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">python -m venv venv</code></p>
          </div>
          
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Database connection errors:</p>
            <p className="text-gray-700">Verify your Neon connection string is correct. Make sure there are no extra spaces in <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">.env</code> file</p>
          </div>
          
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">API key not working:</p>
            <p className="text-gray-700">Double-check the key is copied correctly</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Prepare for Lab 2</h3>
        
        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Keep all your API keys handy</li>
          <li className="text-gray-700">Familiarize yourself with the chat interface</li>
          <li className="text-gray-700">Try uploading different business documents</li>
          <li className="text-gray-700">Think about how the AI decides when to book appointments</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <strong>Ready for Lab 2?</strong> You'll integrate real AI capabilities and start tracking performance with MLOps!
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Pro Tips</h3>
        
        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Save your API keys securely</strong> - never commit them to Git</li>
          <li className="text-gray-700"><strong>Use meaningful commit messages</strong> when pushing code</li>
          <li className="text-gray-700"><strong>Test thoroughly</strong> - the free trial flow is what your users will experience</li>
        </ul>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-2">Docker Setup (Optional)</h4>
          <p className="text-gray-700 mb-2">Install Docker Desktop:</p>
          <ol className="text-gray-700 space-y-1 text-sm ml-4">
            <li>1. Go to <a href="https://docker.com/get-started" className="text-blue-600 hover:text-blue-800 underline" target="_blank">docker.com/get-started</a></li>
            <li>2. Download for your OS</li>
            <li>3. Install and start Docker Desktop</li>
          </ol>
          <p className="text-gray-700 mt-2 text-sm">
            <strong>Note:</strong> We'll use Docker in Lab 5 for containerization
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <div>
            <Link href="/labs" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Labs
            </Link>
          </div>
          <div>
            <Link href="/labs/lab2" className="text-blue-600 hover:text-blue-700 font-medium">
              Lab 2: MLOps Integration →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}