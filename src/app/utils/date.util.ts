/**
 * Returns an ISO (yyyy-mm-dd) date string for the given day-of-month,
 * within the current month/year.
 */
export function isoInCurrentMonth(day: number): string {
  const d = new Date();
  d.setDate(day);
  return d.toISOString().slice(0, 10);
}
