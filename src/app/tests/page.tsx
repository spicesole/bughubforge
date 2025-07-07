'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Tests from '@/components/Tests'
import Head from 'next/head'

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" role="main">
      <Head>
        <title>Тесты и чек-листы | BugHubForge</title>
        <meta name="description" content="Чек-листы, тест-кейсы и практические задания для тестировщиков и QA-специалистов." />
      </Head>
      <Header language={language} setLanguage={setLanguage} />
      <main className="container-ipad py-8 md:py-12">
        <Tests language={language} />
      </main>
    </div>
  )
} 