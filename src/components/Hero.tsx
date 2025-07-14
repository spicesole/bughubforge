import { useLanguage } from './useLanguage';
import { fixHangingPrepositions } from '../utils/fixHangingPrepositions';

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
      <div className="container-ipad py-12 md:py-20 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {language === 'ru' ? (
            <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(t.title) }} />
          ) : t.title}
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          {language === 'ru' ? (
            <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(t.subtitle) }} />
          ) : t.subtitle}
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            className="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
            onClick={handleStartLearning}
          >
            {t.startLearning}
          </button>
          <button
            className="bg-primary-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-primary-800 transition-colors"
            onClick={handleLearnMore}
          >
            {t.learnMore}
          </button>
        </div>
      </div>
    </div>
  );
}
