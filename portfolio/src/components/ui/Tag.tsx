interface TagProps {
  children: React.ReactNode;
  className?: string;
}

/** Mono stack tag — used for tech labels. */
export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-steel)] ${className}`}
    >
      {children}
    </span>
  );
}
