import type { MetadataRoute } from "next"

import { absoluteUrl, siteConfig } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.VERCEL_ENV === undefined ||
    process.env.VERCEL_ENV === "production"

  if (!isProduction) {
    return { rules: { userAgent: "*", disallow: "/" } }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/og"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteConfig.url,
  }
}
