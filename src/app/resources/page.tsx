'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Resources from '@/components/Resources'

export default function ResourcesPage() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru')

  // Инициализация языка из localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage === 'en' || savedLanguage === 'ru') {
      setLanguage(savedLanguage)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header language={language} setLanguage={setLanguage} />

      {/* Ресурсы */}
      <Resources language={language} />
    </div>
  )
} 