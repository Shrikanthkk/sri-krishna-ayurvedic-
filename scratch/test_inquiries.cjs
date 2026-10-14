const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966',
  ssl: false,
  connectionTimeoutMillis: 5000
});

async function main() {
  await client.connect();
  const inqs = await client.query('SELECT * FROM inquiries LIMIT 3');
  console.log('Current inquiries rows:', inqs.rows);
  await client.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
