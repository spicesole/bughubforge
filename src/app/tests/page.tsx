'use client';

import Header from '@/components/Header';
import Tests from '@/components/Tests';
import Head from 'next/head';

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" role="main">
      <Head>
        <title>Тесты и чек-листы | BugHubForge</title>
        <meta
          name="description"
          content="Чек-листы, тест-кейсы и практические задания для тестировщиков и QA-специалистов."
        />
      </Head>
      <Header />
      <main className="container-ipad py-8 md:py-12">
        <Tests />
      </main>
    </div>
  );
}
