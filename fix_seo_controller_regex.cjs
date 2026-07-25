const fs = require('fs');
let code = fs.readFileSync('src/controllers/seoController.ts', 'utf8');

const regexPattern = '(how modern smart TV boxes are revolutionizing entertainment|modern smart streaming devices)';

code = code.replace(
  /'\\\\\[\(\[\^\\\]\]\*how modern smart TV boxes are revolutionizing entertainment\[\^\\\]\]\*\)\\\\\]\\\\\[\^\)\]\+\\\\\)'/g,
  `'\\\\[([^\\]]*(?:how modern smart TV boxes are revolutionizing entertainment|modern smart streaming devices)[^\\]]*)\\\\]\\\\([^)]+\\\\)'`
).replace(
  /'\\\\\[\[\^\\\]\]\*how modern smart TV boxes are revolutionizing entertainment\[\^\\\]\]\*\\\\\]\\\\\[\^\)\]\+\\\\\)'/g,
  `'\\\\[[^\\]]*(?:how modern smart TV boxes are revolutionizing entertainment|modern smart streaming devices)[^\\]]*\\\\]\\\\([^)]+\\\\)'`
).replace(
  /'<\(\?:a\|Link\)\[\^>\]\*>(\[\^<\]\*how modern smart TV boxes are revolutionizing entertainment\[\^<\]\*)<\/\(\?:a\|Link\)>/'/g,
  `'<(?:a|Link)[^>]*>([^<]*(?:how modern smart TV boxes are revolutionizing entertainment|modern smart streaming devices)[^<]*)</(?:a|Link)>'`
).replace(
  /'<\(\?:a\|Link\)\[\^>\]\*>\[\^<\]\*how modern smart TV boxes are revolutionizing entertainment\[\^<\]\*<\/\(\?:a\|Link\)>/'/g,
  `'<(?:a|Link)[^>]*>[^<]*(?:how modern smart TV boxes are revolutionizing entertainment|modern smart streaming devices)[^<]*</(?:a|Link)>'`
);

fs.writeFileSync('src/controllers/seoController.ts', code);
console.log('Regex updated in seoController.ts');
