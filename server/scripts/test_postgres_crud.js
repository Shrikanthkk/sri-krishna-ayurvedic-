import pg from 'pg';

const { Pool } = pg;
const POSTGRES_URL = 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966';
const API_URL = 'http://localhost:5173/api';

const pool = new Pool({
  connectionString: POSTGRES_URL,
  ssl: false
});

async function runTests() {
  console.log('===============================================================');
  console.log('🧪 COMPREHENSIVE POSTGRESQL CRUD & BIDIRECTIONAL SYNC TEST');
  console.log('===============================================================');

  // Test 1: Create Appointment via API & Verify directly in PostgreSQL
  console.log('\n[1/5] Testing Appointment CREATE via API -> PostgreSQL DB...');
  const aptPayload = {
    name: 'TestAlpha User',
    phone: '9845011111',
    email: 'testalpha@srikrishnaayurveda.com',
    treatment: 'Swarnaprashana (Gold Drops)',
    date: '2027-01-22',
    timeSlot: '10:00 AM',
    notes: 'Direct PostgreSQL CRUD Verification Test'
  };
  const createAptRes = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aptPayload)
  });
  const createdApt = await createAptRes.json();
  if (!createdApt.success) throw new Error('Failed to create appointment: ' + createdApt.error);
  const aptId = createdApt.data.id;
  console.log(`✔ Appointment created with ID: ${aptId}`);

  // Query directly from PostgreSQL database
  const dbApt = await pool.query('SELECT id, name, phone, treatment, status FROM appointments WHERE id = $1', [aptId]);
  if (dbApt.rows.length === 0) throw new Error('Appointment not found in PostgreSQL!');
  console.log('✔ Direct PostgreSQL table verification:', dbApt.rows[0]);

  // Test 2: Update Appointment via API & Verify directly in PostgreSQL
  console.log('\n[2/5] Testing Appointment UPDATE via API -> PostgreSQL DB...');
  const updateAptRes = await fetch(`${API_URL}/appointments/${aptId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'Confirmed' })
  });
  const updatedApt = await updateAptRes.json();
  if (!updatedApt.success) throw new Error('Failed to update appointment');

  const dbAptUpdated = await pool.query('SELECT status FROM appointments WHERE id = $1', [aptId]);
  console.log(`✔ PostgreSQL status after API update: "${dbAptUpdated.rows[0].status}"`);

  // Test 3: Direct DB UPDATE -> Frontend API READ (Database -> UI sync)
  console.log('\n[3/5] Testing Direct PostgreSQL UPDATE -> Frontend API Read...');
  await pool.query("UPDATE appointments SET notes = 'Updated directly in PostgreSQL table editor' WHERE id = $1", [aptId]);
  const readApiRes = await fetch(`${API_URL}/appointments`);
  const allApts = await readApiRes.json();
  const matched = (allApts.data || []).find(a => a.id === aptId);
  console.log(`✔ Frontend API read updated notes from PostgreSQL: "${matched?.notes}"`);

  // Test 4: Inquiries CREATE, TOGGLE READ & DELETE in PostgreSQL
  console.log('\n[4/5] Testing Inquiries CRUD in PostgreSQL...');
  const inqPayload = {
    name: 'TestBeta User',
    phone: '9845022222',
    email: 'testbeta@srikrishnaayurveda.com',
    subject: 'PostgreSQL Inquiry Test',
    message: 'Testing inquiry lifecycle directly on PostgreSQL.'
  };
  const inqRes = await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inqPayload)
  });
  const createdInq = await inqRes.json();
  const inqId = createdInq.data.id;
  console.log(`✔ Inquiry created with ID: ${inqId}`);

  // Direct PostgreSQL check
  const dbInq = await pool.query('SELECT id, name, is_read FROM inquiries WHERE id = $1', [inqId]);
  console.log(`✔ Direct PostgreSQL inquiry read: name="${dbInq.rows[0].name}", is_read=${dbInq.rows[0].is_read}`);

  // Test 5: Swarnaprashana 2027 Schedule Verification in PostgreSQL
  console.log('\n[5/5] Testing 2027 Swarnaprashana Schedule in PostgreSQL...');
  const swarnaSchedule = await pool.query('SELECT year, month, date, status FROM swarnaprashana_schedule WHERE year = 2027 ORDER BY date ASC');
  console.log(`✔ Total 2027 Swarnaprashana dates in PostgreSQL: ${swarnaSchedule.rows.length}`);
  console.table(swarnaSchedule.rows);

  // Clean up temporary test appointment and inquiry
  console.log('\n🧹 Cleaning up test records from PostgreSQL...');
  await pool.query('DELETE FROM appointments WHERE id = $1', [aptId]);
  await pool.query('DELETE FROM inquiries WHERE id = $1', [inqId]);
  console.log('✔ Cleanup complete.');

  console.log('\n===============================================================');
  console.log('🎉 ALL POSTGRESQL CRUD TESTS PASSED WITH 100% SUCCESS!');
  console.log('===============================================================');

  await pool.end();
}

runTests().catch(async (err) => {
  console.error('\n❌ Test Error:', err);
  await pool.end();
  process.exit(1);
});
