'use client';

import { useState, useMemo } from 'react';
import React from 'react';
import GlossarySearch from './Glossary/GlossarySearch';
import GlossaryList from './Glossary/GlossaryList';
import GlossaryPagination from './Glossary/GlossaryPagination';
import GlossaryStats from './Glossary/GlossaryStats';
import ru from '../locales/ru.json';
import en from '../locales/en.json';
import { useLanguage } from './useLanguage';

interface GlossaryItem {
  id: number;
  term: string;
  definition: string;
  category: string;
  example?: { ru: string; en: string };
}

export default function Glossary() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const termsPerPage = 10;

  const translations = { ru: ru.glossary, en: en.glossary };
  const t = translations[language];

  const glossaryData: GlossaryItem[] = [
    // Функциональное тестирование
    {
      id: 1,
      term: language === 'ru' ? 'Функциональное тестирование' : 'Functional Testing',
      definition:
        language === 'ru'
          ? 'Тестирование, которое проверяет, что программное обеспечение работает в соответствии с функциональными требованиями и спецификациями.'
          : 'Testing that verifies the software works according to functional requirements and specifications.',
      category: 'functional',
      example: {
        ru: 'Пользователь оформляет заказ, и система должна отправить подтверждение на email.',
        en: 'A user places an order and the system should send a confirmation email.'
      },
    },
    {
      id: 2,
      term: language === 'ru' ? 'Тестирование черного ящика' : 'Black Box Testing',
      definition:
        language === 'ru'
          ? 'Метод тестирования, при котором тестировщик не имеет доступа к внутренней структуре кода и тестирует только внешнее поведение системы.'
          : 'A testing method where the tester has no access to the internal code structure and tests only the external behavior of the system.',
      category: 'functional',
      example: {
        ru: 'Тестировщик проверяет форму входа, не зная, как реализована проверка пароля внутри.',
        en: 'A tester checks the login form without knowing how password validation is implemented.'
      },
    },
    {
      id: 3,
      term: language === 'ru' ? 'Тестирование белого ящика' : 'White Box Testing',
      definition:
        language === 'ru'
          ? 'Метод тестирования, при котором тестировщик имеет доступ к внутренней структуре кода и тестирует логику программы.'
          : 'A testing method where the tester has access to the internal code structure and tests the program logic.',
      category: 'functional',
      example: {
        ru: 'Тестировщик анализирует и тестирует все ветвления в функции расчёта скидки.',
        en: 'A tester analyzes and tests all branches in a discount calculation function.'
      },
    },
    {
      id: 4,
      term: language === 'ru' ? 'Тестирование серого ящика' : 'Gray Box Testing',
      definition:
        language === 'ru'
          ? 'Комбинация тестирования черного и белого ящика, при котором тестировщик имеет частичный доступ к внутренней структуре.'
          : 'A combination of black box and white box testing where the tester has partial access to the internal structure.',
      category: 'functional',
      example: {
        ru: 'Тестировщик знает структуру базы данных, но не видит исходный код приложения.',
        en: 'A tester knows the database structure but does not see the application source code.'
      },
    },
    {
      id: 5,
      term: language === 'ru' ? 'Эквивалентное разбиение' : 'Equivalence Partitioning',
      definition:
        language === 'ru'
          ? 'Техника тестирования, при которой входные данные разделяются на группы эквивалентности, и тестируется по одному значению из каждой группы.'
          : 'A testing technique where input data is divided into equivalence groups, and one value from each group is tested.',
      category: 'functional',
      example: {
        ru: 'Для поля возраста (1-100) тестируются значения 25, 50 и 75 как представители разных групп.',
        en: 'For an age field (1-100), values 25, 50, and 75 are tested as representatives of different groups.'
      },
    },
    {
      id: 6,
      term: language === 'ru' ? 'Анализ граничных значений' : 'Boundary Value Analysis',
      definition:
        language === 'ru'
          ? 'Техника тестирования, при которой тестируются значения на границах и рядом с границами допустимых диапазонов.'
          : 'A testing technique where values at and near the boundaries of valid ranges are tested.',
      category: 'functional',
      example: {
        ru: 'Проверяют ввод значений 0, 1, 2, 99, 100 и 101, если допустимый диапазон — от 1 до 100. Это позволяет убедиться, что система правильно обрабатывает значения на границах и рядом с ними.',
        en: 'Test input values 0, 1, 2, 99, 100, and 101 if the valid range is from 1 to 100. This ensures the system correctly handles values at and near the boundaries.'
      },
    },

    // Нефункциональное тестирование
    {
      id: 7,
      term: language === 'ru' ? 'Тестирование производительности' : 'Performance Testing',
      definition:
        language === 'ru'
          ? 'Тестирование, которое определяет, как система работает под различной нагрузкой и в различных условиях.'
          : 'Testing that determines how a system performs under various loads and conditions.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверка, сколько пользователей одновременно может оформить заказ без замедления сайта.',
        en: 'Checking how many users can place orders simultaneously without the site slowing down.'
      },
    },
    {
      id: 8,
      term: language === 'ru' ? 'Нагрузочное тестирование' : 'Load Testing',
      definition:
        language === 'ru'
          ? 'Тестирование системы под ожидаемой нагрузкой для проверки её производительности.'
          : 'Testing the system under expected load to verify its performance.',
      category: 'nonFunctional',
      example: {
        ru: 'Одновременно 1000 пользователей заходят на сайт и оформляют заказы.',
        en: '1,000 users visit the site and place orders at the same time.'
      },
    },
    {
      id: 9,
      term: language === 'ru' ? 'Стресс-тестирование' : 'Stress Testing',
      definition:
        language === 'ru'
          ? 'Тестирование системы при экстремальных нагрузках для оценки её устойчивости.'
          : 'Testing the system under extreme loads to assess its stability.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверка, как сайт работает при 10 000 одновременных пользователей.',
        en: 'Testing how the site works with 10,000 simultaneous users.'
      },
    },
    {
      id: 10,
      term: language === 'ru' ? 'Тестирование стабильности' : 'Stability Testing',
      definition:
        language === 'ru'
          ? 'Тестирование, направленное на проверку устойчивости работы системы в течение длительного времени.'
          : 'Testing aimed at checking the stability of the system over a long period.',
      category: 'nonFunctional',
      example: {
        ru: 'Сайт работает без сбоев в течение 72 часов непрерывной работы.',
        en: 'The site runs without failures for 72 hours of continuous operation.'
      },
    },
    {
      id: 11,
      term: language === 'ru' ? 'Тестирование безопасности' : 'Security Testing',
      definition:
        language === 'ru'
          ? 'Тестирование, направленное на выявление уязвимостей и обеспечение защиты системы.'
          : 'Testing aimed at identifying vulnerabilities and ensuring system protection.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверка, может ли неавторизованный пользователь получить доступ к личным данным.',
        en: 'Checking if an unauthorized user can access personal data.'
      },
    },
    {
      id: 12,
      term: language === 'ru' ? 'Тестирование удобства использования' : 'Usability Testing',
      definition:
        language === 'ru'
          ? 'Оценка удобства и понятности интерфейса для пользователя.'
          : 'Assessing the ease of use and clarity of the interface for the user.',
      category: 'nonFunctional',
      example: {
        ru: 'Пользователь быстро находит нужную кнопку для оформления заказа.',
        en: 'A user quickly finds the button to place an order.'
      },
    },

    // Автоматизация
    {
      id: 13,
      term: language === 'ru' ? 'Автоматизированное тестирование' : 'Automated Testing',
      definition:
        language === 'ru'
          ? 'Тестирование с использованием специальных инструментов и скриптов.'
          : 'Testing using special tools and scripts.',
      category: 'automation',
      example: {
        ru: 'Скрипт автоматически проверяет регистрацию нового пользователя.',
        en: 'A script automatically checks new user registration.'
      },
    },
    {
      id: 14,
      term: language === 'ru' ? 'Selenium' : 'Selenium',
      definition:
        language === 'ru'
          ? 'Инструмент для автоматизации тестирования веб-приложений.'
          : 'A tool for automating web application testing.',
      category: 'automation',
      example: {
        ru: 'Тест на Selenium открывает сайт и проверяет, что кнопка "Войти" работает.',
        en: 'A Selenium test opens the site and checks that the "Login" button works.'
      },
    },
    {
      id: 15,
      term: language === 'ru' ? 'Cypress' : 'Cypress',
      definition:
        language === 'ru'
          ? 'Современный инструмент для автоматизации тестирования веб-приложений.'
          : 'A modern tool for automating web application testing.',
      category: 'automation',
      example: {
        ru: 'Тест на Cypress проверяет, что после нажатия "Добавить в корзину" товар появляется в корзине.',
        en: 'A Cypress test checks that after clicking "Add to cart", the item appears in the cart.'
      },
    },
    {
      id: 16,
      term: language === 'ru' ? 'Playwright' : 'Playwright',
      definition:
        language === 'ru'
          ? 'Инструмент для автоматизации тестирования веб-приложений от Microsoft.'
          : 'A web application testing automation tool from Microsoft.',
      category: 'automation',
      example: {
        ru: 'Тест на Playwright проверяет работу сайта в разных браузерах.',
        en: 'A Playwright test checks the site in different browsers.'
      },
    },

    // Методология
    {
      id: 17,
      term: language === 'ru' ? 'TDD (Test-Driven Development)' : 'TDD (Test-Driven Development)',
      definition:
        language === 'ru'
          ? 'Методология разработки, при которой тесты пишутся до кода.'
          : 'A development methodology where tests are written before the code.',
      category: 'methodology',
      example: {
        ru: 'Сначала пишется тест на функцию, затем реализуется сама функция.',
        en: 'First, a test for a function is written, then the function itself is implemented.'
      },
    },
    {
      id: 18,
      term:
        language === 'ru'
          ? 'BDD (Behavior-Driven Development)'
          : 'BDD (Behavior-Driven Development)',
      definition:
        language === 'ru'
          ? 'Методология разработки, при которой сценарии поведения описываются на понятном языке.'
          : 'A development methodology where behavior scenarios are described in a clear language.',
      category: 'methodology',
      example: {
        ru: 'Сценарий: "Если пользователь не авторизован, он не может оформить заказ."',
        en: 'Scenario: "If the user is not authorized, they cannot place an order."'
      },
    },
    {
      id: 19,
      term: language === 'ru' ? 'Shift-Left Testing' : 'Shift-Left Testing',
      definition:
        language === 'ru'
          ? 'Подход, при котором тестирование начинается на ранних этапах разработки.'
          : 'An approach where testing starts at the early stages of development.',
      category: 'methodology',
      example: {
        ru: 'Тестировщик участвует в обсуждении требований до написания кода.',
        en: 'A tester participates in requirements discussion before any code is written.'
      },
    },
    {
      id: 20,
      term: language === 'ru' ? 'Пирамида тестирования' : 'Testing Pyramid',
      definition:
        language === 'ru'
          ? 'Модель, показывающая соотношение разных уровней тестирования.'
          : 'A model showing the ratio of different testing levels.',
      category: 'methodology',
      example: {
        ru: 'В проекте больше модульных тестов, меньше интеграционных и ещё меньше UI-тестов.',
        en: 'The project has more unit tests, fewer integration tests, and even fewer UI tests.'
      },
    },

    // Инструменты
    {
      id: 21,
      term: language === 'ru' ? 'JUnit' : 'JUnit',
      definition:
        language === 'ru'
          ? 'Фреймворк для модульного тестирования на языке Java.'
          : 'A framework for unit testing in Java.',
      category: 'tools',
      example: {
        ru: 'Тест на JUnit проверяет, что функция сложения возвращает правильный результат.',
        en: 'A JUnit test checks that the addition function returns the correct result.'
      },
    },
    {
      id: 22,
      term: language === 'ru' ? 'Postman' : 'Postman',
      definition:
        language === 'ru'
          ? 'Инструмент для тестирования API и отправки HTTP-запросов.'
          : 'A tool for API testing and sending HTTP requests.',
      category: 'tools',
      example: {
        ru: 'С помощью Postman отправляется запрос к API и проверяется ответ.',
        en: 'Using Postman, a request is sent to the API and the response is checked.'
      },
    },
    {
      id: 23,
      term: language === 'ru' ? 'JMeter' : 'JMeter',
      definition:
        language === 'ru'
          ? 'Инструмент для нагрузочного тестирования и анализа производительности.'
          : 'A tool for load testing and performance analysis.',
      category: 'tools',
      example: {
        ru: 'JMeter используется для проверки, выдержит ли сайт 5000 одновременных пользователей.',
        en: 'JMeter is used to check if the site can handle 5,000 simultaneous users.'
      },
    },
    {
      id: 24,
      term: language === 'ru' ? 'TestNG' : 'TestNG',
      definition:
        language === 'ru'
          ? 'Фреймворк для автоматизированного тестирования на Java.'
          : 'A framework for automated testing in Java.',
      category: 'tools',
      example: {
        ru: 'Тесты на TestNG запускаются параллельно для ускорения проверки.',
        en: 'TestNG tests are run in parallel to speed up verification.'
      },
    },
    {
      id: 25,
      term: language === 'ru' ? 'Appium' : 'Appium',
      definition:
        language === 'ru'
          ? 'Инструмент для автоматизации тестирования мобильных приложений.'
          : 'A tool for automating mobile application testing.',
      category: 'tools',
      example: {
        ru: 'Appium автоматизирует тесты для Android и iOS приложений.',
        en: 'Appium automates tests for Android and iOS applications.'
      },
    },
    {
      id: 26,
      term: language === 'ru' ? 'SoapUI' : 'SoapUI',
      definition:
        language === 'ru'
          ? 'Инструмент для тестирования веб-сервисов и API.'
          : 'A tool for testing web services and APIs.',
      category: 'tools',
      example: {
        ru: 'С помощью SoapUI проверяется корректность ответа SOAP-сервиса.',
        en: 'SoapUI is used to check the correctness of a SOAP service response.'
      },
    },
    {
      id: 27,
      term: language === 'ru' ? 'Katalon Studio' : 'Katalon Studio',
      definition:
        language === 'ru'
          ? 'Платформа для автоматизации тестирования веб и мобильных приложений.'
          : 'A platform for automating web and mobile application testing.',
      category: 'tools',
      example: {
        ru: 'Katalon Studio позволяет создавать автотесты без программирования.',
        en: 'Katalon Studio allows creating automated tests without programming.'
      },
    },
    {
      id: 28,
      term: language === 'ru' ? 'TestComplete' : 'TestComplete',
      definition:
        language === 'ru'
          ? 'Инструмент для автоматизации функционального тестирования.'
          : 'A tool for automating functional testing.',
      category: 'tools',
      example: {
        ru: 'TestComplete используется для автоматизации тестов пользовательского интерфейса.',
        en: 'TestComplete is used to automate user interface tests.'
      },
    },
    {
      id: 29,
      term: language === 'ru' ? 'Robot Framework' : 'Robot Framework',
      definition:
        language === 'ru'
          ? 'Фреймворк для автоматизации тестирования с использованием ключевых слов на Python.'
          : 'A test automation framework using keywords in Python.',
      category: 'tools',
      example: {
        ru: 'Robot Framework позволяет писать тесты в виде читаемых сценариев.',
        en: 'Robot Framework allows writing tests as readable scenarios.'
      },
    },
    {
      id: 30,
      term: language === 'ru' ? 'Jest' : 'Jest',
      definition:
        language === 'ru'
          ? 'Фреймворк для тестирования JavaScript с нулевой конфигурацией от Facebook.'
          : 'A zero-configuration JavaScript testing framework from Facebook.',
      category: 'tools',
      example: {
        ru: 'Jest используется для тестирования React-компонентов.',
        en: 'Jest is used for testing React components.'
      },
    },
    {
      id: 31,
      term: language === 'ru' ? 'Mocha' : 'Mocha',
      definition:
        language === 'ru'
          ? 'Гибкий фреймворк для тестирования JavaScript с поддержкой различных стилей тестирования.'
          : 'A flexible JavaScript testing framework supporting various testing styles.',
      category: 'tools',
      example: {
        ru: 'Mocha используется для запуска тестов на Node.js-приложениях.',
        en: 'Mocha is used to run tests on Node.js applications.'
      },
    },

    // Дополнительные термины функционального тестирования
    {
      id: 32,
      term: language === 'ru' ? 'Тестирование регрессии' : 'Regression Testing',
      definition:
        language === 'ru'
          ? 'Тестирование, которое проверяет, что ранее работавшие функции продолжают работать после изменений.'
          : 'Testing that verifies previously working features continue to work after changes.',
      category: 'functional',
      example: {
        ru: 'После обновления сайта проверяют, работает ли оформление заказа как раньше.',
        en: 'After updating the site, they check if order placement still works as before.'
      },
    },
    {
      id: 33,
      term: language === 'ru' ? 'Тестирование дыма' : 'Smoke Testing',
      definition:
        language === 'ru'
          ? 'Краткая проверка основных функций системы после сборки.'
          : 'A quick check of the main system functions after a build.',
      category: 'functional',
      example: {
        ru: 'После развертывания новой версии проверяют, открывается ли главная страница.',
        en: 'After deploying a new version, they check if the main page opens.'
      },
    },
    {
      id: 34,
      term: language === 'ru' ? 'Тестирование санитарии' : 'Sanity Testing',
      definition:
        language === 'ru'
          ? 'Проверка работоспособности отдельных функций после небольших изменений.'
          : 'Checking the operability of specific functions after minor changes.',
      category: 'functional',
      example: {
        ru: 'После исправления бага проверяют только ту функцию, где была ошибка.',
        en: 'After fixing a bug, only the function where the error was is checked.'
      },
    },
    {
      id: 35,
      term: language === 'ru' ? 'Тестирование приемки' : 'Acceptance Testing',
      definition:
        language === 'ru'
          ? 'Тестирование, подтверждающее, что система соответствует требованиям заказчика.'
          : 'Testing that confirms the system meets customer requirements.',
      category: 'functional',
      example: {
        ru: 'Клиент проверяет, что все функции сайта работают согласно договору.',
        en: 'The client checks that all site functions work according to the contract.'
      },
    },
    {
      id: 36,
      term: language === 'ru' ? 'Тестирование интеграции' : 'Integration Testing',
      definition:
        language === 'ru'
          ? 'Тестирование взаимодействия между модулями или компонентами системы.'
          : 'Testing the interaction between modules or components of the system.',
      category: 'functional',
      example: {
        ru: 'Проверяют, как корзина взаимодействует с системой оплаты.',
        en: 'They check how the cart interacts with the payment system.'
      },
    },
    {
      id: 37,
      term: language === 'ru' ? 'Тестирование системы' : 'System Testing',
      definition:
        language === 'ru'
          ? 'Тестирование всей системы в целом для проверки соответствия требованиям.'
          : 'Testing the entire system as a whole to verify compliance with requirements.',
      category: 'functional',
      example: {
        ru: 'Проводят тесты на всём сайте, чтобы убедиться, что он работает как задумано.',
        en: 'Tests are run on the whole site to make sure it works as intended.'
      },
    },
    {
      id: 38,
      term: language === 'ru' ? 'Тестирование пользовательского интерфейса' : 'UI Testing',
      definition:
        language === 'ru'
          ? 'Проверка правильности отображения и работы элементов интерфейса.'
          : 'Checking the correct display and operation of interface elements.',
      category: 'functional',
      example: {
        ru: 'Проверяют, что кнопка "Купить" видна и работает на всех страницах.',
        en: 'They check that the "Buy" button is visible and works on all pages.'
      },
    },
    {
      id: 39,
      term: language === 'ru' ? 'Тестирование API' : 'API Testing',
      definition:
        language === 'ru'
          ? 'Проверка работы программных интерфейсов (API) между системами.'
          : 'Checking the operation of APIs between systems.',
      category: 'functional',
      example: {
        ru: 'Тест отправляет запрос к API и проверяет, что ответ корректный.',
        en: 'A test sends a request to the API and checks that the response is correct.'
      },
    },
    {
      id: 40,
      term: language === 'ru' ? 'Тестирование базы данных' : 'Database Testing',
      definition:
        language === 'ru'
          ? 'Проверка корректности работы с базой данных.'
          : 'Checking the correctness of working with the database.',
      category: 'functional',
      example: {
        ru: 'Проверяют, что после оформления заказа запись появляется в базе данных.',
        en: 'They check that after placing an order, a record appears in the database.'
      },
    },
    {
      id: 41,
      term: language === 'ru' ? 'Тестирование совместимости' : 'Compatibility Testing',
      definition:
        language === 'ru'
          ? 'Проверка работы системы на разных устройствах, ОС и браузерах.'
          : 'Checking system operation on different devices, OS, and browsers.',
      category: 'functional',
      example: {
        ru: 'Проверяют, одинаково ли сайт отображается в Chrome и Firefox.',
        en: 'They check if the site displays the same in Chrome and Firefox.'
      },
    },

    // Дополнительные термины нефункционального тестирования
    {
      id: 42,
      term: language === 'ru' ? 'Тестирование масштабируемости' : 'Scalability Testing',
      definition:
        language === 'ru'
          ? 'Проверка способности системы справляться с ростом нагрузки.'
          : "Checking the system's ability to handle increased load.",
      category: 'nonFunctional',
      example: {
        ru: 'Проверяют, как сайт работает при увеличении числа пользователей с 1000 до 10 000.',
        en: 'They check how the site works as the number of users increases from 1,000 to 10,000.'
      },
    },
    {
      id: 43,
      term: language === 'ru' ? 'Тестирование отказоустойчивости' : 'Reliability Testing',
      definition:
        language === 'ru'
          ? 'Проверка способности системы продолжать работу при сбоях.'
          : "Checking the system's ability to continue working during failures.",
      category: 'nonFunctional',
      example: {
        ru: 'Отключают один из серверов и проверяют, продолжает ли работать сайт.',
        en: 'They turn off one of the servers and check if the site keeps working.'
      },
    },
    {
      id: 44,
      term: language === 'ru' ? 'Тестирование доступности' : 'Accessibility Testing',
      definition:
        language === 'ru'
          ? 'Проверка, насколько система доступна для людей с ограниченными возможностями.'
          : 'Checking how accessible the system is for people with disabilities.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверяют, можно ли пользоваться сайтом с помощью экранного диктора.',
        en: 'They check if the site can be used with a screen reader.'
      },
    },
    {
      id: 45,
      term: language === 'ru' ? 'Тестирование локализации' : 'Localization Testing',
      definition:
        language === 'ru'
          ? 'Проверка корректности перевода и адаптации интерфейса под разные языки и регионы.'
          : 'Checking the correctness of translation and interface adaptation for different languages and regions.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверяют, что все кнопки и сообщения переведены на английский и русский.',
        en: 'They check that all buttons and messages are translated into English and Russian.'
      },
    },
    {
      id: 46,
      term: language === 'ru' ? 'Тестирование восстановления' : 'Recovery Testing',
      definition:
        language === 'ru'
          ? 'Проверка способности системы восстанавливаться после сбоев.'
          : "Checking the system's ability to recover after failures.",
      category: 'nonFunctional',
      example: {
        ru: 'После сбоя сервера проверяют, восстанавливаются ли данные.',
        en: 'After a server failure, they check if the data is restored.'
      },
    },
    {
      id: 47,
      term: language === 'ru' ? 'Тестирование установки' : 'Installation Testing',
      definition:
        language === 'ru'
          ? 'Проверка процесса установки и обновления программного обеспечения.'
          : 'Checking the process of installing and updating software.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверяют, что программа устанавливается и запускается без ошибок.',
        en: 'They check that the program installs and starts without errors.'
      },
    },
    {
      id: 48,
      term: language === 'ru' ? 'Тестирование миграции' : 'Migration Testing',
      definition:
        language === 'ru'
          ? 'Тестирование процесса переноса данных и конфигураций между версиями.'
          : 'Testing the process of migrating data and configurations between versions.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверяют, что все данные сохранились после обновления системы.',
        en: 'They check that all data is preserved after the system update.'
      },
    },
    {
      id: 49,
      term: language === 'ru' ? 'Тестирование совместимости браузеров' : 'Cross-Browser Testing',
      definition:
        language === 'ru'
          ? 'Проверка работы веб-приложения в разных браузерах.'
          : 'Checking web application operation in different browsers.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверяют, одинаково ли сайт работает в Chrome, Firefox и Safari.',
        en: 'They check if the site works the same in Chrome, Firefox, and Safari.'
      },
    },
    {
      id: 50,
      term: language === 'ru' ? 'Тестирование мобильных устройств' : 'Mobile Testing',
      definition:
        language === 'ru'
          ? 'Проверка работы приложения на различных мобильных устройствах и ОС.'
          : 'Checking application operation on various mobile devices and OS.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверяют, корректно ли приложение работает на iOS и Android.',
        en: 'They check if the app works correctly on iOS and Android.'
      },
    },

    // Дополнительные термины автоматизации
    {
      id: 51,
      term: language === 'ru' ? 'Page Object Model' : 'Page Object Model',
      definition:
        language === 'ru'
          ? 'Паттерн проектирования для автоматизации тестирования, который инкапсулирует элементы страницы.'
          : 'A design pattern for test automation that encapsulates page elements.',
      category: 'automation',
      example: {
        ru: 'В Page Object Model для каждой страницы сайта создаётся отдельный класс с методами для работы с элементами.',
        en: 'In Page Object Model, a separate class is created for each site page with methods for interacting with elements.'
      },
    },
    {
      id: 52,
      term: language === 'ru' ? 'Data-Driven Testing' : 'Data-Driven Testing',
      definition:
        language === 'ru'
          ? 'Подход к автоматизации, при котором тестовые данные хранятся отдельно от тестового кода.'
          : 'An automation approach where test data is stored separately from test code.',
      category: 'automation',
      example: {
        ru: 'Один тест выполняется с разными наборами данных из таблицы.',
        en: 'A single test is run with different data sets from a table.'
      },
    },
    {
      id: 53,
      term: language === 'ru' ? 'Keyword-Driven Testing' : 'Keyword-Driven Testing',
      definition:
        language === 'ru'
          ? 'Подход к автоматизации, использующий ключевые слова для описания тестовых действий.'
          : 'An automation approach using keywords to describe test actions.',
      category: 'automation',
      example: {
        ru: 'Тестовые сценарии описываются с помощью ключевых слов: "Открыть страницу", "Ввести логин".',
        en: 'Test scenarios are described using keywords: "Open page", "Enter login".'
      },
    },
    {
      id: 54,
      term: language === 'ru' ? 'TestNG' : 'TestNG',
      definition:
        language === 'ru'
          ? 'Фреймворк для тестирования Java с расширенными возможностями по сравнению с JUnit.'
          : 'A Java testing framework with advanced capabilities compared to JUnit.',
      category: 'automation',
      example: {
        ru: 'TestNG позволяет запускать тесты параллельно и группировать их по категориям.',
        en: 'TestNG allows running tests in parallel and grouping them by category.'
      },
    },
    {
      id: 55,
      term: language === 'ru' ? 'Pytest' : 'Pytest',
      definition:
        language === 'ru'
          ? 'Популярный фреймворк для тестирования Python с простым синтаксисом.'
          : 'A popular Python testing framework with simple syntax.',
      category: 'automation',
      example: {
        ru: 'С помощью Pytest пишут простые и читаемые тесты для Python-кода.',
        en: 'Pytest is used to write simple and readable tests for Python code.'
      },
    },
    {
      id: 56,
      term: language === 'ru' ? 'NUnit' : 'NUnit',
      definition:
        language === 'ru'
          ? 'Фреймворк для модульного тестирования .NET приложений.'
          : 'A framework for unit testing .NET applications.',
      category: 'automation',
      example: {
        ru: 'NUnit используется для тестирования бизнес-логики в .NET-приложениях.',
        en: 'NUnit is used for testing business logic in .NET applications.'
      },
    },
    {
      id: 57,
      term: language === 'ru' ? 'XUnit' : 'XUnit',
      definition:
        language === 'ru'
          ? 'Современный фреймворк для тестирования .NET с открытым исходным кодом.'
          : 'A modern open-source testing framework for .NET.',
      category: 'automation',
      example: {
        ru: 'XUnit поддерживает параллельный запуск тестов для ускорения проверки.',
        en: 'XUnit supports parallel test execution to speed up verification.'
      },
    },
    {
      id: 58,
      term: language === 'ru' ? 'Cucumber' : 'Cucumber',
      definition:
        language === 'ru'
          ? 'Инструмент для BDD, позволяющий писать тесты на естественном языке.'
          : 'A BDD tool that allows writing tests in natural language.',
      category: 'automation',
      example: {
        ru: 'Cucumber позволяет описывать сценарии тестирования на языке Gherkin.',
        en: 'Cucumber allows describing test scenarios in Gherkin language.'
      },
    },
    {
      id: 59,
      term: language === 'ru' ? 'SpecFlow' : 'SpecFlow',
      definition:
        language === 'ru'
          ? 'Инструмент для BDD в .NET, основанный на Cucumber.'
          : 'A BDD tool for .NET based on Cucumber.',
      category: 'automation',
      example: {
        ru: 'SpecFlow используется для написания BDD-тестов на C#.',
        en: 'SpecFlow is used for writing BDD tests in C#.'
      },
    },
    {
      id: 60,
      term: language === 'ru' ? 'Behave' : 'Behave',
      definition:
        language === 'ru'
          ? 'Фреймворк для BDD в Python, основанный на Cucumber.'
          : 'A BDD framework for Python based on Cucumber.',
      category: 'automation',
      example: {
        ru: 'Behave позволяет писать тесты на языке Gherkin для Python-проектов.',
        en: 'Behave allows writing tests in Gherkin language for Python projects.'
      },
    },

    // Дополнительные термины методологии
    {
      id: 61,
      term: language === 'ru' ? 'ATDD (Acceptance Test-Driven Development)' : 'ATDD (Acceptance Test-Driven Development)',
      definition:
        language === 'ru'
          ? 'Методология, при которой приемочные тесты пишутся до реализации функциональности.'
          : 'A methodology where acceptance tests are written before implementing functionality.',
      category: 'methodology',
      example: {
        ru: 'Перед началом разработки пишут тест, который проверяет, что пользователь может оформить заказ.',
        en: 'Before development starts, a test is written to check that a user can place an order.'
      },
    },
    {
      id: 62,
      term: language === 'ru' ? 'Continuous Integration' : 'Continuous Integration',
      definition:
        language === 'ru'
          ? 'Практика регулярного объединения изменений в общий репозиторий с автоматической проверкой.'
          : 'A practice of regularly merging changes into a shared repository with automated checks.',
      category: 'methodology',
      example: {
        ru: 'Каждый коммит автоматически запускает тесты на сервере.',
        en: 'Each commit automatically triggers tests on the server.'
      },
    },
    {
      id: 63,
      term: language === 'ru' ? 'Continuous Delivery' : 'Continuous Delivery',
      definition:
        language === 'ru'
          ? 'Практика, при которой изменения могут быть быстро и безопасно развернуты в продакшн.'
          : 'A practice where changes can be quickly and safely deployed to production.',
      category: 'methodology',
      example: {
        ru: 'После успешного тестирования новая версия автоматически развёртывается на сервере.',
        en: 'After successful testing, the new version is automatically deployed to the server.'
      },
    },
    {
      id: 64,
      term: language === 'ru' ? 'Continuous Deployment' : 'Continuous Deployment',
      definition:
        language === 'ru'
          ? 'Практика, при которой каждое изменение автоматически развёртывается в продакшн.'
          : 'A practice where every change is automatically deployed to production.',
      category: 'methodology',
      example: {
        ru: 'Каждый коммит, прошедший тесты, сразу попадает на боевой сервер.',
        en: 'Every commit that passes tests is immediately deployed to the production server.'
      },
    },
    {
      id: 65,
      term: language === 'ru' ? 'DevOps' : 'DevOps',
      definition:
        language === 'ru'
          ? 'Культура и практика, объединяющая разработку и эксплуатацию для ускорения поставки ПО.'
          : 'A culture and practice that combines development and operations to speed up software delivery.',
      category: 'methodology',
      example: {
        ru: 'В команде DevOps разработчики и админы вместе отвечают за выпуск продукта.',
        en: 'In a DevOps team, developers and admins are jointly responsible for product release.'
      },
    },
    {
      id: 66,
      term: language === 'ru' ? 'Kanban' : 'Kanban',
      definition:
        language === 'ru'
          ? 'Метод управления проектами с визуализацией задач на доске.'
          : 'A project management method with task visualization on a board.',
      category: 'methodology',
      example: {
        ru: 'Задачи перемещаются по колонкам "В работе", "Тестирование", "Готово" на доске Kanban.',
        en: 'Tasks move across columns "In Progress", "Testing", "Done" on a Kanban board.'
      },
    },
    {
      id: 67,
      term: language === 'ru' ? 'Scrum' : 'Scrum',
      definition:
        language === 'ru'
          ? 'Гибкая методология управления проектами с короткими итерациями (спринтами).'
          : 'An agile project management methodology with short iterations (sprints).',
      category: 'methodology',
      example: {
        ru: 'В Scrum команда работает по 2-недельным спринтам и регулярно демонстрирует результат.',
        en: 'In Scrum, the team works in 2-week sprints and regularly demonstrates results.'
      },
    },
    {
      id: 68,
      term: language === 'ru' ? 'Agile' : 'Agile',
      definition:
        language === 'ru'
          ? 'Гибкий подход к разработке ПО с акцентом на сотрудничество и быструю реакцию на изменения.'
          : 'A flexible approach to software development focused on collaboration and quick response to change.',
      category: 'methodology',
      example: {
        ru: 'Agile-команда быстро меняет план работы в ответ на новые требования.',
        en: 'An Agile team quickly changes the work plan in response to new requirements.'
      },
    },
    {
      id: 69,
      term: language === 'ru' ? 'Waterfall' : 'Waterfall',
      definition:
        language === 'ru'
          ? 'Классическая каскадная модель разработки ПО с последовательными этапами.'
          : 'A classic waterfall model of software development with sequential stages.',
      category: 'methodology',
      example: {
        ru: 'В Waterfall каждый этап (анализ, проектирование, кодирование) завершается полностью перед следующим.',
        en: 'In Waterfall, each stage (analysis, design, coding) is completed fully before the next.'
      },
    },
    {
      id: 70,
      term: language === 'ru' ? 'A/B Testing' : 'A/B Testing',
      definition:
        language === 'ru'
          ? 'Метод тестирования, при котором сравниваются две версии продукта для определения лучшей.'
          : 'A testing method where two versions of a product are compared to determine the better one.',
      category: 'methodology',
      example: {
        ru: 'Половине пользователей показывают старую кнопку, половине — новую и сравнивают конверсию.',
        en: 'Half of users see the old button, half see the new one, and conversion is compared.'
      },
    },

    // Дополнительные инструменты
    {
      id: 71,
      term: language === 'ru' ? 'Charles Proxy' : 'Charles Proxy',
      definition:
        language === 'ru'
          ? 'Инструмент для анализа и отладки HTTP/HTTPS трафика между клиентом и сервером.'
          : 'A tool for analyzing and debugging HTTP/HTTPS traffic between client and server.',
      category: 'tools',
      example: {
        ru: 'С помощью Charles Proxy отслеживают, какие запросы отправляет приложение.',
        en: 'With Charles Proxy, you can track what requests the application sends.'
      },
    },
    {
      id: 72,
      term: language === 'ru' ? 'Fiddler' : 'Fiddler',
      definition:
        language === 'ru'
          ? 'Веб-отладчик для анализа HTTP трафика и тестирования веб-приложений.'
          : 'A web debugger for analyzing HTTP traffic and testing web applications.',
      category: 'tools',
      example: {
        ru: 'Fiddler позволяет увидеть все запросы и ответы между браузером и сервером.',
        en: 'Fiddler allows you to see all requests and responses between the browser and the server.'
      },
    },
    {
      id: 73,
      term: language === 'ru' ? 'Burp Suite' : 'Burp Suite',
      definition:
        language === 'ru'
          ? 'Комплексная платформа для тестирования безопасности веб-приложений.'
          : 'A comprehensive platform for testing web application security.',
      category: 'tools',
      example: {
        ru: 'Burp Suite используется для поиска уязвимостей в веб-приложениях.',
        en: 'Burp Suite is used to find vulnerabilities in web applications.'
      },
    },
    {
      id: 74,
      term: language === 'ru' ? 'TestRail' : 'TestRail',
      definition:
        language === 'ru'
          ? 'Система для управления тест-кейсами и результатами тестирования.'
          : 'A system for managing test cases and test results.',
      category: 'tools',
      example: {
        ru: 'В TestRail хранятся все тест-кейсы и результаты их выполнения.',
        en: 'All test cases and their results are stored in TestRail.'
      },
    },
    {
      id: 75,
      term: language === 'ru' ? 'Allure' : 'Allure',
      definition:
        language === 'ru'
          ? 'Инструмент для визуализации и анализа результатов автоматизированного тестирования.'
          : 'A tool for visualizing and analyzing automated test results.',
      category: 'tools',
      example: {
        ru: 'Allure строит красивые отчёты по результатам автотестов.',
        en: 'Allure builds beautiful reports based on automated test results.'
      },
    },
    {
      id: 76,
      term: language === 'ru' ? 'Jira' : 'Jira',
      definition:
        language === 'ru'
          ? 'Система для управления проектами, задачами и отслеживания ошибок.'
          : 'A system for project management, task tracking, and bug tracking.',
      category: 'tools',
      example: {
        ru: 'В Jira создают задачи для тестирования и отслеживают баги.',
        en: 'In Jira, tasks for testing are created and bugs are tracked.'
      },
    },
    {
      id: 77,
      term: language === 'ru' ? 'Confluence' : 'Confluence',
      definition:
        language === 'ru'
          ? 'Платформа для совместной работы и хранения документации.'
          : 'A platform for collaboration and documentation storage.',
      category: 'tools',
      example: {
        ru: 'В Confluence хранятся инструкции и тестовая документация.',
        en: 'Instructions and test documentation are stored in Confluence.'
      },
    },
    {
      id: 78,
      term: language === 'ru' ? 'GitLab CI/CD' : 'GitLab CI/CD',
      definition:
        language === 'ru'
          ? 'Инструмент для автоматизации сборки, тестирования и развертывания приложений.'
          : 'A tool for automating build, test, and deployment of applications.',
      category: 'tools',
      example: {
        ru: 'GitLab CI/CD автоматически запускает тесты и выкладывает новую версию приложения.',
        en: 'GitLab CI/CD automatically runs tests and deploys a new version of the application.'
      },
    },
    {
      id: 79,
      term: language === 'ru' ? 'Sauce Labs' : 'Sauce Labs',
      definition:
        language === 'ru'
          ? 'Облачная платформа для автоматизированного тестирования веб и мобильных приложений.'
          : 'A cloud platform for automated testing of web and mobile applications.',
      category: 'tools',
      example: {
        ru: 'Sauce Labs позволяет запускать автотесты в разных браузерах и на устройствах.',
        en: 'Sauce Labs allows running automated tests in different browsers and on devices.'
      },
    },
    {
      id: 80,
      term: language === 'ru' ? 'LambdaTest' : 'LambdaTest',
      definition:
        language === 'ru'
          ? 'Облачная платформа для кросс-браузерного тестирования веб-приложений.'
          : 'A cloud platform for cross-browser testing of web applications.',
      category: 'tools',
      example: {
        ru: 'LambdaTest позволяет проверить сайт в десятках браузеров онлайн.',
        en: 'LambdaTest allows you to check your site in dozens of browsers online.'
      },
    },
    {
      id: 81,
      term: language === 'ru' ? 'Jenkins' : 'Jenkins',
      definition:
        language === 'ru'
          ? 'Инструмент для автоматизации сборки, тестирования и развертывания ПО.'
          : 'A tool for automating build, test, and deployment of software.',
      category: 'tools',
      example: {
        ru: 'Jenkins автоматически запускает тесты после каждого коммита в репозиторий.',
        en: 'Jenkins automatically runs tests after each commit to the repository.'
      },
    },
    {
      id: 82,
      term: language === 'ru' ? 'TestLink' : 'TestLink',
      definition:
        language === 'ru'
          ? 'Система для управления тест-кейсами и планирования тестирования.'
          : 'A system for managing test cases and planning testing.',
      category: 'tools',
      example: {
        ru: 'В TestLink создают тест-кейсы и формируют тест-планы для релизов.',
        en: 'Test cases are created and test plans for releases are formed in TestLink.'
      },
    },
    {
      id: 83,
      term: language === 'ru' ? 'Bugzilla' : 'Bugzilla',
      definition:
        language === 'ru'
          ? 'Система для отслеживания ошибок и управления задачами.'
          : 'A system for bug tracking and task management.',
      category: 'tools',
      example: {
        ru: 'В Bugzilla регистрируют баги и отслеживают их исправление.',
        en: 'Bugs are registered and their fixing is tracked in Bugzilla.'
      },
    },
    {
      id: 84,
      term: language === 'ru' ? 'MantisBT' : 'MantisBT',
      definition:
        language === 'ru'
          ? 'Система для отслеживания ошибок с простым интерфейсом.'
          : 'A bug tracking system with a simple interface.',
      category: 'tools',
      example: {
        ru: 'В MantisBT удобно отслеживать статус найденных дефектов.',
        en: 'MantisBT is convenient for tracking the status of found defects.'
      },
    },
    {
      id: 85,
      term: language === 'ru' ? 'Redmine' : 'Redmine',
      definition:
        language === 'ru'
          ? 'Система для управления проектами и задачами с поддержкой плагинов.'
          : 'A project and task management system with plugin support.',
      category: 'tools',
      example: {
        ru: 'В Redmine ведут задачи по проекту и отслеживают их выполнение.',
        en: 'Project tasks are managed and tracked in Redmine.'
      },
    },
    {
      id: 86,
      term: language === 'ru' ? 'YouTrack' : 'YouTrack',
      definition:
        language === 'ru'
          ? 'Система для отслеживания задач и багов от JetBrains.'
          : 'A task and bug tracking system from JetBrains.',
      category: 'tools',
      example: {
        ru: 'В YouTrack удобно фильтровать задачи по тегам и статусу.',
        en: 'In YouTrack, it is convenient to filter tasks by tags and status.'
      },
    },
    {
      id: 87,
      term: language === 'ru' ? 'TestFairy' : 'TestFairy',
      definition:
        language === 'ru'
          ? 'Платформа для тестирования мобильных приложений с записью сессий.'
          : 'A platform for testing mobile applications with session recording.',
      category: 'tools',
      example: {
        ru: 'TestFairy записывает видео с экрана во время тестирования приложения.',
        en: 'TestFairy records screen video during app testing.'
      },
    },
    {
      id: 88,
      term: language === 'ru' ? 'Qase' : 'Qase',
      definition:
        language === 'ru'
          ? 'Современная система для управления тест-кейсами и тест-ранами.'
          : 'A modern system for managing test cases and test runs.',
      category: 'tools',
      example: {
        ru: 'В Qase удобно создавать тест-кейсы и запускать тест-раны.',
        en: 'Qase makes it easy to create test cases and run test runs.'
      },
    },
    {
      id: 89,
      term: language === 'ru' ? 'Zephyr' : 'Zephyr',
      definition:
        language === 'ru'
          ? 'Плагин для управления тестированием в Jira.'
          : 'A plugin for test management in Jira.',
      category: 'tools',
      example: {
        ru: 'Zephyr интегрируется с Jira и позволяет вести тест-кейсы прямо в задачах.',
        en: 'Zephyr integrates with Jira and allows managing test cases directly in issues.'
      },
    },
    {
      id: 90,
      term: language === 'ru' ? 'TestLodge' : 'TestLodge',
      definition:
        language === 'ru'
          ? 'Онлайн-сервис для управления тест-кейсами и тест-планами.'
          : 'An online service for managing test cases and test plans.',
      category: 'tools',
      example: {
        ru: 'В TestLodge можно создавать тест-планы и отслеживать их выполнение онлайн.',
        en: 'In TestLodge, you can create test plans and track their execution online.'
      },
    },

    // --- Новые термины ---
    {
      id: 1001,
      term: language === 'ru' ? 'Модульное тестирование' : 'Unit Testing',
      definition: language === 'ru'
        ? 'Тестирование отдельных модулей или функций программы изолированно от других частей.'
        : 'Testing individual modules or functions of a program in isolation from other parts.',
      category: 'functional',
      example: {
        ru: 'Тест проверяет, что функция сложения возвращает правильный результат для 2 + 2.',
        en: 'A test checks that the addition function returns the correct result for 2 + 2.'
      },
    },
    {
      id: 1002,
      term: language === 'ru' ? 'Интеграционное тестирование' : 'Integration Testing',
      definition: language === 'ru'
        ? 'Проверка взаимодействия между различными модулями системы.'
        : 'Testing the interaction between different modules of the system.',
      category: 'functional',
      example: {
        ru: 'Проверяют, как модуль оплаты взаимодействует с корзиной.',
        en: 'They check how the payment module interacts with the cart.'
      },
    },
    {
      id: 1003,
      term: language === 'ru' ? 'Системное тестирование' : 'System Testing',
      definition: language === 'ru'
        ? 'Тестирование всей системы в целом для проверки соответствия требованиям.'
        : 'Testing the entire system as a whole to verify compliance with requirements.',
      category: 'functional',
      example: {
        ru: 'Проводят тесты на всём сайте, чтобы убедиться, что он работает как задумано.',
        en: 'Tests are run on the whole site to make sure it works as intended.'
      },
    },
    {
      id: 1004,
      term: language === 'ru' ? 'Приёмочное тестирование' : 'Acceptance Testing',
      definition: language === 'ru'
        ? 'Тестирование, подтверждающее, что система соответствует требованиям заказчика.'
        : 'Testing that confirms the system meets customer requirements.',
      category: 'functional',
      example: {
        ru: 'Клиент проверяет, что все функции сайта работают согласно договору.',
        en: 'The client checks that all site functions work according to the contract.'
      },
    },
    {
      id: 1005,
      term: language === 'ru' ? 'Тестирование дымовых тестов' : 'Smoke Testing',
      definition: language === 'ru'
        ? 'Краткая проверка основных функций системы после сборки.'
        : 'A quick check of the main system functions after a build.',
      category: 'functional',
      example: {
        ru: 'После развертывания новой версии проверяют, открывается ли главная страница.',
        en: 'After deploying a new version, they check if the main page opens.'
      },
    },
    {
      id: 1006,
      term: language === 'ru' ? 'Тестирование санитарии' : 'Sanity Testing',
      definition: language === 'ru'
        ? 'Проверка работоспособности отдельных функций после небольших изменений.'
        : 'Checking the operability of specific functions after minor changes.',
      category: 'functional',
      example: {
        ru: 'После исправления бага проверяют только ту функцию, где была ошибка.',
        en: 'After fixing a bug, only the function where the error was is checked.'
      },
    },
    {
      id: 1007,
      term: language === 'ru' ? 'Тестирование регрессии' : 'Regression Testing',
      definition: language === 'ru'
        ? 'Тестирование, которое проверяет, что ранее работавшие функции продолжают работать после изменений.'
        : 'Testing that verifies previously working features continue to work after changes.',
      category: 'functional',
      example: {
        ru: 'После обновления сайта проверяют, работает ли оформление заказа как раньше.',
        en: 'After updating the site, they check if order placement still works as before.'
      },
    },
    {
      id: 1008,
      term: language === 'ru' ? 'Тестирование производительности' : 'Performance Testing',
      definition: language === 'ru'
        ? 'Тестирование, которое определяет, как система работает под различной нагрузкой и в различных условиях.'
        : 'Testing that determines how a system performs under various loads and conditions.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверка, сколько пользователей одновременно может оформить заказ без замедления сайта.',
        en: 'Checking how many users can place orders simultaneously without the site slowing down.'
      },
    },
    {
      id: 1009,
      term: language === 'ru' ? 'Нагрузочное тестирование' : 'Load Testing',
      definition: language === 'ru'
        ? 'Тестирование системы под ожидаемой нагрузкой для проверки её производительности.'
        : 'Testing the system under expected load to verify its performance.',
      category: 'nonFunctional',
      example: {
        ru: 'Одновременно 1000 пользователей заходят на сайт и оформляют заказы.',
        en: '1,000 users visit the site and place orders at the same time.'
      },
    },
    {
      id: 1010,
      term: language === 'ru' ? 'Стресс-тестирование' : 'Stress Testing',
      definition: language === 'ru'
        ? 'Тестирование системы при экстремальных нагрузках для оценки её устойчивости.'
        : 'Testing the system under extreme loads to assess its stability.',
      category: 'nonFunctional',
      example: {
        ru: 'Проверка, как сайт работает при 10 000 одновременных пользователей.',
        en: 'Testing how the site works with 10,000 simultaneous users.'
      },
    },

    // --- Ещё 5 новых терминов ---
    {
      id: 1011,
      term: language === 'ru' ? 'Дефект, баг' : 'Bug',
      definition: language === 'ru'
        ? 'Ошибка или несоответствие в программе, приводящее к неправильной работе.'
        : 'An error or discrepancy in the program that leads to incorrect operation.',
      category: 'general',
      example: {
        ru: 'Пользователь не может войти в систему из-за ошибки валидации пароля — это баг.',
        en: 'A user cannot log in due to a password validation error — this is a bug.'
      },
    },
    {
      id: 1012,
      term: language === 'ru' ? 'Система отслеживания дефектов' : 'Defect Tracking System',
      definition: language === 'ru'
        ? 'Инструмент для регистрации, отслеживания и управления ошибками (например, Jira, Bugzilla).'
        : 'A tool for registering, tracking, and managing bugs (e.g., Jira, Bugzilla).',
      category: 'tools',
      example: {
        ru: 'В системе отслеживания дефектов тестировщик заводит баг и отслеживает его исправление.',
        en: 'A tester creates a bug in the tracking system and monitors its resolution.'
      },
    },
    {
      id: 1013,
      term: language === 'ru' ? 'Статическое тестирование' : 'Static Testing',
      definition: language === 'ru'
        ? 'Анализ кода, требований или документации без выполнения программы.'
        : 'Analysis of code, requirements, or documentation without running the program.',
      category: 'methodology',
      example: {
        ru: 'Тестировщик проверяет требования на наличие ошибок до написания кода.',
        en: 'A tester checks requirements for errors before any code is written.'
      },
    },
    {
      id: 1014,
      term: language === 'ru' ? 'Динамическое тестирование' : 'Dynamic Testing',
      definition: language === 'ru'
        ? 'Тестирование с запуском программы и анализом её поведения.'
        : 'Testing by running the program and analyzing its behavior.',
      category: 'methodology',
      example: {
        ru: 'Тестировщик запускает приложение и проверяет, как оно реагирует на ввод данных.',
        en: 'A tester runs the application and checks how it responds to data input.'
      },
    },
    {
      id: 1015,
      term: language === 'ru' ? 'Тестовые данные' : 'Test Data',
      definition: language === 'ru'
        ? 'Данные, используемые для выполнения тестов.'
        : 'Data used to execute tests.',
      category: 'general',
      example: {
        ru: 'Для проверки регистрации используют тестовые email и пароли.',
        en: 'Test emails and passwords are used to check registration.'
      },
    },
    {
      id: 1016,
      term: language === 'ru' ? 'Непрерывная интеграция (CI)' : 'Continuous Integration (CI)',
      definition: language === 'ru'
        ? 'Практика регулярного объединения изменений в общий репозиторий с автоматическим запуском тестов.'
        : 'A practice of regularly merging changes into a shared repository with automatic test runs.',
      category: 'automation',
      example: {
        ru: 'Каждый коммит в репозиторий автоматически запускает тесты на сервере.',
        en: 'Each commit to the repository automatically triggers tests on the server.'
      },
    },
    {
      id: 1017,
      term: language === 'ru' ? 'Непрерывная доставка (CD)' : 'Continuous Delivery (CD)',
      definition: language === 'ru'
        ? 'Автоматизация процесса развертывания приложения на тестовые и продакшн-среды.'
        : 'Automation of deploying applications to test and production environments.',
      category: 'automation',
      example: {
        ru: 'После успешного тестирования новая версия автоматически развёртывается на тестовом сервере.',
        en: 'After successful testing, the new version is automatically deployed to the test server.'
      },
    },
    {
      id: 1018,
      term: language === 'ru' ? 'Тестирование границ' : 'Boundary Testing',
      definition: language === 'ru'
        ? 'Проверка работы системы на граничных значениях входных данных.'
        : 'Testing the system at the boundary values of input data.',
      category: 'functional',
      example: {
        ru: 'Для поля возраста (1-100) тестируются значения 1, 100 и значения рядом с ними: 0 и 101.',
        en: 'For an age field (1-100), test values 1, 100, and values near them: 0 and 101.'
      },
    },
    {
      id: 1019,
      term: language === 'ru' ? 'Пользовательская история' : 'User Story',
      definition: language === 'ru'
        ? 'Краткое описание функциональности с точки зрения пользователя.'
        : "A short description of functionality from the user's perspective.",
      category: 'methodology',
      example: {
        ru: 'Как пользователь, я хочу получать уведомления о новых сообщениях, чтобы не пропустить важную информацию.',
        en: 'As a user, I want to receive notifications about new messages so I do not miss important information.'
      },
    },
    {
      id: 1020,
      term: language === 'ru' ? 'План тестирования' : 'Test Plan',
      definition: language === 'ru'
        ? 'Документ, описывающий объём, подходы, ресурсы и расписание тестирования.'
        : 'A document describing the scope, approaches, resources, and schedule for testing.',
      category: 'methodology',
      example: {
        ru: 'В плане тестирования указаны этапы, ответственные и сроки для каждого вида тестов.',
        en: 'The test plan specifies the stages, responsible persons, and deadlines for each type of test.'
      },
    },

    // --- Новые общие термины ---
    {
      id: 1021,
      term: language === 'ru' ? 'Релиз' : 'Release',
      definition: language === 'ru'
        ? 'Версия программного продукта, официально выпущенная для пользователей.'
        : 'A version of the software product officially released to users.',
      category: 'general',
      example: {
        ru: 'Вышел релиз версии 2.0, пользователи получили новые функции.',
        en: 'Version 2.0 was released, and users received new features.'
      },
    },
    {
      id: 1022,
      term: language === 'ru' ? 'Сборка' : 'Build',
      definition: language === 'ru'
        ? 'Конкретная версия программного обеспечения, собранная из исходного кода.'
        : 'A specific version of software built from source code.',
      category: 'general',
      example: {
        ru: 'Тестировщик проверяет сборку 105 перед релизом.',
        en: 'The tester checks build 105 before release.'
      },
    },
    {
      id: 1023,
      term: language === 'ru' ? 'Инцидент' : 'Issue',
      definition: language === 'ru'
        ? 'Любое событие, которое может привести к сбою или ошибке в работе системы.'
        : 'Any event that may lead to a failure or error in the system.',
      category: 'general',
      example: {
        ru: 'Во время тестирования был зафиксирован инцидент: сайт перестал отвечать.',
        en: 'During testing, an issue was recorded: the site stopped responding.'
      },
    },
    {
      id: 1024,
      term: language === 'ru' ? 'Требование' : 'Requirement',
      definition: language === 'ru'
        ? 'Документированное описание функциональности или качества, которым должна обладать система.'
        : 'A documented description of functionality or quality the system must have.',
      category: 'general',
      example: {
        ru: 'В требованиях указано, что пользователь должен получать уведомления о новых сообщениях.',
        en: 'The requirements state that the user must receive notifications about new messages.'
      },
    },
    {
      id: 1025,
      term: language === 'ru' ? 'Тестовое окружение' : 'Test Environment',
      definition: language === 'ru'
        ? 'Аппаратные и программные средства, на которых проводится тестирование.'
        : 'Hardware and software used for testing.',
      category: 'general',
      example: {
        ru: 'Тестирование проводится в отдельном тестовом окружении, чтобы не повлиять на реальных пользователей.',
        en: 'Testing is performed in a separate test environment to avoid affecting real users.'
      },
    },
    {
      id: 1026,
      term: language === 'ru' ? 'Отчёт о тестировании' : 'Test Report',
      definition: language === 'ru'
        ? 'Документ, содержащий результаты тестирования и выводы по качеству продукта.'
        : 'A document containing test results and conclusions about product quality.',
      category: 'general',
      example: {
        ru: 'В отчёте о тестировании указано, что найдено 5 багов и все критические ошибки исправлены.',
        en: 'The test report states that 5 bugs were found and all critical issues were fixed.'
      },
    },
    {
      id: 1027,
      term: language === 'ru' ? 'Тестовый сценарий' : 'Test Scenario',
      definition: language === 'ru'
        ? 'Высокоуровневое описание действий пользователя для проверки определённой функции.'
        : 'A high-level description of user actions to check a specific function.',
      category: 'general',
      example: {
        ru: 'Тестовый сценарий: оформить заказ на сайте как гость.',
        en: 'Test scenario: place an order on the website as a guest.'
      },
    },
    {
      id: 1028,
      term: language === 'ru' ? 'Шаг теста' : 'Test Step',
      definition: language === 'ru'
        ? 'Конкретное действие в рамках тест-кейса или сценария.'
        : 'A specific action within a test case or scenario.',
      category: 'general',
      example: {
        ru: 'Шаг теста: нажать кнопку "Оформить заказ".',
        en: 'Test step: click the "Place Order" button.'
      },
    },
    {
      id: 1029,
      term: language === 'ru' ? 'Ожидаемый результат' : 'Expected Result',
      definition: language === 'ru'
        ? 'Результат, который должен быть получен при выполнении теста, если система работает корректно.'
        : 'The result that should be obtained if the system works correctly.',
      category: 'general',
      example: {
        ru: 'Ожидаемый результат: после нажатия кнопки появляется сообщение об успешном заказе.',
        en: 'Expected result: after clicking the button, a success message appears.'
      },
    },
    {
      id: 1030,
      term: language === 'ru' ? 'Фактический результат' : 'Actual Result',
      definition: language === 'ru'
        ? 'Результат, который был получен при выполнении теста.'
        : 'The result that was obtained during test execution.',
      category: 'general',
      example: {
        ru: 'Фактический результат: после нажатия кнопки появилось сообщение об ошибке.',
        en: 'Actual result: after clicking the button, an error message appeared.'
      },
    },
    {
      id: 1031,
      term: language === 'ru' ? 'Приоритет' : 'Priority',
      definition: language === 'ru'
        ? 'Степень важности исправления дефекта или выполнения задачи.'
        : 'The importance of fixing a defect or completing a task.',
      category: 'general',
      example: {
        ru: 'Баг с приоритетом "Высокий" должен быть исправлен в первую очередь.',
        en: 'A bug with "High" priority should be fixed first.'
      },
    },
    {
      id: 1032,
      term: language === 'ru' ? 'Серьёзность' : 'Severity',
      definition: language === 'ru'
        ? 'Степень влияния дефекта на работу системы.'
        : 'The impact of a defect on the system operation.',
      category: 'general',
      example: {
        ru: 'Серьёзность: критическая — из-за бага невозможно оформить заказ.',
        en: 'Severity: critical — due to the bug, it is impossible to place an order.'
      },
    },
    {
      id: 1033,
      term: language === 'ru' ? 'Трассируемость' : 'Traceability',
      definition: language === 'ru'
        ? 'Способность отследить связь между требованиями, тестами и дефектами.'
        : 'The ability to trace the relationship between requirements, tests, and defects.',
      category: 'general',
      example: {
        ru: 'Трассируемость позволяет понять, какой тест покрывает конкретное требование.',
        en: 'Traceability allows you to see which test covers a specific requirement.'
      },
    },
    {
      id: 1034,
      term: language === 'ru' ? 'Выполнение теста' : 'Test Execution',
      definition: language === 'ru'
        ? 'Процесс запуска тестов и фиксации результатов.'
        : 'The process of running tests and recording results.',
      category: 'general',
      example: {
        ru: 'Выполнение теста: автотесты запущены на сервере и результаты сохранены в отчёте.',
        en: 'Test execution: automated tests are run on the server and results are saved in the report.'
      },
    },
    {
      id: 1035,
      term: language === 'ru' ? 'Журнал тестирования' : 'Test Log',
      definition: language === 'ru'
        ? 'Запись всех действий и событий, произошедших во время тестирования.'
        : 'A record of all actions and events during testing.',
      category: 'general',
      example: {
        ru: 'В журнале тестирования зафиксированы все шаги и найденные ошибки за день.',
        en: 'The test log records all steps and found errors for the day.'
      },
    },
  ];

  const categories = [
    { id: 'all', name: t.allCategories },
    { id: 'functional', name: t.functional },
    { id: 'nonFunctional', name: t.nonFunctional },
    { id: 'automation', name: t.automation },
    { id: 'methodology', name: t.methodology },
    { id: 'tools', name: t.tools },
    { id: 'general', name: language === 'ru' ? 'Общие термины' : 'General' },
  ];

  const filteredGlossary = useMemo(
    () =>
      glossaryData.filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch =
          item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [glossaryData, selectedCategory, searchTerm]
  );

  const totalPages = useMemo(
    () => Math.ceil(filteredGlossary.length / termsPerPage),
    [filteredGlossary.length, termsPerPage]
  );
  const paginatedGlossary = useMemo(
    () => filteredGlossary.slice((currentPage - 1) * termsPerPage, currentPage * termsPerPage),
    [filteredGlossary, currentPage, termsPerPage]
  );

  // Сброс страницы при смене фильтра или поиска
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, language]);

  // Плавная прокрутка к началу при смене страницы
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Цвета для категорий
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'functional':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'nonFunctional':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'automation':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'methodology':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'tools':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'general':
        return 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t.title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">{t.subtitle}</p>
      </div>

      {/* Поиск и фильтры */}
      <GlossarySearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        t={t}
      />

      {/* Результаты */}
      {filteredGlossary.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            {t.noResults}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'ru'
              ? 'Попробуйте изменить поисковый запрос или категорию'
              : 'Try changing your search query or category'}
          </p>
        </div>
      ) : (
        <GlossaryList
          paginatedGlossary={paginatedGlossary}
          categories={categories}
          language={language}
          getCategoryColor={getCategoryColor}
        />
      )}

      {/* Пагинация */}
      <GlossaryPagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Статистика */}
      <GlossaryStats
        paginatedCount={paginatedGlossary.length}
        filteredCount={filteredGlossary.length}
        currentPage={currentPage}
        totalPages={totalPages}
        language={language}
      />
    </div>
  );
}
