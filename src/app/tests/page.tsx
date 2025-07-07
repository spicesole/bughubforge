'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Tests from '@/components/Tests'

export default function TestsPage() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 ipad-fix">
      <Header language={language} setLanguage={setLanguage} />
      <main className="container-ipad py-8 md:py-12">
        <Tests language={language} />
      </main>
    </div>
  )
} 