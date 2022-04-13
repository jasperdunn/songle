/// <reference types="vitest" />

import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({ projects: [resolve(__dirname, 'tsconfig.json')] }),
  ],
  // https://vitest.dev/config/#configuration
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
