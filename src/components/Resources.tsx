'use client';

import { useState } from 'react';
import React from 'react';
import { useLanguage } from './useLanguage';

interface ResourceItem {
  id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  type: 'book' | 'course' | 'article' | 'video' | 'tool' | 'community' | 'task';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all';
  language: 'ru' | 'en' | 'both';
}

export default function Resources() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 12;

  const translations = {
    ru: {
      title: 'Ресурсы для изучения тестирования',
      subtitle: 'Полезные материалы, курсы, книги и инструменты для QA специалистов',
      search: 'Поиск ресурсов...',
      allCategories: 'Все категории',
      allTypes: 'Все типы',
      allDifficulties: 'Все уровни',
      books: 'Книги',
      courses: 'Курсы',
      articles: 'Статьи',
      videos: 'Видео',
      tools: 'Инструменты',
      communities: 'Сообщества',
      tasks: 'Задачи',
      beginner: 'Начинающий',
      intermediate: 'Средний',
      advanced: 'Продвинутый',
      fundamentals: 'Основы тестирования',
      automation: 'Автоматизация',
      performance: 'Производительность',
      security: 'Безопасность',
      mobile: 'Мобильное тестирование',
      api: 'API тестирование',
      taskManagement: 'Управление задачами',
      testingTasks: 'Задачи для тестирования',
      noResults: 'Ресурсы не найдены',
      openResource: 'Открыть ресурс',
      difficulty: 'Уровень сложности',
      type: 'Тип ресурса',
      category: 'Категория',
    },
    en: {
      title: 'Testing Learning Resources',
      subtitle: 'Useful materials, courses, books and tools for QA specialists',
      search: 'Search resources...',
      allCategories: 'All categories',
      allTypes: 'All types',
      allDifficulties: 'All levels',
      books: 'Books',
      courses: 'Courses',
      articles: 'Articles',
      videos: 'Videos',
      tools: 'Tools',
      communities: 'Communities',
      tasks: 'Tasks',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      fundamentals: 'Testing Fundamentals',
      automation: 'Automation',
      performance: 'Performance',
      security: 'Security',
      mobile: 'Mobile Testing',
      api: 'API Testing',
      taskManagement: 'Task Management',
      testingTasks: 'Testing Tasks',
      noResults: 'No resources found',
      openResource: 'Open resource',
      difficulty: 'Difficulty level',
      type: 'Resource type',
      category: 'Category',
    },
  };

  const t = translations[language];

  const resourcesData: ResourceItem[] = [
    // Книги
    // Удалены: Amazon (id: 1, 2, 3)
    // Курсы
    // Удалены: Udemy (id: 5), Pluralsight (id: 6)
    // Статьи
    {
      id: 8,
      title: language === 'ru' ? 'Основы тестирования безопасности' : 'Security Testing Basics',
      description:
        language === 'ru'
          ? 'Введение в тестирование безопасности веб-приложений.'
          : 'Introduction to web application security testing.',
      url: 'https://owasp.org/www-project-web-security-testing-guide/',
      category: 'security',
      type: 'article',
      difficulty: 'intermediate',
      language: 'both',
    },
    // Видео
    // Удалены: YouTube (id: 9, 10)
    // Инструменты
    {
      id: 11,
      title: 'Postman',
      description:
        language === 'ru'
          ? 'Популярный инструмент для тестирования API с удобным интерфейсом.'
          : 'Popular API testing tool with a user-friendly interface.',
      url: 'https://www.postman.com/',
      category: 'api',
      type: 'tool',
      difficulty: 'beginner',
      language: 'both',
    },
    {
      id: 12,
      title: 'JMeter',
      description:
        language === 'ru'
          ? 'Мощный инструмент для нагрузочного тестирования от Apache.'
          : 'Powerful load testing tool from Apache.',
      url: 'https://jmeter.apache.org/',
      category: 'performance',
      type: 'tool',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 13,
      title: 'Selenium',
      description:
        language === 'ru'
          ? 'Стандарт де-факто для автоматизации тестирования веб-приложений.'
          : 'De facto standard for web application test automation.',
      url: 'https://selenium.dev/',
      category: 'automation',
      type: 'tool',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 14,
      title: 'Playwright',
      description:
        language === 'ru'
          ? 'Современный фреймворк для автоматизации тестирования от Microsoft.'
          : 'Modern automation framework from Microsoft.',
      url: 'https://playwright.dev/',
      category: 'automation',
      type: 'tool',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 15,
      title: 'Cypress',
      description:
        language === 'ru'
          ? 'JavaScript фреймворк для end-to-end тестирования веб-приложений.'
          : 'JavaScript framework for end-to-end web application testing.',
      url: 'https://www.cypress.io/',
      category: 'automation',
      type: 'tool',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 16,
      title: 'Appium',
      description:
        language === 'ru'
          ? 'Инструмент для автоматизации тестирования мобильных приложений.'
          : 'Tool for mobile application test automation.',
      url: 'http://appium.io/',
      category: 'mobile',
      type: 'tool',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 17,
      title: 'Burp Suite',
      description:
        language === 'ru'
          ? 'Комплексная платформа для тестирования безопасности веб-приложений.'
          : 'Comprehensive platform for web application security testing.',
      url: 'https://portswigger.net/burp',
      category: 'security',
      type: 'tool',
      difficulty: 'advanced',
      language: 'both',
    },
    {
      id: 19,
      title: 'Katalon Studio',
      description:
        language === 'ru'
          ? 'Комплексная платформа для автоматизации тестирования с GUI.'
          : 'Comprehensive test automation platform with GUI.',
      url: 'https://katalon.com/',
      category: 'automation',
      type: 'tool',
      difficulty: 'beginner',
      language: 'both',
    },
    {
      id: 21,
      title: 'Jira',
      description:
        language === 'ru'
          ? 'Популярная система управления проектами и задачами.'
          : 'Popular project and issue management system.',
      url: 'https://www.atlassian.com/software/jira',
      category: 'taskManagement',
      type: 'tool',
      difficulty: 'beginner',
      language: 'both',
    },
    {
      id: 22,
      title: 'Trello',
      description:
        language === 'ru'
          ? 'Простая система управления задачами с канбан-досками.'
          : 'Simple task management system with kanban boards.',
      url: 'https://trello.com/',
      category: 'taskManagement',
      type: 'tool',
      difficulty: 'beginner',
      language: 'both',
    },
    {
      id: 23,
      title: 'Asana',
      description:
        language === 'ru'
          ? 'Платформа для управления проектами и командной работы.'
          : 'Project management and team collaboration platform.',
      url: 'https://asana.com/',
      category: 'taskManagement',
      type: 'tool',
      difficulty: 'beginner',
      language: 'both',
    },
    {
      id: 24,
      title: 'Monday.com',
      description:
        language === 'ru'
          ? 'Визуальная платформа для управления проектами и задачами.'
          : 'Visual project and task management platform.',
      url: 'https://monday.com/',
      category: 'taskManagement',
      type: 'tool',
      difficulty: 'beginner',
      language: 'both',
    },
    {
      id: 26,
      title: language === 'ru' ? 'QA Stack Overflow' : 'QA Stack Overflow',
      description:
        language === 'ru'
          ? 'Сообщество разработчиков и тестировщиков для обмена опытом.'
          : 'Community of developers and testers for sharing experience.',
      url: 'https://sqa.stackexchange.com/',
      category: 'fundamentals',
      type: 'community',
      difficulty: 'all',
      language: 'both',
    },
    {
      id: 27,
      title: language === 'ru' ? 'Reddit r/QualityAssurance' : 'Reddit r/QualityAssurance',
      description:
        language === 'ru'
          ? 'Активное сообщество QA специалистов на Reddit.'
          : 'Active community of QA specialists on Reddit.',
      url: 'https://www.reddit.com/r/QualityAssurance/',
      category: 'fundamentals',
      type: 'community',
      difficulty: 'all',
      language: 'both',
    },
    // Задачи для тестирования
    {
      id: 28,
      title: language === 'ru' ? 'Тестирование формы регистрации' : 'Registration Form Testing',
      description:
        language === 'ru'
          ? 'Практическая задача по тестированию формы регистрации пользователей.'
          : 'Practical task for testing user registration form.',
      url: 'https://www.guru99.com/registration-form-testing.html',
      category: 'testingTasks',
      type: 'task',
      difficulty: 'beginner',
      language: 'both',
    },
    {
      id: 29,
      title: language === 'ru' ? 'Тестирование поиска' : 'Search Functionality Testing',
      description:
        language === 'ru'
          ? 'Задача по тестированию функциональности поиска на веб-сайте.'
          : 'Task for testing search functionality on a website.',
      url: 'https://www.softwaretestinghelp.com/search-testing/',
      category: 'testingTasks',
      type: 'task',
      difficulty: 'beginner',
      language: 'both',
    },
    {
      id: 30,
      title: language === 'ru' ? 'Тестирование корзины покупок' : 'Shopping Cart Testing',
      description:
        language === 'ru'
          ? 'Комплексная задача по тестированию e-commerce функциональности.'
          : 'Comprehensive task for testing e-commerce functionality.',
      url: 'https://www.testingexcellence.com/shopping-cart-testing/',
      category: 'testingTasks',
      type: 'task',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 31,
      title: language === 'ru' ? 'Тестирование API endpoints' : 'API Endpoints Testing',
      description:
        language === 'ru'
          ? 'Практическая задача по тестированию REST API endpoints.'
          : 'Practical task for testing REST API endpoints.',
      url: 'https://www.postman.com/learning/testing-automation/',
      category: 'testingTasks',
      type: 'task',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 32,
      title: language === 'ru' ? 'Тестирование мобильного приложения' : 'Mobile App Testing',
      description:
        language === 'ru'
          ? 'Задача по тестированию мобильного приложения на разных устройствах.'
          : 'Task for testing mobile application on different devices.',
      url: 'https://www.perfecto.io/blog/mobile-app-testing-checklist',
      category: 'testingTasks',
      type: 'task',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 33,
      title: language === 'ru' ? 'Нагрузочное тестирование' : 'Load Testing',
      description:
        language === 'ru'
          ? 'Практическая задача по проведению нагрузочного тестирования.'
          : 'Practical task for conducting load testing.',
      url: 'https://www.blazemeter.com/blog/load-testing-guide',
      category: 'testingTasks',
      type: 'task',
      difficulty: 'advanced',
      language: 'both',
    },
    {
      id: 34,
      title: language === 'ru' ? 'Тестирование безопасности' : 'Security Testing',
      description:
        language === 'ru'
          ? 'Задача по тестированию безопасности веб-приложения.'
          : 'Task for testing web application security.',
      url: 'https://owasp.org/www-project-web-security-testing-guide/latest/',
      category: 'testingTasks',
      type: 'task',
      difficulty: 'advanced',
      language: 'both',
    },
    {
      id: 36,
      title:
        language === 'ru'
          ? 'DevOps и автоматизация тестирования: видеокурс'
          : 'DevOps & Test Automation: Video Course',
      description:
        language === 'ru'
          ? 'Видеокурс по интеграции автоматизации тестирования в DevOps-процессы.'
          : 'Video course on integrating test automation into DevOps pipelines.',
      url: 'https://www.youtube.com/watch?v=2g5j4xH8Q6A',
      category: 'automation',
      type: 'video',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 37,
      title:
        language === 'ru'
          ? 'Тестирование безопасности: OWASP Top 10 (2024)'
          : 'Security Testing: OWASP Top 10 (2024)',
      description:
        language === 'ru'
          ? 'Актуальный гайд по тестированию безопасности веб-приложений на основе OWASP Top 10.'
          : 'Up-to-date guide for web app security testing based on OWASP Top 10.',
      url: 'https://owasp.org/www-project-top-ten/',
      category: 'security',
      type: 'article',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 38,
      title:
        language === 'ru'
          ? 'QA Guild: русскоязычное сообщество тестировщиков'
          : 'QA Guild: Russian-speaking QA Community',
      description:
        language === 'ru'
          ? 'Активное сообщество тестировщиков, обсуждения, митапы, вакансии.'
          : 'Active Russian-speaking QA community: discussions, meetups, jobs.',
      url: 'https://t.me/qaguild',
      category: 'fundamentals',
      type: 'community',
      difficulty: 'all',
      language: 'both',
    },
    {
      id: 40,
      title:
        language === 'ru'
          ? 'Книга: "Тестирование программного обеспечения. Базовый курс" (2024)'
          : 'Book: "Software Testing. Basic Course" (2024)',
      description:
        language === 'ru'
          ? 'Современный учебник по тестированию ПО для начинающих (на русском).'
          : 'Modern textbook on software testing for beginners (in Russian).',
      url: 'https://www.labirint.ru/books/1010101/',
      category: 'fundamentals',
      type: 'book',
      difficulty: 'beginner',
      language: 'both',
    },
    {
      id: 42,
      title:
        language === 'ru'
          ? 'Задача: тестирование генерации PDF-отчётов'
          : 'Task: PDF Report Generation Testing',
      description:
        language === 'ru'
          ? 'Практическая задача: проверить корректность генерации PDF-отчётов в веб-приложении.'
          : 'Practical task: test PDF report generation in a web application.',
      url: 'https://www.guru99.com/pdf-testing.html',
      category: 'testingTasks',
      type: 'task',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 43,
      title:
        language === 'ru'
          ? 'Видео: автоматизация тестирования с помощью Playwright 2025'
          : 'Video: Test Automation with Playwright 2025',
      description:
        language === 'ru'
          ? 'Новое видео о возможностях Playwright для автоматизации тестирования в 2025 году.'
          : 'New video on Playwright test automation capabilities in 2025.',
      url: 'https://www.youtube.com/watch?v=playwright2025',
      category: 'automation',
      type: 'video',
      difficulty: 'intermediate',
      language: 'both',
    },
    {
      id: 44,
      title:
        language === 'ru'
          ? 'Сообщество: Test IT Community (русский)'
          : 'Community: Test IT Community (Russian)',
      description:
        language === 'ru'
          ? 'Официальное русскоязычное сообщество пользователей Test IT.'
          : 'Official Russian-speaking Test IT user community.',
      url: 'https://t.me/testitcommunity',
      category: 'automation',
      type: 'community',
      difficulty: 'all',
      language: 'both',
    },
    {
      id: 1001,
      title: language === 'ru' ? 'Reddit: r/softwaretesting' : 'Reddit: r/softwaretesting',
      description:
        language === 'ru'
          ? 'Международное сообщество по ручному и автоматизированному тестированию ПО.'
          : 'Global community for manual and automated software testing.',
      url: 'https://www.reddit.com/r/softwaretesting/',
      category: 'fundamentals',
      type: 'community',
      difficulty: 'all',
      language: 'both',
    },
    {
      id: 1002,
      title: language === 'ru' ? 'Reddit: r/testautomation' : 'Reddit: r/testautomation',
      description:
        language === 'ru'
          ? 'Обсуждение автоматизации тестирования, инструментов и best practices.'
          : 'Discussion of test automation, tools, and best practices.',
      url: 'https://www.reddit.com/r/testautomation/',
      category: 'fundamentals',
      type: 'community',
      difficulty: 'all',
      language: 'both',
    },
    {
      id: 1003,
      title: language === 'ru' ? 'Reddit: r/selenium' : 'Reddit: r/selenium',
      description:
        language === 'ru'
          ? 'Всё о Selenium и автоматизации тестирования.'
          : 'All about Selenium and test automation.',
      url: 'https://www.reddit.com/r/selenium/',
      category: 'fundamentals',
      type: 'community',
      difficulty: 'all',
      language: 'both',
    },
  ];

  // Исключаем все ресурсы с t.me (телеграм)
  const filteredResourcesRaw = resourcesData.filter((item) => !item.url.includes('t.me'));
  // Исключаем все видео-ресурсы
  const filteredResourcesNoVideo = filteredResourcesRaw.filter((item) => item.type !== 'video');
  // Исключаем книгу с нерабочей ссылкой
  const filteredResourcesNoBadBook = filteredResourcesNoVideo.filter(
    (item) => item.url !== 'https://www.labirint.ru/books/1010101/'
  );
  // Исключаем все задачи (type === 'task')
  const filteredResourcesNoTask = filteredResourcesNoBadBook.filter((item) => item.type !== 'task');

  const filteredResources = filteredResourcesNoTask.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesDifficulty =
      selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
    const matchesLanguage = item.language === 'both' || item.language === language;
    return matchesCategory && matchesType && matchesDifficulty && matchesLanguage;
  });

  // Получаем только реально используемые категории (по всем доступным ресурсам, а не только отфильтрованным)
  const usedCategoryIds = Array.from(new Set(filteredResourcesNoTask.map((item) => item.category)));
  const categories = [
    { id: 'all', name: t.allCategories },
    { id: 'automation', name: t.automation },
    { id: 'performance', name: t.performance },
    { id: 'security', name: t.security },
    { id: 'mobile', name: t.mobile },
    { id: 'api', name: t.api },
    { id: 'taskManagement', name: t.taskManagement },
  ].filter((cat) => cat.id === 'all' || usedCategoryIds.includes(cat.id));

  // Получаем только реально используемые типы (по всем доступным ресурсам, а не только отфильтрованным)
  const allowedTypeIds: ResourceItem['type'][] = ['book', 'course', 'article', 'tool', 'community'];
  const usedTypeIds = Array.from(new Set(filteredResourcesNoTask.map((item) => item.type))).filter(
    (type) => allowedTypeIds.includes(type as ResourceItem['type'])
  );
  const types = [
    { id: 'all', name: t.allTypes },
    { id: 'book', name: t.books },
    { id: 'course', name: t.courses },
    { id: 'article', name: t.articles },
    { id: 'tool', name: t.tools },
    { id: 'community', name: t.communities },
  ].filter((type) => type.id === 'all' || usedTypeIds.includes(type.id as ResourceItem['type']));

  const difficulties = [
    { id: 'all', name: t.allDifficulties },
    { id: 'beginner', name: t.beginner },
    { id: 'intermediate', name: t.intermediate },
    { id: 'advanced', name: t.advanced },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book':
        return (
          <span role="img" aria-label="Книга">
            📚
          </span>
        );
      case 'course':
        return (
          <span role="img" aria-label="Курс">
            🎓
          </span>
        );
      case 'article':
        return (
          <span role="img" aria-label="Статья">
            📄
          </span>
        );
      case 'video':
        return (
          <span role="img" aria-label="Видео">
            🎥
          </span>
        );
      case 'tool':
        return (
          <span role="img" aria-label="Инструмент">
            🛠️
          </span>
        );
      case 'community':
        return (
          <span role="img" aria-label="Сообщество">
            👥
          </span>
        );
      case 'task':
        return (
          <span role="img" aria-label="Задача">
            ✅
          </span>
        );
      default:
        return (
          <span role="img" aria-label="Ресурс">
            📖
          </span>
        );
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Пагинация
  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);
  const paginatedResources = filteredResources.slice(
    (currentPage - 1) * resourcesPerPage,
    currentPage * resourcesPerPage
  );

  // Сброс страницы при смене фильтров
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedType, selectedDifficulty, language]);

  // Плавная прокрутка к началу при смене страницы
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Фильтры */}
      <div className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Категории */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.category}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Типы */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.type}
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Сложность */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t.difficulty}
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {difficulties.map((difficulty) => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Результаты */}
      <div className="space-y-6">
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t.noResults}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ru' ? 'Попробуйте изменить фильтры' : 'Try changing the filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedResources.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-2xl mr-3">{getTypeIcon(item.type)}</div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(item.difficulty)}`}
                  >
                    {difficulties.find((d) => d.id === item.difficulty)?.name}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {categories.find((cat) => cat.id === item.category)?.name}
                  </span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                  >
                    {t.openResource}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
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

      {/* Статистика */}
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        {language === 'ru'
          ? `Показано ${paginatedResources.length} из ${filteredResources.length} ресурсов (стр. ${currentPage} из ${totalPages})`
          : `Showing ${paginatedResources.length} of ${filteredResources.length} resources (page ${currentPage} of ${totalPages})`}
      </div>
    </div>
  );
}
