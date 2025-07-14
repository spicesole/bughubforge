'use client';

import { useState, useEffect, SetStateAction } from 'react';
import React from 'react';
import { useLanguage } from './useLanguage';
import { fixHangingPrepositions } from '../utils/fixHangingPrepositions';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  date: string;
  category: 'tools' | 'methodology' | 'industry' | 'automation';
  url?: string;
}

export default function News() {
  const { language } = useLanguage();

  const translations = {
    ru: {
      title: 'Новости QA',
      subtitle: 'Актуальные новости из мира тестирования программного обеспечения',
      categories: {
        all: 'Все',
        tools: 'Инструменты',
        methodology: 'Методологии',
        industry: 'Индустрия',
        automation: 'Автоматизация',
      },
      readMore: 'Читать далее',
      source: 'Источник',
      noNews: 'Новости загружаются...',
    },
    en: {
      title: 'QA News',
      subtitle: 'Latest news from the world of software testing',
      categories: {
        all: 'All',
        tools: 'Tools',
        methodology: 'Methodology',
        industry: 'Industry',
        automation: 'Automation',
      },
      readMore: 'Read more',
      source: 'Source',
      noNews: 'Loading news...',
    },
  };

  const t = translations[language];

  // Демо-новости (обновляйте вручную)
  const demoNews: NewsItem[] = [
    // 1. Mailpit - инструмент для тестирования email
    {
      id: 1,
      title:
        language === 'ru'
          ? 'Mailpit: современный инструмент для тестирования email-функциональности'
          : 'Mailpit: Modern Tool for Email Functionality Testing',
      summary:
        language === 'ru'
          ? 'Mailpit - это инструмент для перехвата и тестирования email-сообщений в процессе разработки. Позволяет тестировать email-функциональность без отправки реальных писем.'
          : 'Mailpit is a tool for intercepting and testing email messages during development. Allows testing email functionality without sending real emails.',
      source: 'Software Testing',
      date: '2025-07-02',
      category: 'tools',
      url: 'https://software-testing.ru/library/testing/testing-tools/4392-mailpit-',
    },
    // 2. ChromeDriver crashes in Kubernetes
    {
      id: 2,
      title:
        language === 'ru'
          ? 'Проблемы ChromeDriver в Kubernetes: причины и решения'
          : 'ChromeDriver Crashes in Kubernetes: Causes and Solutions',
      summary:
        language === 'ru'
          ? 'Анализ проблем с падением ChromeDriver в контейнеризированной среде Kubernetes. Рассмотрены причины и практические решения для стабильной работы автотестов.'
          : 'Analysis of ChromeDriver crashes in containerized Kubernetes environment. Examines causes and practical solutions for stable automated test operation.',
      source: 'Software Testing',
      date: '2025-07-01',
      category: 'automation',
      url: 'https://software-testing.ru/library/testing/testing-tools/4343-chromedriver-crashes-in-kubernetes',
    },
    // 3. Groundhog Day QA
    {
      id: 3,
      title:
        language === 'ru'
          ? 'Groundhog Day в QA: как избежать повторяющихся проблем'
          : 'Groundhog Day in QA: How to Avoid Recurring Issues',
      summary:
        language === 'ru'
          ? 'Анализ повторяющихся проблем в процессе тестирования и разработки. Методологии предотвращения "дня сурка" в QA-процессах.'
          : 'Analysis of recurring issues in testing and development processes. Methodologies for preventing "groundhog day" in QA processes.',
      source: 'Software Testing',
      date: '2025-06-30',
      category: 'methodology',
      url: 'https://software-testing.ru/library/around-testing/processes/4389-groundhog-day-qa',
    },
    // 4. Redis в performance testing
    {
      id: 4,
      title:
        language === 'ru'
          ? 'Redis в нагрузочном тестировании: оптимизация производительности'
          : 'Redis in Performance Testing: Performance Optimization',
      summary:
        language === 'ru'
          ? 'Использование Redis для оптимизации нагрузочного тестирования. Практические примеры интеграции Redis в тестовые сценарии.'
          : 'Using Redis to optimize performance testing. Practical examples of Redis integration in test scenarios.',
      source: 'Software Testing',
      date: '2025-06-25',
      category: 'automation',
      url: 'https://software-testing.ru/library/testing/performance-testing/4341-redis',
    },
    // 5. Edge-to-edge Android testing
    {
      id: 5,
      title:
        language === 'ru'
          ? 'Edge-to-edge тестирование Android-приложений'
          : 'Edge-to-Edge Testing of Android Applications',
      summary:
        language === 'ru'
          ? 'Современные подходы к тестированию Android-приложений с учетом edge-to-edge дисплеев. Особенности тестирования на устройствах с вырезами и изогнутыми экранами.'
          : 'Modern approaches to testing Android applications considering edge-to-edge displays. Features of testing on devices with notches and curved screens.',
      source: 'Software Testing',
      date: '2025-06-24',
      category: 'tools',
      url: 'https://software-testing.ru/library/testing/mobile-testing/4388-edge-to-edge-android',
    },
    // 6. Restoring reliability to test results
    {
      id: 6,
      title:
        language === 'ru'
          ? 'Восстановление надежности тестовых результатов: борьба с "красными" тестами'
          : 'Restoring Reliability to Test Results: Fighting "Red" Tests',
      summary:
        language === 'ru'
          ? 'Методологии повышения надежности автотестов и уменьшения количества ложных срабатываний. Практические советы по стабилизации тестовых результатов.'
          : 'Methodologies for improving automated test reliability and reducing false positives. Practical tips for stabilizing test results.',
      source: 'Software Testing',
      date: '2025-06-23',
      category: 'methodology',
      url: 'https://software-testing.ru/library/testing/testing-for-beginners/4340-are-you-seeing-red-restoring-reliability-to-test-results',
    },
    // 7. Personalized suggestions in testing
    {
      id: 7,
      title:
        language === 'ru'
          ? 'Персонализированные предложения в тестировании: ИИ-подход'
          : 'Personalized Suggestions in Testing: AI Approach',
      summary:
        language === 'ru'
          ? 'Использование ИИ для создания персонализированных рекомендаций в процессе тестирования. Адаптивные системы, улучшающие качество тестирования.'
          : 'Using AI to create personalized recommendations in the testing process. Adaptive systems that improve testing quality.',
      source: 'Software Testing',
      date: '2025-06-16',
      category: 'automation',
      url: 'https://software-testing.ru/library/testing/test-analysis/4337-personalized-suggestions-testing',
    },
    // 8. ИИ в тестировании
    {
      id: 8,
      title:
        language === 'ru'
          ? 'Искусственный интеллект в тестировании: современные тренды'
          : 'Artificial Intelligence in Testing: Current Trends',
      summary:
        language === 'ru'
          ? 'Обзор современных применений ИИ в тестировании программного обеспечения. От автоматической генерации тестов до анализа качества кода.'
          : 'Overview of modern AI applications in software testing. From automatic test generation to code quality analysis.',
      source: 'Software Testing',
      date: '2025-06-11',
      category: 'industry',
      url: 'https://software-testing.ru/library/around-testing/processes/4376-ii',
    },
  ];

  // Сортируем новости по дате по убыванию (сначала свежие)
  const sortedNews = [...demoNews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'tools' | 'methodology' | 'industry' | 'automation'
  >('all');
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  const filteredNews =
    selectedCategory === 'all'
      ? sortedNews
      : sortedNews.filter((news) => news.category === selectedCategory);

  const totalPages = Math.ceil(filteredNews.length / newsPerPage);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * newsPerPage,
    currentPage * newsPerPage
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      tools: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      methodology: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      industry: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      automation: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    };
    return (
      colors[category as keyof typeof colors] ||
      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    );
  };

  // Плавная прокрутка к началу при смене страницы
  useEffect(() => {
    // Прокручиваем только если мы на странице новостей
    if (typeof window !== 'undefined' && window.location.pathname.includes('news')) {
      const newsSection = document.getElementById('news');
      if (newsSection) {
        newsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentPage]);

  return (
    <section id="news" className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container-ipad">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 language-transition">
            {language === 'ru' ? (
              <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(t.title) }} />
            ) : (
              t.title
            )}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {language === 'ru' ? (
              <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(t.subtitle) }} />
            ) : (
              t.subtitle
            )}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Фильтр по категориям */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.entries(t.categories).map(([key, value]) => (
              <button
                key={key}
                onClick={() =>
                  setSelectedCategory(
                    key as SetStateAction<
                      'tools' | 'methodology' | 'industry' | 'automation' | 'all'
                    >
                  )
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === key
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {language === 'ru' ? (
                  <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(value) }} />
                ) : (
                  value
                )}
              </button>
            ))}
          </div>

          {/* Список новостей */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedNews.map((news) => (
              <article key={news.id} className="card hover:shadow-lg transition-shadow">
                <div className={`flex justify-between items-start mb-3`}>
                  <span
                    className={`${getCategoryColor(news.category)} px-2 py-1 rounded-full text-xs font-medium`}
                    role="img"
                    aria-label={news.category}
                  >
                    {t.categories[news.category] || news.category}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(news.date)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {language === 'ru' ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(news.title) }}
                    />
                  ) : (
                    news.title
                  )}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {language === 'ru' ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(news.summary) }}
                    />
                  ) : (
                    news.summary
                  )}
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
                      {language === 'ru' ? (
                        <span
                          dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(t.readMore) }}
                        />
                      ) : (
                        t.readMore
                      )}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
                    currentPage === page
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
          {filteredNews.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">{t.noNews}</div>
          )}
        </div>
      </div>
    </section>
  );
}
