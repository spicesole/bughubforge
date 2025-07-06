interface Feature {
  title: string
  description: string
}

interface FeaturesProps {
  title: string
  features: Feature[]
}

export default function Features({ title, features }: FeaturesProps) {
  return (
    <section className="py-12 md:py-16 bg-white dark:bg-gray-900">
      <div className="container-ipad">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 language-transition">
            {title}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="card text-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg 
                  className="w-5 h-5 md:w-6 md:h-6 text-primary-600 dark:text-primary-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-label={`Иконка для ${feature.title}`}
                  role="img"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2 language-transition">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 language-transition">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 