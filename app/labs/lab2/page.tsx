import Link from "next/link";
import { CodeBlock } from "@/components/labs/code-block";

export default function Lab2Page() {
  return (
    <>
      {/* Lab Header */}
      <div className="mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4 sm:mb-6">
          <div className="text-center py-1 sm:py-0">
            <div className="text-sm sm:text-lg font-semibold text-blue-900">Intermediate</div>
            <div className="text-xs sm:text-sm text-blue-700">Level</div>
          </div>
          <div className="text-center py-1 sm:py-0">
            <div className="text-sm sm:text-lg font-semibold text-blue-900">Flask + Prometheus</div>
            <div className="text-xs sm:text-sm text-blue-700">Technology</div>
          </div>
        </div>

        <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
          Build a Flask MLOps service to track AI performance, integrate Prometheus for metrics monitoring, and implement comprehensive metrics collection for your AI receptionist.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none prose-sm sm:prose-base">
        <h2 id="overview" className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-4 sm:mb-6 text-gray-900">Lab Overview</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What You'll Do:</strong> Build a Flask MLOps service to track AI performance, integrate Prometheus for metrics monitoring, and implement comprehensive metrics collection for your AI receptionist
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
            You must complete Lab 1 and have a working Next.js application before starting Lab 2.
          </p>
        </div>

        <h2 id="prerequisites" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Prerequisites from Lab 1</h2>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Before starting Lab 2, ensure you completed Lab 1 and have:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Working Next.js app running at http://localhost:3000</li>
          <li className="text-gray-700">Environment file (.env) with these keys configured:</li>
        </ul>

        <CodeBlock language="env">{`DATABASE_URL="your_neon_connection_string"
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"`}</CodeBlock>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Neon database connected and working (test by creating a business in the app)</li>
          <li className="text-gray-700">Chat functionality working (you can ask questions and get AI responses)</li>
          <li className="text-gray-700">Appointment booking working (AI can transition to booking mode)</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">🔍 Quick Test</h4>
          <ol className="text-blue-700 space-y-1">
            <li>1. Go to http://localhost:3000</li>
            <li>2. Create a test business</li>
            <li>3. Chat with the AI and try booking an appointment</li>
            <li>4. If this works, you're ready for Lab 2!</li>
          </ol>
        </div>

        <h2 id="database-setup" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Complete Database Setup</h2>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          If you haven't set up Neon database yet, follow these steps:
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Step 1: Create Neon Database (If Not Done)</h3>
        
        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Go to <a href="https://neon.tech" className="text-blue-600 hover:text-blue-800 underline" target="_blank">neon.tech</a></strong> and sign up for free</li>
          <li className="text-gray-700"><strong>Create a new project</strong> called "ai-appointment-setter"</li>
          <li className="text-gray-700"><strong>Copy your connection string</strong> from the dashboard</li>
          <li className="text-gray-700"><strong>Add to your .env file:</strong></li>
        </ol>

        <CodeBlock language="env">{`DATABASE_URL="postgresql://username:password@host/database?sslmode=require"`}</CodeBlock>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Step 2: Create Required Tables</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>You need BOTH tables for Lab 2 to work:</strong>
        </p>

        <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Option A: Use the SQL files (Recommended)</h4>
        
        <CodeBlock language="bash">{`# Check if you have the SQL files
ls scripts/
# You should see: create-tables.sql and create-metrics-table.sql

# View the main tables SQL
cat scripts/create-tables.sql

# View the metrics table SQL  
cat scripts/create-metrics-table.sql`}</CodeBlock>

        <h4 className="text-lg font-semibold mt-6 mb-3 text-gray-900">Option B: Copy-paste this SQL</h4>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Go to your Neon database console and run BOTH scripts:</strong>
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>First, create the main tables (if not done in Lab 1):</strong>
        </p>
        <CodeBlock language="sql">{`-- Main application tables (from Lab 1) - Copy from scripts/create-tables.sql
-- This creates: businesses, documents, conversations, messages, appointments, business_settings
-- Run the entire contents of scripts/create-tables.sql in your Neon console`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Then, create the metrics table for Lab 2:</strong>
        </p>
        <CodeBlock language="sql">{`-- Create AI Metrics table for MLOps tracking
CREATE TABLE IF NOT EXISTS ai_metrics (
    id SERIAL PRIMARY KEY,
    business_id VARCHAR(255) NOT NULL,
    conversation_id VARCHAR(255),
    session_id VARCHAR(255) NOT NULL,
    
    -- Performance metrics
    response_time_ms INTEGER NOT NULL,
    success_rate DECIMAL(5,4) NOT NULL,
    
    -- AI performance metrics
    tokens_used INTEGER NOT NULL,
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    api_cost_usd DECIMAL(10,6) NOT NULL,
    model_name VARCHAR(100) NOT NULL,
    
    -- Business metrics
    intent_detected VARCHAR(50) NOT NULL,
    appointment_requested BOOLEAN DEFAULT FALSE,
    human_handoff_requested BOOLEAN DEFAULT FALSE,
    appointment_booked BOOLEAN DEFAULT FALSE,
    
    -- Message metrics
    user_message_length INTEGER NOT NULL,
    ai_response_length INTEGER NOT NULL,
    response_type VARCHAR(50) NOT NULL,
    
    -- Timestamp
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_metrics_business_id ON ai_metrics(business_id);
CREATE INDEX IF NOT EXISTS idx_ai_metrics_created_at ON ai_metrics(created_at);`}</CodeBlock>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Step 3: Verify Database Setup</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Test your database connection:</strong>
        </p>

        <CodeBlock language="sql">{`-- Check if all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- You should see: appointments, ai_metrics, businesses`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Test inserting data:</strong>
        </p>
        <CodeBlock language="sql">{`-- Test businesses table
INSERT INTO businesses (name, industry, description) 
VALUES ('Test Business', 'Healthcare', 'Test description');

-- Check it worked
SELECT * FROM businesses WHERE name = 'Test Business';

-- Test ai_metrics table structure
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'ai_metrics' 
ORDER BY ordinal_position;`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-green-800 mb-2">✅ Success indicators:</h4>
          <ul className="text-green-700 space-y-1">
            <li>• All 3 tables exist (businesses, appointments, ai_metrics)</li>
            <li>• You can insert and select from businesses table</li>
            <li>• ai_metrics table has all required columns</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">❌ Still having issues?</h4>
          <ul className="text-yellow-700 space-y-1">
            <li>• Check your DATABASE_URL format includes <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">?sslmode=require</code></li>
            <li>• Ensure you're using the correct database name from Neon</li>
            <li>• Try refreshing your Neon console and running SQL again</li>
          </ul>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Step 4: Environment Configuration Check</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Ensure your main .env file has:</strong>
        </p>
        <CodeBlock language="env">{`# Required for Lab 2
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
SECRET_KEY=change_this_to_something_secure
DEBUG=true`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Test your Next.js app works:</strong>
        </p>
        <CodeBlock language="bash">{`# Start your Next.js app
npm run dev

# Go to http://localhost:3000
# Create a test business
# Try chatting with the AI
# Try booking an appointment`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">🎯 Pre-Lab 2 Checklist</h4>
          <p className="text-blue-700 mb-2">Before starting Part A, verify you have:</p>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>✓ Neon database created and accessible</li>
            <li>✓ All tables created (businesses, appointments, ai_metrics, etc.)</li>
            <li>✓ DATABASE_URL in your .env file working</li>
            <li>✓ Next.js app running at http://localhost:3000</li>
            <li>✓ AI chat responding to messages</li>
            <li>✓ Appointment booking working in the chat</li>
          </ul>
        </div>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Quick test command:</strong>
        </p>
        <CodeBlock language="bash">{`# Test your complete database setup
node scripts/test-database-connection.js`}</CodeBlock>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-2">This test will verify:</h4>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Database connection works</li>
            <li>• All required tables exist</li>
            <li>• ai_metrics table has correct structure</li>
            <li>• You can insert and read data</li>
          </ul>
        </div>

        <p className="mb-6 text-gray-700 leading-relaxed">
          <strong>All checked?</strong> → Start Part A<br/>
          <strong>Issues?</strong> → Fix the failing items above first
        </p>

        <h2 id="part-a" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part A: Build Flask MLOps Service</h2>
        
        <p className="mb-6 text-gray-700 leading-relaxed italic">
          You'll create a separate Python service that tracks how well your AI is performing
        </p>

        <h3 id="project-structure" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Create Project Structure</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Create the MLOps service folder:</strong>
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Windows:</strong>
        </p>
        <CodeBlock language="cmd">{`# In your project root directory
mkdir mlops-service
cd mlops-service`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Mac/Linux:</strong>
        </p>
        <CodeBlock language="bash">{`# In your project root directory
mkdir mlops-service
cd mlops-service`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Create the basic file structure:</strong>
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Windows:</strong>
        </p>
        <CodeBlock language="cmd">{`# Create these files (we'll fill them in step by step)
echo. > app.py
echo. > requirements.txt
echo. > .env
echo. > start.bat`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Mac/Linux:</strong>
        </p>
        <CodeBlock language="bash">{`# Create these files (we'll fill them in step by step)
touch app.py
touch requirements.txt
touch .env
touch start.sh`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Create the basic file structure:</strong>
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Windows:</strong>
        </p>
        <CodeBlock language="cmd">{`# Create these files (we'll fill them in step by step)
echo. > app.py
echo. > requirements.txt
echo. > .env
echo. > start.bat`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Mac/Linux:</strong>
        </p>
        <CodeBlock language="bash">{`# Create these files (we'll fill them in step by step)
touch app.py
touch requirements.txt
touch .env
touch start.sh`}</CodeBlock>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-2">Your folder should now look like:</h4>
          <CodeBlock language="text">{`mlops-service/
├── app.py          # Main Flask application
├── requirements.txt # Python dependencies
├── .env            # Environment variables
└── start.sh        # Startup script`}</CodeBlock>
        </div>

        <h3 id="python-deps" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Python Dependencies</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Create requirements.txt:</strong>
        </p>

        <CodeBlock language="txt">{`# Flask MLOps Service Dependencies with Prometheus
# Lab 2: AI Lifecycle & MLOps Integration

# Core Flask dependencies
Flask==3.0.0
Flask-CORS==4.0.0

# Prometheus monitoring
prometheus-client==0.19.0

# Database connectivity - using requests for HTTP-based database access
# This avoids psycopg2 compilation issues on newer Python versions
requests==2.31.0

# Additional utilities
python-dotenv==1.0.0

# Development and testing (optional)
pytest==7.4.3
pytest-flask==1.3.0`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Create Python virtual environment:</strong>
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Windows:</strong>
        </p>
        <CodeBlock language="cmd">{`# Create virtual environment
python -m venv venv

# Activate it
venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Mac/Linux:</strong>
        </p>
        <CodeBlock language="bash">{`# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> Run <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">pip list</code> - you should see Flask, prometheus-client, and other packages installed.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 What You're Building</h4>
          <p className="text-blue-700 mb-2">This Flask service will:</p>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Receive metrics from your Next.js chat application</li>
            <li>• Track AI performance with Prometheus (industry standard)</li>
            <li>• Provide real-time monitoring dashboard</li>
            <li>• Store metrics for historical analysis</li>
          </ul>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-2">🪟 Windows Users - Important Notes</h4>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• Use <strong>Command Prompt</strong> or <strong>PowerShell</strong> (not Git Bash for Python commands)</li>
            <li>• Python command is usually <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">python</code> (not <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">python3</code>)</li>
            <li>• Virtual environment activation: <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">venv\\Scripts\\activate</code></li>
            <li>• Use <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">start.bat</code> instead of <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">start.sh</code></li>
          </ul>
        </div>

        <h3 id="env-vars" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Environment Variables</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Create .env file in mlops-service directory:</strong>
        </p>

        <CodeBlock language="env">{`# Database Configuration (same as your Next.js app)
DATABASE_URL=your_neon_database_url_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Service Configuration
ENVIRONMENT=development
SERVICE_PORT=5001
PROMETHEUS_PORT=8001`}</CodeBlock>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">🔑 Important Steps:</h4>
          <ol className="text-yellow-700 space-y-1">
            <li>1. <strong>Copy your DATABASE_URL</strong> from your main project .env file</li>
            <li>2. <strong>Use the EXACT same connection string</strong> - this connects to the same Neon database</li>
            <li>3. <strong>Keep the quotes</strong> around the DATABASE_URL value</li>
          </ol>
        </div>

        <h3 id="flask-app" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Flask Application</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Create app.py with the basic Flask setup:</strong>
        </p>

        <CodeBlock language="python">{`"""
Flask MLOps Service for AI Appointment Setter
This service tracks AI performance metrics and stores them for analysis
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST
import os
import json
import time
from datetime import datetime
import logging

# Configure logging so we can see what's happening
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from Next.js app

# Database connection
DATABASE_URL = os.getenv('DATABASE_URL')

@app.route('/health', methods=['GET'])
def health_check():
    """Check if our service is running properly"""
    return jsonify({
        'status': 'healthy',
        'service': 'mlops-service',
        'timestamp': datetime.utcnow().isoformat(),
        'monitoring': 'prometheus'
    })

if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=5001, debug=True)`}</CodeBlock>

        <h3 id="startup-script" className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. Startup Script</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Create start.sh (Mac/Linux):</strong>
        </p>

        <CodeBlock language="bash">{`#!/bin/bash

echo "🚀 Starting MLOps Service for AI Appointment Setter"
echo "=================================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

echo "✅ Setup complete!"
echo "🌐 Service will be available at: http://localhost:5001"
echo "Starting Flask application..."

# Start Flask application
python app.py`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Make it executable:</strong>
        </p>
        <CodeBlock language="bash">{`chmod +x start.sh`}</CodeBlock>

        <h3 id="test-flask" className="text-xl font-semibold mt-8 mb-4 text-gray-900">6. Test Flask Service</h3>
        
        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Start the service:</strong>
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Mac/Linux:</strong>
        </p>
        <CodeBlock language="bash">{`./start.sh`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Windows:</strong>
        </p>
        <CodeBlock language="cmd">{`start.bat`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Test the health endpoint:</strong>
        </p>
        <CodeBlock language="bash">{`# In a new terminal
curl http://localhost:5001/health`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>You should see:</strong>
        </p>
        <CodeBlock language="json">{`{
  "status": "healthy",
  "service": "mlops-service",
  "timestamp": "2024-01-15T10:30:00.000000",
  "monitoring": "prometheus"
}`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> If you see the healthy response, your Flask service is working!
          </p>
        </div>

        <h2 id="part-b" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part B: Prometheus Integration</h2>
        
        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Prometheus helps us track real-time metrics and see how our AI is performing over time
        </p>

        <h3 id="prometheus-setup" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Prometheus Setup</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Add Prometheus metrics to your app.py:</strong>
        </p>

        <CodeBlock language="python">{`# Prometheus Metrics Setup
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST

# Define Prometheus metrics
ai_requests_total = Counter('ai_requests_total', 'Total AI requests', ['business_id', 'intent', 'response_type'])
ai_response_time_seconds = Histogram('ai_response_time_seconds', 'AI response time in seconds', ['business_id'])
ai_tokens_used_total = Counter('ai_tokens_used_total', 'Total tokens used', ['business_id', 'model'])
ai_api_cost_usd_total = Counter('ai_api_cost_usd_total', 'Total API cost in USD', ['business_id'])
appointments_requested_total = Counter('appointments_requested_total', 'Total appointment requests', ['business_id'])

logger.info("Prometheus metrics initialized successfully")`}</CodeBlock>

        <h3 id="metrics-endpoint" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Metrics Endpoint</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Add this endpoint to your app.py:</strong>
        </p>

        <CodeBlock language="python">{`@app.route('/metrics', methods=['GET'])
def prometheus_metrics():
    """Prometheus metrics endpoint - industry standard format"""
    try:
        return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}
    except Exception as e:
        logger.error(f"Error generating Prometheus metrics: {e}")
        return jsonify({'error': 'Failed to generate metrics'}), 500`}</CodeBlock>

        <h3 id="prometheus-logging" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Prometheus Logging</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Add metrics tracking function:</strong>
        </p>

        <CodeBlock language="python">{`def update_prometheus_metrics(metrics_data):
    """Update Prometheus metrics with new data"""
    try:
        business_id = metrics_data.get('business_id', 'unknown')

        # Update request counter
        ai_requests_total.labels(
            business_id=business_id,
            intent=metrics_data.get('intent_detected', 'unknown'),
            response_type=metrics_data.get('response_type', 'unknown')
        ).inc()

        # Update response time histogram
        if 'response_time_ms' in metrics_data:
            response_time_seconds = metrics_data['response_time_ms'] / 1000.0
            ai_response_time_seconds.labels(business_id=business_id).observe(response_time_seconds)

        # Update token usage
        if 'tokens_used' in metrics_data:
            ai_tokens_used_total.labels(
                business_id=business_id,
                model=metrics_data.get('model_name', 'gemini-1.5-flash')
            ).inc(metrics_data['tokens_used'])

        logger.info(f"Successfully updated Prometheus metrics for business {business_id}")
        return True

    except Exception as e:
        logger.error(f"Error updating Prometheus metrics: {e}")
        return False`}</CodeBlock>

        <h3 id="update-tracking" className="text-xl font-semibold mt-8 mb-4 text-gray-900">4. Update Tracking</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Add the main tracking endpoint:</strong>
        </p>

        <CodeBlock language="python">{`@app.route('/track', methods=['POST'])
def track_metrics():
    """Receive metrics from the Next.js chat application"""
    try:
        metrics_data = request.get_json()

        if not metrics_data:
            return jsonify({'error': 'No metrics data provided'}), 400

        # Validate required fields
        required_fields = ['business_id', 'response_time_ms', 'tokens_used']
        for field in required_fields:
            if field not in metrics_data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Update Prometheus metrics
        prometheus_success = update_prometheus_metrics(metrics_data)

        if prometheus_success:
            logger.info(f"Successfully tracked metrics for business {metrics_data.get('business_id')}")
            return jsonify({
                'status': 'success',
                'message': 'Metrics tracked successfully',
                'timestamp': datetime.utcnow().isoformat()
            })
        else:
            return jsonify({'error': 'Failed to store metrics'}), 500

    except Exception as e:
        logger.error(f"Error tracking metrics: {e}")
        return jsonify({'error': 'Internal server error'}), 500`}</CodeBlock>

        <h3 id="test-prometheus" className="text-xl font-semibold mt-8 mb-4 text-gray-900">5. Test Prometheus</h3>
        
        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Send test metrics:</strong>
        </p>

        <CodeBlock language="bash">{`curl -X POST http://localhost:5001/track \\
  -H "Content-Type: application/json" \\
  -d '{
    "business_id": "test-business",
    "response_time_ms": 1500,
    "tokens_used": 150,
    "intent_detected": "general",
    "response_type": "text"
  }'`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Check Prometheus metrics:</strong>
        </p>

        <CodeBlock language="bash">{`curl http://localhost:5001/metrics`}</CodeBlock>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 What is Prometheus?</h4>
          <p className="text-blue-700 mb-2">Prometheus is an industry-standard monitoring system that tracks:</p>
          <ul className="text-blue-700 space-y-1">
            <li>• How fast your AI responds (real-time metrics)</li>
            <li>• How much each conversation costs</li>
            <li>• Which conversations lead to appointments</li>
            <li>• Performance trends over time</li>
            <li>• System health and reliability</li>
          </ul>
        </div>

        <h2 id="part-c" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part C: Next.js Integration</h2>
        
        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Now we'll modify your Next.js app to send performance data to your Flask service
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Add MLOps Service URL to your main .env file:</strong>
        </p>
        <CodeBlock language="env">{`# Add this line to your existing .env file
MLOPS_SERVICE_URL=http://localhost:5001`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          The metrics tracking is already implemented in your codebase! Check these files:
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>lib/mlops-tracking.ts</strong> - Contains all the metrics tracking functions</li>
          <li className="text-gray-700"><strong>app/api/chat/route.ts</strong> - Already calls trackMetrics() after each AI response</li>
          <li className="text-gray-700"><strong>lib/database.ts</strong> - Contains createAIMetrics() function for database storage</li>
        </ul>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-green-800 mb-2">✅ Integration Complete!</h4>
          <p className="text-green-700 mb-2">Your Next.js app automatically tracks:</p>
          <ul className="text-green-700 space-y-1 text-sm">
            <li>• Response times for each AI interaction</li>
            <li>• Token usage and estimated API costs</li>
            <li>• Intent detection and appointment requests</li>
            <li>• Success rates and error tracking</li>
          </ul>
        </div>

        <h2 id="troubleshooting" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Troubleshooting</h2>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Flask service won't start:</p>
            <p className="text-gray-700">Check that you're in the mlops-service directory and have activated the virtual environment</p>
          </div>
          
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Metrics not appearing:</p>
            <p className="text-gray-700">Ensure both Next.js (port 3000) and Flask (port 5001) services are running</p>
          </div>
          
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Database connection errors:</p>
            <p className="text-gray-700">Verify your DATABASE_URL is correctly copied from the main .env file</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Lab 2 Summary - What You Built</h2>
        
        <p className="mb-6 text-gray-700 leading-relaxed">
          Congratulations! You've successfully implemented a complete MLOps monitoring system for your AI appointment setter. Here's what you accomplished:
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">✅ Core MLOps Infrastructure</h3>
        
        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Flask MLOps Service</strong> running on port 5001 with cross-platform compatibility</li>
          <li className="text-gray-700"><strong>Prometheus Metrics Collection</strong> tracking real-time AI performance</li>
          <li className="text-gray-700"><strong>Database Integration</strong> for historical metrics storage</li>
          <li className="text-gray-700"><strong>Next.js Integration</strong> with automatic metrics collection</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">📊 Metrics You're Now Tracking</h3>
        
        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>AI Performance:</strong> Response times, token usage, API costs</li>
          <li className="text-gray-700"><strong>Business Metrics:</strong> Appointment requests, conversion rates, human handoffs</li>
          <li className="text-gray-700"><strong>System Health:</strong> Service status, error rates, success rates</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <strong>Note:</strong> This implementation uses HTTP-based database access to avoid psycopg2 compilation issues. Your metrics collection provides valuable insights for production AI systems.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🎯 Key URLs to Remember</h3>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <ul className="space-y-2">
            <li><strong>Health Check:</strong> <a href="http://localhost:5001/health" className="text-blue-600 hover:text-blue-800 underline" target="_blank">http://localhost:5001/health</a></li>
            <li><strong>Raw Metrics:</strong> <a href="http://localhost:5001/metrics" className="text-blue-600 hover:text-blue-800 underline" target="_blank">http://localhost:5001/metrics</a> (Prometheus format)</li>
          </ul>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <div>
            <Link href="/labs/lab1" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Lab 1: Foundation
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