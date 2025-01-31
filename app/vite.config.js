import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Ensures client-side routing works
  },
  build: {
    outDir: 'dist', // Ensures output folder is correct
  },
  base: './', // Fixes asset paths for deployment
});
