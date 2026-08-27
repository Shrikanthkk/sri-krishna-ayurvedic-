import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
    }
  : {
      host: process.env.DB_HOST || '168.119.64.101',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      database: process.env.DB_NAME || '+krish966',
      user: process.env.DB_USER || '+krish966',
      password: process.env.DB_PASSWORD || '2aG1YDSXSYQv1sBkubBhbe790',
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
