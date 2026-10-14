import pg from 'pg';

const pool = new pg.Pool({
  connectionString: 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966',
  ssl: false
});

async function clean() {
  await pool.query("DELETE FROM appointments WHERE id LIKE '%test%' OR name LIKE '%Test%'");
  await pool.query("DELETE FROM inquiries WHERE id LIKE '%test%' OR name LIKE '%Test%'");
  const countApt = await pool.query('SELECT COUNT(*) FROM appointments');
  const countInq = await pool.query('SELECT COUNT(*) FROM inquiries');
  console.log(`Current appointments in DB: ${countApt.rows[0].count}`);
  console.log(`Current inquiries in DB: ${countInq.rows[0].count}`);
  await pool.end();
}

clean();
