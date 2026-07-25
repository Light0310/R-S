const mdRegex = /\[([^\]]+)\]\(\/(?:en\/?)?\)/gi;
const htmlRegex = /<(?:a|Link)[^>]*(?:href|to)=['"]\/(?:en\/?)?['"][^>]*>([^<]+)<\/(?:a|Link)>/gi;

const strings = [
  "Check out [modern smart streaming devices](/en)",
  "Visit [our site](/)",
  "Read <a href='/'>this text</a> here",
  "Go <Link to='/en'>modern</Link>",
  "Keep [this link](/blog)",
  "Keep <a href='/blog'>this link</a>"
];

strings.forEach(s => {
  let res = s.replace(mdRegex, '$1').replace(htmlRegex, '$1');
  console.log(`Original: ${s}`);
  console.log(`Replaced: ${res}`);
  console.log('---');
});
