const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'out');

// Keep this in sync with next.config.js. When deploying to a custom domain, leave BASE_PATH empty.
// For GitHub Project Pages, set e.g.: BASE_PATH=/Moje_React
const basePath = process.env.BASE_PATH || '';

function escapeRegExp(str) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const res = path.join(dir, d.name);
    return d.isDirectory() ? walk(res) : res;
  });
}

const files = walk(outDir).filter((f) => {
  // Include HTML, TXT, JS, and JSON files where runtime chunk references can appear
  return f.endsWith('.html') || f.endsWith('.txt') || f.endsWith('.js') || f.endsWith('.json');
});

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  let updated = content;

  // Replace both absolute and (optional) basePath-prefixed _next URLs with next/
  if (basePath) {
    const re = new RegExp(`${escapeRegExp(basePath)}/_next/`, 'g');
    updated = updated.replace(re, `${basePath}/next/`);

    // encoded form: /Moje_React/_next/ => %2FMoje_React%2F_next%2F (roughly)
    const enc = encodeURIComponent(`${basePath}/_next/`);
    const encRe = new RegExp(escapeRegExp(enc), 'g');
    updated = updated.replace(encRe, `${basePath}/next/`);
  }

  updated = updated.replace(/\/_next\//g, `${basePath || ''}/next/`.replace('//', '/'));

  // Also ensure any occurrences that may have been encoded are handled
  updated = updated.replace(/%2F_next%2F/g, `${basePath || ''}/next/`.replace('//', '/'));

  if (updated !== content) {
    fs.writeFileSync(file, updated, 'utf8');
    console.log(`Patched paths in ${file}`);
  }

  // Inject a small runtime snippet into HTML files to set the public path early
  if (file.endsWith('.html')) {
    const marker = '<!-- NEXT_PUBLIC_PATH_PATCH -->';
    if (!updated.includes(marker)) {
      const snippet = `\n${marker}\n<script>(function(){try{const d=document.getElementById('__NEXT_DATA__');if(!d)return;const o=JSON.parse(d.textContent||'{}');const t=o.assetPrefix||'';const p=t+'/next/';if(typeof self.__next_set_public_path__==='function'){self.__next_set_public_path__(p)}try{if(typeof __webpack_public_path__!=='undefined')__webpack_public_path__=p}catch(e){} }catch(e){} })();</script>\n`;
      // Insert snippet right after <head> tag if present, otherwise prepend to file
      if (updated.includes('<head>')) {
        updated = updated.replace('<head>', `<head>${snippet}`);
      } else {
        updated = snippet + updated;
      }
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`Injected public-path snippet into ${file}`);
    }
  }
});
