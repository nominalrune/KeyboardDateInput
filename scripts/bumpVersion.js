import fs from 'fs';
import path from 'path';

const pkgPath = path.resolve(__dirname, '../package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

const versionParts = pkg.version.split('.').map(Number);
if (versionParts.length !== 3) {
  throw new Error('Invalid version format in package.json');
}
versionParts[2] += 1; // bump patch
pkg.version = versionParts.join('.');

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`Version bumped to ${pkg.version}`);