# Source Code Tree

```
src/
├── app/
│   ├── (frontend)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── next/
│   │   │   ├── exit-preview/
│   │   │   │   └── route.ts
│   │   │   └── preview/
│   │   │       └── route.ts
│   │   ├── offers/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── profile/
│   │   │   └── [username]/
│   │   │       └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (payload)/
│   │   ├── (admin)/
│   │   │   ├── api/
│   │   │   │   └── [...slug]/
│   │   │   │       └── route.ts
│   │   │   ├── dashboard/
│   │   │   │   └── [[...segments]]/
│   │   │   │       ├── not-found.tsx
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   └── api/
│       ├── auth/
│       │   └── [...all]/
│       │       └── route.ts
│       ├── payments/
│       │   └── intents/
│       │       └── route.ts
│       └── webhooks/
│           └── stripe/
│               └── route.ts
├── components/
│   ├── admin/
│   │   ├── graphics/
│   │   │   ├── icon.tsx
│   │   │   └── logo.tsx
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── content-divider.tsx
│   │   │   ├── input.tsx
│   │   │   └── social-button.tsx
│   │   ├── icon.tsx
│   │   └── logo.tsx
│   ├── elements/
│   │   ├── Image.tsx
│   │   ├── Logo.tsx
│   │   └── RichText.tsx
│   ├── LivePreviewListener/
│   │   └── index.tsx
│   ├── shared/
│   │   └── social-logos.tsx
│   └── untitled/
│       ├── application/
│       │   ├── app-navigation/
│       │   │   ├── base-components/
│       │   │   │   ├── mobile-header.tsx
│       │   │   │   ├── nav-account-card.tsx
│       │   │   │   ├── nav-item-button.tsx
│       │   │   │   ├── nav-item.tsx
│       │   │   │   └── nav-list.tsx
│       │   │   ├── sidebar-navigation/
│       │   │   │   ├── sidebar-dual-tier.tsx
│       │   │   │   ├── sidebar-section-dividers.tsx
│       │   │   │   ├── sidebar-sections-subheadings.tsx
│       │   │   │   ├── sidebar-simple.tsx
│       │   │   │   └── sidebar-slim.tsx
│       │   │   ├── config.ts
│       │   │   ├── header-navigation.tsx
│       │   │   └── sidebar-navigation-base.tsx
│       │   ├── content-divider/
│       │   │   └── content-divider.tsx
│       │   ├── date-picker/
│       │   │   ├── calendar.tsx
│       │   │   ├── cell.tsx
│       │   │   ├── date-input.tsx
│       │   │   ├── date-picker.tsx
│       │   │   ├── date-range-picker.tsx
│       │   │   ├── range-calendar.tsx
│       │   │   └── range-preset.tsx
│       │   ├── empty-state/
│       │   │   └── empty-state.tsx
│       │   ├── file-upload/
│       │   │   └── file-upload-base.tsx
│       │   ├── loading-indicator/
│       │   │   └── loading-indicator.tsx
│       │   ├── modals/
│       │   │   └── modal.tsx
│       │   ├── pagination/
│       │   │   ├── pagination-base.tsx
│       │   │   ├── pagination-dot.tsx
│       │   │   ├── pagination-line.tsx
│       │   │   └── pagination.tsx
│       │   ├── section-footers/
│       │   │   └── section-footer.tsx
│       │   ├── section-headers/
│       │   │   └── section-headers.tsx
│       │   ├── slideout-menus/
│       │   │   └── slideout-menu.tsx
│       │   ├── table/
│       │   │   └── table.tsx
│       │   └── tabs/
│       │       └── tabs.tsx
│       ├── base/
│       │   ├── avatar/
│       │   │   ├── base-components/
│       │   │   │   ├── avatar-add-button.tsx
│       │   │   │   ├── avatar-company-icon.tsx
│       │   │   │   ├── avatar-online-indicator.tsx
│       │   │   │   ├── index.tsx
│       │   │   │   └── verified-tick.tsx
│       │   │   ├── avatar-label-group.tsx
│       │   │   ├── avatar-profile-photo.tsx
│       │   │   ├── avatar.tsx
│       │   │   └── utils.ts
│       │   ├── badges/
│       │   │   ├── badge-groups.tsx
│       │   │   ├── badge-types.ts
│       │   │   └── badges.tsx
│       │   ├── button-group/
│       │   │   └── button-group.tsx
│       │   ├── buttons/
│       │   │   ├── app-store-buttons-outline.tsx
│       │   │   ├── app-store-buttons.tsx
│       │   │   ├── button-utility.tsx
│       │   │   ├── button.tsx
│       │   │   ├── close-button.tsx
│       │   │   ├── social-button.tsx
│       │   │   └── social-logos.tsx
│       │   ├── checkbox/
│       │   │   └── checkbox.tsx
│       │   ├── dropdown/
│       │   │   └── dropdown.tsx
│       │   ├── file-upload-trigger/
│       │   │   └── file-upload-trigger.tsx
│       │   ├── form/
│       │   │   └── form.tsx
│       │   ├── input/
│       │   │   ├── hint-text.tsx
│       │   │   ├── input-group.tsx
│       │   │   ├── input-payment.tsx
│       │   │   ├── input.tsx
│       │   │   └── label.tsx
│       │   ├── progress-indicators/
│       │   │   ├── progress-circles.tsx
│       │   │   ├── progress-indicators.tsx
│       │   │   └── simple-circle.tsx
│       │   ├── radio-buttons/
│       │   │   └── radio-buttons.tsx
│       │   ├── select/
│       │   │   ├── combobox.tsx
│       │   │   ├── multi-select.tsx
│       │   │   ├── popover.tsx
│       │   │   ├── select-item.tsx
│       │   │   ├── select-native.tsx
│       │   │   └── select.tsx
│       │   ├── slider/
│       │   │   └── slider.tsx
│       │   ├── tags/
│       │   │   ├── base-components/
│       │   │   │   ├── tag-checkbox.tsx
│       │   │   │   └── tag-close-x.tsx
│       │   │   └── tags.tsx
│       │   ├── textarea/
│       │   │   └── textarea.tsx
│       │   ├── toggle/
│       │   │   └── toggle.tsx
│       │   └── tooltip/
│       │       └── tooltip.tsx
│       ├── foundations/
│       │   ├── featured-icon/
│       │   │   └── featured-icon.tsx
│       │   ├── logo/
│       │   │   ├── untitledui-logo-minimal.tsx
│       │   │   └── untitledui-logo.tsx
│       │   ├── payment-icons/
│       │   │   ├── amex-icon.tsx
│       │   │   ├── apple-pay-icon.tsx
│       │   │   ├── discover-icon.tsx
│       │   │   ├── index.tsx
│       │   │   ├── mastercard-icon.tsx
│       │   │   ├── paypal-icon.tsx
│       │   │   ├── stripe-icon.tsx
│       │   │   ├── union-pay-icon.tsx
│       │   │   └── visa-icon.tsx
│       │   ├── social-icons/
│       │   │   ├── angel-list.tsx
│       │   │   ├── apple.tsx
│       │   │   ├── clubhouse.tsx
│       │   │   ├── discord.tsx
│       │   │   ├── dribbble.tsx
│       │   │   ├── facebook.tsx
│       │   │   ├── figma.tsx
│       │   │   ├── github.tsx
│       │   │   ├── google.tsx
│       │   │   ├── index.tsx
│       │   │   ├── instagram.tsx
│       │   │   ├── layers.tsx
│       │   │   ├── linkedin.tsx
│       │   │   ├── pinterest.tsx
│       │   │   ├── reddit.tsx
│       │   │   ├── signal.tsx
│       │   │   ├── snapchat.tsx
│       │   │   ├── telegram.tsx
│       │   │   ├── tiktok.tsx
│       │   │   ├── tumblr.tsx
│       │   │   ├── twitter.tsx
│       │   │   ├── x.tsx
│       │   │   └── youtube.tsx
│       │   ├── dot-icon.tsx
│       │   └── rating-stars.tsx
│       ├── marketing/
│       │   └── header-navigation/
│       │       ├── base-components/
│       │       │   └── nav-menu-item.tsx
│       │       ├── dropdown-header-navigation.tsx
│       │       └── header.tsx
│       └── shared-assets/
│           ├── background-patterns/
│           │   ├── circle.tsx
│           │   ├── grid-check.tsx
│           │   ├── grid.tsx
│           │   ├── index.tsx
│           │   └── square.tsx
│           ├── illustrations/
│           │   ├── box.tsx
│           │   ├── cloud.tsx
│           │   ├── credit-card.tsx
│           │   ├── documents.tsx
│           │   └── index.tsx
│           └── login/
│               └── login-simple-social-logins.tsx
├── features/
│   ├── links/
│   │   └── links.tsx
│   └── login-page/
│       └── login-page.tsx
├── hooks/
│   ├── use-breakpoint.ts
│   ├── use-clipboard.ts
│   └── use-resize-observer.ts
├── lib/
│   ├── api-client.ts
│   ├── redis.ts
│   └── utils.ts
├── services/
│   ├── auth/
│   │   ├── client.ts
│   │   ├── db.ts
│   │   ├── index.ts
│   │   └── schema.ts
│   ├── payload/
│   │   ├── access/
│   │   │   ├── collections.ts
│   │   │   ├── fields.ts
│   │   │   └── roles.ts
│   │   ├── collections/
│   │   │   ├── Media/
│   │   │   │   ├── components/
│   │   │   │   │   └── Prefix.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   └── beforeOperation.ts
│   │   │   │   └── index.ts
│   │   │   ├── Offers/
│   │   │   │   └── index.ts
│   │   │   ├── Orders/
│   │   │   │   └── index.ts
│   │   │   ├── Users/
│   │   │   │   ├── actions/
│   │   │   │   │   ├── create-new-user.ts
│   │   │   │   │   └── find-or-create-user.ts
│   │   │   │   ├── endpoints/
│   │   │   │   │   └── me.ts
│   │   │   │   ├── strategies/
│   │   │   │   │   └── better-auth.ts
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── PrivateAssets.ts
│   │   ├── components/
│   │   │   └── admin/
│   │   │       ├── graphics/
│   │   │       │   ├── icon.tsx
│   │   │       │   └── logo.tsx
│   │   │       ├── logout/
│   │   │       │   └── LogoutButton.tsx
│   │   │       ├── ui/
│   │   │       │   ├── button.tsx
│   │   │       │   ├── content-divider.tsx
│   │   │       │   ├── input.tsx
│   │   │       │   └── social-button.tsx
│   │   │       ├── icon.tsx
│   │   │       └── logo.tsx
│   │   ├── fields/
│   │   │   └── slug/
│   │   │       ├── formatSlug.ts
│   │   │       ├── index.ts
│   │   │       └── SlugComponent.tsx
│   │   ├── plugins/
│   │   │   ├── email.ts
│   │   │   ├── storage.ts
│   │   │   └── tenant.ts
│   │   ├── utils/
│   │   │   ├── fields.ts
│   │   │   ├── generate-preview-path.ts
│   │   │   └── group.ts
│   │   └── client.ts
│   └── payments/
│       ├── utils/
│       │   └── create-stripe-user.ts
│       ├── webhooks/
│       │   └── index.ts
│       ├── customer.ts
│       ├── db.ts
│       ├── index.tsx
│       ├── load.ts
│       ├── schema.ts
│       └── stripe.ts
├── utils/
│   ├── canUseDOM.ts
│   ├── getURL.ts
│   ├── is-react-component.ts
│   └── tryCatch.ts
├── env.ts
├── payload-types.ts
└── payload.config.ts
```
