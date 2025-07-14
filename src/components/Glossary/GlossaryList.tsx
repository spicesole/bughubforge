import React from 'react';
import GlossaryCategoryBadge from './GlossaryCategoryBadge';
import { fixHangingPrepositions } from '../../utils/fixHangingPrepositions';

interface GlossaryItem {
  id: number;
  term: string;
  definition: string;
  category: string;
  example?: {
    ru: string;
    en: string;
  };
}

interface Category {
  id: string;
  name: string;
}

interface GlossaryListProps {
  paginatedGlossary: GlossaryItem[];
  categories: Category[];
  language: 'ru' | 'en';
  getCategoryColor: (category: string) => string;
}

const GlossaryList: React.FC<GlossaryListProps> = ({
  paginatedGlossary,
  categories,
  language,
  getCategoryColor,
}) => {
  const [showExample, setShowExample] = React.useState<number | null>(null);

  return (
    <div className="space-y-6">
      {paginatedGlossary.map((item) => (
        <div
          key={item.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            {language === 'ru' ? (
              <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(item.term) }} />
            ) : item.term}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs sm:text-sm md:text-lg lg:text-xl">
            {language === 'ru' ? (
              <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(item.definition) }} />
            ) : item.definition}
          </p>
          <div className="flex justify-between items-center gap-2">
            <div>
              {item.example && (
                <button
                  className="px-3 py-1 rounded bg-blue-100 text-blue-800 text-xs font-semibold hover:bg-blue-200 transition-colors"
                  onClick={() => setShowExample(showExample === item.id ? null : item.id)}
                >
                  {showExample === item.id
                    ? language === 'ru'
                      ? 'Скрыть пример'
                      : 'Hide Example'
                    : language === 'ru'
                      ? 'Пример'
                      : 'Example'}
                </button>
              )}
            </div>
            <GlossaryCategoryBadge
              category={item.category}
              categories={categories}
              language={language}
              getCategoryColor={getCategoryColor}
            />
          </div>
          {item.example && showExample === item.id && (
            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm border border-gray-200 dark:border-gray-700">
              {language === 'ru' ? (
                <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(item.example[language]) }} />
              ) : item.example[language]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GlossaryList;
