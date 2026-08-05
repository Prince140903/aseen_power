import type { Metadata } from 'next';
import { Inter, IBM_Plex_Sans } from 'next/font/google';
import './globals.css'; // Global styles
import { ThemeProvider } from '@/components/ThemeProvider';

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
      <body className="bg-[#fbf9f8] dark:bg-[#0f1115] text-[#1b1c1c] dark:text-[#e8e6e3] antialiased min-h-screen transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
