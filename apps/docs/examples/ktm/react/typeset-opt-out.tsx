"use client"

import "@/registry/react/tokens.css"
import "@/registry/react/typeset.css"

export default function TypesetOptOut() {
  return (
    <div className="np-typeset" style={{ width: "100%", maxWidth: "28rem" }}>
      <p>This paragraph is styled by Typeset.</p>
      <div
        className="np-typeset-not"
        style={{
          marginBlockStart: "1.25em",
          padding: "0.75rem 1rem",
          border: "1px dashed var(--np-border)",
          borderRadius: "var(--np-radius-lg)",
        }}
      >
        <p style={{ margin: 0 }}>
          This one is inside np-typeset-not, so Typeset leaves it alone.
        </p>
      </div>
    </div>
  )
}
