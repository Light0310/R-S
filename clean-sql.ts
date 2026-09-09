import { Pool } from 'pg';
const pool = new Pool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
});
async function run() {
  const client = await pool.connect();
  try {
    const res = await client.query('DELETE FROM blog_posts WHERE slug LIKE $1', ['test-%']);
    console.log('Deleted rows:', res.rowCount);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    pool.end();
  }
}
run();
