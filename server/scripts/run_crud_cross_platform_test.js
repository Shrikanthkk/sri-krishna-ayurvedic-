import pg from 'pg';

const LOCAL_URL = 'http://127.0.0.1:5002';
const VERCEL_URL = 'https://sk-ayurvedic-clinic.vercel.app';

const BROWSER_HEADERS = {
  chrome: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Content-Type': 'application/json'
  },
  edge: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Content-Type': 'application/json'
  },
  firefox: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.5',
    'Content-Type': 'application/json'
  }
};

const client = new pg.Client({
  connectionString: 'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-1-ap-south-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

const results = [];

function logStep(stepNumber, title, passed, details) {
  const icon = passed ? '✅' : '❌';
  console.log(`\n${icon} [Step ${stepNumber}] ${title}`);
  if (details) console.log(`   Details:`, details);
  results.push({ stepNumber, title, passed, details });
}

async function runTests() {
  console.log('================================================================');
  console.log('🚀 SRI KRISHNA AYURVEDIC CLINIC - END-TO-END CRUD & CROSS-PLATFORM TEST');
  console.log(`   • Testing Names: "TestAlpha User" & "TestBeta User"`);
  console.log(`   • Local API: ${LOCAL_URL}`);
  console.log(`   • Vercel API: ${VERCEL_URL}`);
  console.log(`   • PostgreSQL Database: 168.119.64.101:5432/krish966`);
  console.log(`   • Browsers Simulated: Chrome, Microsoft Edge, Mozilla Firefox`);
  console.log('================================================================\n');

  await client.connect();

  // Clean any old test records for TestAlpha and TestBeta to start clean
  await client.query(`DELETE FROM appointments WHERE name IN ('TestAlpha User', 'TestBeta User', 'TestAlpha User - Temp')`);
  await client.query(`DELETE FROM inquiries WHERE name IN ('TestAlpha User', 'TestBeta User', 'TestBeta User - Temp')`);

  // --------------------------------------------------------------------------
  // STEP 1: AUTHENTICATION ACROSS BROWSERS & PLATFORMS
  // --------------------------------------------------------------------------
  let localAdminToken = '';
  let vercelAdminToken = '';

  try {
    const resLocal = await fetch(`${LOCAL_URL}/api/auth/login`, {
      method: 'POST',
      headers: BROWSER_HEADERS.chrome,
      body: JSON.stringify({ email: 'admin@srikrishnaayurveda.com', password: '1234' })
    });
    const dataLocal = await resLocal.json();
    localAdminToken = dataLocal.token;
    logStep(1, 'Admin Login on LOCAL via Chrome Headers', dataLocal.success && !!localAdminToken, {
      user: dataLocal.user?.name,
      tokenLength: localAdminToken?.length
    });
  } catch (err) {
    logStep(1, 'Admin Login on LOCAL via Chrome Headers', false, err.message);
  }

  try {
    const resVercel = await fetch(`${VERCEL_URL}/api/auth/login`, {
      method: 'POST',
      headers: BROWSER_HEADERS.edge,
      body: JSON.stringify({ email: 'admin@srikrishnaayurveda.com', password: '1234' })
    });
    const dataVercel = await resVercel.json();
    vercelAdminToken = dataVercel.token;
    logStep(2, 'Admin Login on VERCEL via Edge Headers', dataVercel.success && !!vercelAdminToken, {
      user: dataVercel.user?.name,
      tokenLength: vercelAdminToken?.length
    });
  } catch (err) {
    logStep(2, 'Admin Login on VERCEL via Edge Headers', false, err.message);
  }

  // --------------------------------------------------------------------------
  // STEP 2: APPOINTMENTS CRUD TESTING
  // --------------------------------------------------------------------------
  let alphaAptId = '';
  let betaAptId = '';
  let tempAptId = '';

  // 2.1 CREATE on Local (Chrome) for TestAlpha User
  try {
    const payloadAlpha = {
      name: 'TestAlpha User',
      phone: '+91 98450 11111',
      email: 'testalpha@example.com',
      treatment: 'Swarnaprashana Pediatric Care',
      date: '2027-01-22',
      timeSlot: '10:30 AM',
      notes: 'Booked via Chrome on Local environment'
    };
    const res = await fetch(`${LOCAL_URL}/api/appointments`, {
      method: 'POST',
      headers: BROWSER_HEADERS.chrome,
      body: JSON.stringify(payloadAlpha)
    });
    const data = await res.json();
    alphaAptId = data.data?.id;
    logStep(3, 'CREATE Appointment for "TestAlpha User" on LOCAL (Chrome)', data.success && !!alphaAptId, {
      id: alphaAptId,
      name: data.data?.name,
      status: data.data?.status,
      date: data.data?.date
    });
  } catch (err) {
    logStep(3, 'CREATE Appointment for "TestAlpha User" on LOCAL (Chrome)', false, err.message);
  }

  // 2.2 CREATE on Vercel (Edge) for TestBeta User
  try {
    const payloadBeta = {
      name: 'TestBeta User',
      phone: '+91 98450 22222',
      email: 'testbeta@example.com',
      treatment: 'Nadi Pariksha (Pulse Diagnosis)',
      date: '2027-02-19',
      timeSlot: '11:00 AM',
      notes: 'Booked via Edge on Vercel environment'
    };
    const res = await fetch(`${VERCEL_URL}/api/appointments`, {
      method: 'POST',
      headers: BROWSER_HEADERS.edge,
      body: JSON.stringify(payloadBeta)
    });
    const data = await res.json();
    betaAptId = data.data?.id;
    logStep(4, 'CREATE Appointment for "TestBeta User" on VERCEL (Edge)', data.success && !!betaAptId, {
      id: betaAptId,
      name: data.data?.name,
      status: data.data?.status,
      date: data.data?.date
    });
  } catch (err) {
    logStep(4, 'CREATE Appointment for "TestBeta User" on VERCEL (Edge)', false, err.message);
  }

  // 2.3 READ: Cross-verification on Firefox from both Local & Vercel
  try {
    // Read from Vercel using Firefox
    const resVercel = await fetch(`${VERCEL_URL}/api/appointments`, {
      headers: { ...BROWSER_HEADERS.firefox, Authorization: `Bearer ${vercelAdminToken}` }
    });
    const dataVercel = await resVercel.json();
    const alphaFoundOnVercel = dataVercel.data?.some(a => a.name === 'TestAlpha User');
    const betaFoundOnVercel = dataVercel.data?.some(a => a.name === 'TestBeta User');

    // Read from Local using Firefox
    const resLocal = await fetch(`${LOCAL_URL}/api/appointments`, {
      headers: { ...BROWSER_HEADERS.firefox, Authorization: `Bearer ${localAdminToken}` }
    });
    const dataLocal = await resLocal.json();
    const alphaFoundOnLocal = dataLocal.data?.some(a => a.name === 'TestAlpha User');
    const betaFoundOnLocal = dataLocal.data?.some(a => a.name === 'TestBeta User');

    logStep(5, 'READ Appointments Cross-Platform on FIREFOX', alphaFoundOnVercel && betaFoundOnVercel && alphaFoundOnLocal && betaFoundOnLocal, {
      foundOnVercel: { alpha: alphaFoundOnVercel, beta: betaFoundOnVercel },
      foundOnLocal: { alpha: alphaFoundOnLocal, beta: betaFoundOnLocal }
    });
  } catch (err) {
    logStep(5, 'READ Appointments Cross-Platform on FIREFOX', false, err.message);
  }

  // 2.4 UPDATE: Update TestAlpha User on VERCEL (Status -> Confirmed)
  try {
    const res = await fetch(`${VERCEL_URL}/api/appointments/${alphaAptId}/status`, {
      method: 'PATCH',
      headers: { ...BROWSER_HEADERS.chrome, Authorization: `Bearer ${vercelAdminToken}` },
      body: JSON.stringify({ status: 'Confirmed' })
    });
    const data = await res.json();
    logStep(6, 'UPDATE "TestAlpha User" Status to "Confirmed" via VERCEL (Chrome)', data.success && data.data?.status === 'Confirmed', {
      id: alphaAptId,
      newStatus: data.data?.status
    });
  } catch (err) {
    logStep(6, 'UPDATE "TestAlpha User" Status to "Confirmed" via VERCEL (Chrome)', false, err.message);
  }

  // 2.5 UPDATE: Update TestBeta User on LOCAL (Status -> Completed)
  try {
    const res = await fetch(`${LOCAL_URL}/api/appointments/${betaAptId}/status`, {
      method: 'PATCH',
      headers: { ...BROWSER_HEADERS.edge, Authorization: `Bearer ${localAdminToken}` },
      body: JSON.stringify({ status: 'Completed' })
    });
    const data = await res.json();
    logStep(7, 'UPDATE "TestBeta User" Status to "Completed" via LOCAL (Edge)', data.success && data.data?.status === 'Completed', {
      id: betaAptId,
      newStatus: data.data?.status
    });
  } catch (err) {
    logStep(7, 'UPDATE "TestBeta User" Status to "Completed" via LOCAL (Edge)', false, err.message);
  }

  // 2.6 DELETE Test: Create temporary appointment and delete it
  try {
    // Create temp
    const createRes = await fetch(`${LOCAL_URL}/api/appointments`, {
      method: 'POST',
      headers: BROWSER_HEADERS.chrome,
      body: JSON.stringify({
        name: 'TestAlpha User - Temp',
        phone: '9845199882',
        email: 'temp@test.com',
        treatment: 'Ayurvedic Consultation',
        date: '2027-03-18',
        timeSlot: '02:00 PM',
        notes: 'Temporary record to test DELETE operation'
      })
    });
    const createData = await createRes.json();
    tempAptId = createData.data?.id;

    // Delete temp on Vercel
    const delRes = await fetch(`${VERCEL_URL}/api/appointments/${tempAptId}`, {
      method: 'DELETE',
      headers: { ...BROWSER_HEADERS.edge, Authorization: `Bearer ${vercelAdminToken}` }
    });
    const delData = await delRes.json();

    // Verify it doesn't exist in DB
    const checkDb = await client.query('SELECT id FROM appointments WHERE id = $1', [tempAptId]);
    const deletedProperly = delData.success && checkDb.rows.length === 0;

    logStep(8, 'DELETE Appointment Test (Created on Local, Deleted on Vercel)', deletedProperly, {
      tempAptId,
      deletedFromDb: checkDb.rows.length === 0
    });
  } catch (err) {
    logStep(8, 'DELETE Appointment Test', false, err.message);
  }

  // --------------------------------------------------------------------------
  // STEP 3: INQUIRIES CRUD TESTING
  // --------------------------------------------------------------------------
  let alphaInqId = '';
  let betaInqId = '';
  let tempInqId = '';

  // 3.1 CREATE Inquiry via Local (Chrome) for TestAlpha User
  try {
    const res = await fetch(`${LOCAL_URL}/api/inquiries`, {
      method: 'POST',
      headers: BROWSER_HEADERS.chrome,
      body: JSON.stringify({
        name: 'TestAlpha User',
        phone: '+91 98450 11111',
        email: 'testalpha@example.com',
        subject: '2027 Pushya Nakshatra Batch Inquiry',
        message: 'Interested in booking pediatric Swarnaprashana for 22 January 2027.'
      })
    });
    const data = await res.json();
    alphaInqId = data.data?.id;
    logStep(9, 'CREATE Inquiry for "TestAlpha User" on LOCAL (Chrome)', data.success && !!alphaInqId, {
      id: alphaInqId,
      name: data.data?.name,
      subject: data.data?.subject
    });
  } catch (err) {
    logStep(9, 'CREATE Inquiry for "TestAlpha User" on LOCAL (Chrome)', false, err.message);
  }

  // 3.2 CREATE Inquiry via Vercel (Edge) for TestBeta User
  try {
    const res = await fetch(`${VERCEL_URL}/api/inquiries`, {
      method: 'POST',
      headers: BROWSER_HEADERS.edge,
      body: JSON.stringify({
        name: 'TestBeta User',
        phone: '+91 98450 22222',
        email: 'testbeta@example.com',
        subject: 'Ayurvedic Pulse Diagnosis (Nadi Pariksha)',
        message: 'Requesting consultation slot with Dr. Anand Krishna.'
      })
    });
    const data = await res.json();
    betaInqId = data.data?.id;
    logStep(10, 'CREATE Inquiry for "TestBeta User" on VERCEL (Edge)', data.success && !!betaInqId, {
      id: betaInqId,
      name: data.data?.name,
      subject: data.data?.subject
    });
  } catch (err) {
    logStep(10, 'CREATE Inquiry for "TestBeta User" on VERCEL (Edge)', false, err.message);
  }

  // 3.3 READ Inquiries Cross-Platform
  try {
    const res = await fetch(`${VERCEL_URL}/api/inquiries`, {
      headers: { ...BROWSER_HEADERS.firefox, Authorization: `Bearer ${vercelAdminToken}` }
    });
    const data = await res.json();
    const hasAlpha = data.data?.some(i => i.name === 'TestAlpha User');
    const hasBeta = data.data?.some(i => i.name === 'TestBeta User');
    logStep(11, 'READ Inquiries Cross-Platform on FIREFOX via VERCEL', hasAlpha && hasBeta, {
      alphaInquiryFound: hasAlpha,
      betaInquiryFound: hasBeta
    });
  } catch (err) {
    logStep(11, 'READ Inquiries Cross-Platform on FIREFOX via VERCEL', false, err.message);
  }

  // 3.4 UPDATE Inquiry (Mark TestAlpha User inquiry as Read) via Vercel
  try {
    const res = await fetch(`${VERCEL_URL}/api/inquiries/${alphaInqId}/read`, {
      method: 'PATCH',
      headers: { ...BROWSER_HEADERS.chrome, Authorization: `Bearer ${vercelAdminToken}` }
    });
    const data = await res.json();
    logStep(12, 'UPDATE "TestAlpha User" Inquiry to is_read:true on VERCEL', data.success && data.data?.is_read === true, {
      id: alphaInqId,
      is_read: data.data?.is_read
    });
  } catch (err) {
    logStep(12, 'UPDATE "TestAlpha User" Inquiry to is_read:true on VERCEL', false, err.message);
  }

  // 3.5 DELETE Inquiry Test
  try {
    const createRes = await fetch(`${LOCAL_URL}/api/inquiries`, {
      method: 'POST',
      headers: BROWSER_HEADERS.chrome,
      body: JSON.stringify({
        name: 'TestBeta User - Temp',
        phone: '9845399884',
        email: 'tempinq@test.com',
        subject: 'Temp Question',
        message: 'This will be deleted to test inquiry removal.'
      })
    });
    const createData = await createRes.json();
    tempInqId = createData.data?.id;

    const delRes = await fetch(`${LOCAL_URL}/api/inquiries/${tempInqId}`, {
      method: 'DELETE',
      headers: { ...BROWSER_HEADERS.firefox, Authorization: `Bearer ${localAdminToken}` }
    });
    const delData = await delRes.json();
    const checkDb = await client.query('SELECT id FROM inquiries WHERE id = $1', [tempInqId]);
    const deletedProperly = delData.success && checkDb.rows.length === 0;

    logStep(13, 'DELETE Inquiry Test (Created on Local, Deleted on Local via Firefox)', deletedProperly, {
      tempInqId,
      deletedFromDb: checkDb.rows.length === 0
    });
  } catch (err) {
    logStep(13, 'DELETE Inquiry Test', false, err.message);
  }

  // --------------------------------------------------------------------------
  // STEP 4: SWARNAPRASHANA 2027 SCHEDULE CRUD
  // --------------------------------------------------------------------------
  try {
    const resLocal = await fetch(`${LOCAL_URL}/api/swarnaprashana`);
    const dataLocal = await resLocal.json();

    const resVercel = await fetch(`${VERCEL_URL}/api/swarnaprashana`);
    const dataVercel = await resVercel.json();

    const all2027Local = dataLocal.data?.every(d => d.year === 2027) && dataLocal.data?.length === 13;
    const all2027Vercel = dataVercel.data?.every(d => d.year === 2027) && dataVercel.data?.length === 13;

    logStep(14, 'READ Swarnaprashana Schedule: Exclusively 2027 (13 dates)', all2027Local && all2027Vercel, {
      localCount: dataLocal.data?.length,
      vercelCount: dataVercel.data?.length,
      localYears: [...new Set(dataLocal.data?.map(d => d.year))],
      vercelYears: [...new Set(dataVercel.data?.map(d => d.year))]
    });
  } catch (err) {
    logStep(14, 'READ Swarnaprashana Schedule: Exclusively 2027 (13 dates)', false, err.message);
  }

  // --------------------------------------------------------------------------
  // STEP 5: FINAL DIRECT POSTGRESQL VERIFICATION
  // --------------------------------------------------------------------------
  console.log('\n================================================================');
  console.log('📊 LIVE POSTGRESQL DATABASE STATE FOR MANUAL INSPECTION');
  console.log('================================================================');

  const aptDb = await client.query(`
    SELECT id, name, phone, treatment, status, date, time_slot, notes
    FROM appointments 
    WHERE name IN ('TestAlpha User', 'TestBeta User')
    ORDER BY name ASC
  `);
  console.log('\n📋 APPOINTMENTS STORED IN POSTGRESQL:');
  console.table(aptDb.rows);

  const inqDb = await client.query(`
    SELECT id, name, phone, email, subject, is_read, message
    FROM inquiries 
    WHERE name IN ('TestAlpha User', 'TestBeta User')
    ORDER BY name ASC
  `);
  console.log('\n✉️ INQUIRIES STORED IN POSTGRESQL:');
  console.table(inqDb.rows);

  const swarnaDb = await client.query(`
    SELECT id, month, date, year, full_date, status, display_order
    FROM swarnaprashana_schedule
    ORDER BY display_order ASC
  `);
  console.log('\n🌿 2027 SWARNAPRASHANA DATES STORED IN POSTGRESQL:');
  console.table(swarnaDb.rows);

  await client.end();

  console.log('\n================================================================');
  const allPassed = results.every(r => r.passed);
  console.log(`🏁 TEST SUMMARY: ${results.filter(r => r.passed).length} / ${results.length} PASSED`);
  if (allPassed) {
    console.log('🎉 ALL CRUD OPERATIONS COMPLETED SMOOTHLY ACROSS LOCAL & VERCEL!');
  } else {
    console.log('⚠️ Some tests failed. Inspect the logs above.');
  }
  console.log('================================================================\n');
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
