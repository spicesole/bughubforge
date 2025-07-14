'use client';

import React, { useEffect, useState, useContext } from 'react';

export type Language = 'ru' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = React.createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ru');

  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage === 'en' || savedLanguage === 'ru') {
        setLanguageState(savedLanguage);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch {
      /* ignore */
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextProps {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}

export function getCurrentLanguage(): string {
  const lang = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
  return lang || 'ru'; // по умолчанию русский
}
