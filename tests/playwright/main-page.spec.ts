import { test, expect } from '@playwright/test';

test.describe('Главная страница', () => {
  const url = 'https://bughubforge.vercel.app/';

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
  });

  test('Содержит приветственный заголовок', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Добро пожаловать в мир тестирования!');
  });

  test('Есть кнопка "Начать обучение"', async ({ page }) => {
    const startButton = page.getByRole('button', { name: 'Начать обучение' });
    await expect(startButton).toBeVisible();
  });

  test('Есть кнопка "Узнать больше"', async ({ page }) => {
    const moreButton = page.getByRole('button', { name: 'Узнать больше' });
    await expect(moreButton).toBeVisible();
  });

  test('Есть раздел "Что вы найдете на нашем сайте"', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Что вы найдете на нашем сайте' })).toBeVisible();
  });

  test('Есть раздел "Новости QA"', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Новости QA' })).toBeVisible();
  });

  test('Есть навигация по разделам', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Главная' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Глоссарий' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ресурсы' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Тесты' }).first()).toBeVisible();
  });
});

test.describe('Главная страница — тёмная тема', () => {
  const url = 'https://bughubforge.vercel.app/';

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    // Кликаем по кнопке переключения темы по aria-label
    await page.getByRole('button', { name: 'Темная тема' }).click();
  });

  test('Содержит приветственный заголовок (тёмная тема)', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Добро пожаловать в мир тестирования!');
  });

  test('Есть кнопка "Начать обучение" (тёмная тема)', async ({ page }) => {
    const startButton = page.getByRole('button', { name: 'Начать обучение' });
    await expect(startButton).toBeVisible();
  });

  test('Есть кнопка "Узнать больше" (тёмная тема)', async ({ page }) => {
    const moreButton = page.getByRole('button', { name: 'Узнать больше' });
    await expect(moreButton).toBeVisible();
  });

  test('Есть раздел "Что вы найдете на нашем сайте" (тёмная тема)', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Что вы найдете на нашем сайте' })).toBeVisible();
  });

  test('Есть раздел "Новости QA" (тёмная тема)', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'Новости QA' })).toBeVisible();
  });

  test('Есть навигация по разделам (тёмная тема)', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Главная' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Глоссарий' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ресурсы' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Тесты' }).first()).toBeVisible();
  });
});

test.describe('Main page (EN) — light theme', () => {
  const url = 'https://bughubforge.vercel.app/';

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    // Переключаем язык на английский
    await page.getByRole('button', { name: 'EN' }).click();
  });

  test('Contains welcome heading (EN)', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Welcome to the World of Testing!');
  });

  test('Has "Start Learning" button (EN)', async ({ page }) => {
    const startButton = page.getByRole('button', { name: 'Start Learning' });
    await expect(startButton).toBeVisible();
  });

  test('Has "Learn More" button (EN)', async ({ page }) => {
    const moreButton = page.getByRole('button', { name: 'Learn More' });
    await expect(moreButton).toBeVisible();
  });

  test('Has "What you will find on our site" section (EN)', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'What you will find on our site' })).toBeVisible();
  });

  test('Has "QA News" section (EN)', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'QA News' })).toBeVisible();
  });

  test('Has navigation links (EN)', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Glossary' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Resources' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tests' }).first()).toBeVisible();
  });
});

test.describe('Main page (EN) — dark theme', () => {
  const url = 'https://bughubforge.vercel.app/';

  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.getByRole('button', { name: 'EN' }).click();
    // Кликаем по кнопке с aria-label 'Dark Mode' для включения тёмной темы
    await page.getByRole('button', { name: 'Dark Mode' }).click();
  });

  test('Contains welcome heading (EN, dark)', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Welcome to the World of Testing!');
  });

  test('Has "Start Learning" button (EN, dark)', async ({ page }) => {
    const startButton = page.getByRole('button', { name: 'Start Learning' });
    await expect(startButton).toBeVisible();
  });

  test('Has "Learn More" button (EN, dark)', async ({ page }) => {
    const moreButton = page.getByRole('button', { name: 'Learn More' });
    await expect(moreButton).toBeVisible();
  });

  test('Has "What you will find on our site" section (EN, dark)', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'What you will find on our site' })).toBeVisible();
  });

  test('Has "QA News" section (EN, dark)', async ({ page }) => {
    await expect(page.locator('h2', { hasText: 'QA News' })).toBeVisible();
  });

  test('Has navigation links (EN, dark)', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Glossary' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Resources' }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Tests' }).first()).toBeVisible();
  });
}); 