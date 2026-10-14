const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966',
  ssl: false,
  connectionTimeoutMillis: 5000
});

async function main() {
  await client.connect();
  const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
  console.log('Tables in DB:', res.rows.map(r => r.table_name));

  for (const t of res.rows.map(r => r.table_name)) {
    const count = await client.query(`SELECT COUNT(*) FROM "${t}"`);
    console.log(`Table ${t}: ${count.rows[0].count} rows`);
  }
  await client.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
