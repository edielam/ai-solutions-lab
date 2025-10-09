# Lab 5: Containerization with Docker

**Level:** Advanced
**Technology:** Docker

Learn Docker basics and containerize your Flask MLOps service for consistent deployment across different environments.

## Lab Overview

**What You'll Do:** Install Docker, understand containerization basics, and containerize your Flask MLOps service to prepare for cloud deployment

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

## 🚨 Prerequisites Required

You must complete Labs 1-4 with a working Flask MLOps service before starting Lab 5.

## Prerequisites Check

**Before starting Lab 5, ensure you have:**

- ✅ Working Flask MLOps service from Lab 2
- ✅ Passing tests from Lab 3
- ✅ GitHub Actions pipeline from Lab 4
- ✅ Flask service runs locally on port 5001

### 🔍 Quick Test

**Mac/Linux:**
1. `cd mlops-service`
2. `source venv/bin/activate`
3. `python app.py`

**Windows:**
1. `cd mlops-service`
2. `venv\Scripts\activate`
3. `python app.py`

**All Platforms:**
4. Visit http://localhost:5001/health - should return healthy status
5. If this works, you're ready for Lab 5!

### 📝 Important Note

In this lab, we'll ONLY containerize the Flask MLOps service. Your Next.js app will continue running locally with `npm run dev` and will eventually be deployed to Vercel (not containerized).

---

## Part A: Understanding Docker

*Learn what Docker is and why it's essential for modern application deployment*

### 1. What is Docker?

**Docker** is a platform that packages your application and all its dependencies into a standardized unit called a **container**.

**💡 Think of it this way:**

A container is like a shipping container for your code:
- Contains everything needed to run your app (code, Python, libraries, etc.)
- Works the same way on any computer (your laptop, AWS, Google Cloud)
- Isolated from other applications
- Easy to start, stop, and move around

### 2. Why Use Docker?

**The "Works on My Machine" Problem:**

- ❌ Your Flask app works on your laptop but breaks on the server
- ❌ Different Python versions cause issues
- ❌ Missing dependencies or libraries
- ❌ Environment variable conflicts

**Docker Solution:**

- ✅ Package your app with exact Python version
- ✅ Include all dependencies
- ✅ Run the same container anywhere
- ✅ Consistent behavior across development, testing, and production

### 3. Key Docker Concepts

**Docker Image**
- A blueprint/template for your container
- Like a recipe that describes how to build your container

**Container**
- A running instance of an image
- Like the actual meal made from the recipe

**Dockerfile**
- A text file with instructions to build a Docker image
- Contains steps like "install Python", "copy code", "install dependencies"

**Docker Hub**
- A repository of pre-built images (like GitHub for Docker images)
- We'll use Python base images from here

---

## Part B: Install Docker

*Get Docker Desktop installed on your computer*

### 1. Install Docker Desktop

**All Platforms:**

1. Go to [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)
2. Download Docker Desktop for your operating system
3. Install with default settings
4. Start Docker Desktop (it will run in the background)

**⚠️ System Requirements:**
- **Windows:** Windows 10 64-bit or newer, WSL 2 enabled
- **Mac:** macOS 10.15 or newer
- **Linux:** Most modern distributions supported

### 2. Verify Installation

**Open a terminal and run:**

```bash
# Check Docker version
docker --version

# Check Docker is running
docker ps

# Test with hello-world container
docker run hello-world
```

**✅ Success Check:** If you see "Hello from Docker!" message, Docker is installed correctly!

---

## Part C: Containerize Flask MLOps Service

*Create a Docker container for your Flask service*

### 1. Create Dockerfile

Your repository already includes a Dockerfile in the `mlops-service/` directory. Let's understand what it does:

**View the Dockerfile:**

**Mac/Linux:**
```bash
cd mlops-service
cat Dockerfile
```

**Windows (Command Prompt):**
```cmd
cd mlops-service
type Dockerfile
```

**Windows (PowerShell):**
```powershell
cd mlops-service
Get-Content Dockerfile
```

**Understanding each line:**

```dockerfile
# Start from official Python 3.11 image
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
CMD ["python", "app.py"]
```

**💡 What Each Command Does:**
- `FROM`: Base image to start from (Python 3.11)
- `WORKDIR`: Sets the working directory inside container
- `COPY`: Copies files from your computer to the container
- `RUN`: Executes commands during image build
- `EXPOSE`: Documents which port the app uses
- `CMD`: Command to run when container starts

### 2. Create .dockerignore File

Just like `.gitignore`, we need a `.dockerignore` file to exclude unnecessary files from the Docker image.

