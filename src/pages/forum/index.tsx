import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '../../components/Header';

interface Topic {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function Forum() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<'ru' | 'en'>('ru');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'ru' | 'en';
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Загружаем темы из localStorage
    const savedTopics = JSON.parse(localStorage.getItem('topics') || '[]');
    setTopics(savedTopics.sort((a: Topic, b: Topic) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  }, []);

  const translations = {
    ru: {
      forum: 'Форум',
      topics: 'Темы',
      noTopics: 'Темы не найдены',
      createTopic: 'Создать тему',
      createdAt: 'Создано',
      author: 'Автор',
      replies: 'Ответов',
      viewTopic: 'Просмотреть'
    },
    en: {
      forum: 'Forum',
      topics: 'Topics',
      noTopics: 'No topics found',
      createTopic: 'Create Topic',
      createdAt: 'Created',
      author: 'Author',
      replies: 'Replies',
      viewTopic: 'View'
    }
  };

  const t = translations[currentLanguage];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      currentLanguage === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' }
    );
  };

  const getRepliesCount = (topicId: string) => {
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    return messages.filter((msg: any) => msg.topicId === topicId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header language={currentLanguage} setLanguage={setCurrentLanguage} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.forum}
          </h1>
          <Link 
            href="/forum/create"
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {t.createTopic}
          </Link>
        </div>

        {topics.length > 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {topics.map((topic) => (
                <div key={topic.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        <Link 
                          href={`/forum/${topic.id}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {topic.title}
                        </Link>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {topic.content}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{t.author}: 
                          <Link 
                            href={`/user/${topic.author}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
                          >
                            {topic.author}
                          </Link>
                        </span>
                        <span>{t.createdAt}: {formatDate(topic.createdAt)}</span>
                        <span>{t.replies}: {getRepliesCount(topic.id)}</span>
                      </div>
                    </div>
                    <Link 
                      href={`/forum/${topic.id}`}
                      className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      {t.viewTopic}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {t.noTopics}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 