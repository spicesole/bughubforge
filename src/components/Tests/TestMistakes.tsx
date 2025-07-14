import React from 'react';
import { Test } from '../../data/tests';

interface TestMistakesProps {
  test: Test;
  answers: number[];
  t: Record<string, string>;
  resetTest: () => void;
  restartTest: () => void;
  lang: 'ru' | 'en';
}

const TestMistakes: React.FC<TestMistakesProps> = ({
  test,
  answers,
  t,
  resetTest,
  restartTest,
  lang,
}) => {
  const mistakes = test.questions
    .map((q, idx) => ({
      ...q,
      userAnswer: answers[idx],
      isCorrect: answers[idx] === q.correctAnswer,
    }))
    .filter((q) => !q.isCorrect);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t.viewMistakes}</h2>
      {mistakes.length === 0 ? (
        <div className="text-green-600 dark:text-green-400 font-semibold mb-4">
          {t.perfectScore}
        </div>
      ) : (
        <div className="space-y-6">
          {mistakes.map((q) => (
            <div key={q.id} className="border-b pb-4 mb-4">
              <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {t.question} {test.questions.findIndex((qq) => qq.id === q.id) + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {q.question[lang]}
              </h3>
              <div className="mb-2">
                <span className="font-semibold text-red-600 dark:text-red-400">{t.incorrect}:</span>{' '}
                {q.options[lang][q.userAnswer] || '-'}
              </div>
              <div className="mb-2">
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {t.correct}:
                </span>{' '}
                {q.options[lang][q.correctAnswer]}
              </div>
              <div className="mb-2 p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg text-yellow-800 dark:text-yellow-200">
                <strong>{t.explanation}:</strong> {q.explanation[lang]}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          onClick={restartTest}
        >
          {t.tryAgain}
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition-colors"
          onClick={resetTest}
        >
          {t.backToTests}
        </button>
      </div>
    </div>
  );
};

export default TestMistakes;
