-- Disable foreign key constraints to avoid dependency issues
PRAGMA foreign_keys = OFF;

-- Drop all auth tables (based on schema.ts)
-- Note: Drop in reverse dependency order to avoid foreign key constraint issues

-- Drop tables that reference other tables first
DROP TABLE IF EXISTS "__drizzle_migrations";

DROP TABLE IF EXISTS "two_factor";

DROP TABLE IF EXISTS "session";

DROP TABLE IF EXISTS "account";

DROP TABLE IF EXISTS "verification";

-- Drop the main user table last (other tables reference it)
DROP TABLE IF EXISTS "user";

-- Re-enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Verify all auth tables are gone
SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('user', 'session', 'account', 'verification', 'two_factor');
