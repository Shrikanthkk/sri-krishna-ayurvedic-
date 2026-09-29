import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// REMOTE PostgreSQL — always connect to the production server
// Even without environment variables, we fall back to the known production DB
const PROD_DB_URL = 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966';

function createPool() {
  const connectionString =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRESQL_URL ||
    PROD_DB_URL; // Always fall back to production DB — never 127.0.0.1

  const poolConfig = {
    connectionString,
    ssl: false, // Remote server does not require SSL
    max: parseInt(process.env.DB_POOL_MAX || '10', 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 15000,
  };

  const poolInstance = new Pool(poolConfig);

  poolInstance.on('error', (err) => {
    console.error('Unexpected PostgreSQL client error:', err.message);
  });

  return poolInstance;
}

// Singleton pool — one connection pool shared across all requests
let _pool = null;

function getPool() {
  if (!_pool) {
    _pool = createPool();
  }
  return _pool;
}

export const pool = getPool();

export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.log('[DB Query]', { text: text.slice(0, 80), rowCount: res.rowCount, duration: `${duration}ms` });
    }
    return res;
  } catch (err) {
    console.error('[DB Query Error]', { text: text.slice(0, 80), error: err.message });
    throw err;
  }
}

export async function testDatabaseConnection() {
  try {
    const client = await pool.connect();
    try {
      const res = await client.query(
        'SELECT current_database() as database, NOW() as server_time;'
      );
      const row = res.rows[0];
      return {
        success: true,
        database: row.database,
        serverTime: row.server_time,
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

export default { pool, query, testDatabaseConnection };
