'use client'

import { useState } from 'react'

export function useEmailForm() {
  const [email, setEmail] = useState('')
  const [showApplicationReceived, setShowApplicationReceived] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setShowApplicationReceived(true)
    }
  }

  return {
    email,
    setEmail,
    showApplicationReceived,
    setShowApplicationReceived,
    handleSubmit,
  }
}
