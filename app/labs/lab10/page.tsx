'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Info, Terminal, Code, Zap, Lock, Shield, Key, Eye } from "lucide-react"

export default function Lab10Page() {
  return (
    <div className="space-y-8">
      {/* Lab Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-md font-medium">Security</span>
          <span>•</span>
          <span>Security & Compliance for AI Systems</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lab 10: Security & Compliance for AI Systems</h1>
          <p className="text-lg text-gray-600">
            Learn fundamental security practices for protecting your AI receptionist system, including API authentication, rate limiting, secure configuration management, and GDPR compliance basics.
          </p>
        </div>
      </div>

      {/* Lab Overview */}
      <Card id="overview">
        <CardHeader>
          <CardTitle>Lab Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700">
            <strong>What You'll Do:</strong> Understand security fundamentals for AI systems, implement API key authentication, add rate limiting to prevent abuse, create secure environment variable templates, and learn GDPR compliance basics for AI chat data
          </p>

          <div>
            <p className="text-gray-700 mb-2"><strong>What You'll Build:</strong></p>
            <ul className="list-disc list-inside ml-4 text-gray-700 space-y-1">
              <li>Secured MLOps service with API key authentication</li>
              <li>Rate-limited endpoints to prevent abuse</li>
              <li>.env.example template for secure configuration</li>
              <li>Security best practices checklist</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Lab Collaborators:</strong>
            </p>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Edward Lampoh - Software Developer & Collaborator</li>
              <li>• Oluwafemi Adebayo, PhD - Academic Professor & Collaborator</li>
            </ul>
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              <strong>Note:</strong> This lab focuses on <strong>practical, fundamental security</strong> appropriate for a college course. Production systems require additional security measures beyond this lab's scope.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Prerequisites */}
      <Card id="prerequisites">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            Prerequisites Required
          </CardTitle>
          <CardDescription>Complete Labs 1-9 before starting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You must complete Labs 1-9 before starting Lab 10.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <p className="font-semibold text-gray-900">Before starting Lab 10, ensure you have:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Completed Labs 1-9</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Flask MLOps service running locally</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Basic understanding of HTTP requests and headers</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Familiarity with environment variables</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold text-gray-900 mb-2">Quick Test</p>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`# Verify Flask service is running
curl http://localhost:5001/health

# Should return healthy status`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>

      {/* Part A: Understanding Security */}
      <div id="part-a" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part A: Understanding Security for AI Systems</h2>
        <p className="text-gray-600 italic">Learn the fundamentals of protecting AI applications from threats</p>

        <Card id="what-is-security">
          <CardHeader>
            <CardTitle>1. What is Application Security?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>Application security</strong> is the practice of protecting software applications from threats throughout their lifecycle.
            </p>

            <div>
              <p className="font-semibold text-gray-900 mb-3">The CIA Triad</p>
              <p className="text-gray-700 mb-3">Security professionals use the <strong>CIA Triad</strong> to think about security:</p>

              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Confidentiality</h4>
                  <p className="text-sm text-blue-800">
                    <strong>Definition:</strong> Only authorized users can access data<br/>
                    <strong>Example:</strong> API keys prevent unauthorized access to metrics
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-2">Integrity</h4>
                  <p className="text-sm text-green-800">
                    <strong>Definition:</strong> Data remains accurate and unmodified<br/>
                    <strong>Example:</strong> Validate metrics data before storing
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Availability</h4>
                  <p className="text-sm text-purple-800">
                    <strong>Definition:</strong> System remains accessible when needed<br/>
                    <strong>Example:</strong> Rate limiting prevents DDoS attacks
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="security-threats">
          <CardHeader>
            <CardTitle>2. Common Security Threats for AI Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="font-semibold text-red-900 mb-2">API Key Leakage</p>
                <p className="text-red-800 text-sm mb-2">
                  <strong>What it is:</strong> Accidentally exposing API keys in code, git commits, or logs
                </p>
                <p className="text-red-800 text-sm mb-2">
                  <strong>Risk:</strong> Attackers can use your API keys to access your system, rack up API costs, or steal sensitive data
                </p>
                <div className="bg-red-100 border border-red-200 rounded p-3 mt-2">
                  <p className="text-red-900 text-sm font-semibold">Real Example:</p>
                  <p className="text-red-800 text-sm">
                    A student accidentally committed AWS credentials to GitHub. Within 15 minutes, automated bots found the keys and started mining cryptocurrency. Bill: $2,500.
                  </p>
                </div>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                <p className="font-semibold text-orange-900 mb-2">Denial of Service (DoS)</p>
                <p className="text-orange-800 text-sm mb-2">
                  <strong>What it is:</strong> Overwhelming your service with requests until it crashes
                </p>
                <p className="text-orange-800 text-sm">
                  <strong>Risk:</strong> Without rate limiting, attackers (or bugs!) can make thousands of requests per second, crash your Flask service, max out your AI API quota, and generate huge cloud bills
                </p>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-semibold text-yellow-900 mb-2">SQL Injection</p>
                <p className="text-yellow-800 text-sm mb-2">
                  <strong>What it is:</strong> Inserting malicious SQL code through user input
                </p>
                <p className="text-yellow-800 text-sm mb-2">
                  <strong>Risk:</strong> Attackers can read your entire database, delete all data, or modify business information
                </p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-xs mt-2">
                  <code>{`# VULNERABLE CODE (Never do this!)
query = f"SELECT * FROM businesses WHERE name = '{user_input}'"

# If user_input is: "'; DROP TABLE businesses; --"
# The query becomes:
# SELECT * FROM businesses WHERE name = ''; DROP TABLE businesses; --'`}</code>
                </pre>
                <p className="text-yellow-800 text-sm mt-2">
                  <strong>Safe Approach:</strong> Always use parameterized queries (which our app already does!)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="security-vs-compliance">
          <CardHeader>
            <CardTitle>3. Security vs Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-3">Security</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <p><strong>What:</strong> Protecting your system from threats</p>
                  <p><strong>Example:</strong> API key authentication</p>
                  <p><strong>Who enforces:</strong> Attackers exploit weaknesses</p>
                  <p><strong>Goal:</strong> Prevent unauthorized access</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-3">Compliance</h4>
                <div className="space-y-2 text-sm text-green-800">
                  <p><strong>What:</strong> Following laws and regulations</p>
                  <p><strong>Example:</strong> GDPR data protection</p>
                  <p><strong>Who enforces:</strong> Governments fine violations</p>
                  <p><strong>Goal:</strong> Handle data ethically and legally</p>
                </div>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Both are important! Security keeps attackers out. Compliance keeps you out of legal trouble.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Part B: Secure Environment Variables */}
      <div id="part-b" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part B: Secure Environment Variables</h2>
        <p className="text-gray-600 italic">Learn how to manage sensitive configuration securely</p>

        <Card id="why-env-vars">
          <CardHeader>
            <CardTitle>1. Why Environment Variables Matter</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>Environment variables</strong> store sensitive configuration like API keys, database URLs, and secrets.
            </p>

            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-900 mb-2">Bad Practice</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                  <code>{`# Hardcoded secret in code (NEVER DO THIS!)
API_KEY = "sk-abc123xyz456"
DATABASE_URL = "postgresql://user:password@host/db"`}</code>
                </pre>
                <p className="text-red-800 text-sm mt-2"><strong>Problems:</strong></p>
                <ul className="list-disc list-inside ml-4 text-red-800 text-sm space-y-1">
                  <li>Visible in code</li>
                  <li>Committed to git history</li>
                  <li>Exposed to anyone with code access</li>
                  <li>Can't change without redeploying</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">Good Practice</p>
                <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                  <code>{`# Load from environment variables
import os
API_KEY = os.getenv('API_KEY')
DATABASE_URL = os.getenv('DATABASE_URL')`}</code>
                </pre>
                <p className="text-green-800 text-sm mt-2"><strong>Benefits:</strong></p>
                <ul className="list-disc list-inside ml-4 text-green-800 text-sm space-y-1">
                  <li>Secrets stay out of code</li>
                  <li>Different values per environment (dev, staging, production)</li>
                  <li>Easy to rotate/change</li>
                  <li>Not committed to git</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="review-setup">
          <CardHeader>
            <CardTitle>2. Review Current Setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">Check where your secrets are stored:</p>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Verify .env file and .gitignore:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`cd mlops-service

# View your .env file (contains real secrets)
cat .env

# Check if .env is in .gitignore
cat ../.gitignore | grep .env`}</code>
              </pre>
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Expected:</strong> .env should be listed in .gitignore and won't be committed.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="env-example">
          <CardHeader>
            <CardTitle>3. Create .env.example Template</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              The <code className="bg-gray-200 px-1 py-0.5 rounded">.env.example</code> file has already been updated in your <code className="bg-gray-200 px-1 py-0.5 rounded">mlops-service/</code> directory.
            </p>

            <div>
              <p className="font-semibold text-gray-900 mb-2">View the template:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# View the template
cat mlops-service/.env.example`}</code>
              </pre>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">What's in .env.example:</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1">
                <li>Template with placeholder values</li>
                <li>Comments explaining each variable</li>
                <li><strong>NO real secrets</strong> (safe to commit to git)</li>
                <li>Instructions for developers to copy and fill in</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Usage for new team members:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Copy template and fill in actual values
