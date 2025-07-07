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
    },
    {
      id: 23,
      term: language === 'ru' ? 'TestNG' : 'TestNG',
      definition: language === 'ru'
        ? 'Фреймворк для тестирования Java с расширенными возможностями по сравнению с JUnit.'
        : 'A Java testing framework with advanced capabilities compared to JUnit.',
      category: 'tools'
    },
    {
      id: 24,
      term: language === 'ru' ? 'Appium' : 'Appium',
      definition: language === 'ru'
        ? 'Инструмент для автоматизации тестирования мобильных приложений на различных платформах.'
        : 'A tool for automating mobile app testing across different platforms.',
      category: 'tools'
    },
    {
      id: 25,
      term: language === 'ru' ? 'SoapUI' : 'SoapUI',
      definition: language === 'ru'
        ? 'Инструмент для тестирования SOAP и REST веб-сервисов с графическим интерфейсом.'
        : 'A tool for testing SOAP and REST web services with a graphical interface.',
      category: 'tools'
    },
    {
      id: 26,
      term: language === 'ru' ? 'Katalon Studio' : 'Katalon Studio',
      definition: language === 'ru'
        ? 'Комплексная платформа для автоматизации тестирования веб, мобильных и API приложений.'
        : 'A comprehensive platform for automating web, mobile, and API application testing.',
      category: 'tools'
    },
    {
      id: 27,
      term: language === 'ru' ? 'TestComplete' : 'TestComplete',
      definition: language === 'ru'
        ? 'Коммерческий инструмент для автоматизации тестирования с поддержкой различных технологий.'
        : 'A commercial tool for test automation with support for various technologies.',
      category: 'tools'
    },
    {
      id: 28,
      term: language === 'ru' ? 'Robot Framework' : 'Robot Framework',
      definition: language === 'ru'
        ? 'Фреймворк для автоматизации тестирования с использованием ключевых слов на Python.'
        : 'A test automation framework using keywords in Python.',
      category: 'tools'
    },
    {
      id: 29,
      term: language === 'ru' ? 'Jest' : 'Jest',
      definition: language === 'ru'
        ? 'Фреймворк для тестирования JavaScript с нулевой конфигурацией от Facebook.'
        : 'A zero-configuration JavaScript testing framework from Facebook.',
      category: 'tools'
    },
    {
      id: 30,
      term: language === 'ru' ? 'Mocha' : 'Mocha',
      definition: language === 'ru'
        ? 'Гибкий фреймворк для тестирования JavaScript с поддержкой различных стилей тестирования.'
        : 'A flexible JavaScript testing framework supporting various testing styles.',
      category: 'tools'
    },

    // Дополнительные термины функционального тестирования
    {
      id: 31,
      term: language === 'ru' ? 'Тестирование регрессии' : 'Regression Testing',
      definition: language === 'ru'
        ? 'Тестирование, которое проверяет, что ранее работавшие функции продолжают работать после изменений.'
        : 'Testing that verifies previously working features continue to work after changes.',
      category: 'functional'
    },
    {
      id: 32,
      term: language === 'ru' ? 'Тестирование дыма' : 'Smoke Testing',
      definition: language === 'ru'
        ? 'Базовое тестирование для проверки того, что основные функции приложения работают.'
        : 'Basic testing to verify that the main application functions work.',
      category: 'functional'
    },
    {
      id: 33,
      term: language === 'ru' ? 'Тестирование санитарии' : 'Sanity Testing',
      definition: language === 'ru'
        ? 'Быстрое тестирование для проверки конкретных функций после изменений.'
        : 'Quick testing to verify specific functions after changes.',
      category: 'functional'
    },
    {
      id: 34,
      term: language === 'ru' ? 'Тестирование приемки' : 'Acceptance Testing',
      definition: language === 'ru'
        ? 'Тестирование, проводимое заказчиком для проверки соответствия системы требованиям.'
        : 'Testing conducted by the customer to verify system compliance with requirements.',
      category: 'functional'
    },
    {
      id: 35,
      term: language === 'ru' ? 'Тестирование интеграции' : 'Integration Testing',
      definition: language === 'ru'
        ? 'Тестирование взаимодействия между различными компонентами или модулями системы.'
        : 'Testing the interaction between different components or modules of the system.',
      category: 'functional'
    },
    {
      id: 36,
      term: language === 'ru' ? 'Тестирование системы' : 'System Testing',
      definition: language === 'ru'
        ? 'Тестирование всей системы в целом для проверки её соответствия требованиям.'
        : 'Testing the entire system as a whole to verify its compliance with requirements.',
      category: 'functional'
    },
    {
      id: 37,
      term: language === 'ru' ? 'Тестирование пользовательского интерфейса' : 'UI Testing',
      definition: language === 'ru'
        ? 'Тестирование графического интерфейса пользователя для проверки его функциональности и внешнего вида.'
        : 'Testing the graphical user interface to verify its functionality and appearance.',
      category: 'functional'
    },
    {
      id: 38,
      term: language === 'ru' ? 'Тестирование API' : 'API Testing',
      definition: language === 'ru'
        ? 'Тестирование программных интерфейсов приложения для проверки их функциональности и производительности.'
        : 'Testing application programming interfaces to verify their functionality and performance.',
      category: 'functional'
    },
    {
      id: 39,
      term: language === 'ru' ? 'Тестирование базы данных' : 'Database Testing',
      definition: language === 'ru'
        ? 'Тестирование целостности, производительности и функциональности базы данных.'
        : 'Testing database integrity, performance, and functionality.',
      category: 'functional'
    },
    {
      id: 40,
      term: language === 'ru' ? 'Тестирование совместимости' : 'Compatibility Testing',
      definition: language === 'ru'
        ? 'Тестирование приложения на различных платформах, браузерах и устройствах.'
        : 'Testing the application on various platforms, browsers, and devices.',
      category: 'functional'
    },

    // Дополнительные термины нефункционального тестирования
    {
      id: 41,
      term: language === 'ru' ? 'Тестирование масштабируемости' : 'Scalability Testing',
      definition: language === 'ru'
        ? 'Тестирование способности системы увеличивать производительность при добавлении ресурсов.'
        : 'Testing the system\'s ability to increase performance when adding resources.',
      category: 'nonFunctional'
    },
    {
      id: 42,
      term: language === 'ru' ? 'Тестирование стабильности' : 'Stability Testing',
      definition: language === 'ru'
        ? 'Тестирование системы в течение длительного времени для проверки её стабильности.'
        : 'Testing the system over a long period to verify its stability.',
      category: 'nonFunctional'
    },
    {
      id: 43,
      term: language === 'ru' ? 'Тестирование восстановления' : 'Recovery Testing',
      definition: language === 'ru'
        ? 'Тестирование способности системы восстанавливаться после сбоев и ошибок.'
        : 'Testing the system\'s ability to recover from failures and errors.',
      category: 'nonFunctional'
    },
    {
      id: 44,
      term: language === 'ru' ? 'Тестирование локализации' : 'Localization Testing',
      definition: language === 'ru'
        ? 'Тестирование адаптации приложения для различных языков и культур.'
        : 'Testing the adaptation of the application for different languages and cultures.',
      category: 'nonFunctional'
    },
    {
      id: 45,
      term: language === 'ru' ? 'Тестирование доступности' : 'Accessibility Testing',
      definition: language === 'ru'
        ? 'Тестирование доступности приложения для людей с ограниченными возможностями.'
        : 'Testing the accessibility of the application for people with disabilities.',
      category: 'nonFunctional'
    },
    {
      id: 46,
      term: language === 'ru' ? 'Тестирование конфигурации' : 'Configuration Testing',
      definition: language === 'ru'
        ? 'Тестирование приложения с различными конфигурациями системы и окружения.'
        : 'Testing the application with various system and environment configurations.',
      category: 'nonFunctional'
    },
    {
      id: 47,
      term: language === 'ru' ? 'Тестирование установки' : 'Installation Testing',
      definition: language === 'ru'
        ? 'Тестирование процесса установки и удаления приложения.'
        : 'Testing the process of installing and uninstalling the application.',
      category: 'nonFunctional'
    },
    {
      id: 48,
      term: language === 'ru' ? 'Тестирование миграции' : 'Migration Testing',
      definition: language === 'ru'
        ? 'Тестирование процесса переноса данных и конфигураций между версиями.'
        : 'Testing the process of migrating data and configurations between versions.',
      category: 'nonFunctional'
    },
    {
      id: 49,
      term: language === 'ru' ? 'Тестирование совместимости браузеров' : 'Cross-Browser Testing',
      definition: language === 'ru'
        ? 'Тестирование веб-приложения в различных браузерах для обеспечения совместимости.'
        : 'Testing web applications in various browsers to ensure compatibility.',
      category: 'nonFunctional'
    },
    {
      id: 50,
      term: language === 'ru' ? 'Тестирование мобильных устройств' : 'Mobile Testing',
      definition: language === 'ru'
        ? 'Тестирование приложений на различных мобильных устройствах и операционных системах.'
        : 'Testing applications on various mobile devices and operating systems.',
      category: 'nonFunctional'
    },

    // Дополнительные термины автоматизации
    {
      id: 51,
      term: language === 'ru' ? 'Page Object Model' : 'Page Object Model',
      definition: language === 'ru'
        ? 'Паттерн проектирования для автоматизации тестирования, который инкапсулирует элементы страницы.'
        : 'A design pattern for test automation that encapsulates page elements.',
      category: 'automation'
    },
    {
      id: 52,
      term: language === 'ru' ? 'Data-Driven Testing' : 'Data-Driven Testing',
      definition: language === 'ru'
        ? 'Подход к автоматизации, при котором тестовые данные хранятся отдельно от тестового кода.'
        : 'An automation approach where test data is stored separately from test code.',
      category: 'automation'
    },
    {
      id: 53,
      term: language === 'ru' ? 'Keyword-Driven Testing' : 'Keyword-Driven Testing',
      definition: language === 'ru'
        ? 'Подход к автоматизации, использующий ключевые слова для описания тестовых действий.'
        : 'An automation approach using keywords to describe test actions.',
      category: 'automation'
    },
    {
      id: 54,
      term: language === 'ru' ? 'TestNG' : 'TestNG',
      definition: language === 'ru'
        ? 'Фреймворк для тестирования Java с расширенными возможностями по сравнению с JUnit.'
        : 'A Java testing framework with advanced capabilities compared to JUnit.',
      category: 'automation'
    },
    {
      id: 55,
      term: language === 'ru' ? 'Pytest' : 'Pytest',
      definition: language === 'ru'
        ? 'Популярный фреймворк для тестирования Python с простым синтаксисом.'
        : 'A popular Python testing framework with simple syntax.',
      category: 'automation'
    },
    {
      id: 56,
      term: language === 'ru' ? 'NUnit' : 'NUnit',
      definition: language === 'ru'
        ? 'Фреймворк для модульного тестирования .NET приложений.'
        : 'A framework for unit testing .NET applications.',
      category: 'automation'
    },
    {
      id: 57,
      term: language === 'ru' ? 'XUnit' : 'XUnit',
      definition: language === 'ru'
        ? 'Современный фреймворк для тестирования .NET с открытым исходным кодом.'
        : 'A modern open-source testing framework for .NET.',
      category: 'automation'
    },
    {
      id: 58,
      term: language === 'ru' ? 'Cucumber' : 'Cucumber',
      definition: language === 'ru'
        ? 'Инструмент для BDD, позволяющий писать тесты на естественном языке.'
        : 'A BDD tool that allows writing tests in natural language.',
      category: 'automation'
    },
    {
      id: 59,
      term: language === 'ru' ? 'SpecFlow' : 'SpecFlow',
      definition: language === 'ru'
        ? 'Инструмент для BDD в .NET, основанный на Cucumber.'
        : 'A BDD tool for .NET based on Cucumber.',
      category: 'automation'
    },
    {
      id: 60,
      term: language === 'ru' ? 'Behave' : 'Behave',
      definition: language === 'ru'
        ? 'Фреймворк для BDD в Python, основанный на Cucumber.'
        : 'A BDD framework for Python based on Cucumber.',
      category: 'automation'
    },

    // Дополнительные термины методологии
    {
      id: 61,
      term: language === 'ru' ? 'ATDD (Acceptance Test-Driven Development)' : 'ATDD (Acceptance Test-Driven Development)',
      definition: language === 'ru'
        ? 'Методология разработки, при которой приемочные тесты пишутся до разработки функциональности.'
        : 'A development methodology where acceptance tests are written before developing functionality.',
      category: 'methodology'
    },
    {
      id: 62,
      term: language === 'ru' ? 'Continuous Testing' : 'Continuous Testing',
      definition: language === 'ru'
        ? 'Подход к тестированию, при котором тесты выполняются автоматически на каждом этапе разработки.'
        : 'A testing approach where tests are automatically executed at each development stage.',
      category: 'methodology'
    },
    {
      id: 63,
      term: language === 'ru' ? 'Exploratory Testing' : 'Exploratory Testing',
      definition: language === 'ru'
        ? 'Неформальный подход к тестированию, основанный на исследовании и обучении тестировщика.'
        : 'An informal testing approach based on tester exploration and learning.',
      category: 'methodology'
    },
    {
      id: 64,
      term: language === 'ru' ? 'Session-Based Testing' : 'Session-Based Testing',
      definition: language === 'ru'
        ? 'Структурированный подход к исследовательскому тестированию с временными ограничениями.'
        : 'A structured approach to exploratory testing with time constraints.',
      category: 'methodology'
    },
    {
      id: 65,
      term: language === 'ru' ? 'Risk-Based Testing' : 'Risk-Based Testing',
      definition: language === 'ru'
        ? 'Подход к тестированию, при котором приоритет отдается тестированию высокорисковых компонентов.'
        : 'A testing approach where priority is given to testing high-risk components.',
      category: 'methodology'
    },
    {
      id: 66,
      term: language === 'ru' ? 'Model-Based Testing' : 'Model-Based Testing',
      definition: language === 'ru'
        ? 'Подход к тестированию, основанный на создании моделей поведения системы.'
        : 'A testing approach based on creating models of system behavior.',
      category: 'methodology'
    },
    {
      id: 67,
      term: language === 'ru' ? 'Mutation Testing' : 'Mutation Testing',
      definition: language === 'ru'
        ? 'Техника тестирования, при которой в код вносятся небольшие изменения для проверки качества тестов.'
        : 'A testing technique where small changes are made to code to verify test quality.',
      category: 'methodology'
    },
    {
      id: 68,
      term: language === 'ru' ? 'Pair Testing' : 'Pair Testing',
      definition: language === 'ru'
        ? 'Подход к тестированию, при котором два тестировщика работают вместе над одним тестом.'
        : 'A testing approach where two testers work together on one test.',
      category: 'methodology'
    },
    {
      id: 69,
      term: language === 'ru' ? 'Crowdsourced Testing' : 'Crowdsourced Testing',
      definition: language === 'ru'
        ? 'Подход к тестированию, при котором тестирование выполняется большой группой людей.'
        : 'A testing approach where testing is performed by a large group of people.',
      category: 'methodology'
    },
    {
      id: 70,
      term: language === 'ru' ? 'A/B Testing' : 'A/B Testing',
      definition: language === 'ru'
        ? 'Метод тестирования, при котором сравниваются две версии продукта для определения лучшей.'
        : 'A testing method where two versions of a product are compared to determine the better one.',
      category: 'methodology'
    },

    // Дополнительные инструменты
    {
      id: 71,
      term: language === 'ru' ? 'Charles Proxy' : 'Charles Proxy',
      definition: language === 'ru'
        ? 'Инструмент для анализа и отладки HTTP/HTTPS трафика между клиентом и сервером.'
        : 'A tool for analyzing and debugging HTTP/HTTPS traffic between client and server.',
      category: 'tools'
    },
    {
      id: 72,
      term: language === 'ru' ? 'Fiddler' : 'Fiddler',
      definition: language === 'ru'
        ? 'Веб-отладчик для анализа HTTP трафика и тестирования веб-приложений.'
        : 'A web debugger for analyzing HTTP traffic and testing web applications.',
      category: 'tools'
    },
    {
      id: 73,
      term: language === 'ru' ? 'Burp Suite' : 'Burp Suite',
      definition: language === 'ru'
        ? 'Комплексная платформа для тестирования безопасности веб-приложений.'
        : 'A comprehensive platform for testing web application security.',
      category: 'tools'
    },
    {
      id: 74,
      term: language === 'ru' ? 'OWASP ZAP' : 'OWASP ZAP',
      definition: language === 'ru'
        ? 'Инструмент с открытым исходным кодом для тестирования безопасности веб-приложений.'
        : 'An open-source tool for testing web application security.',
      category: 'tools'
    },
    {
      id: 75,
      term: language === 'ru' ? 'Lighthouse' : 'Lighthouse',
      definition: language === 'ru'
        ? 'Инструмент Google для аудита производительности, доступности и SEO веб-страниц.'
        : 'A Google tool for auditing web page performance, accessibility, and SEO.',
      category: 'tools'
    },
    {
      id: 76,
      term: language === 'ru' ? 'WebPageTest' : 'WebPageTest',
      definition: language === 'ru'
        ? 'Онлайн-инструмент для детального анализа производительности веб-страниц.'
        : 'An online tool for detailed analysis of web page performance.',
      category: 'tools'
    },
    {
      id: 77,
      term: language === 'ru' ? 'GTmetrix' : 'GTmetrix',
      definition: language === 'ru'
        ? 'Инструмент для анализа скорости загрузки веб-страниц и рекомендаций по оптимизации.'
        : 'A tool for analyzing web page loading speed and optimization recommendations.',
      category: 'tools'
    },
    {
      id: 78,
      term: language === 'ru' ? 'BrowserStack' : 'BrowserStack',
      definition: language === 'ru'
        ? 'Платформа для тестирования веб-приложений на реальных устройствах и браузерах.'
        : 'A platform for testing web applications on real devices and browsers.',
      category: 'tools'
    },
    {
      id: 79,
      term: language === 'ru' ? 'Sauce Labs' : 'Sauce Labs',
      definition: language === 'ru'
        ? 'Облачная платформа для автоматизированного тестирования веб и мобильных приложений.'
        : 'A cloud platform for automated testing of web and mobile applications.',
      category: 'tools'
    },
    {
      id: 80,
      term: language === 'ru' ? 'LambdaTest' : 'LambdaTest',
      definition: language === 'ru'
        ? 'Облачная платформа для кросс-браузерного тестирования веб-приложений.'
        : 'A cloud platform for cross-browser testing of web applications.',
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