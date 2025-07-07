'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface HeaderProps {
  language: 'ru' | 'en'
  setLanguage: (lang: 'ru' | 'en') => void
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Инициализация тёмной темы
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Переключение тёмной темы
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  const translations = {
    ru: {
      home: 'Главная',
      features: 'Возможности',
      glossary: 'Глоссарий',
      resources: 'Ресурсы',
      tests: 'Тесты',
      darkMode: 'Темная тема',
      lightMode: 'Светлая тема'
    },
    en: {
      home: 'Home',
      features: 'Features',
      glossary: 'Glossary',
      resources: 'Resources',
      tests: 'Tests',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode'
    }
  }

  const t = translations[language]

  const goToHome = () => {
    // Закрываем мобильное меню
    setIsMenuOpen(false);
    
    // Если мы не на главной странице, переходим на неё
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      window.location.href = '/';
    } else {
      // Если уже на главной, прокручиваем к началу
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 ipad-fix">
      <div className="container-ipad">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={goToHome}
              className="text-lg md:text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
            >
              BugHubForge
            </button>
          </div>

          {/* Desktop Navigation - скрываем на iPad */}
          <nav className="hidden lg:flex space-x-6 lg:space-x-8">
            <button
              onClick={goToHome}
              className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-2 md:px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
            >
              {t.home}
            </button>
            <Link
              href="/glossary"
              className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-2 md:px-3 py-2 rounded-md text-sm font-medium"
            >
              {t.glossary}
            </Link>
            <Link
              href="/resources"
              className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-2 md:px-3 py-2 rounded-md text-sm font-medium"
            >
              {t.resources}
            </Link>
            <Link
              href="/tests"
              className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-2 md:px-3 py-2 rounded-md text-sm font-medium"
            >
              {t.tests}
            </Link>
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="px-2 py-1 text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {language === 'ru' ? 'EN' : 'RU'}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label={isDarkMode ? t.lightMode : t.darkMode}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={goToHome}
                className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-md text-base font-medium cursor-pointer"
              >
                {t.home}
              </button>
              <Link
                href="/glossary"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-md text-base font-medium"
              >
                {t.glossary}
              </Link>
              <Link
                href="/resources"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-md text-base font-medium"
              >
                {t.resources}
              </Link>
              <Link
                href="/tests"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-md text-base font-medium"
              >
                {t.tests}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
} 