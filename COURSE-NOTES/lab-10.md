# Lab 10: Security & Compliance for AI Systems

**Duration:** 1-2 hours
**Difficulty:** Advanced
**Prerequisites:** Labs 1-9 completed

## Lab Overview

Security is critical for production AI applications. In this lab, you'll learn fundamental security practices for protecting your AI receptionist system, including API authentication, rate limiting, secure configuration management, and GDPR compliance basics.

**What You'll Do:**
- Understand security fundamentals for AI systems
- Implement API key authentication
- Add rate limiting to prevent abuse
- Create secure environment variable templates
- Learn GDPR compliance basics for AI chat data

**What You'll Build:**
- Secured MLOps service with API key authentication
- Rate-limited endpoints to prevent abuse
- `.env.example` template for secure configuration
- Security best practices checklist

**Important:** This lab focuses on **practical, fundamental security** appropriate for a college course. Production systems require additional security measures beyond this lab's scope.

---

## Prerequisites

Before starting Lab 10, ensure you have:

- ✅ Completed Labs 1-9
- ✅ Flask MLOps service running locally
- ✅ Basic understanding of HTTP requests and headers
- ✅ Familiarity with environment variables

**Quick Verification:**

```bash
# Verify Flask service is running
curl http://localhost:5001/health

# Should return healthy status
```

---

## Part A: Understanding Security for AI Systems

### 1. What is Application Security?

**Application security** is the practice of protecting software applications from threats throughout their lifecycle.

#### The CIA Triad

Security professionals use the **CIA Triad** to think about security:

| Principle | Definition | Example in Our AI System |
|-----------|------------|--------------------------|
| **Confidentiality** | Only authorized users can access data | API keys prevent unauthorized access to metrics |
| **Integrity** | Data remains accurate and unmodified | Validate metrics data before storing |
| **Availability** | System remains accessible when needed | Rate limiting prevents DDoS attacks |

### 2. Common Security Threats for AI Applications

#### API Key Leakage
**What it is:** Accidentally exposing API keys in code, git commits, or logs

**Risk:** Attackers can use your API keys to:
- Access your AI system
- Rack up API costs on your account
- Steal sensitive business data

**Real Example:** A student accidentally committed their AWS credentials to GitHub. Within 15 minutes, automated bots found the keys and started mining cryptocurrency on their account. Bill: $2,500.

#### Denial of Service (DoS)
**What it is:** Overwhelming your service with requests until it crashes

**Risk:** Without rate limiting, attackers (or bugs!) can:
- Make thousands of requests per second
- Crash your Flask service
- Max out your AI API quota
- Generate huge cloud bills

#### SQL Injection
**What it is:** Inserting malicious SQL code through user input

**Risk:** Attackers can:
- Read your entire database
- Delete all data
- Modify business information

**Example:**
```python
# VULNERABLE CODE (Never do this!)
query = f"SELECT * FROM businesses WHERE name = '{user_input}'"

# If user_input is: "'; DROP TABLE businesses; --"
# The query becomes: SELECT * FROM businesses WHERE name = ''; DROP TABLE businesses; --'
```

**Safe Approach:** Always use parameterized queries (which our app already does!)

### 3. Security vs Compliance

| Security | Compliance |
|----------|------------|
| **What:** Protecting your system from threats | **What:** Following laws and regulations |
| **Example:** API key authentication | **Example:** GDPR data protection |
| **Who enforces:** Attackers exploit weaknesses | **Who enforces:** Governments fine violations |
| **Goal:** Prevent unauthorized access | **Goal:** Handle data ethically and legally |

Both are important! Security keeps attackers out. Compliance keeps you out of legal trouble.

---

## Part B: Secure Environment Variables

### 1. Why Environment Variables Matter

**Environment variables** store sensitive configuration like API keys, database URLs, and secrets.

**❌ Bad Practice:**
```python
# Hardcoded secret in code (NEVER DO THIS!)
API_KEY = "sk-abc123xyz456"
DATABASE_URL = "postgresql://user:password@host/db"
```

**Problems:**
- Visible in code
- Committed to git history
- Exposed to anyone with code access
- Can't change without redeploying

