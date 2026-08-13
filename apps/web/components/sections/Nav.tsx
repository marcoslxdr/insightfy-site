/**
 * Nav (client) — top navigation bar.
 * STABLE CONTRACT: export `Nav`, props { dict: Dictionary["nav"]; locale }.
 * Renders Logo + LanguageSwitcher. Parallel agent replaces visuals only.
 */
"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button, Container, cn } from "@insightfy/ui";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary, Locale } from "@/i18n/types";
import { COMPANY_BRAND } from "@/lib/brand";

export interface NavProps {
  dict: Dictionary["nav"];
  locale: Locale;
}

function resolveNavHref(href: string, locale: Locale): string {
  if (href.startsWith("#")) return `/${locale}${href}`;
  if (href.startsWith("/")) return `/${locale}${href}`;
  return href;
}

export function Nav({ dict, locale }: NavProps) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-base/70 backdrop-blur-md supports-[backdrop-filter]:bg-bg-base/60">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href={`/${locale}`} aria-label={COMPANY_BRAND.publicName} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {dict.links.map((link) => {
            const href = resolveNavHref(link.href, locale);
            const isInternal = href.startsWith("/");
            if (isInternal) {
              return (
                <Link
                  key={link.href}
                  href={href}
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.href}
                href={href}
                className="text-sm text-muted transition-colors hover:text-text"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} />
          <Button asChild variant="primary" className="hidden sm:inline-flex">
            <a href={`/${locale}#contato`}>{dict.cta}</a>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text transition-colors hover:bg-white/5 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border bg-bg-base/95 backdrop-blur-md md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {dict.links.map((link) => {
                const href = resolveNavHref(link.href, locale);
                const className = cn(
                  "rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-text",
                );
                if (href.startsWith("/")) {
                  return (
                    <Link
                      key={link.href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={className}
                    >
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <a
                    key={link.href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={className}
                  >
                    {link.label}
                  </a>
                );
              })}
              <Button
                asChild
                variant="primary"
                className="mt-2 w-full sm:hidden"
              >
                <a href={`/${locale}#contato`} onClick={() => setOpen(false)}>
                  {dict.cta}
                </a>
              </Button>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
