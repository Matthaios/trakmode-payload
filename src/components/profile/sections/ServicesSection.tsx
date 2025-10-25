import { Button } from '@/components/ui/base/buttons/button'

export function ServicesSection() {
  return (
    <section id="services" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Services</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {['Production', 'Mixing & Mastering', 'Sound Design'].map((service) => (
          <div key={service} className="border border-secondary rounded-lg p-6">
            <h3 className="font-semibold text-primary mb-3">{service}</h3>
            <p className="text-sm text-tertiary mb-4">
              Professional {service.toLowerCase()} services for your audio projects.
            </p>
            <Button size="sm" color="primary">
              Book Now
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
