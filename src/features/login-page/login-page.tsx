'use client'

import { ContentDivider } from '@/components/untitled/application/content-divider/content-divider'
import { Button } from '@/components/untitled/base/buttons/button'
import { SocialButton } from '@/components/untitled/base/buttons/social-button'
import { Form } from '@/components/untitled/base/form/form'
import { Input } from '@/components/untitled/base/input/input'
import { authClient } from '@/lib/auth/client'
import { useState } from 'react'

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const email = formData.get('email') as string

      const { data, error } = await authClient.signIn.magicLink({
        email,
        callbackURL: '/',
        newUserCallbackURL: '/dashboard',
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
      const { data, error } = await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
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

  if (emailSent) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-primary px-4 py-12 md:px-8 md:pt-24">
        <div className="relative z-10 mx-auto flex w-full flex-col gap-8 sm:max-w-90">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="z-10 flex flex-col gap-2 md:gap-3">
              <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">
                Check your email
              </h1>
              <p className="text-md text-tertiary">
                We've sent a magic link to your email address. Click the link to sign in.
              </p>
            </div>
          </div>

          <div className="z-10 flex justify-center">
            <Button color="link-color" size="md" onClick={() => setEmailSent(false)}>
              Back to login
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-primary px-4 py-12 md:px-8 md:pt-24">
      <div className="relative z-10 mx-auto flex w-full flex-col gap-8 sm:max-w-90">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="z-10 flex flex-col gap-2 md:gap-3">
            <h1 className="text-display-xs font-semibold text-primary md:text-display-sm">
              Log in to your account
            </h1>
            <p className="text-md text-tertiary">Welcome back! Please enter your details.</p>
          </div>
        </div>

        <Form onSubmit={handleEmailSubmit} className="z-10 flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Input
              isRequired
              type="email"
              name="email"
              placeholder="Enter your email"
              size="md"
              disabled={isLoading}
            />

            <Button type="submit" size="lg" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Continue with email'}
            </Button>
          </div>

          <ContentDivider type="single-line">
            <span className="text-sm font-medium text-tertiary">OR</span>
          </ContentDivider>

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
      </div>
    </section>
  )
}
