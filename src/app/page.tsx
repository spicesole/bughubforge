'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import News from '@/components/News';
import Head from 'next/head';
import { useLanguage } from '@/components/useLanguage';

export default function Home() {
  const { language } = useLanguage();

  const translations = {
    ru: {
      title: 'Добро пожаловать в мир тестирования!',
      subtitle: 'Образовательная платформа для начинающих тестировщиков',
      hero: {
        startLearning: 'Начать обучение',
        learnMore: 'Узнать больше',
      },
      features: {
        title: 'Что вы найдете на нашем сайте',
        glossary: 'Глоссарий терминов',
        resources: 'Полезные ресурсы',
        tests: 'Тесты и упражнения',
        glossaryDesc: 'Основные термины тестирования с объяснениями',
        resourcesDesc: 'Книги, статьи, видео и другие полезные материалы',
        testsDesc: 'Практические задания для закрепления знаний',
      },

      footer: {
        rights: 'Все права защищены.',
      },
    },
    en: {
      title: 'Welcome to the World of Testing!',
      subtitle: 'Educational platform for beginner testers',
      hero: {
        startLearning: 'Start Learning',
        learnMore: 'Learn More',
      },
      features: {
        title: 'What you will find on our site',
        glossary: 'Glossary of terms',
        resources: 'Useful resources',
        tests: 'Tests and exercises',
        glossaryDesc: 'Basic testing terms with explanations',
        resourcesDesc: 'Books, articles, videos and other useful materials',
        testsDesc: 'Practical tasks to consolidate knowledge',
      },

      footer: {
        rights: 'All rights reserved.',
      },
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white" role="main">
      <Head>
        <title>BugHubForge — образовательная платформа для тестировщиков</title>
        <meta
          name="description"
          content="Изучайте тестирование программного обеспечения с помощью глоссария терминов, полезных ресурсов, актуальных новостей и практических заданий. Всё для начинающих и опытных QA-специалистов!"
        />
      </Head>
      <Header />

      <main>
        <Hero />
        <Features />
        <News />
      </main>

      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 md:py-12">
        <div className="container-ipad text-center">
          <p className="text-sm md:text-base">© 2025 BugHubForge. {t.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
}
