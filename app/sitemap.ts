import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/blog", "/contact", "/projects/ryu-deco"].map(
    (path) => ({ url: `https://ryurim0109.github.io${path}/` }),
  );
}
