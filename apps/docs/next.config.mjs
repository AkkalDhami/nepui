import { createMDX } from 'fumadocs-mdx/next'

const withMDX = createMDX()

const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  typedRoutes: true,
}

export default withMDX(nextConfig)