**✅ Good Practice:**
```python
# Load from environment variables
import os
API_KEY = os.getenv('API_KEY')
DATABASE_URL = os.getenv('DATABASE_URL')
```

**Benefits:**
- Secrets stay out of code
- Different values per environment (dev, staging, production)
- Easy to rotate/change
- Not committed to git

### 2. Review Current Setup

Check where your secrets are stored:

```bash
cd mlops-service

# View your .env file (contains real secrets)
cat .env

# Check if .env is in .gitignore
cat ../.gitignore | grep .env
```

**Expected Output:**
```
.env
```

✅ Good! `.env` is gitignored and won't be committed.

### 3. Create .env.example Template

The `.env.example` file has already been updated in your `mlops-service/` directory. Let's review it:

```bash
# View the template
cat /mlops-service/.env.example
```

**What's in .env.example:**
- Template with placeholder values
- Comments explaining each variable
- **NO real secrets** (safe to commit to git)
- Instructions for developers to copy and fill in

**Usage:**
```bash
# New team member sets up project:
cp .env.example .env
# Then fills in their actual values
```

### 4. Check Git History for Leaked Secrets

Even if `.env` is currently gitignored, it might have been committed in the past!

```bash
# Search entire git history for .env files
git log --all --full-history -- "*/.env"

# If you find any results, the .env file was committed before!
# In real projects, you'd need to:
# 1. Rotate all leaked credentials
# 2. Use tools like git-secrets or BFG Repo-Cleaner
```

**Expected:** No results (clean history)

### 5. Security Best Practices for Secrets

✅ **DO:**
- Use environment variables for all secrets
- Add `.env` to `.gitignore`
- Use different secrets for dev/staging/production
- Rotate secrets regularly (quarterly)
- Use secret management tools in production (AWS Secrets Manager, HashiCorp Vault)

❌ **DON'T:**
- Hardcode secrets in code
- Commit `.env` files to git
- Share secrets via email or Slack
- Reuse the same secret across environments
- Log sensitive values (API keys, passwords)

---

## Part C: API Rate Limiting

### 1. What is Rate Limiting?

**Rate limiting** restricts how many requests a user can make in a time period.

**Example:**
```
Rate limit: 100 requests per hour

User makes 100 requests → All allowed
User makes 101st request → Blocked! (429 Too Many Requests)
User waits 1 hour → Counter resets, can make 100 more
```

### 2. Why Rate Limiting is Important

#### Prevent Abuse
- Malicious users can't overwhelm your service
- Bugs (infinite loops) won't crash your system

#### Control Costs
- AI APIs charge per request
- Rate limits cap your maximum spend

#### Ensure Fair Access
- One user can't monopolize resources
- All users get reasonable access

#### Example Scenario Without Rate Limiting:

```
User 1: Accidentally creates infinite loop
        Sends 10,000 requests in 5 minutes

Result:
- Your Flask service crashes
- AI API bill: $500
- Other users can't access service
- You're fired 😱
```

### 3. Understanding Our Rate Limits

Our Flask service now has these rate limits:

| Endpoint | Rate Limit | Why |
|----------|------------|-----|
| `/` (Dashboard) | No limit | Public page, static content |
| `/health` | 100/minute | Health checks should be frequent |
| `/health/detailed` | 50/minute | More expensive to compute |
| `/metrics` | No limit | Prometheus scrapes frequently |
| `/track` | 100/hour | Metrics tracking, needs protection |
| `/analytics/<id>` | 50/hour | Database queries, more expensive |
| `/refresh-metrics` | 10/hour | Expensive operation |

**Default for other endpoints:** 200/day, 50/hour

### 4. Test Rate Limiting

Let's see rate limiting in action!

#### Start Flask Service

```bash
cd mlops-service
python app.py
```

You should see:
```
🚦 Rate Limiting: ENABLED
```

#### Test Normal Request (Within Limit)

```bash
# Single request - should work
curl http://localhost:5001/health
```

**Expected:** Status 200, JSON response

#### Test Rate Limit Exceeded

