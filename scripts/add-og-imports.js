const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../pages');

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith('.js')) out.push(p);
  }
  return out;
}

function relImport(file) {
  const rel = path.relative(path.dirname(file), path.join(__dirname, '../lib/defaultOgImage.js'));
  const normalized = rel.split(path.sep).join('/');
  const withoutExt = normalized.replace(/\.js$/, '');
  return `import { DEFAULT_OG_IMAGE } from '${withoutExt.startsWith('.') ? withoutExt : './' + withoutExt}';\n`;
}

for (const file of walk(pagesDir)) {
  let s = fs.readFileSync(file, 'utf8');
  if (!s.includes('DEFAULT_OG_IMAGE')) continue;
  if (s.includes('defaultOgImage')) continue;
  const imp = relImport(file);
  const idx = s.indexOf('\n');
  s = s.slice(0, idx + 1) + imp + s.slice(idx + 1);
  fs.writeFileSync(file, s);
  console.log('import added', path.relative(pagesDir, file));
}
