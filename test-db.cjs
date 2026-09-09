require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.query(`SELECT title, description, cover_image FROM blog_posts WHERE slug = 'best-sports-iptv' AND status = 'published'`).then(res => { console.log(res.rows.length); process.exit(0); }).catch(e => console.error(e));
