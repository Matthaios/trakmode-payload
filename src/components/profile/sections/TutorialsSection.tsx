import { Button } from '@/components/ui/base/buttons/button'

export function TutorialsSection() {
  return (
    <section id="tutorials" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Tutorials</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-secondary rounded-lg p-4">
            <div className="w-full h-32 bg-secondary rounded mb-3 flex items-center justify-center">
              <span className="text-tertiary text-xs">Tutorial {i}</span>
            </div>
            <h4 className="font-medium text-primary mb-2">Tutorial Title {i}</h4>
            <p className="text-sm text-tertiary mb-3">
              Learn advanced techniques for music production.
            </p>
            <Button size="sm" color="secondary">
              Watch Now
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
