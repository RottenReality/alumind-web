import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import "./globals.css";

type LocaleParams = { locale: string } | Promise<{ locale: string }>;

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const SITE_TITLE_ES = "Alumind — Expertos en aluminio y cobre | Espectrómetros Arun";
const SITE_TITLE_EN = "Alumind — Aluminum and Copper Experts | Arun Spectrometers";
const SITE_DESCRIPTION_ES = "Líderes en consultoría de producción de aluminio, diseño de aleaciones personalizadas y distribuidores autorizados de espectrómetros Arun Technology. Más de 25 años de experiencia metalúrgica. Servicio mundial.";
const SITE_DESCRIPTION_EN = "Leaders in aluminum production consulting, custom alloy design, and authorized Arun Technology spectrometer distributors. 25+ years of metallurgical expertise. Worldwide service.";
const SITE_URL = "https://alumind.co";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const BUSINESS_PHONE = "+57 313 671 0605";
const BUSINESS_EMAIL = "info@alumind.co";
const BUSINESS_ADDRESS = {
  locality: "Envigado",
  region: "Antioquia",
  postalCode: "055421",
  country: "Colombia"
};

// Keywords for SEO
const KEYWORDS_EN = [
  "aluminum production consulting",
  "aluminum alloy design",
  "copper alloy manufacturing",
  "Arun spectrometers",
  "Arun Technology distributors",
  "metallurgical consulting",
  "custom aluminum alloys",
  "OES spectrometers",
  "LIBS spectrometers",
  "aluminum production expertise",
  "copper production",
  "metallurgy consulting",
  "industrial spectrometers",
  "alloy analysis",
  "metal production consulting",
  "aluminum engineering",
  "spectrometer sales",
  "spectrometer maintenance",
  "ARTUS spectrometer",
  "CALIBUS spectrometer",
  "MERLIN spectrometer"
];

const KEYWORDS_ES = [
  "consultoría producción aluminio",
  "diseño aleaciones aluminio",
  "fabricación aleaciones cobre",
  "espectrómetros Arun",
  "distribuidores Arun Technology",
  "consultoría metalúrgica",
  "aleaciones aluminio personalizadas",
  "espectrómetros OES",
  "espectrómetros LIBS",
  "experiencia producción aluminio",
  "producción cobre",
  "consultoría metalurgia",
  "espectrómetros industriales",
  "análisis aleaciones",
  "consultoría producción metales",
  "ingeniería aluminio",
  "venta espectrómetros",
  "mantenimiento espectrómetros",
  "espectrómetro ARTUS",
  "espectrómetro CALIBUS",
  "espectrómetro MERLIN"
];

type Props = {
  children: React.ReactNode;
  params: LocaleParams;
};

export async function generateMetadata({ params }: { params: LocaleParams }): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale?.toLowerCase().startsWith("es");

  const title = isEs ? SITE_TITLE_ES : SITE_TITLE_EN;
  const description = isEs ? SITE_DESCRIPTION_ES : SITE_DESCRIPTION_EN;
  const keywords = isEs ? KEYWORDS_ES : KEYWORDS_EN;

  const alternates = {
    canonical: `${SITE_URL}/${locale}`,
    languages: {
      en: `${SITE_URL}/en`,
      es: `${SITE_URL}/es`,
      'x-default': `${SITE_URL}/en`,
    },
  };

  return {
    title: {
      default: title,
      template: `%s | ${isEs ? "Alumind — Expertos en aluminio y cobre" : "Alumind — Aluminum and Copper Experts"}`
    },
    description,
    keywords: keywords.join(", "),
    authors: [{ name: "Alumind Technology" }],
    creator: "Alumind Technology",
    publisher: "Alumind Technology",
    formatDetection: {
      telephone: true,
      email: true,
    },
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      siteName: "Alumind Technology",
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: isEs ? "Alumind - Expertos en aluminio, cobre y espectrómetros Arun" : "Alumind - Aluminum, Copper and Arun Spectrometer Experts"
        }
      ],
      type: "website",
      locale: isEs ? "es_ES" : "en_US",
      alternateLocale: isEs ? "en_US" : "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
    alternates,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes here when you have them
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
    category: 'technology',
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = (await import(`../../messages/${locale}.json`)).default;
  const isEs = locale.startsWith("es");

  // Enhanced JSON-LD structured data
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Alumind Technology",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: "250",
      height: "250"
    },
    description: isEs ? SITE_DESCRIPTION_ES : SITE_DESCRIPTION_EN,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS_ADDRESS.locality,
      addressRegion: BUSINESS_ADDRESS.region,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.country
    },
    sameAs: [
      // Add your social media URLs here
      // "https://www.linkedin.com/company/alumind",
      // "https://www.facebook.com/alumind",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS_PHONE,
      contactType: "customer service",
      availableLanguage: ["English", "Spanish"],
      areaServed: "Worldwide"
    }
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "Alumind Technology",
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/images/logo.png`,
    image: OG_IMAGE,
    description: isEs ? SITE_DESCRIPTION_ES : SITE_DESCRIPTION_EN,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: BUSINESS_ADDRESS.locality,
      addressRegion: BUSINESS_ADDRESS.region,
      postalCode: BUSINESS_ADDRESS.postalCode,
      addressCountry: BUSINESS_ADDRESS.country
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "6.1726",
      longitude: "-75.5943"
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isEs ? "Servicios de Alumind" : "Alumind Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isEs ? "Consultoría en Producción de Aluminio" : "Aluminum Production Consulting",
            description: isEs ? "Servicios de consultoría experta en procesos de producción de aluminio, control de calidad y eficiencia operativa" : "Expert consulting services in aluminum production processes, quality control, and operational efficiency"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isEs ? "Diseño y Fabricación de Aleaciones Personalizadas" : "Custom Alloy Design and Manufacturing",
            description: isEs ? "Diseño y fabricación de aleaciones personalizadas en aluminio y cobre" : "Design and manufacturing of custom aluminum and copper alloys"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Product",
            name: isEs ? "Espectrómetros Arun Technology" : "Arun Technology Spectrometers",
            description: isEs ? "Distribuidor autorizado de espectrómetros Arun Technology con servicio de venta, mantenimiento y reparación" : "Authorized distributor of Arun Technology spectrometers with sales, maintenance, and repair services",
            brand: {
              "@type": "Brand",
              name: "Arun Technology"
            }
          }
        }
      ]
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/${locale}`
      }
    ]
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Alumind Technology",
    description: isEs ? SITE_DESCRIPTION_ES : SITE_DESCRIPTION_EN,
    publisher: {
      "@id": `${SITE_URL}/#organization`
    },
    inLanguage: [
      {
        "@type": "Language",
        name: "English",
        alternateName: "en"
      },
      {
        "@type": "Language",
        name: "Spanish",
        alternateName: "es"
      }
    ]
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

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
