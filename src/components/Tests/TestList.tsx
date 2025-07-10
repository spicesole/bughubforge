import React from 'react';
import { Test, Difficulty } from '../../data/tests';

interface TestListProps {
  tests: Test[];
  difficultyFilter: '' | Difficulty;
  setDifficultyFilter: (value: '' | Difficulty) => void;
  t: Record<string, string>;
  startTest: (test: Test) => void;
  difficultyColors: Record<string, string>;
  getDifficultyLabel: (difficulty: Difficulty, t: Record<string, string>) => string;
  lang: 'ru' | 'en';
}

const TestList: React.FC<TestListProps> = ({
  tests,
  difficultyFilter,
  setDifficultyFilter,
  t,
  startTest,
  difficultyColors,
  getDifficultyLabel,
  lang,
}) => (
  <div>
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
          difficultyFilter === ''
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
        }`}
        onClick={() => setDifficultyFilter('')}
      >
        {t.allLevels}
      </button>
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
          difficultyFilter === 'beginner'
            ? 'bg-green-600 text-white border-green-600'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
        }`}
        onClick={() => setDifficultyFilter('beginner')}
      >
        {t.beginnerFull}
      </button>
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
          difficultyFilter === 'intermediate'
            ? 'bg-yellow-500 text-white border-yellow-500'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
        }`}
        onClick={() => setDifficultyFilter('intermediate')}
      >
        {t.intermediateFull}
      </button>
      <button
        className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors ${
          difficultyFilter === 'advanced'
            ? 'bg-red-600 text-white border-red-600'
            : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
        }`}
        onClick={() => setDifficultyFilter('advanced')}
      >
        {t.advancedFull}
      </button>
    </div>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tests.length === 0 ? (
        <div className="col-span-full text-center text-gray-500 dark:text-gray-400">
          {t.tests} {t.notFound || 'не найдены'}
        </div>
      ) : (
        tests.map((test) => (
          <div
            key={test.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {test.title[lang]}
              </h3>
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 mb-2 ${difficultyColors[test.difficulty]}`}
              >
                {getDifficultyLabel(test.difficulty, t)}
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{test.description[lang]}</p>
            </div>
            <button
              className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              onClick={() => startTest(test)}
            >
              {t.startTest}
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);

export default TestList;
