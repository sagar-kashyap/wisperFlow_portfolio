import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Sagar Kashyap — Software Engineer',
  description:
    'Sagar Kashyap — Software Engineer with 3 years of experience building enterprise-level web applications, personal projects and vibe-coded experiments. Also an Airbnb host.',
};

export const viewport: Viewport = {
  themeColor: '#F7F4EE',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
