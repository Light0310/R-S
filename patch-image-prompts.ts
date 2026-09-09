import fs from 'fs';

function updateFile(file: string) {
  let content = fs.readFileSync(file, 'utf8');

  // First, restore just in case we run it multiple times:
  // (We'll assume it's run once for now)
  content = content.replace(/const shortTitle = ([^\n]+);\n    \/\/ Shorten[^\n]*\n(?:[^\n]*\n){8}/g, 'const shortTitle = $1;');

  content = content.replace(/const shortTitle = ([^\n]+);/g, (match) => {
    return match + `
    // Shorten and filter words for better image generation
    let words = shortTitle.split(' ').map(w => w.trim()).filter(Boolean);
    const filler = ['how', 'to', 'optimize', 'the', 'for', 'in', 'and', 'a', 'an', 'is', 'guide', 'complete', 'best', 'setup', 'tutorial', 'ultimate', 'fix', 'free'];
    let coreWords = words.filter(w => !filler.includes(w.toLowerCase().replace(/[^a-z]/g, '')));
    if (coreWords.length > 0) {
      shortTitle = coreWords.slice(0, 4).join(' ');
    } else {
      shortTitle = words.slice(0, 3).join(' ');
    }`;
  });

  // Change let shortTitle to let if it was const
  content = content.replace(/const shortTitle/g, 'let shortTitle');

  const newPrompt = "`A digital artwork featuring the EXACT text \\\"${shortTitle}\\\" written in massive, bold, glowing neon typography. The text is perfectly centered and highly legible. The background is a dark, cinematic, cyberpunk environment with glowing red accents. Absolutely no extra letters or misspelled words. 8k resolution, masterpiece.`";

  content = content.replace(/const imagePrompt = `[^`]+`;/g, 'const imagePrompt = ' + newPrompt + ';');

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}

updateFile('src/routes/seoRoutes.ts');
updateFile('src/services/contentGenerator.ts');
