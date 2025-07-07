'use client'

import { useState } from 'react'
import { getTests, type Test, type Question, type Difficulty } from '../data/tests'

const translations = {
  ru: {
    tests: 'Тесты',
    startTest: 'Начать тест',
    question: 'Вопрос',
    of: 'из',
    next: 'Следующий',
    finish: 'Завершить',
    results: 'Результаты',
    correct: 'Правильно',
    incorrect: 'Неверно',
    score: 'Результат',
    explanation: 'Объяснение',
    tryAgain: 'Попробовать снова',
    backToTests: 'К тестам',
    selectAnswer: 'Выберите ответ',
    testCompleted: 'Тест завершен!',
    perfectScore: 'Отлично! Все ответы правильные!',
    perfectScoreDesc: 'Вы отлично справились с тестом. Продолжайте изучать материалы!',
    difficulty: 'Сложность',
    allLevels: 'Все уровни',
    beginner: 'Нач.',
    intermediate: 'Сред.',
    advanced: 'Прод.',
    beginnerFull: 'Начинающий',
    intermediateFull: 'Средний',
    advancedFull: 'Продвинутый',
    viewMistakes: 'Посмотреть ошибки',
    questions: 'вопросов'
  },
  en: {
    tests: 'Tests',
    startTest: 'Start Test',
    question: 'Question',
    of: 'of',
    next: 'Next',
    finish: 'Finish',
    results: 'Results',
    correct: 'Correct',
    incorrect: 'Incorrect',
    score: 'Score',
    explanation: 'Explanation',
    tryAgain: 'Try Again',
    backToTests: 'Back to Tests',
    selectAnswer: 'Select an answer',
    testCompleted: 'Test completed!',
    perfectScore: 'Excellent! All answers are correct!',
    perfectScoreDesc: 'You did great on the test. Keep studying the materials!',
    difficulty: 'Difficulty',
    allLevels: 'All levels',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    beginnerFull: 'Beginner',
    intermediateFull: 'Intermediate',
    advancedFull: 'Advanced',
    viewMistakes: 'View mistakes',
    questions: 'questions'
  }
}

interface TestsProps {
  language: 'ru' | 'en'
}

// Функция для перемешивания массива (Fisher-Yates)
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Перемешивание вопросов и вариантов ответов
function prepareTest(test: Test): Test {
  // Перемешиваем вопросы
  const shuffledQuestions = shuffleArray(test.questions).map((q) => {
    // Перемешиваем варианты ответа и пересчитываем индекс правильного ответа
    const optionsWithIndex = q.options.map((option, idx) => ({ option, idx }))
    const shuffledOptions = shuffleArray(optionsWithIndex)
    const newCorrectIndex = shuffledOptions.findIndex(
      (item) => item.idx === q.correctAnswer
    )
    return {
      ...q,
      options: shuffledOptions.map((item) => item.option),
      correctAnswer: newCorrectIndex
    }
  })
  return { ...test, questions: shuffledQuestions }
}

