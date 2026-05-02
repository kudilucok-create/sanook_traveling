import type {Metadata} from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Sannok Traveling by A. — Tour Guide & Sewa Mobil Thailand',
  description: 'Jelajahi Thailand dengan Panduan Lokal Terpercaya.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={`${playfair.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning className="bg-[var(--dark)] text-[var(--white)] font-sans">
        {children}
      </body>
    </html>
  );
}
