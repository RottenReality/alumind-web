import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_TITLE_ES = "Alumind — Aluminium and copper experts";
const SITE_TITLE_EN = "Alumind — Expertos en aluminio y cobre";
const SITE_DESCRIPTION_ES = "Servicios profesionales en producción y aleaciones de aluminio y cobre, venta de cobre y suministro de espectrómetros ARUN para análisis metalúrgico.";
const SITE_DESCRIPTION_EN = "Professional services in aluminum and copper production, alloy design, copper sales, and ARUN spectrometers for advanced metallurgical analysis.";
const SITE_URL = "https://alumind.co";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const BUSINESS_PHONE = "+57 313 671 0605";
const BUSINESS_ADDRESS = {
  locality: "Envigado",
  region: "Antioquia",
  postalCode: "055421",
};

type Props = {
  children: React.ReactNode;
  params: any;
};

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale?.toLowerCase().startsWith("es");

  const title = isEs ? SITE_TITLE_ES : SITE_TITLE_EN;
  const description = isEs ? SITE_DESCRIPTION_ES : SITE_DESCRIPTION_EN;

  const alternates = {
    canonical: `${SITE_URL}/${locale}`,
    languages: {
      en: `${SITE_URL}/en`,
      es: `${SITE_URL}/es`,
    },
  };

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: isEs ? SITE_TITLE_ES : SITE_TITLE_EN,
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
      type: "website",
      locale: isEs ? "es_ES" : "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
    alternates,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: locale.startsWith("es") ? "Alumind Technology" : "Alumind Technology",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/images/logo.png`,
    telephone: BUSINESS_PHONE,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS_ADDRESS.locality,
      addressRegion: BUSINESS_ADDRESS.region,
      postalCode: BUSINESS_ADDRESS.postalCode,
    }
  };

  return (
    <html lang={locale}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180.png" />
        <link rel="icon" type="image/svg+xml" href="/icons/favicon.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Alumind" />
        <meta name="theme-color" content="#085d92" />
        <meta name="msapplication-TileColor" content="#085d92" />
        <link rel="preload" as="image" href="/images/hero-fallback.avif" type="image/avif" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NavBar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
