import { useLanguage } from './useLanguage';

type HeroTranslation = {
  title: string;
  subtitle: string;
  startLearning: string;
  learnMore: string;
};
import ruHero from '../locales/ru.json';
import enHero from '../locales/en.json';

const translations: Record<'ru' | 'en', HeroTranslation> = {
  ru: (ruHero as unknown as { hero: HeroTranslation }).hero,
  en: (enHero as unknown as { hero: HeroTranslation }).hero,
};

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];

  const handleStartLearning = () => {
    window.location.href = '/tests';
  };

  const handleLearnMore = () => {
    const featuresSection = document.querySelector('[data-section="features"]');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 ipad-fix">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
          {t.title}
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8">{t.subtitle}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleStartLearning}
            className="inline-block px-8 py-3 text-base font-semibold rounded-lg border border-primary-700 text-primary-700 bg-white hover:bg-primary-700 hover:text-white transition dark:bg-white dark:text-primary-700 dark:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white"
          >
            {t.startLearning}
          </button>
          <button
            onClick={handleLearnMore}
            className="inline-block px-8 py-3 text-base font-semibold rounded-lg border border-primary-700 text-primary-700 bg-white hover:bg-primary-700 hover:text-white transition dark:bg-white dark:text-primary-700 dark:border-primary-700 dark:hover:bg-primary-700 dark:hover:text-white"
          >
            {t.learnMore}
          </button>
        </div>
      </div>
    </div>
  );
}
