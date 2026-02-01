// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';

// https://astro.build/config
export default defineConfig({
  site: 'https://alexpruteanu.cloud',
  integrations: [sitemap(), mermaid()],
  markdown: {
    shikiConfig: {
      theme: 'tokyo-night',
      wrap: true,
    },
  },
  vite: {
    build: {
      // Inline small CSS files to reduce requests
      assetsInlineLimit: 4096,
      // CSS code splitting optimization
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Aggressive code splitting for better caching
          manualChunks: undefined,
        },
      },
    },
  },
});
