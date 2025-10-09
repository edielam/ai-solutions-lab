import Link from "next/link";
import { CodeBlock } from "@/components/labs/code-block";

export default function Lab3Page() {
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
            <div className="text-sm sm:text-lg font-semibold text-blue-900">Pytest Testing</div>
            <div className="text-xs sm:text-sm text-blue-700">Technology</div>
          </div>
        </div>

        <p className="text-sm sm:text-lg text-gray-600 leading-relaxed">
          Learn to test your Flask MLOps service with pytest, validate metrics tracking, and ensure your AI monitoring system works reliably.
        </p>
      </div>

      {/* Content */}
      <div className="prose prose-gray max-w-none prose-sm sm:prose-base">
        <h2 id="overview" className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-4 sm:mb-6 text-gray-900">Lab Overview</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>What You'll Do:</strong> Write comprehensive tests for your Flask MLOps service to ensure it tracks AI performance correctly and handles errors gracefully
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
            You must complete Labs 1 & 2 and have a working Flask MLOps service before starting Lab 3.
          </p>
        </div>

        <h2 id="prerequisites" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Prerequisites Check</h2>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Before starting Lab 3, ensure you have completed Labs 1 & 2:</strong>
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">✅ MLOps service code exists in <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">mlops-service/app.py</code></li>
          <li className="text-gray-700">✅ Python virtual environment set up in <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">mlops-service/venv/</code></li>
          <li className="text-gray-700">✅ Requirements installed (Flask, pytest, etc.)</li>
          <li className="text-gray-700">✅ Test file exists: <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">mlops-service/test_app.py</code></li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">🔍 Quick Test</h4>
          <ol className="text-blue-700 space-y-1">
            <li>1. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">cd mlops-service</code></li>
            <li>2. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">source venv/bin/activate</code> (or Windows equivalent)</li>
            <li>3. <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">pytest --version</code> - should show pytest version</li>
            <li>4. If this works, you're ready for Lab 3!</li>
          </ol>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-yellow-800 mb-2">📝 Note: Services Not Required</h4>
          <p className="text-yellow-700">
            You don't need Next.js or Flask services running for Lab 3 unit tests. We'll test integration separately in Part E.
          </p>
        </div>

        <h2 id="part-a" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part A: Install Testing Tools</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          We'll use pytest to test our Flask service - it's the industry standard for Python testing
        </p>

        <h3 id="pytest-setup" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Install Pytest</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Navigate to your MLOps service folder and activate your environment:</strong>
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Windows:</strong>
        </p>
        <CodeBlock language="cmd">{`cd mlops-service
venv\\Scripts\\activate`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Mac/Linux:</strong>
        </p>
        <CodeBlock language="bash">{`cd mlops-service
source venv/bin/activate`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Install pytest (it should already be in your requirements.txt):</strong>
        </p>
        <CodeBlock language="bash">{`pip install pytest pytest-flask`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Verify installation:</strong>
        </p>
        <CodeBlock language="bash">{`pytest --version`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <p className="text-green-800">
            <strong>✅ Success Check:</strong> You should see pytest version information (like "pytest 7.4.3")
          </p>
        </div>

        <h2 id="part-b" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part B: Understanding the Test File</h2>

        <p className="mb-6 text-gray-700 leading-relaxed italic">
          Let's examine the test file that's already been created for you
        </p>

        <h3 id="test-structure" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Test File Overview</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Your test file is located at:</strong> <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">mlops-service/test_app.py</code>
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>View your test file:</strong>
        </p>
        <CodeBlock language="bash">{`# See what tests you have
cat test_app.py | head -20`}</CodeBlock>

        <h3 id="test-categories" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Test Categories</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Your test file includes these types of tests:
        </p>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Health Endpoint Tests:</strong> Verify your service is running</li>
          <li className="text-gray-700"><strong>Metrics Endpoint Tests:</strong> Check Prometheus metrics are working</li>
          <li className="text-gray-700"><strong>Tracking Tests:</strong> Validate metrics collection from Next.js</li>
          <li className="text-gray-700"><strong>Error Handling Tests:</strong> Ensure graceful error responses</li>
          <li className="text-gray-700"><strong>Data Validation Tests:</strong> Verify input validation works</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Why These Tests Matter</h4>
          <ul className="text-blue-700 space-y-1">
            <li>• <strong>Health tests</strong> ensure your service stays online</li>
            <li>• <strong>Metrics tests</strong> verify AI performance tracking works</li>
            <li>• <strong>Error tests</strong> prevent crashes in production</li>
            <li>• <strong>Validation tests</strong> catch bad data early</li>
          </ul>
        </div>

        <h2 id="part-c" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part C: Running Your Tests</h2>

        <h3 id="basic-test-run" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Basic Test Execution</h3>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Run all tests:</strong>
        </p>
        <CodeBlock language="bash">{`pytest test_app.py`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Run with more details:</strong>
        </p>
        <CodeBlock language="bash">{`pytest test_app.py -v`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Run specific test class:</strong>
        </p>
        <CodeBlock language="bash">{`pytest test_app.py::TestHealthEndpoint -v`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Run single test:</strong>
        </p>
        <CodeBlock language="bash">{`pytest test_app.py::TestHealthEndpoint::test_health_check_success -v`}</CodeBlock>

        <h3 id="test-output" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Understanding Test Output</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Successful test output looks like:</strong>
        </p>

        <CodeBlock language="text">{`test_app.py::TestHealthEndpoint::test_health_check_success PASSED
test_app.py::TestMetricsEndpoint::test_metrics_endpoint_accessible PASSED
test_app.py::TestTrackingEndpoint::test_track_metrics_success PASSED

========================= 3 passed in 0.25s =========================`}</CodeBlock>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Failed test output shows:</strong>
        </p>

        <CodeBlock language="text">{`test_app.py::TestHealthEndpoint::test_health_check_success FAILED

FAILURES
_________ TestHealthEndpoint.test_health_check_success _________

    def test_health_check_success(self, client):
>       response = client.get('/health')
E       assert response.status_code == 200
E       AssertionError: assert 404 == 200

========================= 1 failed, 2 passed in 0.30s =========================`}</CodeBlock>

        <h3 id="test-scenarios" className="text-xl font-semibold mt-8 mb-4 text-gray-900">3. Key Testing Principle</h3>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-blue-800 mb-2">💡 Important: Tests Don't Need Running Services</h4>
          <p className="text-blue-700 mb-2">Your tests run completely independently:</p>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• <strong>No need to start Flask service</strong> (python app.py)</li>
            <li>• <strong>No need to start Next.js</strong> (npm run dev)</li>
            <li>• <strong>Just activate Python environment</strong> and run pytest</li>
            <li>• Tests use Flask's test client (simulated requests)</li>
          </ul>
        </div>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Simple test workflow:</strong>
        </p>

        <CodeBlock language="bash">{`# 1. Navigate to MLOps directory
cd mlops-service

# 2. Activate Python environment
source venv/bin/activate  # Mac/Linux
# OR: venv\Scripts\activate  # Windows

# 3. Run tests (no services needed!)
pytest test_app.py -v`}</CodeBlock>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-green-800 mb-2">✅ Why This Works</h4>
          <p className="text-green-700 mb-2">Flask test client creates an isolated test environment:</p>
          <ul className="text-green-700 space-y-1 text-sm">
            <li>• Tests simulate HTTP requests without real server</li>
            <li>• Each test gets a fresh Flask application instance</li>
            <li>• No ports, no network calls, no external dependencies</li>
            <li>• This is standard practice in professional development</li>
          </ul>
        </div>

        <h2 id="part-d" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part D: Test-Driven Development</h2>

        <h3 id="add-test" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. Add Your Own Test</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Let's add a simple test to understand how testing works.
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Add this test to the end of test_app.py:</strong>
        </p>

        <CodeBlock language="python">{`class TestMyCustomTest:
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
        assert 'error' in data`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Don't forget to import json at the top of the file:</strong>
        </p>

        <CodeBlock language="python">{`import json  # Add this line near the top with other imports`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Run your new test:</strong>
        </p>
        <CodeBlock language="bash">{`pytest test_app.py::TestMyCustomTest -v`}</CodeBlock>

        <h3 id="optional-configs" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. Optional: Better Test Configuration</h3>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-2">🔧 Optional Files (Tests work without these)</h4>
          <p className="text-gray-700 mb-2">Your mlops-service folder should have these optional files:</p>
          <ul className="text-gray-700 space-y-1 text-sm">
            <li>• <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">pytest.ini</code> - Makes test output cleaner</li>
            <li>• <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">conftest.py</code> - Provides shared test setup</li>
          </ul>
          <p className="text-gray-700 mt-2 text-sm">
            These files make testing nicer but <strong>are not required</strong> for tests to work.
          </p>
        </div>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>If you have the config files, test output is cleaner:</strong>
        </p>
        <CodeBlock language="bash">{`pytest  # Automatically finds and runs test_app.py`}</CodeBlock>

        <h2 id="part-e" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Part E: Integration Testing</h2>

        <h3 id="end-to-end" className="text-xl font-semibold mt-8 mb-4 text-gray-900">1. End-to-End Test</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          Let's test the complete flow: Next.js → Flask → Prometheus metrics.
        </p>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Start both services:</strong>
        </p>

        <CodeBlock language="bash">{`# Terminal 1: Start Next.js
npm run dev

# Terminal 2: Start Flask MLOps (in mlops-service directory)
python app.py`}</CodeBlock>

        <p className="mb-2 text-gray-700 leading-relaxed">
          <strong>Test the complete flow:</strong>
        </p>

        <CodeBlock language="bash">{`# Terminal 3: Test complete integration

# 1. Check Flask health
curl http://localhost:5001/health

# 2. Send test metrics
curl -X POST http://localhost:5001/track \\
  -H "Content-Type: application/json" \\
  -d '{
    "business_id": "test-integration",
    "response_time_ms": 999,
    "tokens_used": 88,
    "intent_detected": "testing",
    "response_type": "test"
  }'

# 3. Check metrics were recorded
curl http://localhost:5001/metrics | grep test-integration`}</CodeBlock>

        <h3 id="ai-integration" className="text-xl font-semibold mt-8 mb-4 text-gray-900">2. AI Integration Test</h3>

        <p className="mb-4 text-gray-700 leading-relaxed">
          <strong>Test that your AI actually sends metrics:</strong>
        </p>

        <ol className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Go to http://localhost:3000</li>
          <li className="text-gray-700">Create a test business or use existing</li>
          <li className="text-gray-700">Chat with the AI (ask any question)</li>
          <li className="text-gray-700">Check http://localhost:5001/metrics for new data</li>
          <li className="text-gray-700">Look for your business ID in the metrics</li>
        </ol>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-green-800 mb-2">✅ Success Indicators</h4>
          <ul className="text-green-700 space-y-1">
            <li>• All tests pass when running <code className="bg-white px-1 py-0.5 rounded text-sm font-mono">pytest</code></li>
            <li>• Manual curl commands work</li>
            <li>• AI chat generates metrics you can see</li>
            <li>• Metrics contain your business data</li>
          </ul>
        </div>

        <h2 id="troubleshooting" className="text-2xl font-bold mt-10 mb-6 text-gray-900">Troubleshooting</h2>

        <div className="space-y-4 mb-6">
          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Tests fail with "ModuleNotFoundError":</p>
            <p className="text-gray-700">Make sure you're in the mlops-service directory and have activated your virtual environment</p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Tests pass but integration fails:</p>
            <p className="text-gray-700">Check that both Next.js (port 3000) and Flask (port 5001) are running in separate terminals</p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">No metrics appear after AI chat:</p>
            <p className="text-gray-700">Verify MLOPS_SERVICE_URL=http://localhost:5001 is in your main .env file (not the mlops-service .env)</p>
          </div>

          <div className="border-l-4 border-red-400 pl-4">
            <p className="font-semibold text-gray-900">Pytest command not found:</p>
            <p className="text-gray-700">Run <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">pip install pytest</code> in your activated virtual environment</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6 text-gray-900">Lab 3 Summary - What You Accomplished</h2>

        <p className="mb-6 text-gray-700 leading-relaxed">
          Excellent work! You've successfully implemented comprehensive testing for your MLOps service. Here's what you accomplished:
        </p>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">✅ Testing Skills Gained</h3>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Unit Testing:</strong> Individual component testing with pytest</li>
          <li className="text-gray-700"><strong>API Testing:</strong> HTTP endpoint validation and response checking</li>
          <li className="text-gray-700"><strong>Error Testing:</strong> Validation of error handling and edge cases</li>
          <li className="text-gray-700"><strong>Integration Testing:</strong> End-to-end flow verification</li>
        </ul>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">📊 What Your Tests Cover</h3>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700"><strong>Service Health:</strong> Ensures your MLOps service stays online</li>
          <li className="text-gray-700"><strong>Metrics Collection:</strong> Validates AI performance tracking works</li>
          <li className="text-gray-700"><strong>Data Validation:</strong> Prevents bad data from breaking your system</li>
          <li className="text-gray-700"><strong>Prometheus Integration:</strong> Confirms metrics reach monitoring system</li>
        </ul>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            <strong>Industry Relevance:</strong> The testing patterns you learned are used in production AI systems at major tech companies. You now know how to validate AI service reliability.
          </p>
        </div>

        <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">🚀 Prepare for Lab 4</h3>

        <ul className="mb-6 ml-6 space-y-2">
          <li className="text-gray-700">Keep your test suite - we'll integrate it into CI/CD pipelines</li>
          <li className="text-gray-700">Your tests will run automatically on every code change</li>
          <li className="text-gray-700">Lab 4 will cover GitHub Actions for automated testing</li>
        </ul>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
          <div>
            <Link href="/labs/lab2" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Lab 2: MLOps Integration
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