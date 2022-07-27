function isNumeric(value: string | number) {
  if (typeof value === 'number') return !isNaN(value);
  if (!value) return false;
  return !isNaN(parseInt(value));
}
