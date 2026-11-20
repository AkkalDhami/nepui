import type { MetadataRoute } from "next"

import { getDocUrls } from "@/lib/docs-urls"
import { absoluteUrl } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/docs"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  const docRoutes: MetadataRoute.Sitemap = getDocUrls().map((doc) => ({
    url: absoluteUrl(doc.url),
    lastModified: doc.lastModified,
    changeFrequency: "monthly",
    priority: doc.url.includes("/components/") ? 0.8 : 0.6,
  }))

  return [...staticRoutes, ...docRoutes]
}
