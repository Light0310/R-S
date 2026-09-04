const fs = require('fs');
let code = fs.readFileSync('src/controllers/seoController.ts', 'utf8');

code = code.replace(
  /export const pool = new Pool\(\{\n\s*connectionString: process\.env\.DATABASE_URL,\n\}\);/g,
  `export const pool = new Pool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
});`
);

code = code.replace(/if \(!process\.env\.DATABASE_URL\) \{/g, 'if (!process.env.SQL_HOST) {');
code = code.replace(/\[Database\] DATABASE_URL is missing\./g, '[Database] SQL_HOST is missing.');

fs.writeFileSync('src/controllers/seoController.ts', code);
