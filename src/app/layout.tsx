import type { Metadata } from 'next';
import {
  Instrument_Serif,
  Plus_Jakarta_Sans,
  JetBrains_Mono,
  Caveat,
} from 'next/font/google';
import '../styles/globals.css';

// Map each Next.js font to the CSS variable name that globals.css actually uses
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display',   // matches var(--font-display) in globals.css
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',      // matches var(--font-sans) in globals.css
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',      // matches var(--font-mono) in globals.css
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-hand',      // matches var(--font-hand) in globals.css
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sagar Kashyap — Software Engineer',
  description:
    'Sagar Kashyap — Software Engineer with 3 years of experience building enterprise-level web applications, personal projects and vibe-coded experiments. Also an Airbnb host.',
};

export const viewport = {
  themeColor: '#F7F4EE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
