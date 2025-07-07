'use client'

import { useState } from 'react'

interface GlossaryItem {
  id: number
  term: string
  definition: string
  category: string
}

interface GlossaryProps {
  language: 'ru' | 'en'
}

export default function Glossary({ language }: GlossaryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const translations = {
    ru: {
      title: 'Глоссарий терминов тестирования',
      subtitle: 'Основные понятия и термины в области тестирования программного обеспечения',
      search: 'Поиск терминов...',
      allCategories: 'Все категории',
      functional: 'Функциональное тестирование',
      nonFunctional: 'Нефункциональное тестирование',
      automation: 'Автоматизация',
      methodology: 'Методология',
      tools: 'Инструменты',
      noResults: 'Термины не найдены',
      category: 'Категория'
    },
    en: {
      title: 'Testing Glossary',
      subtitle: 'Key concepts and terms in software testing',
      search: 'Search terms...',
      allCategories: 'All categories',
      functional: 'Functional Testing',
      nonFunctional: 'Non-Functional Testing',
      automation: 'Automation',
      methodology: 'Methodology',
      tools: 'Tools',
      noResults: 'No terms found',
      category: 'Category'
    }
  }

  const t = translations[language]

  const glossaryData: GlossaryItem[] = [
    // Функциональное тестирование
    {
      id: 1,
      term: language === 'ru' ? 'Функциональное тестирование' : 'Functional Testing',
      definition: language === 'ru' 
        ? 'Тестирование, которое проверяет, что программное обеспечение работает в соответствии с функциональными требованиями и спецификациями.'
        : 'Testing that verifies the software works according to functional requirements and specifications.',
      category: 'functional'
    },
    {
      id: 2,
      term: language === 'ru' ? 'Тестирование черного ящика' : 'Black Box Testing',
      definition: language === 'ru'
        ? 'Метод тестирования, при котором тестировщик не имеет доступа к внутренней структуре кода и тестирует только внешнее поведение системы.'
        : 'A testing method where the tester has no access to the internal code structure and tests only the external behavior of the system.',
      category: 'functional'
    },
    {
      id: 3,
      term: language === 'ru' ? 'Тестирование белого ящика' : 'White Box Testing',
      definition: language === 'ru'
        ? 'Метод тестирования, при котором тестировщик имеет доступ к внутренней структуре кода и тестирует логику программы.'
        : 'A testing method where the tester has access to the internal code structure and tests the program logic.',
      category: 'functional'
    },
    {
      id: 4,
      term: language === 'ru' ? 'Тестирование серого ящика' : 'Gray Box Testing',
      definition: language === 'ru'
        ? 'Комбинация тестирования черного и белого ящика, при котором тестировщик имеет частичный доступ к внутренней структуре.'
        : 'A combination of black box and white box testing where the tester has partial access to the internal structure.',
      category: 'functional'
    },
    {
      id: 5,
      term: language === 'ru' ? 'Эквивалентное разбиение' : 'Equivalence Partitioning',
      definition: language === 'ru'
        ? 'Техника тестирования, при которой входные данные разделяются на группы эквивалентности, и тестируется по одному значению из каждой группы.'
        : 'A testing technique where input data is divided into equivalence groups, and one value from each group is tested.',
      category: 'functional'
    },
    {
      id: 6,
      term: language === 'ru' ? 'Анализ граничных значений' : 'Boundary Value Analysis',
      definition: language === 'ru'
        ? 'Техника тестирования, при которой тестируются значения на границах и рядом с границами допустимых диапазонов.'
        : 'A testing technique where values at and near the boundaries of valid ranges are tested.',
      category: 'functional'
    },

    // Нефункциональное тестирование
    {
      id: 7,
      term: language === 'ru' ? 'Тестирование производительности' : 'Performance Testing',
      definition: language === 'ru'
        ? 'Тестирование, которое определяет, как система работает под различной нагрузкой и в различных условиях.'
        : 'Testing that determines how a system performs under various loads and conditions.',
      category: 'nonFunctional'
    },
    {
      id: 8,
      term: language === 'ru' ? 'Нагрузочное тестирование' : 'Load Testing',
      definition: language === 'ru'
        ? 'Тестирование системы под ожидаемой нагрузкой для проверки её производительности.'
        : 'Testing the system under expected load to verify its performance.',
      category: 'nonFunctional'
    },
    {
      id: 9,
      term: language === 'ru' ? 'Стресс-тестирование' : 'Stress Testing',
      definition: language === 'ru'
        ? 'Тестирование системы за пределами её нормальной рабочей нагрузки для определения точки отказа.'
        : 'Testing the system beyond its normal working load to determine the breaking point.',
      category: 'nonFunctional'
    },
    {
      id: 10,
      term: language === 'ru' ? 'Тестирование безопасности' : 'Security Testing',
      definition: language === 'ru'
        ? 'Тестирование, направленное на выявление уязвимостей и слабых мест в системе безопасности.'
        : 'Testing aimed at identifying vulnerabilities and weaknesses in the security system.',
      category: 'nonFunctional'
    },
    {
      id: 11,
      term: language === 'ru' ? 'Тестирование удобства использования' : 'Usability Testing',
      definition: language === 'ru'
        ? 'Тестирование, которое оценивает, насколько легко пользователи могут использовать интерфейс приложения.'
        : 'Testing that evaluates how easily users can use the application interface.',
      category: 'nonFunctional'
    },

    // Автоматизация
    {
      id: 12,
      term: language === 'ru' ? 'Автоматизированное тестирование' : 'Automated Testing',
      definition: language === 'ru'
        ? 'Использование специальных инструментов для автоматического выполнения тестов без вмешательства человека.'
        : 'Using special tools to automatically execute tests without human intervention.',
      category: 'automation'
    },
    {
      id: 13,
      term: language === 'ru' ? 'Selenium' : 'Selenium',
      definition: language === 'ru'
        ? 'Популярный фреймворк для автоматизации тестирования веб-приложений с поддержкой различных браузеров.'
        : 'A popular framework for automating web application testing with support for various browsers.',
      category: 'automation'
    },
    {
      id: 14,
      term: language === 'ru' ? 'Cypress' : 'Cypress',
      definition: language === 'ru'
        ? 'Современный инструмент для автоматизации тестирования веб-приложений с встроенной отладкой.'
        : 'A modern tool for automating web application testing with built-in debugging.',
      category: 'automation'
    },
    {
      id: 15,
      term: language === 'ru' ? 'Playwright' : 'Playwright',
      definition: language === 'ru'
        ? 'Библиотека для автоматизации тестирования веб-приложений с поддержкой множественных браузеров.'
        : 'A library for automating web application testing with multi-browser support.',
      category: 'automation'
    },

    // Методология
    {
      id: 16,
      term: language === 'ru' ? 'TDD (Test-Driven Development)' : 'TDD (Test-Driven Development)',
      definition: language === 'ru'
        ? 'Методология разработки, при которой сначала пишутся тесты, а затем код для их прохождения.'
        : 'A development methodology where tests are written first, then code to pass them.',
      category: 'methodology'
    },
    {
      id: 17,
      term: language === 'ru' ? 'BDD (Behavior-Driven Development)' : 'BDD (Behavior-Driven Development)',
      definition: language === 'ru'
        ? 'Методология разработки, основанная на описании поведения системы на естественном языке.'
        : 'A development methodology based on describing system behavior in natural language.',
      category: 'methodology'
    },
    {
      id: 18,
      term: language === 'ru' ? 'Shift-Left Testing' : 'Shift-Left Testing',
      definition: language === 'ru'
        ? 'Подход к тестированию, при котором тестирование начинается на ранних этапах разработки.'
        : 'An approach to testing where testing begins at early stages of development.',
      category: 'methodology'
    },
    {
      id: 19,
      term: language === 'ru' ? 'Пирамида тестирования' : 'Testing Pyramid',
      definition: language === 'ru'
        ? 'Модель, показывающая оптимальное соотношение между различными типами тестов (unit, integration, e2e).'
        : 'A model showing the optimal ratio between different types of tests (unit, integration, e2e).',
      category: 'methodology'
    },

    // Инструменты
    {
      id: 20,
      term: language === 'ru' ? 'JUnit' : 'JUnit',
      definition: language === 'ru'
        ? 'Популярный фреймворк для модульного тестирования Java-приложений.'
        : 'A popular framework for unit testing Java applications.',
      category: 'tools'
    },
    {
      id: 21,
      term: language === 'ru' ? 'Postman' : 'Postman',
      definition: language === 'ru'
        ? 'Инструмент для тестирования API с удобным интерфейсом для создания и выполнения запросов.'
        : 'A tool for API testing with a convenient interface for creating and executing requests.',
      category: 'tools'
    },
    {
      id: 22,
      term: language === 'ru' ? 'JMeter' : 'JMeter',
      definition: language === 'ru'
        ? 'Инструмент Apache для нагрузочного тестирования и измерения производительности.'
        : 'An Apache tool for load testing and performance measurement.',
      category: 'tools'
    }
  ]

  const categories = [
    { id: 'all', name: t.allCategories },
    { id: 'functional', name: t.functional },
    { id: 'nonFunctional', name: t.nonFunctional },
    { id: 'automation', name: t.automation },
    { id: 'methodology', name: t.methodology },
    { id: 'tools', name: t.tools }
  ]

  const filteredGlossary = glossaryData.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {t.subtitle}
        </p>
      </div>

      {/* Поиск и фильтры */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <svg
            className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Результаты */}
      <div className="space-y-6">
        {filteredGlossary.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t.noResults}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ru' 
                ? 'Попробуйте изменить поисковый запрос или категорию'
                : 'Try changing your search query or category'
              }
            </p>
          </div>
        ) : (
          filteredGlossary.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {item.term}
                </h3>
                <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                  {categories.find(cat => cat.id === item.category)?.name}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Статистика */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        {language === 'ru' 
          ? `Показано ${filteredGlossary.length} из ${glossaryData.length} терминов`
          : `Showing ${filteredGlossary.length} of ${glossaryData.length} terms`
        }
      </div>
    </div>
  )
} 