import pg from 'pg';

const client = new pg.Client({
  host: '168.119.64.101',
  port: 5432,
  database: 'krish966',
  user: 'krish966',
  password: '2aG1YDSxSYQv1sBkubBhbe790',
  ssl: false
});

async function listTreatments() {
  await client.connect();
  const res = await client.query('SELECT id, number, title, is_active, created_at FROM treatments ORDER BY number ASC, created_at ASC');
  console.log(`Total Treatments in PostgreSQL: ${res.rows.length}`);
  res.rows.forEach((r, idx) => {
    console.log(`${idx + 1}. [${r.number}] ID: ${r.id} | Title: "${r.title}" | Active: ${r.is_active}`);
  });
  await client.end();
}

listTreatments().catch(console.error);
