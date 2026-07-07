interface TelemetryLabelProps {
  children: React.ReactNode;
  variant?: "steel" | "amber" | "teal" | "signal" | "trace";
  as?: "span" | "div" | "p";
  className?: string;
}

const colorMap: Record<NonNullable<TelemetryLabelProps["variant"]>, string> = {
  steel: "text-[var(--color-steel)]",
  amber: "text-[var(--color-amber)]",
  teal: "text-[var(--color-teal)]",
  signal: "text-[var(--color-signal)]",
  trace: "text-[var(--color-trace)]",
};

export function TelemetryLabel({
  children,
  variant = "steel",
  as: Tag = "span",
  className = "",
}: TelemetryLabelProps) {
  return <Tag className={`telemetry ${colorMap[variant]} ${className}`}>{children}</Tag>;
}
