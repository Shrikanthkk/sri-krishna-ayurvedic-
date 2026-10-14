const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966',
  ssl: false,
  connectionTimeoutMillis: 10000
});

async function main() {
  await client.connect();
  try {
    const sql = `
      INSERT INTO appointments (id, name, phone, email, treatment, date, time_slot, status, notes, submitted_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 'Pending', $8, $9)
      RETURNING *
    `;
    const params = ['apt-debug-1', 'raj', '7941818188', 'raj@gmail.com', 'Chronic Diseases – Joint Pains (Arthritis)', '2026-10-15', '02:00 PM', 'demo', '2026-10-14 10:21 am'];
    const res = await client.query(sql, params);
    console.log('SUCCESS INSERT:', res.rows[0]);
  } catch (err) {
    console.error('ERROR:', err);
  }
  await client.end();
}

main();
