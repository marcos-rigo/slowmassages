import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://slowmassages.vercel.app'),
  title: 'Slow Massages — Espacio de bienestar & reconexión',
  description:
    'Reservá tu turno de masajes. Un espacio de bienestar, calma y reconexión contigo mismo.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/images/perfil.jpg', type: 'image/jpeg' },
    ],
    apple: '/images/perfil.jpg',
  },
  openGraph: {
    title: 'Slow Massages — Espacio de bienestar & reconexión',
    description: 'Reservá tu turno de masajes. Un espacio de bienestar, calma y reconexión contigo mismo.',
    url: '/',
    siteName: 'Slow Massages',
    images: [
      {
        url: '/images/perfil.jpg',
        width: 1200,
        height: 630,
        alt: 'Slow Massages Logo',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Slow Massages — Espacio de bienestar & reconexión',
    description: 'Reservá tu turno de masajes. Un espacio de bienestar, calma y reconexión contigo mismo.',
    images: ['/images/perfil.jpg'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5efe6',
  width: 'device-width',
  initialScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${cormorantGaramond.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
