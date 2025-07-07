'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Glossary from '@/components/Glossary'

export default function GlossaryPage() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header language={language} setLanguage={setLanguage} />

      {/* Глоссарий */}
      <Glossary language={language} />
    </div>
  )
} 