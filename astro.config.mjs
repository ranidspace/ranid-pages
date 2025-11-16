// @ts-check

import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: "https://ranid.space",
  integrations: [sitemap(), mdx()],
});
