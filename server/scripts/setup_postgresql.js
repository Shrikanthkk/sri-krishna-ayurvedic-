import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import db, { pool } from '../db.js';
import { seedDatabase } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log('====================================================');
  console.log('  PostgreSQL Database Setup & Migration Script');
  console.log('  Sri Krishna Ayurvedic Clinic');
  console.log('====================================================');

  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRESQL_URL;

  if (connectionString) {
    console.log('📍 Target Database: Remote/Cloud PostgreSQL');
  } else {
    console.log('📍 Target Database: Local PostgreSQL (127.0.0.1:5432/krish966)');
  }

  // 1. Test connection
  console.log('\n--> Step 1: Testing PostgreSQL Connection...');
  const connTest = await db.testDatabaseConnection();
  if (!connTest.success) {
    console.error('❌ Connection Failed:', connTest.error);
    console.error('\nPlease ensure:');
    console.error(' 1) Your PostgreSQL server is running.');
    console.error(' 2) DATABASE_URL environment variable is correctly set in .env or system env.');
    console.error(' 3) Format: postgresql://username:password@hostname:5432/databasename');
    process.exit(1);
  }

  console.log(`✅ Connected successfully to PostgreSQL Database: "${connTest.database}"!`);
  console.log(`   PostgreSQL Version: ${connTest.version.split('\n')[0]}`);

  // 2. Execute Schema Migration
  console.log('\n--> Step 2: Creating PostgreSQL Database Schema (Tables & Indexes)...');
  const schemaPath = path.join(__dirname, '..', 'migrations', 'schema.sql');
  const sql = fs.readFileSync(schemaPath, 'utf8');

  await db.query(sql);
  console.log('✅ Schema migration executed successfully! Created tables: users, appointments, inquiries, clinic_settings, treatments, swarnaprashana_schedule');

  // 3. Seed Database Records
  console.log('\n--> Step 3: Seeding Default Clinic Records & Admin Credentials...');
  await seedDatabase({ closePool: false });

  // 4. Verification Check
  console.log('\n--> Step 4: Verifying PostgreSQL Tables & Record Counts...');
  const tables = ['users', 'appointments', 'inquiries', 'clinic_settings', 'treatments', 'swarnaprashana_schedule'];

  for (const table of tables) {
    const res = await db.query(`SELECT COUNT(*) FROM "${table}"`);
    console.log(`   - Table '${table}': ${res.rows[0].count} records`);
  }

  console.log('\n====================================================');
  console.log('🎉 PostgreSQL Database is 100% Ready & Fully Configured!');
  console.log('====================================================\n');

  await pool.end();
  process.exit(0);
}

main().catch(err => {
  console.error('❌ Fatal error setting up PostgreSQL:', err.message);
  process.exit(1);
});
