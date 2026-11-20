import { GradientName, GradientText } from "@/registry/react/gradient-text"

const gradientNames: GradientName[] = [
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

export default function GradientTextGradientsDemo() {
  return (
    <div
      style={{
        display: "grid",
        maxWidth: "28rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(8rem, 2fr))",
        gap: "0.5rem 1rem",
        fontSize: "1.5rem",
        fontWeight: 500,
      }}
    >
      {gradientNames.map((name) => (
        <GradientText key={name} gradient={name}>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </GradientText>
      ))}
    </div>
  )
}
