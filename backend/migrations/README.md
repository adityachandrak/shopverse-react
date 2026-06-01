# Backend Migrations

This directory contains SQL migration files for the backend database.

Run migrations manually after backing up production data.

## Local test flow

1. Create the database:
   ```sql
   CREATE DATABASE IF NOT EXISTS shopverse_db;
   USE shopverse_db;
   ```
2. Run ordered migrations:
   ```bash
   npm run migrate --prefix backend
   ```
3. Validate:
   ```sql
   SHOW TABLES;
   SELECT * FROM migrations ORDER BY executed_at DESC LIMIT 5;
   ```

## Production safety

- Backup production RDS before applying migrations.
- Apply only reviewed SQL files.
- Do not auto-run destructive migrations without approval.
