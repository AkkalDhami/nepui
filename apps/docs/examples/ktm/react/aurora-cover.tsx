import { Aurora } from "@/registry/react/aurora"
import { Button } from "@/registry/react/button"
import { GradientText } from "@/registry/react/gradient-text"

export default function AuroraCoverDemo() {
  return (
    <Aurora
      render={<section />}
      gradient="sunset"
      mask="none"
      intensity="strong"
      style={{
        display: "grid",
        placeItems: "center",
        gap: "1rem",
        padding: "7rem 1.5rem",
        textAlign: "center",
        borderRadius: "var(--np-radius-xl)",
        border: "1px solid var(--np-border)",
      }}
    >
      <h1
        style={{
          margin: 0,
          maxWidth: "32rem",
          fontSize: "3.25rem",
          lineHeight: 1.05,
          fontWeight: 500,
          letterSpacing: "-0.035em",
        }}
      >
        Ship something <GradientText gradient="fire">beautiful</GradientText>
      </h1>
      <p
        style={{
          margin: 0,
          maxWidth: "26rem",
        }}
      >
        The glow covers the whole section, so the content stays in front.
      </p>
      <Button>Start building</Button>
    </Aurora>
  )
}