```bash
# Send 101 requests in a loop (exceeds 100/minute limit)
for i in {1..101}; do
  curl -s http://localhost:5001/health
  echo "Request $i"
done
```

**Expected:**
- First 100 requests: Success (200)
- 101st request: **429 Too Many Requests**

**Response when rate limited:**
```json
{
  "error": "429 Too Many Requests",
  "message": "1 per 1 minute"
}
```

#### View Rate Limit Headers

```bash
# Check rate limit status in headers
curl -I http://localhost:5001/health
```

**Response Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1704567890
```

### 5. How Rate Limiting Works

Our implementation uses `flask-limiter`:

```python
from flask_limiter import Limiter
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
    return jsonify({'status': 'healthy'})
```

**Key Points:**
- **Tracked by IP address:** Each IP has separate limits
- **Memory storage:** Limits reset when service restarts
- **Per-endpoint:** Different limits for different endpoints

**Production Considerations:**
- Use Redis for persistent storage (limits survive restarts)
- Track by user ID instead of IP (more accurate)
- Implement tiered limits (free users: 100/day, paid: 10,000/day)

---

## Part D: API Key Authentication

### 1. What are API Keys?

**API keys** are secret tokens that identify and authenticate applications.

**Analogy:** An API key is like a house key:
- You need the right key to enter
- Don't share your key with strangers
- Change locks if key is stolen

**Example API Key:**
```
MLOPS_API_KEY=9a7f2c8e5d1b3f6a4e8c9d2f1a7b5c3e
```

### 2. How API Key Authentication Works

**Without Authentication:**
```
User → Request → Flask → ✅ Always accepts
```

**With API Key Authentication:**
```
User → Request with X-API-Key header → Flask → Check key → ✅/❌
```

**Flow:**
1. User includes `X-API-Key: your-key-here` in request header
2. Flask checks if key matches `MLOPS_API_KEY` environment variable
3. If match: ✅ Allow request
4. If no match: ❌ Return 401 Unauthorized or 403 Forbidden

### 3. Generate Secure API Key

**Generate a random API key:**

```bash
# Mac/Linux
openssl rand -hex 32

# Output example:
# 9a7f2c8e5d1b3f6a4e8c9d2f1a7b5c3e8f4d2a6b9c1e7f3a5d8b2c6e4f1a3d7
```

**Copy this key - you'll need it in the next step!**

### 4. Configure API Key

Add your generated API key to `.env`:

```bash
cd mlops-service
nano .env  # or use your preferred editor
```

**Add this line:**
```
MLOPS_API_KEY=your-generated-key-here
```

**Save and restart Flask service:**
```bash
# Stop current service (Ctrl+C)
# Start again
python app.py
```

**You should see:**
```
🔐 Security: API Key Authentication ENABLED
```

### 5. Test API Key Authentication

#### Request Without API Key (Unauthorized)

```bash
# Try to track metrics without API key
curl -X POST http://localhost:5001/track \
  -H "Content-Type: application/json" \
  -d '{
    "business_id": "test",
    "response_time_ms": 100,
    "tokens_used": 50
  }'
```

**Expected Response (401):**
```json
{
  "error": "Unauthorized",
  "message": "API key required. Include X-API-Key header."
}
```

#### Request With Wrong API Key (Forbidden)

```bash
# Try with incorrect key
curl -X POST http://localhost:5001/track \
  -H "Content-Type: application/json" \
  -H "X-API-Key: wrong-key-here" \
  -d '{
    "business_id": "test",
    "response_time_ms": 100,
    "tokens_used": 50
  }'
```

**Expected Response (403):**
```json
{
  "error": "Forbidden",
  "message": "Invalid API key"
}
```

#### Request With Correct API Key (Success)

```bash
# Replace YOUR_API_KEY with your actual key from .env
curl -X POST http://localhost:5001/track \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{
    "business_id": "test-business",
    "response_time_ms": 150,
    "tokens_used": 75,
    "api_cost_usd": 0.002,
    "intent_detected": "appointment",
    "response_type": "booking",
    "appointment_requested": false
  }'
