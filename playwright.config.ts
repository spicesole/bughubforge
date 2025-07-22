import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/playwright',
  testMatch: '**/*.spec.ts',
}); 