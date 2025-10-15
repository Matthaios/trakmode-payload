CREATE TABLE `stripe_checkout_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`checkout_session_id` text NOT NULL,
	`stripe_payment_intent_id` text NOT NULL,
	`user_id` text NOT NULL,
	`offer_id` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_checkout_sessions_checkout_session_id_unique` ON `stripe_checkout_sessions` (`checkout_session_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_checkout_sessions_stripe_payment_intent_id_unique` ON `stripe_checkout_sessions` (`stripe_payment_intent_id`);--> statement-breakpoint
CREATE TABLE `stripe_webhooks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`webhook_id` text NOT NULL,
	`status` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_webhooks_webhook_id_unique` ON `stripe_webhooks` (`webhook_id`);