```

**Expected Response (200):**
```json
{
  "status": "success",
  "message": "Metrics tracked successfully",
  "prometheus_updated": true,
  "database_stored": true,
  "timestamp": "2024-01-15T10:30:00.000000"
}
```

### 6. Understanding the Implementation

The API key check is implemented as a decorator:

```python
def require_api_key(f):
    """
    Decorator to require API key authentication
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # If no API key configured, allow all (dev mode)
        if not MLOPS_API_KEY:
            return f(*args, **kwargs)

        # Check for API key in header
        api_key = request.headers.get('X-API-Key')

        if not api_key:
            return jsonify({
                'error': 'Unauthorized',
                'message': 'API key required. Include X-API-Key header.'
            }), 401

        if api_key != MLOPS_API_KEY:
            return jsonify({
                'error': 'Forbidden',
                'message': 'Invalid API key'
            }), 403

        return f(*args, **kwargs)
    return decorated_function

# Apply to endpoint
@app.route('/track', methods=['POST'])
@require_api_key
def track_metrics():
    # Only runs if API key is valid
    ...
```

**Protected Endpoints:**
- `/track` - Metrics submission
- `/analytics/<business_id>` - Analytics data
- `/refresh-metrics` - Metrics refresh

**Public Endpoints (No API Key Required):**
- `/` - Dashboard
- `/health` - Health check
- `/metrics` - Prometheus metrics

### 7. Update Next.js to Send API Key (Optional)

If you want to integrate API key authentication with your Next.js app:

**In Next.js `.env.local`:**
```
MLOPS_API_KEY=your-same-api-key-here
```

**In Next.js API route:**
```typescript
// app/api/track-metrics/route.ts
const response = await fetch(`${MLOPS_SERVICE_URL}/track`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': process.env.MLOPS_API_KEY || '',
  },
  body: JSON.stringify(metrics),
});
```

---

## Part E: GDPR Compliance Basics

### 1. What is GDPR?

**GDPR (General Data Protection Regulation)** is a European law that protects people's personal data.

**Applies When:**
- Your users are in the European Union
- Your company is based in the EU
- You process EU citizens' data

**Key Principle:** Give users control over their personal data.

### 2. What Data Does Our AI Chat Collect?

| Data Type | Examples | Is it Personal Data? |
|-----------|----------|---------------------|
| **User Messages** | "I want to book an appointment" | ✅ Yes (potentially sensitive) |
| **Email Addresses** | john@example.com | ✅ Yes (identifies person) |
| **Names** | "John Smith" | ✅ Yes |
| **Phone Numbers** | +1-555-1234 | ✅ Yes |
| **Business ID** | uuid-abc-123 | ❌ No (doesn't identify person) |
| **Metrics** | Response time, token count | ❌ No (aggregated, anonymous) |

**Important:** Our AI chat collects personal data! We need to handle it properly.

### 3. GDPR Requirements (Simplified)

#### Lawful Basis for Processing
**Question:** Why are you collecting this data?

**Our Answer:** Providing the service (appointment booking)

#### Consent
**Requirement:** Users must agree to data collection

**Implementation:** Add checkbox/notice in chat interface:
```
☑ I agree to allow this chat to be stored for service purposes.
Privacy Policy
```

#### Right to Access
**Requirement:** Users can request their data

**Implementation:** Provide endpoint to export user's chat history

#### Right to Deletion
**Requirement:** Users can request data deletion

**Implementation:** Provide "delete my data" button/endpoint

#### Data Retention
**Requirement:** Don't keep data longer than necessary

**Implementation:** Delete chat logs after 90 days

### 4. Simple GDPR Checklist for Our Project

**For a college project, we'll implement basic compliance:**

✅ **Inform Users:**
- Add privacy notice: "Your chat messages are stored to provide this service"
- Link to privacy policy (can be simple)

✅ **Data Minimization:**
- Only collect what's needed (email, name for appointments)
- Don't collect unnecessary data (age, address, etc.)

✅ **Data Retention:**
- Plan to delete old chats (conceptual for now)
- Production would implement: `DELETE FROM chats WHERE created_at < NOW() - INTERVAL '90 days'`

✅ **Secure Storage:**
- Database uses SSL (`?sslmode=require` in DATABASE_URL)
- Environment variables secure API keys

### 5. Implementing Data Retention (Conceptual)

**SQL Query to Delete Old Chat Logs:**

```sql
-- Delete chat messages older than 90 days
DELETE FROM chat_messages
WHERE created_at < NOW() - INTERVAL '90 days';

-- Delete old AI metrics
DELETE FROM ai_metrics
WHERE created_at < NOW() - INTERVAL '90 days';
```

**Scheduled Job (Production):**
- Run this query daily via cron job or AWS Lambda
- Log deletions for compliance audit trail

**For Lab 10:** We won't implement the actual scheduled deletion, but understanding the concept is important!

### 6. Privacy Best Practices

✅ **DO:**
- Be transparent about data collection
- Provide privacy policy
- Implement data retention policies
- Use encryption (HTTPS, SSL database connections)
- Give users control over their data

❌ **DON'T:**
- Collect data you don't need
- Share data with third parties without consent
- Keep data indefinitely
- Log sensitive information (passwords, API keys)

---

## Part F: Security Best Practices Checklist

### Production Security Checklist

Use this checklist to verify your AI application is secured:

#### Environment Variables
- ✅ All secrets in environment variables (not hardcoded)
- ✅ `.env` file in `.gitignore`
- ✅ `.env.example` template in repository
- ✅ Different secrets for dev/staging/production
- ✅ Secrets rotated quarterly

#### API Security
- ✅ API key authentication on sensitive endpoints
- ✅ Rate limiting enabled
- ✅ HTTPS only (in production)
- ✅ CORS configured properly
- ✅ Input validation on all endpoints

#### Database Security
- ✅ SSL/TLS encryption enabled (`?sslmode=require`)
- ✅ Parameterized queries (no SQL injection)
- ✅ Database credentials in environment variables
- ✅ Least privilege principle (app user can't drop tables)

#### Logging & Monitoring
- ✅ Log authentication attempts
- ✅ Don't log sensitive data (API keys, passwords)
- ✅ Monitor for suspicious activity
- ✅ Set up alerts for security events

#### Compliance
- ✅ Privacy policy published
- ✅ User consent for data collection
- ✅ Data retention policy defined
- ✅ User data export/deletion available

### What We Implemented in Lab 10

✅ API key authentication
✅ Rate limiting
✅ Secure environment variables
✅ `.env.example` template
✅ GDPR awareness

### What's Left for Real Production

❌ **OAuth 2.0 / JWT** (Industry-standard authentication)
❌ **Data Encryption at Rest** (Encrypt sensitive data in database)
❌ **WAF (Web Application Firewall)** (Block common attacks)
❌ **Security Audit Logging** (Track all access attempts)
❌ **Penetration Testing** (Hire security experts to test)
❌ **Container Scanning** (Check Docker images for vulnerabilities)
❌ **HTTPS Certificates** (SSL/TLS in production)

**Remember:** Lab 10 covers **fundamental security**. Production systems need much more!

---

## Troubleshooting

### Issue: Flask won't start after adding flask-limiter

**Error:**
```
ModuleNotFoundError: No module named 'flask_limiter'
```

**Solution:**
```bash
cd mlops-service
pip install flask-limiter==3.5.0
```

### Issue: API key authentication not working

**Symptoms:**
- All requests return 401 Unauthorized
- Even correct API key fails

**Check:**
1. Is `MLOPS_API_KEY` set in `.env`?
```bash
cat .env | grep MLOPS_API_KEY
```

2. Did you restart Flask after updating `.env`?
```bash
# Stop (Ctrl+C) and restart
python app.py
```

3. Is the API key in the header correct?
```bash
# Print your API key
echo $MLOPS_API_KEY  # Mac/Linux
```

### Issue: Rate limit headers not showing

**Symptoms:**
- Requests work but no X-RateLimit-* headers

**This is normal!** Flask-Limiter only adds headers when:
- Rate limit is close to being hit
- Or after hitting the limit

**To see headers:**
```bash
# Make many requests quickly
for i in {1..50}; do curl -I http://localhost:5001/health; done
```

### Issue: Development mode - API key not required

**Symptoms:**
- Requests work without API key
- Logs show: "API Key Authentication DISABLED"

**This is by design!** If `MLOPS_API_KEY` is not set in `.env`, authentication is disabled for easier development.

**To enable:**
1. Generate API key: `openssl rand -hex 32`
2. Add to `.env`: `MLOPS_API_KEY=your-key`
3. Restart Flask

### Issue: Cannot test API key with curl

**Symptoms:**
- curl commands too complex
- Syntax errors

**Simplified test:**
```bash
# Create test file with API key
echo "YOUR_API_KEY" > api_key.txt

# Use file in request
curl -X POST http://localhost:5001/track \
  -H "Content-Type: application/json" \
  -H "X-API-Key: $(cat api_key.txt)" \
  -d '{"business_id":"test","response_time_ms":100,"tokens_used":50}'
```

---

## Lab 10 Summary

Congratulations! You've implemented fundamental security practices for your AI application.

### What You Learned

**Security Concepts:**
- CIA Triad (Confidentiality, Integrity, Availability)
- Common threats (API key leaks, DoS, SQL injection)
- Security vs Compliance

**Practical Implementation:**
- ✅ API key authentication for protected endpoints
- ✅ Rate limiting to prevent abuse
- ✅ Secure environment variable management
- ✅ `.env.example` template for team collaboration

**GDPR Basics:**
- What personal data is
- User rights (access, deletion, consent)
- Data retention policies
- Privacy best practices

### Production vs Lab Comparison

| Feature | Lab 10 (Learning) | Production (Real World) |
|---------|------------------|------------------------|
| **Authentication** | Simple API key | OAuth 2.0, JWT tokens |
| **Rate Limiting** | Memory storage | Redis with distributed limits |
| **Secrets** | `.env` file | AWS Secrets Manager, Vault |
| **Compliance** | Basic awareness | Full audit trail, legal review |
| **Encryption** | Database SSL | At-rest encryption, KMS |

### Key Takeaways

🔑 **Never commit secrets to git** - Use environment variables
🚦 **Rate limiting prevents abuse** - Protects against DoS and controls costs
🔐 **Authentication protects sensitive endpoints** - API keys are simplest form
📋 **GDPR requires transparency** - Tell users what data you collect
✅ **Security is a process, not a product** - Continuous improvement

### What's Next?

**Lab 11-12:** Final Integration & Analysis
- Performance testing
- Cost analysis (compare deployments)
- MLOps analysis with Prometheus data
- Live demonstration preparation

---

## Quiz Time! 📝

Test your understanding of security and compliance:

**[Take the Lab 10 Quiz](/quizzes/lab10-quiz.html)**

### Quiz Submission Checklist:

After completing the quiz:
- ✅ Screenshot your results (showing your name and score)
- ✅ Verify score is 4/5 or 5/5
- ✅ Session ID is visible
- ✅ Timestamp is captured
- ✅ Submit screenshot as proof of completion

**Good luck!** 🎯

---

## Additional Resources

### Security Learning

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Common web vulnerabilities
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/) - API-specific security
- [Flask Security Best Practices](https://flask.palletsprojects.com/en/3.0.x/security/)

### GDPR Resources

- [GDPR Summary](https://gdpr.eu/what-is-gdpr/) - Quick overview
- [ICO Guide (UK)](https://ico.org.uk/for-organisations/guide-to-data-protection/) - Practical guidance
- [GDPR Checklist](https://gdpr.eu/checklist/) - Compliance checklist

### Tools

- [git-secrets](https://github.com/awslabs/git-secrets) - Prevent committing secrets
- [dotenv-linter](https://github.com/dotenv-linter/dotenv-linter) - Lint .env files
- [Safety](https://github.com/pyupio/safety) - Check Python dependencies for vulnerabilities

---

**Lab 10 Complete!** 🎉

You've learned fundamental security practices for AI systems. Remember: security is an ongoing process, not a one-time task. Keep learning and stay vigilant!

**Next:** Lab 11-12 - Final Integration & Analysis
