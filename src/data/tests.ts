export interface Question {
  id: number; // Уникальный идентификатор вопроса внутри теста
  question: Record<'ru' | 'en', string>;
  options: Record<'ru' | 'en', string[]>;
  correctAnswer: number; // Индекс правильного ответа в массиве options
  explanation: Record<'ru' | 'en', string>;
}

// Для демонстрации мультиязычной структуры:
export interface MultilangQuestion {
  id: number;
  question: {
    ru: string;
    en: string;
  };
  options: {
    ru: string[];
    en: string[];
  };
  correctAnswer: number;
  explanation: {
    ru: string;
    en: string;
  };
}

export const demoMultilangQuestions: MultilangQuestion[] = [
  {
    id: 1,
    question: {
      ru: 'Что такое тестирование программного обеспечения?',
      en: 'What is software testing?',
    },
    options: {
      ru: [
        'Процесс поиска ошибок в коде',
        'Процесс проверки соответствия программы требованиям',
        'Процесс написания документации',
        'Процесс оптимизации производительности',
      ],
      en: [
        'The process of finding bugs in code',
        'The process of verifying software meets requirements',
        'The process of writing documentation',
        'The process of optimizing performance',
      ],
    },
    correctAnswer: 1,
    explanation: {
      ru: 'Тестирование - это процесс проверки соответствия программы требованиям и выявления дефектов.',
      en: 'Testing is the process of verifying software meets requirements and finding defects.',
    },
  },
];

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

// Исправленный тип Test для мультиязычности
type MultilangString = Record<'ru' | 'en', string>;

export interface Question {
  id: number;
  question: MultilangString;
  options: Record<'ru' | 'en', string[]>;
  correctAnswer: number;
  explanation: MultilangString;
}

export interface Test {
  id: string;
  title: MultilangString;
  description: MultilangString;
  difficulty: Difficulty;
  questions: Question[];
}

