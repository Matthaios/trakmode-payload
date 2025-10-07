# Payload Next.js Exports Documentation

This document provides a comprehensive overview of all exports available in the `@payloadcms/next` package and how they are used throughout the codebase.

## Package Structure

The `@payloadcms/next` package is organized into several export categories, each serving specific purposes in the Payload CMS Next.js integration:

- **Main Entry**: `./src/index.js` - Primary package entry point
- **withPayload**: `./src/withPayload.js` - Next.js configuration wrapper
- **Exports**: `./src/exports/` - Categorized export modules

## Export Categories

### 1. Views (`./views`)

**File**: `src/exports/views.ts`

The views exports provide the main UI components for the Payload admin interface:

#### Exported Components:
- `AccountView` - User account management interface
- `DashboardView` - Main dashboard component
- `DefaultDashboard` - Default dashboard implementation
- `ListView` - Collection list view with filtering and pagination
- `LoginView` - Authentication login interface
- `NotFoundPage` - 404 error page
- `RootPage` - Root page component for routing

#### Type Exports:
- `DashboardViewClientProps` - Client-side props for dashboard
- `DashboardViewServerProps` - Server-side props for dashboard
- `DashboardViewServerPropsOnly` - Server-only props for dashboard
- `RenderListViewArgs` - Arguments for rendering list views
- `GenerateViewMetadata` - Metadata generation function type

#### Usage in Codebase:
- **Root Routing**: Used in `src/views/Root/getRouteData.ts` to define route components
- **Metadata Generation**: Referenced in `src/views/Root/metadata.ts` for SEO and page metadata
- **Template Integration**: Rendered within templates in `src/views/Root/index.tsx`

### 2. Authentication (`./auth`)

**File**: `src/exports/auth.ts`

Authentication-related functions for user login, logout, and token management:

#### Exported Functions:
- `login` - User authentication with email/username and password
- `logout` - User session termination
- `refresh` - Token refresh functionality

#### Usage in Codebase:
- **Login Flow**: Implemented in `src/auth/login.ts` with support for both email and username authentication
- **Session Management**: Used in `src/auth/logout.ts` and `src/auth/refresh.ts`
- **Integration**: Connected to Payload's authentication system via `payload.login()` and `payload.logout()`

### 3. Templates (`./templates`)

**File**: `src/exports/templates.ts`

Layout templates for different page types in the admin interface:

#### Exported Components:
- `DefaultTemplate` - Standard admin layout with navigation and sidebar
- `MinimalTemplate` - Minimal layout for specific pages (login, error pages)

#### Type Exports:
- `DefaultTemplateProps` - Props for default template
- `MinimalTemplateProps` - Props for minimal template

#### Usage in Codebase:
- **Page Layouts**: Used in `src/views/Root/index.tsx` to wrap different view types
- **Error Pages**: Applied in `src/views/NotFound/index.tsx` for consistent error page styling
- **Conditional Rendering**: Templates are selected based on page type and user authentication status

### 4. Client Components (`./client`)

**File**: `src/exports/client.ts`

Client-side React components that require browser-specific functionality:

#### Exported Components:
- `DefaultNavClient` - Client-side navigation component with interactivity
- `NavHamburger` - Mobile navigation hamburger menu
- `NavWrapper` - Navigation container component

#### Usage in Codebase:
- **Navigation**: Used in `src/elements/Nav/index.tsx` for interactive navigation
- **Mobile Support**: Implemented in `src/templates/Default/index.tsx` for responsive design
- **Client-Side Features**: Enables dynamic navigation behavior and mobile menu functionality

### 5. Server Components (`./rsc`)

**File**: `src/exports/rsc.ts`

Server-side React components for server-side rendering:

#### Exported Components:
- `DocumentHeader` - Document metadata and header information
- `Logo` - Payload CMS logo component
- `DefaultNav` - Server-side navigation component

#### Usage in Codebase:
- **SEO**: Used for generating document headers and metadata
- **Branding**: Logo component used across templates
- **Server Rendering**: Navigation rendered on server for better performance

### 6. Layouts (`./layouts`)

**File**: `src/exports/layouts.ts`

Layout-related components and utilities:

#### Exported Components:
- `RootLayout` - Root layout component for the entire application
- `metadata` - Layout metadata generation

