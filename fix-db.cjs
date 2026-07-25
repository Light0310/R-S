const fs = require('fs');
let code = fs.readFileSync('src/controllers/seoController.ts', 'utf8');

const sqlFix = `
    // One-time migration to remove misleading anchor texts
    try {
      const updateRes = await pool.query(\`
        UPDATE blog_posts
        SET content = regexp_replace(
          content,
          '<(?:a|Link)[^>]*>(how modern smart TV boxes are revolutionizing entertainment)</(?:a|Link)>',
          '\\\\1',
          'gi'
        )
        WHERE content ~* '<(?:a|Link)[^>]*>how modern smart TV boxes are revolutionizing entertainment</(?:a|Link)>';
      \`);
      if (updateRes && updateRes.rowCount && updateRes.rowCount > 0) {
        console.log(\`[Database] Fixed \${updateRes.rowCount} blog posts containing the misleading anchor text.\`);
      }
    } catch (fixErr: any) {
      console.error('[Database] Error applying anchor text fix:', fixErr.message);
    }
`;

code = code.replace(
  "console.log('[Database] Initialization completed successfully.');",
  sqlFix + "\n    console.log('[Database] Initialization completed successfully.');"
);

fs.writeFileSync('src/controllers/seoController.ts', code);
