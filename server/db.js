import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const SUPABASE_DB_URL = 'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-1-ap-south-1.pooler.supabase.com:5432/postgres';

function createPool() {
  let connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRESQL_URL;

  if (!connectionString || connectionString.includes('localhost') || connectionString.includes('127.0.0.1') || connectionString.includes('168.119.64.101')) {
    connectionString = SUPABASE_DB_URL;
  }

  const isSupabase = connectionString.includes('supabase.co') || connectionString.includes('supabase.com');
  const sslEnabled = isSupabase || process.env.DB_SSL === 'true' || process.env.PGSSL === 'true';

  const poolConfig = {
    connectionString,
    ssl: sslEnabled ? { rejectUnauthorized: false } : false,
    max: parseInt(process.env.DB_POOL_MAX || '20', 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  };

  const poolInstance = new Pool(poolConfig);

  poolInstance.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client:', err);
  });

  return poolInstance;
}

// Global declaration for singleton pool in development/server environments
export const pool = globalThis.__pgPoolInstance ?? createPool();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__pgPoolInstance = pool;
}

export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      // console.log('[PostgreSQL Query]', { text: text.slice(0, 80), rows: res.rowCount, duration: `${duration}ms` });
    }
    return res;
  } catch (error) {
    console.error('Database query error:', { query: text.slice(0, 120), error: error.message });
    throw error;
  }
}

export async function testDatabaseConnection() {
  try {
    const client = await pool.connect();
    try {
      const res = await client.query(
        'SELECT current_database() as database, NOW() as server_time, version() as version;'
      );
      const row = res.rows[0];
      return {
        success: true,
        database: row.database,
        serverTime: row.server_time,
        version: row.version,
      };
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('PostgreSQL connection check failed:', err.message);
    return {
      success: false,
      error: err.message,
    };
  }
}

export default {
  query,
  pool,
  testDatabaseConnection,
};
