'use client';

import Header from '@/components/Header';
import Glossary from '@/components/Glossary';
import Head from 'next/head';

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900" role="main">
      <Head>
        <title>Глоссарий терминов | BugHubForge</title>
        <meta
          name="description"
          content="Глоссарий терминов по тестированию ПО, автоматизации и QA. Понятия, определения, методологии."
        />
      </Head>
      {/* Header */}
      <Header />

      {/* Глоссарий */}
      <main className="container-ipad py-8 md:py-12">
        <Glossary />
      </main>
    </div>
  );
}
