import type {Metadata} from 'next';
import { Inter, IBM_Plex_Sans } from 'next/font/google';
import './globals.css'; // Global styles

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
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexSans.variable}`}>
      <body className="bg-[#fbf9f8] text-[#1b1c1c] antialiased min-h-screen" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
