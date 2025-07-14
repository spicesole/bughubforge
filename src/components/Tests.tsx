'use client';

import { useState, useEffect, useMemo } from 'react';
import { getTests, type Test, type Difficulty, type Question } from '../data/tests';
import TestList from './Tests/TestList';
import TestRunner from './Tests/TestRunner';
import TestResults from './Tests/TestResults';
import TestMistakes from './Tests/TestMistakes';
import ru from '../locales/ru.json';
import en from '../locales/en.json';
import { useLanguage } from './useLanguage';
import { fixHangingPrepositions } from '../utils/fixHangingPrepositions';

const translations = { ru: ru.tests, en: en.tests };

// Функция для перемешивания массива (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Перемешивание вопросов и вариантов ответов для обоих языков
function prepareTest(test: Test): Test {
  // Перемешиваем вопросы
  const shuffledQuestions = shuffleArray(test.questions).map((q: Question) => {
    // Перемешиваем варианты ответа отдельно для ru и en
    const shuffleOptions = (options: string[], correctIdx: number) => {
      const optionsWithIndex = options.map((option, idx) => ({ option, idx }));
      const shuffled = shuffleArray(optionsWithIndex);
      const newCorrectIndex = shuffled.findIndex(
        (item: { option: string; idx: number }) => item.idx === correctIdx
      );
      return {
        options: shuffled.map((item: { option: string; idx: number }) => item.option),
        correctAnswer: newCorrectIndex,
      };
    };
    const ru = shuffleOptions(q.options.ru, q.correctAnswer);
    const en = shuffleOptions(q.options.en, q.correctAnswer);
    return {
      ...q,
      options: {
        ru: ru.options,
        en: en.options,
      },
      correctAnswer: ru.correctAnswer, // Индекс правильного ответа для ru (используется для текущего языка)
    };
  });
  return { ...test, questions: shuffledQuestions };
}

function getDifficultyLabel(difficulty: Difficulty, t: Record<string, string>) {
  switch (difficulty) {
    case 'beginner':
      return t.beginnerFull;
    case 'intermediate':
      return t.intermediateFull;
    case 'advanced':
      return t.advancedFull;
    default:
      return '';
  }
}

export default function Tests() {
  const { language } = useLanguage();
  const lang = language as 'ru' | 'en';
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<'' | Difficulty>('');
  const [showMistakes, setShowMistakes] = useState(false);
  const t: Record<string, string> = translations[language];

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  useEffect(() => {
    const handler = () => setSelectedTest(null);
    window.addEventListener('reset-test-selection', handler);
    return () => window.removeEventListener('reset-test-selection', handler);
  }, []);

  // Фильтрация по сложности
  const filteredTests = useMemo(
    () =>
      difficultyFilter
        ? getTests().filter((test) => test.difficulty === difficultyFilter)
        : getTests(),
    [difficultyFilter]
  );

  const startTest = (test: Test) => {
    const randomizedTest = prepareTest(test);
    setSelectedTest(randomizedTest);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers(new Array(randomizedTest.questions.length).fill(-1));
    setShowResults(false);
    setShowExplanation(false);
    setShowMistakes(false);
  };

  const handleNext = () => {
    if (selectedAnswer !== null && selectedTest) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < selectedTest.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        setShowResults(true);
      }
    }
  };

  const handleFinish = () => {
    if (selectedAnswer !== null && selectedTest) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    if (!selectedTest) return 0;
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === selectedTest.questions[index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / selectedTest.questions.length) * 100);
  };

  const resetTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
    setShowExplanation(false);
    setShowMistakes(false);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers(selectedTest ? new Array(selectedTest.questions.length).fill(-1) : []);
    setShowResults(false);
    setShowExplanation(false);
    setShowMistakes(false);
  };

  // Вычисляем ошибки (индексы вопросов, где ответ неверный)
  const mistakes = useMemo(() => {
    if (!selectedTest) return [];
    return answers
      .map((answer, idx) => (answer !== selectedTest.questions[idx].correctAnswer ? idx : -1))
      .filter((idx) => idx !== -1);
  }, [answers, selectedTest]);

  if (showMistakes && selectedTest) {
    return (
      <TestMistakes
        test={selectedTest}
        answers={answers}
        t={t}
        resetTest={resetTest}
        restartTest={restartTest}
        lang={lang}
      />
    );
  }

  if (showResults && selectedTest) {
    return (
      <TestResults
        test={selectedTest}
        answers={answers}
        t={t}
        score={calculateScore()}
        resetTest={resetTest}
        restartTest={restartTest}
        setShowMistakes={setShowMistakes}
      />
    );
  }

  if (selectedTest) {
    return (
      <TestRunner
        test={selectedTest}
        currentQuestion={currentQuestion}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={setSelectedAnswer}
        showExplanation={showExplanation}
        setShowExplanation={setShowExplanation}
        handleNext={handleNext}
        handleFinish={handleFinish}
        t={t}
        showResults={showResults}
        onBack={resetTest}
        mistakes={mistakes}
        lang={lang}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        {t.tests}
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-300 mb-8">
        {language === 'ru' ? (
          <span dangerouslySetInnerHTML={{ __html: fixHangingPrepositions(t.subtitle) }} />
        ) : (
          t.subtitle
        )}
      </p>
      <TestList
        tests={filteredTests}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        t={t}
        startTest={startTest}
        difficultyColors={difficultyColors}
        getDifficultyLabel={getDifficultyLabel}
        lang={lang}
      />
    </div>
  );
}
