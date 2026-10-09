import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const clientRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: clientRoot,
  plugins: [react()],
  resolve: { preserveSymlinks: true, dedupe: ['react', 'react-dom'] },
  server: { port: 5173, proxy: { '/api': 'http://localhost:4100' } },
});
