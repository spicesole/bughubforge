"use client";

import { useState, useEffect } from "react";
import { auth, User } from "@/utils/auth";
import Header from "@/components/Header";

interface Topic {
  id: number;
  title: string;
  author: string;
  createdAt: string;
}

const translations = {
  ru: {
    forum: "Форум",
    createTopic: "Создать тему",
    topicTitle: "Название темы",
    topicTitlePlaceholder: "Введите название темы",
    add: "Добавить",
    topics: "Темы",
    noTopics: "Тем пока нет. Будьте первым!",
    author: "Автор",
    created: "Создана"
  },
  en: {
    forum: "Forum",
    createTopic: "Create Topic",
    topicTitle: "Topic Title",
    topicTitlePlaceholder: "Enter topic title",
    add: "Add",
    topics: "Topics",
    noTopics: "No topics yet. Be the first!",
    author: "Author",
    created: "Created"
  }
};

export default function ForumPage() {
  const [language, setLanguage] = useState<'ru' | 'en'>("ru");
  const t = translations[language];
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Загрузка тем из localStorage
    const saved = localStorage.getItem("forumTopics");
    setTopics(saved ? JSON.parse(saved) : []);
    setCurrentUser(auth.getCurrentUser());
  }, []);

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const author = currentUser ? currentUser.name : t.author;
    const topic: Topic = {
      id: Date.now(),
      title: newTitle.trim(),
      author,
      createdAt: new Date().toLocaleString()
    };
    const updated = [topic, ...topics];
    setTopics(updated);
    localStorage.setItem("forumTopics", JSON.stringify(updated));
    setNewTitle("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 ipad-fix">
      <Header language={language} setLanguage={setLanguage} />
      <main className="container-ipad py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">{t.forum}</h1>
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{t.createTopic}</h2>
          <form onSubmit={handleAddTopic} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="input-field flex-1"
              placeholder={t.topicTitlePlaceholder}
              required
            />
            <button type="submit" className="btn-primary px-6 py-2">{t.add}</button>
          </form>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">{t.topics}</h2>
          {topics.length === 0 ? (
            <div className="card text-center text-gray-500 dark:text-gray-400">{t.noTopics}</div>
          ) : (
            <ul className="space-y-4">
              {topics.map(topic => (
                <li key={topic.id} className="card flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <a href={`/forum/${topic.id}`} className="font-medium text-primary-700 dark:text-primary-400 text-base md:text-lg hover:underline">
                      {topic.title}
                    </a>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {t.author}: {topic.author} | {t.created}: {topic.createdAt}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
} 