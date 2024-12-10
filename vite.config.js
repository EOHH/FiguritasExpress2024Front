import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Asegúrate de que apunta a la carpeta 'src'
    },
  },
  define: {
    global: 'window', // Define global como window
  },
});
