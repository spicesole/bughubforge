interface HeroProps {
  title: string
  subtitle: string
  startLearning: string
  learnMore: string
}

export default function Hero({ title, subtitle, startLearning, learnMore }: HeroProps) {
  const handleStartLearning = () => {
    window.location.href = '/tests'
  }

  const handleLearnMore = () => {
    const featuresSection = document.querySelector('[data-section="features"]')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 ipad-fix">
      <div className="container-ipad py-16 md:py-20 lg:py-24">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 language-transition">
            {title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-primary-100 dark:text-primary-200 mb-6 md:mb-8 max-w-3xl mx-auto px-4 language-transition">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <button 
              onClick={handleStartLearning}
              className="bg-white text-primary-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 font-semibold py-3 px-6 md:px-8 rounded-lg text-base md:text-lg transition-colors duration-200 btn-ipad language-transition"
              aria-label={startLearning}
            >
              {startLearning}
            </button>
            <button 
              onClick={handleLearnMore}
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 dark:border-gray-300 dark:hover:bg-gray-800 dark:hover:border-gray-600 font-semibold py-3 px-6 md:px-8 rounded-lg text-base md:text-lg transition-colors duration-200 btn-ipad language-transition"
              aria-label={learnMore}
            >
              {learnMore}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 