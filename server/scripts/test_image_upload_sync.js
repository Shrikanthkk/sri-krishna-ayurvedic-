import pg from 'pg';

const { Pool } = pg;
const POSTGRES_URL = 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966';
const API_URL = 'http://localhost:5173/api';

const pool = new Pool({
  connectionString: POSTGRES_URL,
  ssl: false
});

async function runImageUploadTest() {
  console.log('========================================================================');
  console.log('🖼️ TESTING BACKEND IMAGE UPLOAD & POSTGRESQL DATABASE PERSISTENCE');
  console.log('========================================================================');

  // STEP 1: Upload a simulated treatment image to backend
  console.log('\n[1/4] Uploading treatment image to backend /api/treatments/upload...');
  const fakeImageBytes = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWPjfDwAEeQHzk4Wl4AAAAABJRU5ErkJggg==',
    'base64'
  );
  const blob = new Blob([fakeImageBytes], { type: 'image/png' });
  const formData = new FormData();
  formData.append('image', blob, 'ayurveda_herbal_treatment.png');

  const uploadRes = await fetch(`${API_URL}/treatments/upload`, {
    method: 'POST',
    body: formData
  });
  const uploadData = await uploadRes.json();
  if (!uploadData.success || !uploadData.url) {
    throw new Error('Image upload failed: ' + JSON.stringify(uploadData));
  }
  console.log('✔ Image successfully uploaded to backend! Returned URL prefix:', uploadData.url.substring(0, 40) + '...');

  // STEP 2: Save treatment with uploaded image into PostgreSQL database
  console.log('\n[2/4] Saving treatment with uploaded image to PostgreSQL database...');
  const testTreatmentId = 'treatment-img-test-' + Date.now();
  const treatmentPayload = {
    id: testTreatmentId,
    number: '99',
    title: 'Herbal Abhyanga & Shirodhara Therapy',
    subtitle: 'Nervous Rejuvenation & Detox',
    description: 'Authentic warm botanical oil pour with synchronized Marma therapy.',
    benefits: ['Deep nervous calming', 'Restores sleep cycles', 'Relieves tension'],
    duration: '60 Mins',
    image: uploadData.url
  };

  const saveRes = await fetch(`${API_URL}/treatments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(treatmentPayload)
  });
  const saveData = await saveRes.json();
  if (!saveData.success) {
    throw new Error('Save treatment failed: ' + JSON.stringify(saveData));
  }
  console.log('✔ Treatment saved via API:', saveData.data?.id);

  // STEP 3: Verify the image is stored directly inside the PostgreSQL database
  console.log('\n[3/4] Verifying image directly in PostgreSQL database table "treatments"...');
  const dbCheck = await pool.query('SELECT id, title, image, is_active FROM treatments WHERE id = $1', [testTreatmentId]);
  if (dbCheck.rows.length === 0) {
    throw new Error('Treatment not found in PostgreSQL!');
  }
  const dbRow = dbCheck.rows[0];
  console.log('✔ Treatment confirmed in PostgreSQL:');
  console.log(`   - ID: ${dbRow.id}`);
  console.log(`   - Title: ${dbRow.title}`);
  console.log(`   - Image present in DB: ${Boolean(dbRow.image)}`);
  console.log(`   - Image prefix in DB: ${dbRow.image.substring(0, 40)}...`);

  // STEP 4: Verify frontend API read returns the updated treatment with image
  console.log('\n[4/4] Verifying frontend API read /api/treatments returns updated treatment...');
  const readRes = await fetch(`${API_URL}/treatments`);
  const readData = await readRes.json();
  const found = (readData.data || []).find(t => t.id === testTreatmentId);
  if (!found || !found.image) {
    throw new Error('Treatment with image not returned by frontend API!');
  }
  console.log('✔ Frontend API successfully returned treatment with image:');
  console.log(`   - Found: "${found.title}"`);
  console.log(`   - Image matching: ${found.image === uploadData.url}`);

  // Clean up test treatment
  await pool.query('DELETE FROM treatments WHERE id = $1', [testTreatmentId]);
  console.log('✔ Cleaned up temporary test treatment from PostgreSQL.');

  console.log('\n========================================================================');
  console.log('🎉 100% SUCCESS: BACKEND IMAGE UPLOAD & DATABASE SYNC VERIFIED!');
  console.log('========================================================================');

  await pool.end();
}

runImageUploadTest().catch(async (err) => {
  console.error('\n❌ Image Upload Test Failed:', err);
  await pool.end();
  process.exit(1);
});
