const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966',
  ssl: false,
  connectionTimeoutMillis: 5000
});

async function main() {
  await client.connect();
  const tables = ['appointments', 'inquiries', 'treatments', 'swarnaprashana_schedule', 'clinic_settings', 'users'];
  for (const t of tables) {
    const res = await client.query("SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name=$1 ORDER BY ordinal_position", [t]);
    console.log(`\n--- TABLE: ${t} ---`);
    res.rows.forEach(r => console.log(`  ${r.column_name} (${r.data_type}, nullable: ${r.is_nullable})`));
  }
  await client.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
