'use client'

import { useState, useEffect } from 'react'
import AuthModal from './AuthModal'
import ProfileModal from './ProfileModal'
import { auth, User } from '@/utils/auth'
import Link from 'next/link'

interface HeaderProps {
  language: 'ru' | 'en'
  setLanguage: (lang: 'ru' | 'en') => void
}

export default function Header({ language, setLanguage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  // Инициализация тёмной темы и пользователя
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    // Получаем текущего пользователя
    setCurrentUser(auth.getCurrentUser())
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
      forum: 'Форум',
      login: 'Войти',
      register: 'Регистрация',
      logout: 'Выйти',
      profile: 'Профиль',
      darkMode: 'Темная тема',
      lightMode: 'Светлая тема',
      // Auth modal translations
      emailOrUsername: 'Email или никнейм',
      email: 'Email',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      username: 'Никнейм',
      loginButton: 'Войти',
      registerButton: 'Зарегистрироваться',
      switchToRegister: 'Нет аккаунта? Зарегистрироваться',
      switchToLogin: 'Уже есть аккаунт? Войти',
      close: 'Закрыть',
      emailOrUsernameRequired: 'Email или никнейм обязателен',
      passwordRequired: 'Пароль обязателен',
      usernameRequired: 'Никнейм обязателен',
      passwordMismatch: 'Пароли не совпадают',
      invalidEmail: 'Неверный формат email',
      passwordMinLength: 'Пароль должен содержать минимум 6 символов',
      currentPassword: 'Текущий пароль',
      newPassword: 'Новый пароль',
      confirmNewPassword: 'Подтвердите новый пароль',
      save: 'Сохранить',
      cancel: 'Отмена',
      profileUpdated: 'Профиль обновлен',
      passwordChanged: 'Пароль изменен',
      emailConfirmed: 'Email подтвержден',
      errorUpdating: 'Ошибка при обновлении',
      currentPasswordRequired: 'Введите текущий пароль',
      newPasswordRequired: 'Введите новый пароль',
      confirmPasswordRequired: 'Подтвердите новый пароль',
      emailConfirmation: 'Код подтверждения',
      confirmEmail: 'Подтвердить email',
      emailConfirmationSent: 'Код подтверждения отправлен',
      changePassword: 'Изменить пароль',
      confirmEmailForRecovery: 'Подтверждение email для восстановления',
      edit: 'Редактировать',
      clickToEdit: 'Кликните для редактирования'
    },
    en: {
      home: 'Home',
      features: 'Features',
      glossary: 'Glossary',
      resources: 'Resources',
      forum: 'Forum',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      profile: 'Profile',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      // Auth modal translations
      emailOrUsername: 'Email or Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      username: 'Username',
      loginButton: 'Login',
      registerButton: 'Register',
      switchToRegister: "Don't have an account? Register",
      switchToLogin: 'Already have an account? Login',
      close: 'Close',
      emailOrUsernameRequired: 'Email or Username is required',
      passwordRequired: 'Password is required',
      usernameRequired: 'Username is required',
      passwordMismatch: 'Passwords do not match',
      invalidEmail: 'Invalid email format',
      passwordMinLength: 'Password must be at least 6 characters',
      currentPassword: 'Current Password',
      newPassword: 'New Password',
      confirmNewPassword: 'Confirm New Password',
      save: 'Save',
      cancel: 'Cancel',
      profileUpdated: 'Profile updated',
      passwordChanged: 'Password changed',
      emailConfirmed: 'Email confirmed',
      errorUpdating: 'Error updating',
      currentPasswordRequired: 'Enter current password',
      newPasswordRequired: 'Enter new password',
      confirmPasswordRequired: 'Confirm new password',
      emailConfirmation: 'Confirmation Code',
      confirmEmail: 'Confirm Email',
      emailConfirmationSent: 'Confirmation code sent',
      changePassword: 'Change Password',
      confirmEmailForRecovery: 'Email Confirmation for Recovery',
      edit: 'Edit',
      clickToEdit: 'Click to Edit'
    }
  }

  const t = translations[language]

  const goToHome = () => {
    // Закрываем модальные окна
    if (setIsAuthModalOpen) setIsAuthModalOpen(false);
    if (setIsProfileModalOpen) setIsProfileModalOpen(false);
    
    // Закрываем мобильное меню
    if (setIsMenuOpen) setIsMenuOpen(false);
    
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
    <>
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
              <a href="#" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-2 md:px-3 py-2 rounded-md text-sm font-medium">
                {t.glossary}
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-2 md:px-3 py-2 rounded-md text-sm font-medium">
                {t.resources}
              </a>
              <a href="/forum" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 px-2 md:px-3 py-2 rounded-md text-sm font-medium">
                {t.forum}
              </a>
            </nav>

            {/* Language Switcher, Theme Toggle and Auth */}
            <div className="flex items-center space-x-3 md:space-x-4">
              {/* Language Switcher */}
              <div className="flex items-center space-x-1 md:space-x-2">
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-2 py-1 rounded text-xs md:text-sm font-medium ${
                    language === 'ru' 
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                  aria-label="Переключить на русский язык"
                >
                  RU
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 rounded text-xs md:text-sm font-medium ${
                    language === 'en' 
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' 
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={isDarkMode ? t.lightMode : t.darkMode}
              >
                {isDarkMode ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Auth Buttons */}
              <div className="hidden md:flex space-x-2">
                {currentUser ? (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsProfileModalOpen(true)}
                      className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                    >
                      {currentUser.username}
                    </button>
                    <button
                      onClick={() => {
                        auth.logout();
                        setCurrentUser(null);
                        window.location.reload();
                      }}
                      className="btn-secondary"
                    >
                      {t.logout}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsAuthModalOpen(true)}
                      className="btn-primary"
                    >
                      {t.login}
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile/Tablet menu button - показываем на iPad */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Открыть меню навигации"
                aria-expanded={isMenuOpen}
              >
                <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Navigation - показываем на iPad */}
          {isMenuOpen && (
            <div className="lg:hidden dark:bg-gray-900">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button
                  onClick={() => {
                    goToHome();
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium cursor-pointer w-full text-left"
                >
                  {t.home}
                </button>
                <a href="#" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium">
                  {t.glossary}
                </a>
                <a href="#" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium">
                  {t.resources}
                </a>
                <a href="/forum" className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 block px-3 py-2 rounded-md text-base font-medium">
                  {t.forum}
                </a>
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                {currentUser ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setIsProfileModalOpen(true);
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      {currentUser.username}
                    </button>
                    <button
                      onClick={() => {
                        auth.logout();
                        setCurrentUser(null);
                        window.location.reload();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                      {t.logout}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    {t.login}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Auth Modal */}
                <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          translations={t}
        />
        
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          currentUser={currentUser}
          translations={t}
        />
      </header>
    </>
  )
} 