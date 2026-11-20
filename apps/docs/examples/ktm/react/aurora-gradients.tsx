import { Aurora, GradientName } from "@/registry/react/aurora"

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

export default function AuroraGradientsDemo() {
  return (
    <div
      style={{
        display: "grid",
        maxWidth: "32rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
        gap: "0.75rem",
      }}
    >
      {gradientNames.map((name) => (
        <Aurora
          key={name}
          gradient={name}
          mask="center"
          style={{
            display: "grid",
            placeItems: "center",
            gap: "0.25rem",
            padding: "2.5rem 1rem",
            textAlign: "center",
            border: "1px solid var(--np-border)",
            borderRadius: "var(--np-radius-lg)",
          }}
        >
          <strong style={{ fontSize: "1.125rem", textTransform: "capitalize" }}>
            {name}
          </strong>
          <span
            style={{
              color: "var(--np-muted-foreground)",
              fontSize: "0.8125rem",
            }}
          >
            gradient=&quot;{name}&ldquo;
          </span>
        </Aurora>
      ))}
    </div>
  )
}
