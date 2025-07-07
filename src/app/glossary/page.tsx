'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Glossary from '@/components/Glossary'
import Head from 'next/head'

export default function GlossaryPage() {
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
        <title>Глоссарий терминов | BugHubForge</title>
        <meta name="description" content="Глоссарий терминов по тестированию ПО, автоматизации и QA. Понятия, определения, методологии." />
      </Head>
      {/* Header */}
      <Header language={language} setLanguage={setLanguage} />

      {/* Глоссарий */}
      <Glossary language={language} />
    </div>
  )
} 