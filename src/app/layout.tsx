import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BeautyStack',
  description: 'Your magical beauty shelf',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}