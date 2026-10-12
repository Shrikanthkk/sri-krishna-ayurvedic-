import pg from 'pg';

const client = new pg.Client({
  host: '168.119.64.101',
  port: 5432,
  database: 'krish966',
  user: 'krish966',
  password: '2aG1YDSxSYQv1sBkubBhbe790',
  ssl: false
});

async function main() {
  await client.connect();
  const res = await client.query(`
    SELECT conname, contype, pg_get_constraintdef(oid) 
    FROM pg_constraint 
    WHERE conrelid = 'swarnaprashana_schedule'::regclass;
  `);
  console.log('Constraints:', res.rows);
  const idx = await client.query(`
    SELECT indexname, indexdef 
    FROM pg_indexes 
    WHERE tablename = 'swarnaprashana_schedule';
  `);
  console.log('Indexes:', idx.rows);
  await client.end();
}

main().catch(console.error);
