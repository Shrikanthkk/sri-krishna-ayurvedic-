import pg from 'pg';

const client = new pg.Client({
  connectionString: 'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-1-ap-south-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  const res = await client.query('SELECT id, name, phone, treatment, created_at FROM appointments ORDER BY created_at DESC LIMIT 5');
  console.log('Supabase Recent Appointments:');
  console.table(res.rows);
  await client.end();
}

main().catch(console.error);
