import pg from 'pg';

const { Pool } = pg;

const POSTGRES_URL = 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966';

async function main() {
  const pool = new Pool({
    connectionString: POSTGRES_URL,
    ssl: false
  });

  console.log('====================================================');
  console.log('🐘 VERIFYING POSTGRESQL (168.119.64.101) DATABASE');
  console.log('====================================================');

  const tables = ['clinic_settings', 'treatments', 'swarnaprashana_schedule', 'appointments', 'inquiries', 'users', 'products'];
  for (const t of tables) {
    const res = await pool.query(`SELECT count(*) FROM "${t}"`);
    console.log(`- Table [${t.padEnd(25)}]: ${res.rows[0].count} rows`);
  }

  console.log('\n--- Appointments for jim & Test users in PostgreSQL ---');
  const apts = await pool.query(
    "SELECT id, name, phone, date, status, created_at FROM appointments WHERE name IN ('jim', 'TestAlpha User', 'TestBeta User') ORDER BY created_at DESC"
  );
  console.table(apts.rows);

  console.log('\n--- 2027 Swarnaprashana Schedule in PostgreSQL ---');
  const swarna = await pool.query(
    "SELECT id, year, month, date, status FROM swarnaprashana_schedule WHERE year = 2027 ORDER BY date ASC"
  );
  console.table(swarna.rows);

  console.log('\n--- Admin Users in PostgreSQL ---');
  const users = await pool.query("SELECT id, name, email, role, is_active FROM users");
  console.table(users.rows);

  await pool.end();
  console.log('✅ PostgreSQL data verified successfully!');
}

main().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
