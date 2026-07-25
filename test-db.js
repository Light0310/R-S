import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
async function test() {
  try {
    const res = await pool.query("SELECT id, title FROM blog_posts WHERE content ILIKE '%how modern smart TV boxes are revolutionizing entertainment%'");
    console.log('Matches:', res.rows.length);
    if (res.rows.length > 0) {
      const full = await pool.query("SELECT id, content FROM blog_posts WHERE id = $1", [res.rows[0].id]);
      console.log('Content snippet:', full.rows[0].content.substring(0, 500)); // just to check
      
      // Let's grab the exact match to see how it looks
      const match = full.rows[0].content.match(/<[^>]+how modern smart TV boxes are revolutionizing entertainment[^>]*>/i) || full.rows[0].content.match(/<[^>]*>.*how modern smart TV boxes are revolutionizing entertainment.*<\/[^>]+>/i);
      console.log('Regex Match:', match);
    }
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
test();
