import { Highlight, gradientNames } from "@/registry/react/highlight-text"

export default function HighlightGradientsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 1fr))",
        gap: "0.75rem 1rem",
        fontSize: "1.25rem",
        fontWeight: 600,
      }}
    >
      {gradientNames.map((name) => (
        <span key={name}>
          <Highlight gradient={name} variant="mark">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Highlight>
        </span>
      ))}
    </div>
  )
}
