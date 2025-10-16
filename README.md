# AI Appointment Setter Lab

A platform that creates custom AI receptionist instances for different businesses. Build, deploy, and monitor AI-powered customer support with appointment booking capabilities.

## 👥 Authors & Collaborators
- **Edward Lampoh** - Software Developer & Collaborator
- **Oluwafemi Adebayo, PhD** - Academic Professor & Collaborator

## 🎯 What We're Building

This lab teaches you to create an **AI receptionist service** where:
- **Each business gets a personalized chatbot** that understands their specific services, documents, and policies
- **AI handles customer inquiries** using uploaded business documents and context
- **Intelligent appointment booking** when customers need human assistance
- **Complete MLOps pipeline** for monitoring AI performance, costs, and success rates
- **Multiple deployment strategies** from local development to serverless production

**Real-World Applications:** Dental offices, law firms, consultancy services, repair shops, and any service-based business that handles customer inquiries and scheduling.

## 🏗️ Architecture & Tech Stack

```
Next.js Full-Stack App → Vercel AI SDK → Gemini API
        ↓
   Neon PostgreSQL
        ↓
   Email Service (Resend)
        ↓
Flask MLOps Service → MLflow
```

**Frontend + Backend:** Next.js 14 with App Router and API Routes  
**AI Integration:** Vercel AI SDK + Google Gemini API  
**Database:** Neon PostgreSQL (serverless)  
**Email:** Resend API  
**MLOps:** Flask service with MLflow tracking  

## 🚀 Getting Started

### For Complete Setup Instructions
📖 **[Follow Lab 1 Setup Guide](COURSE-NOTES/lab-1.md)** - includes account creation, tool installation, and environment configuration.

### Quick Fork & Clone (if you already have Git/GitHub ready)
```bash
# 1. Fork the repository on GitHub first (creates your own copy)
# 2. Clone YOUR fork (replace YOUR_USERNAME with your GitHub username)
git clone https://github.com/YOUR_USERNAME/ai-solutions-lab.git
cd ai-solutions-lab
npm install
npm run dev
```

Visit `http://localhost:3000` to see the complete application with:
- Landing page and marketing site
- Free trial onboarding flow (no signup required)
- Business setup wizard
- AI chat interface with appointment booking
- Document upload and processing

## 🔍 Key Features to Explore

### **Free Trial Experience**
1. Click "TRY IT FREE - NO SIGNUP" on homepage
2. Set up a mock business (dental office, law firm, etc.)
3. Upload business documents or skip
4. Get personalized chat URL
5. Test AI responses and appointment booking

### **AI Receptionist Capabilities**
- Understands business context from uploaded documents
- Answers common questions about services, hours, pricing
- Smoothly transitions to appointment booking when needed
- Sends confirmation emails
- Maintains conversation history

### **Business Customization**
- Custom branding and colors
- Personalized welcome messages  
- Business-specific document knowledge
- Tailored appointment types and durations

## 🎯 Learning Outcomes

By completing this lab, you'll have:
- **Production-ready AI application** with real business value
- **Complete MLOps pipeline** from development to monitoring
- **Multiple deployment strategies** (containerized, serverless, cloud)
- **End-to-end testing** of AI systems
- **Industry-relevant skills** in AI deployment and operations

---

**Ready to build your AI receptionist service?** Start with **[Lab 1 Setup](COURSE-NOTES/lab-1.md)** to get your development environment ready!< CI/CD Pipeline Test --->
< CI/CD Pipeline Test -->
< CI/CD Pipeline Test -->
< CI/CD Pipeline Test -->
< CI/CD Pipeline Test -->
