'use client'

import {
  BarChart3,
  Check,
  ChevronDown,
  Layers,
  Link as LinkIcon,
  MessageCircle,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/elements/Logo'
import { Button } from '@/components/untitled/base/buttons/button'
import { Input } from '@/components/untitled/base/input/input'
import { X, Facebook, LinkedIn, Instagram } from '@/components/untitled/foundations/social-icons'

export default function HomePage() {
  const [faqOpen, setFaqOpen] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [showApplicationReceived, setShowApplicationReceived] = useState(false)

  const toggleFaq = (id: string) => {
    setFaqOpen(faqOpen === id ? null : id)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setShowApplicationReceived(true)
    }
  }

  return (
    <div
      className="relative min-h-screen"
      style={{
        background:
          'linear-gradient(rgb(26, 28, 30) 0%, rgb(22, 24, 26) 50%, rgb(26, 28, 30) 100%)',
        fontFamily: 'Aileron, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
          mixBlendMode: 'overlay',
          zIndex: 0,
        }}
      />

      <div className="relative">
        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(100% 80% at 50% 20%, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
            zIndex: 0,
          }}
        />

        {/* Navigation */}
        <nav className="relative z-10 px-6 py-5 flex items-center justify-between max-w-7xl mx-auto">
          <Link
            href="/"
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Trakmode Home"
          >
            <div className="h-6 w-auto">
              <Logo />
            </div>
          </Link>
          <Link href="/dashboard">
            <Button size="sm" color="primary" className="px-6 py-2">
              Dashboard
            </Button>
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="text-center pt-24 pb-20 md:pt-40 md:pb-28">
            <h1
              className="text-white mb-6"
              style={{
                fontSize: 'clamp(2.875rem, 9.2vw, 5.175rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.025em',
                fontWeight: 700,
              }}
            >
              Your Sound. Your Network.
            </h1>
            <p
              className="text-gray-400 mb-16 max-w-2xl mx-auto px-4"
              style={{
                fontSize: 'clamp(1.375rem, 2.75vw, 1.75rem)',
                lineHeight: 1.5,
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              Where audio creators grow and connect
            </p>

            {/* Email Form or Application Received Card */}
            {showApplicationReceived ? (
              <div className="max-w-md mx-auto p-8 rounded-xl border border-violet-500/20 bg-gray-800">
                <div className="mb-4">
                  <Check className="w-12 h-12 mx-auto text-violet-400" />
                </div>
                <h3 className="text-white mb-3 text-2xl font-semibold">Application Received</h3>
                <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                  We've sent you an email. Please confirm to complete your application.
                </p>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-gray-400 mb-4 text-sm">Share with your network</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 bg-white/5 border border-white/10"
                      aria-label="Share on Twitter"
                    >
                      <X size={16} className="text-gray-300" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 bg-white/5 border border-white/10"
                      aria-label="Share on Facebook"
                    >
                      <Facebook size={16} className="text-gray-300" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 bg-white/5 border border-white/10"
                      aria-label="Share on LinkedIn"
                    >
                      <LinkedIn size={16} className="text-gray-300" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 bg-white/5 border border-white/10"
                      aria-label="Share on Instagram"
                    >
                      <Instagram size={16} className="text-gray-300" />
                    </button>
                    <button
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105 bg-white/5 border border-white/10"
                      aria-label="Copy link"
                    >
                      <LinkIcon className="w-4 h-4 text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e)}
                  size="md"
                  className="w-full"
                />
                <Button type="submit" size="lg" color="primary" className="w-full">
                  JOIN NOW
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-24 md:py-32 max-w-4xl mx-auto text-center px-6">
        <h2
          className="text-white mb-8"
          style={{
            fontSize: 'clamp(2.25rem, 4.5vw, 3.125rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
          }}
        >
          The world's top audio creators share, connect, and collaborate on Trakmode
        </h2>
        <p
          className="text-gray-400 max-w-3xl mx-auto"
          style={{
            fontSize: 'clamp(1.375rem, 2.75vw, 1.75rem)',
            lineHeight: 1.5,
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          Creator-to-fan reimagined for audio
        </p>
      </div>

      {/* Features Section */}
      <div className="relative" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(100% 70%, transparent 0%, rgba(0, 0, 0, 0.2) 100%)',
            zIndex: 0,
          }}
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="py-24 md:py-32 text-center px-6">
            <h2
              className="text-white mb-8"
              style={{
                fontSize: 'clamp(2.25rem, 4.5vw, 3.125rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
              }}
            >
              Everything you need to grow your sound
            </h2>
            <p
              className="text-gray-400 max-w-3xl mx-auto mb-20"
              style={{
                fontSize: 'clamp(1.375rem, 2.75vw, 1.75rem)',
                lineHeight: 1.5,
                fontWeight: 400,
                letterSpacing: '-0.01em',
              }}
            >
              A powerful evolving toolset for audio creators
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20 max-w-6xl mx-auto">
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-105 border-2 border-white/15 rounded-lg bg-transparent">
                    <Layers className="w-8 h-8 text-violet-500" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-white mb-5 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                  Showcase
                </h3>
                <p className="text-gray-400 max-w-xs mx-auto text-lg leading-relaxed tracking-tight">
                  your sound, projects, and products.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-105 border-2 border-white/15 rounded-lg bg-transparent">
                    <Users className="w-8 h-8 text-blue-500" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-white mb-5 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                  Connect
                </h3>
                <p className="text-gray-400 max-w-xs mx-auto text-lg leading-relaxed tracking-tight">
                  with fans, collaborators, and brands.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-105 border-2 border-white/15 rounded-lg bg-transparent">
                    <span className="text-3xl text-cyan-500 font-normal">$</span>
                  </div>
                </div>
                <h3 className="text-white mb-5 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                  Monetize
                </h3>
                <p className="text-gray-400 max-w-xs mx-auto text-lg leading-relaxed tracking-tight">
                  audio assets, content, and more.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-105 border-2 border-white/15 rounded-lg bg-transparent">
                    <LinkIcon className="w-8 h-8 text-sky-400" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-white mb-5 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                  Share
                </h3>
                <p className="text-gray-400 max-w-xs mx-auto text-lg leading-relaxed tracking-tight">
                  one link for your entire sonic world.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-105 border-2 border-white/15 rounded-lg bg-transparent">
                    <MessageCircle className="w-8 h-8 text-purple-400" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-white mb-5 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                  Message
                </h3>
                <p className="text-gray-400 max-w-xs mx-auto text-lg leading-relaxed tracking-tight">
                  with others like on social media.
                </p>
              </div>
              <div className="text-center">
                <div className="mb-8 flex justify-center">
                  <div className="w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-105 border-2 border-white/15 rounded-lg bg-transparent">
                    <BarChart3 className="w-8 h-8 text-pink-400" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-white mb-5 text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
                  Analyze
                </h3>
                <p className="text-gray-400 max-w-xs mx-auto text-lg leading-relaxed tracking-tight">
                  performance, learn, and improve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(100% 80% at 50% 80%, transparent 0%, rgba(0, 0, 0, 0.25) 100%)',
            zIndex: 0,
          }}
        />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div id="faq" className="py-24 md:py-32 text-center px-6">
            <h2
              className="text-white mb-20"
              style={{
                fontSize: 'clamp(1.375rem, 2.75vw, 1.75rem)',
                fontWeight: 400,
                letterSpacing: '-0.01em',
                lineHeight: 1.5,
              }}
            >
              FAQ
            </h2>
            <div
              className="max-w-3xl mx-auto rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backgroundColor: 'rgba(20, 20, 24, 0.8)',
                boxShadow:
                  'rgba(0, 0, 0, 0.5) 0px 20px 60px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="w-full">
                <div
                  className="last:border-b-0 border-b"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <h3 className="flex">
                    <button
                      type="button"
                      className="flex flex-1 items-start justify-between gap-4 rounded-md text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 px-10 py-7 text-left hover:no-underline"
                      style={{
                        fontSize: '1.375rem',
                        fontWeight: 600,
                        color: 'rgb(255, 255, 255)',
                        letterSpacing: '-0.015em',
                      }}
                      onClick={() => toggleFaq('what-is')}
                    >
                      What is Trakmode?
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 pointer-events-none shrink-0 translate-y-0.5 transition-transform duration-200 ${
                          faqOpen === 'what-is' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  {faqOpen === 'what-is' && (
                    <div
                      className="overflow-hidden text-sm px-10 pb-7"
                      style={{
                        fontSize: '1.1875rem',
                        lineHeight: 1.7,
                        color: 'rgb(156, 163, 175)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Trakmode is a professional platform designed specifically for audio creators
                      to showcase their work, connect with fans and collaborators, and monetize
                      their content. It's built by producers for producers, offering a centralized
                      hub for your entire sonic world.
                    </div>
                  )}
                </div>
                <div
                  className="last:border-b-0 border-b"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <h3 className="flex">
                    <button
                      type="button"
                      className="flex flex-1 items-start justify-between gap-4 rounded-md text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 px-10 py-7 text-left hover:no-underline"
                      style={{
                        fontSize: '1.375rem',
                        fontWeight: 600,
                        color: 'rgb(255, 255, 255)',
                        letterSpacing: '-0.015em',
                      }}
                      onClick={() => toggleFaq('who-for')}
                    >
                      Who is Trakmode for?
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 pointer-events-none shrink-0 translate-y-0.5 transition-transform duration-200 ${
                          faqOpen === 'who-for' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  {faqOpen === 'who-for' && (
                    <div
                      className="overflow-hidden text-sm px-10 pb-7"
                      style={{
                        fontSize: '1.1875rem',
                        lineHeight: 1.7,
                        color: 'rgb(156, 163, 175)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Trakmode is for all audio creators including producers, engineers, mixers,
                      sound designers, and anyone who creates audio content professionally or as a
                      hobby.
                    </div>
                  )}
                </div>
                <div
                  className="last:border-b-0 border-b"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
                >
                  <h3 className="flex">
                    <button
                      type="button"
                      className="flex flex-1 items-start justify-between gap-4 rounded-md text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 px-10 py-7 text-left hover:no-underline"
                      style={{
                        fontSize: '1.375rem',
                        fontWeight: 600,
                        color: 'rgb(255, 255, 255)',
                        letterSpacing: '-0.015em',
                      }}
                      onClick={() => toggleFaq('cost')}
                    >
                      How much does Trakmode cost?
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 pointer-events-none shrink-0 translate-y-0.5 transition-transform duration-200 ${
                          faqOpen === 'cost' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  {faqOpen === 'cost' && (
                    <div
                      className="overflow-hidden text-sm px-10 pb-7"
                      style={{
                        fontSize: '1.1875rem',
                        lineHeight: 1.7,
                        color: 'rgb(156, 163, 175)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Trakmode is free to start. We only earn when you earn, ensuring a fair and
                      transparent pricing model.
                    </div>
                  )}
                </div>
                <div className="border-b last:border-b-0 border-none">
                  <h3 className="flex">
                    <button
                      type="button"
                      className="flex flex-1 items-start justify-between gap-4 rounded-md text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 px-10 py-7 text-left hover:no-underline"
                      style={{
                        fontSize: '1.375rem',
                        fontWeight: 600,
                        color: 'rgb(255, 255, 255)',
                        letterSpacing: '-0.015em',
                      }}
                      onClick={() => toggleFaq('benefits')}
                    >
                      What does Trakmode do for creators?
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 pointer-events-none shrink-0 translate-y-0.5 transition-transform duration-200 ${
                          faqOpen === 'benefits' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>
                  {faqOpen === 'benefits' && (
                    <div
                      className="overflow-hidden text-sm px-10 pb-7"
                      style={{
                        fontSize: '1.1875rem',
                        lineHeight: 1.7,
                        color: 'rgb(156, 163, 175)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Trakmode provides creators with a professional platform to showcase their
                      work, connect directly with fans and brands, monetize their content, and build
                      their network without algorithmic interference. It's your creator-owned space
                      in the audio world.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative py-16 mt-12 border-t border-white/5 z-10">
        <div className="flex flex-col items-center gap-8">
          <div className="mb-4">
            <div className="h-7 w-auto">
              <Logo />
            </div>
          </div>
          <div className="flex gap-8 mb-8">
            <a
              href="https://x.com/trakmodecom/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <X size={28} />
            </a>
            <a
              href="https://www.instagram.com/trakmodecom/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={28} />
            </a>
            <a
              href="https://www.linkedin.com/company/trakmode/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedIn size={28} />
            </a>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <a
                href="https://trakmode.notion.site/Trakmode-Terms-of-Service-2835c53f97f3802a957ac08c5ce382f3/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </a>
              <span className="text-gray-700">•</span>
              <a
                href="https://trakmode.notion.site/Trakmode-Privacy-Policy-2835c53f97f38096bd02d5192393b398/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </a>
            </div>
            <div className="text-gray-600 text-xs">© Trakmode 2025. All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
