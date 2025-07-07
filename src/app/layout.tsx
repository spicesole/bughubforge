import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BugHubForge - Платформа для тестировщиков',
  description: 'Изучайте тестирование программного обеспечения с помощью интерактивных материалов, глоссария и мини-форума',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>BugHubForge — QA, тестирование, автоматизация, ресурсы</title>
        <meta name="description" content="BugHubForge — современный портал о тестировании ПО, автоматизации, инструментах и лучших практиках для QA-специалистов." />
      </head>
      <body className={inter.className}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  )
} 