import fs from 'fs';
const path = 'src/content/dynamic_posts.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
const filtered = data.filter((post: any) => !post.slug.startsWith('test-'));
fs.writeFileSync(path, JSON.stringify(filtered, null, 2), 'utf8');
console.log('Cleaned dynamic_posts.json, original length:', data.length, 'new length:', filtered.length);
