import { Button } from '@/shared/ui/base/buttons/button'

export function TourSection() {
  return (
    <section id="tour" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Tour</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="border border-secondary rounded-lg p-6">
          <div className="w-full h-32 bg-secondary rounded mb-4 flex items-center justify-center">
            <span className="text-tertiary">Event Image</span>
          </div>
          <h3 className="font-semibold text-primary mb-2">Upcoming Show</h3>
          <p className="text-sm text-tertiary mb-2">Date • Venue • Location</p>
          <div className="flex gap-2">
            <Button size="sm" color="primary">
              RSVP
            </Button>
            <Button size="sm" color="secondary">
              Get Tickets
            </Button>
          </div>
        </div>
        <div className="border border-secondary rounded-lg p-6">
          <div className="w-full h-32 bg-secondary rounded mb-4 flex items-center justify-center">
            <span className="text-tertiary">Event Image</span>
          </div>
          <h3 className="font-semibold text-primary mb-2">Past Performance</h3>
          <p className="text-sm text-tertiary mb-2">Date • Venue • Location</p>
          <Button size="sm" color="secondary">
            View Photos
          </Button>
        </div>
      </div>
    </section>
  )
}
