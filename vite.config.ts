import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Expõe o servidor para a rede
    port: 5173, // Porta padrão do Vite
  },
});