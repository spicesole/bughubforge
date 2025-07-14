'use client';

import Header from '@/components/Header';
import Resources from '@/components/Resources';
import Head from 'next/head';

export default function ResourcesPage() {
  return (
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
      role="main"
    >
      <Head>
        <title>Ресурсы для тестировщиков | BugHubForge</title>
        <meta
          name="description"
          content="Полезные ресурсы, инструменты, статьи и курсы для QA и автоматизации тестирования."
        />
      </Head>
      {/* Header */}
      <Header />

      {/* Ресурсы */}
      <Resources />
    </div>
  );
}