cp .env.example .env
# Then edit .env with your actual credentials`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card id="best-practices">
          <CardHeader>
            <CardTitle>4. Security Best Practices for Secrets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">DO:</p>
                <ul className="list-disc list-inside ml-4 text-green-800 text-sm space-y-1">
                  <li>Use environment variables for all secrets</li>
                  <li>Add .env to .gitignore</li>
                  <li>Use different secrets for dev/staging/production</li>
                  <li>Rotate secrets regularly (quarterly)</li>
                  <li>Use secret management tools in production</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-900 mb-2">DON'T:</p>
                <ul className="list-disc list-inside ml-4 text-red-800 text-sm space-y-1">
                  <li>Hardcode secrets in code</li>
                  <li>Commit .env files to git</li>
                  <li>Share secrets via email or Slack</li>
                  <li>Reuse the same secret across environments</li>
                  <li>Log sensitive values (API keys, passwords)</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-yellow-900 mb-2">Check Git History for Leaked Secrets</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                <code>{`# Search entire git history for .env files
git log --all --full-history -- "*/.env"

# If you find any results, the .env file was committed before!`}</code>
              </pre>
              <p className="text-yellow-800 text-sm mt-2">
                <strong>Expected:</strong> No results (clean history). In real projects with leaks, you'd need to rotate all credentials and use tools like git-secrets or BFG Repo-Cleaner.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part C: API Rate Limiting */}
      <div id="part-c" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part C: API Rate Limiting</h2>
        <p className="text-gray-600 italic">Prevent abuse by restricting request frequency</p>

        <Card id="what-is-rate-limiting">
          <CardHeader>
            <CardTitle>1. What is Rate Limiting?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>Rate limiting</strong> restricts how many requests a user can make in a time period.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">Example:</p>
              <div className="text-blue-800 text-sm space-y-1">
                <p>Rate limit: 100 requests per hour</p>
                <p>• User makes 100 requests → All allowed</p>
                <p>• User makes 101st request → Blocked! (429 Too Many Requests)</p>
                <p>• User waits 1 hour → Counter resets, can make 100 more</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="why-rate-limiting">
          <CardHeader>
            <CardTitle>2. Why Rate Limiting is Important</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="font-semibold text-red-900">Prevent Abuse</p>
                <p className="text-sm text-red-800">
                  Malicious users can't overwhelm your service. Bugs (infinite loops) won't crash your system.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="font-semibold text-orange-900">Control Costs</p>
                <p className="text-sm text-orange-800">
                  AI APIs charge per request. Rate limits cap your maximum spend.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-semibold text-green-900">Ensure Fair Access</p>
                <p className="text-sm text-green-800">
                  One user can't monopolize resources. All users get reasonable access.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-yellow-900 mb-2">Example Scenario Without Rate Limiting:</p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                <code>{`User 1: Accidentally creates infinite loop
        Sends 10,000 requests in 5 minutes

