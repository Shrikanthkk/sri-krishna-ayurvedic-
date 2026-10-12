import pg from 'pg';

const client = new pg.Client({
  host: '168.119.64.101',
  port: 5432,
  database: 'krish966',
  user: 'krish966',
  password: '2aG1YDSxSYQv1sBkubBhbe790',
  ssl: false
});

async function main() {
  await client.connect();
  console.log('Connected to PostgreSQL database krish966...');

  // 1. Drop existing unique month constraint and index
  console.log('Dropping swarnaprashana_year_month_unique constraint...');
  await client.query(`
    ALTER TABLE swarnaprashana_schedule 
    DROP CONSTRAINT IF EXISTS swarnaprashana_year_month_unique;
  `);

  console.log('Dropping idx_swarna_year_month index...');
  await client.query(`
    DROP INDEX IF EXISTS idx_swarna_year_month;
  `);

  // 2. Add composite unique constraint on (year, month, date)
  console.log('Adding swarnaprashana_year_date_unique constraint...');
  await client.query(`
    ALTER TABLE swarnaprashana_schedule 
    ADD CONSTRAINT swarnaprashana_year_month_date_unique UNIQUE (year, month, date);
  `);

  console.log('Creating idx_swarna_year_month_date index...');
  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_swarna_year_month_date ON swarnaprashana_schedule(year, month, date);
  `);

  console.log('Migration complete!');
  await client.end();
}

main().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
