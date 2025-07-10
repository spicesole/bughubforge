'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from './useTheme';
import { useLanguage } from './useLanguage';
import { SunIcon, MoonIcon } from './Icons';

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const translations = {
    ru: {
      home: 'Главная',
      features: 'Возможности',
      glossary: 'Глоссарий',
      resources: 'Ресурсы',
      tests: 'Тесты',
      darkMode: 'Темная тема',
      lightMode: 'Светлая тема',
    },
    en: {
      home: 'Home',
      features: 'Features',
      glossary: 'Glossary',
      resources: 'Resources',
      tests: 'Tests',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
    },
  };

  const t = translations[language];

  return (
    <header
      className="bg-white shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 ipad-fix"
      role="navigation"
    >
      <div className="container-ipad">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-lg md:text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors cursor-pointer"
            >
              BugHubForge
            </Link>
          </div>

          {/* Desktop Navigation - скрываем на iPad */}
          <nav className="hidden lg:flex space-x-6 lg:space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-2 md:px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
            >
              {t.home}
            </Link>
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
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new Event('reset-test-selection'));
                }
              }}
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
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div>
          {/* Overlay */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/30 transition-opacity duration-300"
              aria-hidden="true"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
          {/* Slide-in menu */}
          <div
            className={`fixed top-0 right-0 z-50 h-auto py-4 max-h-screen overflow-y-auto w-[70vw] max-w-xs bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg rounded-l-2xl transform transition-transform duration-300 ease-in-out
              ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
            style={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
            aria-modal="true"
            role="dialog"
          >
            {/* Заголовок и крестик */}
            <div className="flex items-center justify-between px-6 pt-2 pb-1">
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-200 mx-auto w-full text-center select-none">
                Навигация
              </span>
              <button
                className="ml-2 p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label="Закрыть меню"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <hr className="border-gray-300 dark:border-gray-700 mb-2" />
            <nav className="flex flex-col mt-4 space-y-2 px-6">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-base font-medium py-2"
              >
                {t.home}
              </Link>
              <Link
                href="/glossary"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-base font-medium py-2"
              >
                {t.glossary}
              </Link>
              <Link
                href="/resources"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-base font-medium py-2"
              >
                {t.resources}
              </Link>
              <Link
                href="/tests"
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 text-base font-medium py-2"
              >
                {t.tests}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
