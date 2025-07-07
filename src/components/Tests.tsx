'use client'

import { useState } from 'react'

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface Test {
  id: string
  title: string
  description: string
  questions: Question[]
}

const tests: Test[] = [
  {
    id: 'basics',
    title: 'Основы тестирования',
    description: 'Базовые концепции и термины тестирования ПО',
    questions: [
      {
        id: 1,
        question: 'Что такое тестирование программного обеспечения?',
        options: [
          'Процесс поиска ошибок в коде',
          'Процесс проверки соответствия программы требованиям',
          'Процесс написания документации',
          'Процесс оптимизации производительности'
        ],
        correctAnswer: 1,
        explanation: 'Тестирование - это процесс проверки соответствия программы требованиям и выявления дефектов.'
      },
      {
        id: 2,
        question: 'Какие основные типы тестирования вы знаете?',
        options: [
          'Функциональное тестирование',
          'Функциональное, нефункциональное и тестирование изменений',
          'Автоматизированное тестирование',
          'Ручное тестирование'
        ],
        correctAnswer: 1,
        explanation: 'Основные типы: функциональное (проверка функций), нефункциональное (производительность, безопасность) и тестирование изменений (регрессионное).'
      },
      {
        id: 3,
        question: 'Что такое баг (дефект)?',
        options: [
          'Любая ошибка в программе',
          'Отклонение от ожидаемого поведения',
          'Проблема с дизайном',
          'Все перечисленное'
        ],
        correctAnswer: 3,
        explanation: 'Баг - это отклонение от ожидаемого поведения программы, которое может включать ошибки в коде, дизайне или требованиях.'
      }
    ]
  },
  {
    id: 'functional',
    title: 'Функциональное тестирование',
    description: 'Тестирование функциональности приложения',
    questions: [
      {
        id: 1,
        question: 'Что проверяет функциональное тестирование?',
        options: [
          'Производительность системы',
          'Внешний вид интерфейса',
          'Соответствие функций требованиям',
          'Безопасность приложения'
        ],
        correctAnswer: 2,
        explanation: 'Функциональное тестирование проверяет, что все функции приложения работают согласно требованиям.'
      },
      {
        id: 2,
        question: 'Какие техники функционального тестирования вы знаете?',
        options: [
          'Эквивалентное разбиение',
          'Эквивалентное разбиение, граничные значения, анализ причинно-следственных связей',
          'Тестирование производительности',
          'Тестирование безопасности'
        ],
        correctAnswer: 1,
        explanation: 'Основные техники: эквивалентное разбиение, граничные значения, анализ причинно-следственных связей.'
      }
    ]
  },
  {
    id: 'tools',
    title: 'Инструменты тестирования',
    description: 'Популярные инструменты для автоматизации тестирования',
    questions: [
      {
        id: 1,
        question: 'Какой инструмент используется для автоматизации веб-тестирования?',
        options: [
          'Selenium',
          'Selenium, Cypress, Playwright',
          'JUnit',
          'Postman'
        ],
        correctAnswer: 1,
        explanation: 'Для веб-тестирования используются Selenium, Cypress, Playwright и другие инструменты.'
      },
      {
        id: 2,
        question: 'Что такое API тестирование?',
        options: [
          'Тестирование веб-интерфейса',
          'Тестирование программных интерфейсов',
          'Тестирование базы данных',
          'Тестирование мобильных приложений'
        ],
        correctAnswer: 1,
        explanation: 'API тестирование - это тестирование программных интерфейсов для проверки взаимодействия между компонентами.'
      }
    ]
  }
]

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
    perfectScoreDesc: 'Вы отлично справились с тестом. Продолжайте изучать материалы!'
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
    perfectScoreDesc: 'You did great on the test. Keep studying the materials!'
  }
}

interface TestsProps {
  language: 'ru' | 'en'
}

export default function Tests({ language }: TestsProps) {
  const [selectedTest, setSelectedTest] = useState<Test | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const t = translations[language]

  const startTest = (test: Test) => {
    setSelectedTest(test)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setAnswers(new Array(test.questions.length).fill(-1))
    setShowResults(false)
    setShowExplanation(false)
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
  }

  if (showResults && selectedTest) {
    const score = calculateScore()
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

        <div className="space-y-6">
          {(() => {
            const incorrectQuestions = selectedTest.questions.filter((question, index) => {
              const userAnswer = answers[index]
              return userAnswer !== question.correctAnswer
            })
            
            if (incorrectQuestions.length === 0) {
              return (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {t.perfectScore}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t.perfectScoreDesc}
                  </p>
                </div>
              )
            }
            
            return selectedTest.questions.map((question, index) => {
              const userAnswer = answers[index]
              const isCorrect = userAnswer === question.correctAnswer
              
              // Показываем только неправильно отвеченные вопросы
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
            })
          })()}
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <button
            onClick={resetTest}
            className="btn-primary"
          >
            {t.tryAgain}
          </button>
          <button
            onClick={resetTest}
            className="btn-secondary"
          >
            {t.backToTests}
          </button>
        </div>
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t.tests}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Проверьте свои знания в области тестирования программного обеспечения
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div key={test.id} className="card hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {test.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {test.description}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {test.questions.length} вопросов
            </div>
            <button
              onClick={() => startTest(test)}
              className="btn-primary w-full"
            >
              {t.startTest}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 