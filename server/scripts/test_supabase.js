import pg from 'pg';
const { Client } = pg;

const targets = [
  { name: 'direct db', connectionString: 'postgresql://postgres:Pramod%400605@db.yohzqktgzesenbwxvyld.supabase.co:5432/postgres' },
  { name: 'direct db 6543', connectionString: 'postgresql://postgres:Pramod%400605@db.yohzqktgzesenbwxvyld.supabase.co:6543/postgres' },
  { name: 'pooler aws-0 6543', connectionString: 'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-0-ap-south-1.pooler.supabase.com:6543/postgres' },
  { name: 'pooler aws-0 5432', connectionString: 'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-0-ap-south-1.pooler.supabase.com:5432/postgres' },
  { name: 'pooler aws-1 6543', connectionString: 'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-1-ap-south-1.pooler.supabase.com:6543/postgres' },
  { name: 'pooler aws-1 5432', connectionString: 'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-1-ap-south-1.pooler.supabase.com:5432/postgres' },
];

async function run() {
  for (const t of targets) {
    console.log(`Trying ${t.name}...`);
    const c = new Client({
      connectionString: t.connectionString,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000
    });
    try {
      await c.connect();
      console.log(`SUCCESS with ${t.name}!`);
      const res = await c.query("SELECT current_database(), current_user, version()");
      console.log(res.rows);
      await c.end();
      return t.connectionString;
    } catch (e) {
      console.log(`Failed ${t.name}:`, e.message);
      try { await c.end(); } catch {}
    }
  }
}

run();
