export function fixHangingPrepositions(text: string): string {
  // Список коротких предлогов и союзов (сортируем по убыванию длины)
  const preps = [
    'но', 'на', 'по', 'за', 'от', 'до', 'из', 'не', 'то', 'ли', 'же', 'бы',
    'в', 'с', 'к', 'и', 'а', 'о', 'у', 'я'
  ].sort((a, b) => b.length - a.length);
  
  // Регулярное выражение для поиска предлогов с пробелом после них
  const regex = new RegExp(`(?<=\\s|^)(${preps.join('|')})\\s+(?=\\S)`, 'gi');
  
  // Заменяем обычный пробел на неразрывный
  return text.replace(regex, (match, preposition) => `${preposition}\u00A0`);
} 