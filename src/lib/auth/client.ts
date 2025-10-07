import { magicLinkClient, twoFactorClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

export const authClient = createAuthClient({
  plugins: [magicLinkClient(), twoFactorClient()],
})

export const { signIn, signUp, useSession, signOut } = authClient

export type Session = typeof authClient.$Infer.Session
