import './globals.css';
import Script from 'next/script';

export const metadata = {
  title: 'Dyrect — The most seamless warranty management software',
  description: 'Warranty registration, claims management, tracking, and extended warranty workflows for modern product brands.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      </body>
    </html>
  );
}