Result:
- Your Flask service crashes
- AI API bill: $500
- Other users can't access service`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card id="understanding-limits">
          <CardHeader>
            <CardTitle>3. Understanding Our Rate Limits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">Our Flask service now has these rate limits:</p>

            <div className="space-y-2">
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900">/ (Dashboard)</p>
                <p className="text-sm text-gray-700">No limit - Public page, static content</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900">/health</p>
                <p className="text-sm text-gray-700">100/minute - Health checks should be frequent</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900">/health/detailed</p>
                <p className="text-sm text-gray-700">50/minute - More expensive to compute</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900">/metrics</p>
                <p className="text-sm text-gray-700">No limit - Prometheus scrapes frequently</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900">/track</p>
                <p className="text-sm text-gray-700">100/hour - Metrics tracking, needs protection</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900">/analytics/&lt;id&gt;</p>
                <p className="text-sm text-gray-700">50/hour - Database queries, more expensive</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <p className="font-semibold text-gray-900">/refresh-metrics</p>
                <p className="text-sm text-gray-700">10/hour - Expensive operation</p>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Default for other endpoints:</strong> 200/day, 50/hour
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="test-rate-limiting">
          <CardHeader>
            <CardTitle>4. Test Rate Limiting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Start Flask Service:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`cd mlops-service
python app.py

# You should see:
# 🚦 Rate Limiting: ENABLED`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Test Normal Request (Within Limit):</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Single request - should work
curl http://localhost:5001/health`}</code>
              </pre>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Expected:</strong> Status 200, JSON response
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Test Rate Limit Exceeded:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Send 101 requests in a loop (exceeds 100/minute limit)
for i in {1..101}; do
  curl -s http://localhost:5001/health
  echo "Request $i"
