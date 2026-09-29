import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

function createPool() {
  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRESQL_URL;

  // Enable SSL for cloud databases (Supabase, Neon, etc.) or when explicitly set
  const isCloudDb = connectionString && (
    connectionString.includes('supabase.com') ||
    connectionString.includes('neon.tech') ||
    connectionString.includes('render.com') ||
    connectionString.includes('heroku') ||
    connectionString.includes('railway.app') ||
    connectionString.includes('amazonaws.com')
  );

  const sslEnabled =
    process.env.DB_SSL === 'true' ||
    process.env.PGSSL === 'true' ||
    isCloudDb ||
    (connectionString ? connectionString.includes('sslmode=require') : false);

  const poolConfig = connectionString
    ? {
        connectionString,
        ssl: sslEnabled ? { rejectUnauthorized: false } : false,
        max: parseInt(process.env.DB_POOL_MAX || '10', 10),
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      }
    : {
        host: process.env.DB_HOST || process.env.PGHOST || '127.0.0.1',
        port: parseInt(process.env.DB_PORT || process.env.PGPORT || '5432', 10),
        database: process.env.DB_NAME || process.env.PGDATABASE || 'krish966',
        user: process.env.DB_USER || process.env.PGUSER || 'krish966',
        password:
          process.env.DB_PASSWORD ||
          process.env.PGPASSWORD ||
          '2aG1YDSxSYQv1sBkubBhbe790',
        ssl: sslEnabled ? { rejectUnauthorized: false } : false,
        max: parseInt(process.env.DB_POOL_MAX || '10', 10),
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 10000,
      };

  const poolInstance = new Pool(poolConfig);

  poolInstance.on('error', (err) => {
    console.error('Unexpected error on idle PostgreSQL client:', err.message);
  });

  return poolInstance;
}

// Singleton pool pattern for serverless environments
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
      console.log('[DB Query]', { text: text.slice(0, 100), rowCount: res.rowCount, duration: `${duration}ms` });
    }
    return res;
  } catch (err) {
    console.error('[DB Query Error]', { text: text.slice(0, 100), error: err.message });
    throw err;
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

const db = {
  pool,
  query,
  testDatabaseConnection,
};

export default db;
