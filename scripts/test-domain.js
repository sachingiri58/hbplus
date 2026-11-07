// Run with: npm test
const fs = require('fs');
const src = fs.readFileSync(__dirname + '/../src/utils/validateDomain.js', 'utf8').replace('export function', 'function');
const isAllowedEmail = new Function(src + '; return isAllowedEmail;')();

const cases = [
  ['example@hbplus.fit', true],
  ['EXAMPLE@HBPLUS.FIT', true],
  ['  a@hbplus.fit ', true],
  ['example@gmail.com', false],
  ['hbplus.fit@gmail.com', false],
  ['a@hbplus.fit.evil.com', false],
  ['a@evilhbplus.fit', false],
  ['@hbplus.fit', false],
  ['', false],
  [null, false],
];
let failed = 0;
for (const [email, expected] of cases) {
  const got = isAllowedEmail(email, 'hbplus.fit');
  if (got !== expected) { failed++; console.error('FAIL', email, 'expected', expected, 'got', got); }
}
if (failed) process.exit(1);
console.log(`All ${cases.length} domain checks passed`);
