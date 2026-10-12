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
  console.log('✅ Connected to PostgreSQL database: krish966');
  
  const tables = ['clinic_settings', 'treatments', 'swarnaprashana_schedule', 'appointments', 'inquiries', 'users'];
  for (const table of tables) {
    const res = await client.query(`SELECT COUNT(*) FROM "${table}"`);
    console.log(`- Table [${table}]: ${res.rows[0].count} rows stored in PostgreSQL`);
  }
  
  // Clean up any test inquiry
  await client.query('DELETE FROM inquiries WHERE id = $1', ['inq-1790761134603']);
  
  await client.end();
}

main().catch(console.error);
