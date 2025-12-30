const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Ensure GitHub Pages serves the exported Next.js site correctly.
const noJekyllPath = path.join(outDir, '.nojekyll');
// write a small non-empty file to ensure publishing tools include the file
fs.writeFileSync(noJekyllPath, 'nojekyll');
console.log(`Created ${noJekyllPath} (with content)`);

// Preserve custom domain on GitHub Pages by creating out/CNAME.
// GitHub Pages expects the CNAME file to contain just the hostname.
try {
  const pkgPath = path.join(process.cwd(), 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const homepage = pkg.homepage;
  if (homepage) {
    const host = new URL(homepage).host;
    if (host) {
      const cnamePath = path.join(outDir, 'CNAME');
      fs.writeFileSync(cnamePath, `${host}\n`);
      console.log(`Created ${cnamePath} (${host})`);
    }
  }
} catch (e) {
  // Non-fatal: deploy can still proceed without CNAME.
  console.warn('Skipping CNAME generation:', e?.message || e);
}