#### Exported Functions:
- `handleServerFunctions` - Server-side function handling utility

#### Usage in Codebase:
- **App Structure**: Used as the main layout wrapper in Next.js app structure
- **Server Functions**: Handles server-side operations and API calls
- **Metadata**: Generates page metadata for SEO and social sharing

### 7. Routes (`./routes`)

**File**: `src/exports/routes.ts`

API route handlers for different HTTP methods:

#### Exported Functions:
- `GRAPHQL_PLAYGROUND_GET` - GraphQL playground interface
- `GRAPHQL_POST` - GraphQL API endpoint
- `REST_DELETE` - REST API DELETE handler
- `REST_GET` - REST API GET handler
- `REST_OPTIONS` - REST API OPTIONS handler
- `REST_PATCH` - REST API PATCH handler
- `REST_POST` - REST API POST handler
- `REST_PUT` - REST API PUT handler

#### Usage in Codebase:
- **API Endpoints**: Implemented in `src/routes/graphql/index.ts` and `src/routes/rest/index.ts`
- **GraphQL Support**: Provides GraphQL playground and API endpoints
- **REST API**: Handles all HTTP methods for RESTful API operations

### 8. Utilities (`./utilities`)

**File**: `src/exports/utilities.ts`

Server-side utility functions and deprecated Payload utilities:

#### Exported Functions:
- `getNextRequestI18n` - Internationalization for Next.js requests
- `getPayloadHMR` - Hot module replacement for Payload (deprecated)

#### Deprecated Exports (re-exported from Payload):
- `mergeHeaders` - Header merging utility
- `headersWithCors` - CORS header management
- `createPayloadRequest` - Payload request creation
- `addDataAndFileToRequest` - Request data handling
- `sanitizeLocales` - Locale sanitization
- `addLocalesToRequestFromData` - Locale data handling

#### Usage in Codebase:
- **i18n Support**: Used in `src/views/Root/metadata.ts` and other components for internationalization
- **Request Handling**: Utilities for processing Next.js requests and Payload operations
- **Deprecation**: Legacy utilities maintained for backward compatibility

## Main Entry Points

### Primary Entry (`./src/index.js`)
```javascript
export { default as withPayload } from './withPayload.js'
```

### ESBuild Entry (`./src/esbuildEntry.ts`)
```typescript
export { RootLayout } from './layouts/Root/index.js'
export { DashboardView } from './views/Dashboard/index.js'
export { LoginView } from './views/Login/index.js'
export { RootPage } from './views/Root/index.js'
```

## Package Configuration

The package exports are configured in `package.json` with specific entry points:

```json
{
  "exports": {
    ".": "./src/index.js",
    "./withPayload": "./src/withPayload.js",
    "./layouts": "./src/exports/layouts.ts",
    "./routes": "./src/exports/routes.ts",
    "./auth": "./src/exports/auth.ts",
    "./templates": "./src/exports/templates.ts",
    "./utilities": "./src/exports/utilities.ts",
    "./views": "./src/exports/views.ts",
    "./client": "./src/exports/client.ts",
    "./rsc": "./src/exports/rsc.ts"
  }
}
```

## Usage Patterns

### 1. View Components
Views are used in the routing system to render different admin pages:
- Dashboard for overview
- List views for collection management
- Login for authentication
- Account for user settings

### 2. Template System
Templates provide consistent layouts:
- Default template for most admin pages
- Minimal template for login and error pages

### 3. Authentication Flow
Auth functions handle the complete authentication lifecycle:
- Login with email/username validation
- Session management and token handling
- Logout and cleanup

### 4. API Integration
Route handlers provide both GraphQL and REST API endpoints:
- GraphQL playground for development
- RESTful CRUD operations
- Proper HTTP method handling

### 5. Client-Server Architecture
The package follows Next.js best practices:
- Server components for initial rendering
- Client components for interactivity
- Proper separation of concerns

## Integration with Payload CMS

The exports are designed to work seamlessly with Payload CMS:
- Uses Payload's authentication system
- Integrates with Payload's collection management
- Leverages Payload's configuration system
- Maintains compatibility with Payload's plugin architecture

This modular export structure allows developers to import only the components and utilities they need, promoting code splitting and optimal bundle sizes while providing a complete admin interface for Payload CMS applications.
