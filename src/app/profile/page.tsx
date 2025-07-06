"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth, User } from "@/utils/auth";
import Header from "@/components/Header";

interface UserStats {
  topicsCreated: number;
  messagesSent: number;
  joinDate: string;
}

const translations = {
  ru: {
    profile: "Профиль",
    editProfile: "Редактировать профиль",
    save: "Сохранить",
    cancel: "Отменить",
    name: "Имя",
    email: "Email",
    statistics: "Статистика",
    topicsCreated: "Создано тем",
    messagesSent: "Отправлено сообщений",
    joinDate: "Дата регистрации",
    activity: "Активность",
    recentTopics: "Недавние темы",
    recentMessages: "Недавние сообщения",
    noTopics: "Тем пока нет",
    noMessages: "Сообщений пока нет",
    backToHome: "Назад на главную",
    profileUpdated: "Профиль обновлен",
    errorUpdating: "Ошибка при обновлении профиля"
  },
  en: {
    profile: "Profile",
    editProfile: "Edit Profile",
    save: "Save",
    cancel: "Cancel",
    name: "Name",
    email: "Email",
    statistics: "Statistics",
    topicsCreated: "Topics Created",
    messagesSent: "Messages Sent",
    joinDate: "Join Date",
    activity: "Activity",
    recentTopics: "Recent Topics",
    recentMessages: "Recent Messages",
    noTopics: "No topics yet",
    noMessages: "No messages yet",
    backToHome: "Back to Home",
    profileUpdated: "Profile updated",
    errorUpdating: "Error updating profile"
  }
};

export default function ProfilePage() {
  const router = useRouter();
  const [language, setLanguage] = useState<'ru' | 'en'>("ru");
  const t = translations[language];
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [userStats, setUserStats] = useState<UserStats>({
    topicsCreated: 0,
    messagesSent: 0,
    joinDate: ""
  });
  const [recentTopics, setRecentTopics] = useState<any[]>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (!user) {
      router.push("/");
      return;
    }
    setCurrentUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    loadUserStats(user);
  }, [router]);

  const loadUserStats = (user: User) => {
    // Загружаем темы
    const topics: any[] = JSON.parse(localStorage.getItem("forumTopics") || "[]");
    const userTopics = topics.filter(topic => topic.author === user.name);
    
    // Загружаем сообщения из всех тем
    let totalMessages = 0;
    const userMessages: any[] = [];
    
    topics.forEach(topic => {
      const messages: any[] = JSON.parse(localStorage.getItem(`forumMessages_${topic.id}`) || "[]");
      const topicMessages = messages.filter(msg => msg.author === user.name);
      totalMessages += topicMessages.length;
      userMessages.push(...topicMessages);
    });

    setUserStats({
      topicsCreated: userTopics.length,
      messagesSent: totalMessages,
      joinDate: user.id ? new Date(parseInt(user.id)).toLocaleDateString() : "Неизвестно"
    });

    setRecentTopics(userTopics.slice(0, 5));
    setRecentMessages(userMessages.slice(0, 5));
  };

  const handleSave = () => {
    if (!currentUser || !editName.trim() || !editEmail.trim()) return;

    try {
      // Обновляем пользователя в localStorage
      const updatedUser = { ...currentUser, name: editName.trim(), email: editEmail.trim() };
      const authData = { user: updatedUser, token: "demo-token" };
      localStorage.setItem("auth", JSON.stringify(authData));
      
      setCurrentUser(updatedUser);
      setIsEditing(false);
      
      // Показываем уведомление
      alert(t.profileUpdated);
    } catch (error) {
      alert(t.errorUpdating);
    }
  };

  const handleCancel = () => {
    setEditName(currentUser?.name || "");
    setEditEmail(currentUser?.email || "");
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 ipad-fix">
        <Header language={language} setLanguage={setLanguage} />
        <main className="container-ipad py-8 md:py-12">
          <div className="card text-center text-gray-500 dark:text-gray-400">
            Загрузка профиля...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 ipad-fix">
      <Header language={language} setLanguage={setLanguage} />
      <main className="container-ipad py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {t.profile}
            </h1>
            <button 
              onClick={() => router.push("/")} 
              className="btn-secondary"
            >
              {t.backToHome}
            </button>
          </div>

          {/* Основная информация */}
          <div className="card mb-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {isEditing ? t.editProfile : t.profile}
              </h2>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="btn-primary text-sm px-4 py-2"
                >
                  {t.editProfile}
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.name}
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t.email}
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    className="input-field"
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button onClick={handleSave} className="btn-primary">
                    {t.save}
                  </button>
                  <button onClick={handleCancel} className="btn-secondary">
                    {t.cancel}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.name}:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{currentUser.name}</span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.email}:</span>
                  <span className="ml-2 text-gray-900 dark:text-white">{currentUser.email}</span>
                </div>
              </div>
            )}
          </div>

          {/* Статистика */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {userStats.topicsCreated}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t.topicsCreated}
              </div>
            </div>
            <div className="card text-center">
              <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {userStats.messagesSent}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t.messagesSent}
              </div>
            </div>
            <div className="card text-center">
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {userStats.joinDate}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {t.joinDate}
              </div>
            </div>
          </div>

          {/* Активность */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Недавние темы */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.recentTopics}
              </h3>
              {recentTopics.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">{t.noTopics}</p>
              ) : (
                <div className="space-y-3">
                  {recentTopics.map(topic => (
                    <div key={topic.id} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                      <a 
                        href={`/forum/${topic.id}`}
                        className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                      >
                        {topic.title}
                      </a>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {topic.createdAt}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Недавние сообщения */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.recentMessages}
              </h3>
              {recentMessages.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">{t.noMessages}</p>
              ) : (
                <div className="space-y-3">
                  {recentMessages.map(message => (
                    <div key={message.id} className="border-b border-gray-200 dark:border-gray-700 pb-2 last:border-b-0">
                      <div className="text-sm text-gray-900 dark:text-white line-clamp-2">
                        {message.content}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {message.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 