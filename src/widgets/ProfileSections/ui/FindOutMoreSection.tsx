import { Button } from '@/shared/ui/base/buttons/button'

export function FindOutMoreSection() {
  return (
    <section id="find-out-more" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Find Out More</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border border-secondary rounded-lg p-6">
          <h3 className="font-semibold text-primary mb-3">Contact</h3>
          <p className="text-sm text-tertiary mb-4">
            Interested in working together? Send me a message.
          </p>
          <Button size="sm" color="primary">
            Get In Touch
          </Button>
        </div>
        <div className="border border-secondary rounded-lg p-6">
          <h3 className="font-semibold text-primary mb-3">Press Kit</h3>
          <p className="text-sm text-tertiary mb-4">Download photos, bio, and media assets.</p>
          <Button size="sm" color="secondary">
            Download
          </Button>
        </div>
      </div>
    </section>
  )
}
