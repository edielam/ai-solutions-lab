# Lab 1: Environment Setup & Project Introduction

**What You'll Do:** Create accounts for the services we need, install coding tools on your computer, and get the AI receptionist app running on your machine

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

---

## 🎯 Lab Overview

This lab has 3 main parts. **Complete each part fully before moving to the next.**

<details>
<summary><strong>📋 Full Checklist (Click to expand)</strong></summary>

### **Part A: Create Your Accounts**
- [ ] Create GitHub account and connect it to Git
- [ ] Sign up for Google Gemini API key
- [ ] Create AWS account (free tier)
- [ ] Sign up for Neon database
- [ ] Sign up for Resend email service

### **Part B: Install Development Tools**
- [ ] Install Node.js and npm
- [ ] Install Python 3.9+
- [ ] Install Git
- [ ] Install VS Code

### **Part C: Project Setup**
- [ ] Fork and clone repository
- [ ] Install dependencies
- [ ] Configure environment variables
- [ ] Run application locally
- [ ] Test complete flow

</details>

---

<details open>
<summary><h2>🔐 Part A: Create Your Accounts</h2></summary>

*All these services have free tiers - you won't pay anything during this course.*

<details>
<summary><h3>1. GitHub Setup</h3></summary>

**Create Account:**
1. Go to [github.com](https://github.com) and click "Sign up"
2. Use your student email if available (gets you free GitHub Pro features!)
3. Choose a professional username (you'll use this publicly)
4. Verify your email address

**Connect Git to GitHub:**

**📺 Video Tutorials by Platform:**
- **Windows:** [Git & GitHub Setup Tutorial](https://youtu.be/AdzKzlp66sQ?si=_B-0h1qM3OIV3bn5)
- **Mac:** [Git & GitHub Setup for Mac](https://www.youtube.com/watch?v=p0Js7IF17yI)
- **Linux:** [Git & GitHub Setup for Linux](https://www.youtube.com/watch?v=bc3_FL9zWWs)

**Quick Setup Commands:**
```bash
# Tell Git your name (use your real name)
git config --global user.name "Your Full Name"

# Tell Git your email (use the SAME email as your GitHub account)
git config --global user.email "your.email@example.com"
```

**Test Your Connection:**
```bash
# This should show your name and email
git config --global --list
```

**✅ Success Check:** If you see your name and email listed, you're ready to go!

</details>

<details>
<summary><h3>2. Google Gemini API</h3></summary>

**What You Need:**
- A Gmail or Google account (most people already have this!)

**Get Your AI Key:**
1. Search "google gemini api" in your browser
2. Click on the "Google AI Studio" link that appears
3. Sign in with your Google account
4. Click "Get Started"
5. Click "Get a new API key"
6. Follow the instructions to create your key
7. **Copy and save this key somewhere safe**

</details>

<details>
<summary><h3>3. AWS Account</h3></summary>

**Sign Up:**
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create a Free Account"
3. You'll need to verify your phone number and add a payment method (but you won't be charged)
4. Choose "Basic Support - Free" when asked

**Note:** We'll only use free services! This is for later when we deploy your app.

</details>

<details>
<summary><h3>4. Neon Database</h3></summary>

**Sign Up:**
1. Go to [neon.tech](https://neon.tech)
2. Click "Sign up with GitHub" (easiest option)
3. Create a new project and name it: "ai-receptionist-lab"
4. **Copy the connection string** - it looks like:
   ```
   postgresql://neondb_owner:abc123@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
5. **Save this entire string** - you'll paste it into your `.env` file next

</details>

<details>
<summary><h3>5. Resend Email Service</h3></summary>

<!-- NOTE: Email functionality not yet implemented in codebase - this is for future implementation -->

**Sign Up:**
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Once logged in, get your API key from the dashboard
4. **Save this key**

</details>

### ✅ Part A Completion Check

**Before proceeding to Part B, ensure you have:**
- [ ] GitHub account created and Git configured
- [ ] Google Gemini API key saved
- [ ] AWS account created
- [ ] Neon database project created with connection string saved
- [ ] Resend API key saved

**Have all 5 items checked?** → Proceed to Part B
**Missing something?** → Complete the missing steps above

</details>

<details>
<summary><h2>💻 Part B: Install Development Tools</h2></summary>

<details>
<summary><h3>1. Node.js Installation</h3></summary>

**All Platforms:**
1. Go to [nodejs.org](https://nodejs.org)
2. Download **LTS version** (v18 or v20)
3. Install with default settings

**Verify:**
```bash
node --version
npm --version
```

</details>

<details>
<summary><h3>2. Python Installation</h3></summary>

**Windows:**
1. Go to [python.org/downloads](https://python.org/downloads)
2. Download Python 3.9 or newer
3. **Check "Add Python to PATH"** during installation

**macOS:**
```bash
brew install python@3.9
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

**Verify:**
```bash
python --version  # or python3 --version
pip --version      # or pip3 --version
```

</details>

<details>
<summary><h3>3. Git Installation</h3></summary>

**Windows:**
1. Download from [git-scm.com](https://git-scm.com)
2. Install with default settings

**macOS:**
```bash
# Git usually comes pre-installed, if not:
brew install git
```

**Linux:**
```bash
sudo apt install git
```

**Verify:**
```bash
git --version
```

</details>

<details>
<summary><h3>4. Code Editor (Recommended)</h3></summary>

**Visual Studio Code:**
1. Download from [code.visualstudio.com](https://code.visualstudio.com)
2. Install helpful extensions:
   - Python
   - JavaScript ES6 code snippets
   - Prettier - Code formatter

</details>

### ✅ Part B Completion Check

**Before proceeding to Part C, ensure you have:**
- [ ] Node.js and npm installed and verified
- [ ] Python 3.9+ installed and verified
- [ ] Git installed and verified
- [ ] VS Code installed with recommended extensions

**Have all 4 items checked?** → Proceed to Part C
**Missing something?** → Complete the missing steps above

</details>

<details>
<summary><h2>🚀 Part C: Project Setup</h2></summary>

<details>
<summary><h3>1. Fork Repository</h3></summary>

**Why Fork?** You need your own copy to make changes throughout the course.

1. Go to: https://github.com/edielam/ai-solutions-lab
2. Click the **"Fork"** button (top-right corner)
3. This creates your personal copy at `https://github.com/YOUR_USERNAME/ai-solutions-lab`

</details>

<details>
<summary><h3>2. Clone Your Fork</h3></summary>

**Important:** Clone YOUR fork, not the original repository!

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git clone https://github.com/YOUR_USERNAME/ai-solutions-lab.git
cd ai-solutions-lab
```

</details>

<details>
<summary><h3>3. Install Dependencies</h3></summary>

**Frontend (Next.js):**
```bash
npm install
```

**Backend (Python):**
*No backend setup needed for Lab 1 - we'll do this in later labs.*

</details>

<details>
<summary><h3>4. Environment Configuration</h3></summary>

Create `.env` file in the root directory:

```env
# Database (from Neon)
DATABASE_URL=your_neon_connection_string_here

# AI API (from Google)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Email Service (from Resend) - NOTE: Not yet implemented, placeholder for future
RESEND_API_KEY=your_resend_api_key_here

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
SECRET_KEY=change_this_to_something_secure
DEBUG=true
```

</details>

<details>
<summary><h3>5. Run the Application</h3></summary>

**Start Frontend:**
```bash
npm run dev
```

**Open Browser:**
Go to [http://localhost:3000](http://localhost:3000)

</details>

<details>
<summary><h3>6. Test the Complete Flow</h3></summary>

1. **Landing Page**: Click "TRY IT FREE - NO SIGNUP"
2. **Business Setup**: 
   - Enter business name and description
   - Choose a brand color
   - Click "Continue to Documents"
3. **Document Upload**: 
   - Skip for now or upload a sample document
   - Click "Continue"
4. **Generated URL**: 
   - Copy your unique chat URL
   - Click "Try Your AI Receptionist"
5. **Chat Interface**: 
   - Test asking questions
   - Try booking an appointment
   - Verify emails are sent (check spam folder)

</details>

### ✅ Part C Completion Check

**Before completing Lab 1, ensure you have:**
- [ ] Forked the repository to your GitHub account
- [ ] Cloned your fork to your computer
- [ ] Installed frontend dependencies
- [ ] Created `.env` file with all API keys
- [ ] Application runs at http://localhost:3000
- [ ] Free trial flow works end-to-end
- [ ] Chat interface responds to messages
- [ ] Appointment booking functions

**Have all 8 items checked?** → Lab 1 Complete! 🎉
**Missing something?** → Complete the missing steps above

</details>

---

<details>
<summary><h2>🐳 Part D: Docker Setup (Optional)</h2></summary>

**Install Docker Desktop:**
1. Go to [docker.com/get-started](https://docker.com/get-started)
2. Download for your OS
3. Install and start Docker Desktop

**Verify:**
```bash
docker --version
docker run hello-world
```

**Note:** We'll use Docker in Lab 5 for containerization

</details>

---

<details>
<summary><h2>🚨 Troubleshooting</h2></summary>

**"npm install" fails:**
- Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

**Python virtual environment issues:**
- Make sure you're in the project directory
- Try `python3 -m venv venv` instead of `python -m venv venv`

**Database connection errors:**
- Verify your Neon connection string is correct
- Make sure there are no extra spaces in `.env` file

**API key not working:**
- Double-check the key is copied correctly

</details>

---

<details>
<summary><h2>📚 Next Steps & Pro Tips</h2></summary>

**Prepare for Lab 2:**
- Keep all your API keys handy
- Familiarize yourself with the chat interface
- Try uploading different business documents
- Think about how the AI decides when to book appointments

**Ready for Lab 2?** You'll integrate real AI capabilities and start tracking performance with MLflow!

**💡 Pro Tips:**
- **Save your API keys securely** - never commit them to Git
- **Use meaningful commit messages** when pushing code
- **Test thoroughly** - the free trial flow is what your users will experience

</details>
