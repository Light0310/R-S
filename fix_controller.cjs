const fs = require('fs');
let content = fs.readFileSync('src/controllers/seoController.ts', 'utf8');

content = content.replace(
  /export const executeSearchIntegration = async \(req: Request, res: Response\) => \{/,
  `export const executeSearchIntegration = async (req: Request, res: Response) => {
  if (!process.env.DATABASE_URL) {
    return res.status(500).json({ message: 'No DATABASE_URL configured' });
  }`
);

content = content.replace(
  /export const getStoredSeoResults = async \(req: Request, res: Response\) => \{/,
  `export const getStoredSeoResults = async (req: Request, res: Response) => {
  if (!process.env.DATABASE_URL) {
    return res.status(200).json({ links: [], queries: [] });
  }`
);

fs.writeFileSync('src/controllers/seoController.ts', content, 'utf8');
