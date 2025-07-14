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
    // 1. Grok 4 Announced
    {
      id: 26,
      title:
        language === 'ru'
          ? 'Анонсирован Grok 4: новая модель от xAI для сложных задач'
          : 'Grok 4 Announced: New xAI Model for Complex Tasks',
      summary:
        language === 'ru'
          ? '9 июля 2025 компания xAI представила Grok 4 и Grok Code 4 — новые языковые модели с улучшенной точностью и производительностью, ориентированные на разработчиков и технических специалистов.'
          : 'On July 9, 2025, xAI announced Grok 4 and Grok Code 4 — new language models with improved accuracy and performance, targeting developers and technical professionals.',
      source: 'TestingCatalog',
      date: '2025-07-09',
      category: 'industry',
      url: 'https://www.testingcatalog.com/grok-4-set-for-july-9-debut-as-xai-plans-expanded-model-lineup/',
    },
    // 2. The Real QA Automation Struggles
    {
      id: 41,
      title:
        language === 'ru'
          ? 'The Real QA Automation Struggles: как победить рутину?'
          : 'The Real QA Automation Struggles (and How to Finally Get Ahead)',
      summary:
        language === 'ru'
          ? 'Автоматизация тестирования обещала революцию, но многие команды до сих пор сталкиваются с хрупкими скриптами, сложной поддержкой и интеграцией в CI/CD. Новые AI-инструменты, такие как Aurick, предлагают автономное тестирование, самовосстанавливающиеся тесты и минимизацию рутины.'
          : 'Automation promised to revolutionize QA, but many teams still struggle with brittle scripts, maintenance, and CI/CD integration. New AI tools like Aurick offer autonomous testing, self-healing tests, and less routine.',
      source: 'DEV.to',
      date: '2025-07-08',
      category: 'automation',
      url: 'https://dev.to/esha_suchana_3514f571649c/the-real-qa-automation-struggles-and-how-to-finally-get-ahead-1bdi',
    },
    // 3. Testsigma AI Agents
    {
      id: 21,
      title:
        language === 'ru'
          ? 'Testsigma внедряет автономное тестирование с AI-агентами'
          : 'Testsigma launches autonomous testing with AI agents',
      summary:
        language === 'ru'
          ? 'В июле 2025 Testsigma представила платформу, где AI-агенты сами генерируют, запускают и анализируют тесты, ускоряя релизы и повышая качество.'
          : 'In July 2025, Testsigma introduced a platform where AI agents autonomously generate, run, and analyze tests, speeding up releases and improving quality.',
      source: 'Testsigma News',
      date: '2025-07-05',
      category: 'automation',
      url: 'https://www.globenewswire.com/news-release/2025/05/07/3076024/0/en/Testsigma-announces-autonomous-testing-capabilities-ushering-in-the-era-of-agentic-AI.html',
    },
    // 4. Testing AI Systems: New Rules
    {
      id: 40,
      title:
        language === 'ru'
          ? 'Testing AI Systems: новые правила для эпохи ИИ'
          : 'Testing AI Systems: New Rules for a New Era',
      summary:
        language === 'ru'
          ? 'В 2025 году тестирование ИИ-систем требует новых подходов: проверка на предвзятость, устойчивость к атакам, объяснимость решений и мониторинг деградации моделей. Появляются специализированные инструменты для тестирования ИИ, такие как DeepChecks, WhyLabs, Fiddler AI.'
          : 'In 2025, testing AI systems requires new approaches: bias checking, adversarial robustness, explainability, and model decay monitoring. Specialized tools like DeepChecks, WhyLabs, and Fiddler AI are emerging.',
      source: 'DEV.to',
      date: '2025-07-03',
      category: 'methodology',
      url: 'https://dev.to/vaibhavkuls/testing-ai-systems-new-rules-for-a-new-era-33d1',
    },
    // 5. Testing for Accessibility
    {
      id: 42,
      title:
        language === 'ru'
          ? 'Testing for Accessibility: доступность ПО в 2025 году'
          : 'Testing for Accessibility: Building Inclusive Software in 2025',
      summary:
        language === 'ru'
          ? 'Доступность (a11y) становится обязательной частью QA. В 2025 году автоматизированные и ручные инструменты (Axe, Lighthouse, WAVE) интегрируются в CI/CD, а компании всё чаще тестируют продукты с реальными пользователями с ограниченными возможностями.'
          : 'Accessibility (a11y) is now a must-have in QA. In 2025, automated and manual tools (Axe, Lighthouse, WAVE) are integrated into CI/CD, and companies increasingly test with real users with disabilities.',
      source: 'DEV.to',
      date: '2025-07-02',
      category: 'methodology',
      url: 'https://dev.to/vaibhavkuls/testing-for-accessibility-building-inclusive-software-in-2025-1lam',
    },
    // 6. Nokia & WEART XR Haptics
    {
      id: 27,
      title:
        language === 'ru'
          ? 'Nokia и WEART революционизируют виртуальное взаимодействие с помощью термальных гаптиков'
          : 'Nokia and WEART to Revolutionize Virtual Interaction with Thermal Haptics',
      summary:
        language === 'ru'
          ? 'На конференции IEEE World Haptics компания Nokia представила совместные разработки с WEART по созданию термальных гаптиков для XR-устройств, открывая новые возможности для тестирования и взаимодействия в виртуальной среде.'
          : 'At the IEEE World Haptics Conference, Nokia showcased joint research with WEART on thermal haptics for XR devices, opening new opportunities for testing and interaction in virtual environments.',
      source: 'XR Today',
      date: '2025-07-07',
      category: 'industry',
      url: 'https://www.xrtoday.com/mixed-reality/nokia-weart-to-revolutionize-virtual-interaction-with-thermal-haptics/',
    },
    // 7. Playwright 1.45
    {
      id: 1,
      title:
        language === 'ru'
          ? 'Playwright 1.45: Революционные изменения в автоматизации тестирования'
          : 'Playwright 1.45: Revolutionary Changes in Test Automation',
      summary:
        language === 'ru'
          ? 'Вышла новая версия Playwright с поддержкой AI-powered тестирования и улучшенной интеграцией с CI/CD.'
          : 'New Playwright version released with AI-powered testing support and improved CI/CD integration.',
      source: 'Playwright Official Blog',
      date: '2025-07-05',
      category: 'tools',
      url: 'https://playwright.dev/blog/announcing-playwright-v1.45/',
    },
    // 8. Cypress 16
    {
      id: 22,
      title:
        language === 'ru'
          ? 'Cypress 16: поддержка тестирования WebAssembly'
          : 'Cypress 16: WebAssembly Testing Support',
      summary:
        language === 'ru'
          ? 'Cypress выпустил обновление с поддержкой автотестов для WebAssembly-приложений, расширяя возможности QA-инженеров.'
          : "Cypress released an update with automated testing support for WebAssembly apps, expanding QA engineers' capabilities.",
      source: 'Cypress Blog',
      date: '2025-06-28',
      category: 'tools',
      url: 'https://www.cypress.io/blog/2024/06/28/cypress-13-7-0/',
    },
    // 9. DevSecOps: Security Test Integration
    {
      id: 24,
      title:
        language === 'ru'
          ? 'DevSecOps: новые стандарты интеграции security-тестов'
          : 'DevSecOps: New Standards for Security Test Integration',
      summary:
        language === 'ru'
          ? 'Вышли обновлённые рекомендации по интеграции security-тестов в CI/CD для крупных IT-компаний.'
          : 'New guidelines released for integrating security tests into CI/CD for large IT companies.',
      source: 'DevSecOps Magazine',
      date: '2025-07-01',
      category: 'methodology',
      url: 'https://www.devsecops.org/blog/',
    },
    // 10. Claude Sonnet 4
    {
      id: 2,
      title:
        language === 'ru'
          ? 'Claude Sonnet 4 в тестировании: Новые возможности ИИ'
          : 'Claude Sonnet 4 in Testing: New AI Capabilities',
      summary:
        language === 'ru'
          ? 'Как использовать Claude Sonnet 4 для генерации тестовых сценариев и автоматизации тестирования.'
          : 'How to use Claude Sonnet 4 for test scenario generation and test automation.',
      source: 'Anthropic Blog',
      date: '2025-07-03',
      category: 'industry',
      url: 'https://www.anthropic.com/news/claude-2-launch',
    },
    // 11. AI Testing Summit 2025
    {
      id: 23,
      title:
        language === 'ru'
          ? 'AI Testing Summit 2025: тренды автономного тестирования'
          : 'AI Testing Summit 2025: Autonomous Testing Trends',
      summary:
        language === 'ru'
          ? 'На июньской конференции обсуждались перспективы self-healing тестов, внедрение LLM и автономных QA-решений.'
          : 'The June summit discussed the future of self-healing tests, LLM adoption, and autonomous QA solutions.',
      source: 'DEV.to',
      date: '2025-06-20',
      category: 'industry',
      url: 'https://dev.to/vaibhavkuls/beyond-automation-the-rise-of-autonomous-testing-in-2025-15fk',
    },
    // 12. Quantum App Testing
    {
      id: 6,
      title:
        language === 'ru'
          ? 'Тестирование квантовых приложений: Будущее уже здесь'
          : 'Quantum App Testing: The Future is Here',
      summary:
        language === 'ru'
          ? 'Первые подходы к тестированию квантовых вычислений и квантовых алгоритмов.'
          : 'First approaches to testing quantum computing and quantum algorithms.',
      source: 'Quantum Computing Report',
      date: '2025-06-22',
      category: 'methodology',
      url: 'https://quantumcomputingreport.com/quantum-app-testing/',
    },
    // 13. Selenium 5.0
    {
      id: 7,
      title:
        language === 'ru'
          ? 'Selenium 5.0: Полная переработка архитектуры'
          : 'Selenium 5.0: Complete Architecture Overhaul',
      summary:
        language === 'ru'
          ? 'Новая мажорная версия Selenium с полностью переработанной архитектурой и улучшенной производительностью.'
          : 'New major Selenium version with completely redesigned architecture and improved performance.',
      source: 'Selenium Blog',
      date: '2025-06-20',
      category: 'tools',
      url: 'https://selenium.dev/blog/2025/selenium-5-0-released/',
    },
    // 14. AR/VR App Testing
    {
      id: 5,
      title:
        language === 'ru'
          ? 'Тестирование AR/VR приложений: Новые вызовы и решения'
          : 'AR/VR App Testing: New Challenges and Solutions',
      summary:
        language === 'ru'
          ? 'Специфика тестирования приложений дополненной и виртуальной реальности в 2025 году.'
          : 'Specifics of testing augmented and virtual reality applications in 2025.',
      source: 'XR Today',
      date: '2025-06-25',
      category: 'industry',
      url: 'https://www.xrtoday.com/virtual-reality/ar-vr-testing-challenges/',
    },
    // 15. DevSecOps в тестировании
    {
      id: 4,
      title:
        language === 'ru'
          ? 'DevSecOps в тестировании: Интеграция безопасности в CI/CD'
          : 'DevSecOps in Testing: Security Integration in CI/CD',
      summary:
        language === 'ru'
          ? 'Как интегрировать тестирование безопасности в процесс непрерывной разработки и развертывания.'
          : 'How to integrate security testing into continuous development and deployment processes.',
      source: 'DevSecOps Magazine',
      date: '2025-06-28',
      category: 'methodology',
      url: 'https://www.devsecops.org/blog/',
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
            ) : t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{language === 'ru' ? (
            <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(t.subtitle) }} />
          ) : t.subtitle}</p>
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
                ) : value}
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
                    <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(news.title) }} />
                  ) : news.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                  {language === 'ru' ? (
                    <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(news.summary) }} />
                  ) : news.summary}
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
                        <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(t.readMore) }} />
                      ) : t.readMore}
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
