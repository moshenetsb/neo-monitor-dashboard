export function getValidDates(start?: string | null, end?: string | null) {
  const today = new Date().toLocaleString("sv").split(" ")[0];

  function isValidDate(str?: string | null) {
    if (!str) return false;
    return new Date(str).toLocaleString("sv").startsWith(str);
  }

  let rawStart = start && isValidDate(start) ? start : today;
  let rawEnd = end && isValidDate(end) ? end : today;

  if (rawStart > rawEnd) [rawStart, rawEnd] = [rawEnd, rawStart];

  return { rawStart, rawEnd, isCorrect: start === rawStart && end === rawEnd };
}
