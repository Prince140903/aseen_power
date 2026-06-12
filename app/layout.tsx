import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans } from 'next/font/google';
import './globals.css'; // Global styles
import { PremiumCursor } from '@/components/interactions/PremiumCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Aseen Power | Industrial Electrical Contracting & Projects',
  description: 'Expert HT substations, commercial infrastructure, panel manufacturing, and specialized energy solutions across India.',
  icons: {
    icon: '/assets/energy.png',
    shortcut: '/assets/energy.png',
    apple: '/assets/energy.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSans.variable}`} suppressHydrationWarning>
      <body className="bg-[#fbf9f8] text-[#1b1c1c] antialiased min-h-screen" suppressHydrationWarning>
        <PremiumCursor />
        {children}
      </body>
    </html>
  );
}
