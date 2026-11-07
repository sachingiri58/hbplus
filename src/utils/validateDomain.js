/**
 * Domain validation. Pure function, easy to test.
 * - Compares the part AFTER the last "@" so "x@hbplus.fit.evil.com" and
 *   "hbplus.fit@gmail.com" are both rejected.
 * - Case-insensitive, trims whitespace.
 */
export function isAllowedEmail(email, allowedDomain) {
  if (typeof email !== 'string') return false;
  const value = email.trim().toLowerCase();
  const at = value.lastIndexOf('@');
  if (at < 1) return false;
  return value.slice(at + 1) === String(allowedDomain).trim().toLowerCase();
}
