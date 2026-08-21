/** Brand-aware logo. Stable export and props; display identity switches by env. */
import * as React from "react";
import { cn } from "@insightfy/ui";
import { COMPANY_BRAND, COMPANY_BRAND_VARIANT } from "@/lib/brand";

export type LogoProps = React.HTMLAttributes<HTMLSpanElement>;

export function Logo({ className, ...props }: LogoProps) {
  if (COMPANY_BRAND_VARIANT === "atria") {
    return (
      <span
        className={cn("group inline-flex select-none items-center gap-2.5", className)}
        {...props}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 64 64"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect width="64" height="64" rx="18" fill="#0D0D0F" />
          <path
            fill="#FFFFFF"
            fillRule="evenodd"
            d="M16 20C16 13.373 21.373 8 28 8h20v48H28c-6.627 0-12-5.373-12-12v-5.5c0-2.997 1.097-5.738 2.912-7.841C17.097 28.783 16 26.042 16 23.045V20Zm13 3a6 6 0 0 0-6 6v6a6 6 0 0 0 6 6h9V23h-9Z"
          />
          <rect x="29" y="29" width="8" height="8" fill="#FF7918" />
        </svg>
        <span className="font-display text-xl font-bold lowercase tracking-[-0.055em] text-text">
          {COMPANY_BRAND.wordmark}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn("group inline-flex select-none items-center gap-2", className)}
      {...props}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-accent"
      >
        <rect
          x="2.25"
          y="2.25"
          width="19.5"
          height="19.5"
          rx="5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-70"
        />
        {/* stylized insight glyph: brackets framing a rising spark */}
        <path
          d="M8.5 7.5 6 12l2.5 4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 7.5 18 12l-2.5 4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 14.5 12 9l1.5 3 .9-1.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-text">
        {COMPANY_BRAND.wordmark}
      </span>
    </span>
  );
}
