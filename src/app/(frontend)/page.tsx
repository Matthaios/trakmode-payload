'use client'

import { useState } from 'react'
import { Button } from '@/components/untitled/base/buttons/button'
import { Input } from '@/components/untitled/base/input/input'
import { Select } from '@/components/untitled/base/select/select'
import {
  Music,
  Sliders,
  Video,
  Users,
  Shield,
  BarChart3,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [creatorType, setCreatorType] = useState('')
  const [portfolioLink, setPortfolioLink] = useState('')

  const creatorTypes = [
    { id: 'producer', label: 'Producer' },
    { id: 'engineer', label: 'Engineer' },
    { id: 'mixer', label: 'Mixer' },
    { id: 'sound-designer', label: 'Sound Designer' },
    { id: 'other', label: 'Other' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ email, creatorType, portfolioLink })
  }

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#EDEFF2]">
      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:px-8 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #6869DE 2px, transparent 2px),
                             radial-gradient(circle at 75% 75%, #6869DE 2px, transparent 2px)`,
              backgroundSize: '50px 50px',
              backgroundPosition: '0 0, 25px 25px',
            }}
          />
        </div>

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-[#6869DE]/10 px-4 py-2 text-sm font-medium text-[#6869DE] ring-1 ring-inset ring-[#6869DE]/20">
              Coming Soon • Early Access Available
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-[#EDEFF2] sm:text-6xl lg:text-7xl">
            Your Sound. Your Network.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#9AA0AC] sm:text-xl lg:text-2xl">
            The professional hub for audio creators. Showcase your work, connect with fans, and
            grow—all in one place.
          </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              size="lg"
              color="primary"
              onClick={() =>
                document.getElementById('early-access')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Join Early Access
            </Button>
            <Button href="/dashboard" size="lg" color="secondary">
              Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-semibold text-[#EDEFF2] mb-4">
              You&apos;ve earned your credits. But where&apos;s your presence?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-[#1A1D21] rounded-lg p-6 border border-[#2A2D32] trakmode-card-hover">
              <div className="text-3xl mb-4">📂</div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Scattered Work</h3>
              <p className="text-[#9AA0AC]">
                Your portfolio lives across SoundCloud, Instagram, and email threads.
              </p>
            </div>

            <div className="bg-[#1A1D21] rounded-lg p-6 border border-[#2A2D32] trakmode-card-hover">
              <div className="text-3xl mb-4">🔇</div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Lost in the Noise</h3>
              <p className="text-[#9AA0AC]">
                Algorithms decide who sees your work. You&apos;re constantly pitching yourself.
              </p>
            </div>

            <div className="bg-[#1A1D21] rounded-lg p-6 border border-[#2A2D32] trakmode-card-hover">
              <div className="text-3xl mb-4">💸</div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">No Direct Path</h3>
              <p className="text-[#9AA0AC]">
                Connecting with fans and brands means going through platforms that take their cut.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="px-6 py-20 lg:px-8 bg-[#1A1D21]">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#EDEFF2] mb-6">
              Built by Producers for Producers
            </h2>
            <p className="text-lg text-[#9AA0AC] max-w-3xl mx-auto">
              Trakmode is where audio creators build their world. One professional hub to showcase
              samples, stems, templates, and behind-the-scenes content. Connect directly with fans
              and brands who respect the craft. No algorithms. No noise.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6869DE]/20 text-[#6869DE] mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Creator-Owned</h3>
              <p className="text-[#9AA0AC]">Your work. Your audience. Your data.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6869DE]/20 text-[#6869DE] mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Fair & Transparent</h3>
              <p className="text-[#9AA0AC]">Free to start. We only earn when you earn.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6869DE]/20 text-[#6869DE] mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Privacy-First</h3>
              <p className="text-[#9AA0AC]">You control what&apos;s public or private.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Access Form */}
      <section id="early-access" className="px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#EDEFF2] mb-4">Get First Access</h2>
            <p className="text-lg text-[#9AA0AC]">
              Join verified audio creators building their professional home in sound.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={setEmail}
              isRequired
              size="md"
            />

            <Select
              label="I create"
              placeholder="Select your role"
              selectedKey={creatorType}
              onSelectionChange={(key) => setCreatorType(key as string)}
              items={creatorTypes}
              size="md"
            >
              {(item) => (
                <Select.Item key={item.id} id={item.id} label={item.label}>
                  {item.label}
                </Select.Item>
              )}
            </Select>

            <Input
              label="Portfolio/Credits link (optional)"
              type="url"
              placeholder="https://your-portfolio.com"
              value={portfolioLink}
              onChange={setPortfolioLink}
              size="md"
            />

            <Button
              type="submit"
              size="lg"
              color="primary"
              className="w-full bg-[#6869DE] hover:bg-[#6869DE]/90 text-white py-4 text-lg font-semibold"
            >
              Join Early Access
            </Button>

            <p className="text-sm text-[#9AA0AC] text-center">
              We&apos;ll email you when we launch. No spam. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </section>

      {/* Features Preview */}
      <section className="px-6 py-20 lg:px-8 bg-[#1A1D21]">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#EDEFF2] mb-4">What&apos;s Coming</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6869DE]/20 text-[#6869DE] mb-4">
                <Music className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Sample Loops & Tracks</h3>
              <p className="text-[#9AA0AC]">Share your work with built-in previews</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6869DE]/20 text-[#6869DE] mb-4">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Mix Templates</h3>
              <p className="text-[#9AA0AC]">Sell presets and templates directly</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6869DE]/20 text-[#6869DE] mb-4">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Behind the Scenes</h3>
              <p className="text-[#9AA0AC]">Show your process and story</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6869DE]/20 text-[#6869DE] mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Direct Connections</h3>
              <p className="text-[#9AA0AC]">Fans and brands find you without middlemen</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6869DE]/20 text-[#6869DE] mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Privacy Controls</h3>
              <p className="text-[#9AA0AC]">Client discretion and project protection</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#6869DE]/20 text-[#6869DE] mb-4">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Real Insights</h3>
              <p className="text-[#9AA0AC]">Meaningful signals, not vanity metrics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-semibold text-[#EDEFF2] mb-2">Trakmode</h3>
              <p className="text-[#9AA0AC]">Where audio creators build their world.</p>
            </div>

            <div className="flex justify-center space-x-6">
              <a href="#" className="text-[#9AA0AC] hover:text-[#EDEFF2] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#9AA0AC] hover:text-[#EDEFF2] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#9AA0AC] hover:text-[#EDEFF2] transition-colors">
                <Users className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#9AA0AC] hover:text-[#EDEFF2] transition-colors">
                <Music className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#9AA0AC] hover:text-[#EDEFF2] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            <div className="text-right">
              <p className="text-[#9AA0AC] mb-2">hello@trakmode.com</p>
              <p className="text-sm text-[#9AA0AC]">© 2025 Trakmode LLC</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
