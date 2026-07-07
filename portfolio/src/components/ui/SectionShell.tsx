import { TelemetryLabel } from "./TelemetryLabel";

interface SectionShellProps {
  id?: string;
  /** mono micro label, e.g. "02 — DIAGNOSIS" */
  label?: string;
  /** ghost numeral in the margin, e.g. "02" */
  numeral?: string;
  /** rotated vertical margin label */
  marginLabel?: string;
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Wraps a section with the instrument chrome: mono label, oversized ghost
 * numeral cropped at the margin, and a rotated vertical label. The numeral
 * and margin label are desktop-only decoration.
 */
export function SectionShell({
  id,
  label,
  numeral,
  marginLabel,
  dark = false,
  className = "",
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`relative isolate ${dark ? "bg-[var(--color-panel)] text-[var(--color-paper)]" : ""} ${className}`}
    >
      {numeral && (
        <span
          aria-hidden
          className="ghost-numeral -left-[0.15em] hidden lg:block"
        >
          {numeral}
        </span>
      )}
      {marginLabel && (
        <span
          aria-hidden
          className="margin-label pointer-events-none absolute right-3 top-24 hidden xl:block"
        >
          {marginLabel}
        </span>
      )}
      <div className="relative z-[1]">
        {label && (
          <div className="mb-8">
            <TelemetryLabel variant={dark ? "signal" : "steel"}>{label}</TelemetryLabel>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
