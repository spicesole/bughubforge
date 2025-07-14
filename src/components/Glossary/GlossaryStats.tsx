import React from 'react';
import { fixHangingPrepositions } from '../../utils/fixHangingPrepositions';

interface GlossaryStatsProps {
  paginatedCount: number;
  filteredCount: number;
  currentPage: number;
  totalPages: number;
  language: 'ru' | 'en';
}

const GlossaryStats: React.FC<GlossaryStatsProps> = ({
  paginatedCount,
  filteredCount,
  currentPage,
  totalPages,
  language,
}) => (
  <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
    {language === 'ru' ? (
      <span dangerouslySetInnerHTML={{ 
        __html: fixHangingPrepositions(`Показано ${paginatedCount} из ${filteredCount} терминов (стр. ${currentPage} из ${totalPages})`) 
      }} />
    ) : (
      `Showing ${paginatedCount} of ${filteredCount} terms (page ${currentPage} of ${totalPages})`
    )}
  </div>
);

export default GlossaryStats;
