export function formatReadingTime(minutes) {
  return `${minutes} min read`;
}

// `lang` is optional and will default to the current user agent locale
export function formatPostDate(date, lang) {
  if (typeof Date.prototype.toLocaleDateString !== 'function') {
    return date;
  }

  date = new Date(date);
  const args = [lang, {day: 'numeric', month: 'long', year: 'numeric'}].filter(
    Boolean
  );
  return date.toLocaleDateString(...args);
}
