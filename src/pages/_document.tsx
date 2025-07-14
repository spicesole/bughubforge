import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <meta property="og:title" content="BugHubForge — образовательная платформа для тестировщиков" />
        <meta property="og:description" content="Изучайте тестирование программного обеспечения с помощью глоссария терминов, полезных ресурсов, актуальных новостей и практических заданий. Всё для начинающих и опытных QA-специалистов!" />
        <meta property="og:url" content="https://bughubforge.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="description" content="Изучайте тестирование программного обеспечения с помощью глоссария терминов, полезных ресурсов, актуальных новостей и практических заданий. Всё для начинающих и опытных QA-специалистов!" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
