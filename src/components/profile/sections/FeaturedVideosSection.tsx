export function FeaturedVideosSection() {
  return (
    <section id="videos" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Featured Videos</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="border border-secondary rounded-lg overflow-hidden">
          <div className="aspect-video bg-secondary flex items-center justify-center">
            <span className="text-tertiary">DJ Set Video</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-primary mb-2">Live DJ Set</h3>
            <p className="text-sm text-tertiary">Event • Date • Duration</p>
          </div>
        </div>
        <div className="border border-secondary rounded-lg overflow-hidden">
          <div className="aspect-video bg-secondary flex items-center justify-center">
            <span className="text-tertiary">Music Video</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-primary mb-2">Official Music Video</h3>
            <p className="text-sm text-tertiary">Track • Director • Year</p>
          </div>
        </div>
      </div>
    </section>
  )
}
