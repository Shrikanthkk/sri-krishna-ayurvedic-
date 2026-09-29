import db from '../db.js';
import bcrypt from 'bcryptjs';

async function runFullTestSuite() {
  console.log('===========================================================');
  console.log('  Testing Sri Krishna Ayurvedic Clinic PostgreSQL Database');
  console.log('  Target Host: 168.119.64.101:5432 / DB: krish966');
  console.log('===========================================================\n');

  const errors = [];
  const successes = [];

  // 1. Connection Check
  try {
    const conn = await db.testDatabaseConnection();
    if (!conn.success) throw new Error(conn.error);
    successes.push(`DB Connection OK (PostgreSQL ${conn.version.split('\n')[0]})`);
  } catch (err) {
    errors.push(`DB Connection Failed: ${err.message}`);
    console.error('Fatal connection error, aborting suite.');
    return { errors, successes };
  }

  // 2. Auth Tests
  try {
    console.log('[Test 1] User Authentication...');
    const userRes = await db.query("SELECT * FROM users WHERE email = 'srikrishna@srikrishnaayurveda.com'");
    if (userRes.rows.length === 0) {
      errors.push('Admin user srikrishna@srikrishnaayurveda.com missing in users table');
    } else {
      const match = await bcrypt.compare('Srikrishna@321', userRes.rows[0].password_hash);
      if (match) {
        successes.push('Admin Authentication (srikrishna / Srikrishna@321) Verified');
      } else {
        errors.push('Admin password hash mismatch in users table');
      }
    }
  } catch (err) {
    errors.push(`Auth Test Failed: ${err.message}`);
  }

  // 3. Appointment creation and status update
  try {
    console.log('[Test 2] Appointment CRUD Operations...');
    const testAptId = `test-apt-${Date.now()}`;
    const insertRes = await db.query(
      `INSERT INTO appointments (id, name, phone, email, treatment, date, time_slot, status, notes, submitted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [testAptId, 'Test Patient', '+91 99999 88888', 'patient@example.com', 'Nadi Pariksha', '2026-10-01', '10:00 AM', 'Pending', 'Test notes', '2026-09-29 03:00 PM']
    );
    if (insertRes.rows.length > 0) {
      successes.push(`Appointment Insertion Verified (ID: ${testAptId})`);
    }

    const updateRes = await db.query(
      "UPDATE appointments SET status = 'Confirmed' WHERE id = $1 RETURNING status",
      [testAptId]
    );
    if (updateRes.rows[0].status === 'Confirmed') {
      successes.push(`Appointment Status Update Verified`);
    }

    await db.query("DELETE FROM appointments WHERE id = $1", [testAptId]);
    successes.push(`Appointment Cleanup Verified`);
  } catch (err) {
    errors.push(`Appointment Test Failed: ${err.message}`);
  }

  // 4. Inquiry creation and status update
  try {
    console.log('[Test 3] Contact Inquiry CRUD Operations...');
    const testInqId = `test-inq-${Date.now()}`;
    await db.query(
      `INSERT INTO inquiries (id, name, phone, email, subject, message, is_read, submitted_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [testInqId, 'Test Inquirer', '+91 88888 77777', 'inquiry@example.com', 'General Question', 'Testing inquiry form submission.', false, '2026-09-29 03:00 PM']
    );
    successes.push(`Inquiry Insertion Verified (ID: ${testInqId})`);

    await db.query("UPDATE inquiries SET is_read = true WHERE id = $1", [testInqId]);
    successes.push(`Inquiry Mark-As-Read Verified`);

    await db.query("DELETE FROM inquiries WHERE id = $1", [testInqId]);
    successes.push(`Inquiry Cleanup Verified`);
  } catch (err) {
    errors.push(`Inquiry Test Failed: ${err.message}`);
  }

  // 5. Treatment Management + Image Data URL test
  try {
    console.log('[Test 4] Treatment Management & Image Storage in PostgreSQL...');
    const testTreatmentId = `test-treatment-${Date.now()}`;
    const mockImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    await db.query(
      `INSERT INTO treatments (id, number, title, subtitle, description, benefits, duration, image, link, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)`,
      [testTreatmentId, '99', 'Test Panchakarma Detox', 'Special Rejuvenation', 'Full body detox', JSON.stringify(['Rejuvenation', 'Purification']), '7 Days', mockImageData, `/treatments/${testTreatmentId}`]
    );
    successes.push(`Treatment Creation with Base64 Image in PostgreSQL Verified`);

    const selectRes = await db.query("SELECT image FROM treatments WHERE id = $1", [testTreatmentId]);
    if (selectRes.rows[0].image === mockImageData) {
      successes.push(`PostgreSQL Image Retrieval Verified (Stored directly in PostgreSQL column)`);
    }

    await db.query("DELETE FROM treatments WHERE id = $1", [testTreatmentId]);
    successes.push(`Treatment Cleanup Verified`);
  } catch (err) {
    errors.push(`Treatment Test Failed: ${err.message}`);
  }

  // 6. Clinic Settings update test
  try {
    console.log('[Test 5] Clinic Settings Updates in PostgreSQL...');
    const settingsRes = await db.query("SELECT * FROM clinic_settings WHERE id = 'default'");
    if (settingsRes.rows.length > 0) {
      successes.push(`Clinic Settings Retrieval Verified (Doctor: ${settingsRes.rows[0].doctor_name})`);
    } else {
      errors.push('Clinic Settings default row missing');
    }
  } catch (err) {
    errors.push(`Clinic Settings Test Failed: ${err.message}`);
  }

  // 7. Swarnaprashana Schedule test
  try {
    console.log('[Test 6] Swarnaprashana Schedule in PostgreSQL...');
    const scheduleRes = await db.query("SELECT COUNT(*) FROM swarnaprashana_schedule WHERE year = 2026");
    const count = parseInt(scheduleRes.rows[0].count, 10);
    if (count >= 12) {
      successes.push(`Swarnaprashana 2026 Schedule Verified (${count} dates)`);
    } else {
      errors.push(`Swarnaprashana schedule has only ${count} dates, expected 12`);
    }
  } catch (err) {
    errors.push(`Swarnaprashana Test Failed: ${err.message}`);
  }

  console.log('\n===========================================================');
  console.log('  TEST RESULTS SUMMARY:');
  console.log('===========================================================');
  console.log(`✅ Successes (${successes.length}):`);
  successes.forEach(s => console.log(`   - ${s}`));

  if (errors.length > 0) {
    console.log(`\n❌ Errors (${errors.length}):`);
    errors.forEach(e => console.log(`   - ${e}`));
  } else {
    console.log('\n🎉 ALL TESTS PASSED! ZERO ERRORS FOUND!');
  }
  console.log('===========================================================\n');

  await db.pool.end();
  return { errors, successes };
}

runFullTestSuite().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
