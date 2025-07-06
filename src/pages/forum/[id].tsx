import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';

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

export default function TopicDiscussion() {
  const router = useRouter();
  const { id } = router.query;
  const [topic, setTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState<'ru' | 'en'>('ru');
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'ru' | 'en';
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Получаем текущего пользователя
    const auth = localStorage.getItem('auth');
    if (auth) {
      try {
        const authData = JSON.parse(auth);
        setCurrentUser(authData.user);
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  useEffect(() => {
    if (id) {
      // Загружаем тему
      const savedTopics = JSON.parse(localStorage.getItem('topics') || '[]');
      const foundTopic = savedTopics.find((t: Topic) => t.id === id);
      setTopic(foundTopic || null);

      // Загружаем сообщения
      const savedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
      const topicMessages = savedMessages.filter((msg: Message) => msg.topicId === id);
      setMessages(topicMessages.sort((a: Message, b: Message) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ));
    }
  }, [id]);

  const translations = {
    ru: {
      backToForum: '← Назад к форуму',
      replies: 'Ответы',
      noReplies: 'Ответов пока нет',
      addReply: 'Добавить ответ',
      send: 'Отправить',
      messagePlaceholder: 'Введите ваше сообщение...',
      namePlaceholder: 'Введите ваше имя',
      yourName: 'Ваше имя',
      postingAs: 'Публикуете как'
    },
    en: {
      backToForum: '← Back to Forum',
      replies: 'Replies',
      noReplies: 'No replies yet',
      addReply: 'Add Reply',
      send: 'Send',
      messagePlaceholder: 'Enter your message...',
      namePlaceholder: 'Enter your name',
      yourName: 'Your Name',
      postingAs: 'Posting as'
    }
  };

  const t = translations[currentLanguage];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      currentLanguage === 'ru' ? 'ru-RU' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      topicId: id as string,
      content: newMessage.trim(),
      author: currentUser ? currentUser.username : (e.target as any).authorName.value,
      createdAt: new Date().toISOString()
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  if (!topic) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header language={currentLanguage} setLanguage={setCurrentLanguage} />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Тема не найдена
            </h1>
            <Link href="/forum" className="text-blue-600 dark:text-blue-400 hover:underline">
              {t.backToForum}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header language={currentLanguage} setLanguage={setCurrentLanguage} />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to Forum */}
        <Link href="/forum" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          {t.backToForum}
        </Link>

        {/* Topic */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {topic.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {topic.content}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>
              Автор: 
              <Link 
                href={`/user/${topic.author}`}
                className="text-blue-600 dark:text-blue-400 hover:underline ml-1"
              >
                {topic.author}
              </Link>
            </span>
            <span>{formatDate(topic.createdAt)}</span>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            {t.replies} ({messages.length})
          </h2>
          
          {messages.length > 0 ? (
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className="border-l-4 border-blue-500 pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        <Link 
                          href={`/user/${message.author}`}
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {message.author}
                        </Link>
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(message.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {message.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              {t.noReplies}
            </p>
          )}
        </div>

        {/* Add Reply Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t.addReply}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!currentUser && (
              <div>
                <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.yourName}
                </label>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder={t.namePlaceholder}
                  required
                />
              </div>
            )}
            
            {currentUser && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                <p className="text-blue-700 dark:text-blue-300 text-sm">
                  {t.postingAs}: <span className="font-medium">{currentUser.username}</span>
                </p>
              </div>
            )}
            
            <div>
              <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Сообщение
              </label>
              <textarea
                id="messageContent"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                rows={4}
                placeholder={t.messagePlaceholder}
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              {t.send}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 