export const testsData = {
  ru: {
    basics: {
      title: {
        ru: 'Основы тестирования',
        en: 'Testing Basics',
      },
      description: {
        ru: 'Базовые концепции и термины тестирования ПО',
        en: 'Basic concepts and terms of software testing',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'Что такое тестирование программного обеспечения?',
            en: 'What is software testing?',
          },
          options: {
            ru: [
              'Процесс поиска ошибок в коде',
              'Процесс проверки соответствия программы требованиям',
              'Процесс написания документации',
              'Процесс оптимизации производительности',
            ],
            en: [
              'The process of finding bugs in code',
              'The process of verifying software meets requirements',
              'The process of writing documentation',
              'The process of optimizing performance',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование - это процесс проверки соответствия программы требованиям и выявления дефектов.',
            en: 'Testing is the process of verifying software meets requirements and finding defects.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'Какие основные типы тестирования вы знаете?',
            en: 'What are the main types of testing?',
          },
          options: {
            ru: [
              'Функциональное тестирование',
              'Функциональное, нефункциональное и тестирование изменений',
              'Автоматизированное тестирование',
              'Ручное тестирование',
            ],
            en: [
              'Functional testing',
              'Functional, non-functional and change testing',
              'Automated testing',
              'Manual testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Основные типы: функциональное (проверка функций), нефункциональное (производительность, безопасность) и тестирование изменений (регрессионное).',
            en: 'Main types: functional (function verification), non-functional (performance, security) and change testing (regression).',
          },
        },
        {
          id: 3,
          question: {
            ru: 'Что такое баг (дефект)?',
            en: 'What is a bug (defect)?',
          },
          options: {
            ru: [
              'Любая ошибка в программе',
              'Отклонение от ожидаемого поведения',
              'Проблема с дизайном',
              'Все перечисленное',
            ],
            en: [
              'Any error in the program',
              'Deviation from expected behavior',
              'Design problem',
              'All of the above',
            ],
          },
          correctAnswer: 3,
          explanation: {
            ru: 'Баг - это отклонение от ожидаемого поведения программы, которое может включать ошибки в коде, дизайне или требованиях.',
            en: 'A bug is a deviation from the expected behavior of a program that may include errors in code, design, or requirements.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'Что такое тестирование черного ящика?',
            en: 'What is black box testing?',
          },
          options: {
            ru: [
              'Тестирование без доступа к коду',
              'Тестирование с полным доступом к коду',
              'Тестирование только интерфейса',
              'Тестирование производительности',
            ],
            en: [
              'Testing without access to code',
              'Testing with full access to code',
              'Testing only the interface',
              'Performance testing',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Тестирование черного ящика - это метод тестирования, при котором тестировщик не имеет доступа к внутренней структуре кода.',
            en: 'Black box testing is a testing method where the tester has no access to the internal code structure.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'Что такое тестирование белого ящика?',
            en: 'What is white box testing?',
          },
          options: {
            ru: [
              'Тестирование без доступа к коду',
              'Тестирование с доступом к внутренней структуре кода',
              'Тестирование только интерфейса',
              'Тестирование безопасности',
            ],
            en: [
              'Testing without access to code',
              'Testing with access to internal code structure',
              'Testing only the interface',
              'Security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование белого ящика - это метод тестирования, при котором тестировщик имеет доступ к внутренней структуре кода.',
            en: 'White box testing is a testing method where the tester has access to the internal code structure.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'Что такое тест-кейс?',
            en: 'What is a test case?',
          },
          options: {
            ru: [
              'Документ с описанием шагов и ожидаемого результата',
              'Ошибка в программе',
              'Инструмент автоматизации',
              'Методология тестирования',
            ],
            en: [
              'Document describing steps and expected results',
              'Error in the program',
              'Automation tool',
              'Testing methodology',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Тест-кейс — это документ, описывающий шаги, входные данные и ожидаемый результат для проверки определённой функции.',
            en: 'A test case is a document describing steps, input data and expected results for testing a specific function.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'Что такое тест-план?',
            en: 'What is a test plan?',
          },
          options: {
            ru: [
              'План разработки продукта',
              'Документ, описывающий объём, подходы и ресурсы для тестирования',
              'Список багов',
              'Методика автоматизации',
            ],
            en: [
              'Product development plan',
              'Document describing scope, approaches and resources for testing',
              'List of bugs',
              'Automation methodology',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тест-план — это документ, определяющий объём, стратегию, ресурсы и расписание тестирования.',
            en: 'A test plan is a document defining the scope, strategy, resources and testing schedule.',
          },
        },
      ],
    },
    functional: {
      title: {
        ru: 'Функциональное тестирование',
        en: 'Functional testing',
      },
      description: {
        ru: 'Тестирование функциональности приложения',
        en: 'Testing application functionality',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'Что проверяет функциональное тестирование?',
            en: 'What does functional testing check?',
          },
          options: {
            ru: [
              'Производительность системы',
              'Внешний вид интерфейса',
              'Соответствие функций требованиям',
              'Безопасность приложения',
            ],
            en: [
              'System performance',
              'Interface appearance',
              'Function compliance with requirements',
              'Application security',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Функциональное тестирование проверяет, что все функции приложения работают согласно требованиям.',
            en: 'Functional testing verifies that all application functions work according to requirements.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'Какие техники функционального тестирования вы знаете?',
            en: 'What functional testing techniques do you know?',
          },
          options: {
            ru: [
              'Эквивалентное разбиение',
              'Эквивалентное разбиение, граничные значения, анализ причинно-следственных связей',
              'Тестирование производительности',
              'Тестирование безопасности',
            ],
            en: [
              'Equivalence partitioning',
              'Equivalence partitioning, boundary values, cause-effect analysis',
              'Performance testing',
              'Security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Основные техники: эквивалентное разбиение, граничные значения, анализ причинно-следственных связей.',
            en: 'Main techniques: equivalence partitioning, boundary values, cause-effect analysis.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'Что такое эквивалентное разбиение?',
            en: 'What is equivalence partitioning?',
          },
          options: {
            ru: [
              'Разделение данных на группы с одинаковым поведением',
              'Тестирование граничных значений',
              'Анализ причинно-следственных связей',
              'Тестирование производительности',
            ],
            en: [
              'Dividing data into groups with the same behavior',
              'Testing boundary values',
              'Cause-effect analysis',
              'Performance testing',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Эквивалентное разбиение - это техника, при которой входные данные разделяются на группы, которые должны обрабатываться одинаково.',
            en: 'Equivalence partitioning is a technique where input data is divided into groups that should be processed the same way.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'Что такое тестирование граничных значений?',
            en: 'What is boundary value testing?',
          },
          options: {
            ru: [
              'Тестирование только минимальных значений',
              'Тестирование значений на границах допустимых диапазонов',
              'Тестирование максимальных значений',
              'Тестирование случайных значений',
            ],
            en: [
              'Testing only minimum values',
              'Testing values at the boundaries of acceptable ranges',
              'Testing maximum values',
              'Testing random values',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование граничных значений - это техника тестирования значений на границах допустимых диапазонов.',
            en: 'Boundary value testing is a technique for testing values at the boundaries of acceptable ranges.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'Что такое тестирование пользовательского интерфейса?',
            en: 'What is user interface testing?',
          },
          options: {
            ru: [
              'Тестирование только кода',
              'Тестирование взаимодействия пользователя с интерфейсом',
              'Тестирование базы данных',
              'Тестирование API',
            ],
            en: [
              'Testing only code',
              'Testing user interaction with the interface',
              'Database testing',
              'API testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'UI тестирование проверяет взаимодействие пользователя с интерфейсом приложения.',
            en: 'UI testing verifies user interaction with the application interface.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'Что такое регрессионное тестирование?',
            en: 'What is regression testing?',
          },
          options: {
            ru: [
              'Тестирование новых функций',
              'Повторное тестирование ранее работающих функций после изменений',
              'Тестирование производительности',
              'Тестирование безопасности',
            ],
            en: [
              'Testing new features',
              'Re-testing previously working functions after changes',
              'Performance testing',
              'Security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Регрессионное тестирование - это повторное тестирование ранее работающих функций после внесения изменений.',
            en: 'Regression testing is re-testing previously working functions after making changes.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'Что такое smoke тестирование?',
            en: 'What is smoke testing?',
          },
          options: {
            ru: [
              'Тестирование дыма',
              'Быстрая проверка основных функций перед полным тестированием',
              'Тестирование производительности',
              'Тестирование безопасности',
            ],
            en: [
              'Smoke testing',
              'Quick check of basic functions before full testing',
              'Performance testing',
              'Security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Smoke тестирование - это быстрая проверка основных функций приложения перед проведением полного тестирования.',
            en: 'Smoke testing is a quick check of basic application functions before conducting full testing.',
          },
        },
      ],
    },
    nonFunctional: {
      title: {
        ru: 'Нефункциональное тестирование',
        en: 'Non-functional testing',
      },
      description: {
        ru: 'Тестирование производительности, безопасности и других характеристик',
        en: 'Testing performance, security, and other characteristics',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'Что такое нагрузочное тестирование?',
            en: 'What is load testing?',
          },
          options: {
            ru: [
              'Тестирование под ожидаемой нагрузкой',
              'Тестирование максимальной нагрузки',
              'Тестирование минимальной нагрузки',
              'Тестирование безопасности',
            ],
            en: [
              'Testing under expected load',
              'Testing maximum load',
              'Testing minimum load',
              'Security testing',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Нагрузочное тестирование - это тестирование системы под ожидаемой нагрузкой для проверки её производительности.',
            en: 'Load testing is testing the system under expected load to verify its performance.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'Что такое стресс-тестирование?',
            en: 'What is stress testing?',
          },
          options: {
            ru: [
              'Тестирование под нормальной нагрузкой',
              'Тестирование за пределами нормальной рабочей нагрузки',
              'Тестирование минимальной нагрузки',
              'Тестирование безопасности',
            ],
            en: [
              'Testing under normal load',
              'Testing beyond normal working load',
              'Testing minimum load',
              'Security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Стресс-тестирование - это тестирование системы за пределами её нормальной рабочей нагрузки для определения точки отказа.',
            en: 'Stress testing is testing the system beyond its normal working load to determine the breaking point.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'Что такое тестирование безопасности?',
            en: 'What is security testing?',
          },
          options: {
            ru: [
              'Тестирование производительности',
              'Тестирование функциональности',
              'Выявление уязвимостей и слабых мест в системе безопасности',
              'Тестирование интерфейса',
            ],
            en: [
              'Performance testing',
              'Functional testing',
              'Identifying vulnerabilities and weaknesses in the security system',
              'Interface testing',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Тестирование безопасности направлено на выявление уязвимостей и слабых мест в системе безопасности.',
            en: 'Security testing is aimed at identifying vulnerabilities and weaknesses in the security system.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'Что такое тестирование удобства использования (Usability)?',
            en: 'What is usability testing?',
          },
          options: {
            ru: [
              'Тестирование производительности',
              'Тестирование функциональности',
              'Тестирование удобства и простоты использования интерфейса',
              'Тестирование безопасности',
            ],
            en: [
              'Performance testing',
              'Functional testing',
              'Testing the ease and simplicity of interface use',
              'Security testing',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Usability тестирование проверяет удобство и простоту использования интерфейса пользователями.',
            en: 'Usability testing checks the ease and simplicity of interface use by users.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'Что такое тестирование совместимости?',
            en: 'What is compatibility testing?',
          },
          options: {
            ru: [
              'Тестирование производительности',
              'Тестирование функциональности',
              'Тестирование работы в разных средах и браузерах',
              'Тестирование безопасности',
            ],
            en: [
              'Performance testing',
              'Functional testing',
              'Testing operation in different environments and browsers',
              'Security testing',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Тестирование совместимости проверяет работу приложения в разных средах, браузерах и устройствах.',
            en: 'Compatibility testing verifies application operation in different environments, browsers and devices.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'Что такое тестирование масштабируемости?',
            en: 'What is scalability testing?',
          },
          options: {
            ru: [
              'Тестирование производительности',
              'Тестирование функциональности',
              'Тестирование способности системы расти с увеличением нагрузки',
              'Тестирование безопасности',
            ],
            en: [
              'Performance testing',
              'Functional testing',
              'Testing the system ability to grow with increasing load',
              'Security testing',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Тестирование масштабируемости проверяет способность системы расти и обрабатывать увеличивающуюся нагрузку.',
            en: 'Scalability testing checks the system ability to grow and handle increasing load.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'Что такое тестирование надежности?',
            en: 'What is reliability testing?',
          },
          options: {
            ru: [
              'Тестирование производительности',
              'Тестирование функциональности',
              'Тестирование способности системы работать без сбоев',
              'Тестирование безопасности',
            ],
            en: [
              'Performance testing',
              'Functional testing',
              'Testing the system ability to work without failures',
              'Security testing',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Тестирование надежности проверяет способность системы работать стабильно и без сбоев в течение длительного времени.',
            en: 'Reliability testing checks the system ability to work stably and without failures for a long time.',
          },
        },
      ],
    },
    automation: {
      title: {
        ru: 'Автоматизация тестирования',
        en: 'Test automation',
      },
      description: {
        ru: 'Инструменты и методы автоматизации тестирования',
        en: 'Tools and methods for test automation',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'Что такое автоматизированное тестирование?',
            en: 'What is automated testing?',
          },
          options: {
            ru: [
              'Тестирование без использования инструментов',
              'Использование специальных инструментов для автоматического выполнения тестов',
              'Только ручное тестирование',
              'Тестирование производительности',
            ],
            en: [
              'Testing without using tools',
              'Using special tools to automatically execute tests',
              'Only manual testing',
              'Performance testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Автоматизированное тестирование - это использование специальных инструментов для автоматического выполнения тестов без вмешательства человека.',
            en: 'Automated testing is the use of special tools to automatically execute tests without human intervention.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'Какой инструмент используется для автоматизации веб-тестирования?',
            en: 'What tool is used for web testing automation?',
          },
          options: {
            ru: ['Selenium', 'Selenium, Cypress, Playwright', 'JUnit', 'Postman'],
            en: ['Selenium', 'Selenium, Cypress, Playwright', 'JUnit', 'Postman'],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Для веб-тестирования используются Selenium, Cypress, Playwright и другие инструменты.',
            en: 'Selenium, Cypress, Playwright and other tools are used for web testing.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'Что такое Page Object Model?',
            en: 'What is Page Object Model?',
          },
          options: {
            ru: [
              'Модель страницы',
              'Паттерн проектирования для автоматизации тестирования',
              'Инструмент автоматизации',
              'Методология тестирования',
            ],
            en: [
              'Page model',
              'Design pattern for test automation',
              'Automation tool',
              'Testing methodology',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Page Object Model - это паттерн проектирования, который инкапсулирует элементы страницы в отдельные классы.',
            en: 'Page Object Model is a design pattern that encapsulates page elements in separate classes.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'Что такое Data-Driven Testing?',
            en: 'What is Data-Driven Testing?',
          },
          options: {
            ru: [
              'Тестирование данных',
              'Подход к тестированию с использованием различных наборов данных',
              'Тестирование базы данных',
              'Тестирование API',
            ],
            en: [
              'Data testing',
              'Testing approach using various data sets',
              'Database testing',
              'API testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Data-Driven Testing - это подход к тестированию, при котором один тест выполняется с различными наборами данных.',
            en: 'Data-Driven Testing is a testing approach where one test is executed with various data sets.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'Что такое Keyword-Driven Testing?',
            en: 'What is Keyword-Driven Testing?',
          },
          options: {
            ru: [
              'Тестирование ключевых слов',
              'Подход к тестированию с использованием ключевых слов для описания действий',
              'Тестирование поиска',
              'Тестирование интерфейса',
            ],
            en: [
              'Keyword testing',
              'Testing approach using keywords to describe actions',
              'Search testing',
              'Interface testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Keyword-Driven Testing - это подход к тестированию, при котором действия описываются с помощью ключевых слов.',
            en: 'Keyword-Driven Testing is a testing approach where actions are described using keywords.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'Что такое TestNG?',
            en: 'What is TestNG?',
          },
          options: {
            ru: [
              'Инструмент для веб-тестирования',
              'Фреймворк для автоматизации тестирования на Java',
              'Инструмент для API тестирования',
              'Инструмент для мобильного тестирования',
            ],
            en: [
              'Web testing tool',
              'Java test automation framework',
              'API testing tool',
              'Mobile testing tool',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'TestNG - это фреймворк для автоматизации тестирования на Java с расширенными возможностями.',
            en: 'TestNG is a Java test automation framework with advanced capabilities.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'Что такое Cucumber?',
            en: 'What is Cucumber?',
          },
          options: {
            ru: [
              'Инструмент для веб-тестирования',
              'Фреймворк для BDD (Behavior-Driven Development)',
              'Инструмент для API тестирования',
              'Инструмент для мобильного тестирования',
            ],
            en: [
              'Web testing tool',
              'BDD (Behavior-Driven Development) framework',
              'API testing tool',
              'Mobile testing tool',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Cucumber - это фреймворк для BDD, который позволяет писать тесты на естественном языке.',
            en: 'Cucumber is a BDD framework that allows writing tests in natural language.',
          },
        },
      ],
    },
    tools: {
      title: {
        ru: 'Инструменты тестирования',
        en: 'Testing tools',
      },
      description: {
        ru: 'Популярные инструменты для автоматизации тестирования',
        en: 'Popular tools for test automation',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'Что такое API тестирование?',
            en: 'What is API testing?',
          },
          options: {
            ru: [
              'Тестирование веб-интерфейса',
              'Тестирование программных интерфейсов',
              'Тестирование базы данных',
              'Тестирование мобильных приложений',
            ],
            en: [
              'Web interface testing',
              'Software interface testing',
              'Database testing',
              'Mobile app testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'API тестирование - это тестирование программных интерфейсов для проверки взаимодействия между компонентами.',
            en: 'API testing is testing software interfaces to verify interaction between components.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'Какой инструмент используется для API тестирования?',
            en: 'What tool is used for API testing?',
          },
          options: {
            ru: ['Selenium', 'Postman, SoapUI, RestAssured', 'JUnit', 'Cypress'],
            en: ['Selenium', 'Postman, SoapUI, RestAssured', 'JUnit', 'Cypress'],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Для API тестирования используются Postman, SoapUI, RestAssured и другие инструменты.',
            en: 'Postman, SoapUI, RestAssured and other tools are used for API testing.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'Что такое Selenium?',
            en: 'What is Selenium?',
          },
          options: {
            ru: [
              'Инструмент для тестирования API',
              'Популярный фреймворк для автоматизации тестирования веб-приложений',
              'Инструмент для тестирования мобильных приложений',
              'Инструмент для тестирования производительности',
            ],
            en: [
              'API testing tool',
              'Popular framework for web application test automation',
              'Mobile app testing tool',
              'Performance testing tool',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Selenium - это популярный фреймворк для автоматизации тестирования веб-приложений с поддержкой различных браузеров.',
            en: 'Selenium is a popular framework for web application test automation with support for various browsers.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'Что такое Cypress?',
            en: 'What is Cypress?',
          },
          options: {
            ru: [
              'Инструмент для тестирования API',
              'Современный инструмент для автоматизации тестирования веб-приложений',
              'Инструмент для тестирования мобильных приложений',
              'Инструмент для тестирования производительности',
            ],
            en: [
              'API testing tool',
              'Modern tool for web application test automation',
              'Mobile app testing tool',
              'Performance testing tool',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Cypress - это современный инструмент для автоматизации тестирования веб-приложений с встроенной отладкой.',
            en: 'Cypress is a modern tool for web application test automation with built-in debugging.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'Что такое JMeter?',
            en: 'What is JMeter?',
          },
          options: {
            ru: [
              'Инструмент для веб-тестирования',
              'Инструмент Apache для нагрузочного тестирования',
              'Инструмент для API тестирования',
              'Инструмент для мобильного тестирования',
            ],
            en: [
              'Web testing tool',
              'Apache tool for load testing',
              'API testing tool',
              'Mobile testing tool',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'JMeter - это инструмент Apache для нагрузочного тестирования и измерения производительности.',
            en: 'JMeter is an Apache tool for load testing and performance measurement.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'Что такое Bug Tracking System?',
            en: 'What is Bug Tracking System?',
          },
          options: {
            ru: [
              'Система для отслеживания и управления багами',
              'Инструмент для автоматизации тестирования',
              'Среда разработки',
              'Система контроля версий',
            ],
            en: [
              'System for tracking and managing bugs',
              'Test automation tool',
              'Development environment',
              'Version control system',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Bug Tracking System — это система для отслеживания, управления и анализа дефектов.',
            en: 'Bug Tracking System is a system for tracking, managing and analyzing defects.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'Для чего используется Jenkins?',
            en: 'What is Jenkins used for?',
          },
          options: {
            ru: [
              'Для управления багами',
              'Для автоматизации CI/CD процессов',
              'Для тестирования безопасности',
              'Для мониторинга производительности',
            ],
            en: [
              'Bug management',
              'CI/CD process automation',
              'Security testing',
              'Performance monitoring',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Jenkins — это инструмент для автоматизации процессов CI/CD.',
            en: 'Jenkins is a tool for automating CI/CD processes.',
          },
        },
      ],
    },
    methodology: {
      title: {
        ru: 'Методологии тестирования',
        en: 'Testing methodologies',
      },
      description: {
        ru: 'Современные подходы и методологии в тестировании',
        en: 'Modern approaches and methodologies in testing',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'Что такое BDD (Behavior-Driven Development)?',
            en: 'What is BDD (Behavior-Driven Development)?',
          },
          options: {
            ru: [
              'Разработка без описания поведения',
              'Методология разработки, основанная на описании поведения системы на естественном языке',
              'Только автоматизированное тестирование',
              'Только ручное тестирование',
            ],
            en: [
              'Development without behavior description',
              'Development methodology based on describing system behavior in natural language',
              'Only automated testing',
              'Only manual testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'BDD - это методология разработки, основанная на описании поведения системы на естественном языке.',
            en: 'BDD is a development methodology based on describing system behavior in natural language.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'Что такое Shift-Left Testing?',
            en: 'What is Shift-Left Testing?',
          },
          options: {
            ru: [
              'Тестирование только в конце разработки',
              'Подход к тестированию, при котором тестирование начинается на ранних этапах разработки',
              'Тестирование только левой части интерфейса',
              'Тестирование производительности',
            ],
            en: [
              'Testing only at the end of development',
              'Testing approach where testing starts at early stages of development',
              'Testing only the left side of the interface',
              'Performance testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Shift-Left Testing - это подход к тестированию, при котором тестирование начинается на ранних этапах разработки.',
            en: 'Shift-Left Testing is a testing approach where testing starts at early stages of development.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'Что такое пирамида тестирования?',
            en: 'What is the testing pyramid?',
          },
          options: {
            ru: [
              'Модель тестирования без структуры',
              'Модель, показывающая оптимальное соотношение между различными типами тестов',
              'Только автоматизированное тестирование',
              'Только ручное тестирование',
            ],
            en: [
              'Testing model without structure',
              'Model showing optimal ratio between different types of tests',
              'Only automated testing',
              'Only manual testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Пирамида тестирования - это модель, показывающая оптимальное соотношение между различными типами тестов (unit, integration, e2e).',
            en: 'The testing pyramid is a model showing the optimal ratio between different types of tests (unit, integration, e2e).',
          },
        },
        {
          id: 4,
          question: {
            ru: 'Что такое Continuous Testing?',
            en: 'What is Continuous Testing?',
          },
          options: {
            ru: [
              'Тестирование только в конце проекта',
              'Подход к тестированию, при котором тесты выполняются автоматически на каждом этапе разработки',
              'Тестирование только производительности',
              'Тестирование только безопасности',
            ],
            en: [
              'Testing only at the end of the project',
              'Testing approach where tests are executed automatically at each development stage',
              'Only performance testing',
              'Only security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Continuous Testing - это подход к тестированию, при котором тесты выполняются автоматически на каждом этапе разработки.',
            en: 'Continuous Testing is a testing approach where tests are executed automatically at each development stage.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'Что такое Exploratory Testing?',
            en: 'What is Exploratory Testing?',
          },
          options: {
            ru: [
              'Структурированное тестирование по плану',
              'Неформальный подход к тестированию, основанный на исследовании и обучении тестировщика',
              'Только автоматизированное тестирование',
              'Только ручное тестирование',
            ],
            en: [
              'Structured testing according to plan',
              'Informal testing approach based on tester exploration and learning',
              'Only automated testing',
              'Only manual testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Exploratory Testing - это неформальный подход к тестированию, основанный на исследовании и обучении тестировщика.',
            en: 'Exploratory Testing is an informal testing approach based on tester exploration and learning.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'Что такое Kanban?',
            en: 'What is Kanban?',
          },
          options: {
            ru: [
              'Методология управления проектами',
              'Инструмент автоматизации',
              'Тип тестирования',
              'Система контроля версий',
            ],
            en: [
              'Project management methodology',
              'Automation tool',
              'Type of testing',
              'Version control system',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Kanban — это методология управления проектами, основанная на визуализации задач.',
            en: 'Kanban is a project management methodology based on task visualization.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'Что такое Scrum?',
            en: 'What is Scrum?',
          },
          options: {
            ru: [
              'Методология гибкой разработки',
              'Инструмент тестирования',
              'Тип тестирования',
              'Система баг-трекинга',
            ],
            en: [
              'Agile development methodology',
              'Testing tool',
              'Type of testing',
              'Bug tracking system',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Scrum — это методология гибкой разработки, основанная на спринтах и ролях.',
            en: 'Scrum is an agile development methodology based on sprints and roles.',
          },
        },
      ],
    },
    mobile: {
      title: {
        ru: 'Мобильное тестирование',
        en: 'Mobile testing',
      },
      description: {
        ru: 'Тестирование мобильных приложений и специфические особенности',
        en: 'Testing mobile applications and specific features',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'Что такое мобильное тестирование?',
            en: 'What is mobile testing?',
          },
          options: {
            ru: [
              'Тестирование только веб-сайтов',
              'Тестирование мобильных приложений на различных устройствах и платформах',
              'Тестирование только Android приложений',
              'Тестирование только iOS приложений',
            ],
            en: [
              'Testing only websites',
              'Testing mobile applications on various devices and platforms',
              'Testing only Android applications',
              'Testing only iOS applications',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Мобильное тестирование - это тестирование мобильных приложений на различных устройствах и платформах.',
            en: 'Mobile testing is testing mobile applications on various devices and platforms.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'Какие типы мобильного тестирования вы знаете?',
            en: 'What types of mobile testing do you know?',
          },
          options: {
            ru: [
              'Только функциональное тестирование',
              'Функциональное, производительность, совместимость, удобство использования',
              'Только производительность',
              'Только совместимость',
            ],
            en: [
              'Only functional testing',
              'Functional, performance, compatibility, usability',
              'Only performance',
              'Only compatibility',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Основные типы: функциональное, производительность, совместимость, удобство использования.',
            en: 'Main types: functional, performance, compatibility, usability.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'Что такое тестирование на реальных устройствах?',
            en: 'What is real device testing?',
          },
          options: {
            ru: [
              'Тестирование только в эмуляторе',
              'Тестирование на физических мобильных устройствах',
              'Тестирование только в браузере',
              'Тестирование только на планшете',
            ],
            en: [
              'Testing only in emulator',
              'Testing on physical mobile devices',
              'Testing only in browser',
              'Testing only on tablet',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование на реальных устройствах - это тестирование на физических мобильных устройствах.',
            en: 'Real device testing is testing on physical mobile devices.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'Что такое тестирование в эмуляторе?',
            en: 'What is emulator testing?',
          },
          options: {
            ru: [
              'Тестирование на реальном устройстве',
              'Тестирование в программной среде, имитирующей мобильное устройство',
              'Тестирование только в браузере',
              'Тестирование только на компьютере',
            ],
            en: [
              'Testing on real device',
              'Testing in software environment simulating mobile device',
              'Testing only in browser',
              'Testing only on computer',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование в эмуляторе - это тестирование в программной среде, имитирующей мобильное устройство.',
            en: 'Emulator testing is testing in software environment simulating mobile device.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'Что такое тестирование производительности мобильных приложений?',
            en: 'What is mobile application performance testing?',
          },
          options: {
            ru: [
              'Тестирование только скорости загрузки',
              'Тестирование скорости, памяти, батареи и сети',
              'Тестирование только памяти',
              'Тестирование только батареи',
            ],
            en: [
              'Testing only loading speed',
              'Testing speed, memory, battery and network',
              'Testing only memory',
              'Testing only battery',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование производительности мобильных приложений включает тестирование скорости, памяти, батареи и сети.',
            en: 'Mobile application performance testing includes testing speed, memory, battery and network.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'Что такое тестирование совместимости мобильных приложений?',
            en: 'What is mobile application compatibility testing?',
          },
          options: {
            ru: [
              'Тестирование только на одной платформе',
              'Тестирование на различных устройствах, ОС и версиях',
              'Тестирование только на Android',
              'Тестирование только на iOS',
            ],
            en: [
              'Testing only on one platform',
              'Testing on various devices, OS and versions',
              'Testing only on Android',
              'Testing only on iOS',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование совместимости мобильных приложений - это тестирование на различных устройствах, ОС и версиях.',
            en: 'Mobile application compatibility testing is testing on various devices, OS and versions.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'Что такое тестирование удобства использования мобильных приложений?',
            en: 'What is mobile application usability testing?',
          },
          options: {
            ru: [
              'Тестирование только функциональности',
              'Тестирование удобства интерфейса, навигации и взаимодействия',
              'Тестирование только производительности',
              'Тестирование только безопасности',
            ],
            en: [
              'Testing only functionality',
              'Testing interface convenience, navigation and interaction',
              'Testing only performance',
              'Testing only security',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование удобства использования мобильных приложений включает тестирование удобства интерфейса, навигации и взаимодействия.',
            en: 'Mobile application usability testing includes testing interface convenience, navigation and interaction.',
          },
        },
      ],
    },
    database: {
      title: {
        ru: 'Тестирование баз данных',
        en: 'Database testing',
      },
      description: {
        ru: 'Тестирование баз данных и SQL запросов',
        en: 'Testing databases and SQL queries',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'Что такое тестирование баз данных?',
            en: 'What is database testing?',
          },
          options: {
            ru: [
              'Тестирование только SQL запросов',
              'Тестирование целостности, производительности и безопасности баз данных',
              'Тестирование только производительности',
              'Тестирование только безопасности',
            ],
            en: [
              'Testing only SQL queries',
              'Testing database integrity, performance and security',
              'Testing only performance',
              'Testing only security',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование баз данных включает тестирование целостности, производительности и безопасности.',
            en: 'Database testing includes testing integrity, performance and security.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'Что такое тестирование целостности данных?',
            en: 'What is data integrity testing?',
          },
          options: {
            ru: [
              'Тестирование только производительности',
              'Проверка точности, согласованности и надежности данных',
              'Тестирование только безопасности',
              'Тестирование только SQL запросов',
            ],
            en: [
              'Testing only performance',
              'Checking data accuracy, consistency and reliability',
              'Testing only security',
              'Testing only SQL queries',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование целостности данных - это проверка точности, согласованности и надежности данных.',
            en: 'Data integrity testing is checking data accuracy, consistency and reliability.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'Что такое тестирование SQL запросов?',
            en: 'What is SQL query testing?',
          },
          options: {
            ru: [
              'Тестирование только SELECT запросов',
              'Тестирование различных типов SQL запросов на корректность и производительность',
              'Тестирование только INSERT запросов',
              'Тестирование только UPDATE запросов',
            ],
            en: [
              'Testing only SELECT queries',
              'Testing various types of SQL queries for correctness and performance',
              'Testing only INSERT queries',
              'Testing only UPDATE queries',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование SQL запросов - это тестирование различных типов SQL запросов на корректность и производительность.',
            en: 'SQL query testing is testing various types of SQL queries for correctness and performance.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'Что такое тестирование производительности баз данных?',
            en: 'What is database performance testing?',
          },
          options: {
            ru: [
              'Тестирование только скорости запросов',
              'Тестирование скорости, масштабируемости и нагрузки',
              'Тестирование только масштабируемости',
              'Тестирование только нагрузки',
            ],
            en: [
              'Testing only query speed',
              'Testing speed, scalability and load',
              'Testing only scalability',
              'Testing only load',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование производительности баз данных включает тестирование скорости, масштабируемости и нагрузки.',
            en: 'Database performance testing includes testing speed, scalability and load.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'Что такое тестирование безопасности баз данных?',
            en: 'What is database security testing?',
          },
          options: {
            ru: [
              'Тестирование только производительности',
              'Тестирование уязвимостей, авторизации и шифрования',
              'Тестирование только авторизации',
              'Тестирование только шифрования',
            ],
            en: [
              'Testing only performance',
              'Testing vulnerabilities, authorization and encryption',
              'Testing only authorization',
              'Testing only encryption',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование безопасности баз данных включает тестирование уязвимостей, авторизации и шифрования.',
            en: 'Database security testing includes testing vulnerabilities, authorization and encryption.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'Что такое тестирование миграции данных?',
            en: 'What is data migration testing?',
          },
          options: {
            ru: [
              'Тестирование только производительности',
              'Тестирование процесса переноса данных между системами',
              'Тестирование только безопасности',
              'Тестирование только SQL запросов',
            ],
            en: [
              'Testing only performance',
              'Testing data transfer process between systems',
              'Testing only security',
              'Testing only SQL queries',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование миграции данных - это тестирование процесса переноса данных между системами.',
            en: 'Data migration testing is testing data transfer process between systems.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'Что такое тестирование резервного копирования и восстановления?',
            en: 'What is backup and recovery testing?',
          },
          options: {
            ru: [
              'Тестирование только производительности',
              'Тестирование процессов создания резервных копий и восстановления данных',
              'Тестирование только безопасности',
              'Тестирование только SQL запросов',
            ],
            en: [
              'Testing only performance',
              'Testing backup creation and data recovery processes',
              'Testing only security',
              'Testing only SQL queries',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование резервного копирования и восстановления - это тестирование процессов создания резервных копий и восстановления данных.',
            en: 'Backup and recovery testing is testing backup creation and data recovery processes.',
          },
        },
      ],
    },
    web: {
      title: {
        ru: 'Тестирование веб-приложений',
        en: 'Web application testing',
      },
      description: {
        ru: 'Специфические особенности тестирования веб-приложений',
        en: 'Specifics of web application testing',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'Что такое тестирование веб-приложений?',
            en: 'What is web application testing?',
          },
          options: {
            ru: [
              'Тестирование только мобильных приложений',
              'Тестирование веб-сайтов и веб-приложений в различных браузерах',
              'Тестирование только десктопных приложений',
              'Тестирование только API',
            ],
            en: [
              'Testing only mobile applications',
              'Testing websites and web applications in various browsers',
              'Testing only desktop applications',
              'Testing only API',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование веб-приложений - это тестирование веб-сайтов и веб-приложений в различных браузерах.',
            en: 'Web application testing is testing websites and web applications in various browsers.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'Что такое кросс-браузерное тестирование?',
            en: 'What is cross-browser testing?',
          },
          options: {
            ru: [
              'Тестирование только в одном браузере',
              'Тестирование в различных браузерах для обеспечения совместимости',
              'Тестирование только в Chrome',
              'Тестирование только в Firefox',
            ],
            en: [
              'Testing only in one browser',
              'Testing in various browsers to ensure compatibility',
              'Testing only in Chrome',
              'Testing only in Firefox',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Кросс-браузерное тестирование - это тестирование в различных браузерах для обеспечения совместимости.',
            en: 'Cross-browser testing is testing in various browsers to ensure compatibility.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'Что такое тестирование адаптивности?',
            en: 'What is responsive testing?',
          },
          options: {
            ru: [
              'Тестирование только на десктопе',
              'Тестирование отображения на различных размерах экранов',
              'Тестирование только на мобильных устройствах',
              'Тестирование только на планшетах',
            ],
            en: [
              'Testing only on desktop',
              'Testing display on various screen sizes',
              'Testing only on mobile devices',
              'Testing only on tablets',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование адаптивности - это тестирование отображения на различных размерах экранов.',
            en: 'Responsive testing is testing display on various screen sizes.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'Что такое тестирование веб-форм?',
            en: 'What is web form testing?',
          },
          options: {
            ru: [
              'Тестирование только валидации',
              'Тестирование ввода данных, валидации и отправки форм',
              'Тестирование только отправки',
              'Тестирование только дизайна',
            ],
            en: [
              'Testing only validation',
              'Testing data input, validation and form submission',
              'Testing only submission',
              'Testing only design',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование веб-форм включает тестирование ввода данных, валидации и отправки форм.',
            en: 'Web form testing includes testing data input, validation and form submission.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'Что такое тестирование веб-безопасности?',
            en: 'What is web security testing?',
          },
          options: {
            ru: [
              'Тестирование только производительности',
              'Тестирование уязвимостей веб-приложений (XSS, SQL Injection, CSRF)',
              'Тестирование только XSS',
              'Тестирование только SQL Injection',
            ],
            en: [
              'Testing only performance',
              'Testing web application vulnerabilities (XSS, SQL Injection, CSRF)',
              'Testing only XSS',
              'Testing only SQL Injection',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование веб-безопасности включает тестирование уязвимостей веб-приложений (XSS, SQL Injection, CSRF).',
            en: 'Web security testing includes testing web application vulnerabilities (XSS, SQL Injection, CSRF).',
          },
        },
        {
          id: 6,
          question: {
            ru: 'Что такое тестирование веб-производительности?',
            en: 'What is web performance testing?',
          },
          options: {
            ru: [
              'Тестирование только скорости загрузки',
              'Тестирование скорости загрузки, времени отклика и пропускной способности',
              'Тестирование только времени отклика',
              'Тестирование только пропускной способности',
            ],
            en: [
              'Testing only loading speed',
              'Testing loading speed, response time and throughput',
              'Testing only response time',
              'Testing only throughput',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование веб-производительности включает тестирование скорости загрузки, времени отклика и пропускной способности.',
            en: 'Web performance testing includes testing loading speed, response time and throughput.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'Что такое тестирование веб-доступности?',
            en: 'What is web accessibility testing?',
          },
          options: {
            ru: [
              'Тестирование только дизайна',
              'Тестирование доступности для пользователей с ограниченными возможностями',
              'Тестирование только производительности',
              'Тестирование только безопасности',
            ],
            en: [
              'Testing only design',
              'Testing accessibility for users with disabilities',
              'Testing only performance',
              'Testing only security',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование веб-доступности - это тестирование доступности для пользователей с ограниченными возможностями.',
            en: 'Web accessibility testing is testing accessibility for users with disabilities.',
          },
        },
      ],
    },
  },
  en: {
    basics: {
      title: {
        ru: 'Основы тестирования',
        en: 'Testing Basics',
      },
      description: {
        ru: 'Базовые концепции и термины тестирования ПО',
        en: 'Basic concepts and terms of software testing',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'Что такое тестирование программного обеспечения?',
            en: 'What is software testing?',
          },
          options: {
            ru: [
              'Процесс поиска ошибок в коде',
              'Процесс проверки соответствия программы требованиям',
              'Процесс написания документации',
              'Процесс оптимизации производительности',
            ],
            en: [
              'The process of finding bugs in code',
              'The process of verifying software meets requirements',
              'The process of writing documentation',
              'The process of optimizing performance',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование - это процесс проверки соответствия программы требованиям и выявления дефектов.',
            en: 'Testing is the process of verifying software meets requirements and finding defects.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'What are the main types of testing?',
            en: 'What are the main types of testing?',
          },
          options: {
            ru: [
              'Функциональное тестирование',
              'Функциональное, нефункциональное и тестирование изменений',
              'Автоматизированное тестирование',
              'Ручное тестирование',
            ],
            en: [
              'Functional testing',
              'Functional, non-functional and change testing',
              'Automated testing',
              'Manual testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Основные типы: функциональное (проверка функций), нефункциональное (производительность, безопасность) и тестирование изменений (регрессионное).',
            en: 'Main types: functional (function verification), non-functional (performance, security) and change testing (regression).',
          },
        },
        {
          id: 3,
          question: {
            ru: 'What is a bug (defect)?',
            en: 'What is a bug (defect)?',
          },
          options: {
            ru: [
              'Any error in the program',
              'Deviation from expected behavior',
              'Design problem',
              'All of the above',
            ],
            en: [
              'Any error in the program',
              'Deviation from expected behavior',
              'Design problem',
              'All of the above',
            ],
          },
          correctAnswer: 3,
          explanation: {
            ru: 'Баг - это отклонение от ожидаемого поведения программы, которое может включать ошибки в коде, дизайне или требованиях.',
            en: 'A bug is a deviation from the expected behavior of a program that may include errors in code, design, or requirements.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'What is black box testing?',
            en: 'What is black box testing?',
          },
          options: {
            ru: [
              'Testing without access to code',
              'Testing with full access to code',
              'Testing only the interface',
              'Performance testing',
            ],
            en: [
              'Testing without access to code',
              'Testing with full access to code',
              'Testing only the interface',
              'Performance testing',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Тестирование черного ящика - это метод тестирования, при котором тестировщик не имеет доступа к внутренней структуре кода.',
            en: 'Black box testing is a testing method where the tester has no access to the internal code structure.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'What is white box testing?',
            en: 'What is white box testing?',
          },
          options: {
            ru: [
              'Testing without access to code',
              'Testing with access to internal code structure',
              'Testing only the interface',
              'Security testing',
            ],
            en: [
              'Testing without access to code',
              'Testing with access to internal code structure',
              'Testing only the interface',
              'Security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование белого ящика - это метод тестирования, при котором тестировщик имеет доступ к внутренней структуре кода.',
            en: 'White box testing is a testing method where the tester has access to the internal code structure.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'What is a test case?',
            en: 'What is a test case?',
          },
          options: {
            ru: [
              'Document describing steps and expected results',
              'Error in the program',
              'Automation tool',
              'Testing methodology',
            ],
            en: [
              'Document describing steps and expected results',
              'Error in the program',
              'Automation tool',
              'Testing methodology',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Тест-кейс — это документ, описывающий шаги, входные данные и ожидаемый результат для проверки определённой функции.',
            en: 'A test case is a document describing steps, input data and expected results for testing a specific function.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'What is a test plan?',
            en: 'What is a test plan?',
          },
          options: {
            ru: [
              'Product development plan',
              'Document describing scope, approaches and resources for testing',
              'List of bugs',
              'Automation methodology',
            ],
            en: [
              'Product development plan',
              'Document describing scope, approaches and resources for testing',
              'List of bugs',
              'Automation methodology',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тест-план — это документ, определяющий объём, стратегию, ресурсы и расписание тестирования.',
            en: 'A test plan is a document defining the scope, strategy, resources and testing schedule.',
          },
        },
      ],
    },
    functional: {
      title: {
        ru: 'Функциональное тестирование',
        en: 'Functional testing',
      },
      description: {
        ru: 'Тестирование функциональности приложения',
        en: 'Testing application functionality',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'What does functional testing check?',
            en: 'What does functional testing check?',
          },
          options: {
            ru: [
              'System performance',
              'Interface appearance',
              'Function compliance with requirements',
              'Application security',
            ],
            en: [
              'System performance',
              'Interface appearance',
              'Function compliance with requirements',
              'Application security',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Функциональное тестирование проверяет, что все функции приложения работают согласно требованиям.',
            en: 'Functional testing verifies that all application functions work according to requirements.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'What functional testing techniques do you know?',
            en: 'What functional testing techniques do you know?',
          },
          options: {
            ru: [
              'Эквивалентное разбиение',
              'Эквивалентное разбиение, граничные значения, анализ причинно-следственных связей',
              'Тестирование производительности',
              'Тестирование безопасности',
            ],
            en: [
              'Equivalence partitioning',
              'Equivalence partitioning, boundary values, cause-effect analysis',
              'Performance testing',
              'Security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Основные техники: эквивалентное разбиение, граничные значения, анализ причинно-следственных связей.',
            en: 'Main techniques: equivalence partitioning, boundary values, cause-effect analysis.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'What is equivalence partitioning?',
            en: 'What is equivalence partitioning?',
          },
          options: {
            ru: [
              'Dividing data into groups with the same behavior',
              'Testing boundary values',
              'Cause-effect analysis',
              'Performance testing',
            ],
            en: [
              'Dividing data into groups with the same behavior',
              'Testing boundary values',
              'Cause-effect analysis',
              'Performance testing',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Эквивалентное разбиение - это техника, при которой входные данные разделяются на группы, которые должны обрабатываться одинаково.',
            en: 'Equivalence partitioning is a technique where input data is divided into groups that should be processed the same way.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'What is boundary value testing?',
            en: 'What is boundary value testing?',
          },
          options: {
            ru: [
              'Testing only minimum values',
              'Testing values at the boundaries of acceptable ranges',
              'Testing maximum values',
              'Testing random values',
            ],
            en: [
              'Testing only minimum values',
              'Testing values at the boundaries of acceptable ranges',
              'Testing maximum values',
              'Testing random values',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование граничных значений - это техника тестирования значений на границах допустимых диапазонов.',
            en: 'Boundary value testing is a technique for testing values at the boundaries of acceptable ranges.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'What is user interface testing?',
            en: 'What is user interface testing?',
          },
          options: {
            ru: [
              'Testing only code',
              'Testing user interaction with the interface',
              'Database testing',
              'API testing',
            ],
            en: [
              'Testing only code',
              'Testing user interaction with the interface',
              'Database testing',
              'API testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'UI тестирование проверяет взаимодействие пользователя с интерфейсом приложения.',
            en: 'UI testing verifies user interaction with the application interface.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'What is regression testing?',
            en: 'What is regression testing?',
          },
          options: {
            ru: [
              'Testing new features',
              'Re-testing previously working functions after changes',
              'Performance testing',
              'Security testing',
            ],
            en: [
              'Testing new features',
              'Re-testing previously working functions after changes',
              'Performance testing',
              'Security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Регрессионное тестирование - это повторное тестирование ранее работающих функций после внесения изменений.',
            en: 'Regression testing is re-testing previously working functions after making changes.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'What is smoke testing?',
            en: 'What is smoke testing?',
          },
          options: {
            ru: [
              'Smoke testing',
              'Quick check of basic functions before full testing',
              'Performance testing',
              'Security testing',
            ],
            en: [
              'Smoke testing',
              'Quick check of basic functions before full testing',
              'Performance testing',
              'Security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Smoke тестирование - это быстрая проверка основных функций приложения перед проведением полного тестирования.',
            en: 'Smoke testing is a quick check of basic application functions before conducting full testing.',
          },
        },
      ],
    },
    nonFunctional: {
      title: {
        ru: 'Нефункциональное тестирование',
        en: 'Non-functional testing',
      },
      description: {
        ru: 'Тестирование производительности, безопасности и других характеристик',
        en: 'Testing performance, security, and other characteristics',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'What is load testing?',
            en: 'What is load testing?',
          },
          options: {
            ru: [
              'Testing under expected load',
              'Testing maximum load',
              'Testing minimum load',
              'Security testing',
            ],
            en: [
              'Testing under expected load',
              'Testing maximum load',
              'Testing minimum load',
              'Security testing',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Нагрузочное тестирование - это тестирование системы под ожидаемой нагрузкой для проверки её производительности.',
            en: 'Load testing is testing the system under expected load to verify its performance.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'What is stress testing?',
            en: 'What is stress testing?',
          },
          options: {
            ru: [
              'Testing under normal load',
              'Testing beyond normal working load',
              'Testing minimum load',
              'Security testing',
            ],
            en: [
              'Testing under normal load',
              'Testing beyond normal working load',
              'Testing minimum load',
              'Security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Стресс-тестирование - это тестирование системы за пределами её нормальной рабочей нагрузки для определения точки отказа.',
            en: 'Stress testing is testing the system beyond its normal working load to determine the breaking point.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'What is security testing?',
            en: 'What is security testing?',
          },
          options: {
            ru: [
              'Performance testing',
              'Functional testing',
              'Identifying vulnerabilities and weaknesses in the security system',
              'Interface testing',
            ],
            en: [
              'Performance testing',
              'Functional testing',
              'Identifying vulnerabilities and weaknesses in the security system',
              'Interface testing',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Тестирование безопасности направлено на выявление уязвимостей и слабых мест в системе безопасности.',
            en: 'Security testing is aimed at identifying vulnerabilities and weaknesses in the security system.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'What is usability testing?',
            en: 'What is usability testing?',
          },
          options: {
            ru: [
              'Performance testing',
              'Functional testing',
              'Testing the ease and simplicity of interface use',
              'Security testing',
            ],
            en: [
              'Performance testing',
              'Functional testing',
              'Testing the ease and simplicity of interface use',
              'Security testing',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Usability тестирование проверяет удобство и простоту использования интерфейса пользователями.',
            en: 'Usability testing checks the ease and simplicity of interface use by users.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'What is compatibility testing?',
            en: 'What is compatibility testing?',
          },
          options: {
            ru: [
              'Performance testing',
              'Functional testing',
              'Testing operation in different environments and browsers',
              'Security testing',
            ],
            en: [
              'Performance testing',
              'Functional testing',
              'Testing operation in different environments and browsers',
              'Security testing',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Тестирование совместимости проверяет работу приложения в разных средах, браузерах и устройствах.',
            en: 'Compatibility testing verifies application operation in different environments, browsers and devices.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'What is scalability testing?',
            en: 'What is scalability testing?',
          },
          options: {
            ru: [
              'Performance testing',
              'Functional testing',
              'Testing the system ability to grow with increasing load',
              'Security testing',
            ],
            en: [
              'Performance testing',
              'Functional testing',
              'Testing the system ability to grow with increasing load',
              'Security testing',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Тестирование масштабируемости проверяет способность системы расти и обрабатывать увеличивающуюся нагрузку.',
            en: 'Scalability testing checks the system ability to grow and handle increasing load.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'What is reliability testing?',
            en: 'What is reliability testing?',
          },
          options: {
            ru: [
              'Performance testing',
              'Functional testing',
              'Testing the system ability to work without failures',
              'Security testing',
            ],
            en: [
              'Performance testing',
              'Functional testing',
              'Testing the system ability to work without failures',
              'Security testing',
            ],
          },
          correctAnswer: 2,
          explanation: {
            ru: 'Тестирование надежности проверяет способность системы работать стабильно и без сбоев в течение длительного времени.',
            en: 'Reliability testing checks the system ability to work stably and without failures for a long time.',
          },
        },
      ],
    },
    automation: {
      title: {
        ru: 'Автоматизация тестирования',
        en: 'Test automation',
      },
      description: {
        ru: 'Инструменты и методы автоматизации тестирования',
        en: 'Tools and methods for test automation',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'What is automated testing?',
            en: 'What is automated testing?',
          },
          options: {
            ru: [
              'Testing without using tools',
              'Using special tools to automatically execute tests',
              'Only manual testing',
              'Performance testing',
            ],
            en: [
              'Testing without using tools',
              'Using special tools to automatically execute tests',
              'Only manual testing',
              'Performance testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Автоматизированное тестирование - это использование специальных инструментов для автоматического выполнения тестов без вмешательства человека.',
            en: 'Automated testing is the use of special tools to automatically execute tests without human intervention.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'What tool is used for web testing automation?',
            en: 'What tool is used for web testing automation?',
          },
          options: {
            ru: ['Selenium', 'Selenium, Cypress, Playwright', 'JUnit', 'Postman'],
            en: ['Selenium', 'Selenium, Cypress, Playwright', 'JUnit', 'Postman'],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Для веб-тестирования используются Selenium, Cypress, Playwright и другие инструменты.',
            en: 'Selenium, Cypress, Playwright and other tools are used for web testing.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'What is Page Object Model?',
            en: 'What is Page Object Model?',
          },
          options: {
            ru: [
              'Модель страницы',
              'Паттерн проектирования для автоматизации тестирования',
              'Инструмент автоматизации',
              'Методология тестирования',
            ],
            en: [
              'Page model',
              'Design pattern for test automation',
              'Automation tool',
              'Testing methodology',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Page Object Model - это паттерн проектирования, который инкапсулирует элементы страницы в отдельные классы.',
            en: 'Page Object Model is a design pattern that encapsulates page elements in separate classes.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'What is Data-Driven Testing?',
            en: 'What is Data-Driven Testing?',
          },
          options: {
            ru: [
              'Тестирование данных',
              'Подход к тестированию с использованием различных наборов данных',
              'Тестирование базы данных',
              'Тестирование API',
            ],
            en: [
              'Data testing',
              'Testing approach using various data sets',
              'Database testing',
              'API testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Data-Driven Testing - это подход к тестированию, при котором один тест выполняется с различными наборами данных.',
            en: 'Data-Driven Testing is a testing approach where one test is executed with various data sets.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'What is Keyword-Driven Testing?',
            en: 'What is Keyword-Driven Testing?',
          },
          options: {
            ru: [
              'Тестирование ключевых слов',
              'Подход к тестированию с использованием ключевых слов для описания действий',
              'Тестирование поиска',
              'Тестирование интерфейса',
            ],
            en: [
              'Keyword testing',
              'Testing approach using keywords to describe actions',
              'Search testing',
              'Interface testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Keyword-Driven Testing - это подход к тестированию, при котором действия описываются с помощью ключевых слов.',
            en: 'Keyword-Driven Testing is a testing approach where actions are described using keywords.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'What is TestNG?',
            en: 'What is TestNG?',
          },
          options: {
            ru: [
              'Инструмент для веб-тестирования',
              'Фреймворк для автоматизации тестирования на Java',
              'Инструмент для API тестирования',
              'Инструмент для мобильного тестирования',
            ],
            en: [
              'Web testing tool',
              'Java test automation framework',
              'API testing tool',
              'Mobile testing tool',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'TestNG - это фреймворк для автоматизации тестирования на Java с расширенными возможностями.',
            en: 'TestNG is a Java test automation framework with advanced capabilities.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'What is Cucumber?',
            en: 'What is Cucumber?',
          },
          options: {
            ru: [
              'Инструмент для веб-тестирования',
              'Фреймворк для BDD (Behavior-Driven Development)',
              'Инструмент для API тестирования',
              'Инструмент для мобильного тестирования',
            ],
            en: [
              'Web testing tool',
              'BDD (Behavior-Driven Development) framework',
              'API testing tool',
              'Mobile testing tool',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Cucumber - это фреймворк для BDD, который позволяет писать тесты на естественном языке.',
            en: 'Cucumber is a BDD framework that allows writing tests in natural language.',
          },
        },
      ],
    },
    tools: {
      title: {
        ru: 'Инструменты тестирования',
        en: 'Testing tools',
      },
      description: {
        ru: 'Популярные инструменты для автоматизации тестирования',
        en: 'Popular tools for test automation',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'What is API testing?',
            en: 'What is API testing?',
          },
          options: {
            ru: [
              'Тестирование веб-интерфейса',
              'Тестирование программных интерфейсов',
              'Тестирование базы данных',
              'Тестирование мобильных приложений',
            ],
            en: [
              'Web interface testing',
              'Software interface testing',
              'Database testing',
              'Mobile app testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'API тестирование - это тестирование программных интерфейсов для проверки взаимодействия между компонентами.',
            en: 'API testing is testing software interfaces to verify interaction between components.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'What tool is used for API testing?',
            en: 'What tool is used for API testing?',
          },
          options: {
            ru: ['Selenium', 'Postman, SoapUI, RestAssured', 'JUnit', 'Cypress'],
            en: ['Selenium', 'Postman, SoapUI, RestAssured', 'JUnit', 'Cypress'],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Для API тестирования используются Postman, SoapUI, RestAssured и другие инструменты.',
            en: 'Postman, SoapUI, RestAssured and other tools are used for API testing.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'What is Selenium?',
            en: 'What is Selenium?',
          },
          options: {
            ru: [
              'Инструмент для тестирования API',
              'Популярный фреймворк для автоматизации тестирования веб-приложений',
              'Инструмент для тестирования мобильных приложений',
              'Инструмент для тестирования производительности',
            ],
            en: [
              'API testing tool',
              'Popular framework for web application test automation',
              'Mobile app testing tool',
              'Performance testing tool',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Selenium - это популярный фреймворк для автоматизации тестирования веб-приложений с поддержкой различных браузеров.',
            en: 'Selenium is a popular framework for web application test automation with support for various browsers.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'What is Cypress?',
            en: 'What is Cypress?',
          },
          options: {
            ru: [
              'Инструмент для тестирования API',
              'Современный инструмент для автоматизации тестирования веб-приложений',
              'Инструмент для тестирования мобильных приложений',
              'Инструмент для тестирования производительности',
            ],
            en: [
              'API testing tool',
              'Modern tool for web application test automation',
              'Mobile app testing tool',
              'Performance testing tool',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Cypress - это современный инструмент для автоматизации тестирования веб-приложений с встроенной отладкой.',
            en: 'Cypress is a modern tool for web application test automation with built-in debugging.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'What is JMeter?',
            en: 'What is JMeter?',
          },
          options: {
            ru: [
              'Инструмент для веб-тестирования',
              'Инструмент Apache для нагрузочного тестирования',
              'Инструмент для API тестирования',
              'Инструмент для мобильного тестирования',
            ],
            en: [
              'Web testing tool',
              'Apache tool for load testing',
              'API testing tool',
              'Mobile testing tool',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'JMeter - это инструмент Apache для нагрузочного тестирования и измерения производительности.',
            en: 'JMeter is an Apache tool for load testing and performance measurement.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'What is Bug Tracking System?',
            en: 'What is Bug Tracking System?',
          },
          options: {
            ru: [
              'Система для отслеживания и управления багами',
              'Инструмент для автоматизации тестирования',
              'Среда разработки',
              'Система контроля версий',
            ],
            en: [
              'System for tracking and managing bugs',
              'Test automation tool',
              'Development environment',
              'Version control system',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Bug Tracking System — это система для отслеживания, управления и анализа дефектов.',
            en: 'Bug Tracking System is a system for tracking, managing and analyzing defects.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'What is Jenkins used for?',
            en: 'What is Jenkins used for?',
          },
          options: {
            ru: [
              'Для управления багами',
              'Для автоматизации CI/CD процессов',
              'Для тестирования безопасности',
              'Для мониторинга производительности',
            ],
            en: [
              'Bug management',
              'CI/CD process automation',
              'Security testing',
              'Performance monitoring',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Jenkins — это инструмент для автоматизации процессов CI/CD.',
            en: 'Jenkins is a tool for automating CI/CD processes.',
          },
        },
      ],
    },
    methodology: {
      title: {
        ru: 'Методологии тестирования',
        en: 'Testing methodologies',
      },
      description: {
        ru: 'Современные подходы и методологии в тестировании',
        en: 'Modern approaches and methodologies in testing',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'What is BDD (Behavior-Driven Development)?',
            en: 'What is BDD (Behavior-Driven Development)?',
          },
          options: {
            ru: [
              'Разработка без описания поведения',
              'Методология разработки, основанная на описании поведения системы на естественном языке',
              'Только автоматизированное тестирование',
              'Только ручное тестирование',
            ],
            en: [
              'Development without behavior description',
              'Development methodology based on describing system behavior in natural language',
              'Only automated testing',
              'Only manual testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'BDD - это методология разработки, основанная на описании поведения системы на естественном языке.',
            en: 'BDD is a development methodology based on describing system behavior in natural language.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'What is Shift-Left Testing?',
            en: 'What is Shift-Left Testing?',
          },
          options: {
            ru: [
              'Тестирование только в конце разработки',
              'Подход к тестированию, при котором тестирование начинается на ранних этапах разработки',
              'Тестирование только левой части интерфейса',
              'Тестирование производительности',
            ],
            en: [
              'Testing only at the end of development',
              'Testing approach where testing starts at early stages of development',
              'Testing only the left side of the interface',
              'Performance testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Shift-Left Testing - это подход к тестированию, при котором тестирование начинается на ранних этапах разработки.',
            en: 'Shift-Left Testing is a testing approach where testing starts at early stages of development.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'What is the testing pyramid?',
            en: 'What is the testing pyramid?',
          },
          options: {
            ru: [
              'Модель тестирования без структуры',
              'Модель, показывающая оптимальное соотношение между различными типами тестов',
              'Только автоматизированное тестирование',
              'Только ручное тестирование',
            ],
            en: [
              'Testing model without structure',
              'Model showing optimal ratio between different types of tests',
              'Only automated testing',
              'Only manual testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Пирамида тестирования - это модель, показывающая оптимальное соотношение между различными типами тестов (unit, integration, e2e).',
            en: 'The testing pyramid is a model showing the optimal ratio between different types of tests (unit, integration, e2e).',
          },
        },
        {
          id: 4,
          question: {
            ru: 'What is Continuous Testing?',
            en: 'What is Continuous Testing?',
          },
          options: {
            ru: [
              'Тестирование только в конце проекта',
              'Подход к тестированию, при котором тесты выполняются автоматически на каждом этапе разработки',
              'Тестирование только производительности',
              'Тестирование только безопасности',
            ],
            en: [
              'Testing only at the end of the project',
              'Testing approach where tests are executed automatically at each development stage',
              'Only performance testing',
              'Only security testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Continuous Testing - это подход к тестированию, при котором тесты выполняются автоматически на каждом этапе разработки.',
            en: 'Continuous Testing is a testing approach where tests are executed automatically at each development stage.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'What is Exploratory Testing?',
            en: 'What is Exploratory Testing?',
          },
          options: {
            ru: [
              'Структурированное тестирование по плану',
              'Неформальный подход к тестированию, основанный на исследовании и обучении тестировщика',
              'Только автоматизированное тестирование',
              'Только ручное тестирование',
            ],
            en: [
              'Structured testing according to plan',
              'Informal testing approach based on tester exploration and learning',
              'Only automated testing',
              'Only manual testing',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Exploratory Testing - это неформальный подход к тестированию, основанный на исследовании и обучении тестировщика.',
            en: 'Exploratory Testing is an informal testing approach based on tester exploration and learning.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'What is Kanban?',
            en: 'What is Kanban?',
          },
          options: {
            ru: [
              'Методология управления проектами',
              'Инструмент автоматизации',
              'Тип тестирования',
              'Система контроля версий',
            ],
            en: [
              'Project management methodology',
              'Automation tool',
              'Type of testing',
              'Version control system',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Kanban — это методология управления проектами, основанная на визуализации задач.',
            en: 'Kanban is a project management methodology based on task visualization.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'What is Scrum?',
            en: 'What is Scrum?',
          },
          options: {
            ru: [
              'Методология гибкой разработки',
              'Инструмент тестирования',
              'Тип тестирования',
              'Система баг-трекинга',
            ],
            en: [
              'Agile development methodology',
              'Testing tool',
              'Type of testing',
              'Bug tracking system',
            ],
          },
          correctAnswer: 0,
          explanation: {
            ru: 'Scrum — это методология гибкой разработки, основанная на спринтах и ролях.',
            en: 'Scrum is an agile development methodology based on sprints and roles.',
          },
        },
      ],
    },
    mobile: {
      title: {
        ru: 'Мобильное тестирование',
        en: 'Mobile testing',
      },
      description: {
        ru: 'Тестирование мобильных приложений и специфические особенности',
        en: 'Testing mobile applications and specific features',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'What is mobile testing?',
            en: 'What is mobile testing?',
          },
          options: {
            ru: [
              'Тестирование только веб-сайтов',
              'Тестирование мобильных приложений на различных устройствах и платформах',
              'Тестирование только Android приложений',
              'Тестирование только iOS приложений',
            ],
            en: [
              'Testing only websites',
              'Testing mobile applications on various devices and platforms',
              'Testing only Android applications',
              'Testing only iOS applications',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Мобильное тестирование - это тестирование мобильных приложений на различных устройствах и платформах.',
            en: 'Mobile testing is testing mobile applications on various devices and platforms.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'What types of mobile testing do you know?',
            en: 'What types of mobile testing do you know?',
          },
          options: {
            ru: [
              'Только функциональное тестирование',
              'Функциональное, производительность, совместимость, удобство использования',
              'Только производительность',
              'Только совместимость',
            ],
            en: [
              'Only functional testing',
              'Functional, performance, compatibility, usability',
              'Only performance',
              'Only compatibility',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Основные типы: функциональное, производительность, совместимость, удобство использования.',
            en: 'Main types: functional, performance, compatibility, usability.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'What is real device testing?',
            en: 'What is real device testing?',
          },
          options: {
            ru: [
              'Тестирование только в эмуляторе',
              'Тестирование на физических мобильных устройствах',
              'Тестирование только в браузере',
              'Тестирование только на планшете',
            ],
            en: [
              'Testing only in emulator',
              'Testing on physical mobile devices',
              'Testing only in browser',
              'Testing only on tablet',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование на реальных устройствах - это тестирование на физических мобильных устройствах.',
            en: 'Real device testing is testing on physical mobile devices.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'What is emulator testing?',
            en: 'What is emulator testing?',
          },
          options: {
            ru: [
              'Тестирование на реальном устройстве',
              'Тестирование в программной среде, имитирующей мобильное устройство',
              'Тестирование только в браузере',
              'Тестирование только на компьютере',
            ],
            en: [
              'Testing on real device',
              'Testing in software environment simulating mobile device',
              'Testing only in browser',
              'Testing only on computer',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование в эмуляторе - это тестирование в программной среде, имитирующей мобильное устройство.',
            en: 'Emulator testing is testing in software environment simulating mobile device.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'What is mobile application performance testing?',
            en: 'What is mobile application performance testing?',
          },
          options: {
            ru: [
              'Тестирование только скорости загрузки',
              'Тестирование скорости, памяти, батареи и сети',
              'Тестирование только памяти',
              'Тестирование только батареи',
            ],
            en: [
              'Testing only loading speed',
              'Testing speed, memory, battery and network',
              'Testing only memory',
              'Testing only battery',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование производительности мобильных приложений включает тестирование скорости, памяти, батареи и сети.',
            en: 'Mobile application performance testing includes testing speed, memory, battery and network.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'What is mobile application compatibility testing?',
            en: 'What is mobile application compatibility testing?',
          },
          options: {
            ru: [
              'Тестирование только на одной платформе',
              'Тестирование на различных устройствах, ОС и версиях',
              'Тестирование только на Android',
              'Тестирование только на iOS',
            ],
            en: [
              'Testing only on one platform',
              'Testing on various devices, OS and versions',
              'Testing only on Android',
              'Testing only on iOS',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование совместимости мобильных приложений - это тестирование на различных устройствах, ОС и версиях.',
            en: 'Mobile application compatibility testing is testing on various devices, OS and versions.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'What is mobile application usability testing?',
            en: 'What is mobile application usability testing?',
          },
          options: {
            ru: [
              'Тестирование только функциональности',
              'Тестирование удобства интерфейса, навигации и взаимодействия',
              'Тестирование только производительности',
              'Тестирование только безопасности',
            ],
            en: [
              'Testing only functionality',
              'Testing interface convenience, navigation and interaction',
              'Testing only performance',
              'Testing only security',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование удобства использования мобильных приложений включает тестирование удобства интерфейса, навигации и взаимодействия.',
            en: 'Mobile application usability testing includes testing interface convenience, navigation and interaction.',
          },
        },
      ],
    },
    database: {
      title: {
        ru: 'Тестирование баз данных',
        en: 'Database testing',
      },
      description: {
        ru: 'Тестирование баз данных и SQL запросов',
        en: 'Testing databases and SQL queries',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'What is database testing?',
            en: 'What is database testing?',
          },
          options: {
            ru: [
              'Тестирование только SQL запросов',
              'Тестирование целостности, производительности и безопасности баз данных',
              'Тестирование только производительности',
              'Тестирование только безопасности',
            ],
            en: [
              'Testing only SQL queries',
              'Testing database integrity, performance and security',
              'Testing only performance',
              'Testing only security',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование баз данных включает тестирование целостности, производительности и безопасности.',
            en: 'Database testing includes testing integrity, performance and security.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'What is data integrity testing?',
            en: 'What is data integrity testing?',
          },
          options: {
            ru: [
              'Тестирование только производительности',
              'Проверка точности, согласованности и надежности данных',
              'Тестирование только безопасности',
              'Тестирование только SQL запросов',
            ],
            en: [
              'Testing only performance',
              'Checking data accuracy, consistency and reliability',
              'Testing only security',
              'Testing only SQL queries',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование целостности данных - это проверка точности, согласованности и надежности данных.',
            en: 'Data integrity testing is checking data accuracy, consistency and reliability.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'What is SQL query testing?',
            en: 'What is SQL query testing?',
          },
          options: {
            ru: [
              'Тестирование только SELECT запросов',
              'Тестирование различных типов SQL запросов на корректность и производительность',
              'Тестирование только INSERT запросов',
              'Тестирование только UPDATE запросов',
            ],
            en: [
              'Testing only SELECT queries',
              'Testing various types of SQL queries for correctness and performance',
              'Testing only INSERT queries',
              'Testing only UPDATE queries',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование SQL запросов - это тестирование различных типов SQL запросов на корректность и производительность.',
            en: 'SQL query testing is testing various types of SQL queries for correctness and performance.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'What is database performance testing?',
            en: 'What is database performance testing?',
          },
          options: {
            ru: [
              'Тестирование только скорости запросов',
              'Тестирование скорости, масштабируемости и нагрузки',
              'Тестирование только масштабируемости',
              'Тестирование только нагрузки',
            ],
            en: [
              'Testing only query speed',
              'Testing speed, scalability and load',
              'Testing only scalability',
              'Testing only load',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование производительности баз данных включает тестирование скорости, масштабируемости и нагрузки.',
            en: 'Database performance testing includes testing speed, scalability and load.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'What is database security testing?',
            en: 'What is database security testing?',
          },
          options: {
            ru: [
              'Тестирование только производительности',
              'Тестирование уязвимостей, авторизации и шифрования',
              'Тестирование только авторизации',
              'Тестирование только шифрования',
            ],
            en: [
              'Testing only performance',
              'Testing vulnerabilities, authorization and encryption',
              'Testing only authorization',
              'Testing only encryption',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование безопасности баз данных включает тестирование уязвимостей, авторизации и шифрования.',
            en: 'Database security testing includes testing vulnerabilities, authorization and encryption.',
          },
        },
        {
          id: 6,
          question: {
            ru: 'What is data migration testing?',
            en: 'What is data migration testing?',
          },
          options: {
            ru: [
              'Тестирование только производительности',
              'Тестирование процесса переноса данных между системами',
              'Тестирование только безопасности',
              'Тестирование только SQL запросов',
            ],
            en: [
              'Testing only performance',
              'Testing data transfer process between systems',
              'Testing only security',
              'Testing only SQL queries',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование миграции данных - это тестирование процесса переноса данных между системами.',
            en: 'Data migration testing is testing data transfer process between systems.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'What is backup and recovery testing?',
            en: 'What is backup and recovery testing?',
          },
          options: {
            ru: [
              'Тестирование только производительности',
              'Тестирование процессов создания резервных копий и восстановления данных',
              'Тестирование только безопасности',
              'Тестирование только SQL запросов',
            ],
            en: [
              'Testing only performance',
              'Testing backup creation and data recovery processes',
              'Testing only security',
              'Testing only SQL queries',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование резервного копирования и восстановления - это тестирование процессов создания резервных копий и восстановления данных.',
            en: 'Backup and recovery testing is testing backup creation and data recovery processes.',
          },
        },
      ],
    },
    web: {
      title: {
        ru: 'Тестирование веб-приложений',
        en: 'Web application testing',
      },
      description: {
        ru: 'Специфические особенности тестирования веб-приложений',
        en: 'Specifics of web application testing',
      },
      questions: [
        {
          id: 1,
          question: {
            ru: 'What is web application testing?',
            en: 'What is web application testing?',
          },
          options: {
            ru: [
              'Тестирование только мобильных приложений',
              'Тестирование веб-сайтов и веб-приложений в различных браузерах',
              'Тестирование только десктопных приложений',
              'Тестирование только API',
            ],
            en: [
              'Testing only mobile applications',
              'Testing websites and web applications in various browsers',
              'Testing only desktop applications',
              'Testing only API',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование веб-приложений - это тестирование веб-сайтов и веб-приложений в различных браузерах.',
            en: 'Web application testing is testing websites and web applications in various browsers.',
          },
        },
        {
          id: 2,
          question: {
            ru: 'What is cross-browser testing?',
            en: 'What is cross-browser testing?',
          },
          options: {
            ru: [
              'Тестирование только в одном браузере',
              'Тестирование в различных браузерах для обеспечения совместимости',
              'Тестирование только в Chrome',
              'Тестирование только в Firefox',
            ],
            en: [
              'Testing only in one browser',
              'Testing in various browsers to ensure compatibility',
              'Testing only in Chrome',
              'Testing only in Firefox',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Кросс-браузерное тестирование - это тестирование в различных браузерах для обеспечения совместимости.',
            en: 'Cross-browser testing is testing in various browsers to ensure compatibility.',
          },
        },
        {
          id: 3,
          question: {
            ru: 'What is responsive testing?',
            en: 'What is responsive testing?',
          },
          options: {
            ru: [
              'Тестирование только на десктопе',
              'Тестирование отображения на различных размерах экранов',
              'Тестирование только на мобильных устройствах',
              'Тестирование только на планшетах',
            ],
            en: [
              'Testing only on desktop',
              'Testing display on various screen sizes',
              'Testing only on mobile devices',
              'Testing only on tablets',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование адаптивности - это тестирование отображения на различных размерах экранов.',
            en: 'Responsive testing is testing display on various screen sizes.',
          },
        },
        {
          id: 4,
          question: {
            ru: 'What is web form testing?',
            en: 'What is web form testing?',
          },
          options: {
            ru: [
              'Тестирование только валидации',
              'Тестирование ввода данных, валидации и отправки форм',
              'Тестирование только отправки',
              'Тестирование только дизайна',
            ],
            en: [
              'Testing only validation',
              'Testing data input, validation and form submission',
              'Testing only submission',
              'Testing only design',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование веб-форм включает тестирование ввода данных, валидации и отправки форм.',
            en: 'Web form testing includes testing data input, validation and form submission.',
          },
        },
        {
          id: 5,
          question: {
            ru: 'What is web security testing?',
            en: 'What is web security testing?',
          },
          options: {
            ru: [
              'Тестирование только производительности',
              'Тестирование уязвимостей веб-приложений (XSS, SQL Injection, CSRF)',
              'Тестирование только XSS',
              'Тестирование только SQL Injection',
            ],
            en: [
              'Testing only performance',
              'Testing web application vulnerabilities (XSS, SQL Injection, CSRF)',
              'Testing only XSS',
              'Testing only SQL Injection',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование веб-безопасности включает тестирование уязвимостей веб-приложений (XSS, SQL Injection, CSRF).',
            en: 'Web security testing includes testing web application vulnerabilities (XSS, SQL Injection, CSRF).',
          },
        },
        {
          id: 6,
          question: {
            ru: 'What is web performance testing?',
            en: 'What is web performance testing?',
          },
          options: {
            ru: [
              'Тестирование только скорости загрузки',
              'Тестирование скорости загрузки, времени отклика и пропускной способности',
              'Тестирование только времени отклика',
              'Тестирование только пропускной способности',
            ],
            en: [
              'Testing only loading speed',
              'Testing loading speed, response time and throughput',
              'Testing only response time',
              'Testing only throughput',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование веб-производительности включает тестирование скорости загрузки, времени отклика и пропускной способности.',
            en: 'Web performance testing includes testing loading speed, response time and throughput.',
          },
        },
        {
          id: 7,
          question: {
            ru: 'What is web accessibility testing?',
            en: 'What is web accessibility testing?',
          },
          options: {
            ru: [
              'Тестирование только дизайна',
              'Тестирование доступности для пользователей с ограниченными возможностями',
              'Тестирование только производительности',
              'Тестирование только безопасности',
            ],
            en: [
              'Testing only design',
              'Testing accessibility for users with disabilities',
              'Testing only performance',
              'Testing only security',
            ],
          },
          correctAnswer: 1,
          explanation: {
            ru: 'Тестирование веб-доступности - это тестирование доступности для пользователей с ограниченными возможностями.',
            en: 'Web accessibility testing is testing accessibility for users with disabilities.',
          },
        },
      ],
    },
  },
};

export const getTests = (): Test[] => {
  const data = testsData.ru;
  return [
    {
      id: 'basics',
      title: data.basics.title,
      description: data.basics.description,
      difficulty: 'beginner' as Difficulty,
      questions: data.basics.questions,
    },
    {
      id: 'functional',
      title: data.functional.title,
      description: data.functional.description,
      difficulty: 'beginner' as Difficulty,
      questions: data.functional.questions,
    },
    {
      id: 'non-functional',
      title: data.nonFunctional.title,
      description: data.nonFunctional.description,
      difficulty: 'intermediate' as Difficulty,
      questions: data.nonFunctional.questions,
    },
    {
      id: 'automation',
      title: data.automation.title,
      description: data.automation.description,
      difficulty: 'intermediate' as Difficulty,
      questions: data.automation.questions,
    },
    {
      id: 'tools',
      title: data.tools.title,
      description: data.tools.description,
      difficulty: 'intermediate' as Difficulty,
      questions: data.tools.questions,
    },
    {
      id: 'methodology',
      title: data.methodology.title,
      description: data.methodology.description,
      difficulty: 'advanced' as Difficulty,
      questions: data.methodology.questions,
    },
    {
      id: 'mobile',
      title: data.mobile.title,
      description: data.mobile.description,
      difficulty: 'intermediate' as Difficulty,
      questions: data.mobile.questions,
    },
    {
      id: 'database',
      title: data.database.title,
      description: data.database.description,
      difficulty: 'advanced' as Difficulty,
      questions: data.database.questions,
    },
    {
      id: 'web',
      title: data.web.title,
      description: data.web.description,
      difficulty: 'intermediate' as Difficulty,
      questions: data.web.questions,
    },
  ];
};
