import React from "react";

interface LogoProps {
  /** Size variant or explicit pixel size of the insignia icon */
  size?: "sm" | "md" | "lg";
  /** Optional override for insignia dimension in pixels */
  iconSize?: number;
  /** Visual theme for the wordmark and insignia */
  theme?: "light" | "dark";
  /** Whether to render the full trading house wordmark */
  showWordmark?: boolean;
  /** Insignia emblem variant */
  variant?: "weave" | "seal" | "monogram";
  /** Additional CSS class names for the container */
  className?: string;
}

/**
 * Attire Services Institutional Brand Insignia
 *
 * Designed to project institutional trust, global scale, and operational clarity.
 * Balances industrial manufacturing authority with maritime merchant trade heritage.
 */
export default function Logo({
  size = "md",
  iconSize,
  theme = "light",
  showWordmark = true,
  variant = "weave",
  className = "",
}: LogoProps) {
  // Dimensions
  const pxSize = iconSize ?? (size === "sm" ? 32 : size === "lg" ? 44 : 38);
  const isDark = theme === "dark";

  return (
    <div className={`group flex items-center gap-3 ${className}`}>
      {/* Insignia Emblem Badge */}
      <div
        style={{ width: pxSize, height: pxSize }}
        className={`relative flex shrink-0 items-center justify-center rounded-md border transition-all duration-200 ${
          isDark
            ? "border-white/15 bg-white/[0.06] text-brass-light shadow-sm group-hover:border-brass/40"
            : "border-line bg-navy text-brass-light shadow-sm group-hover:bg-navy-soft"
        }`}
      >
        <LogoInsignia variant={variant} />
      </div>

      {/* Wordmark and Descriptor */}
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-display font-bold tracking-tight leading-none ${
              size === "sm"
                ? "text-base"
                : size === "lg"
                ? "text-2xl"
                : "text-lg sm:text-xl"
            } ${isDark ? "text-white" : "text-ink"}`}
          >
            Attire Services
          </span>
          <span
            className={`font-mono uppercase tracking-[0.2em] mt-1 text-[9px] sm:text-[10px] leading-none ${
              isDark ? "text-brass-light/80" : "text-ink-muted"
            }`}
          >
            Trading House &middot; Est. 2009
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * Bespoke Vector Insignia
 * Clean geometric construction that scales cleanly from 16px to 128px.
 */
export function LogoInsignia({
  variant = "weave",
  className = "h-[58%] w-[58%]",
}: {
  variant?: "weave" | "seal" | "monogram";
  className?: string;
}) {
  if (variant === "seal") {
    // Merchant Guild Trading House Seal: Octagonal framing with compass register marks
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Octagonal outer bezel */}
        <polygon points="10,2 22,2 30,10 30,22 22,30 10,30 2,22 2,10" />
        {/* Inner geometric 'A' & balance ledger */}
        <path d="M7 23L16 6L25 23" />
        <path d="M10.5 17H21.5" />
        {/* Center mill vertical plumb line */}
        <line x1="16" y1="11" x2="16" y2="26" />
        <circle cx="16" cy="6" r="1.5" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "monogram") {
    // Interlocking 'AS' Industrial Trade Stamp
    return (
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Architectural 'A' framework */}
        <path d="M6 26L16 5L26 26" />
        <path d="M9.5 18H22.5" />
        {/* Interlocking 'S' loop woven through the crossbar */}
        <path
          d="M20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 15 20 15 20 18C20 20.2091 18.2091 22 16 22C13.7909 22 12 20.2091 12 18"
          strokeDasharray="0.5 0"
        />
      </svg>
    );
  }

  // Default: "weave" - The Interlocking Warp & Weft Loom Seal
  // An authentic textile engineering mark representing two warp yarns and two weft bands
  // intersecting in over-under twill geometry inside an industrial lozenge.
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Precision square frame with industrial chamfered corners */}
      <path d="M8 2H24L30 8V24L24 30H8L2 24V8L8 2Z" />

      {/* Warp beam 1 (left vertical) */}
      <path d="M12 7V25" />

      {/* Warp beam 2 (right vertical) */}
      <path d="M20 7V25" />

      {/* Weft pick 1 (upper horizontal) */}
      <path d="M7 12H25" />

      {/* Weft pick 2 (lower horizontal) */}
      <path d="M7 20H25" />

      {/* Center core register mark representing yarn apex / fabric calibration */}
      <rect x="14.5" y="14.5" width="3" height="3" fill="currentColor" />
    </svg>
  );
}
