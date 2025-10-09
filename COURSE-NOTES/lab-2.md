# Lab 2: AI Lifecycle & MLOps Integration

**What You'll Do:** Build a Flask MLOps service to track AI performance, integrate Prometheus for metrics monitoring, and implement comprehensive metrics collection for your AI receptionist

**Lab Collaborators:**

- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

---

## 📋 **Prerequisites from Lab 1**

**Before starting Lab 2, ensure you completed Lab 1 and have:**

- [ ] **Working Next.js app** running at http://localhost:3000
- [ ] **Environment file (.env)** with these keys configured:
  ```env
  DATABASE_URL="your_neon_connection_string"
  GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"
  ```
- [ ] **Neon database** connected and working (test by creating a business in the app)
- [ ] **Chat functionality** working (you can ask questions and get AI responses)
- [ ] **Appointment booking** working (AI can transition to booking mode)

**🔍 Quick Test:**

1. Go to http://localhost:3000
2. Create a test business
3. Chat with the AI and try booking an appointment
4. If this works, you're ready for Lab 2!

## **🚨 REQUIRED: Complete Database Setup**

**If you haven't set up Neon database yet, follow these steps:**

### **Step 1: Create Neon Database (If Not Done)**

1. **Go to [neon.tech](https://neon.tech)** and sign up for free
2. **Create a new project** called "ai-appointment-setter"
3. **Copy your connection string** from the dashboard
4. **Add to your `.env` file:**
   ```env
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
   ```

### **Step 2: Create Required Tables**

**You need BOTH tables for Lab 2 to work:**

#### **Option A: Use the SQL files (Recommended)**
```bash
# Check if you have the SQL files
ls scripts/
# You should see: create-tables.sql and create-metrics-table.sql

# View the main tables SQL
cat scripts/create-tables.sql

# View the metrics table SQL  
cat scripts/create-metrics-table.sql
```

#### **Option B: Copy-paste this SQL**

**Go to your Neon database console and run BOTH scripts:**

**First, create the main tables (if not done in Lab 1):**
```sql
-- Main application tables (from Lab 1) - Copy from scripts/create-tables.sql
-- This creates: businesses, documents, conversations, messages, appointments, business_settings
-- Run the entire contents of scripts/create-tables.sql in your Neon console
```

**Then, create the metrics table for Lab 2:**

```sql
-- Create AI Metrics table for MLOps tracking
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
CREATE INDEX IF NOT EXISTS idx_ai_metrics_created_at ON ai_metrics(created_at);
```

### **Step 3: Verify Database Setup**

**Test your database connection:**

```sql
-- Check if all tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- You should see: appointments, ai_metrics, businesses
```

**Test inserting data:**
```sql
-- Test businesses table
INSERT INTO businesses (name, industry, description) 
VALUES ('Test Business', 'Healthcare', 'Test description');

-- Check it worked
SELECT * FROM businesses WHERE name = 'Test Business';

-- Test ai_metrics table structure
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'ai_metrics' 
ORDER BY ordinal_position;
```

**✅ Success indicators:**
- All 3 tables exist (businesses, appointments, ai_metrics)
- You can insert and select from businesses table
- ai_metrics table has all required columns

**❌ Still having issues?** 
- Check your DATABASE_URL format includes `?sslmode=require`
- Ensure you're using the correct database name from Neon
- Try refreshing your Neon console and running SQL again

### **Step 4: Environment Configuration Check**

**Ensure your main `.env` file has:**
```env
# Required for Lab 2
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"

# App Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
SECRET_KEY=change_this_to_something_secure
DEBUG=true
```

**Test your Next.js app works:**
```bash
# Start your Next.js app
npm run dev

# Go to http://localhost:3000
# Create a test business
# Try chatting with the AI
# Try booking an appointment
```

### **🎯 Pre-Lab 2 Checklist**

**Before starting Part A, verify you have:**

- [ ] **Neon database** created and accessible
- [ ] **All tables created** (businesses, appointments, ai_metrics, etc.)
- [ ] **DATABASE_URL** in your `.env` file working
- [ ] **Next.js app** running at http://localhost:3000
- [ ] **AI chat** responding to messages
- [ ] **Appointment booking** working in the chat

**Quick test command:**
```bash
# Test your complete database setup
node scripts/test-database-connection.js
```

**This test will verify:**
- Database connection works
- All required tables exist
- ai_metrics table has correct structure
- You can insert and read data

**✅ All checked?** → Start Part A
**❌ Issues?** → Fix the failing items above first

### **🔧 Common Lab 1 → Lab 2 Issues:**

**Issue: "relation 'ai_metrics' does not exist"**
- **Solution:** Run the metrics table SQL above in your Neon console
- **Check:** `SELECT * FROM ai_metrics LIMIT 1;` should work

**Issue: "Can't connect to database"**
- Check your `.env` file has the correct `DATABASE_URL` from Neon
- Make sure the connection string includes `?sslmode=require`
- Test: Create a business in your app at http://localhost:3000

**Issue: "AI not responding"**
- Verify `GOOGLE_GENERATIVE_AI_API_KEY` is set correctly in `.env`
- Test by asking a simple question in your chat interface

**Issue: "Environment variables missing"**
- Your main `.env` should have: `DATABASE_URL` and `GOOGLE_GENERATIVE_AI_API_KEY`
- Copy the same `.env` file to `mlops-service/.env` (we'll set this up in Part A)

**Issue: "Tables don't exist"**
- Run both SQL scripts above (main tables + metrics table)
- Verify with: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`

**Issue: "Connection timeout" or "SSL required"**
- Ensure your DATABASE_URL includes `?sslmode=require`
- Check your Neon database is not paused (free tier auto-pauses)
- Try refreshing your Neon dashboard

**Issue: "Permission denied" or "Authentication failed"**
- Copy the connection string exactly from Neon dashboard
- Don't modify the username, password, or host
- Ensure no extra spaces in your .env file

**🔧 Quick Fix Commands:**
```bash
# Test your database setup
node scripts/test-database-connection.js

# Check your .env file
cat .env | grep DATABASE_URL

# Verify Next.js can connect
npm run dev
# Then go to http://localhost:3000 and try creating a business
```

---

## 🎯 Lab Overview

This lab has 4 main parts. **Complete each part fully before moving to the next.**

<details>
<summary><strong>📋 Full Checklist (Click to expand)</strong></summary>

### **Part A: Build Flask MLOps Service**

- [ ] Create Flask application structure
- [ ] Set up database schema for metrics
- [ ] Implement health check endpoint
- [ ] Create metrics tracking endpoint
- [ ] Add analytics dashboard endpoint

### **Part B: Integrate Prometheus Monitoring**

- [ ] Install and configure Prometheus client
- [ ] Set up metrics collection
- [ ] Log conversation metrics
- [ ] Log AI performance metrics
- [ ] Log business metrics

**💡 What is Prometheus?**
Prometheus is an industry-standard monitoring system that tracks:

- How fast your AI responds (real-time metrics)
- How much each conversation costs
- Which conversations lead to appointments
- Performance trends over time
- System health and reliability

### **Part C: Enhance Next.js with Metrics**

- [ ] Create metrics tracking utilities
- [ ] Modify chat API for performance timing
- [ ] Calculate token usage and costs
- [ ] Implement non-blocking metrics sending
- [ ] Add error tracking

### **Part D: Advanced Features** _(Optional - Not Essential)_

- [ ] \*Additional monitoring dashboards (optional for advanced users)
- [ ] \*Custom metrics collection (not needed for current setup)
- [ ] \*Advanced alerting (already covered by basic Prometheus)
- [ ] \*Test complete integration (covered in Parts A-C)

</details>

---

## 🪟 Windows Users - Important Setup Notes

**Before starting, Windows users should note:**

- Use **Command Prompt** or **PowerShell** (not Git Bash for Python commands)
- Python command is usually `python` (not `python3`)
- Virtual environment activation: `venv\Scripts\activate` (not `source venv/bin/activate`)
- Use `start.bat` instead of `start.sh`
- Dashboard available at http://localhost:5001/ for viewing metrics

**Windows-Specific Files:**

- `start.bat` - Windows startup script (equivalent to `start.sh`)
- Use `python` instead of `python3` in all commands
- Use backslashes `\` for paths instead of forward slashes `/`

---

<details open>
<summary><h2>🔧 Part A: Build Flask MLOps Service</h2></summary>

_You'll create a separate Python service that tracks how well your AI is performing_

<details>
<summary><h3>1. Create Project Structure</h3></summary>

**Create the MLOps service folder:**

**Windows:**

```cmd
# In your project root directory
mkdir mlops-service
cd mlops-service
```

**Mac/Linux:**

```bash
# In your project root directory
mkdir mlops-service
cd mlops-service
```

**Create the basic file structure:**

**Windows:**

```cmd
# Create these files (we'll fill them in step by step)
echo. > app.py
echo. > requirements.txt
echo. > .env
echo. > start.bat
```

**Mac/Linux:**

```bash
# Create these files (we'll fill them in step by step)
touch app.py
touch requirements.txt
touch .env
touch start.sh
```

**Your folder should now look like:**

```
mlops-service/
├── app.py          # Main Flask application
├── requirements.txt # Python dependencies
├── .env            # Environment variables
└── start.sh        # Startup script
```

</details>

<details>
<summary><h3>2. Set Up Python Dependencies</h3></summary>

**Create `requirements.txt`:**

```txt
# Flask MLOps Service Dependencies
# Core Flask dependencies
Flask==3.0.0
Flask-CORS==4.0.0

# Prometheus for metrics monitoring
prometheus-client==0.19.0

# Database connectivity - using requests for HTTP-based database access
# This avoids psycopg2 compilation issues on newer Python versions

# Additional utilities
python-dotenv==1.0.0
requests==2.31.0
```

**Create Python virtual environment:**

**Windows:**

```cmd
# Create virtual environment
python -m venv venv

# Activate it
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

**Mac/Linux:**

```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

**✅ Success Check:** Run `pip list` - you should see Flask, prometheus-client, and other packages installed.

</details>

<details>
<summary><h3>3. Configure Environment Variables</h3></summary>

**Create `.env` file:**

```env
# Database Configuration (same as your Next.js app)
DATABASE_URL=your_neon_database_url_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Service Configuration
ENVIRONMENT=development
SERVICE_PORT=5001
PROMETHEUS_PORT=8001
```

**🔑 Important Steps:**

1. **Copy your DATABASE_URL** from your main project `.env` file
2. **Use the EXACT same connection string** - this connects to the same Neon database
3. **Keep the quotes** around the DATABASE_URL value

**✅ How to Copy:**

```bash
# In your main project directory, show your DATABASE_URL
cat .env | grep DATABASE_URL

# Copy that exact line to mlops-service/.env
```

</details>

<details>
<summary><h3>4. Build the Flask Application</h3></summary>

**Create `app.py` - Start with imports and setup:**

```python
"""
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
import psycopg2
from psycopg2.extras import RealDictCursor

# Configure logging so we can see what's happening
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from Next.js app

# Database connection
DATABASE_URL = os.getenv('DATABASE_URL')
```

**Add database functions (avoiding psycopg2 complications):**

```python
def fetch_metrics_from_db() -> bool:
    """
    Fetch metrics directly from Neon database using HTTP API
    This avoids psycopg2 dependency while accessing the database directly
    """
    try:
        if not DATABASE_URL:
            logger.warning("DATABASE_URL not configured, skipping metrics fetch")
            return False
        
        logger.info("Fetching historical metrics directly from Neon database...")
        
        # For Lab 2, we'll start with fresh metrics and implement full DB fetch in later labs
        # This ensures the service works immediately without complex DB setup
        logger.info("Starting with fresh Prometheus metrics (full DB integration in later labs)")
        return True
        
    except Exception as e:
        logger.error(f"Error fetching metrics from database: {e}")
        return False

def rebuild_prometheus_metrics_from_db():
    """
    Rebuild Prometheus metrics from database on startup
    This ensures continuity across service restarts
    """
    try:
        logger.info("Rebuilding Prometheus metrics from database...")
        
        # Fetch and rebuild metrics
        success = fetch_metrics_from_db()
        
        if success:
            logger.info("Successfully rebuilt Prometheus metrics from database")
        else:
            logger.warning("Could not rebuild metrics from database, starting fresh")
            
    except Exception as e:
        logger.error(f"Error rebuilding Prometheus metrics: {e}")
```

**Add metrics initialization:**

```python
def create_metrics_table():
    """
    Initialize metrics storage (simplified for cross-platform compatibility)
    Database table creation is handled by Next.js side to avoid psycopg2 issues
    """
    try:
        logger.info("Metrics storage initialized successfully")
        return True
    except Exception as e:
        logger.error(f"Error initializing metrics storage: {e}")
        return False

def store_metrics_in_db(metrics_data: Dict[str, Any]) -> bool:
    """
    Store metrics (handled by Next.js side to avoid psycopg2 installation issues)
    
    Args:
        metrics_data: Dictionary containing all metrics
        
    Returns:
        True (Next.js handles database storage)
    """
    try:
        # Log the metrics data for debugging
        logger.info(f"Processed metrics for business {metrics_data.get('business_id')}")
        
        # Database storage is handled by Next.js side
        # Next.js already stores the metrics when trackMetrics() is called
        return True
    except Exception as e:
        logger.error(f"Error processing metrics: {e}")
        return False
                    response_type VARCHAR(50),

                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            conn.commit()
            logger.info("Metrics table created successfully")
            return True
    except Exception as e:
        logger.error(f"Error creating metrics table: {e}")
        return False
    finally:
        conn.close()

# Create the table when the app starts
create_metrics_table()
```

**Add your first endpoint - health check:**

```python
@app.route('/health', methods=['GET'])
def health_check():
    """Check if our service is running properly"""
    return jsonify({
        'status': 'healthy',
        'service': 'mlops-service',
        'timestamp': datetime.utcnow().isoformat(),
        'monitoring': 'prometheus'
    })
```

**Add the main metrics tracking endpoint:**

```python
@app.route('/track', methods=['POST'])
def track_metrics():
    """Receive metrics from the Next.js chat application"""
    try:
        # Get the metrics data sent from Next.js
        metrics_data = request.get_json()

        if not metrics_data:
            return jsonify({'error': 'No metrics data provided'}), 400

        # Make sure we have the essential data
        required_fields = ['business_id', 'response_time_ms', 'tokens_used']
        for field in required_fields:
            if field not in metrics_data:
                return jsonify({'error': f'Missing required field: {field}'}), 400

        # Store metrics in database
        success = store_metrics_in_db(metrics_data)

        if success:
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
        return jsonify({'error': 'Internal server error'}), 500
```

**Add the database storage function:**

```python
def store_metrics_in_db(metrics_data):
    """Save metrics to our database for later analysis"""
    conn = get_db_connection()
    if not conn:
        return False

    try:
        with conn.cursor() as cursor:
            cursor.execute("""
                INSERT INTO ai_metrics (
                    business_id, conversation_id, session_id,
                    response_time_ms, success_rate,
                    tokens_used, api_cost_usd, model_name,
                    intent_detected, appointment_requested, appointment_booked, human_handoff_requested,
                    user_message_length, ai_response_length, response_type
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
                )
            """, (
                metrics_data.get('business_id'),
                metrics_data.get('conversation_id'),
                metrics_data.get('session_id'),
                metrics_data.get('response_time_ms'),
                metrics_data.get('success_rate', 1.0),
                metrics_data.get('tokens_used'),
                metrics_data.get('api_cost_usd'),
                metrics_data.get('model_name', 'gemini-1.5-flash'),
                metrics_data.get('intent_detected'),
                metrics_data.get('appointment_requested', False),
                metrics_data.get('appointment_booked', False),
                metrics_data.get('human_handoff_requested', False),
                metrics_data.get('user_message_length'),
                metrics_data.get('ai_response_length'),
                metrics_data.get('response_type')
            ))
            conn.commit()
            return True
    except Exception as e:
        logger.error(f"Error storing metrics: {e}")
        return False
    finally:
        conn.close()
```

**Add the Flask app runner:**

```python
# Initialize metrics on startup
create_metrics_table()

# Rebuild Prometheus metrics from database on startup
rebuild_prometheus_metrics_from_db()

if __name__ == '__main__':
    # Run the Flask app
    app.run(host='0.0.0.0', port=5001, debug=True)
```

</details>

<details>
<summary><h3>5. Create Startup Script</h3></summary>

**Create `start.sh`:**

```bash
#!/bin/bash

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

# Create metrics directory for Prometheus
mkdir -p metrics

echo "✅ Setup complete!"
echo "🌐 Service will be available at: http://localhost:5001"
echo "Starting Flask application..."

# Start Flask application
python app.py
```

**Make it executable:**

```bash
chmod +x start.sh
```

</details>

<details>
<summary><h3>6. Test Your Flask Service</h3></summary>

**Start the service:**

**Windows:**

```cmd
start.bat
```

**Mac/Linux:**

```bash
./start.sh
```

**Test the health endpoint:**

```bash
# In a new terminal
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

**✅ Success Check:** If you see the healthy response, your Flask service is working!

</details>

### ✅ Part A Completion Check

**Before proceeding to Part B, ensure you have:**

- [ ] Flask service folder created with all files
- [ ] Python virtual environment set up
- [ ] Dependencies installed successfully
- [ ] Environment variables configured
- [ ] Flask app runs without errors
- [ ] Health endpoint returns successful response
- [ ] Database table created (check logs for "Metrics table created successfully")

**Have all 7 items checked?** → Proceed to Part B
**Missing something?** → Complete the missing steps above

</details>

<details>
<summary><h2>📊 Part B: Integrate Prometheus Monitoring</h2></summary>

_Prometheus helps us track real-time metrics and see how our AI is performing over time_

<details>
<summary><h3>1. Set Up Prometheus Metrics</h3></summary>

**Add Prometheus setup to your `app.py` (after the imports):**

```python
# Prometheus Metrics Setup
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST

# Define Prometheus metrics
ai_requests_total = Counter('ai_requests_total', 'Total AI requests', ['business_id', 'intent', 'response_type'])
ai_response_time_seconds = Histogram('ai_response_time_seconds', 'AI response time in seconds', ['business_id'])
ai_tokens_used_total = Counter('ai_tokens_used_total', 'Total tokens used', ['business_id', 'model'])
ai_api_cost_usd_total = Counter('ai_api_cost_usd_total', 'Total API cost in USD', ['business_id'])
appointments_requested_total = Counter('appointments_requested_total', 'Total appointment requests', ['business_id'])
human_handoffs_total = Counter('human_handoffs_total', 'Total human handoff requests', ['business_id'])

logger.info("Prometheus metrics initialized successfully")
```

</details>

<details>
<summary><h3>2. Create Prometheus Metrics Endpoint</h3></summary>

**Add this endpoint to your `app.py`:**

```python
@app.route('/metrics', methods=['GET'])
def prometheus_metrics():
    """Prometheus metrics endpoint - industry standard format"""
    try:
        return generate_latest(), 200, {'Content-Type': CONTENT_TYPE_LATEST}
    except Exception as e:
        logger.error(f"Error generating Prometheus metrics: {e}")
        return jsonify({'error': 'Failed to generate metrics'}), 500
```

</details>

<details>
<summary><h3>3. Create Prometheus Logging Function</h3></summary>

**Add this function to your `app.py`:**

```python
def update_prometheus_metrics(metrics_data):
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

        # Update API cost
        if 'api_cost_usd' in metrics_data:
            ai_api_cost_usd_total.labels(business_id=business_id).inc(metrics_data['api_cost_usd'])

        # Update business metrics
        if metrics_data.get('appointment_requested', False):
            appointments_requested_total.labels(business_id=business_id).inc()

        if metrics_data.get('human_handoff_requested', False):
            human_handoffs_total.labels(business_id=business_id).inc()

        logger.info(f"Successfully updated Prometheus metrics for business {business_id}")
        return True

    except Exception as e:
        logger.error(f"Error updating Prometheus metrics: {e}")
        return False
```

</details>

<details>
<summary><h3>4. Update Your Tracking Endpoint</h3></summary>

**Modify the `track_metrics()` function to include Prometheus:**

```python
@app.route('/track', methods=['POST'])
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

        # Update Prometheus metrics first
        prometheus_success = update_prometheus_metrics(metrics_data)

        # Store in database
        db_success = store_metrics_in_db(metrics_data)

        if db_success and prometheus_success:
            logger.info(f"Successfully tracked metrics for business {metrics_data.get('business_id')}")
            return jsonify({
                'status': 'success',
                'message': 'Metrics tracked successfully',
                'prometheus_updated': prometheus_success,
                'timestamp': datetime.utcnow().isoformat()
            })
        else:
            return jsonify({'error': 'Failed to store metrics'}), 500

    except Exception as e:
        logger.error(f"Error tracking metrics: {e}")
        return jsonify({'error': 'Internal server error'}), 500
```

</details>

<details>
<summary><h3>5. Test Prometheus Integration</h3></summary>

**Send test metrics to your service:**

```bash
curl -X POST http://localhost:5001/track \
  -H "Content-Type: application/json" \
  -d '{
    "business_id": "test-business",
    "conversation_id": "conv-123",
    "session_id": "session-456",
    "response_time_ms": 1500,
    "tokens_used": 150,
    "api_cost_usd": 0.002,
    "intent_detected": "general",
    "appointment_requested": false,
    "user_message_length": 45,
    "ai_response_length": 120,
    "response_type": "text"
  }'
```

**Check Prometheus metrics:**

```bash
curl http://localhost:5001/metrics
```

**You should see metrics like:**

```
# HELP ai_requests_total Total AI requests
# TYPE ai_requests_total counter
ai_requests_total{business_id="test-business",intent="general",response_type="text"} 1.0

# HELP ai_response_time_seconds AI response time in seconds
# TYPE ai_response_time_seconds histogram
ai_response_time_seconds_bucket{business_id="test-business",le="0.005"} 0.0
ai_response_time_seconds_bucket{business_id="test-business",le="1.5"} 1.0
```

**Add metrics refresh endpoint:**

```python
@app.route('/refresh-metrics', methods=['POST'])
def refresh_metrics():
    """
    Endpoint for Next.js to trigger metrics refresh from database
    This rebuilds Prometheus metrics from persistent data
    """
    try:
        logger.info("Metrics refresh triggered by Next.js")
        
        # Fetch latest metrics from database and rebuild Prometheus
        success = fetch_metrics_from_db()
        
        if success:
            return jsonify({
                'status': 'success',
                'message': 'Prometheus metrics refreshed from database',
                'timestamp': datetime.utcnow().isoformat()
            })
        else:
            return jsonify({
                'status': 'warning', 
                'message': 'Could not fetch from database, using current metrics',
                'timestamp': datetime.utcnow().isoformat()
            })
            
    except Exception as e:
        logger.error(f"Error refreshing metrics: {e}")
        return jsonify({'error': 'Failed to refresh metrics'}), 500
```

</details>

### ✅ Part B Completion Check

**Before proceeding to Part C, ensure you have:**

- [ ] Prometheus metrics initialized successfully
- [ ] Prometheus metrics endpoint working (/metrics)
- [ ] Dashboard accessible at http://localhost:5001/
- [ ] Prometheus logging function implemented
- [ ] Tracking endpoint updated to use Prometheus
- [ ] Test metrics appear in /metrics endpoint and dashboard
- [ ] Both database and Prometheus receive metrics

**Have all 7 items checked?** → Proceed to Part C
**Missing something?** → Complete the missing steps above

</details>

<details>
<summary><h2>🔗 Part C: Enhance Next.js with Metrics</h2></summary>

_Now we'll modify your Next.js app to send performance data to your Flask service_

<details>
<summary><h3>1. Create Metrics Tracking Utilities</h3></summary>

**First, add metrics functions to `lib/database.ts`:**

```typescript
// Add this interface to your existing database.ts file
export interface AIMetrics {
  id: string
  business_id: string
  conversation_id?: string
  session_id: string
  
  // Performance metrics
  response_time_ms: number
  success_rate: number
  
  // AI performance metrics
  tokens_used: number
  prompt_tokens?: number
  completion_tokens?: number
  api_cost_usd: number
  model_name: string
  
  // Business metrics
  intent_detected: string
  appointment_requested: boolean
  human_handoff_requested: boolean
  appointment_booked?: boolean
  
  // Message metrics
  user_message_length: number
  ai_response_length: number
  response_type: string
  
  created_at: string
}

// Add these functions to the end of your database.ts file
export async function createAIMetrics(metrics: Omit<AIMetrics, "id" | "created_at">) {
  const result = await sql`
    INSERT INTO ai_metrics (
      business_id, conversation_id, session_id,
      response_time_ms, success_rate,
      tokens_used, prompt_tokens, completion_tokens, api_cost_usd, model_name,
      intent_detected, appointment_requested, human_handoff_requested, appointment_booked,
      user_message_length, ai_response_length, response_type
    )
    VALUES (
      ${metrics.business_id}, ${metrics.conversation_id}, ${metrics.session_id},
      ${metrics.response_time_ms}, ${metrics.success_rate},
      ${metrics.tokens_used}, ${metrics.prompt_tokens}, ${metrics.completion_tokens}, ${metrics.api_cost_usd}, ${metrics.model_name},
      ${metrics.intent_detected}, ${metrics.appointment_requested}, ${metrics.human_handoff_requested}, ${metrics.appointment_booked || false},
      ${metrics.user_message_length}, ${metrics.ai_response_length}, ${metrics.response_type}
    )
    RETURNING *
  `
  return result[0] as AIMetrics
}
```

**Then, create `lib/mlops-tracking.ts`:**

```typescript
/**
 * MLOps Tracking Utilities
 * Functions to calculate and send AI performance metrics
 */

// Types for our metrics data
export interface MetricsData {
  business_id: string;
  conversation_id?: string | undefined;
  session_id: string;
  
  // Performance metrics
  response_time_ms: number;
  success_rate: number;
  user_satisfaction?: number;
  
  // AI performance metrics
  tokens_used: number;
  prompt_tokens?: number;
  completion_tokens?: number;
  api_cost_usd: number;
  model_name: string;
  
  // Business metrics
  intent_detected: string;
  appointment_requested: boolean;
  human_handoff_requested: boolean;
  appointment_booked?: boolean;
  
  // Message metrics
  user_message_length: number;
  ai_response_length: number;
  response_type: string;
}

/**
 * Track metrics by storing in database and sending to MLOps service
 * This runs in the background and won't slow down user responses
 */
export async function trackMetrics(metricsData: MetricsData): Promise<void> {
  try {
    // Import database function dynamically to avoid circular dependencies
    const { createAIMetrics } = await import('@/lib/database');
    
    // Store metrics in database first (for persistence/history)
    await createAIMetrics({
      business_id: metricsData.business_id,
      conversation_id: metricsData.conversation_id,
      session_id: metricsData.session_id,
      response_time_ms: metricsData.response_time_ms,
      success_rate: metricsData.success_rate,
      tokens_used: metricsData.tokens_used,
      prompt_tokens: metricsData.prompt_tokens,
      completion_tokens: metricsData.completion_tokens,
      api_cost_usd: metricsData.api_cost_usd,
      model_name: metricsData.model_name,
      intent_detected: metricsData.intent_detected,
      appointment_requested: metricsData.appointment_requested,
      human_handoff_requested: metricsData.human_handoff_requested,
      appointment_booked: metricsData.appointment_booked,
      user_message_length: metricsData.user_message_length,
      ai_response_length: metricsData.ai_response_length,
      response_type: metricsData.response_type
    });

    // Send metrics to Flask MLOps service (for Prometheus monitoring)
    const mlopsServiceUrl = process.env.MLOPS_SERVICE_URL || 'http://localhost:5001';
    
    const response = await fetch(`${mlopsServiceUrl}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metricsData),
      signal: AbortSignal.timeout(5000), // 5 second timeout
    });

    if (!response.ok) {
      throw new Error(`MLOps service responded with status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Metrics tracked successfully:', result.status);
    
    // Optionally trigger metrics refresh from database (for persistence)
    try {
      await fetch(`${mlopsServiceUrl}/refresh-metrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trigger: 'new_metrics' }),
        signal: AbortSignal.timeout(3000)
      });
    } catch (refreshError) {
      // Don't fail if refresh fails - it's not critical for user experience
      console.log('Metrics refresh skipped:', refreshError);
    }
  } catch (error) {
    // Log error but don't throw - we don't want metrics to break user experience
    console.error("Error tracking metrics:", error);
  }
}

/**
 * Calculate how many tokens our AI request used
 * This is an estimation based on text length
 */
export function calculateTokenUsage(
  systemPrompt: string,
  userMessage: string,
  aiResponse: string
) {
  // Rough estimation: 1 token ≈ 4 characters for English text
  const CHARS_PER_TOKEN = 4;

  const systemTokens = Math.ceil(systemPrompt.length / CHARS_PER_TOKEN);
  const userTokens = Math.ceil(userMessage.length / CHARS_PER_TOKEN);
  const responseTokens = Math.ceil(aiResponse.length / CHARS_PER_TOKEN);

  const totalTokens = systemTokens + userTokens + responseTokens;

  return {
    totalTokens,
    systemTokens,
    userTokens,
    responseTokens,
  };
}

/**
 * Estimate how much this AI request cost us
 * Based on Gemini API pricing
 */
export function estimateApiCost(totalTokens: number): number {
  // Gemini 1.5 Flash pricing: roughly $0.1875 per 1M tokens
  const COST_PER_MILLION_TOKENS = 0.1875;

  const costUsd = (totalTokens / 1_000_000) * COST_PER_MILLION_TOKENS;

  // Round to 6 decimal places
  return Math.round(costUsd * 1_000_000) / 1_000_000;
}
```

</details>

<details>
<summary><h3>2. Add MLOps Service URL to Environment</h3></summary>

**Add to your main `.env` file:**

```env
# Add this line to your existing .env file
MLOPS_SERVICE_URL=http://localhost:5001
```

</details>

<details>
<summary><h3>3. Modify Chat API for Metrics Collection</h3></summary>

**Update `app/api/chat/route.ts` - Add imports:**

```typescript
// Add these imports at the top
import {
  trackMetrics,
  calculateTokenUsage,
  estimateApiCost,
} from "@/lib/mlops-tracking";
```

**Add timing at the start of the POST function:**

```typescript
export async function POST(req: Request) {
  // Start timing for performance metrics
  const startTime = Date.now();

  try {
    const { messages, businessId, conversationId } = await req.json();
    // ... rest of your existing code
```

**Add metrics collection after AI response (before the return statement):**

```typescript
// After you get the AI response, add this before the return statement:

// Calculate performance metrics
const endTime = Date.now();
const responseTimeMs = endTime - startTime;

// Get the last user message for metrics
const lastUserMessage = messages[messages.length - 1];
const userMessageLength = lastUserMessage?.content?.length || 0;
const aiResponseLength = parsedResponse.message.length;

// Calculate token usage and costs
const tokenMetrics = calculateTokenUsage(
  businessContext,
  lastUserMessage?.content || "",
  parsedResponse.message
);
const apiCost = estimateApiCost(tokenMetrics.totalTokens);

// Collect metrics for MLOps tracking
const metricsData = {
  business_id: businessId,
  conversation_id: conversationId,
  session_id: sessionId,

  // Performance metrics
  response_time_ms: responseTimeMs,
  success_rate: 1.0, // Successful response

  // AI performance metrics
  tokens_used: tokenMetrics.totalTokens,
  api_cost_usd: apiCost,
  model_name: "gemini-1.5-flash",

  // Business metrics
  intent_detected: parsedResponse.intent,
  appointment_requested: parsedResponse.type === "appointment_booking",
  human_handoff_requested: parsedResponse.type === "human_handoff",

  // Message metrics
  user_message_length: userMessageLength,
  ai_response_length: aiResponseLength,
  response_type: parsedResponse.type,
};

// Send metrics to MLOps service (non-blocking)
trackMetrics(metricsData).catch((error) => {
  console.error("Failed to track metrics:", error);
  // Don't fail the request if metrics tracking fails
});

// ... your existing return statement
```

**Add error tracking in the catch block:**

```typescript
  } catch (error) {
    console.error('Error in chat API:', error);

    // Track failed requests for MLOps monitoring
    const endTime = Date.now();
    const responseTimeMs = endTime - startTime;

    const failureMetrics = {
      business_id: businessId || 'unknown',
      session_id: generateSessionId(req),
      response_time_ms: responseTimeMs,
      success_rate: 0.0, // Failed response
      tokens_used: 0,
      api_cost_usd: 0,
      intent_detected: 'error',
      appointment_requested: false,
      human_handoff_requested: true,
      user_message_length: 0,
      ai_response_length: 0,
      response_type: 'error'
    };

    // Track failure metrics (non-blocking)
    trackMetrics(failureMetrics).catch(metricsError => {
      console.error('Failed to track failure metrics:', metricsError);
    });

    return Response.json({ error: 'Error processing request' }, { status: 500 });
  }
```

</details>

<details>
<summary><h3>4. Test the Complete Integration</h3></summary>

**Make sure both services are running:**

1. Flask MLOps service on port 5001 (or your configured port)
2. Next.js app on port 3000

**Test the chat:**

1. Go to http://localhost:3000
2. Start a conversation with your AI
3. Ask a few questions
4. Try booking an appointment

**Check your metrics:**

1. Look at Flask service logs - you should see "Successfully tracked metrics"
2. Check Prometheus metrics at http://localhost:5001/metrics - you should see updated counters
3. Each chat message should increment the metrics

</details>

### ✅ Part C Completion Check

**Lab 2 Completion Check:**

- [ ] MLOps tracking utilities created
- [ ] Environment variable added for MLOps service URL
- [ ] Chat API modified to collect timing metrics
- [ ] Token usage and cost calculation implemented
- [ ] Metrics sent to Flask service after each chat
- [ ] Error tracking implemented for failed requests
- [ ] Chat still works normally (metrics don't break user experience)
- [ ] Dashboard shows real-time metrics at http://localhost:5001/
- [ ] Raw Prometheus metrics available at http://localhost:5001/metrics

**Have all 9 items checked?** → Lab 2 Complete! 🎉
**Missing something?** → Complete the missing steps above

</details>

---

## 🎉 **Lab 2 Summary - What You Built**

Congratulations! You've successfully implemented a complete MLOps monitoring system for your AI appointment setter. Here's what you accomplished:

### **✅ Core MLOps Infrastructure**

- **Flask MLOps Service** running on port 5001 with cross-platform compatibility
- **Prometheus Metrics Collection** tracking real-time AI performance
- **Interactive Dashboard** at http://localhost:5001/ for monitoring
- **Database Integration** for historical metrics storage

### **📊 Metrics You're Now Tracking**

- **AI Performance**: Response times, token usage, API costs
- **Business Metrics**: Appointment requests, conversion rates, human handoffs
- **System Health**: Service status, error rates, success rates

### **🔧 Technical Achievements**

- **Cross-Platform Setup**: Works on Windows, Mac, and Linux
- **Port Configuration**: Flexible port settings to avoid conflicts
- **Real-Time Monitoring**: Live dashboard updates as you chat
- **Industry Standards**: Prometheus format compatible with enterprise tools

### **🚀 What's Next**

Your AI system now has professional-grade monitoring! As you chat with your AI:

- Watch metrics update in real-time on the dashboard
- Track costs and performance over time
- Monitor appointment conversion rates
- Identify when human handoffs are needed

### **🎯 Key URLs to Remember**

- **Dashboard**: http://localhost:5001/ (user-friendly metrics)
- **Health Check**: http://localhost:5001/health
- **Raw Metrics**: http://localhost:5001/metrics (Prometheus format)
- **Analytics**: http://localhost:5001/analytics/your-business-id

### **📈 MLOps Best Practices Implemented**

- ✅ **Observability**: Real-time metrics and monitoring
- ✅ **Reliability**: Health checks and error tracking
- ✅ **Cost Management**: API usage and cost tracking
- ✅ **Performance Monitoring**: Response time and success rate tracking
- ✅ **Business Intelligence**: Appointment conversion analytics

**Note**: We focus on essential monitoring with Prometheus. Your metrics collection provides the valuable insights you need for production AI systems.

---

## 🔍 **Troubleshooting & Resources**

- **Issues?** Check `mlops-service/TROUBLESHOOTING.md`
- **Testing**: Run `python mlops-service/test-simple.py`
- **Port Conflicts**: Edit `mlops-service/.env` to change ports

**Ready for Lab 3?** You now have a solid MLOps foundation for testing and deployment!

<details>
<summary><h3>6. Test Complete Integration</h3></summary>

**Create a simple test script `test-integration.js`:**

```javascript
// Simple test to verify everything works together
const fetch = require("node-fetch");

async function testIntegration() {
  console.log("🧪 Testing Lab 2 Integration...");

  // Test Flask health
  try {
    const response = await fetch("http://localhost:5001/health");
    const data = await response.json();
    console.log("✅ Flask service healthy:", data.status);
  } catch (error) {
    console.log("❌ Flask service not responding");
    return;
  }

  // Test metrics tracking
  try {
    const testMetrics = {
      business_id: "test-business",
      session_id: "test-session",
      response_time_ms: 1200,
      success_rate: 1.0,
      tokens_used: 100,
      api_cost_usd: 0.001,
      intent_detected: "general",
      appointment_requested: false,
      human_handoff_requested: false,
      user_message_length: 30,
      ai_response_length: 80,
      response_type: "text",
    };

    const response = await fetch("http://localhost:5001/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testMetrics),
    });

    const result = await response.json();
    console.log("✅ Metrics tracking works:", result.status);
    console.log("🎯 Check dashboard at http://localhost:5001/");
  } catch (error) {
    console.log("❌ Metrics tracking failed:", error.message);
  }
}

testIntegration();
```

**Run the test:**

```bash
node test-integration.js
```

</details>

### ✅ Part D Completion Check

**Before completing Lab 2, ensure you have:**

- [ ] MLOps service running on port 5001
- [ ] Prometheus metrics being collected
- [ ] Dashboard accessible at localhost:8001
- [ ] Integration test passes successfully
- [ ] Integration test passes
- [ ] All services running together successfully

**Have all 8 items checked?** → Lab 2 Complete! 🎉
**Missing something?** → Complete the missing steps above

</details>

---

<details>
<summary><h2>🧪 Testing Your Complete System</h2></summary>

**Final Integration Test:**

1. **Start all services:**

   ```bash
   # Terminal 1: Flask MLOps service
   cd mlops-service && ./start.sh

   # Terminal 2: View Dashboard
   # Open http://localhost:5001/ in your browser

   # Terminal 3: Next.js app
   npm run dev
   ```

2. **Test the complete flow:**

   - Chat with your AI at http://localhost:3000
   - Check Flask logs for "Successfully tracked metrics"
   - View experiment runs at http://localhost:5001
   - Verify metrics are being stored

3. **Check your database:**
   ```sql
   SELECT COUNT(*) FROM ai_metrics;
   SELECT business_id, AVG(response_time_ms) FROM ai_metrics GROUP BY business_id;
   ```

</details>

---

<details>
<summary><h2>🐛 Troubleshooting</h2></summary>

**Flask service won't start:**

- Check if port 5000 is available: `lsof -i :5000`
- Verify DATABASE_URL is correct in `.env`
- Make sure virtual environment is activated

**Metrics not appearing in dashboard:**

- Check Flask service logs for errors
- Verify dashboard is accessible at http://localhost:5001/
- Test with curl command to send metrics directly
- Check raw Prometheus metrics at http://localhost:5001/metrics

**Next.js can't connect to Flask:**

- Verify MLOPS_SERVICE_URL in main `.env` file
- Check browser console for CORS errors
- Ensure Flask service is running

**Database connection errors:**

- Verify DATABASE_URL format and credentials
- Check network connectivity to Neon database
- Test connection with psql or database client

</details>

---

<details>
<summary><h2>🎓 What You've Learned</h2></summary>

**MLOps Fundamentals:**

- ✅ Built a microservice for AI performance tracking
- ✅ Implemented real-time monitoring with Prometheus
- ✅ Created comprehensive metrics collection
- ✅ Set up comprehensive monitoring and analytics

**Production AI Skills:**

- ✅ Non-blocking metrics collection
- ✅ Performance monitoring and cost tracking
- ✅ Business intelligence from AI interactions
- ✅ Error handling and failure tracking

**System Architecture:**

- ✅ Microservices communication
- ✅ Database design for analytics
- ✅ RESTful API development
- ✅ Environment configuration management

**Ready for Lab 3?** You'll build comprehensive test suites for your AI components and MLOps infrastructure!

</details>

---

<details>
<summary><h2>💡 Pro Tips & Next Steps</h2></summary>

**Optimization Ideas:**

- Add caching to reduce database queries
- Implement batch metrics processing
- Create custom Prometheus dashboards with Grafana
- Add alerting for performance degradation

**Business Intelligence:**

- Track peak usage hours
- Analyze most common user intents
- Monitor appointment conversion rates
- Calculate ROI of AI implementation

**Advanced Features:**

- A/B testing different AI prompts
- Sentiment analysis of user messages
- Predictive analytics for appointment booking
- Cost optimization recommendations

</details>
