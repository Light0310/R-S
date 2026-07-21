const fs = require('fs');
let content = fs.readFileSync('src/utils/cronScheduler.ts', 'utf8');

content = content.replace(
  /async function processNextPendingQuery\(\): Promise<\{ processed: boolean; query\?: string; insertedCount\?: number; error\?: string \}> \{/,
  `async function processNextPendingQuery(): Promise<{ processed: boolean; query?: string; insertedCount?: number; error?: string }> {
  if (!process.env.DATABASE_URL) {
    return { processed: false, error: "No DATABASE_URL set. Skipping PostgreSQL operation." };
  }
`
);

fs.writeFileSync('src/utils/cronScheduler.ts', content, 'utf8');
