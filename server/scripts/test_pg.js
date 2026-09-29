import db from '../db.js';

async function main() {
  console.log('Testing PostgreSQL database connection...');
  const res = await db.testDatabaseConnection();
  console.log('DB Test Result:', res);

  if (res.success) {
    const tablesRes = await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public';");
    console.log('Tables present in PostgreSQL database:', tablesRes.rows.map(r => r.table_name));

    // Check count of records in each table
    for (const r of tablesRes.rows) {
      const tableName = r.table_name;
      try {
        const countRes = await db.query(`SELECT COUNT(*) FROM "${tableName}"`);
        console.log(`Table '${tableName}': ${countRes.rows[0].count} rows`);
      } catch (err) {
        console.error(`Error counting ${tableName}:`, err.message);
      }
    }
  }
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error testing PG:', err);
  process.exit(1);
});
