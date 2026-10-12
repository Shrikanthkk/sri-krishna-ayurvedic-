import pg from 'pg';
import bcrypt from 'bcryptjs';

const client = new pg.Client({
  host: '168.119.64.101',
  port: 5432,
  database: 'krish966',
  user: 'krish966',
  password: '2aG1YDSxSYQv1sBkubBhbe790',
  ssl: false
});

async function main() {
  await client.connect();
  const hash1234 = await bcrypt.hash('1234', 10);
  const hashSrikrishna = await bcrypt.hash('Srikrishna@321', 10);
  
  await client.query('UPDATE users SET password_hash = $1 WHERE email IN ($2, $3)', [hash1234, 'admin@srikrishnaayurveda.com', 'admin']);
  await client.query('UPDATE users SET password_hash = $1 WHERE email IN ($2, $3)', [hashSrikrishna, 'srikrishna@srikrishnaayurveda.com', 'srikrishna']);
  
  console.log('✅ Admin credentials updated:');
  console.log('  1. email: admin@srikrishnaayurveda.com | password/PIN: 1234');
  console.log('  2. username: admin                     | password/PIN: 1234');
  console.log('  3. email: srikrishna@srikrishnaayurveda.com | password: Srikrishna@321');
  console.log('  4. username: srikrishna                | password: Srikrishna@321');
  
  await client.end();
}

main().catch(console.error);
