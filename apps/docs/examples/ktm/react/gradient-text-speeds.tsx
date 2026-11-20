import { GradientText } from "@/registry/react/gradient-text"

export default function GradientTextSpeedsDemo() {
  const style = { fontSize: "1.75rem", fontWeight: 500 }
  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <GradientText gradient="ocean" speed="slow" style={style}>
        Slow
      </GradientText>
      <GradientText gradient="ocean" style={style}>
        Default
      </GradientText>
      <GradientText gradient="ocean" speed="fast" style={style}>
        Fast
      </GradientText>
      <GradientText gradient="ocean" reverse style={style}>
        Reverse
      </GradientText>
      <GradientText gradient="ocean" animated={false} style={style}>
        Static
      </GradientText>
    </div>
  )
}
