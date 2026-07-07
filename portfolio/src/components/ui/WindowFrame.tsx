import Image from "next/image";

interface WindowFrameProps {
  /** image src in /public; if missing, render the labeled placeholder */
  src?: string;
  label: string; // placeholder label OR alt text
  url?: string; // mono url bar text
  dark?: boolean; // dark screenshot styling
  className?: string;
}

/**
 * Minimal browser/window chrome around a screenshot. During dev, when the
 * image file is absent, shows a labeled placeholder block per the spec.
 */
export function WindowFrame({
  src,
  label,
  url = "app.local",
  dark = false,
  className = "",
}: WindowFrameProps) {
  return (
    <div className={`window-frame ${className} border-0`}>
      {/* chrome bar */}
      <div className="flex items-center gap-3 bg-[var(--color-card)] px-3 py-2.5 border-0">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-hairline)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-hairline)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-hairline)]" />
        </div>
        <div className="flex-1 truncate rounded-[4px] bg-[var(--color-paper)] px-3 py-1 font-mono text-[11px] text-[var(--color-steel)]">
          {url}
        </div>
      </div>

      {/* viewport */}
      {src ? (
        <Image
          src={`/screenshots/${src}`}
          alt={label}
          width={1440}
          height={900}
          className="block h-auto w-full border-0"
        />
      ) : (
        <div
          className={`flex aspect-[16/10] items-center justify-center border-0 ${
            dark ? "bg-[var(--color-panel)]" : "bg-[#F1EFE8]"
          }`}
        >
          <span
            className={`font-mono text-[11px] uppercase tracking-[0.15em] ${
              dark ? "text-[var(--color-trace)]" : "text-[var(--color-steel)]"
            }`}
          >
            [ {label} ]
          </span>
        </div>
      )}
    </div>
  );
}
