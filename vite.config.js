import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import expressApp from './server/index.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'express-api-server',
      configureServer(server) {
        server.middlewares.use(expressApp);
      },
      configurePreviewServer(server) {
        server.middlewares.use(expressApp);
      }
    }
  ],
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: false,
    hmr: false
  },
  preview: {
    port: 5173,
    host: '0.0.0.0'
  }
});
