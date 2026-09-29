import { query } from '../db.js';

async function migrate() {
  try {
    // Check what columns exist
    const cols = await query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'clinic_settings' ORDER BY ordinal_position"
    );
    console.log('clinic_settings columns:', cols.rows.map(r => r.column_name).join(', '));

    // Add missing columns safely
    const migrations = [
      "ALTER TABLE clinic_settings ADD COLUMN IF NOT EXISTS secondary_phone VARCHAR(50) DEFAULT '+91 98440 90626'",
      "ALTER TABLE clinic_settings ADD COLUMN IF NOT EXISTS running_bar JSONB",
      "ALTER TABLE clinic_settings ADD COLUMN IF NOT EXISTS hero_slider JSONB",
      "ALTER TABLE treatments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP",
      "ALTER TABLE swarnaprashana_schedule ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP",
    ];

    for (const sql of migrations) {
      try {
        await query(sql);
        console.log('✅ MIGRATED:', sql.substring(0, 70));
      } catch (e) {
        console.log('⚠️  SKIP (already exists):', e.message.substring(0, 80));
      }
    }

    // Verify final columns
    const final = await query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'clinic_settings' ORDER BY ordinal_position"
    );
    console.log('\nFinal clinic_settings columns:', final.rows.map(r => r.column_name).join(', '));

    // Also check treatments columns
    const trtCols = await query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'treatments' ORDER BY ordinal_position"
    );
    console.log('Final treatments columns:', trtCols.rows.map(r => r.column_name).join(', '));

    console.log('\n✅ Migration complete!');
    process.exit(0);
  } catch (e) {
    console.error('FATAL:', e.message);
    process.exit(1);
  }
}

migrate();
