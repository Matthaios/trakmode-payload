import Link from 'next/link'

export default async function HomePage() {
  return (
    <div>
      <h1>Trakmode web</h1>
      <Link href="/dashboard">Dashboard</Link>
    </div>
  )
}
