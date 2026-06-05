import './globals.css';
import Script from 'next/script';
import JsonLd from '../components/JsonLd';

export const metadata = {
  title: {
    default: 'Dyrect — The most seamless warranty management software',
    template: '%s',
  },
  description: 'Warranty registration, claims management, tracking, and extended warranty workflows for modern product brands.',
  metadataBase: new URL('https://dyrect.co'),
  alternates: {canonical: 'https://dyrect.co/'},
  robots: {index: true, follow: true},
  openGraph: {
    siteName: 'Dyrect',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dyrect',
  },
  icons: {
    icon: '/assets/logo-blue-icon.png',
    shortcut: '/assets/logo-blue-icon.png',
    apple: '/assets/logo-blue-icon.png',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Dyrect',
  url: 'https://dyrect.co',
  logo: 'https://dyrect.co/assets/logo-blue-wordmark.png',
  description: 'The most seamless warranty management software for product brands. Warranty registration, claims management, and extended warranty workflows.',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    url: 'https://dyrect.co/pricing',
  },
  sameAs: [
    'https://www.linkedin.com/company/dyrect/',
  ],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'sales@dyrect.co',
      contactType: 'sales',
      areaServed: 'Worldwide',
    },
  ],
  address: [
    {
      '@type': 'PostalAddress',
      streetAddress: '655 S Fair Oaks Ave',
      addressLocality: 'Sunnyvale',
      addressRegion: 'CA',
      postalCode: '94086',
      addressCountry: 'US',
    },
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Dyrect',
  url: 'https://dyrect.co',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://dyrect.co/integrations?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body>
        {children}
        <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      </body>
    </html>
  );
}