done`}</code>
              </pre>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Expected:</strong> First 100 requests succeed (200), 101st request returns <strong>429 Too Many Requests</strong>
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Response when rate limited:</p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{`{
  "error": "429 Too Many Requests",
  "message": "1 per 1 minute"
}`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">View Rate Limit Headers:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Check rate limit status in headers
curl -I http://localhost:5001/health`}</code>
              </pre>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Response Headers:</strong>
              </p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto text-sm mt-2">
                <code>{`X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1704567890`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card id="how-it-works">
          <CardHeader>
            <CardTitle>5. How Rate Limiting Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">Our implementation uses <code className="bg-gray-200 px-1 py-0.5 rounded">flask-limiter</code>:</p>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

# Initialize rate limiter
limiter = Limiter(
    get_remote_address,  # Track by IP address
    app=app,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://",  # Store in memory
)

# Apply to endpoint
@app.route('/health')
@limiter.limit("100 per minute")
def health_check():
    return jsonify({'status': 'healthy'})`}</code>
            </pre>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">Key Points:</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1">
                <li><strong>Tracked by IP address:</strong> Each IP has separate limits</li>
                <li><strong>Memory storage:</strong> Limits reset when service restarts</li>
                <li><strong>Per-endpoint:</strong> Different limits for different endpoints</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="font-semibold text-yellow-900 mb-2">Production Considerations:</p>
              <ul className="list-disc list-inside ml-4 text-yellow-800 text-sm space-y-1">
                <li>Use Redis for persistent storage (limits survive restarts)</li>
                <li>Track by user ID instead of IP (more accurate)</li>
                <li>Implement tiered limits (free users: 100/day, paid: 10,000/day)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part D: API Key Authentication */}
      <div id="part-d" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part D: API Key Authentication</h2>
        <p className="text-gray-600 italic">Protect sensitive endpoints with API key authentication</p>

        <Card id="what-are-api-keys">
          <CardHeader>
            <CardTitle>1. What are API Keys?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>API keys</strong> are secret tokens that identify and authenticate applications.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">Analogy:</p>
              <p className="text-blue-800 text-sm">
                An API key is like a house key:
              </p>
              <ul className="list-disc list-inside ml-4 text-blue-800 text-sm space-y-1 mt-1">
                <li>You need the right key to enter</li>
                <li>Don't share your key with strangers</li>
                <li>Change locks if key is stolen</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Example API Key:</p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto text-sm">
                <code>MLOPS_API_KEY=9a7f2c8e5d1b3f6a4e8c9d2f1a7b5c3e</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card id="how-auth-works">
          <CardHeader>
            <CardTitle>2. How API Key Authentication Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="font-semibold text-red-900">Without Authentication:</p>
                <p className="text-sm text-red-800 mt-1">
                  User → Request → Flask → Always accepts
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-semibold text-green-900">With API Key Authentication:</p>
                <p className="text-sm text-green-800 mt-1">
                  User → Request with X-API-Key header → Flask → Check key → Allow/Deny
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">Flow:</p>
              <ol className="list-decimal list-inside ml-4 text-blue-800 space-y-1 text-sm">
                <li>User includes <code className="bg-blue-100 px-1 py-0.5 rounded">X-API-Key: your-key-here</code> in request header</li>
                <li>Flask checks if key matches <code className="bg-blue-100 px-1 py-0.5 rounded">MLOPS_API_KEY</code> environment variable</li>
                <li>If match: Allow request</li>
                <li>If no match: Return 401 Unauthorized or 403 Forbidden</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card id="generate-key">
          <CardHeader>
            <CardTitle>3. Generate Secure API Key</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Generate a random API key:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Mac/Linux
openssl rand -hex 32

# Output example:
# 9a7f2c8e5d1b3f6a4e8c9d2f1a7b5c3e8f4d2a6b9c1e7f3a5d8b2c6e4f1a3d7`}</code>
              </pre>
            </div>

            <Alert>
              <Key className="h-4 w-4" />
              <AlertDescription>
                <strong>Copy this key</strong> - you'll need it in the next step!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="configure-key">
          <CardHeader>
            <CardTitle>4. Configure API Key</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Add your generated API key to .env:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`cd mlops-service
nano .env  # or use your preferred editor`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Add this line:</p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto text-sm">
                <code>MLOPS_API_KEY=your-generated-key-here</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Save and restart Flask service:</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Stop current service (Ctrl+C)
