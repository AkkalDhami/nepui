import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default withMDX(nextConfig)