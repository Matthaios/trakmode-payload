import { LivePreviewListener } from '@/components/LivePreviewListener'
import { draftMode } from 'next/headers'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { isEnabled: draft } = await draftMode()

  return (
    <div>
      {draft && <LivePreviewListener />}
      RENDER OFFER PAGE HERE
    </div>
  )
}
