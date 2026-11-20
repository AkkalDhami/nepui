import { Aurora } from "@/registry/react/aurora"

export default function AuroraMasksDemo() {
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
        gradient="candy"
        mask="corner"
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
        <strong style={{ fontSize: "1.125rem" }}>corner</strong>
        <span
          style={{ color: "var(--np-muted-foreground)", fontSize: "0.8125rem" }}
        >
          From the corner
        </span>
      </Aurora>
      <Aurora
        gradient="candy"
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
        <strong style={{ fontSize: "1.125rem" }}>center</strong>
        <span
          style={{ color: "var(--np-muted-foreground)", fontSize: "0.8125rem" }}
        >
          Centered glow
        </span>
      </Aurora>
      <Aurora
        gradient="candy"
        mask="top"
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
        <strong style={{ fontSize: "1.125rem" }}>top</strong>
        <span
          style={{ color: "var(--np-muted-foreground)", fontSize: "0.8125rem" }}
        >
          Fades downward
        </span>
      </Aurora>
      <Aurora
        gradient="candy"
        mask="bottom"
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
        <strong style={{ fontSize: "1.125rem" }}>bottom</strong>
        <span
          style={{ color: "var(--np-muted-foreground)", fontSize: "0.8125rem" }}
        >
          Rises from below
        </span>
      </Aurora>
      <Aurora
        gradient="candy"
        mask="none"
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
        <strong style={{ fontSize: "1.125rem" }}>none</strong>
        <span
          style={{ color: "var(--np-muted-foreground)", fontSize: "0.8125rem" }}
        >
          Fills the box
        </span>
      </Aurora>
    </div>
  )
}
