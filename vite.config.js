/* eslint-disable no-undef */
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin([
      'VITE_REACT_APP_WALLET_PROJECT_ID',
      'VITE_REACT_APP_BASE_URL',
    ]),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    global: 'window',
  },
});
