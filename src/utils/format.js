export function formatDate(value) {
  if (!value) return '-';
  const d = typeof value.toDate === 'function' ? value.toDate() : new Date(value);
  if (Number.isNaN(d.getTime())) return '-';
  return d.toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function initials(name = '') {
  return name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || '?';
}
