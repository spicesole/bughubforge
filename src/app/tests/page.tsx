'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Tests from '@/components/Tests'

export default function TestsPage() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru')

  // Инициализация языка из localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage === 'en' || savedLanguage === 'ru') {
      setLanguage(savedLanguage)
    }
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 ipad-fix">
      <Header language={language} setLanguage={setLanguage} />
      <main className="container-ipad py-8 md:py-12">
        <Tests language={language} />
      </main>
    </div>
  )
} 