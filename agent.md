
# Trakmode AI Agent & Developer Guide

Important whenever you are planning, make sure to create tasks in that backlog folder similar as you would in some other project tracking software. I want to have markdowns where in the header of the markdown there will be a project status and maybe some other things.

This document outlines the architectural principles and code organization strategy for the Trakmode Next.js project. Its purpose is to ensure the codebase remains maintainable, searchable, and scalable. All new code should adhere to these guidelines.

## 1. Core Architectural Principles

We use a layered architecture inspired by Clean Architecture, adapted for a Next.js and Payload CMS environment. The goal is to separate concerns, making our code more modular and testable.

The project is divided into the following primary layers:

-   `app/`: **Routing & Composition Layer.** Connects the web framework to our application.
-   `features/`: **Feature Layer.** Implements specific user-facing business features.
-   `widgets/`: **Widget Layer.** Composes features and entities into larger UI blocks for pages.
-   `entities/`: **Business Logic Layer.** Contains core business models, data, and logic.
-   `services/`: **External Services Layer.** Manages integrations with third-party APIs.
-   `payload/`: **CMS Layer.** Encapsulates all code related to Payload CMS.
-   `shared/`: **Shared Kernel Layer.** Contains reusable, application-wide code (UI, utils, config).

---

## 2. Directory Breakdown & Rules

### `app/`

-   **Purpose**: Handles routing, API endpoints, and page-level composition. This layer should be as "thin" as possible.
-   **Rules**:
    1.  **Page Components (`page.tsx`)**:
        -   Should primarily be responsible for fetching initial data by calling functions from the `entities` layer.
        -   Should compose `widgets` and `features` to build the UI, passing data down as props.
        -   **AVOID** putting complex state management, business logic, or large JSX trees directly in page files.
    2.  **Layouts (`layout.tsx`)**: Define root and nested layouts.
    3.  **API Routes (`app/api/`)**: Handle specific API endpoints that are not part of the Payload API, such as Stripe webhooks.

### `features/`

-   **Purpose**: Contains self-contained slices of business functionality. A feature is a user-facing capability, like a login form or a user profile display.
-   **Rules**:
    1.  Each feature lives in its own directory (e.g., `features/user-profile`, `features/login-page`).
    2.  A feature directory should contain all the necessary components, hooks, and logic for that specific feature.
        -   `ui/`: React components specific to this feature (e.g., `UserProfile.tsx`).
        -   `model/`: Hooks or state management logic for the feature (e.g., `useFaqToggle.ts`).
    3.  Features should be self-contained and not directly depend on other features. They can depend on `entities` and `shared`.

### `widgets/`

-   **Purpose**: Larger, reusable UI components that are composed of smaller `features` and `entities`. These are often used across multiple pages.
-   **Rules**:
    1.  Each widget has its own directory (e.g., `widgets/SiteHeader`, `widgets/SiteFooter`).
    2.  Widgets compose components from `features/` and `shared/ui` to build complex UI sections.
    3.  They receive data from pages and pass it down to the features they render.

### `entities/`

-   **Purpose**: The core of your business logic. This layer is UI-agnostic and contains the data models and operations of your application.
-   **Rules**:
    1.  Each business entity gets its own directory (e.g., `entities/user`, `entities/offer`).
    2.  An entity directory typically contains:
        -   `model/`: TypeScript types and interfaces related to the entity (e.g., `Offer` type).
        -   `api/`: Functions for fetching and mutating data (e.g., `getOffers()`, `getUserProfile()`). **All `payloadClient` calls should live here.**
    3.  Code in this layer **MUST NOT** import from `features`, `widgets`, or `app`.

### `services/`

-   **Purpose**: Manages all interactions with external, third-party services. This layer isolates external dependencies.
-   **Rules**:
    1.  Each service has its own directory (e.g., `services/stripe`, `services/auth-provider`).
    2.  This is where you initialize API clients and create wrappers for external SDKs.
    3.  This layer should not contain application-specific business logic. For example, `services/stripe` knows how to create a payment intent, but `entities/order` knows *why* and *when* to create one.

### `payload/`

-   **Purpose**: Centralizes all code and configuration related to Payload CMS.
-   **Rules**:
    1.  **All Payload-related files go here.** This includes collections, globals, hooks, access control functions, and plugins.
    2.  Directory Structure:
        -   `payload/config.ts`: The main Payload config file.
        -   `payload/collections/`: Definitions for each collection.
        -   `payload/access/`: Access control functions.
        -   `payload/hooks/`: Payload-specific hooks.
        -   `payload/admin-components/`: Custom React components for the Payload admin panel.
        -   `payload/plugins/`: Custom Payload plugins.

### `shared/`

-   **Purpose**: The innermost layer, containing code that can be used anywhere in the application. It has no dependencies on any other layer.
-   **Rules**:
    1.  **UI Kit (`shared/ui/`)**: Your core, reusable component library (e.g., Buttons, Inputs, Avatars from the `untitled` library). These are "dumb" components.
    2.  **Libraries (`shared/lib/`)**: Utility functions like `cn()`, `formatDate()`, etc.
    3.  **Configuration (`shared/config/`)**: Project-wide configuration, including environment variables (`env.ts`).
    4.  **API Clients (`shared/api/`)**: Centralized API client initializations (e.g., `payload.ts`, `stripe.ts`).

---

## 3. General Rules & Best Practices

1.  **Dependency Rule**: Code can only import from layers at the same level or "deeper" (closer to `shared`).
    -   **Good**: `features` -> `entities` -> `shared`
    -   **Bad**: `entities` -> `features` (Business logic should not know about the UI).

2.  **Data Flow**:
    -   **Server Components (`app/`)**: Fetch data using functions from the `entities` layer.
    -   **Props**: Pass data down from pages to `widgets` and `features`.
    -   **Client Components**: Use SWR or React Query with `entities` functions for client-side data fetching.

3.  **Styling**:
    -   Global styles and fonts are located in `app/(frontend)/styles/`.
    -   Component-specific styles should be co-located with their components.

4.  **Decision-Making Flow**: When adding new code, ask these questions:
    -   Is it a reusable, generic UI component? -> `shared/ui/`
    -   Is it a core business model or data-fetching logic? -> `entities/`
    -   Is it a client for a third-party service? -> `services/`
    -   Is it a piece of UI and logic for a specific user story? -> `features/`
    -   Is it a layout block for a page composed of features? -> `widgets/`
    -   Is it specific to Payload CMS? -> `payload/`