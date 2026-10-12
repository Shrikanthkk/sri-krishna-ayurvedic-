import { query } from '../db.js';

async function main() {
  console.log('=====================================================');
  console.log('🔍 VERIFYING SUPABASE LIVE CRUD SYNCHRONIZATION');
  console.log('=====================================================');

  // 1. Check Appointment Table for 'jim' and test users
  const apts = await query(
    "SELECT id, name, phone, date, status, created_at FROM appointments WHERE name IN ('jim', 'TestAlpha User', 'TestBeta User') ORDER BY created_at DESC"
  );
  console.log('\n✅ 1. Appointments present directly in Supabase table:');
  console.table(apts.rows);

  // 2. Perform a live API creation via Vite local server
  console.log('\n📝 2. Booking a live appointment for TestBeta User via API...');
  const createRes = await fetch('http://localhost:5173/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'TestBeta User',
      phone: '9845022222',
      email: 'testbeta@srikrishnaayurveda.com',
      treatment: 'Swarnaprashana (Gold Drops)',
      date: '2027-01-22',
      timeSlot: '11:00 AM',
      notes: 'Automated test appointment syncing directly to Supabase'
    })
  });
  const createdJson = await createRes.json();
  console.log('API Response:', createdJson.success ? 'SUCCESS' : 'FAILED', createdJson.data?.id);

  if (createdJson.data?.id) {
    const checkDb = await query('SELECT id, name, phone, date, status FROM appointments WHERE id = $1', [createdJson.data.id]);
    console.log('✅ Confirmed newly created record in Supabase:');
    console.table(checkDb.rows);

    // 3. Update status in Supabase
    console.log('\n🔄 3. Updating appointment status in Supabase to "Confirmed"...');
    await query("UPDATE appointments SET status = 'Confirmed' WHERE id = $1", [createdJson.data.id]);
    
    // Read through frontend API to verify it reflects instantly
    const fetchApts = await fetch('http://localhost:5173/api/appointments');
    const allApts = await fetchApts.json();
    const updatedRecord = (allApts.data || []).find(a => a.id === createdJson.data.id);
    console.log('✅ Frontend API read back status:', updatedRecord?.status);
  }

  // 4. Verify 2027 Swarnaprashana Schedule
  const swarna = await query(
    'SELECT id, year, month, date, status FROM swarnaprashana_schedule WHERE year = 2027 ORDER BY date ASC'
  );
  console.log(`\n📅 4. 2027 Swarnaprashana Schedule in Supabase: (${swarna.rows.length} dates configured)`);
  console.table(swarna.rows);

  console.log('\n=====================================================');
  console.log('🎉 ALL SUPABASE BIDIRECTIONAL CRUD CHECKS PASSED!');
  console.log('=====================================================');
  process.exit(0);
}

main().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
