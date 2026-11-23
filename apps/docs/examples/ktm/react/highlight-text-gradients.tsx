import { GradientName } from "@/registry/react/gradient-text"
import { Highlight } from "@/registry/react/highlight-text"

const gradientNames: readonly GradientName[] = [
  "aurora",
  "sunrise",
  "sunset",
  "ocean",
  "forest",
  "fire",
  "candy",
  "lavender",
  "mint",
  "peach",
  "midnight",
  "gold",
  "rainbow",
  "cyber",
  "plasma",
  "mono",
]

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
