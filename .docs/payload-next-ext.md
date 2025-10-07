# Comprehensive Guide to Payload Next.js Exports

This guide provides detailed instructions on how to use the `@payloadcms/next` package exports in your Payload CMS Next.js applications. Based on the actual implementation in the Payload repository, this guide covers practical usage patterns, code examples, and best practices.

## Table of Contents

1. [Package Overview](#package-overview)
2. [Setup and Configuration](#setup-and-configuration)
3. [View Components](#view-components)
4. [Authentication System](#authentication-system)
5. [Template System](#template-system)
6. [Client Components](#client-components)
7. [Server Components](#server-components)
8. [Layout System](#layout-system)
9. [API Routes](#api-routes)
10. [Utilities](#utilities)
11. [Custom Components](#custom-components)
12. [Advanced Patterns](#advanced-patterns)
13. [Troubleshooting](#troubleshooting)

## Package Overview

The `@payloadcms/next` package provides a complete admin interface for Payload CMS applications built with Next.js. It exports modular components organized into categories:

- **Views**: Main UI components for different admin pages
- **Auth**: Authentication functions and components
- **Templates**: Layout templates for consistent UI
- **Client**: Client-side interactive components
- **RSC**: Server-side rendered components
- **Layouts**: Root layout and metadata handling
- **Routes**: API route handlers
- **Utilities**: Helper functions and deprecated utilities

## Setup and Configuration

### Basic Installation

```bash
npm install @payloadcms/next
# or
pnpm add @payloadcms/next
```

### Next.js Configuration

Configure your `next.config.mjs` to use the `withPayload` wrapper:

```javascript
import { withPayload } from '@payloadcms/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js configuration
}

export default withPayload(nextConfig)
```

### App Router Structure

Create the following file structure in your Next.js app:

```
src/app/
├── (payload)/
│   ├── admin/
│   │   └── [[...segments]]/
│   │       ├── page.tsx
│   │       └── not-found.tsx
│   ├── api/
│   │   └── [...slug]/
│   │       └── route.ts
│   └── layout.tsx
└── globals.css
```

### Admin Route Implementation

Create `src/app/(payload)/admin/[[...segments]]/page.tsx`:

```typescript
import type { Metadata } from 'next'
import config from '@payload-config'
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams })

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, importMap, params, searchParams })

export default Page
```

### API Route Implementation

Create `src/app/(payload)/api/[...slug]/route.ts`:

```typescript
import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'
import { GRAPHQL_PLAYGROUND_GET, GRAPHQL_POST } from '@payloadcms/next/routes'
import config from '@payload-config'

export const GET = REST_GET
export const POST = REST_POST
export const DELETE = REST_DELETE
export const PATCH = REST_PATCH
export const PUT = REST_PUT
export const OPTIONS = REST_OPTIONS

// For GraphQL support
export { GRAPHQL_PLAYGROUND_GET, GRAPHQL_POST }
```

## View Components

Views are the main UI components that render different admin pages. They handle routing, data fetching, and user interactions.

### Available Views

#### 1. RootPage
The main routing component that handles all admin routes:

```typescript
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

// Used in your admin page component
const AdminPage = ({ params, searchParams }) => {
  return RootPage({
    config,
    importMap,
    params,
    searchParams
  })
}
```

#### 2. DashboardView
Main dashboard component showing collections and globals:

```typescript
import { DashboardView } from '@payloadcms/next/views'

// Custom dashboard implementation
const CustomDashboard = (props) => {
  return (
    <div>
      <h1>Custom Dashboard</h1>
      <DashboardView {...props} />
    </div>
  )
}
```

#### 3. LoginView
Authentication login interface:

```typescript
import { LoginView } from '@payloadcms/next/views'

// Custom login page
const CustomLogin = (props) => {
  return (
    <div className="custom-login-container">
      <LoginView {...props} />
    </div>
  )
}
```

#### 4. ListView
Collection list view with filtering and pagination:

```typescript
import { ListView, renderListView } from '@payloadcms/next/views'

// Custom list view
const CustomListView = (props) => {
  return (
    <div>
      <h2>Custom List View</h2>
      <ListView {...props} />
    </div>
  )
}
```

#### 5. AccountView
User account management interface:

```typescript
import { AccountView } from '@payloadcms/next/views'

// Custom account page
const CustomAccount = (props) => {
  return (
    <div className="account-container">
      <AccountView {...props} />
    </div>
  )
}
```

### Custom View Implementation

Create custom views by implementing the required interfaces:

```typescript
import type { AdminViewServerProps } from 'payload'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'

export const CustomView = (props: AdminViewServerProps) => {
  const { initPageResult, params, searchParams } = props
  const { user, permissions, req } = initPageResult

  return (
    <div className="custom-view">
      <h1>Custom View</h1>
      <p>Welcome, {user?.email}</p>
      {/* Your custom content */}
    </div>
  )
}
```

## Authentication System

The authentication system provides functions for user login, logout, and session management.

### Login Function

```typescript
import { login } from '@payloadcms/next/auth'

// Login with email
const loginWithEmail = async (email: string, password: string) => {
  try {
    const result = await login({
      collection: 'users',
      config: payloadConfig,
      email,
      password
    })

    console.log('Login successful:', result.user)
    return result
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}

// Login with username
const loginWithUsername = async (username: string, password: string) => {
  try {
    const result = await login({
      collection: 'users',
      config: payloadConfig,
      username,
      password
    })

    return result
  } catch (error) {
    console.error('Login failed:', error)
    throw error
  }
}
```

### Logout Function

```typescript
import { logout } from '@payloadcms/next/auth'

const handleLogout = async () => {
  try {
    await logout({
      collection: 'users',
      config: payloadConfig
    })

    // Redirect to login page
    window.location.href = '/admin/login'
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
```

### Token Refresh

```typescript
import { refresh } from '@payloadcms/next/auth'

const refreshToken = async () => {
  try {
    const result = await refresh({
      collection: 'users',
      config: payloadConfig
    })

    return result
  } catch (error) {
    console.error('Token refresh failed:', error)
    // Handle refresh failure (e.g., redirect to login)
  }
}
```

### Custom Authentication Strategy

```typescript
// In your collection config
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    strategies: [
      {
        name: 'custom',
        authenticate: async ({ headers, payload }) => {
          // Your custom authentication logic
          const token = headers.get('authorization')?.replace('Bearer ', '')

          if (!token) {
            throw new AuthenticationError('No token provided')
          }

          // Verify token and return user
          const user = await verifyCustomToken(token)
          return { user }
        }
      }
    ]
  },
  fields: [
    // Your fields
  ]
}
```

## Template System

Templates provide consistent layouts for different page types in the admin interface.

### DefaultTemplate

The standard admin layout with navigation and sidebar:

```typescript
import { DefaultTemplate } from '@payloadcms/next/templates'

// Using in a custom view
const CustomView = (props) => {
  return (
    <DefaultTemplate
      collectionSlug="posts"
      docID="123"
      viewType="edit"
      visibleEntities={props.visibleEntities}
      {...props}
    >
      <div>Your custom content here</div>
    </DefaultTemplate>
  )
}
```

### MinimalTemplate

Minimal layout for login and error pages:

```typescript
import { MinimalTemplate } from '@payloadcms/next/templates'

// Using for login page
const LoginPage = (props) => {
  return (
    <MinimalTemplate className="custom-login">
      <LoginView {...props} />
    </MinimalTemplate>
  )
}
```

### Custom Template

Create custom templates by extending the base template:

```typescript
import type { DefaultTemplateProps } from '@payloadcms/next/templates'

const CustomTemplate: React.FC<DefaultTemplateProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`custom-template ${className || ''}`}>
      <header className="custom-header">
        <h1>Custom Admin</h1>
      </header>
      <main className="custom-main">
        {children}
      </main>
      <footer className="custom-footer">
        <p>Custom Footer</p>
      </footer>
    </div>
  )
}
```

## Client Components

Client components provide interactive functionality that requires browser APIs.

### Navigation Components

```typescript
import { DefaultNavClient, NavHamburger, NavWrapper } from '@payloadcms/next/client'

// Custom navigation
const CustomNav = () => {
  return (
    <NavWrapper>
      <DefaultNavClient />
      <NavHamburger />
    </NavWrapper>
  )
}
```

### Interactive Elements

```typescript
'use client'

import { useState } from 'react'
import { DefaultNavClient } from '@payloadcms/next/client'

const InteractiveDashboard = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        Toggle Navigation
      </button>
      {isOpen && <DefaultNavClient />}
    </div>
  )
}
```

## Server Components

Server components are rendered on the server for better performance and SEO.

### Document Header

```typescript
import { DocumentHeader } from '@payloadcms/next/rsc'

const CustomPage = () => {
  return (
    <>
      <DocumentHeader
        title="Custom Page"
        description="A custom admin page"
      />
      <div>Page content</div>
    </>
  )
}
```

### Logo Component

```typescript
import { Logo } from '@payloadcms/next/rsc'

const CustomHeader = (props) => {
  return (
    <header>
      <Logo {...props} />
      <h1>Custom Admin</h1>
    </header>
  )
}
```

### Navigation

```typescript
import { DefaultNav } from '@payloadcms/next/rsc'

const CustomLayout = (props) => {
  return (
    <div className="admin-layout">
      <DefaultNav {...props} />
      <main>Content</main>
    </div>
  )
}
```

## Layout System

The layout system provides root layout components and metadata handling.

### RootLayout

```typescript
import { RootLayout, metadata } from '@payloadcms/next/layouts'

// In your root layout
export default function Layout({ children }) {
  return (
    <html>
      <head>
        <title>Payload Admin</title>
      </head>
      <body>
        <RootLayout>
          {children}
        </RootLayout>
      </body>
    </html>
  )
}

export { metadata }
```

### Custom Layout with Metadata

```typescript
import { RootLayout } from '@payloadcms/next/layouts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Custom Admin',
  description: 'Custom admin interface',
  icons: {
    icon: '/admin-icon.png'
  }
}

export default function CustomLayout({ children }) {
  return (
    <RootLayout>
      <div className="custom-admin">
        {children}
      </div>
    </RootLayout>
  )
}
```

## API Routes

API routes provide both GraphQL and REST API endpoints.

### REST API Implementation

```typescript
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT
} from '@payloadcms/next/routes'

// In your route.ts file
export const GET = REST_GET
export const POST = REST_POST
export const DELETE = REST_DELETE
export const PATCH = REST_PATCH
export const PUT = REST_PUT
export const OPTIONS = REST_OPTIONS
```

### GraphQL API Implementation

```typescript
import { GRAPHQL_PLAYGROUND_GET, GRAPHQL_POST } from '@payloadcms/next/routes'

// For GraphQL playground (development)
export const GET = GRAPHQL_PLAYGROUND_GET

// For GraphQL API
export const POST = GRAPHQL_POST
```

### Custom API Route

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: payloadConfig })

    // Your custom logic
    const data = await payload.find({
      collection: 'posts',
      limit: 10
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
```

## Utilities

Utilities provide helper functions for common operations.

### Internationalization

```typescript
import { getNextRequestI18n } from '@payloadcms/next/utilities'

// In your server component
const MyComponent = async ({ request }) => {
  const i18n = await getNextRequestI18n({
    config: payloadConfig,
    request
  })

  return (
    <div>
      <h1>{i18n.t('welcome')}</h1>
    </div>
  )
}
```

### Server Functions

```typescript
import { handleServerFunctions } from '@payloadcms/next/layouts'

// Handle server-side functions
const handleAction = async (formData: FormData) => {
  'use server'

  const result = await handleServerFunctions({
    formData,
    config: payloadConfig
  })

  return result
}
```

### Deprecated Utilities

Some utilities are deprecated but still available for backward compatibility:

```typescript
import {
  mergeHeaders,
  headersWithCors,
  createPayloadRequest
} from '@payloadcms/next/utilities'

// These are deprecated - use from 'payload' instead
// import { mergeHeaders } from 'payload'
```

## Custom Components

Create custom components that integrate with the Payload admin interface.

### Custom Field Component

```typescript
import type { Field } from 'payload'
import { TextInput } from '@payloadcms/ui/fields/Text'

export const CustomField: Field = {
  name: 'customField',
  type: 'text',
  admin: {
    components: {
      Field: ({ path, value, setValue }) => {
        return (
          <div>
            <label>Custom Field</label>
            <TextInput
              path={path}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        )
      }
    }
  }
}
```

### Custom View Component

```typescript
import type { AdminViewServerProps } from 'payload'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'

export const CustomView = (props: AdminViewServerProps) => {
  const { initPageResult } = props
  const { user, permissions } = initPageResult

  return (
    <div className="custom-view">
      <h1>Custom Admin View</h1>
      <p>Welcome, {user?.email}</p>

      {/* Render custom content based on permissions */}
      {permissions?.collections?.posts?.read && (
        <div>
          <h2>Posts Management</h2>
          {/* Your custom post management UI */}
        </div>
      )}
    </div>
  )
}
```

### Custom Dashboard Widget

```typescript
import { DashboardView } from '@payloadcms/next/views'

export const CustomDashboardWidget = (props) => {
  return (
    <div className="dashboard-widget">
      <h3>Recent Activity</h3>
      <div className="activity-list">
        {/* Your custom activity list */}
      </div>
    </div>
  )
}

// Use in your dashboard
export const CustomDashboard = (props) => {
  return (
    <div>
      <DashboardView {...props} />
      <CustomDashboardWidget />
    </div>
  )
}
```

## Advanced Patterns

### Custom Authentication Flow

```typescript
import { login, logout } from '@payloadcms/next/auth'
import { redirect } from 'next/navigation'

export const CustomAuthFlow = {
  async loginWithOAuth(provider: string) {
    // Custom OAuth implementation
    const result = await oauthLogin(provider)

    if (result.success) {
      // Set up session
      await login({
        collection: 'users',
        config: payloadConfig,
        email: result.user.email,
        password: result.tempPassword
      })

      redirect('/admin')
    }
  },

  async logoutAndRedirect() {
    await logout({
      collection: 'users',
      config: payloadConfig
    })

    redirect('/login')
  }
}
```

### Custom Route Handling

```typescript
import { RootPage } from '@payloadcms/next/views'

export const CustomRouteHandler = async ({ params, searchParams }) => {
  const segments = params.segments || []

  // Handle custom routes
  if (segments[0] === 'custom') {
    return <CustomView />
  }

  // Fall back to default routing
  return RootPage({ config, importMap, params, searchParams })
}
```

### Custom Metadata Generation

```typescript
import { generatePageMetadata } from '@payloadcms/next/views'

export const generateCustomMetadata = async ({ params, searchParams }) => {
  const segments = params.segments || []

  if (segments[0] === 'custom') {
    return {
      title: 'Custom Page',
      description: 'A custom admin page'
    }
  }

  // Use default metadata generation
  return generatePageMetadata({ config, params, searchParams })
}
```

### Custom Error Handling

```typescript
import { NotFoundPage } from '@payloadcms/next/views'

export const CustomErrorHandler = ({ error, reset }) => {
  if (error.status === 404) {
    return <NotFoundPage />
  }

  return (
    <div className="error-page">
      <h1>Something went wrong!</h1>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

## Troubleshooting

### Common Issues

#### 1. Import Errors

```typescript
// ❌ Incorrect
import { RootPage } from '@payloadcms/next'

// ✅ Correct
import { RootPage } from '@payloadcms/next/views'
```

#### 2. Client Component Issues

```typescript
// ❌ Server component using client-only code
const ServerComponent = () => {
  const [state, setState] = useState() // Error!
  return <div>Content</div>
}

// ✅ Correct - use 'use client'
'use client'
const ClientComponent = () => {
  const [state, setState] = useState()
  return <div>Content</div>
}
```

#### 3. Authentication Issues

```typescript
// ❌ Missing collection parameter
await login({ email, password })

// ✅ Correct
await login({
  collection: 'users',
  config: payloadConfig,
  email,
  password
})
```

#### 4. Template Props Issues

```typescript
// ❌ Missing required props
<DefaultTemplate>
  <div>Content</div>
</DefaultTemplate>

// ✅ Correct
<DefaultTemplate
  visibleEntities={visibleEntities}
  {...serverProps}
>
  <div>Content</div>
</DefaultTemplate>
```

### Debugging Tips

1. **Check Console Logs**: Look for errors in both browser and server console
2. **Verify Imports**: Ensure you're importing from the correct export path
3. **Check Props**: Make sure all required props are passed to components
4. **Authentication State**: Verify user authentication state and permissions
5. **Configuration**: Ensure Payload configuration is correct

### Performance Optimization

1. **Use Server Components**: Prefer server components for static content
2. **Lazy Loading**: Implement lazy loading for heavy components
3. **Memoization**: Use React.memo for expensive components
4. **Bundle Analysis**: Analyze bundle size and optimize imports

### Best Practices

1. **Type Safety**: Use TypeScript for better type safety
2. **Error Boundaries**: Implement error boundaries for better error handling
3. **Loading States**: Show loading states for better UX
4. **Accessibility**: Ensure components are accessible
5. **Testing**: Write tests for custom components

This comprehensive guide should help you effectively use the `@payloadcms/next` package exports in your Payload CMS Next.js applications. The modular structure allows you to import only what you need, promoting code splitting and optimal bundle sizes while providing a complete admin interface.
