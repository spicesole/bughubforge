import React from 'react';
import { Test } from '../../data/tests';

interface TestResultsProps {
  test: Test;
  answers: number[];
  t: Record<string, string>;
  score: number;
  resetTest: () => void;
  restartTest: () => void;
  setShowMistakes: (show: boolean) => void;
}

const TestResults: React.FC<TestResultsProps> = ({
  test,
  answers,
  t,
  score,
  resetTest,
  restartTest,
  setShowMistakes,
}) => {
  const allCorrect = answers.every((answer, idx) => answer === test.questions[idx].correctAnswer);

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t.results}</h2>
      <div className="text-lg mb-2">
        {t.score}: <span className="font-semibold">{score}%</span>
      </div>
      {allCorrect ? (
        <>
          <div className="text-green-600 dark:text-green-400 font-semibold mb-2">
            {t.perfectScore}
          </div>
          <div className="text-gray-600 dark:text-gray-400 mb-4">{t.perfectScoreDesc}</div>
        </>
      ) : (
        <div className="text-yellow-600 dark:text-yellow-400 mb-4">{t.testCompleted}</div>
      )}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
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
        <button
          className="px-4 py-2 rounded-lg bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors"
          onClick={() => setShowMistakes(true)}
        >
          {t.viewMistakes}
        </button>
      </div>
    </div>
  );
};

export default TestResults;