export default function Tests({ language }: TestsProps) {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [difficultyFilter, setDifficultyFilter] = useState<'' | Difficulty>('')
  const [showMistakes, setShowMistakes] = useState(false)
  const t = translations[language]

  const startTest = (test: Test) => {
    const randomizedTest = prepareTest(test)
    setSelectedTest(randomizedTest)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers(new Array(randomizedTest.questions.length).fill(-1))
    setShowResults(false)
    setShowExplanation(false)
    setShowMistakes(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNext = () => {
    if (selectedAnswer !== null && selectedTest) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)

      if (currentQuestion < selectedTest.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowExplanation(false)
      } else {
        setShowResults(true)
      }
    }
  }

  const handleFinish = () => {
    if (selectedAnswer !== null && selectedTest) {
      const newAnswers = [...answers]
      newAnswers[currentQuestion] = selectedAnswer
      setAnswers(newAnswers)
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    if (!selectedTest) return 0
    let correct = 0
    answers.forEach((answer, index) => {
      if (answer === selectedTest.questions[index].correctAnswer) {
        correct++
      }
    })
    return Math.round((correct / selectedTest.questions.length) * 100)
  }

  const resetTest = () => {
    setSelectedTest(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers([])
    setShowResults(false)
    setShowExplanation(false)
    setShowMistakes(false)
  }

  if (showResults && selectedTest) {
    const score = calculateScore()
    const incorrectQuestions = selectedTest.questions.filter((question, index) => {
      const userAnswer = answers[index]
      return userAnswer !== question.correctAnswer
    })

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.testCompleted}
          </h2>
          <div className="text-6xl font-bold text-primary-600 mb-4">
            {score}%
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t.score}: {score}%
          </p>
        </div>

        {incorrectQuestions.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t.perfectScore}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t.perfectScoreDesc}
            </p>
          </div>
        ) : (
          <>
            {!showMistakes && (
              <div className="flex flex-col items-center gap-4 mt-8">
                <button
                  onClick={() => setShowMistakes(true)}
                  className="btn-primary"
                >
                  {t.viewMistakes}
                </button>
                <button
                  onClick={resetTest}
                  className="btn-secondary"
                >
                  {t.tryAgain}
                </button>
              </div>
            )}
            {showMistakes && (
              <>
                <div className="space-y-6 mt-8">
                  {selectedTest.questions.map((question, index) => {
                    const userAnswer = answers[index]
                    const isCorrect = userAnswer === question.correctAnswer
                    if (isCorrect) return null
                    return (
                      <div key={question.id} className="card">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {t.question} {index + 1}
                          </h3>
                          <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            {t.incorrect}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {question.question}
                        </p>
                        <div className="space-y-2 mb-4">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-3 rounded-lg border ${
                                optionIndex === question.correctAnswer
                                  ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
                                  : optionIndex === userAnswer
                                  ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
                                  : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                              }`}
                            >
                              <span className={`font-medium ${
                                optionIndex === question.correctAnswer
                                  ? 'text-green-700 dark:text-green-300'
                                  : optionIndex === userAnswer
                                  ? 'text-red-700 dark:text-red-300'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}>
                                {String.fromCharCode(65 + optionIndex)}. {option}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                            {t.explanation}:
                          </h4>
                          <p className="text-blue-700 dark:text-blue-300">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    onClick={resetTest}
                    className="btn-secondary"
                  >
                    {t.backToTests}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    )
  }

  if (selectedTest) {
    const question = selectedTest.questions[currentQuestion]
    const isLastQuestion = currentQuestion === selectedTest.questions.length - 1

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedTest.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {selectedTest.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t.question} {currentQuestion + 1} {t.of} {selectedTest.questions.length}
            </span>
            <div className="flex space-x-2">
              {selectedTest.questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentQuestion
                      ? 'bg-primary-600'
                      : answers[index] !== -1
                      ? 'bg-green-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {question.question}
          </h3>

          <div className="space-y-3 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border transition-colors ${
                  selectedAnswer === index
                    ? 'bg-primary-50 border-primary-300 dark:bg-primary-900/20 dark:border-primary-700'
                    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {String.fromCharCode(65 + index)}. {option}
                </span>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={resetTest}
              className="btn-secondary"
            >
              {t.backToTests}
            </button>
            
            <button
              onClick={isLastQuestion ? handleFinish : handleNext}
              disabled={selectedAnswer === null}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedAnswer === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              {isLastQuestion ? t.finish : t.next}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!selectedTest) {
    // фильтрация тестов по сложности
    const currentTests = getTests(language)
    const filteredTests = difficultyFilter
      ? currentTests.filter((test) => test.difficulty === difficultyFilter)
      : currentTests

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.tests}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
            {language === 'ru' 
              ? 'Проверьте свои знания в области тестирования программного обеспечения'
              : 'Test your knowledge in software testing'
            }
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {filteredTests.length} {language === 'ru' ? 'доступных тестов' : 'available tests'}
          </div>
        </div>

        {/* Фильтр по сложности */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <label className="font-medium text-gray-700 dark:text-gray-300">
                {t.difficulty}:
              </label>
                             <div className="flex flex-wrap gap-2">
                 <button
                   onClick={() => setDifficultyFilter('')}
                   className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                     difficultyFilter === ''
                       ? 'bg-primary-600 text-white shadow-md'
                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                   }`}
                 >
                   {t.allLevels}
                 </button>
                 <button
                   onClick={() => setDifficultyFilter('beginner')}
                   className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                     difficultyFilter === 'beginner'
                       ? 'bg-green-600 text-white shadow-md'
                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                   }`}
                 >
                   {t.beginnerFull}
                 </button>
                 <button
                   onClick={() => setDifficultyFilter('intermediate')}
                   className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                     difficultyFilter === 'intermediate'
                       ? 'bg-yellow-600 text-white shadow-md'
                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                   }`}
                 >
                   {t.intermediateFull}
                 </button>
                 <button
                   onClick={() => setDifficultyFilter('advanced')}
                   className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                     difficultyFilter === 'advanced'
                       ? 'bg-red-600 text-white shadow-md'
                       : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                   }`}
                 >
                   {t.advancedFull}
                 </button>
               </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div key={test.id} className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border-2 border-transparent hover:border-primary-200 dark:hover:border-primary-800 min-h-[280px]">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3 gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex-1 leading-tight">
                    {test.title}
                  </h3>
                  <span 
                    className={`inline-block px-1 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 ${
                      test.difficulty === 'beginner' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : test.difficulty === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {t[test.difficulty]}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                  {test.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {test.questions.length} {t.questions}
                </div>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => startTest(test)}
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  {t.startTest}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
} 