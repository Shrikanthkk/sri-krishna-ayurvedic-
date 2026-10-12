import pg from 'pg';

const { Client } = pg;

async function cloneDatabase() {
  console.log('====================================================');
  console.log('🚀 CLONING DATABASE: SUPABASE -> POSTGRESQL');
  console.log('====================================================');

  // 1. Supabase Source Connection
  const supabaseUrl = 'postgresql://postgres.yohzqktgzesenbwxvyld:Pramod%400605@aws-1-ap-south-1.pooler.supabase.com:5432/postgres';
  console.log('\n[1/5] Connecting to Source Supabase Database...');
  const sourceClient = new Client({
    connectionString: supabaseUrl,
    ssl: { rejectUnauthorized: false }
  });
  await sourceClient.connect();
  console.log('✅ Connected to Source Supabase Database.');

  // 2. Destination PostgreSQL Connection
  const targetHost = process.env.DB_HOST || '127.0.0.1';
  console.log(`\n[2/5] Connecting to Target PostgreSQL Database (${targetHost})...`);
  const targetClient = new Client({
    host: targetHost,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    database: process.env.DB_NAME || 'krish966',
    user: process.env.DB_USER || 'krish966',
    password: process.env.DB_PASSWORD || '2aG1YDSxSYQv1sBkubBhbe790',
    ssl: false
  });
  await targetClient.connect();
  console.log('✅ Connected to Target PostgreSQL Database.');

  // 3. Get all public user tables from Supabase (excluding system tables)
  const tablesQuery = `
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `;
  const tablesResult = await sourceClient.query(tablesQuery);
  const tableNames = tablesResult.rows.map(r => r.table_name);
  console.log(`\n[3/5] Found ${tableNames.length} tables in Supabase public schema:`);
  console.log(tableNames.map(t => `  - ${t}`).join('\n'));

  // Ensure pgcrypto or uuid extension if needed
  try {
    await targetClient.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
    await targetClient.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
  } catch (e) {
    console.log('Extension note:', e.message);
  }

  // 4. For each table, get column definitions, create table in destination, and clone data
  console.log('\n[4/5] Syncing Table Schemas & Data...');
  
  for (const tableName of tableNames) {
    console.log(`\n----------------------------------------------------`);
    console.log(`📦 Processing Table: "${tableName}"`);
    console.log(`----------------------------------------------------`);

    // Fetch column details from source
    const colsQuery = `
      SELECT 
        column_name, 
        data_type, 
        udt_name,
        character_maximum_length, 
        is_nullable, 
        column_default
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = $1
      ORDER BY ordinal_position;
    `;
    const colsResult = await sourceClient.query(colsQuery, [tableName]);
    
    // Fetch primary keys
    const pkQuery = `
      SELECT kcu.column_name
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      WHERE tc.table_schema = 'public'
        AND tc.table_name = $1
        AND tc.constraint_type = 'PRIMARY KEY';
    `;
    const pkResult = await sourceClient.query(pkQuery, [tableName]);
    const pkCols = pkResult.rows.map(r => `"${r.column_name}"`);

    // Build column definitions
    const colDefs = colsResult.rows.map(col => {
      let typeStr = col.data_type.toUpperCase();
      if (col.data_type === 'character varying') {
        typeStr = col.character_maximum_length ? `VARCHAR(${col.character_maximum_length})` : 'VARCHAR(255)';
      } else if (col.data_type === 'USER-DEFINED') {
        typeStr = col.udt_name;
      } else if (col.data_type === 'ARRAY') {
        typeStr = `${col.udt_name.replace(/^_/, '')}[]`;
      }
      
      let def = `"${col.column_name}" ${typeStr}`;
      if (col.is_nullable === 'NO') {
        def += ' NOT NULL';
      }
      if (col.column_default && !col.column_default.includes('nextval')) {
        def += ` DEFAULT ${col.column_default}`;
      }
      return def;
    });

    if (pkCols.length > 0) {
      colDefs.push(`PRIMARY KEY (${pkCols.join(', ')})`);
    }

    const createTableSQL = `CREATE TABLE IF NOT EXISTS "${tableName}" (\n  ${colDefs.join(',\n  ')}\n);`;
    await targetClient.query(createTableSQL);
    console.log(`✔ Table structure ensured for "${tableName}".`);

    // Check existing columns in target to add any missing ones
    const targetColsQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = $1;
    `;
    const targetColsResult = await targetClient.query(targetColsQuery, [tableName]);
    const targetColNames = new Set(targetColsResult.rows.map(r => r.column_name));

    for (const col of colsResult.rows) {
      if (!targetColNames.has(col.column_name)) {
        let typeStr = col.data_type.toUpperCase();
        if (col.data_type === 'character varying') {
          typeStr = col.character_maximum_length ? `VARCHAR(${col.character_maximum_length})` : 'VARCHAR(255)';
        }
        await targetClient.query(`ALTER TABLE "${tableName}" ADD COLUMN IF NOT EXISTS "${col.column_name}" ${typeStr};`);
        console.log(`  + Added missing column "${col.column_name}" to "${tableName}".`);
      }
    }

    // Fetch data from source table
    const dataResult = await sourceClient.query(`SELECT * FROM "${tableName}"`);
    console.log(`Source table "${tableName}" has ${dataResult.rows.length} records.`);

    if (dataResult.rows.length > 0) {
      let insertCount = 0;
      for (const row of dataResult.rows) {
        const columns = Object.keys(row);
        const values = columns.map(c => {
          const val = row[c];
          if (val !== null && typeof val === 'object' && !(val instanceof Date)) {
            return JSON.stringify(val);
          }
          return val;
        });

        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');
        const colNamesStr = columns.map(c => `"${c}"`).join(', ');

        let conflictClause = '';
        if (pkCols.length > 0) {
          const updateCols = columns.filter(c => !pkCols.includes(`"${c}"`));
          if (updateCols.length > 0) {
            const setStr = updateCols.map(c => `"${c}" = EXCLUDED."${c}"`).join(', ');
            conflictClause = `ON CONFLICT (${pkCols.join(', ')}) DO UPDATE SET ${setStr}`;
          } else {
            conflictClause = `ON CONFLICT (${pkCols.join(', ')}) DO NOTHING`;
          }
        }

        const insertSQL = `
          INSERT INTO "${tableName}" (${colNamesStr})
          VALUES (${placeholders})
          ${conflictClause}
        `;

        try {
          await targetClient.query(insertSQL, values);
          insertCount++;
        } catch (err) {
          console.warn(`  ⚠️ Row insert warning in ${tableName}:`, err.message);
        }
      }
      console.log(`✔ Synced ${insertCount} / ${dataResult.rows.length} rows into target table "${tableName}".`);
    }

    // Sync sequences if any
    try {
      const seqCheck = await targetClient.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = $1 
          AND column_default LIKE 'nextval%';
      `, [tableName]);

      for (const s of seqCheck.rows) {
        await targetClient.query(`
          SELECT setval(pg_get_serial_sequence('${tableName}', '${s.column_name}'), COALESCE(MAX("${s.column_name}"), 1)) FROM "${tableName}";
        `);
      }
    } catch (e) {
      // ignore sequence errors for non-serial keys
    }
  }

  // 5. Final Verification Summary
  console.log('\n====================================================');
  console.log('[5/5] CLONE & VERIFICATION SUMMARY');
  console.log('====================================================');

  for (const tableName of tableNames) {
    const srcCount = (await sourceClient.query(`SELECT COUNT(*) FROM "${tableName}"`)).rows[0].count;
    const tgtCount = (await targetClient.query(`SELECT COUNT(*) FROM "${tableName}"`)).rows[0].count;
    console.log(`  Table [${tableName.padEnd(25)}]: Supabase = ${srcCount.toString().padStart(4)} rows  |  PostgreSQL (${targetHost}) = ${tgtCount.toString().padStart(4)} rows`);
  }

  await sourceClient.end();
  await targetClient.end();
  console.log('\n🎉 ALL SUPABASE DATA AND TABLES HAVE BEEN SUCCESSFULLY CLONED TO YOUR POSTGRESQL DATABASE!');
}

cloneDatabase().catch(err => {
  console.error('\n❌ Fatal Database Clone Error:', err);
  process.exit(1);
});
