import { Media } from '@/payload/payload-types'
import Image from 'next/image'
import { ServerProps } from 'payload'

export default async function Avatar({ user }: ServerProps) {
  return (
    <Image
      width={32}
      height={32}
      className="rounded-full object-cover"
      src={(user?.avatar as Media)?.thumbnailURL as string}
      alt={(user?.name as string) || ''}
    />
  )
}
