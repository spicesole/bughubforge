import React from 'react';

interface Category {
  id: string;
  name: string;
}

interface GlossaryCategoryBadgeProps {
  category: string;
  categories: Category[];
  language: 'ru' | 'en';
  getCategoryColor: (category: string) => string;
}

const GlossaryCategoryBadge: React.FC<GlossaryCategoryBadgeProps> = ({
  category,
  categories,
  language,
  getCategoryColor,
}) => {
  const cat = categories.find((cat) => cat.id === category)?.name || '';
  if (cat === 'Нефункциональное тестирование') {
    return (
      <span
        lang={language}
        className={`inline-block whitespace-normal break-words max-w-[180px] sm:max-w-xs mt-3 px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full text-center align-middle ${getCategoryColor(category)}`}
        title={cat}
      >
        <span>Нефункциональное</span>
        <br />
        <span>тестирование</span>
      </span>
    );
  }
  if (cat === 'Non-Functional Testing') {
    return (
      <span
        lang={language}
        className={`inline-block whitespace-normal break-words max-w-[180px] sm:max-w-xs mt-3 px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full text-center align-middle ${getCategoryColor(category)}`}
        title={cat}
      >
        <span>Non-Functional</span>
        <br />
        <span>Testing</span>
      </span>
    );
  }
  if (cat === 'Функциональное тестирование') {
    return (
      <span
        lang={language}
        className={`inline-block whitespace-normal break-words max-w-[180px] sm:max-w-xs mt-3 px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full text-center align-middle ${getCategoryColor(category)}`}
        title={cat}
      >
        <span>Функциональное</span>
        <br />
        <span>тестирование</span>
      </span>
    );
  }
  if (cat === 'Functional Testing') {
    return (
      <span
        lang={language}
        className={`inline-block whitespace-normal break-words max-w-[180px] sm:max-w-xs mt-3 px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full text-center align-middle ${getCategoryColor(category)}`}
        title={cat}
      >
        <span>Functional</span>
        <br />
        <span>Testing</span>
      </span>
    );
  }
  return (
    <span
      lang={language}
      className={`inline-block whitespace-normal break-words max-w-[180px] sm:max-w-xs mt-3 px-2 sm:px-3 py-1 text-[11px] sm:text-xs font-medium rounded-full text-center align-middle ${getCategoryColor(category)}`}
      title={cat}
    >
      {cat}
    </span>
  );
};

export default GlossaryCategoryBadge;
