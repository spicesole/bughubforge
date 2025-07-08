"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { getTests, type Test } from '@/data/tests'
import Head from 'next/head'

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<'ru' | 'en'>('ru')
  const [test, setTest] = useState<Test | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage === 'en' || savedLanguage === 'ru') {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (!params?.testId) return
    const tests = getTests(language)
    const found = tests.find(t => t.id === params.testId)
    if (found) {
      setTest(found)
      setNotFound(false)
    } else {
      setNotFound(true)
    }
  }, [params?.testId, language])

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header language={language} setLanguage={setLanguage} />
        <main className="container-ipad py-8 md:py-12 text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Тест не найден</h2>
          <button onClick={() => router.push('/tests')} className="px-4 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors">К списку тестов</button>
        </main>
      </div>
    )
  }

  if (!test) return null

  // Здесь будет логика прохождения одного теста (можно вынести в отдельный компонент)
  // ...
  // Для простоты сейчас выведем только заголовок теста
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{test.title} | BugHubForge</title>
        <meta name="description" content={test.description} />
      </Head>
      <Header language={language} setLanguage={setLanguage} />
      <main className="container-ipad py-8 md:py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{test.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{test.description}</p>
        {/* Здесь будет компонент для прохождения теста */}
        {/* TODO: Вынести сюда компонент TestRunner и реализовать всю логику теста */}
      </main>
    </div>
  )
} 