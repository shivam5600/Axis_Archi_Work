import './globals.css';
import { Fraunces, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { studio } from '@/lib/projects';
import SmoothScroll from '@/components/SmoothScroll';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';
import Preloader from '@/components/Preloader';

const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['SOFT', 'WONK', 'opsz'],
  display: 'swap',
});

const sans = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F5F5' },
    { media: '(prefers-color-scheme: dark)', color: '#0E0E0E' },
  ],
};

export const metadata = {
  title: {
    default: `${studio.fullName} — ${studio.eyebrow}`,
    template: `%s — ${studio.name}`,
  },
  description: `${studio.shortAbout} ${studio.tagline}`,
  keywords: [
    'Architect in Lucknow',
    'Best Architecture Firm in Lucknow',
    'Interior Designer Lucknow',
    'Architectural Design',
    'Residential Architect',
    'Commercial Architect',
  ],
  metadataBase: new URL('https://axisarchi.com'),
  openGraph: {
    title: studio.fullName,
    description: studio.tagline,
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: studio.fullName,
    description: studio.tagline,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="grain">
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
