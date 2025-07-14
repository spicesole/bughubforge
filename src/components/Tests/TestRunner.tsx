'use client';

import React from 'react';
import type { Test } from '../../data/tests';

interface TestRunnerProps {
  test: Test;
  currentQuestion: number;
  selectedAnswer: number | null;
  setSelectedAnswer: (idx: number) => void;
  showExplanation: boolean;
  setShowExplanation: (show: boolean) => void;
  handleNext: () => void;
  handleFinish: () => void;
  t: Record<string, string>;
  showResults: boolean;
  onBack: () => void;
  mistakes?: number[];
  lang: 'ru' | 'en';
}

const TestRunner: React.FC<TestRunnerProps> = ({
  test,
  currentQuestion,
  selectedAnswer,
  setSelectedAnswer,
  showExplanation,
  setShowExplanation,
  handleNext,
  handleFinish,
  t,
  showResults,
  onBack,
  mistakes = [],
  lang,
}) => {
  const question = test.questions[currentQuestion];
  const isLast = currentQuestion === test.questions.length - 1;

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">{t.results}</h2>
        <div className="mb-4">
          {t.correct}: {test.questions.length - mistakes.length} {t.of} {test.questions.length}
        </div>
        {mistakes.length > 0 && (
          <div className="mb-4">
            <strong>{t.incorrect}:</strong>
            <ul className="list-disc ml-6 mt-2">
              {mistakes.map((idx: number) => (
                <li key={idx}>
                  <div className="mb-1">
                    <span className="font-semibold">{test.questions[idx].question[lang]}</span>
                  </div>
                  <div>
                    {t.correct}:{' '}
                    {test.questions[idx].options[lang][test.questions[idx].correctAnswer]}
                  </div>
                  <div className="text-yellow-700 dark:text-yellow-300">
                    {t.explanation}: {test.questions[idx].explanation[lang]}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          onClick={onBack}
        >
          {t.tryAgain}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {t.question} {currentQuestion + 1} {t.of} {test.questions.length}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {question.question[lang]}
      </h3>
      <div className="space-y-2 mb-6">
        {Array.isArray(question.options[lang]) ? (
          question.options[lang].map((option: string, idx: number) => (
            <button
              key={idx}
              onClick={() => setSelectedAnswer(idx)}
              className={`w-full text-left px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selectedAnswer === idx
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              disabled={showResults}
            >
              {option}
            </button>
          ))
        ) : (
          <div style={{ color: 'red' }}>{t.selectAnswer}</div>
        )}
      </div>
      {showExplanation && (
        <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg text-yellow-800 dark:text-yellow-200">
          <strong>{t.explanation}:</strong> {question.explanation[lang]}
        </div>
      )}
      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <button
          className="px-4 py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors w-full sm:w-auto"
          onClick={onBack}
        >
          {t.backToTests}
        </button>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors w-full sm:w-auto"
        >
          {t.explanation}
        </button>
        {!isLast ? (
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 w-full sm:w-auto sm:ml-auto"
          >
            {t.next}
          </button>
        ) : (
          <button
            onClick={handleFinish}
            disabled={selectedAnswer === null}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 w-full sm:w-auto sm:ml-auto"
          >
            {t.finish}
          </button>
        )}
      </div>
    </div>
  );
};

export default TestRunner;
