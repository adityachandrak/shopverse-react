# Database Migrations

Place reviewed SQL migration files in this directory using ordered names such
as `001_add_shipping_status.sql`.

The GitHub Actions workflow detects SQL files in both `migrations/` and
`backend/migrations/`, but it does not execute SQL automatically.

Back up the database, review the migration, run it manually against the intended
environment, and validate the result.
