import { payloadClient } from '@/services/payload/client'
import Link from 'next/link'
import { Button } from '@/components/untitled/base/buttons/button'

export default async function Page() {
  const payload = await payloadClient()
  const offers = await payload.find({
    collection: 'offers',
    limit: 10,
  })

  return (
    <div className="min-h-screen bg-[#0B0B0D] text-[#EDEFF2]">
      {/* Header Section */}
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-[#EDEFF2] sm:text-5xl lg:text-6xl mb-6">
              Audio Marketplace
            </h1>
            <p className="text-lg text-[#9AA0AC] max-w-3xl mx-auto">
              Discover premium samples, loops, and audio content from talented creators. Find the
              perfect sound for your next project.
            </p>
          </div>

          {/* Offers Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {offers.docs.map((offer) => (
              <div
                key={offer.id}
                className="group bg-[#1A1D21] rounded-lg border border-[#2A2D32] trakmode-card-hover overflow-hidden"
              >
                {/* Offer Image/Preview Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-[#6869DE]/20 to-[#6869DE]/5 flex items-center justify-center">
                  <div className="text-4xl text-[#6869DE]/60">♪</div>
                </div>

                {/* Offer Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-[#EDEFF2] group-hover:text-[#6869DE] transition-colors">
                      {offer.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[#6869DE] font-semibold">
                      <span>$</span>
                      <span>{offer.price}</span>
                    </div>
                  </div>

                  {/* Offer Description */}
                  <p className="text-[#9AA0AC] text-sm mb-4 line-clamp-2">
                    High-quality audio content for your projects. Professional production ready.
                  </p>

                  {/* Offer Meta */}
                  <div className="flex items-center gap-4 text-xs text-[#9AA0AC] mb-6">
                    <div className="flex items-center gap-1">
                      <span>⚡</span>
                      <span>Instant Download</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>♪</span>
                      <span>WAV/MP3</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    size="md"
                    color="primary"
                    className="w-full bg-[#6869DE] hover:bg-[#6869DE]/90 text-white"
                    href={`/offers/${offer.id}`}
                  >
                    View Details →
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {offers.docs.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#6869DE]/20 text-[#6869DE] mb-4">
                <div className="text-3xl">♪</div>
              </div>
              <h3 className="text-xl font-semibold text-[#EDEFF2] mb-2">No offers available</h3>
              <p className="text-[#9AA0AC]">Check back later for new audio content.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
