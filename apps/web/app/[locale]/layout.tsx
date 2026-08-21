import type { Metadata } from "next";
import localFont from "next/font/local";
import { GridBackground } from "@insightfy/ui";
import { locales } from "@/i18n";
import { COMPANY_BRAND, COMPANY_BRAND_VARIANT, COMPANY_SITE_URL } from "@/lib/brand";
import "../globals.css";

const display = localFont({
  src: [
    {
      path: "../fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const mono = localFont({
  src: [
    {
      path: "../fonts/MartianMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/MartianMono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";
  const title =
    COMPANY_BRAND_VARIANT === "atria"
      ? isPt
        ? "Atria — Tecnologia, dados e pessoas em uma operação conectada"
        : "Atria — Technology, data, and people in one connected operation"
      : "Insightfy — Sistemas sob medida e Agentes de IA";
  const description = isPt
    ? COMPANY_BRAND.descriptionPt
    : COMPANY_BRAND.descriptionEn;
  const canonical = `${COMPANY_SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(COMPANY_SITE_URL),
    title: {
      default: title,
      template: `%s · ${COMPANY_BRAND.publicName}`,
    },
    description,
    alternates: {
      canonical,
      languages: {
        "pt-BR": `${COMPANY_SITE_URL}/pt`,
        "en-US": `${COMPANY_SITE_URL}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: COMPANY_BRAND.publicName,
      locale: isPt ? "pt_BR" : "en_US",
      type: "website",
      images: [
        {
          url:
            COMPANY_BRAND_VARIANT === "atria"
              ? "/brand/atria/og-image.svg"
              : "/og-image.webp",
          width: 1200,
          height: 630,
          alt: COMPANY_BRAND.publicName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        COMPANY_BRAND_VARIANT === "atria"
          ? "/brand/atria/og-image.svg"
          : "/og-image.webp",
      ],
    },
    icons:
      COMPANY_BRAND_VARIANT === "atria"
        ? { icon: "/brand/atria/favicon.svg", apple: "/brand/atria/mark.svg" }
        : undefined,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_BRAND.publicName,
    url: COMPANY_SITE_URL,
    description:
      locale === "pt" ? COMPANY_BRAND.descriptionPt : COMPANY_BRAND.descriptionEn,
    logo:
      COMPANY_BRAND_VARIANT === "atria"
        ? `${COMPANY_SITE_URL}/brand/atria/mark.svg`
        : `${COMPANY_SITE_URL}/og-image.webp`,
  };

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="relative min-h-screen bg-bg-base text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <GridBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
