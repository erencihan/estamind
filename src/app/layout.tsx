import type { Metadata, Viewport } from 'next'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

import Providers from './providers'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'EstaMind - Akıllı Emlak Analiz Platformu',
  description: 'Bölgenizdeki en akıllı emlakçı siz olun. İlan girme, analiz et. Veriyle sat, güven kazan.',
  keywords: 'emlak, AI, analiz, fiyatlandırma, gayrimenkul, property, real estate',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f1419',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased min-h-[100dvh] overflow-x-hidden font-dm">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
