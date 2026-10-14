import pg from 'pg';
import { clinicData } from '../../src/data/clinicData.js';

const pool = new pg.Pool({
  connectionString: 'postgresql://krish966:2aG1YDSxSYQv1sBkubBhbe790@168.119.64.101:5432/krish966',
  ssl: false
});

async function syncTreatments() {
  console.log('Synchronizing PostgreSQL treatments table with canonical 11 treatments...');

  // Update old alopecia row if present to hair-fall
  await pool.query("UPDATE treatments SET id = 'hair-fall', number = '03' WHERE id = 'alopecia'");

  for (const t of clinicData.treatments) {
    const benefitsJson = JSON.stringify(t.benefits || []);
    await pool.query(
      `INSERT INTO treatments (id, number, title, subtitle, description, benefits, duration, image, link, is_active)
       VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7, $8, $9, true)
       ON CONFLICT (id) DO UPDATE SET
         number = EXCLUDED.number,
         title = EXCLUDED.title,
         subtitle = EXCLUDED.subtitle,
         description = EXCLUDED.description,
         benefits = EXCLUDED.benefits,
         duration = EXCLUDED.duration,
         link = EXCLUDED.link,
         is_active = true`,
      [
        t.id,
        t.number,
        t.title,
        t.subtitle,
        t.description,
        benefitsJson,
        t.duration,
        t.image,
        t.link
      ]
    );
    console.log(`✔ Synced treatment: [${t.number}] ${t.id} - ${t.title}`);
  }

  const res = await pool.query('SELECT id, number, title, image FROM treatments ORDER BY number');
  console.log(`\nTotal treatments in PostgreSQL DB: ${res.rows.length}`);
  console.table(res.rows);

  await pool.end();
}

syncTreatments().catch(async (err) => {
  console.error('Sync failed:', err);
  await pool.end();
  process.exit(1);
});
