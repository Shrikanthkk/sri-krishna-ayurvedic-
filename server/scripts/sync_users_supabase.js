import pg from 'pg';

async function main() {
  const s = new pg.Client({
    connectionString: 'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-1-ap-south-1.pooler.supabase.com:5432/postgres',
    ssl: { rejectUnauthorized: false }
  });
  const v = new pg.Client({
    host: '168.119.64.101',
    port: 5432,
    database: 'krish966',
    user: 'krish966',
    password: '2aG1YDSxSYQv1sBkubBhbe790',
    ssl: false
  });
  await s.connect();
  await v.connect();

  const vu = await v.query('SELECT name, email, phone, password_hash, role, is_active FROM users');
  for (const u of vu.rows) {
    await s.query(`
      INSERT INTO users (name, email, phone, password_hash, role, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (email) DO NOTHING
    `, [u.name, u.email, u.phone, u.password_hash, u.role, u.is_active]);
  }

  const all = await s.query('SELECT id, name, email FROM users');
  console.table(all.rows);

  await s.end();
  await v.end();
}

main().catch(console.error);
