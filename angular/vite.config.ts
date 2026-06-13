import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom'
<<<<<<< HEAD
=======
  },
  server: {
    proxy: {
      '/login': {
        target: 'http://logisticants-java:8080',
        changeOrigin: true,
      }
    }
>>>>>>> PageClient
  }
});