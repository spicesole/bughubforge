"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { auth, User } from "@/utils/auth";
import Header from "@/components/Header";

interface Topic {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

interface Message {
  id: number;
  author: string;
  content: string;
  timestamp: string;
}

const translations = {
  ru: {
    back: "Назад к темам",
    topic: "Тема",
    author: "Автор",
    created: "Создана",
    messages: "Сообщения",
    noMessages: "Пока нет сообщений. Будьте первым!",
    addMessage: "Добавить сообщение",
    yourName: "Ваше имя",
    yourNamePlaceholder: "Введите ваше имя",
    message: "Сообщение",
    messagePlaceholder: "Введите сообщение...",
    send: "Отправить",
    postingAs: "Пишете как",
    edit: "Редактировать",
    save: "Сохранить",
    cancel: "Отменить",
    edited: "отредактировано"
  },
  en: {
    back: "Back to topics",
    topic: "Topic",
    author: "Author",
    created: "Created",
    messages: "Messages",
    noMessages: "No messages yet. Be the first!",
    addMessage: "Add Message",
    yourName: "Your Name",
    yourNamePlaceholder: "Enter your name",
    message: "Message",
    messagePlaceholder: "Enter your message...",
    send: "Send",
    postingAs: "Posting as",
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    edited: "edited"
  }
};

export default function TopicPage() {
  const params = useParams();
  const router = useRouter();
  const [language, setLanguage] = useState<'ru' | 'en'>("ru");
  const t = translations[language];
  const topicId = Number(params?.id);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  // Загрузка темы и сообщений
  useEffect(() => {
    const topics: Topic[] = JSON.parse(localStorage.getItem("forumTopics") || "[]");
    const found = topics.find(t => t.id === topicId);
    setTopic(found || null);
    setCurrentUser(auth.getCurrentUser());
    // Сообщения по ключу forumMessages_{id}
    const saved = localStorage.getItem(`forumMessages_${topicId}`);
    setMessages(saved ? JSON.parse(saved) : []);
  }, [topicId]);

  useEffect(() => {
    if (currentUser) setAuthorName(currentUser.name);
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAuthor = currentUser ? currentUser.name : authorName.trim();
    if (!newMessage.trim() || !finalAuthor) return;
    const msg: Message = {
      id: Date.now(),
      author: finalAuthor,
      content: newMessage,
      timestamp: new Date().toLocaleString()
    };
    const updated = [msg, ...messages];
    setMessages(updated);
    localStorage.setItem(`forumMessages_${topicId}`, JSON.stringify(updated));
    setNewMessage("");
    if (!currentUser) setAuthorName("");
  };

  const startEditing = (message: Message) => {
    setEditingMessageId(message.id);
    setEditingContent(message.content);
  };

  const saveEdit = (messageId: number) => {
    if (!editingContent.trim()) return;
    const updated = messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, content: editingContent.trim() }
        : msg
    );
    setMessages(updated);
    localStorage.setItem(`forumMessages_${topicId}`, JSON.stringify(updated));
    setEditingMessageId(null);
    setEditingContent("");
  };

  const cancelEdit = () => {
    setEditingMessageId(null);
    setEditingContent("");
  };

  const canEditMessage = (message: Message) => {
    return currentUser && message.author === currentUser.name;
  };

  if (!topic) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 ipad-fix">
        <Header language={language} setLanguage={setLanguage} />
        <main className="container-ipad py-8 md:py-12">
          <button onClick={() => router.push("/forum")} className="btn-secondary mb-6">{t.back}</button>
          <div className="card text-center text-gray-500 dark:text-gray-400">Тема не найдена</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 ipad-fix">
      <Header language={language} setLanguage={setLanguage} />
      <main className="container-ipad py-8 md:py-12">
        <button onClick={() => router.push("/forum")} className="btn-secondary mb-6">{t.back}</button>
        <div className="mb-8 card">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">{topic.title}</h1>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {t.author}: {topic.author} | {t.created}: {topic.createdAt}
          </div>
        </div>
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{t.addMessage}</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
            {!currentUser && (
              <div>
                <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t.yourName}
                </label>
                <input
                  type="text"
                  id="authorName"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
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
                onChange={e => setNewMessage(e.target.value)}
                className="input-field min-h-[80px] resize-y text-sm md:text-base"
                placeholder={t.messagePlaceholder}
                required
              />
            </div>
            <button type="submit" className="btn-primary text-sm md:text-base px-4 md:px-6 py-2 md:py-3" aria-label={t.send}>
              {t.send}
            </button>
          </form>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{t.messages} ({messages.length})</h2>
          {messages.length === 0 ? (
            <div className="card text-center text-gray-500 dark:text-gray-400">{t.noMessages}</div>
          ) : (
            <ul className="space-y-4">
              {messages.map(msg => (
                <li key={msg.id} className="card">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                      {msg.author}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                        {msg.timestamp}
                      </span>
                      {canEditMessage(msg) && editingMessageId !== msg.id && (
                        <button
                          onClick={() => startEditing(msg)}
                          className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {t.edit}
                        </button>
                      )}
                    </div>
                  </div>
                  {editingMessageId === msg.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editingContent}
                        onChange={e => setEditingContent(e.target.value)}
                        className="input-field min-h-[80px] resize-y text-sm md:text-base w-full"
                        placeholder={t.messagePlaceholder}
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => saveEdit(msg.id)}
                          className="btn-primary text-xs px-3 py-1"
                        >
                          {t.save}
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="btn-secondary text-xs px-3 py-1"
                        >
                          {t.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
} 