# Start again
python app.py

# You should see:
# 🔐 Security: API Key Authentication ENABLED`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card id="test-auth">
          <CardHeader>
            <CardTitle>5. Test API Key Authentication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900 mb-2">Request Without API Key (Unauthorized):</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Try to track metrics without API key
curl -X POST http://localhost:5001/track \\
  -H "Content-Type: application/json" \\
  -d '{
    "business_id": "test",
    "response_time_ms": 100,
    "tokens_used": 50
  }'`}</code>
              </pre>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Expected Response (401):</strong>
              </p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto text-sm mt-2">
                <code>{`{
  "error": "Unauthorized",
  "message": "API key required. Include X-API-Key header."
}`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Request With Wrong API Key (Forbidden):</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Try with incorrect key
curl -X POST http://localhost:5001/track \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: wrong-key-here" \\
  -d '{
    "business_id": "test",
    "response_time_ms": 100,
    "tokens_used": 50
  }'`}</code>
              </pre>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Expected Response (403):</strong>
              </p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto text-sm mt-2">
                <code>{`{
  "error": "Forbidden",
  "message": "Invalid API key"
}`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-2">Request With Correct API Key (Success):</p>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                <code>{`# Replace YOUR_API_KEY with your actual key from .env
curl -X POST http://localhost:5001/track \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -d '{
    "business_id": "test-business",
    "response_time_ms": 150,
    "tokens_used": 75,
    "api_cost_usd": 0.002,
    "intent_detected": "appointment",
    "response_type": "booking",
    "appointment_requested": false
  }'`}</code>
              </pre>
              <p className="text-gray-700 text-sm mt-2">
                <strong>Expected Response (200):</strong>
              </p>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-3 overflow-x-auto text-sm mt-2">
                <code>{`{
  "status": "success",
  "message": "Metrics tracked successfully",
  "prometheus_updated": true,
  "database_stored": true,
  "timestamp": "2024-01-15T10:30:00.000000"
}`}</code>
              </pre>
            </div>

            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>
                <strong>Success Check:</strong> If you receive a 200 response with valid API key, authentication is working!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="protected-endpoints">
          <CardHeader>
            <CardTitle>6. Protected vs Public Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-900 mb-2">Protected Endpoints (API Key Required):</p>
                <ul className="list-disc list-inside ml-4 text-red-800 text-sm space-y-1">
                  <li>/track - Metrics submission</li>
                  <li>/analytics/&lt;business_id&gt; - Analytics data</li>
                  <li>/refresh-metrics - Metrics refresh</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">Public Endpoints (No API Key):</p>
                <ul className="list-disc list-inside ml-4 text-green-800 text-sm space-y-1">
                  <li>/ - Dashboard</li>
                  <li>/health - Health check</li>
                  <li>/metrics - Prometheus metrics</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part E: GDPR Compliance */}
      <div id="part-e" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part E: GDPR Compliance Basics</h2>
        <p className="text-gray-600 italic">Learn fundamental privacy and compliance requirements for AI systems</p>

        <Card id="what-is-gdpr">
          <CardHeader>
            <CardTitle>1. What is GDPR?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              <strong>GDPR (General Data Protection Regulation)</strong> is a European law that protects people's personal data.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">Applies When:</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 space-y-1">
                <li>Your users are in the European Union</li>
                <li>Your company is based in the EU</li>
                <li>You process EU citizens' data</li>
              </ul>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Key Principle:</strong> Give users control over their personal data.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="what-data">
          <CardHeader>
            <CardTitle>2. What Data Does Our AI Chat Collect?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="bg-red-50 border border-red-200 rounded p-3">
                <p className="font-semibold text-red-900">Personal Data (Requires Protection):</p>
                <ul className="list-disc list-inside ml-4 text-red-800 text-sm space-y-1">
                  <li><strong>User Messages:</strong> "I want to book an appointment"</li>
                  <li><strong>Email Addresses:</strong> john@example.com</li>
                  <li><strong>Names:</strong> "John Smith"</li>
                  <li><strong>Phone Numbers:</strong> +1-555-1234</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-3">
                <p className="font-semibold text-green-900">Non-Personal Data (Anonymous):</p>
                <ul className="list-disc list-inside ml-4 text-green-800 text-sm space-y-1">
                  <li><strong>Business ID:</strong> uuid-abc-123</li>
                  <li><strong>Metrics:</strong> Response time, token count</li>
                </ul>
              </div>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Our AI chat collects personal data! We need to handle it properly.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="gdpr-requirements">
          <CardHeader>
            <CardTitle>3. GDPR Requirements (Simplified)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="font-semibold text-gray-900">Lawful Basis for Processing</p>
                <p className="text-sm text-gray-700">
                  <strong>Question:</strong> Why are you collecting this data?<br/>
                  <strong>Our Answer:</strong> Providing the service (appointment booking)
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="font-semibold text-blue-900">Consent</p>
                <p className="text-sm text-blue-800 mb-2">
                  <strong>Requirement:</strong> Users must agree to data collection
                </p>
                <div className="bg-blue-100 border border-blue-200 rounded p-2 text-sm">
                  <p className="text-blue-900">Implementation example:</p>
                  <p className="text-blue-800 mt-1">
                    ☑ I agree to allow this chat to be stored for service purposes.<br/>
                    <span className="underline">Privacy Policy</span>
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="font-semibold text-green-900">Right to Access</p>
                <p className="text-sm text-green-800">
                  <strong>Requirement:</strong> Users can request their data<br/>
                  <strong>Implementation:</strong> Provide endpoint to export user's chat history
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="font-semibold text-orange-900">Right to Deletion</p>
                <p className="text-sm text-orange-800">
                  <strong>Requirement:</strong> Users can request data deletion<br/>
                  <strong>Implementation:</strong> Provide "delete my data" button/endpoint
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="font-semibold text-purple-900">Data Retention</p>
                <p className="text-sm text-purple-800">
                  <strong>Requirement:</strong> Don't keep data longer than necessary<br/>
                  <strong>Implementation:</strong> Delete chat logs after 90 days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="gdpr-checklist">
          <CardHeader>
            <CardTitle>4. Simple GDPR Checklist for Our Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">For a college project, we'll implement basic compliance:</p>

            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Inform Users</p>
                  <p className="text-sm text-gray-700">
                    Add privacy notice: "Your chat messages are stored to provide this service"<br/>
                    Link to privacy policy (can be simple)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Data Minimization</p>
                  <p className="text-sm text-gray-700">
                    Only collect what's needed (email, name for appointments)<br/>
                    Don't collect unnecessary data (age, address, etc.)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Data Retention</p>
                  <p className="text-sm text-gray-700">
                    Plan to delete old chats (conceptual for now)<br/>
                    Production would implement: DELETE FROM chats WHERE created_at &lt; NOW() - INTERVAL '90 days'
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Secure Storage</p>
                  <p className="text-sm text-gray-700">
                    Database uses SSL (?sslmode=require in DATABASE_URL)<br/>
                    Environment variables secure API keys
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="data-retention">
          <CardHeader>
            <CardTitle>5. Implementing Data Retention (Conceptual)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              SQL Query to Delete Old Chat Logs:
            </p>

            <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
              <code>{`-- Delete chat messages older than 90 days
DELETE FROM chat_messages
WHERE created_at < NOW() - INTERVAL '90 days';

-- Delete old AI metrics
DELETE FROM ai_metrics
WHERE created_at < NOW() - INTERVAL '90 days';`}</code>
            </pre>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="font-semibold text-blue-900 mb-2">Scheduled Job (Production):</p>
              <ul className="list-disc list-inside ml-4 text-blue-800 text-sm space-y-1">
                <li>Run this query daily via cron job or AWS Lambda</li>
                <li>Log deletions for compliance audit trail</li>
              </ul>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>For Lab 10:</strong> We won't implement the actual scheduled deletion, but understanding the concept is important!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card id="privacy-best-practices">
          <CardHeader>
            <CardTitle>6. Privacy Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">DO:</p>
                <ul className="list-disc list-inside ml-4 text-green-800 text-sm space-y-1">
                  <li>Be transparent about data collection</li>
                  <li>Provide privacy policy</li>
                  <li>Implement data retention policies</li>
                  <li>Use encryption (HTTPS, SSL database connections)</li>
                  <li>Give users control over their data</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-semibold text-red-900 mb-2">DON'T:</p>
                <ul className="list-disc list-inside ml-4 text-red-800 text-sm space-y-1">
                  <li>Collect data you don't need</li>
                  <li>Share data with third parties without consent</li>
                  <li>Keep data indefinitely</li>
                  <li>Log sensitive information (passwords, API keys)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Part F: Security Best Practices */}
      <div id="part-f" className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Part F: Security Best Practices Checklist</h2>
        <p className="text-gray-600 italic">Production-ready security measures for AI systems</p>

        <Card id="production-checklist">
          <CardHeader>
            <CardTitle>Production Security Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">Use this checklist to verify your AI application is secured:</p>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Environment Variables</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">All secrets in environment variables (not hardcoded)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">.env file in .gitignore</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">.env.example template in repository</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Different secrets for dev/staging/production</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Secrets rotated quarterly</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">API Security</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">API key authentication on sensitive endpoints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Rate limiting enabled</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">HTTPS only (in production)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">CORS configured properly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Input validation on all endpoints</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">Database Security</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">SSL/TLS encryption enabled (?sslmode=require)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Parameterized queries (no SQL injection)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Database credentials in environment variables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Least privilege principle (app user can't drop tables)</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">Logging & Monitoring</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Log authentication attempts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Don't log sensitive data (API keys, passwords)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Monitor for suspicious activity</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Set up alerts for security events</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gray-900 mb-2">Compliance</p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Privacy policy published</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">User consent for data collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Data retention policy defined</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">User data export/deletion available</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card id="lab-vs-production">
          <CardHeader>
            <CardTitle>What We Implemented vs Real Production</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">What We Implemented in Lab 10:</p>
                <ul className="list-disc list-inside ml-4 text-green-800 text-sm space-y-1">
                  <li>API key authentication</li>
                  <li>Rate limiting</li>
                  <li>Secure environment variables</li>
                  <li>.env.example template</li>
                  <li>GDPR awareness</li>
                </ul>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="font-semibold text-orange-900 mb-2">What's Left for Real Production:</p>
                <ul className="list-disc list-inside ml-4 text-orange-800 text-sm space-y-1">
                  <li>OAuth 2.0 / JWT (Industry-standard auth)</li>
                  <li>Data Encryption at Rest</li>
                  <li>WAF (Web Application Firewall)</li>
                  <li>Security Audit Logging</li>
                  <li>Penetration Testing</li>
                  <li>Container Scanning</li>
                  <li>HTTPS Certificates (SSL/TLS)</li>
                </ul>
              </div>
            </div>

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Remember:</strong> Lab 10 covers <strong>fundamental security</strong>. Production systems need much more!
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>

      {/* Troubleshooting */}
      <Card id="troubleshooting">
        <CardHeader>
          <CardTitle>Troubleshooting</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-900">Flask won't start after adding flask-limiter:</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Error:</strong> ModuleNotFoundError: No module named 'flask_limiter'
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                <code>{`cd mlops-service
pip install flask-limiter==3.5.0`}</code>
              </pre>
            </div>

            <div>
              <p className="font-semibold text-gray-900">API key authentication not working:</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Symptoms:</strong> All requests return 401 Unauthorized, even correct API key fails
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Check:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 text-gray-700 text-sm space-y-1">
                <li>Is MLOPS_API_KEY set in .env? <code className="bg-gray-200 px-1 py-0.5 rounded">cat .env | grep MLOPS_API_KEY</code></li>
                <li>Did you restart Flask after updating .env?</li>
                <li>Is the API key in the header correct?</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Rate limit headers not showing:</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Symptoms:</strong> Requests work but no X-RateLimit-* headers
              </p>
              <p className="text-sm text-gray-700">
                This is normal! Flask-Limiter only adds headers when rate limit is close to being hit or after hitting the limit.
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Development mode - API key not required:</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Symptoms:</strong> Requests work without API key, logs show "API Key Authentication DISABLED"
              </p>
              <p className="text-sm text-gray-700">
                This is by design! If MLOPS_API_KEY is not set in .env, authentication is disabled for easier development. To enable: generate API key, add to .env, restart Flask.
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-900">Cannot test API key with curl:</p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Symptoms:</strong> curl commands too complex, syntax errors
              </p>
              <pre className="bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                <code>{`# Create test file with API key
echo "YOUR_API_KEY" > api_key.txt

# Use file in request
curl -X POST http://localhost:5001/track \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: $(cat api_key.txt)" \\
  -d '{"business_id":"test","response_time_ms":100,"tokens_used":50}'`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lab Summary */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-900">Lab 10 Summary - What You Learned</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-green-800">
            Congratulations! You've implemented fundamental security practices for your AI application. Here's what you accomplished:
          </p>

          <div>
            <p className="font-semibold text-green-900 mb-2">Security Concepts Learned</p>
            <ul className="list-disc list-inside ml-4 text-green-800 space-y-1">
              <li><strong>CIA Triad:</strong> Confidentiality, Integrity, Availability</li>
              <li><strong>Common Threats:</strong> API key leaks, DoS, SQL injection</li>
              <li><strong>Security vs Compliance:</strong> Understanding the difference</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-900 mb-2">Practical Implementation</p>
            <ul className="list-disc list-inside ml-4 text-green-800 space-y-1">
              <li>API key authentication for protected endpoints</li>
              <li>Rate limiting to prevent abuse</li>
              <li>Secure environment variable management</li>
              <li>.env.example template for team collaboration</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-green-900 mb-2">GDPR Basics</p>
            <ul className="list-disc list-inside ml-4 text-green-800 space-y-1">
              <li>What personal data is</li>
              <li>User rights (access, deletion, consent)</li>
              <li>Data retention policies</li>
              <li>Privacy best practices</li>
            </ul>
          </div>

          <div className="bg-white border border-green-300 rounded-lg p-4">
            <p className="font-semibold text-green-900 mb-2">Key Takeaways</p>
            <ul className="list-disc list-inside ml-4 text-green-800 space-y-1 text-sm">
              <li><strong>Never commit secrets to git</strong> - Use environment variables</li>
              <li><strong>Rate limiting prevents abuse</strong> - Protects against DoS and controls costs</li>
              <li><strong>Authentication protects sensitive endpoints</strong> - API keys are simplest form</li>
              <li><strong>GDPR requires transparency</strong> - Tell users what data you collect</li>
              <li><strong>Security is a process, not a product</strong> - Continuous improvement</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quiz Section */}
      <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border-2 border-cyan-200 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Test Your Knowledge</h3>
        <p className="text-gray-700 mb-4">
          Complete the Lab 10 quiz to test your understanding of security and compliance for AI systems.
        </p>
        <div className="space-y-3">
          <a
            href="/quizzes/lab10-quiz.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Take Lab 10 Quiz →
          </a>
          <div className="bg-white border border-cyan-200 rounded-lg p-4">
            <p className="font-semibold text-cyan-900 mb-2">Quiz Submission Checklist:</p>
            <ul className="list-disc list-inside ml-4 text-cyan-800 text-sm space-y-1">
              <li>Complete all 5 multiple-choice questions</li>
              <li>Take a screenshot of your results page showing:</li>
              <ul className="list-disc list-inside ml-6">
                <li>Your name</li>
                <li>Your score (aim for 4/5 or 5/5)</li>
                <li>Session ID</li>
                <li>Timestamp</li>
              </ul>
              <li>Submit screenshot as proof of completion</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-8 border-t">
        <a href="/labs/lab9" className="text-blue-600 hover:underline flex items-center gap-2">
          ← Lab 9: Monitoring & Logging
        </a>
        <a href="/labs" className="text-blue-600 hover:underline flex items-center gap-2">
          Back to Labs →
        </a>
      </div>
    </div>
  )
}
