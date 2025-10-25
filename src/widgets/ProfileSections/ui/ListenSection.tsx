import { Button } from '@/shared/ui/base/buttons/button'

export function ListenSection() {
  return (
    <section id="listen" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Listen</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-secondary rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2">Podcast Appearance</h3>
          <p className="text-sm text-tertiary mb-3">Podcast Name • Episode Title</p>
          <Button size="sm" color="secondary">
            Listen Now
          </Button>
        </div>
        <div className="border border-secondary rounded-lg p-4">
          <h3 className="font-semibold text-primary mb-2">Radio Mix</h3>
          <p className="text-sm text-tertiary mb-3">Radio Station • Show Name</p>
          <Button size="sm" color="secondary">
            Listen Now
          </Button>
        </div>
      </div>
    </section>
  )
}
