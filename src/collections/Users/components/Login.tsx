'use client'

import React, { useState } from 'react'
import { authClient } from '@/lib/auth/client'

const Login = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setMessage('')

    try {
      await authClient.signIn.magicLink({
        email,
        callbackURL: '/dashboard',
      })
      setMessage('Check your email for the magic link!')
    } catch (error) {
      console.error('Magic link error:', error)
      setMessage('Error sending magic link. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setMessage('')

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      })
    } catch (error) {
      console.error('Google login error:', error)
      setMessage('Error with Google login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <img src="/trakmode-light.png" alt="Trakmode" className="logo-image" />
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your Trakmode account</p>
        </div>

        <div className="login-form">
          <form onSubmit={handleMagicLink}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="login-button" disabled={isLoading || !email}>
              {isLoading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <button
            type="button"
            className="google-button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="google-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </div>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <a href="/register" className="signup-link">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
