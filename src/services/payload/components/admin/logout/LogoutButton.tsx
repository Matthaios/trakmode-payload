'use client'
import { authClient } from '@/services/auth/client'
import { Button, LogOutIcon } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
  const router = useRouter()
  return (
    <Button
      type="submit"
      buttonStyle="none"
      onClick={() =>
        authClient.signOut({}).then(() => {
          router.push('/')
        })
      }
    >
      <LogOutIcon />
    </Button>
  )
}
