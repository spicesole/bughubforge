'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { getTests, type LocalizedTest } from '@/data/tests';
import Head from 'next/head';
import { useLanguage } from '@/components/useLanguage';
import TestRunner from '@/components/Tests/TestRunner';

export default function TestPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [test, setTest] = useState<LocalizedTest | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!params?.testId) return;
    const tests = getTests(language);
    const found = tests.find((t) => t.id === params.testId);
    if (found) {
      setTest(found);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [params?.testId, language]);

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container-ipad py-8 md:py-12 text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Тест не найден</h2>
          <button
            onClick={() => router.push('/tests')}
            className="px-4 py-2 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors"
          >
            К списку тестов
          </button>
        </main>
      </div>
    );
  }

  if (!test) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>{test.title} | BugHubForge</title>
        <meta name="description" content={test.description} />
      </Head>
      <Header />
      <main className="container-ipad py-8 md:py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{test.title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{test.description}</p>
        <TestRunner testId={test.id} />
      </main>
    </div>
  );
}
