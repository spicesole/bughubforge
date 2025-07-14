import React from 'react';

interface GlossaryPaginationProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const GlossaryPagination: React.FC<GlossaryPaginationProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  if (totalPages <= 1) return null;

  // Новая логика: отображать по 5 страниц за раз, стрелки листают блоки по 5, но не меняют текущую страницу
  const pagesPerBlock = 5;
  const [block, setBlock] = React.useState(Math.floor((currentPage - 1) / pagesPerBlock));
  React.useEffect(() => {
    setBlock(Math.floor((currentPage - 1) / pagesPerBlock));
  }, [currentPage]);
  const blockStart = block * pagesPerBlock + 1;
  const blockEnd = Math.min(blockStart + pagesPerBlock - 1, totalPages);
  const pageNumbers = [];
  for (let i = blockStart; i <= blockEnd; i++) pageNumbers.push(i);

  const canGoPrevBlock = blockStart > 1;
  const canGoNextBlock = blockEnd < totalPages;

  return (
    <div className="w-full max-w-full overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex justify-center mt-8 gap-2 whitespace-nowrap items-center">
        {/* Стрелка влево */}
        <button
          onClick={() => {
            if (canGoPrevBlock) setBlock(block - 1);
          }}
          disabled={!canGoPrevBlock}
          aria-label="Previous block"
          className={`rounded-full p-2 border text-lg font-bold transition-colors min-w-[36px] md:min-w-[40px] mr-2 shadow-sm
            ${
              !canGoPrevBlock
                ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800'
            }
          `}
        >
          ←
        </button>
        {/* Номера страниц */}
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-full border transition-all duration-150 min-w-[36px] md:min-w-[40px] font-medium text-sm md:text-sm px-2 text-xs mx-0.5
              ${
                currentPage === page
                  ? 'bg-blue-600 text-white border-blue-600 scale-110 shadow-lg z-10'
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-blue-100 dark:hover:bg-blue-800'
              }
            `}
            style={currentPage === page ? { fontWeight: 700 } : {}}
          >
            {page}
          </button>
        ))}
        {/* Стрелка вправо */}
        <button
          onClick={() => {
            if (canGoNextBlock) setBlock(block + 1);
          }}
          disabled={!canGoNextBlock}
          aria-label="Next block"
          className={`rounded-full p-2 border text-lg font-bold transition-colors min-w-[36px] md:min-w-[40px] ml-2 shadow-sm
            ${
              !canGoNextBlock
                ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-800'
            }
          `}
        >
          →
        </button>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default GlossaryPagination;
