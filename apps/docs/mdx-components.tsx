import type { MDXComponents } from "mdx/types"
import React from "react"
import { cn } from "cn"
import { ComponentPreview } from "@/components/preview/component-preview"
import { getIconForLanguageExtension } from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import {
  CodeBlockCommand,
  ReactCodeBlockCommand,
} from "@/components/docs/code-block-command"
import { CopyButton } from "@/components/docs/copy-button"
import PackageManagerTabs from "@/components/docs/package-manager-tabs"
import { ReactPreview } from "@/components/preview/react-preview"

function getNodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map((child) => getNodeText(child)).join("")
  }

  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return getNodeText(node.props.children)
  }

  return ""
}

function getHeadingId(children: React.ReactNode) {
  const id = getNodeText(children)
    .trim()
    .replace(/\s+/g, "-")
    .replace(/'/g, "")
    .replace(/\?/g, "")
    .toLowerCase()

  return id || undefined
}

function HeadingAnchor({
  id,
  children,
}: {
  id?: string
  children: React.ReactNode
}) {
  if (!id) {
    return children
  }

  return (
    <a className="group no-underline" href={`#${id}`}>
      <span className="underline-offset-4 group-hover:underline">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="heading-anchor ml-2 text-muted-foreground opacity-0 group-hover:opacity-100"
      >
        #
      </span>
    </a>
  )
}

export const mdxComponents = {
  PackageManagerTabs,
  ComponentPreview,
  ReactPreview,
  CodeBlockCommand,
  ReactCodeBlockCommand,

  h1: ({ children, id, ...props }: React.ComponentProps<"h1">) => {
    const headingId = id ?? getHeadingId(children)

    return (
      <h1 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h1>
    )
  },
  h2: ({ children, id, ...props }: React.ComponentProps<"h2">) => {
    const headingId = id ?? getHeadingId(children)

    return (
      <h2 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h2>
    )
  },
  h3: ({ children, id, ...props }: React.ComponentProps<"h3">) => {
    const headingId = id ?? getHeadingId(children)

    return (
      <h3 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h3>
    )
  },
  h4: ({ children, id, ...props }: React.ComponentProps<"h4">) => {
    const headingId = id ?? getHeadingId(children)

    return (
      <h4 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h4>
    )
  },
  h5: ({ children, id, ...props }: React.ComponentProps<"h5">) => {
    const headingId = id ?? getHeadingId(children)

    return (
      <h5 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h5>
    )
  },
  h6: ({ children, id, ...props }: React.ComponentProps<"h6">) => {
    const headingId = id ?? getHeadingId(children)

    return (
      <h6 id={headingId} {...props}>
        <HeadingAnchor id={headingId}>{children}</HeadingAnchor>
      </h6>
    )
  },

  p: ({ className, ...props }) => (
    <p className={cn("text-muted-primary", className)} {...props} />
  ),
  figure: ({ className, ...props }: React.ComponentProps<"figure">) => {
    return <figure className={cn(className)} {...props} />
  },
  table: (props: React.ComponentProps<"table">) => (
    <div className="typeset-scroll scroll-fade-x scrollbar-none *:[table]:w-full">
      <table {...props} />
    </div>
  ),
  pre: ({ className, children, ...props }: React.ComponentProps<"pre">) => {
    return (
      <pre
        data-not-typeset
        className={cn(
          "relative mt-4 mb-2 no-scrollbar min-w-0 overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto rounded-lg bg-code px-1 py-4 outline-none has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0",
          className
        )}
        {...props}
      >
        {children}
      </pre>
    )
  },
  figcaption: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"figcaption">) => {
    const iconExtension =
      "data-language" in props && typeof props["data-language"] === "string"
        ? getIconForLanguageExtension(props["data-language"])
        : null

    return (
      <figcaption
        className={cn(
          "text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70",
          className
        )}
        {...props}
      >
        {iconExtension}
        {children}
      </figcaption>
    )
  },
  code: ({
    className,
    children,
    __raw__,
    __npm__,
    __yarn__,
    __pnpm__,
    __bun__,
    ...props
  }: React.ComponentProps<"code"> & {
    __raw__?: string
    __npm__?: string
    __yarn__?: string
    __pnpm__?: string
    __bun__?: string
  }) => {
    // Inline Code.
    if (typeof children === "string") {
      return (
        <code className={cn("text-foreground", className)} {...props}>
          {children}
        </code>
      )
    }

    // npm command.
    const isNpmCommand = __npm__ && __yarn__ && __pnpm__ && __bun__
    if (isNpmCommand) {
      return (
        <PackageManagerTabs
          command={__npm__ || __yarn__ || __pnpm__ || __bun__}
        />
      )
    }

    // Default codeblock.
    return (
      <>
        {__raw__ && (
          <CopyButton
            value={__raw__}
            className="absolute top-4 right-4 z-40 w-auto cursor-pointer bg-transparent p-1.5 text-xs"
          />
        )}
        <code
          className={cn(
            "block max-h-100 scroll-fade scrollbar-none overflow-auto text-base",
            className
          )}
          {...props}
        >
          {children}
        </code>
      </>
    )
  },
  a: (props) => (
    <a
      target="_blank"
      className="font-medium text-muted-primary underline underline-offset-1 hover:text-foreground"
      {...props}
    />
  ),
  strong: (props) => <strong className="text-primary" {...props} />,
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn("mt-6 border-l-2 border-l-neutral-500 pl-4", className)}
      {...props}
    />
  ),
  Step: (props: React.ComponentProps<"h3">) => (
    <h3 {...props} className="toc-ignore" />
  ),
  Steps: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div
      className={cn(
        "steps [&>h3]:step mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8",
        className
      )}
      {...props}
    />
  ),

  Image: ({
    src,
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<"img">) => (
    <Image
      className={cn("mt-6 rounded-2xl border", className)}
      src={(src as string) || ""}
      width={Number(width)}
      height={Number(height)}
      alt={alt || ""}
      {...props}
    />
  ),

  Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => {
    return <Tabs className={cn("relative mt-6 w-full", className)} {...props} />
  },
  TabsList: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsList>) => (
    <TabsList
      className={cn(
        "justify-start gap-4 rounded-none bg-transparent px-0",
        className
      )}
      {...props}
    />
  ),
  TabsTrigger: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsTrigger>) => (
    <TabsTrigger
      className={cn(
        "mb-4 rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-6 text-base font-medium text-muted-foreground hover:text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none! dark:data-[state=active]:border-primary dark:data-[state=active]:bg-transparent hover:[&_p]:text-primary! data-[state=active]:[&_p]:text-accent-foreground!",
        className
      )}
      {...props}
    />
  ),
  TabsContent: ({
    className,
    ...props
  }: React.ComponentProps<typeof TabsContent>) => (
    <TabsContent
      className={cn(
        "relative my-2 [&_h3.font-heading]:text-base *:[figure]:first:mt-0",
        className
      )}
      {...props}
    />
  ),
  Tab: ({ className, ...props }: React.ComponentProps<"div">) => (
    <div className={cn(className)} {...props} />
  ),
} satisfies MDXComponents
