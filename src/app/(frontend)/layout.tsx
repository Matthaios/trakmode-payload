import React from 'react'
import './styles/globals.css'
import '../../app/styles/fonts/index.scss'

export const metadata = {
  description:
    'Trakmode - The professional hub for audio creators. Showcase your work, connect with fans, and grow—all in one place.',
  title: 'Trakmode - Coming Soon',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="dark-mode">
      <body className="bg-[#0B0B0D] text-[#EDEFF2] min-h-screen font-aileron">
        <main>{children}</main>
      </body>
    </html>
  )
}
