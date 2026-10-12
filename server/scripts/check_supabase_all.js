import pg from 'pg';

const client = new pg.Client({
  connectionString: 'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-1-ap-south-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  console.log('Connected to Supabase!');
  
  const tables = ['clinic_settings', 'treatments', 'swarnaprashana_schedule', 'appointments', 'inquiries', 'users'];
  for (const table of tables) {
    try {
      const res = await client.query(`SELECT COUNT(*) FROM "${table}"`);
      console.log(`- Table [${table}]: ${res.rows[0].count} rows stored in Supabase`);
    } catch (e) {
      console.log(`- Table [${table}]: ERROR - ${e.message}`);
    }
  }
  
  await client.end();
}

main().catch(console.error);
