const fs = require('fs');
const glob = require('glob');

function parseMarkdown(rawContent) {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);
  return match ? { frontmatter: { title: "Parsed" }, content: match[2] } : { frontmatter: {}, content: rawContent };
}

const files = glob.sync('src/content/blog/en/*.md');
let successCount = 0;
let failCount = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const result = parseMarkdown(content);
  if (result.frontmatter.title === "Parsed") {
    successCount++;
  } else {
    console.log("Failed to parse:", f);
    failCount++;
  }
});
console.log(`Success: ${successCount}, Fail: ${failCount}`);
