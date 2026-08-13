import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale } from "@/i18n";

/** Redirect the bare root `/` to the default locale. */
export function middleware(request: NextRequest) {
  const publicOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const origin = publicOrigin ? `${publicOrigin}/` : request.url;
  return NextResponse.redirect(new URL(`/${defaultLocale}`, origin));
}

export const config = {
  matcher: ["/"],
};
