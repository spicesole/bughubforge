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
        ? 'Selenium 4.20: Новые возможности для автоматизации тестирования'
        : 'Selenium 4.20: New Features for Test Automation',
      summary: language === 'ru'
        ? 'Вышла новая версия Selenium с улучшенной производительностью и новыми API для работы с современными браузерами.'
        : 'New Selenium version released with improved performance and new APIs for modern browsers.',
      source: 'Selenium Official Blog',
      date: '2024-01-15',
      category: 'tools',
      url: 'https://selenium.dev/blog/2024/selenium-4-20-released/'
    },
    {
      id: 2,
      title: language === 'ru'
        ? 'AI в тестировании: Тренды 2024 года'
        : 'AI in Testing: 2024 Trends',
      summary: language === 'ru'
        ? 'Обзор основных трендов использования искусственного интеллекта в автоматизации тестирования.'
        : 'Overview of key trends in using artificial intelligence for test automation.',
      source: 'Testing Weekly',
      date: '2024-01-10',
      category: 'industry',
      url: 'https://testingweekly.com/ai-testing-trends-2024'
    },
    {
      id: 3,
      title: language === 'ru'
        ? 'Playwright vs Cypress: Сравнение популярных инструментов'
        : 'Playwright vs Cypress: Popular Tools Comparison',
      summary: language === 'ru'
        ? 'Детальное сравнение двух популярных инструментов для end-to-end тестирования веб-приложений.'
        : 'Detailed comparison of two popular tools for end-to-end web application testing.',
      source: 'DevOps.com',
      date: '2024-01-08',
      category: 'tools',
      url: 'https://devops.com/playwright-vs-cypress-comparison'
    },
    {
      id: 4,
      title: language === 'ru'
        ? 'Behavior Driven Development (BDD) в 2024: Практическое руководство'
        : 'Behavior Driven Development (BDD) in 2024: Practical Guide',
      summary: language === 'ru'
        ? 'Как эффективно применять BDD в современных проектах разработки программного обеспечения.'
        : 'How to effectively apply BDD in modern software development projects.',
      source: 'TechBeacon',
      date: '2024-01-05',
      category: 'methodology',
      url: 'https://techbeacon.com/bdd-2024-practical-guide'
    },
    {
      id: 5,
      title: language === 'ru'
        ? 'Бесплатные курсы по тестированию: Топ-10 ресурсов'
        : 'Free Testing Courses: Top 10 Resources',
      summary: language === 'ru'
        ? 'Подборка лучших бесплатных курсов и ресурсов для изучения тестирования программного обеспечения.'
        : 'Collection of the best free courses and resources for learning software testing.',
      source: 'QA Learning Hub',
      date: '2024-01-03',
      category: 'learning',
      url: 'https://qalearninghub.com/free-testing-courses'
    },
    {
      id: 6,
      title: language === 'ru'
        ? 'API тестирование: Лучшие практики и инструменты'
        : 'API Testing: Best Practices and Tools',
      summary: language === 'ru'
        ? 'Обзор современных подходов и инструментов для эффективного тестирования API.'
        : 'Overview of modern approaches and tools for effective API testing.',
      source: 'API Testing Blog',
      date: '2024-01-01',
      category: 'tools',
      url: 'https://apitestingblog.com/best-practices-2024'
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