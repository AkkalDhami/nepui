import { Aurora } from "@/registry/react/aurora"
import { Button } from "@/registry/react/button"
import { GradientText } from "@/registry/react/gradient-text"

export default function AuroraDemo() {
  return (
    <Aurora
      render={<section />}
      gradient="ocean"
      style={{
        position: "relative",
        display: "grid",
        placeItems: "center",
        gap: "1rem",
        padding: "5rem 1.5rem",
        textAlign: "center",
        border: "1px solid var(--np-border)",
        borderRadius: "var(--np-radius-xl)",
      }}
    >
      <h1
        style={{
          margin: 0,
          maxWidth: "30rem",
          fontSize: "3rem",
          lineHeight: 1.1,
          fontWeight: 500,
          letterSpacing: "-0.03em",
        }}
      >
        Interfaces that feel <GradientText gradient="ocean">alive</GradientText>
      </h1>
      <p
        style={{
          margin: 0,
          maxWidth: "28rem",
        }}
      >
        A slow, soft glow behind your hero. Pure CSS, no canvas and no script.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.75rem",
        }}
      >
        <Button className={"np-button-rounded"}>Get started</Button>
        <Button className={"np-button-rounded"} variant="secondary">
          Learn more
        </Button>
      </div>
    </Aurora>
  )
}
