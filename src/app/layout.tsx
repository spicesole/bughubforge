import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import { LanguageProvider } from '@/components/useLanguage';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BugHubForge — образовательная платформа для тестировщиков',
  description:
    'Изучайте тестирование программного обеспечения с помощью глоссария терминов, полезных ресурсов, актуальных новостей и практических заданий. Всё для начинающих и опытных QA-специалистов!',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BugHubForge — образовательная платформа для тестировщиков</title>
        <meta
          name="description"
          content="Изучайте тестирование программного обеспечения с помощью глоссария терминов, полезных ресурсов, актуальных новостей и практических заданий. Всё для начинающих и опытных QA-специалистов!"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
            <ScrollToTop />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
