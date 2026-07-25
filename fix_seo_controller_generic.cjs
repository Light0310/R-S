const fs = require('fs');
let code = fs.readFileSync('src/controllers/seoController.ts', 'utf8');

const newSql = `    // Comprehensive migration to remove misleading anchor texts in both Markdown and HTML
    try {
      let totalFixed = 0;
      
      // Generic Fix: Unwrap Markdown Links pointing exactly to root / or /en
      const updateMdRes = await pool.query(\`
        UPDATE blog_posts
        SET content = regexp_replace(
          content,
          '\\\\[([^\\]]+)\\\\]\\\\(\\\\/(?:en\\\\/?)?\\\\)',
          '\\\\1',
          'gi'
        )
        WHERE content ~* '\\\\[[^\\]]+\\\\]\\\\(\\\\/(?:en\\\\/?)?\\\\)';
      \`);
      if (updateMdRes && updateMdRes.rowCount) totalFixed += updateMdRes.rowCount;

      // Generic Fix: Unwrap HTML Links pointing exactly to root / or /en
      const updateHtmlRes = await pool.query(\`
        UPDATE blog_posts
        SET content = regexp_replace(
          content,
          '<(?:a|Link)[^>]*(?:href|to)=[''"]\\\\/(?:en\\\\/?)?[''"][^>]*>([^<]+)</(?:a|Link)>',
          '\\\\1',
          'gi'
        )
        WHERE content ~* '<(?:a|Link)[^>]*(?:href|to)=[''"]\\\\/(?:en\\\\/?)?[''"][^>]*>[^<]+</(?:a|Link)>';
      \`);
      if (updateHtmlRes && updateHtmlRes.rowCount) totalFixed += updateHtmlRes.rowCount;

      if (totalFixed > 0) {
        console.log(\`[Database] Fixed \${totalFixed} blog posts containing the misleading anchor text in Markdown/HTML.\`);
      }
    } catch (fixErr: any) {
      console.error('[Database] Error applying anchor text fix:', fixErr.message);
    }`;

const startIndex = code.indexOf('// Comprehensive migration to remove misleading anchor texts in both Markdown and HTML');
const endIndex = code.indexOf('} catch (fixErr: any) {') + 104; 
if (startIndex !== -1 && endIndex !== -1) {
  const endBlock = code.indexOf('}', endIndex) + 1;
  code = code.substring(0, startIndex) + newSql + code.substring(endBlock);
  fs.writeFileSync('src/controllers/seoController.ts', code);
  console.log('seoController.ts updated with generic regex');
} else {
  console.log('Could not find the block to replace.');
}
