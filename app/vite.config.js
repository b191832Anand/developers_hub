import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',  // Ensures correct asset loading
  build: {
    outDir: 'dist', // Build output directory
  },
  server: {
    host: true, // Ensure server works on all network interfaces
  }
});