**Check if .dockerignore exists:**

**Mac/Linux:**
```bash
# In mlops-service directory
ls -la .dockerignore
```

**Windows (Command Prompt):**
```cmd
REM In mlops-service directory
dir .dockerignore
```

**Windows (PowerShell):**
```powershell
# In mlops-service directory
ls .dockerignore
```

**The .dockerignore file should contain:**

```text
# Virtual environment
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
*.md
```

### 3. Build Docker Image

**Build your first Docker image (works on all platforms):**

```bash
# Make sure you're in the mlops-service directory
cd mlops-service

# Build the Docker image
# -t names the image "mlops-service"
# . means use current directory as build context
docker build -t mlops-service .
```

**💡 Note:** Docker commands are the same on Windows, Mac, and Linux! Once Docker Desktop is installed, use the same commands everywhere.

**What happens during the build:**

1. Docker downloads the Python 3.11 base image
2. Creates a working directory
3. Installs all Python dependencies from requirements.txt
4. Copies your Flask application code
5. Creates a complete image ready to run

**Verify the image was created:**

```bash
# List Docker images
docker images

# You should see mlops-service in the list
```

**✅ Success Check:** If you see `mlops-service` in the images list, your image is built successfully!

### 4. Run Docker Container

**Start your containerized Flask service:**

**Mac/Linux:**
```bash
# Run the container
docker run -d \
  --name mlops-container \
  -p 5001:5001 \
  -e DATABASE_URL="your_database_url_here" \
  -e FLASK_ENV=development \
  mlops-service
```

**Windows (Command Prompt):**
```cmd
REM Run the container
docker run -d ^
  --name mlops-container ^
  -p 5001:5001 ^
  -e DATABASE_URL="your_database_url_here" ^
  -e FLASK_ENV=development ^
  mlops-service
```

**Windows (PowerShell):**
```powershell
# Run the container
docker run -d `
  --name mlops-container `
  -p 5001:5001 `
  -e DATABASE_URL="your_database_url_here" `
  -e FLASK_ENV=development `
  mlops-service
```

**Explanation:**
- `-d`: Run in detached mode (background)
- `--name`: Give container a friendly name
- `-p 5001:5001`: Map port 5001 from container to your computer
- `-e`: Set environment variables
- `mlops-service`: The image to run

**💡 Line Continuation Characters:**
- **Mac/Linux:** Use backslash `\` at end of line
- **Windows Command Prompt:** Use caret `^` at end of line
- **Windows PowerShell:** Use backtick `` ` `` at end of line

**🔑 Environment Variables:** Replace `your_database_url_here` with your actual Neon database URL from your `.env` file.

**Check if container is running:**

```bash
# List running containers
docker ps

# You should see mlops-container in the list
```

### 5. Test Containerized Service

**Test the health endpoint:**

```bash
curl http://localhost:5001/health
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

**Test Prometheus metrics:**

```bash
curl http://localhost:5001/metrics
```

**✅ Success Check:** If both endpoints work, your containerized Flask service is running correctly!

### 6. Test with Next.js Application

**Now test that your Next.js app can communicate with the containerized Flask service:**

1. Make sure the Docker container is running (`docker ps`)
2. In a new terminal, start your Next.js app: `npm run dev`
3. Go to http://localhost:3000
4. Chat with the AI
5. Check http://localhost:5001/metrics to see if new metrics appear

**✅ Success Indicators:**
- Next.js app loads at http://localhost:3000
- AI chat responds to your messages
- Prometheus metrics update at http://localhost:5001/metrics
- No errors in Docker logs

---

## Part D: Docker Container Management

*Learn essential Docker commands for managing your containers*

### 1. Essential Docker Commands

**View container logs:**

```bash
# View logs from your container
docker logs mlops-container

# Follow logs in real-time (like tail -f)
docker logs -f mlops-container
```

**Stop the container:**

```bash
docker stop mlops-container
```

**Start the container again:**

```bash
docker start mlops-container
```

**Restart the container:**

```bash
docker restart mlops-container
```

**Remove the container:**

```bash
# Stop first, then remove
docker stop mlops-container
docker rm mlops-container
```

**Remove the image:**

```bash
docker rmi mlops-service
```

### 2. Debugging Containers

**Execute commands inside a running container:**

**Mac/Linux:**
```bash
# Open a shell inside the container
docker exec -it mlops-container /bin/bash

# Once inside, you can:
# - Check files: ls -la
# - View environment: env
# - Test Python: python --version
# - Exit: exit
```

**Windows:**
```cmd
REM Open a shell inside the container
docker exec -it mlops-container /bin/bash

