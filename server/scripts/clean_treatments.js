import pg from 'pg';

const client = new pg.Client({
  host: '168.119.64.101',
  port: 5432,
  database: 'krish966',
  user: 'krish966',
  password: '2aG1YDSxSYQv1sBkubBhbe790',
  ssl: false
});

const validTreatmentIds = [
  'cancer-treatment',
  'swarnaprashana',
  'vitiligo',
  'physiotherapy',
  'reduce-obesity',
  'joint-pain-arthritis',
  'skin-problems',
  'alopecia',
  'sexual-disorders',
  'de-addiction'
];

async function cleanAndSyncTreatments() {
  await client.connect();
  console.log('Connecting to PostgreSQL to clean test duplicate treatments...');

  // Delete all test duplicate rows
  const delRes = await client.query(`
    DELETE FROM treatments 
    WHERE id NOT IN (${validTreatmentIds.map((_, i) => `$${i + 1}`).join(', ')})
       OR title ILIKE '%pavan%' 
       OR title ILIKE '%kjlhvbv%' 
       OR title ILIKE '%,kjhvb%' 
       OR title ILIKE '%oipog%' 
       OR title ILIKE '%test%'
    RETURNING id, title;
  `, validTreatmentIds);

  console.log(`Deleted ${delRes.rows.length} test/duplicate treatments.`);

  // Verify remaining canonical treatments
  const remaining = await client.query('SELECT id, number, title FROM treatments ORDER BY number ASC');
  console.log(`\nRemaining Clean PostgreSQL Treatments (${remaining.rows.length}):`);
  remaining.rows.forEach(r => console.log(` - [${r.number}] ${r.title} (${r.id})`));

  await client.end();
}

cleanAndSyncTreatments().catch(console.error);
