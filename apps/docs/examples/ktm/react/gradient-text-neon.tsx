import { GradientText } from "@/registry/react/gradient-text"

export default function GradientTextNeonDemo() {
  const style = { fontSize: "2rem", fontWeight: 500 }
  return (
    <div
      style={{
        display: "grid",
        gap: "0.75rem",
        padding: "2rem",
        borderRadius: "var(--np-radius-xl)",
        background: "#0a0a0a",
        overflow: "hidden",
      }}
    >
      <GradientText gradient="cyber" neon="soft" style={style}>
        Soft glow
      </GradientText>
      <GradientText gradient="cyber" neon style={style}>
        Neon glow
      </GradientText>
      <GradientText gradient="plasma" neon="strong" style={style}>
        Strong glow
      </GradientText>
      <GradientText gradient="fire" neon flicker animated={false} style={style}>
        Flickering sign
      </GradientText>
    </div>
  )
}
