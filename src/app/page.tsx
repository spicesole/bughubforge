'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import News from '@/components/News'

export default function Home() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru')

  // Инициализация языка из localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage === 'en' || savedLanguage === 'ru') {
      setLanguage(savedLanguage)
    }
  }, [])

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
        tests: 'Тесты и упражнения',
        glossaryDesc: 'Основные термины тестирования с объяснениями',
        resourcesDesc: 'Книги, статьи, видео и другие полезные материалы',
        testsDesc: 'Практические задания для закрепления знаний'
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
        tests: 'Tests and exercises',
        glossaryDesc: 'Basic testing terms with explanations',
        resourcesDesc: 'Books, articles, videos and other useful materials',
        testsDesc: 'Practical tasks to consolidate knowledge'
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
          { title: t.features.glossary, description: t.features.glossaryDesc, url: '/glossary', icon: 'glossary' },
          { title: t.features.resources, description: t.features.resourcesDesc, url: '/resources', icon: 'resources' },
          { title: t.features.tests, description: t.features.testsDesc, url: '/tests', icon: 'tests' }
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