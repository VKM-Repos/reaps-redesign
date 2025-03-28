import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      react: path.resolve('./node_modules/react'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://reaps.vhdo.org',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
