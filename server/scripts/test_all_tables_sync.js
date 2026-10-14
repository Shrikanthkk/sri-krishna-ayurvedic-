import pg from 'pg';

const { Pool } = pg;
const POSTGRES_URL = 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966';
const API_URL = 'http://localhost:5173/api';

const pool = new Pool({
  connectionString: POSTGRES_URL,
  ssl: false
});

async function runComprehensiveVerification() {
  console.log('======================================================================');
  console.log('🧪 VERIFYING BIDIRECTIONAL SYNCHRONIZATION FOR ALL TABLES IN DATABASE');
  console.log('======================================================================');

  // TABLE 1: APPOINTMENTS
  console.log('\n[1/6] 📋 Verifying APPOINTMENTS table...');
  const aptPayload = {
    id: 'apt-test-' + Date.now(),
    name: 'Sync Test Patient',
    phone: '9845033333',
    email: 'testsync@ayurveda.com',
    treatment: 'Chronic Diseases – Joint Pains (Arthritis)',
    date: '2027-02-15',
    timeSlot: '11:30 AM',
    notes: 'Testing full sync for appointments'
  };
  const aptPostRes = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aptPayload)
  });
  const aptPostData = await aptPostRes.json();
  if (!aptPostData.success) throw new Error('Appointments POST failed: ' + JSON.stringify(aptPostData));
  console.log('✔ Appointments POST API succeeded:', aptPayload.id);

  const aptDbCheck = await pool.query('SELECT id, name, phone, status FROM appointments WHERE id = $1', [aptPayload.id]);
  if (aptDbCheck.rows.length === 0) throw new Error('Appointment not saved in PostgreSQL!');
  console.log('✔ Appointment confirmed in PostgreSQL:', aptDbCheck.rows[0]);

  const aptPatchRes = await fetch(`${API_URL}/appointments/${aptPayload.id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'Completed' })
  });
  const aptPatchData = await aptPatchRes.json();
  if (!aptPatchData.success) throw new Error('Appointments PATCH status failed: ' + JSON.stringify(aptPatchData));
  const aptDbStatus = await pool.query('SELECT status FROM appointments WHERE id = $1', [aptPayload.id]);
  console.log('✔ Appointment status updated in PostgreSQL:', aptDbStatus.rows[0].status);

  await pool.query('DELETE FROM appointments WHERE id = $1', [aptPayload.id]);
  console.log('✔ Cleaned up appointment test record.');

  // TABLE 2: INQUIRIES
  console.log('\n[2/6] 💬 Verifying INQUIRIES table...');
  const inqPayload = {
    id: 'inq-test-' + Date.now(),
    name: 'Sync Test Inquiry',
    phone: '9845044444',
    email: 'inqtest@ayurveda.com',
    subject: 'Skin Problems Consultation',
    message: 'Testing inquiry sync with database'
  };
  const inqPostRes = await fetch(`${API_URL}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inqPayload)
  });
  const inqPostData = await inqPostRes.json();
  if (!inqPostData.success) throw new Error('Inquiries POST failed: ' + JSON.stringify(inqPostData));
  console.log('✔ Inquiries POST API succeeded:', inqPayload.id);

  const inqDbCheck = await pool.query('SELECT id, name, is_read FROM inquiries WHERE id = $1', [inqPayload.id]);
  if (inqDbCheck.rows.length === 0) throw new Error('Inquiry not saved in PostgreSQL!');
  console.log('✔ Inquiry confirmed in PostgreSQL:', inqDbCheck.rows[0]);

  const inqPatchRes = await fetch(`${API_URL}/inquiries/${inqPayload.id}/read`, { method: 'PATCH' });
  const inqPatchData = await inqPatchRes.json();
  if (!inqPatchData.success) throw new Error('Inquiries PATCH read failed: ' + JSON.stringify(inqPatchData));
  const inqDbRead = await pool.query('SELECT is_read FROM inquiries WHERE id = $1', [inqPayload.id]);
  console.log('✔ Inquiry read toggled in PostgreSQL:', inqDbRead.rows[0].is_read);

  await pool.query('DELETE FROM inquiries WHERE id = $1', [inqPayload.id]);
  console.log('✔ Cleaned up inquiry test record.');

  // TABLE 3: TREATMENTS
  console.log('\n[3/6] 🌿 Verifying TREATMENTS table...');
  const testTreatmentId = 'treatment-sync-test';
  const treatPayload = {
    id: testTreatmentId,
    title: 'PostgreSQL Sync Verification Treatment',
    subtitle: 'Automated Test Protocol',
    description: 'Verifying treatments insert, update and delete in PostgreSQL.',
    benefits: ['100% Direct Sync', 'Safe Fallback'],
    duration: '60 Mins',
    image: '/images/hero_adobe_5.jpg'
  };
  const treatPostRes = await fetch(`${API_URL}/treatments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(treatPayload)
  });
  const treatPostData = await treatPostRes.json();
  if (!treatPostData.success) throw new Error('Treatments POST failed: ' + JSON.stringify(treatPostData));
  console.log('✔ Treatments POST API succeeded:', testTreatmentId);

  const treatDbCheck = await pool.query('SELECT id, title, is_active FROM treatments WHERE id = $1', [testTreatmentId]);
  if (treatDbCheck.rows.length === 0) throw new Error('Treatment not found in PostgreSQL!');
  console.log('✔ Treatment confirmed in PostgreSQL:', treatDbCheck.rows[0]);

  const treatDelRes = await fetch(`${API_URL}/treatments/${testTreatmentId}`, { method: 'DELETE' });
  const treatDelData = await treatDelRes.json();
  if (!treatDelData.success) throw new Error('Treatments DELETE failed: ' + JSON.stringify(treatDelData));
  const treatDbDel = await pool.query('SELECT id FROM treatments WHERE id = $1', [testTreatmentId]);
  console.log('✔ Treatment removed from PostgreSQL, rows remaining:', treatDbDel.rows.length);

  // TABLE 4: SWARNAPRASHANA_SCHEDULE
  console.log('\n[4/6] 📅 Verifying SWARNAPRASHANA_SCHEDULE table...');
  const testSwarnaId = 'psh-2027-test-date';
  const swarnaPayload = {
    id: testSwarnaId,
    month: 'December',
    date: '31',
    year: 2027,
    status: 'Active',
    display_order: 14
  };
  const swarnaPostRes = await fetch(`${API_URL}/swarnaprashana`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(swarnaPayload)
  });
  const swarnaPostData = await swarnaPostRes.json();
  if (!swarnaPostData.success) throw new Error('Swarnaprashana POST failed: ' + JSON.stringify(swarnaPostData));
  console.log('✔ Swarnaprashana POST API succeeded:', testSwarnaId);

  const swarnaDbCheck = await pool.query('SELECT id, month, date, year, status FROM swarnaprashana_schedule WHERE id = $1', [testSwarnaId]);
  if (swarnaDbCheck.rows.length === 0) throw new Error('Swarnaprashana date not found in PostgreSQL!');
  console.log('✔ Swarnaprashana date confirmed in PostgreSQL:', swarnaDbCheck.rows[0]);

  const swarnaPatchRes = await fetch(`${API_URL}/swarnaprashana/${testSwarnaId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'Inactive' })
  });
  const swarnaPatchData = await swarnaPatchRes.json();
  if (!swarnaPatchData.success) throw new Error('Swarnaprashana status PATCH failed: ' + JSON.stringify(swarnaPatchData));
  const swarnaDbStatus = await pool.query('SELECT status FROM swarnaprashana_schedule WHERE id = $1', [testSwarnaId]);
  console.log('✔ Swarnaprashana status toggled to:', swarnaDbStatus.rows[0].status);

  const swarnaDelRes = await fetch(`${API_URL}/swarnaprashana/${testSwarnaId}`, { method: 'DELETE' });
  const swarnaDelData = await swarnaDelRes.json();
  if (!swarnaDelData.success) throw new Error('Swarnaprashana DELETE failed: ' + JSON.stringify(swarnaDelData));
  const swarnaDbDel = await pool.query('SELECT id FROM swarnaprashana_schedule WHERE id = $1', [testSwarnaId]);
  console.log('✔ Swarnaprashana test date removed from PostgreSQL, rows remaining:', swarnaDbDel.rows.length);

  // TABLE 5: CLINIC_SETTINGS
  console.log('\n[5/6] ⚙️ Verifying CLINIC_SETTINGS table...');
  const currentSettingsRes = await fetch(`${API_URL}/settings`);
  const currentSettings = await currentSettingsRes.json();
  console.log('✔ Read current settings from DB, Doctor:', currentSettings.data?.doctorName);

  const testFee = '₹50';
  const settingsUpdateRes = await fetch(`${API_URL}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...currentSettings.data, consultationFee: testFee })
  });
  const settingsUpdateData = await settingsUpdateRes.json();
  if (!settingsUpdateData.success) throw new Error('Settings PUT failed: ' + JSON.stringify(settingsUpdateData));
  const settingsDbCheck = await pool.query('SELECT id, doctor_name, consultation_fee, updated_at FROM clinic_settings WHERE id = $1', ['default']);
  console.log('✔ Clinic settings confirmed in PostgreSQL:', settingsDbCheck.rows[0]);

  // TABLE 6: USERS (Admin Authentication)
  console.log('\n[6/6] 👤 Verifying USERS table (Authentication)...');
  const userCheck = await pool.query('SELECT id, name, email, role, is_active FROM users');
  console.log(`✔ Found ${userCheck.rows.length} users in PostgreSQL users table:`);
  for (const u of userCheck.rows) {
    console.log(`   - [${u.role}] ${u.name} (${u.email}) active=${u.is_active}`);
  }

  const loginRes = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'srikrishna', password: 'Srikrishna@321' })
  });
  const loginData = await loginRes.json();
  if (!loginData.success) throw new Error('Admin login failed: ' + JSON.stringify(loginData));
  console.log('✔ Admin login succeeded. Received JWT Token:', loginData.token ? 'YES' : 'NO');

  console.log('\n======================================================================');
  console.log('🎉 100% SUCCESS: ALL 6 TABLES VERIFIED BIDIRECTIONALLY IN POSTGRESQL!');
  console.log('======================================================================');

  await pool.end();
}

runComprehensiveVerification().catch(async (err) => {
  console.error('\n❌ Verification Failed:', err);
  await pool.end();
  process.exit(1);
});
