const fs = require('fs');
const path = require('path');
const glob = require('glob');

const files = glob.sync('src/content/blog/**/*.md');
console.log('Files:', files.length);
files.forEach(f => {
  const parts = f.split('/');
  const langIndex = parts.indexOf('blog') + 1;
  const lang = parts[langIndex];
  console.log(f, lang);
});
