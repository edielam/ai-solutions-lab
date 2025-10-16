'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'

interface LabSection {
  id: string
  title: string
  completed?: boolean
}

interface LabNavigationProps {
  currentLabId: string
  sections: LabSection[]
  currentSectionId?: string
}

export function LabNavigation({ currentLabId, sections, currentSectionId }: LabNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')

  // Track which section is currently in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sections])

  // Handle smooth scrolling to sections
  const handleSectionClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      setActiveSection(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  const allLabs = [
    { id: 'lab1', title: 'Lab 1: Environment Setup', path: '/labs/lab1' },
    { id: 'lab2', title: 'Lab 2: MLOps Integration', path: '/labs/lab2' },
    { id: 'lab3', title: 'Lab 3: Testing AI Systems', path: '/labs/lab3' },
    { id: 'lab4', title: 'Lab 4: CI/CD Pipelines', path: '/labs/lab4' },
    { id: 'lab5', title: 'Lab 5: Containerization', path: '/labs/lab5' },
    { id: 'lab6', title: 'Lab 6: Kubernetes Orchestration', path: '/labs/lab6' },
  ]

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* All Labs */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">All Labs</h3>
        <div className="space-y-1">
          {allLabs.map((lab) => (
            <Link
              key={lab.id}
              href={lab.path}
              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                currentLabId === lab.id
                  ? 'bg-blue-50 text-blue-700 font-medium border-l-2 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {lab.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Current Lab Sections */}
      {sections.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">This Lab</h3>
          <div className="space-y-1">
            {sections.map((section) => {
              const isActive = activeSection === section.id || currentSectionId === section.id
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`block px-3 py-2 text-sm rounded-md transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-blue-100 text-blue-800 font-medium border-l-2 border-blue-500 pl-2'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:pl-2'
                  }`}
                  onClick={(e) => handleSectionClick(section.id, e)}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{section.title}</span>
                    <div className="flex items-center gap-1">
                      {section.completed && (
                        <span className="text-green-500 text-xs">✓</span>
                      )}
                      {isActive && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Links</h3>
        <div className="space-y-1">
          <Link
            href="/labs"
            className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ← All Labs
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setActiveSection('')
              setIsMobileMenuOpen(false)
            }}
            className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
          >
            ↑ Back to Top
          </button>
          <a
            href="#troubleshooting"
            className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            onClick={(e) => handleSectionClick('troubleshooting', e)}
          >
            🔧 Troubleshooting
          </a>
        </div>
      </div>

      {/* Progress Indicator */}
      {sections.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Progress</span>
            <span>{sections.findIndex(s => s.id === activeSection) + 1} / {sections.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-blue-500 h-1 rounded-full transition-all duration-300"
              style={{ 
                width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-3 right-3 z-50 p-2 bg-white border border-gray-200 rounded-md shadow-lg hover:bg-gray-50"
        aria-label="Toggle navigation menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-4 h-4" />
        ) : (
          <Menu className="w-4 h-4" />
        )}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <nav className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <SidebarContent />
        </div>
      </nav>

      {/* Mobile sidebar */}
      <nav className={`lg:hidden fixed top-0 left-0 h-full w-72 sm:w-80 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-3 pt-16 pb-6">
          <SidebarContent />
        </div>
      </nav>
    </>
  )
}