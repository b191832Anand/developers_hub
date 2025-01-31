import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
    port: 3000, // Ensures the dev server runs on a predictable port
  },
  preview: {
    port: 5000, // Ensures Vite preview runs on a specific port
  },
  resolve: {
    alias: {
      '@': '/src', // Allows easy imports using '@' instead of relative paths
    },
  }
});
