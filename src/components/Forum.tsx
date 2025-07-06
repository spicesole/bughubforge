'use client'

import { useState, useEffect } from 'react'
import { auth, User } from '@/utils/auth'

interface ForumMessage {
  id: number
  author: string
  content: string
  timestamp: string
}

interface ForumProps {
  language: 'ru' | 'en'
}

export default function Forum({ language }: ForumProps) {
  const [newMessage, setNewMessage] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const translations = {
    ru: {
      title: 'Мини-форум',
      subtitle: 'Делитесь находками и планами тестирования',
      addMessage: 'Добавить сообщение',
      yourName: 'Ваше имя',
      yourNamePlaceholder: 'Введите ваше имя',
      message: 'Сообщение',
      messagePlaceholder: 'Поделитесь своими находками или планами тестирования...',
      sendMessage: 'Отправить',
      messages: 'Сообщения',
      noMessages: 'Пока нет сообщений. Будьте первым!',
      postingAs: 'Публикуете как'
    },
    en: {
      title: 'Mini Forum',
      subtitle: 'Share your findings and testing plans',
      addMessage: 'Add Message',
      yourName: 'Your Name',
      yourNamePlaceholder: 'Enter your name',
      message: 'Message',
      messagePlaceholder: 'Share your findings or testing plans...',
      sendMessage: 'Send',
      messages: 'Messages',
      noMessages: 'No messages yet. Be the first!',
      postingAs: 'Posting as'
    }
  }

  const t = translations[language]

  // Загружаем сообщения из localStorage
  const [messages, setMessages] = useState<ForumMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('forumMessages')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  // Получаем текущего пользователя
  useEffect(() => {
    const user = auth.getCurrentUser()
    setCurrentUser(user)
    if (user) {
      setAuthorName(user.name)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalAuthorName = currentUser ? currentUser.name : authorName.trim()
    
    if (newMessage.trim() && finalAuthorName) {
      const message: ForumMessage = {
        id: Date.now(),
        author: finalAuthorName,
        content: newMessage,
        timestamp: new Date().toLocaleString()
      }
      
      const updatedMessages = [message, ...messages]
      setMessages(updatedMessages)
      localStorage.setItem('forumMessages', JSON.stringify(updatedMessages))
      
      setNewMessage('')
      if (!currentUser) {
        setAuthorName('')
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container-ipad">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 language-transition">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.subtitle}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Форма для нового сообщения */}
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t.addMessage}
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
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="input-field text-sm md:text-base"
                    placeholder={t.yourNamePlaceholder}
                    required
                  />
                </div>
              )}
              {currentUser && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    {t.postingAs}: <span className="font-medium">{currentUser.name}</span>
                  </p>
                </div>
              )}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.message}
                </label>
                <textarea
                  id="message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="input-field min-h-[100px] resize-y text-sm md:text-base"
                  placeholder={t.messagePlaceholder}
                  required
                />
              </div>
              <button type="submit" className="btn-primary text-sm md:text-base px-4 md:px-6 py-2 md:py-3" aria-label={t.sendMessage}>
                {t.sendMessage}
              </button>
            </form>
          </div>
          
          {/* Список сообщений */}
          <div className="space-y-4 md:space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t.messages} ({messages.length})
            </h3>
            
            {messages.length === 0 ? (
              <div className="card text-center text-gray-500 dark:text-gray-400">
                {t.noMessages}
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="card">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                      {message.author}
                    </h4>
                    <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 