// import { getHtmlComponent } from "@/lib/registry";

// import { HtmlPreview } from "./html-preview";

// interface ComponentPreviewProps {
//   target: "html" | "react";
//   name: string;
// }

// export async function ComponentPreview({
//   target,
//   name,
// }: ComponentPreviewProps) {
//   if (target === "html") {
//     const component = await getHtmlComponent(name);

//     return (
//       <div className="not-typeset w-full my-6 overflow-hidden rounded-lg border">
//         <HtmlPreview
//           html={component.html}
//           css={component.css}
//           // tokens={component.tokens}
//         />
//       </div>
//     );
//   }

//   // const Component =
//   //   reactRegistry[name as keyof typeof reactRegistry];

//   // if (!Component) {
//   //   throw new Error(
//   //     `React component "${name}" is not registered.`,
//   //   );
//   // }

//   // return (
//   //   <div className="not-prose my-6 overflow-hidden rounded-lg border">
//   //     <ReactPreview component={Component} />
//   //   </div>
//   // );
// }

import { highlightCode } from "@/lib/highlight-code"
import { getHtmlComponentSource } from "@/lib/registry"
import { ComponentPreviewClient } from "./component-preview-client"

interface ComponentPreviewProps {
  name: string
  type?: "html" | "react"
  className?: string
}

export async function ComponentPreview({
  name,
  className,
}: ComponentPreviewProps) {
  const source = await getHtmlComponentSource(name)

  const [htmlHighlighted, cssHighlighted, jsHighlighted] = await Promise.all([
    highlightCode(source.html, "html"),
    highlightCode(source.css, "css"),
    source?.js && highlightCode(source?.js, "js"),
  ])

  return (
    <ComponentPreviewClient
      name={name}
      html={source.html}
      css={source.css}
      js={source.js}
      htmlHighlighted={htmlHighlighted}
      cssHighlighted={cssHighlighted}
      jsHighlighted={source?.js ? jsHighlighted : null}
      className={className}
    />
  )
}
