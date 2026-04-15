import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Hilo Sagrado by Geral Velasquez | Joyería Artesanal Miyuki',
  description: 'No es joyería, es arte tejido con intención. Cada pieza refleja detalle, significado y autenticidad. Joyería y accesorios artesanales en Tejido Miyuki desde Villamaría, Caldas, Colombia.',
  keywords: ['joyería artesanal', 'miyuki', 'tejido', 'accesorios', 'Colombia', 'Villamaría', 'hecho a mano'],
  authors: [{ name: 'Geral Velasquez' }],
  openGraph: {
    title: 'Hilo Sagrado by Geral Velasquez',
    description: 'Arte tejido con intención. Joyería y accesorios artesanales en Tejido Miyuki.',
    locale: 'es_CO',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
