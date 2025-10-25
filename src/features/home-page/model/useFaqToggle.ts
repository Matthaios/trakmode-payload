'use client'

import { useState } from 'react'

export function useFaqToggle() {
  const [faqOpen, setFaqOpen] = useState<string | null>(null)

  const toggleFaq = (id: string) => {
    setFaqOpen(faqOpen === id ? null : id)
  }

  return { faqOpen, toggleFaq }
}
