# Payment Integration Implementation Plan

## Overview
Automatically create Stripe customers when users sign up, store the customer ID in the auth user schema, and track successful purchases in an enhanced Orders collection.

## Implementation Steps

### 1. Extend Auth User Schema with Stripe Customer ID
**File:** `src/services/auth/index.ts`
- Add `additionalFields` to the `user` object with the `stripeCustomerId` field as optional text field

### 2. Update Better Auth Type Inference
**File:** `src/services/auth/index.ts`
- Ensure the auth schema includes the updated user table with `stripeCustomerId`
- Types will automatically infer from the updated schema

### 3. Create Stripe Customer on User Signup
**File:** `src/services/payload/collections/Users/actions/create-new-user.ts`
- Import Stripe customer creation function
- After creating Payload user, attempt to create Stripe customer
- Store Stripe customer ID in both:
  - Auth database (`user.stripeCustomerId`)
  - Payments database (`stripeCustomers` table) for redundancy
- Implement error handling: if Stripe creation fails, log error but don't block user creation
- Add fallback to allow lazy customer creation on first purchase attempt

### 4. Add Lazy Customer Creation Helper
**File:** `src/services/payments/customer.ts`
- Update `getOrCreateCustomer` to also update auth database with `stripeCustomerId` if missing
- Check both auth DB and payments DB for existing customer mapping

### 5. Enhance Orders Collection Schema
**File:** `src/services/payload/collections/Orders/index.ts`
- Replace minimal schema with comprehensive purchase tracking:
  - `orderId`: Unique order identifier (keep existing)
  - `authId`: Relationship to users (keep existing)
  - `offerId`: Relationship to offers collection
  - `stripePaymentIntentId`: Stripe payment intent ID
  - `amount`: Purchase amount
  - `currency`: Currency code (e.g., 'usd')
  - `purchaseDate`: Timestamp of successful purchase
  - `status`: Payment status ('succeeded', 'failed', 'pending')
- Update access control to allow creation via webhook

### 6. Update Stripe Webhook Handler
**File:** `src/app/api/webhooks/stripe/route.ts`
Update events handling logic. Extract events handling to payments service.
- On `checkout.session.completed` and `payment_intent.succeeded`:
  - Extract customer ID and retrieve auth user ID
  - Create order record in Orders collection
  - Store purchase details (amount, currency, payment intent ID, offer ID from metadata)
- Implement proper error handling and logging

### 7. Database Migration
- Generate new migration for auth schema changes using Drizzle
- The `stripeCustomerId` field should be nullable to support existing users

## Key Files to Modify
- `src/services/auth/index.ts` - Type updates (**automatic** from schema)
- `src/services/payload/collections/Users/actions/create-new-user.ts` - Auto-create Stripe customer
- `src/services/payments/customer.ts` - Enhanced lazy creation with auth DB sync
- `src/services/payload/collections/Orders/index.ts` - Enhanced purchase tracking
- `src/app/api/webhooks/stripe/route.ts` - Store purchases on successful payment

## Notes
- Email is immutable in auth schema, perfect for Stripe customer matching
- Fallback mechanism ensures customer creation even if signup fails
- Dual storage (auth DB + payments DB) provides redundancy and fast lookups
- Orders collection tracks full purchase history for access control
