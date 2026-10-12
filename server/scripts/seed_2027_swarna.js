import pg from 'pg';

const client = new pg.Client({
  host: '168.119.64.101',
  port: 5432,
  database: 'krish966',
  user: 'krish966',
  password: '2aG1YDSxSYQv1sBkubBhbe790',
  ssl: false
});

const swarnaDates2027 = [
  { id: 'psh-2027-01', month: 'January', date: '22', year: 2027, full_date: '2027-01-22', status: 'Active', display_order: 1 },
  { id: 'psh-2027-02', month: 'February', date: '19', year: 2027, full_date: '2027-02-19', status: 'Active', display_order: 2 },
  { id: 'psh-2027-03', month: 'March', date: '18', year: 2027, full_date: '2027-03-18', status: 'Active', display_order: 3 },
  { id: 'psh-2027-04', month: 'April', date: '15', year: 2027, full_date: '2027-04-15', status: 'Active', display_order: 4 },
  { id: 'psh-2027-05', month: 'May', date: '12', year: 2027, full_date: '2027-05-12', status: 'Active', display_order: 5 },
  { id: 'psh-2027-06', month: 'June', date: '8', year: 2027, full_date: '2027-06-08', status: 'Active', display_order: 6 },
  { id: 'psh-2027-07', month: 'July', date: '6', year: 2027, full_date: '2027-07-06', status: 'Active', display_order: 7 },
  { id: 'psh-2027-08-01', month: 'August', date: '2', year: 2027, full_date: '2027-08-02', status: 'Active', display_order: 8 },
  { id: 'psh-2027-08-02', month: 'August', date: '30', year: 2027, full_date: '2027-08-30', status: 'Active', display_order: 9 },
  { id: 'psh-2027-09', month: 'September', date: '26', year: 2027, full_date: '2027-09-26', status: 'Active', display_order: 10 },
  { id: 'psh-2027-10', month: 'October', date: '23', year: 2027, full_date: '2027-10-23', status: 'Active', display_order: 11 },
  { id: 'psh-2027-11', month: 'November', date: '19', year: 2027, full_date: '2027-11-19', status: 'Active', display_order: 12 },
  { id: 'psh-2027-12', month: 'December', date: '17', year: 2027, full_date: '2027-12-17', status: 'Active', display_order: 13 }
];

async function seed2027Dates() {
  await client.connect();
  console.log('Connected to PostgreSQL krish966...');

  for (const s of swarnaDates2027) {
    await client.query(`
      INSERT INTO swarnaprashana_schedule (id, month, date, year, full_date, status, display_order, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO UPDATE SET
        month = EXCLUDED.month,
        date = EXCLUDED.date,
        year = EXCLUDED.year,
        full_date = EXCLUDED.full_date,
        status = EXCLUDED.status,
        display_order = EXCLUDED.display_order,
        updated_at = CURRENT_TIMESTAMP;
    `, [s.id, s.month, s.date, s.year, s.full_date, s.status, s.display_order]);
    console.log(`✔ Inserted/Updated: ${s.month} ${s.date}, ${s.year} (id: ${s.id})`);
  }

  const res = await client.query(`SELECT year, month, date, full_date, display_order FROM swarnaprashana_schedule WHERE year = 2027 ORDER BY display_order`);
  console.log('\nCurrent 2027 dates in PostgreSQL:');
  console.table(res.rows);

  await client.end();
}

seed2027Dates().catch(err => {
  console.error('Error inserting 2027 dates:', err);
  process.exit(1);
});
