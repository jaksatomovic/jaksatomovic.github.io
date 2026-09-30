import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://jaksatomovic.github.io",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "hr"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [tailwind(), sitemap()],
});
