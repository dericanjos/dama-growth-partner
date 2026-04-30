import { QueenIcon } from "@/components/brand/QueenIcon";

/**
 * Divisor ornamental dourado com a coroa DAMA ao centro.
 * Usar entre seções para reforçar branding com elegância.
 */
export function CrownDivider({
  variant = "light",
  className = "",
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const lineColor =
    variant === "dark"
      ? "color-mix(in oklab, var(--gold) 45%, transparent)"
      : "color-mix(in oklab, var(--gold) 55%, transparent)";

  return (
    <div
      className={`flex items-center justify-center gap-4 py-8 ${className}`}
      aria-hidden
    >
      <span
        className="h-px w-20 sm:w-32"
        style={{
          background: `linear-gradient(90deg, transparent, ${lineColor})`,
        }}
      />
      <QueenIcon className="h-7 w-auto opacity-90" />
      <span
        className="h-px w-20 sm:w-32"
        style={{
          background: `linear-gradient(90deg, ${lineColor}, transparent)`,
        }}
      />
    </div>
  );
}
