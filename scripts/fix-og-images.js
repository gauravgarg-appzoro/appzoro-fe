const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../pages');
const importLine = "import { DEFAULT_OG_IMAGE } from '../lib/defaultOgImage';\n";
const importLineNested = "import { DEFAULT_OG_IMAGE } from '../../lib/defaultOgImage';\n";
const importLineDeep = "import { DEFAULT_OG_IMAGE } from '../../../lib/defaultOgImage';\n";

const patterns = [
  /image=\{`\$\{REACT_APP_API_URL\}\/?assets\/images\/az-logo-large\.png`\}/g,
  /image=\{`\$\{process\.env\.REACT_APP_API_URL\}\/assets\/images\/az-logo-large\.png`\}/g,
  /image=\{`\$\{REACT_APP_API_URL\}assets\/images\/az-logo-large\.png`\}/g,
];

function depth(file) {
  return file.split(path.sep).filter(Boolean).length - pagesDir.split(path.sep).filter(Boolean).length;
}

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith('.js')) out.push(p);
  }
  return out;
}

for (const file of walk(pagesDir)) {
  let s = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const re of patterns) {
    if (re.test(s)) {
      s = s.replace(re, 'image={DEFAULT_OG_IMAGE}');
      changed = true;
    }
  }
  if (!changed) continue;
  const d = depth(file);
  const imp = d <= 1 ? importLine : d === 2 ? importLineNested : importLineDeep;
  if (!s.includes('DEFAULT_OG_IMAGE')) {
    const idx = s.indexOf('\n');
    s = s.slice(0, idx + 1) + imp + s.slice(idx + 1);
  }
  fs.writeFileSync(file, s);
  console.log('updated', path.relative(pagesDir, file));
}
