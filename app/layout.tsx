import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/lib/cart-context';
import { WishlistProvider } from '@/lib/wishlist-context';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sai Agalyas Arts & Fashion | Premium Bridal & Custom Designs',
  description: 'Chennai\'s premier fashion store specializing in exquisite bridal wear, custom designs, and traditional Indian attire. Creating timeless elegance for your special moments.',
  keywords: ['bridal wear', 'custom designs', 'Chennai fashion', 'traditional wear', 'Indian fashion'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col">
        <SessionProvider>
          <CartProvider>
            <WishlistProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </WishlistProvider>
          </CartProvider>
        </SessionProvider>
      </body>
    </html>

  );
}
