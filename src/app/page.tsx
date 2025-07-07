'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import News from '@/components/News'

export default function Home() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru')

  const translations = {
    ru: {
      title: 'Добро пожаловать в мир тестирования!',
      subtitle: 'Образовательная платформа для начинающих тестировщиков',
      hero: {
        startLearning: 'Начать обучение',
        learnMore: 'Узнать больше'
      },
      features: {
        title: 'Что вы найдете на нашем сайте',
        glossary: 'Глоссарий терминов',
        resources: 'Полезные ресурсы',
        news: 'Новости QA',
        tests: 'Тесты и упражнения',
        glossaryDesc: 'Основные термины тестирования с объяснениями',
        resourcesDesc: 'Книги, статьи, видео и другие полезные материалы',
        newsDesc: 'Актуальные новости из мира тестирования программного обеспечения',
        testsDesc: 'Практические задания для закрепления знаний'
      },
      forum: {
        title: 'Мини-форум',
        subtitle: 'Делитесь своими находками, задавайте вопросы и общайтесь с другими тестировщиками',
        addMessage: 'Добавить сообщение',
        yourName: 'Ваше имя',
        yourNamePlaceholder: 'Введите ваше имя',
        message: 'Сообщение',
        messagePlaceholder: 'Поделитесь своими находками или задайте вопрос...',
        sendMessage: 'Отправить сообщение',
        messages: 'Сообщения',
        noMessages: 'Пока нет сообщений. Будьте первым!'
      },
      footer: {
        rights: 'Все права защищены.'
      }
    },
    en: {
      title: 'Welcome to the World of Testing!',
      subtitle: 'Educational platform for beginner testers',
      hero: {
        startLearning: 'Start Learning',
        learnMore: 'Learn More'
      },
      features: {
        title: 'What you will find on our site',
        glossary: 'Glossary of terms',
        resources: 'Useful resources',
        news: 'QA News',
        tests: 'Tests and exercises',
        glossaryDesc: 'Basic testing terms with explanations',
        resourcesDesc: 'Books, articles, videos and other useful materials',
        newsDesc: 'Latest news from the world of software testing',
        testsDesc: 'Practical tasks to consolidate knowledge'
      },
      forum: {
        title: 'Mini Forum',
        subtitle: 'Share your findings, ask questions and communicate with other testers',
        addMessage: 'Add Message',
        yourName: 'Your Name',
        yourNamePlaceholder: 'Enter your name',
        message: 'Message',
        messagePlaceholder: 'Share your findings or ask a question...',
        sendMessage: 'Send Message',
        messages: 'Messages',
        noMessages: 'No messages yet. Be the first!'
      },
      footer: {
        rights: 'All rights reserved.'
      }
    }
  }

  const t = translations[language]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 ipad-fix">
      <Header language={language} setLanguage={setLanguage} />
      
      <main>
        <Hero 
          title={t.title}
          subtitle={t.subtitle}
          startLearning={t.hero.startLearning}
          learnMore={t.hero.learnMore}
        />
        
        <Features 
          title={t.features.title}
          features={[
            { title: t.features.glossary, description: t.features.glossaryDesc },
            { title: t.features.resources, description: t.features.resourcesDesc },
            { title: t.features.news, description: t.features.newsDesc },
            { title: t.features.tests, description: t.features.testsDesc }
          ]}
        />
        
        <News language={language} />
      </main>
      
      <footer className="bg-gray-800 dark:bg-gray-950 text-white py-8 md:py-12">
        <div className="container-ipad text-center">
          <p className="text-sm md:text-base">
            © 2025 BugHubForge. {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  )
} 