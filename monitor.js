#!/usr/bin/env node

import PerformanceMonitor from './performance-monitor';

console.log('🚀 BugHubForge Performance Monitor');
console.log('==================================');
console.log('');

// Проверяем аргументы командной строки
const url = process.argv[2] || 'http://localhost:3000';
const interval = parseInt(process.argv[3]) || 5000; // 5 секунд по умолчанию

console.log(`📡 Мониторинг: ${url}`);
console.log(`⏱️  Интервал: ${interval}ms`);
console.log('');

// Создаем монитор
const monitor = new PerformanceMonitor(url, interval);

// Обработка завершения
process.on('SIGINT', () => {
  console.log('\n🛑 Остановка мониторинга...');
  monitor.stop();
  process.exit(0);
});

// Запускаем мониторинг
monitor.start();
