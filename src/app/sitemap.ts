import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes = ["/"];

  return routes.map((route) => ({
    url: absoluteUrl(route),
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
