// Тип для ресурса
export type Resource = {
  title: string;
  url: string;
  description?: string;
  type: 'book' | 'article' | 'video' | 'tool' | 'other';
};

// Пример данных ресурсов
export const resources: Resource[] = [
  {
    title: "Тестирование DOTCOM Secrets",
    url: "https://example.com/book",
    description: "Книга о тестировании и автоматизации.",
    type: 'book'
  },
  // Добавляйте новые ресурсы по аналогии
]; 