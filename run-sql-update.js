import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("Error: DATABASE_URL environment variable is missing in this workspace.");
  console.error("To execute this on your live database, run:");
  console.error("DATABASE_URL='your_production_db_url' node run-sql-update.js");
  process.exit(1);
}

const { Pool } = pg;
const pool = new Pool({ connectionString });

async function run() {
  try {
    const updateQuery = `
      UPDATE blog_posts
      SET content = regexp_replace(
        content,
        '<(?:a|Link)[^>]*>(\\s*how modern smart TV boxes are revolutionizing entertainment\\s*)</(?:a|Link)>',
        '\\1',
        'gi'
      )
      WHERE content ~* '<(?:a|Link)[^>]*>\\s*how modern smart TV boxes are revolutionizing entertainment\\s*</(?:a|Link)>'
      RETURNING id, slug;
    `;

    console.log("Executing SQL Update...");
    const res = await pool.query(updateQuery);
    
    console.log(`Successfully updated ${res.rowCount} rows.`);
    if (res.rowCount > 0) {
      console.log('Affected Posts:', res.rows);
    } else {
      console.log('No rows matched. Check if the string exists exactly as formatted.');
    }
  } catch(e) {
    console.error("Database error:", e.message);
  } finally {
    pool.end();
  }
}

run();
