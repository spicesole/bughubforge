import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: string;
  username: string;
  email: string;
}

interface Topic {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Message {
  id: string;
  topicId: string;
  content: string;
  author: string;
  createdAt: string;
}

export default function UserProfile() {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentLanguage, setCurrentLanguage] = useState<'ru' | 'en'>('ru');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'ru' | 'en';
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (username) {
      // Получаем пользователя из localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: User) => u.username === username);
      setUser(foundUser || null);

      // Получаем темы пользователя
      const savedTopics = JSON.parse(localStorage.getItem('topics') || '[]');
      const userTopics = savedTopics.filter((topic: Topic) => topic.author === username);
      setTopics(userTopics);

      // Получаем сообщения пользователя
      const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      const userMessages = savedMessages.filter((message: Message) => message.author === username);
      setMessages(userMessages);
    }
  }, [username]);

  const translations = {
    ru: {
      profile: 'Профиль',
      backToHome: 'На главную',
      userNotFound: 'Пользователь не найден',
      topics: 'Темы',
      messages: 'Сообщения',
      noTopics: 'Темы не найдены',
      noMessages: 'Сообщения не найдены',
      createdAt: 'Создано',
      viewTopic: 'Просмотреть тему',
      email: 'Email',
      memberSince: 'Участник с'
    },
    en: {
      profile: 'Profile',
      backToHome: 'Back to Home',
      userNotFound: 'User not found',
      topics: 'Topics',
      messages: 'Messages',
      noTopics: 'No topics found',
      noMessages: 'No messages found',
      createdAt: 'Created',
      viewTopic: 'View topic',
      email: 'Email',
      memberSince: 'Member since'
    }
  };

  const t = translations[currentLanguage];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {t.userNotFound}
            </h1>
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              {t.backToHome}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      currentLanguage === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block">
            ← {t.backToHome}
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.profile}: {user.username}
          </h1>
        </div>

        {/* User Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                {user.username}
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t.email}:</span> {user.email}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">{t.memberSince}:</span> {formatDate(user.id)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {topics.length}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {t.topics}
              </div>
            </div>
          </div>
        </div>

        {/* Topics */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t.topics} ({topics.length})
          </h2>
          {topics.length > 0 ? (
            <div className="space-y-4">
              {topics.map((topic) => (
                <div key={topic.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                    {topic.content}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{t.createdAt}: {formatDate(topic.createdAt)}</span>
                    <Link 
                      href={`/forum/${topic.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t.viewTopic}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              {t.noTopics}
            </p>
          )}
        </div>

        {/* Recent Messages */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {t.messages} ({messages.length})
          </h2>
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.slice(0, 10).map((message) => (
                <div key={message.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                    {message.content}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{t.createdAt}: {formatDate(message.createdAt)}</span>
                    <Link 
                      href={`/forum/${message.topicId}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t.viewTopic}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              {t.noMessages}
            </p>
          )}
        </div>
      </div>
    </div>
  );
} 