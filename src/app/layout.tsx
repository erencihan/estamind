import type { Metadata } from 'next'
import { Outfit, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

import Providers from './providers'

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'EstaMind - Akıllı Emlak Analiz Platformu',
  description: 'Bölgenizdeki en akıllı emlakçı siz olun. İlan girme, analiz et. Veriyle sat, güven kazan.',
  keywords: 'emlak, AI, analiz, fiyatlandırma, gayrimenkul, property, real estate',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${outfit.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
