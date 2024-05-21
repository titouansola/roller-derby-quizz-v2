export function getDateDifference(start: Date | string, end: Date | string) {
  return Math.floor(
    (new Date(end).getTime() - new Date(start).getTime()) /
      (1000 * 60 * 60 * 24)
  );
}
