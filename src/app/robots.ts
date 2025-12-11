import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const sitemapUrl = `${siteConfig.url}/sitemap.xml`;
  const baseRules = {
    allow: "/",
    crawlDelay: 1,
  };

  return {
    rules: [
      {
        userAgent: "Googlebot",
        ...baseRules,
      },
      {
        userAgent: "GPTBot",
        ...baseRules,
      },
      {
        userAgent: "CCBot",
        ...baseRules,
      },
      {
        userAgent: "*",
        ...baseRules,
      },
    ],
    sitemap: [sitemapUrl],
    host: siteConfig.url,
  };
}
