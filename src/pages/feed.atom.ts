/*!
 * heavily modified from generate-feed.ts v1.0.0
 *
 * https://github.com/equk/
 *
 * Copyright (c) 2023 B.Walden. All rights reserved.
 *
 * Licensed under the MIT License
 *
 * (LICENSE file should be included with script)
 */

import { type CollectionEntry, getCollection } from "astro:content";
import type { FeedOptions, Item } from "feed";
import { Feed } from "feed";
import { rehypeMdxElements } from "rehype-mdx-elements";
import rehypePresetMinify from "rehype-preset-minify";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import remarkSmartypants from "remark-smartypants";
import { siteConfig } from "src/config";
import { unified } from "unified";

const feedOptions: FeedOptions = {
  title: siteConfig.title,
  description: siteConfig.description,
  id: siteConfig.url,
  link: siteConfig.url,
  language: "en",
  favicon: siteConfig.url + "favicon.svg",
  copyright: +new Date().getFullYear() + ", ranidspace",
  feedLinks: {
    atom: siteConfig.url + "feed.atom",
  },
  author: {
    name: siteConfig.author.name,
    link: siteConfig.url,
  },
};

export async function GET() {
  const collection = await getCollection("blog");
  const feed = new Feed(feedOptions);
  const posts = await collectionToPosts(collection);

  posts.sort((a, b) => +b.date - +a.date);
  posts.forEach((item) => feed.addItem(item));

  return new Response(feed.atom1());
}

async function collectionToPosts(collection: CollectionEntry<"blog">[]) {
  return Promise.all(
    collection.map(async (post) => {
      const articleContent = await markdownConvert(post);

      const item: Item = {
        title: post.data.title,
        published: post.data.date,
        date: post.data.updated ? post.data.updated : post.data.date,
        id: siteConfig.url + "blog/" + post.id,
        link: siteConfig.url + "blog/" + post.id,
        description: "",
        content: String(articleContent),
      };
      return item;
    }),
  );
}

async function markdownConvert(post: CollectionEntry<"blog">) {
  if (post.filePath.endsWith("mdx")) return await markdownXConvert(post);
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSmartypants)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      passThrough: [],
    })
    .use(rehypeRaw)
    .use(rehypeAbsoluteUrls, siteConfig.url)
    .use(rehypeSanitize, {
      ...defaultSchema,
      tagNames: [...defaultSchema.tagNames, "small", "ins"],
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
}

async function markdownXConvert(post: CollectionEntry<"blog">) {
  return unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkGfm)
    .use(remarkSmartypants)
    .use(remarkFilterMdx)
    .use(remarkRehype, {
      allowDangerousHtml: true,
      passThrough: ["mdxJsxFlowElement", "mdxJsxTextElement"],
    })
    .use(rehypeMdxElements)
    .use(rehypeSanitize, {
      ...defaultSchema,
      tagNames: [...defaultSchema.tagNames, "small", "ins"],
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
    .process(
      "**This post contains data which isn't rendered in the Atom Feed**\n\n" +
        post.body,
    );
}

import type { Root as HastRoot, RootContent } from "hast";
import type { Root as MdastRoot } from "mdast";
import type { Plugin } from "unified";

// Helper to create absolute URLs
export function createUrl(path: string, baseUrl: string): string | null {
  try {
    const fullUrl = new URL(path, baseUrl);
    return fullUrl.href;
  } catch (error) {
    console.error("Invalid path or base URL:", error);
    return null;
  }
}

const remarkFilterMdx: Plugin<[], MdastRoot> = () => {
  return (tree) => {
    tree.children = tree.children.filter((node) => node.type !== "mdxjsEsm");
    tree.children = tree.children.filter(
      (node) => node.type !== "mdxFlowExpression" || node.value === "/*more*/",
    );
    return tree;
  };
};

// Custom rehype plugin to make URLs absolute
const rehypeAbsoluteUrls: Plugin<[string], HastRoot> = (baseUrl) => {
  // ... (implementation traverses HAST, updates href/src)
  return (tree) => {
    const visit = (node: RootContent | HastRoot) => {
      if (node.type === "element") {
        if (node.tagName === "a" && node.properties?.href) {
          node.properties.href = createUrl(
            node.properties.href as string,
            baseUrl,
          );
        }
        if (node.tagName === "img" && node.properties?.src) {
          node.properties.src = createUrl(
            node.properties.src as string,
            baseUrl,
          );
        }
        // Note: A complete implementation would also handle `img[src]`, etc.
      }
      if ("children" in node) {
        node.children.forEach(visit);
      }
    };
    visit(tree);
    return tree;
  };
};
