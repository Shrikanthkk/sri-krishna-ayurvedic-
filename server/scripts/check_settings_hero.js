import pg from 'pg';
const pool = new pg.Pool({ connectionString: 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966' });
async function check() {
  const res = await pool.query("SELECT id, doctor_name, hero_slider FROM clinic_settings WHERE id = 'default'");
  console.log('clinic_settings row:');
  console.log('doctor_name:', res.rows[0]?.doctor_name);
  console.log('hero_slider:', JSON.stringify(res.rows[0]?.hero_slider, null, 2));
  await pool.end();
}
check();
