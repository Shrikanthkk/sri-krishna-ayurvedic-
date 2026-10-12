import pg from 'pg';
const { Client } = pg;

async function checkPostgres() {
  const client = new Client({
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'krish966',
    user: process.env.DB_USER || 'krish966',
    password: process.env.DB_PASSWORD || '2aG1YDSxSYQv1sBkubBhbe790',
    ssl: false
  });
  await client.connect();
  console.log('Connected to PostgreSQL (' + (process.env.DB_HOST || '127.0.0.1') + ')');
  
  const tables = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE';
  `);
  
  console.log('\n--- Existing Tables in krish966 ---');
  for (const row of tables.rows) {
    const countRes = await client.query(`SELECT COUNT(*) FROM "${row.table_name}"`);
    console.log(`Table: ${row.table_name} (${countRes.rows[0].count} rows)`);
  }
  
  await client.end();
}

checkPostgres().catch(console.error);
