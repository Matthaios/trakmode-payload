export function MerchSection() {
  return (
    <section id="merch" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Merch</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[0, 2, 12, 30].map((price, i) => (
          <div key={i} className="border border-secondary rounded-lg p-4">
            <div className="w-full h-32 bg-secondary rounded mb-3 flex items-center justify-center">
              <span className="text-tertiary text-xs">Product Image</span>
            </div>
            <h4 className="font-medium text-primary mb-1">Product {i + 1}</h4>
            <p className="text-sm font-semibold text-primary">€{price}.00</p>
          </div>
        ))}
      </div>
    </section>
  )
}
