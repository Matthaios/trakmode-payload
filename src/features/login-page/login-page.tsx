'use client'

import StudioLogo from '@/assets/studio.jpg'
import { Logo } from '@/components/elements/Logo'
import { Button } from '@/components/untitled/base/buttons/button'
import { SocialButton } from '@/components/untitled/base/buttons/social-button'
import { Form } from '@/components/untitled/base/form/form'
import { Input } from '@/components/untitled/base/input/input'
import { BackgroundPattern } from '@/components/untitled/shared-assets/background-patterns'
import { authClient } from '@/services/auth/client'
import Image from 'next/image'
import { useState } from 'react'

export const LoginPage = ({ redirect }: { redirect?: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string

      const { error } = await authClient.signIn.magicLink({
        email,
        callbackURL: redirect || '/',
        newUserCallbackURL: redirect || '/dashboard',
        errorCallbackURL: '/error',
      })

      if (error) {
        console.error('Magic link error:', error)
      } else {
        setEmailSent(true)
      }
    } catch (err) {
      console.error('Authentication error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)

    try {
      const { error } = await authClient.signIn.social({
        provider: 'google',
        callbackURL: redirect || '/dashboard',
      })

      if (error) {
        console.error('Google sign in error:', error)
      }
    } catch (err) {
      console.error('Google authentication error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="grid min-h-screen grid-cols-1 overflow-hidden bg-primary lg:grid-cols-2">
      {/* Image section - always on the left */}
      <div className="relative z-10 overflow-hidden">
        <Image
          className="object-cover object-center"
          fill
          src={StudioLogo}
          sizes="50vw"
          alt="Login to studio"
        />
      </div>

      {/* Content section - always on the right on desktop */}
      <div className="flex flex-col bg-primary">
        <div className="flex flex-1 justify-center px-4 py-12 md:items-center md:px-8">
          <div className="flex w-full flex-col gap-8 sm:max-w-90">
            {/* Logo section */}
            <div className="flex flex-col items-center gap-6 text-center">
              <div className="relative">
                <BackgroundPattern
                  pattern="grid"
                  className="absolute top-1/2 left-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 md:block"
                />
                <BackgroundPattern
                  pattern="grid"
                  size="md"
                  className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 md:hidden"
                />
                <Logo />
              </div>
              <div className="z-10 flex flex-col gap-2 md:gap-3">
                <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">
                  {emailSent ? 'Check your email' : 'Welcome back'}
                </h1>
                <p className="text-md text-tertiary">
                  {emailSent
                    ? "We've sent a magic link to your email address. Click the link to sign in."
                    : 'Welcome back! Please enter your details.'}
                </p>
              </div>
            </div>

            {/* Conditional content */}
            {emailSent ? (
              <div className="z-10 flex justify-center">
                <Button color="link-color" size="md" onClick={() => setEmailSent(false)}>
                  Back to login
                </Button>
              </div>
            ) : (
              <Form onSubmit={handleEmailSubmit} className="relative z-10 flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <Input
                    isRequired
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    size="md"
                    isDisabled={isLoading}
                  />

                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Continue with email'}
                  </Button>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 border-t border-border"></div>
                  <span className="px-4 text-sm font-medium text-tertiary">OR</span>
                  <div className="flex-1 border-t border-border"></div>
                </div>

                <div className="flex flex-col gap-3">
                  <SocialButton
                    social="google"
                    theme="color"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    Continue with Google
                  </SocialButton>
                </div>
              </Form>
            )}
          </div>
        </div>

        <footer className="hidden p-8 pt-11 lg:block">
          <p className="text-sm text-tertiary">© Trekmode {new Date().getFullYear()}</p>
        </footer>
      </div>
    </section>
  )
}
