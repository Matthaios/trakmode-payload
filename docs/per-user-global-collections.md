# Per-User Global Collections Implementation

## Overview

This implementation allows you to designate certain collections as "per-user globals" where each user can have exactly one document. The system automatically redirects users to the appropriate view based on whether they already have a document.

## How It Works

### 1. **Plugin Configuration** (`src/payload/plugins/tenant.ts`)

The `TrakmodeTenantPlugin` accepts a `globalCollections` array:

```typescript
TrakmodeTenantPlugin({
  globalCollections: ['site-settings'], // Collections that behave as per-user globals
  userFieldName: 'user', // Optional: customize the field name (defaults to 'user')
})
```

### 2. **Field Injection**

For each collection in `globalCollections`, the plugin automatically:

- Adds a `user` relationship field with `unique: true` constraint
- Enforces a one-to-one relationship at the database level
- Auto-populates the user field on document creation
- Hides the field in production (visible in development for debugging)

### 3. **Access Control**

The plugin modifies collection access rules:

- **Read**: Users can only read their own document
- **Create**: Users can only create if they don't have a document yet
- **Update/Delete**: Users can only modify their own document
- **Admins**: Full access to all documents

### 4. **Automatic Redirects**

The `UserGlobalRedirector` component handles navigation:

| Scenario | Action |
|----------|--------|
| User navigates to list view + has document | Redirect to edit view of their document |
| User navigates to list view + no document | Redirect to create view |
| User tries to view another user's document | Redirect to their own document |
| User is already on correct page | No redirect (allow access) |

## Testing Guide

### Test 1: First-Time Document Creation

1. **Login as a regular user** (non-admin)
2. **Navigate to** `/dashboard/collections/site-settings`
3. **Expected Result**: 
   - Should automatically redirect to `/dashboard/collections/site-settings/create`
   - You should see the create form
4. **Fill out the form** and save
5. **Expected Result**:
   - Document is created and you're on the edit view
   - The `user` field is automatically set to your user ID

### Test 2: Existing Document Access

1. **Navigate to** `/dashboard/collections/site-settings` (list view)
2. **Expected Result**:
   - Should automatically redirect to `/dashboard/collections/site-settings/{your-doc-id}`
   - You should see your document in edit mode
3. **Verify**: Try navigating to the list view again - should always redirect to your document

### Test 3: Document Uniqueness

1. **While on your site-settings document**, try to create another one via URL
2. **Navigate to** `/dashboard/collections/site-settings/create`
3. **Expected Result**:
   - If you already have a document, you should be redirected to your existing document
   - If the create form loads, try to submit
   - Should see error: "You already have a site-settings document. Each user can only have one."

### Test 4: Cross-User Isolation

1. **Login as User A** and create a site-settings document
2. **Login as User B**
3. **Navigate to** `/dashboard/collections/site-settings`
4. **Expected Result**:
   - Should redirect to create view (User B has no document yet)
   - Should NOT see User A's document in any list or view

### Test 5: Admin Access

1. **Login as an admin user**
2. **Navigate to** `/dashboard/collections/site-settings`
3. **Expected Result**:
   - Admins should see the normal list view
   - Should see documents from all users
   - Can create, edit, and delete any document

### Test 6: Direct URL Access Attempt

1. **Login as User A** (who has document with ID `abc123`)
2. **Get the ID of User B's document** (as admin)
3. **Login back as User A**
4. **Try to navigate to** `/dashboard/collections/site-settings/{user-b-doc-id}`
5. **Expected Result**:
   - Should automatically redirect to `/dashboard/collections/site-settings/abc123` (User A's document)
   - Cannot access other users' documents

## Debug Mode

In development mode (`NODE_ENV=development`), the component logs detailed information:

```
[UserGlobalRedirector] Received props: {
  collectionSlug: 'site-settings',
  viewType: 'list',
  docID: undefined,
  userGlobalSlugs: ['site-settings'],
  hasUser: true,
  hasParams: true,
  paramsKeys: ['slug']
}

[UserGlobalRedirector] Query result: {
  foundDoc: true,
  docId: '67123abc456def',
  currentDocId: undefined,
  currentViewType: 'list'
}

[UserGlobalRedirector] Redirecting from list to edit: /dashboard/collections/site-settings/67123abc456def
```

Check your browser console and server logs for these messages when testing.

## Configuration in This Project

Current configuration in `src/payload/config.ts`:

```typescript
plugins: [
  storage,
  TrakmodeTenantPlugin({
    globalCollections: ['site-settings'],
  }),
  EmailPlugin,
]
```

## Adding More Global Collections

To make another collection a per-user global:

1. **Add the collection slug** to the `globalCollections` array:

```typescript
TrakmodeTenantPlugin({
  globalCollections: ['site-settings', 'user-preferences', 'account-config'],
})
```

2. **That's it!** The plugin automatically handles:
   - Field injection
   - Access control
   - Redirects
   - Uniqueness constraints

## Implementation Files

- **Plugin**: `src/payload/plugins/tenant.ts`
- **Redirector**: `src/payload/components/admin/actions/UserGlobalRedirector.tsx`
- **Config**: `src/payload/config.ts`
- **Example Collection**: `src/payload/collections/SiteSettings.ts`

## Troubleshooting

### Redirects Not Working

1. **Check debug logs** in development mode
2. **Verify** the collection slug matches exactly in `globalCollections`
3. **Ensure** user is authenticated
4. **Check** the `viewType` in logs matches expected value

### Database Constraint Errors

If you see "duplicate key error":
- This means the unique constraint is working correctly
- A user is trying to create a second document
- The `beforeValidate` hook should prevent this with a friendly error

### Field Not Showing in Development

If you can't see the `user` field in development:
- Check the `privateField` utility configuration
- Verify `NODE_ENV` is set correctly
- The field uses `admin.hidden` which can be conditionally toggled

## Architecture Notes

### Why Actions Component?

The redirector is registered as an **action component** in Payload's admin config. This means:
- It runs on every admin page load
- Has access to `ServerProps` including `user`, `params`, `viewType`
- Can use Next.js `redirect()` for server-side navigation
- Executes before the page renders

### Data Model

```
User (id: abc123)
  └─ has one ─> SiteSettings (user: abc123, unique: true)
```

The `unique: true` constraint on the `user` field ensures database-level enforcement of the one-to-one relationship.

## Future Enhancements

Potential improvements:
1. Add custom error messages per collection
2. Support for soft-deletes with restoration
3. Bulk operations for admins
4. Export/import of user-specific settings
5. Version history for global documents
