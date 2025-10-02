import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "../css/style.css"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: "João Paulo Pasolini | Desenvolvedor Frontend",
  description:
    "Estudante de Ciência da Computação e Desenvolvedor Frontend. Experiência em atendimento, rotinas administrativas e desenvolvimento web.",
  keywords: "João Paulo Pasolini, desenvolvedor, frontend, web developer, portfolio, Ciência da Computação",
  authors: [{ name: "João Paulo Pasolini" }],
  openGraph: {
    title: "João Paulo Pasolini | Desenvolvedor Frontend",
    description: "Estudante de Ciência da Computação e Desenvolvedor Frontend",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
