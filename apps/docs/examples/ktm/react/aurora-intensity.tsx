import { Aurora } from "@/registry/react/aurora"

export default function AuroraIntensityDemo() {
  return (
    <div
      style={{
        display: "grid",
        maxWidth: "32rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
        gap: "0.75rem",
      }}
    >
      <Aurora
        gradient="forest"
        mask="center"
        intensity="subtle"
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
        <strong style={{ fontSize: "1.125rem" }}>Subtle</strong>
      </Aurora>
      <Aurora
        gradient="forest"
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
        <strong style={{ fontSize: "1.125rem" }}>Default</strong>
      </Aurora>
      <Aurora
        gradient="forest"
        mask="center"
        intensity="strong"
        speed="fast"
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
        <strong style={{ fontSize: "1.125rem" }}>Strong and fast</strong>
      </Aurora>
      <Aurora
        gradient="forest"
        mask="center"
        animated={false}
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
        <strong style={{ fontSize: "1.125rem" }}>Still</strong>
      </Aurora>
    </div>
  )
}
