import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
export default defineConfig({
   site: 'https://jaksatomovic.github.io',
   base: 'jaksatomovic.github.io',
  integrations: [tailwind(),  sitemap()]
});
