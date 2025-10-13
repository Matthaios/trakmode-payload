CREATE TABLE `stripe_customers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`auth_user_id` text NOT NULL,
	`stripe_customer_id` text NOT NULL,
	`email` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_customers_auth_user_id_unique` ON `stripe_customers` (`auth_user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `stripe_customers_stripe_customer_id_unique` ON `stripe_customers` (`stripe_customer_id`);