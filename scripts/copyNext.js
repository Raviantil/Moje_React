const fs = require('fs');
const path = require('path');

const src = path.join(process.cwd(), 'out', '_next');
const dest = path.join(process.cwd(), 'out', 'next');

if (!fs.existsSync(src)) {
  console.error(`Source not found: ${src}`);
  process.exit(1);
}

// Use fs.cpSync (Node 16+) to copy recursively
try {
  fs.rmSync(dest, { recursive: true, force: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log(`Copied ${src} -> ${dest}`);
} catch (err) {
  console.error('Copy failed:', err);
  process.exit(1);
}
