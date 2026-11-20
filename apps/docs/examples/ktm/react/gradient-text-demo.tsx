import { GradientText } from "@/registry/react/gradient-text"

export default function GradientTextDemo() {
  return (
    <GradientText
      render={<h2 />}
      style={{
        margin: 0,
        fontSize: "2.5rem",
        fontWeight: 500,
        letterSpacing: "-0.02em",
      }}
    >
      Build faster with nepui
    </GradientText>
  )
}
