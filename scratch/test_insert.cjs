const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966',
  ssl: false,
  connectionTimeoutMillis: 5000
});

async function main() {
  await client.connect();
  
  // Test query appointments
  const apts = await client.query('SELECT * FROM appointments LIMIT 5');
  console.log('Current appointments count:', apts.rowCount);

  // Test insert appointment
  const testId = 'apt-test-' + Date.now();
  const insertRes = await client.query(`
    INSERT INTO appointments (id, name, phone, email, treatment, date, time_slot, status, notes, submitted_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    RETURNING *
  `, [testId, 'Test Patient', '9845012345', 'test@example.com', 'Nadi Pariksha', '2027-02-20', '10:00 AM', 'Pending', 'Test booking verification', '2027-02-14 10:00 AM']);

  console.log('Inserted appointment in PostgreSQL:', insertRes.rows[0].id);

  // Verify delete test appointment
  await client.query('DELETE FROM appointments WHERE id = $1', [testId]);
  console.log('Cleaned up test appointment.');

  await client.end();
}

main().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
