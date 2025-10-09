# Lab 3: Testing AI Systems

**Level:** Intermediate
**Technology:** Pytest Testing

Learn to test your Flask MLOps service with pytest, validate metrics tracking, and ensure your AI monitoring system works reliably.

## Lab Overview

**What You'll Do:** Write comprehensive tests for your Flask MLOps service to ensure it tracks AI performance correctly and handles errors gracefully

**Lab Collaborators:**
- Edward Lampoh - Software Developer & Collaborator
- Oluwafemi Adebayo, PhD - Academic Professor & Collaborator

## 🚨 Prerequisites Required

You must complete Labs 1 & 2 and have a working Flask MLOps service before starting Lab 3.

## Prerequisites Check

**Before starting Lab 3, ensure you have completed Labs 1 & 2:**

- ✅ MLOps service code exists in `mlops-service/app.py`
- ✅ Python virtual environment set up in `mlops-service/venv/`
- ✅ Requirements installed (Flask, pytest, etc.)
- ✅ Test file exists: `mlops-service/test_app.py`

### 🔍 Quick Test

1. `cd mlops-service`
2. `source venv/bin/activate` (or Windows equivalent)
3. `pytest --version` - should show pytest version
4. If this works, you're ready for Lab 3!

### 📝 Note: Services Not Required

You don't need Next.js or Flask services running for Lab 3 unit tests. We'll test integration separately in Part E.

## Part A: Install Testing Tools

*We'll use pytest to test our Flask service - it's the industry standard for Python testing*

### 1. Install Pytest

**Navigate to your MLOps service folder and activate your environment:**

**Windows:**
```cmd
cd mlops-service
venv\Scripts\activate
```

**Mac/Linux:**
```bash
cd mlops-service
source venv/bin/activate
```

**Install pytest (it should already be in your requirements.txt):**
```bash
pip install pytest pytest-flask
```

**Verify installation:**
```bash
pytest --version
```

**✅ Success Check:** You should see pytest version information (like "pytest 7.4.3")

## Part B: Understanding the Test File

*Let's examine the test file that's already been created for you*

### 1. Test File Overview

**Your test file is located at:** `mlops-service/test_app.py`

**View your test file:**
```bash
# See what tests you have
cat test_app.py | head -20
```

### 2. Test Categories

Your test file includes these types of tests:

- **Health Endpoint Tests:** Verify your service is running
- **Metrics Endpoint Tests:** Check Prometheus metrics are working
- **Tracking Tests:** Validate metrics collection from Next.js
- **Error Handling Tests:** Ensure graceful error responses
- **Data Validation Tests:** Verify input validation works

### 💡 Why These Tests Matter

- **Health tests** ensure your service stays online
- **Metrics tests** verify AI performance tracking works
- **Error tests** prevent crashes in production
- **Validation tests** catch bad data early

## Part C: Running Your Tests

### 1. Basic Test Execution

**Run all tests:**
```bash
pytest test_app.py
```

**Run with more details:**
```bash
pytest test_app.py -v
```

**Run specific test class:**
```bash
pytest test_app.py::TestHealthEndpoint -v
```

**Run single test:**
```bash
pytest test_app.py::TestHealthEndpoint::test_health_check_success -v
```

### 2. Understanding Test Output

**Successful test output looks like:**
```
test_app.py::TestHealthEndpoint::test_health_check_success PASSED
test_app.py::TestMetricsEndpoint::test_metrics_endpoint_accessible PASSED
test_app.py::TestTrackingEndpoint::test_track_metrics_success PASSED

========================= 3 passed in 0.25s =========================
```

**Failed test output shows:**
```
test_app.py::TestHealthEndpoint::test_health_check_success FAILED

FAILURES
_________ TestHealthEndpoint.test_health_check_success _________

    def test_health_check_success(self, client):
>       response = client.get('/health')
E       assert response.status_code == 200
E       AssertionError: assert 404 == 200

========================= 1 failed, 2 passed in 0.30s =========================
```

### 3. Key Testing Principle

#### 💡 Important: Tests Don't Need Running Services

Your tests run completely independently:
- **No need to start Flask service** (python app.py)
- **No need to start Next.js** (npm run dev)
- **Just activate Python environment** and run pytest
- Tests use Flask's test client (simulated requests)

**Simple test workflow:**
```bash
# 1. Navigate to MLOps directory
cd mlops-service

# 2. Activate Python environment
source venv/bin/activate  # Mac/Linux
# OR: venv\Scripts\activate  # Windows

# 3. Run tests (no services needed!)
pytest test_app.py -v
```

