import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.spec.ts'],
    globals: true,
    root: './',
    isolate: true,
  },
  resolve: {},
});
