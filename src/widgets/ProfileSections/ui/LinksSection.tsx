import { getAvailableLinks, linkConfigs } from '@/features/links/utils'
import type { User } from '@/payload-types'
import { Button } from '@/shared/ui/base/buttons/button'

interface LinksSectionProps {
  user: User
}

export function LinksSection({ user }: LinksSectionProps) {
  const availableLinks = getAvailableLinks(user.links)

  if (availableLinks.length === 0) {
    return null
  }

  return (
    <section id="links" className="space-y-6">
      <h2 className="text-2xl font-bold text-primary">Links</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {availableLinks.map((link) => {
          const Icon = link.config.icon
          return (
            <Button
              key={link.type}
              asChild
              size="sm"
              color="tertiary"
              className="w-full p-4 border border-secondary rounded-lg hover:bg-secondary transition-colors justify-start"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full"
              >
                <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="text-left flex-1">
                  <span className="font-medium text-primary">{link.config.label}</span>
                </div>
                <svg
                  className="w-4 h-4 text-tertiary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </Button>
          )
        })}
      </div>
    </section>
  )
}
