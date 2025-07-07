'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Resources from '@/components/Resources'

export default function ResourcesPage() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <Header language={language} setLanguage={setLanguage} />

      {/* Ресурсы */}
      <Resources language={language} />
    </div>
  )
} 