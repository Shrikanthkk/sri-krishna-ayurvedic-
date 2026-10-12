import pg from 'pg';

const supabaseUrl = 'postgresql://postgres:Pramod%400605@db.yohzqktgzesenbwxvyld.supabase.co:5432/postgres';

async function syncToSupabase() {
  const supabaseClient = new pg.Client({
    connectionString: supabaseUrl,
    ssl: { rejectUnauthorized: false }
  });

  const vpsClient = new pg.Client({
    host: '168.119.64.101',
    port: 5432,
    database: 'krish966',
    user: 'krish966',
    password: '2aG1YDSxSYQv1sBkubBhbe790',
    ssl: false
  });

  await supabaseClient.connect();
  console.log('✅ Connected to Supabase');
  await vpsClient.connect();
  console.log('✅ Connected to VPS PostgreSQL');

  // 1. Update Supabase swarnaprashana_schedule constraints
  console.log('\n--- 1. Updating swarnaprashana_schedule constraints on Supabase ---');
  await supabaseClient.query(`
    ALTER TABLE swarnaprashana_schedule 
    DROP CONSTRAINT IF EXISTS swarnaprashana_year_month_unique;
  `);
  await supabaseClient.query(`
    DROP INDEX IF EXISTS idx_swarna_year_month;
  `);
  await supabaseClient.query(`
    ALTER TABLE swarnaprashana_schedule 
    DROP CONSTRAINT IF EXISTS swarnaprashana_year_month_date_unique;
  `);
  await supabaseClient.query(`
    ALTER TABLE swarnaprashana_schedule 
    ADD CONSTRAINT swarnaprashana_year_month_date_unique UNIQUE (year, month, date);
  `);
  await supabaseClient.query(`
    CREATE INDEX IF NOT EXISTS idx_swarna_year_month_date ON swarnaprashana_schedule(year, month, date);
  `);
  console.log('✔ Supabase constraints updated.');

  // 2. Sync 2027 Swarnaprashana schedule to Supabase (delete old 2026 dates)
  console.log('\n--- 2. Syncing Swarnaprashana Schedule to Supabase ---');
  await supabaseClient.query('DELETE FROM swarnaprashana_schedule WHERE year = 2026');
  const vpsSwarna = await vpsClient.query('SELECT * FROM swarnaprashana_schedule WHERE year = 2027 ORDER BY display_order');
  for (const row of vpsSwarna.rows) {
    await supabaseClient.query(`
      INSERT INTO swarnaprashana_schedule (id, month, date, year, full_date, status, display_order, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      ON CONFLICT (id) DO UPDATE SET
        month = EXCLUDED.month,
        date = EXCLUDED.date,
        year = EXCLUDED.year,
        full_date = EXCLUDED.full_date,
        status = EXCLUDED.status,
        display_order = EXCLUDED.display_order,
        updated_at = EXCLUDED.updated_at;
    `, [row.id, row.month, row.date, row.year, row.full_date, row.status, row.display_order, row.created_at, row.updated_at]);
  }
  console.log(`✔ Synced ${vpsSwarna.rows.length} 2027 Swarnaprashana dates to Supabase.`);

  // 3. Sync all Appointments (including 'jim', TestAlpha User, TestBeta User)
  console.log('\n--- 3. Syncing Appointments to Supabase ---');
  const vpsApts = await vpsClient.query('SELECT * FROM appointments');
  for (const apt of vpsApts.rows) {
    await supabaseClient.query(`
      INSERT INTO appointments (id, name, phone, email, treatment, date, time_slot, status, notes, submitted_at, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        email = EXCLUDED.email,
        treatment = EXCLUDED.treatment,
        date = EXCLUDED.date,
        time_slot = EXCLUDED.time_slot,
        status = EXCLUDED.status,
        notes = EXCLUDED.notes,
        updated_at = EXCLUDED.updated_at;
    `, [apt.id, apt.name, apt.phone, apt.email, apt.treatment, apt.date, apt.time_slot, apt.status, apt.notes, apt.submitted_at, apt.created_at, apt.updated_at]);
  }
  console.log(`✔ Synced ${vpsApts.rows.length} appointments (including "jim") to Supabase.`);

  // 4. Sync Inquiries to Supabase
  console.log('\n--- 4. Syncing Inquiries to Supabase ---');
  const vpsInqs = await vpsClient.query('SELECT * FROM inquiries');
  for (const inq of vpsInqs.rows) {
    await supabaseClient.query(`
      INSERT INTO inquiries (id, name, phone, email, subject, message, is_read, submitted_at, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        phone = EXCLUDED.phone,
        email = EXCLUDED.email,
        subject = EXCLUDED.subject,
        message = EXCLUDED.message,
        is_read = EXCLUDED.is_read,
        updated_at = EXCLUDED.updated_at;
    `, [inq.id, inq.name, inq.phone, inq.email, inq.subject, inq.message, inq.is_read, inq.submitted_at, inq.created_at, inq.updated_at]);
  }
  console.log(`✔ Synced ${vpsInqs.rows.length} inquiries to Supabase.`);

  // 5. Verify Supabase appointments
  const finalApts = await supabaseClient.query('SELECT id, name, phone, treatment, status, created_at FROM appointments ORDER BY created_at DESC LIMIT 8');
  console.log('\n📋 Recent Appointments in Supabase now:');
  console.table(finalApts.rows);

  // 6. Verify Supabase 2027 Swarnaprashana dates
  const finalSwarna = await supabaseClient.query('SELECT month, date, year, display_order FROM swarnaprashana_schedule ORDER BY display_order');
  console.log('\n🌿 2027 Swarnaprashana dates in Supabase now:');
  console.table(finalSwarna.rows);

  await supabaseClient.end();
  await vpsClient.end();
}

syncToSupabase().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
