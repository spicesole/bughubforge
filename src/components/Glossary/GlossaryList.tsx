import React from 'react';
import GlossaryCategoryBadge from './GlossaryCategoryBadge';

interface GlossaryItem {
  id: number;
  term: string;
  definition: string;
  category: string;
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
}) => (
  <div className="space-y-6">
    {paginatedGlossary.map((item) => (
      <div
        key={item.id}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{item.term}</h3>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-xs sm:text-sm md:text-lg lg:text-xl">
          {item.definition}
        </p>
        <GlossaryCategoryBadge
          category={item.category}
          categories={categories}
          language={language}
          getCategoryColor={getCategoryColor}
        />
      </div>
    ))}
  </div>
);

export default GlossaryList;
