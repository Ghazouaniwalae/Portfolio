type Width = "full" | "wide" | "editorial" | "narrow";

const map: Record<Width, string> = {
  full: "container-full",
  wide: "container-wide",
  editorial: "container-editorial",
  narrow: "container-narrow",
};

export function Container({
  width = "wide",
  className = "",
  children,
}: {
  width?: Width;
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`${map[width]} ${className}`}>{children}</div>;
}
