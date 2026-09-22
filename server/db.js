import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

let dbUrl = process.env.DATABASE_URL;
if (!dbUrl || dbUrl.includes('127.0.0.1') || dbUrl.includes('localhost')) {
  dbUrl = 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966';
}

const connectionConfig = {
  connectionString: dbUrl,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
};

export const pool = new Pool({
  ...connectionConfig,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

export const query = async (text, params) => {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    return res;
  } catch (error) {
    console.error('Database query error:', { query: text.slice(0, 120), error: error.message });
    throw error;
  }
};

export default { pool, query };
