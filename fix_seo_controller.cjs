const fs = require('fs');
let code = fs.readFileSync('src/controllers/seoController.ts', 'utf8');

const oldSql = `    // One-time migration to remove misleading anchor texts
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
    }`;

const newSql = `    // Comprehensive migration to remove misleading anchor texts in both Markdown and HTML
    try {
      let totalFixed = 0;
      // Fix Markdown Links
      const updateMdRes = await pool.query(\`
        UPDATE blog_posts
        SET content = regexp_replace(
          content,
          '\\\\[([^\\]]*how modern smart TV boxes are revolutionizing entertainment[^\\]]*)\\\\]\\\\([^)]+\\\\)',
          '\\\\1',
          'gi'
        )
        WHERE content ~* '\\\\[[^\\]]*how modern smart TV boxes are revolutionizing entertainment[^\\]]*\\\\]\\\\([^)]+\\\\)';
      \`);
      if (updateMdRes && updateMdRes.rowCount) totalFixed += updateMdRes.rowCount;

      // Fix HTML Links
      const updateHtmlRes = await pool.query(\`
        UPDATE blog_posts
        SET content = regexp_replace(
          content,
          '<(?:a|Link)[^>]*>([^<]*how modern smart TV boxes are revolutionizing entertainment[^<]*)</(?:a|Link)>',
          '\\\\1',
          'gi'
        )
        WHERE content ~* '<(?:a|Link)[^>]*>[^<]*how modern smart TV boxes are revolutionizing entertainment[^<]*</(?:a|Link)>';
      \`);
      if (updateHtmlRes && updateHtmlRes.rowCount) totalFixed += updateHtmlRes.rowCount;

      if (totalFixed > 0) {
        console.log(\`[Database] Fixed \${totalFixed} blog posts containing the misleading anchor text in Markdown/HTML.\`);
      }
    } catch (fixErr: any) {
      console.error('[Database] Error applying anchor text fix:', fixErr.message);
    }`;

if (code.includes('One-time migration to remove misleading anchor texts')) {
  code = code.replace(oldSql, newSql);
  fs.writeFileSync('src/controllers/seoController.ts', code);
  console.log('seoController.ts patched successfully');
} else {
  console.log('Could not find old SQL in seoController.ts');
}
