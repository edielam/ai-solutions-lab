// Simplified lab data interface for the main labs page
export interface LabSummary {
  id: string;
  title: string;
  description: string;
  level: string;
  technology: string;
}

// Get all available labs (summary data for main labs page)
export function getAllLabsSummary(): LabSummary[] {
  return [
    {
      id: 'lab1',
      title: 'Lab 1: Environment Setup & Project Introduction',
      description: 'Create accounts for the services we need, install coding tools on your computer, and get the AI receptionist app running on your machine.',
      level: 'Foundation',
      technology: 'Next.js + Setup'
    },
    {
      id: 'lab2',
      title: 'Lab 2: AI Lifecycle & MLOps Integration',
      description: 'Build a Flask MLOps service to track AI performance, integrate Prometheus for metrics monitoring, and implement comprehensive metrics collection for your AI receptionist.',
      level: 'Intermediate',
      technology: 'Flask + Prometheus'
    },
    {
      id: 'lab3',
      title: 'Lab 3: Testing AI Systems',
      description: 'Learn to test your Flask MLOps service with pytest, validate metrics tracking, and ensure your AI monitoring system works reliably.',
      level: 'Intermediate',
      technology: 'Pytest Testing'
    },
    {
      id: 'lab4',
      title: 'Lab 4: Deployment Pipelines (CI/CD)',
      description: 'Build automated CI/CD pipelines with GitHub Actions to test, build, and deploy your AI application to production environments.',
      level: 'Advanced',
      technology: 'GitHub Actions'
    },
    {
      id: 'lab5',
      title: 'Lab 5: Containerization with Docker',
      description: 'Learn Docker basics and containerize your Flask MLOps service for consistent deployment across different environments.',
      duration: '2-3 hours',
      level: 'Advanced',
      technology: 'Docker'
    },
    {
      id: 'lab6',
      title: 'Lab 6: Orchestration & Scaling with Kubernetes',
      description: 'Install Kubernetes locally (minikube), deploy your containerized Flask service, and learn how to scale it up and down with simple commands.',
      level: 'Advanced',
      technology: 'Kubernetes'
    }
  ];
}