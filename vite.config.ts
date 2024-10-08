import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/app/',
  // base: '/',
// 
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    injectRegister: false,
    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Symptom Tracker',
      short_name: 'Symptom Tracker',
      description: 'A tool to help people find their allergy trigger foods and track their symptoms',
      theme_color: '#ffffff',
      display: 'standalone',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})