#### ✅ Why This Works

Flask test client creates an isolated test environment:
- Tests simulate HTTP requests without real server
- Each test gets a fresh Flask application instance
- No ports, no network calls, no external dependencies
- This is standard practice in professional development

## Part D: Test-Driven Development

### 1. Add Your Own Test

Let's add a simple test to understand how testing works.

**Add this test to the end of test_app.py:**

```python
class TestMyCustomTest:
    """My custom test class"""

    def test_flask_app_exists(self, client):
        """Test that our Flask app responds to requests"""
        response = client.get('/health')
        assert response.status_code == 200

    def test_track_endpoint_requires_json(self, client):
        """Test that track endpoint requires JSON data"""
        # Send empty request
        response = client.post('/track')
        assert response.status_code == 500  # Flask returns 500 for JSON errors

        # Check error message
        data = json.loads(response.data)
        assert 'error' in data
```

**Don't forget to import json at the top of the file:**
```python
import json  # Add this line near the top with other imports
```

**Run your new test:**
```bash
pytest test_app.py::TestMyCustomTest -v
```

### 2. Optional: Better Test Configuration

#### 🔧 Optional Files (Tests work without these)

Your mlops-service folder should have these optional files:
- `pytest.ini` - Makes test output cleaner
- `conftest.py` - Provides shared test setup

These files make testing nicer but **are not required** for tests to work.

**If you have the config files, test output is cleaner:**
```bash
pytest  # Automatically finds and runs test_app.py
```

## Part E: Integration Testing

### 1. End-to-End Test

Let's test the complete flow: Next.js → Flask → Prometheus metrics.

**Start both services:**
```bash
# Terminal 1: Start Next.js
npm run dev

# Terminal 2: Start Flask MLOps (in mlops-service directory)
python app.py
```

**Test the complete flow:**
```bash
# Terminal 3: Test complete integration

# 1. Check Flask health
curl http://localhost:5001/health

# 2. Send test metrics
curl -X POST http://localhost:5001/track \
  -H "Content-Type: application/json" \
  -d '{
    "business_id": "test-integration",
    "response_time_ms": 999,
    "tokens_used": 88,
    "intent_detected": "testing",
    "response_type": "test"
  }'

# 3. Check metrics were recorded
curl http://localhost:5001/metrics | grep test-integration
```

### 2. AI Integration Test

**Test that your AI actually sends metrics:**

1. Go to http://localhost:3000
2. Create a test business or use existing
3. Chat with the AI (ask any question)
4. Check http://localhost:5001/metrics for new data
5. Look for your business ID in the metrics

### ✅ Success Indicators

- All tests pass when running `pytest`
- Manual curl commands work
- AI chat generates metrics you can see
- Metrics contain your business data

## Troubleshooting

### Tests fail with "ModuleNotFoundError":
Make sure you're in the mlops-service directory and have activated your virtual environment

### Tests pass but integration fails:
Check that both Next.js (port 3000) and Flask (port 5001) are running in separate terminals

### No metrics appear after AI chat:
Verify MLOPS_SERVICE_URL=http://localhost:5001 is in your main .env file (not the mlops-service .env)

### Pytest command not found:
Run `pip install pytest` in your activated virtual environment

## Lab 3 Summary - What You Accomplished

Excellent work! You've successfully implemented comprehensive testing for your MLOps service. Here's what you accomplished:

### ✅ Testing Skills Gained

- **Unit Testing:** Individual component testing with pytest
- **API Testing:** HTTP endpoint validation and response checking
- **Error Testing:** Validation of error handling and edge cases
- **Integration Testing:** End-to-end flow verification

### 📊 What Your Tests Cover

- **Service Health:** Ensures your MLOps service stays online
- **Metrics Collection:** Validates AI performance tracking works
- **Data Validation:** Prevents bad data from breaking your system
- **Prometheus Integration:** Confirms metrics reach monitoring system

**Industry Relevance:** The testing patterns you learned are used in production AI systems at major tech companies. You now know how to validate AI service reliability.

### 🚀 Prepare for Lab 4

- Keep your test suite - we'll integrate it into CI/CD pipelines
- Your tests will run automatically on every code change
- Lab 4 will cover GitHub Actions for automated testing

---

**Navigation:**
- [← Lab 2: MLOps Integration](/labs/lab2)
- [Back to Labs →](/labs)