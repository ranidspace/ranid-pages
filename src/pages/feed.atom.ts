/*!
 * generate-feed.ts v1.0.0
 *
 * https://github.com/equk/
 *
 * Copyright (c) 2023 B.Walden. All rights reserved.
 *
 * Licensed under the MIT License
 *
 * (LICENSE file should be included with script)
 */

import { getCollection } from "astro:content";
import type { Item } from "feed";
import { Feed } from "feed";
import rehypePresetMinify from "rehype-preset-minify";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkSmartypants from "remark-smartypants";
import { siteConfig } from "src/config";
import { unified } from "unified";

const year = +new Date().getFullYear();

/* Main Feed Options */

const feed = new Feed({
  title: siteConfig.title,
  description: siteConfig.description,
  id: siteConfig.url + "/",
  link: siteConfig.url + "/",
  language: "en",
  author: {
    name: siteConfig.author.name,
  },
  copyright: `${year}, ranidspace`,
  favicon: siteConfig.url + "/favicon.svg",
  feedLinks: {
    atom: siteConfig.url + "/feed.atom",
  },
});

/* Build Feed From Posts */

export async function GET() {
  // Find markdown files in blog
  const collection = await getCollection("blog");
  // Map over array of blog post files
  const posts: any[] = await Promise.all(
    collection.map(async (post) => {
      // Generate excerpt from content
      const content = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkSmartypants)
        .use(remarkRehype, {
          allowDangerousHtml: true,
          passThrough: [],
        })
        .use(rehypeRaw)
        .use(rehypeSanitize, {
          ...defaultSchema,
          tagNames: [...defaultSchema.tagNames, "small"],
          attributes: {
            ...defaultSchema.attributes,
            ol: [["reversed"]],
          },
        })
        .use(rehypePresetMinify)
        .use(rehypeStringify, {
          characterReferences: {
            omitOptionalSemicolons: false,
          },
        })
        .process(post.body);
      const excerpt = String(content)
        .replaceAll('src="/', `src="${siteConfig.url}/`)
        .replaceAll('href="/', `href="${siteConfig.url}/`);

      // const excerpt = sanitizeHtml(
      //   markdown
      //     .render(post.body)
      //   { allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]) },
      // );
      const date = new Date(post.data.date);
      // Return data + add extra fields
      return {
        title: post.data.title,
        published: date,
        date: post.data.updated ? post.data.updated : date,
        id: siteConfig.url + "/blog/" + post.id,
        link: siteConfig.url + "/blog/" + post.id,
        description: "",
        content: excerpt,
      };
    }),
  );
  // Sort posts
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  // Add post items
  posts.forEach((item: Item) => feed.addItem(item));
  // Write output file
  return new Response(`${feed.atom1()}\n`);
}
