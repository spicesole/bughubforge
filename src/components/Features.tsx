'use client';

import { useLanguage } from './useLanguage';
import ruFeatures from '../locales/ru.json';
import enFeatures from '../locales/en.json';
import { fixHangingPrepositions } from '../utils/fixHangingPrepositions';

interface Feature {
  title: string;
  description: string;
  url: string;
  icon: 'glossary' | 'resources' | 'tests';
}

type FeaturesTranslation = { title: string; items: Array<{ title: string; description: string }> };

const translations: Record<'ru' | 'en', FeaturesTranslation> = {
  ru: (ruFeatures as unknown as { features: FeaturesTranslation }).features,
  en: (enFeatures as unknown as { features: FeaturesTranslation }).features,
};

export default function Features() {
  const { language } = useLanguage();
  const t = translations[language];

  const features: Feature[] = [
    {
      title: t.items[0].title,
      description: t.items[0].description,
      url: '/glossary',
      icon: 'glossary',
    },
    {
      title: t.items[1].title,
      description: t.items[1].description,
      url: '/resources',
      icon: 'resources',
    },
    {
      title: t.items[2].title,
      description: t.items[2].description,
      url: '/tests',
      icon: 'tests',
    },
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'glossary':
        return (
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
      case 'resources':
        return (
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        );
      case 'tests':
        return (
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-900" data-section="features">
      <div className="container-ipad">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-8">
          {language === 'ru' ? (
            <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(t.title) }} />
          ) : (
            t.title
          )}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <a
              key={feature.title}
              href={feature.url}
              className="block bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                {getIcon(feature.icon)}
                <span className="ml-3 text-lg font-semibold">
                  {language === 'ru' ? (
                    <span
                      dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(feature.title) }}
                    />
                  ) : (
                    feature.title
                  )}
                </span>
              </div>
              {language === 'ru' ? (
                <p
                  className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
                  style={{ wordBreak: 'keep-all' }}
                  dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(feature.description) }}
                />
              ) : (
                <p
                  className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap"
                  style={{ wordBreak: 'keep-all' }}
                >
                  {feature.description}
                </p>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
