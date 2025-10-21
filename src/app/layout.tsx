import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { Metadata } from "next";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const messages: AbstractIntlMessages = await getMessages({ locale });
  
  const siteNames = {
    en: "Tatoyan & Partners Law Firm",
    am: "Թաթոյան և գործընկերներ փաստաբանական գրասենյակ",
    ru: "Юридическая фирма Татоян и партнеры"
  };
  
  const descriptions = {
    en: "Professional legal services in Armenia. Expert lawyers specializing in civil, criminal, commercial and administrative law with multilingual support.",
    am: "Մասնագիտական իրավական ծառայություններ Հայաստանում: Փորձառու փաստաբաններ՝ քաղաքացիական, քրեական, առևտրային և վարչական իրավունքի բնագավառներում:",
    ru: "Профессиональные юридические услуги в Армении. Опытные юристы специализирующиеся на гражданском, уголовном, коммерческом и административном праве."
  };
  
  const siteName = siteNames[locale as keyof typeof siteNames] || siteNames.en;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;
  const title = (messages.TabTitles as AbstractIntlMessages)?.home || siteName;

  return {
    title: {
      default: title as string,
      template: `%s | ${siteName}`
    },
    description,
    keywords: [
      "law firm", "lawyers", "legal services", "Armenia", "Yerevan",
      "civil law", "criminal law", "commercial law", "administrative law",
      "փաստաբան", "իրավական ծառայություններ", "Հայաստան", "Երևան",
      "юрист", "правовые услуги", "Армения", "Ереван"
    ],
    authors: [{ name: "Tatoyan & Partners Law Firm" }],
    creator: "Tatoyan & Partners",
    publisher: "Tatoyan & Partners Law Firm",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "am" ? "hy_AM" : locale === "ru" ? "ru_RU" : "en_US",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://tatoyanpartners.am",
      siteName,
      title: title as string,
      description,
      images: [
        {
          url: "/logo.jpg",
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title as string,
      description,
      images: ["/logo.jpg"],
    },
    icons: {
      icon: [
        { url: "/favicon.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.png", sizes: "any" }
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
      ],
      other: [
        { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#1e3a8a" }
      ]
    },
    manifest: "/site.webmanifest",
    other: {
      "msapplication-TileColor": "#1e3a8a",
      "msapplication-config": "/browserconfig.xml",
      "theme-color": "#ffffff"
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": locale === "am" ? "Թաթոյան և գործընկերներ փաստաբանական գրասենյակ" : 
           locale === "ru" ? "Юридическая фирма Татоян и партнеры" : 
           "Tatoyan & Partners Law Firm",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://tatoyanpartners.am",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://tatoyanpartners.am"}/logo.jpg`,
    "description": locale === "am" ? "Մասնագիտական իրավական ծառայություններ Հայաստանում: Փորձառու փաստաբաններ՝ քաղաքացիական, քրեական, առևտրային և վարչական իրավունքի բնագավառներում:" :
                   locale === "ru" ? "Профессиональные юридические услуги в Армении. Опытные юристы специализирующиеся на гражданском, уголовном, коммерческом и административном праве." :
                   "Professional legal services in Armenia. Expert lawyers specializing in civil, criminal, commercial and administrative law.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AM",
      "addressLocality": "Yerevan",
      "addressRegion": "Yerevan"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Armenia"
    },
    "serviceType": [
      "Civil Law",
      "Criminal Law", 
      "Commercial Law",
      "Administrative Law",
      "Legal Consulting",
      "Litigation"
    ],
    "founder": [
      {
        "@type": "Person",
        "name": "Arman Tatoyan"
      },
      {
        "@type": "Person", 
        "name": "Armen Baghdasaryan"
      }
    ],
    "employee": [
      {
        "@type": "Person",
        "name": "Karine Hovhannisyan",
        "jobTitle": "Lawyer"
      }
    ]
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <Analytics />
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
