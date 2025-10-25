interface ProfileNavProps {
  sections: string[]
}

export function ProfileNav({ sections }: ProfileNavProps) {
  return (
    <div className="sticky top-0 z-10 bg-primary border-b border-secondary">
      <div className="max-w-4xl mx-auto px-3 md:px-8">
        <nav className="flex gap-6 overflow-x-auto py-4">
          {sections.map((section) => (
            <button
              key={section}
              className="whitespace-nowrap text-sm font-medium text-tertiary hover:text-primary transition-colors"
            >
              {section}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
