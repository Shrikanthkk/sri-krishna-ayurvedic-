async function test() {
  const loginRes = await fetch('https://sri-krishna-ayurvedic-clinic-livid.vercel.app/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@srikrishnaayurveda.com', password: '1234' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token;
  console.log('Got token:', token ? 'YES' : 'NO');

  const boundary = '----WebKitFormBoundaryXYZ' + Date.now();
  const dummyPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  
  const header = Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="image"; filename="sample.png"\r\nContent-Type: image/png\r\n\r\n`);
  const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
  const body = Buffer.concat([header, dummyPng, footer]);

  const uploadRes = await fetch('https://sri-krishna-ayurvedic-clinic-livid.vercel.app/api/treatments/upload', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': `multipart/form-data; boundary=${boundary}`
    },
    body: body
  });

  const uploadData = await uploadRes.json();
  console.log('Upload Result:', uploadData);
}

test().catch(console.error);
