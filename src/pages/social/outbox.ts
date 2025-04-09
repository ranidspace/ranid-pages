import markdownit from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { getCollection } from "astro:content";
import { siteConfig } from "src/config";
import type { APIRoute } from "astro";

const year = +new Date().getFullYear();

const markdown = markdownit("commonmark");

/* generate initial feed */
let outbox = {
  "@context": "https://www.w3.org/ns/activitystreams",
  id: "https://ranid.space/social/outbox",
  type: "OrderedCollection",
  summary: "A test feed for ranid.space",
  totalItems: 0,
  orderedItems: [],
};

/* Build Feed From Posts */

export const GET: APIRoute = async ({ site }) => {
  // Find markdown files in blog
  const collection = await getCollection("blog");
  // Map over array of blog post files
  const posts: any[] = await Promise.all(
    collection.map(async (post) => {
      // Generate excerpt from content
      const excerpt = sanitizeHtml(
        markdown
          .render(post.body)
          .replaceAll('src="/', `src="${siteConfig.url}/`)
          .replaceAll('href="/', `href="${siteConfig.url}/`),
        { allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]) }
      );
      const date = new Date(Date.parse(post.data.date));
      // Return data + add extra fields
      return {
        "@context": "https://www.w3.org/ns/activitystreams",
        type: "Note",
        attributedTo: "https://ranid.space/fedi",
        published: date,
        to: "https://www.w3.org/ns/activitystreams#Public",
        url: siteConfig.url + "/blog/" + post.id,
        name: post.data.title,
        content: excerpt,
      };
    })
  );
  // Sort posts
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  // Add post items
  posts.forEach((item) => outbox.orderedItems.push(item));
  outbox.totalItems = posts.length;
  // Write output file
  return Response.json(outbox);
  // Show cli stats
};
