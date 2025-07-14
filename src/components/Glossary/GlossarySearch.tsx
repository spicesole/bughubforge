import React from 'react';
import { fixHangingPrepositions } from '../../utils/fixHangingPrepositions';

interface Category {
  id: string;
  name: string;
}

interface GlossarySearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  t: Record<string, string>;
  language: 'ru' | 'en';
}

const GlossarySearch: React.FC<GlossarySearchProps> = ({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  t,
  language,
}) => (
  <div className="mb-8 space-y-4">
    <div className="relative">
      <input
        type="text"
        placeholder={language === 'ru' ? fixHangingPrepositions(t.search) : t.search}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      />
      <svg
        className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {language === 'ru' ? (
            <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(category.name) }} />
          ) : category.name}
        </button>
      ))}
    </div>
  </div>
);

export default GlossarySearch;