REM Once inside, you can:
REM - Check files: ls -la
REM - View environment: env
REM - Test Python: python --version
REM - Exit: exit
```

**💡 Note:** Once inside the container, you're in a Linux environment regardless of your host OS. The commands inside the container are the same for all platforms.

**View container resource usage:**

```bash
docker stats mlops-container
```

**Inspect container details:**

```bash
docker inspect mlops-container
```

---

## Part E: Docker Compose (Optional)

*Use docker-compose for easier container management*

### 1. What is Docker Compose?

**Docker Compose** is a tool for defining and running Docker applications using a YAML configuration file. Instead of typing long docker commands, you define everything in a file.

**💡 Benefits:**
- No need to remember complex docker run commands
- Easy to share configuration with team
- Start/stop everything with one command
- Environment variables managed in one place

### 2. Create docker-compose.yml

Your repository already includes a `docker-compose.yml` file in the `mlops-service/` directory.

**View the file:**

**Mac/Linux:**
```bash
cat mlops-service/docker-compose.yml
```

**Windows (Command Prompt):**
```cmd
type mlops-service\docker-compose.yml
```

**Windows (PowerShell):**
```powershell
Get-Content mlops-service/docker-compose.yml
```

**Understanding the configuration:**

```yaml
version: '3.8'

services:
  mlops-service:
    build: .
    container_name: mlops-container
    ports:
      - "5001:5001"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - FLASK_ENV=development
      - FLASK_DEBUG=True
    restart: unless-stopped
    volumes:
      - ./logs:/app/logs
```

### 3. Create .env File for Docker Compose

Docker Compose can read environment variables from a `.env` file.

**Your mlops-service/.env should have:**

```env
# Database Configuration
DATABASE_URL=your_neon_database_url_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Service Configuration
SERVICE_PORT=5001
```

### 4. Use Docker Compose

**Start the service with Docker Compose (same on all platforms):**

```bash
# Navigate to mlops-service directory
cd mlops-service

# Build and start the container
docker-compose up -d

# -d runs in detached mode (background)
```

**💡 Note:** Docker Compose commands are identical on Windows, Mac, and Linux!

**View logs:**

```bash
docker-compose logs -f
```

**Stop the service:**

```bash
docker-compose down
```

**Rebuild and restart after code changes:**

```bash
docker-compose up -d --build
```

**✅ Much Easier!** Docker Compose simplifies container management with simple commands.

---

## Troubleshooting

**Port 5001 already in use:**
- Stop any local Flask service running on port 5001, or use a different port in docker run command: `-p 5002:5001`

**Container exits immediately:**
- Check logs with `docker logs mlops-container` - usually missing environment variables

**Cannot connect to database:**
- Verify DATABASE_URL is correct and includes `?sslmode=require`

**Docker build fails:**
- Ensure you're in the mlops-service directory and requirements.txt exists

**Next.js can't reach Flask:**
- Check MLOPS_SERVICE_URL in main .env is set to http://localhost:5001

---

## Lab 5 Summary - What You Built

Congratulations! You've successfully containerized your Flask MLOps service. Here's what you accomplished:

### ✅ Docker Skills Gained

- **Docker Fundamentals:** Understanding containers, images, and Dockerfiles
- **Containerization:** Packaged Flask service with all dependencies
- **Container Management:** Start, stop, debug, and monitor containers
- **Docker Compose:** Simplified container orchestration (optional)

### 🚀 What You Can Now Do

- **Consistent Environment:** Flask service runs the same everywhere
- **Easy Deployment:** Ready to deploy to any cloud platform
- **Isolated Service:** No conflicts with other applications
- **Professional Workflow:** Industry-standard containerization

### 🎯 Why This Matters

You've now containerized your Flask MLOps service, which is the first step toward cloud deployment. In upcoming labs, you'll deploy this container to AWS, Google Cloud, or Azure. Your Next.js app will stay on Vercel (no containerization needed), while your Flask service runs in the cloud.

**Industry Relevance:** Docker is the standard for deploying applications in production. Companies like Netflix, Uber, and Spotify use Docker to deploy thousands of services.

### 📝 Key Takeaways

- Containers solve the "works on my machine" problem
- Dockerfile defines how to build your container image
- Docker images are blueprints, containers are running instances
- Docker Compose simplifies multi-container applications
- Only the Flask service needs containerization (Next.js stays on Vercel)

---

**Navigation:**
- [← Lab 4: Deployment Pipelines](/labs/lab4)
- [Back to Labs →](/labs)
