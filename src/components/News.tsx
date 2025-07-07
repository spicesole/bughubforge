'use client'

import { useState } from 'react'

interface NewsItem {
  id: number
  title: string
  summary: string
  source: string
  date: string
  category: 'tools' | 'methodology' | 'industry' | 'learning'
  url?: string
}

interface NewsProps {
  language: 'ru' | 'en'
}

export default function News({ language }: NewsProps) {
  const translations = {
    ru: {
      title: 'Новости QA',
      subtitle: 'Актуальные новости из мира тестирования программного обеспечения',
      categories: {
        all: 'Все',
        tools: 'Инструменты',
        methodology: 'Методологии',
        industry: 'Индустрия',
        learning: 'Обучение'
      },
      readMore: 'Читать далее',
      source: 'Источник',
      noNews: 'Новости загружаются...'
    },
    en: {
      title: 'QA News',
      subtitle: 'Latest news from the world of software testing',
      categories: {
        all: 'All',
        tools: 'Tools',
        methodology: 'Methodology',
        industry: 'Industry',
        learning: 'Learning'
      },
      readMore: 'Read more',
      source: 'Source',
      noNews: 'Loading news...'
    }
  }

  const t = translations[language]

  // Демо-новости (в реальном проекте это будет API)
  const demoNews: NewsItem[] = [
    {
      id: 1,
      title: language === 'ru' 
        ? 'Playwright 1.45: Революционные изменения в автоматизации тестирования'
        : 'Playwright 1.45: Revolutionary Changes in Test Automation',
      summary: language === 'ru'
        ? 'Вышла новая версия Playwright с поддержкой AI-powered тестирования и улучшенной интеграцией с CI/CD.'
        : 'New Playwright version released with AI-powered testing support and improved CI/CD integration.',
      source: 'Playwright Official Blog',
      date: '2025-07-05',
      category: 'tools',
      url: 'https://playwright.dev/blog/playwright-1-45'
    },
    {
      id: 2,
      title: language === 'ru'
        ? 'Claude Sonnet 4 в тестировании: Новые возможности ИИ'
        : 'Claude Sonnet 4 in Testing: New AI Capabilities',
      summary: language === 'ru'
        ? 'Как использовать Claude Sonnet 4 для генерации тестовых сценариев и автоматизации тестирования.'
        : 'How to use Claude Sonnet 4 for test scenario generation and test automation.',
      source: 'AI Testing Weekly',
      date: '2025-07-03',
      category: 'industry',
      url: 'https://aitestingweekly.com/claude-sonnet-4-testing'
    },
    {
      id: 3,
      title: language === 'ru'
        ? 'Cypress 15.0: Поддержка Web Components и улучшенная отладка'
        : 'Cypress 15.0: Web Components Support and Enhanced Debugging',
      summary: language === 'ru'
        ? 'Новая версия Cypress с поддержкой современных Web Components и улучшенными инструментами отладки.'
        : 'New Cypress version with modern Web Components support and enhanced debugging tools.',
      source: 'Cypress Blog',
      date: '2025-07-01',
      category: 'tools',
      url: 'https://cypress.io/blog/cypress-15-0-release'
    },
    {
      id: 4,
      title: language === 'ru'
        ? 'DevSecOps в тестировании: Интеграция безопасности в CI/CD'
        : 'DevSecOps in Testing: Security Integration in CI/CD',
      summary: language === 'ru'
        ? 'Как интегрировать тестирование безопасности в процесс непрерывной разработки и развертывания.'
        : 'How to integrate security testing into continuous development and deployment processes.',
      source: 'DevSecOps Magazine',
      date: '2025-06-28',
      category: 'methodology',
      url: 'https://devsecopsmag.com/security-testing-ci-cd-2025'
    },
    {
      id: 5,
      title: language === 'ru'
        ? 'Тестирование AR/VR приложений: Новые вызовы и решения'
        : 'AR/VR App Testing: New Challenges and Solutions',
      summary: language === 'ru'
        ? 'Специфика тестирования приложений дополненной и виртуальной реальности в 2025 году.'
        : 'Specifics of testing augmented and virtual reality applications in 2025.',
      source: 'AR/VR Testing Hub',
      date: '2025-06-25',
      category: 'industry',
      url: 'https://arvrtestinghub.com/testing-challenges-2025'
    },
    {
      id: 6,
      title: language === 'ru'
        ? 'Тестирование квантовых приложений: Будущее уже здесь'
        : 'Quantum App Testing: The Future is Here',
      summary: language === 'ru'
        ? 'Первые подходы к тестированию квантовых вычислений и квантовых алгоритмов.'
        : 'First approaches to testing quantum computing and quantum algorithms.',
      source: 'Quantum Computing Weekly',
      date: '2025-06-22',
      category: 'methodology',
      url: 'https://quantumcomputingweekly.com/testing-quantum-apps'
    },
    {
      id: 7,
      title: language === 'ru'
        ? 'Selenium 5.0: Полная переработка архитектуры'
        : 'Selenium 5.0: Complete Architecture Overhaul',
      summary: language === 'ru'
        ? 'Новая мажорная версия Selenium с полностью переработанной архитектурой и улучшенной производительностью.'
        : 'New major Selenium version with completely redesigned architecture and improved performance.',
      source: 'Selenium Official Blog',
      date: '2025-06-20',
      category: 'tools',
      url: 'https://selenium.dev/blog/2025/selenium-5-0-released'
    },
    {
      id: 8,
      title: language === 'ru'
        ? 'Тестирование в эпоху Web3: Блокчейн и смарт-контракты'
        : 'Testing in Web3 Era: Blockchain and Smart Contracts',
      summary: language === 'ru'
        ? 'Современные подходы к тестированию блокчейн-приложений и смарт-контрактов.'
        : 'Modern approaches to testing blockchain applications and smart contracts.',
      source: 'Web3 Testing Blog',
      date: '2025-06-18',
      category: 'methodology',
      url: 'https://web3testing.blog/blockchain-testing-2025'
    },
    {
      id: 9,
      title: language === 'ru'
        ? 'Тестирование с помощью GPT-5: Следующий уровень автоматизации'
        : 'Testing with GPT-5: Next Level of Automation',
      summary: language === 'ru'
        ? 'Как GPT-5 революционизирует процесс тестирования и автоматизации в 2025 году.'
        : 'How GPT-5 is revolutionizing the testing and automation process in 2025.',
      source: 'AI Testing Magazine',
      date: '2025-06-15',
      category: 'industry',
      url: 'https://aitestingmag.com/gpt-5-testing-revolution'
    },
    {
      id: 10,
      title: language === 'ru'
        ? 'Тестирование в метавселенной: Новые парадигмы'
        : 'Testing in Metaverse: New Paradigms',
      summary: language === 'ru'
        ? 'Специфика тестирования приложений метавселенной и виртуальных миров.'
        : 'Specifics of testing metaverse applications and virtual worlds.',
      source: 'Metaverse Testing Weekly',
      date: '2025-06-12',
      category: 'industry',
      url: 'https://metaversetestingweekly.com/testing-paradigms-2025'
    }
  ]

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tools' | 'methodology' | 'industry' | 'learning'>('all')

  const filteredNews = selectedCategory === 'all' 
    ? demoNews 
    : demoNews.filter(news => news.category === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      tools: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      methodology: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      industry: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      learning: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
  }

  return (
    <section id="news" className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container-ipad">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 language-transition">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.subtitle}
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Фильтр по категориям */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(t.categories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === key
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
          
          {/* Список новостей */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <article key={news.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
                    {t.categories[news.category]}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(news.date)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {news.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {news.summary}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {t.source}: {news.source}
                  </span>
                  {news.url && (
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium transition-colors"
                    >
                      {t.readMore} →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          
          {filteredNews.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              {t.noNews}
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 