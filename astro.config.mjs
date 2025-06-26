// @ts-check

import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://ranid.space",
  integrations: [sitemap()],
  redirects: {
    "/numbers": "/blog/numbers",
  },
});
