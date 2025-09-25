import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    __DEV__: JSON.stringify(true),
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg/lib/commonjs/ReactNativeSVG.web',
      '@': resolve(__dirname, './'),
    },
    extensions: ['.web.js', '.web.ts', '.web.tsx', '.js', '.ts', '.tsx', '.json'],
  },
  optimizeDeps: {
    include: ['react-native-web'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    port: 19006,
    host: true,
  },
});