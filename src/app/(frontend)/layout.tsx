import React from 'react'
import './styles/globals.css'
export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className="dark-mode">
      <body className="dark-mode bg-primary min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  )
}
