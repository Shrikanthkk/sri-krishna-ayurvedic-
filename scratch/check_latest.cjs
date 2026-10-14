const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966',
  ssl: false,
  connectionTimeoutMillis: 5000
});

async function main() {
  await client.connect();
  const res = await client.query("SELECT id, name, phone, subject, message, is_read, submitted_at FROM inquiries WHERE name = 'Rajesh Patel'");
  console.log('Found newly inserted message in PostgreSQL:');
  console.table(res.rows);
  await client.end();
}

main().catch(console.error);
