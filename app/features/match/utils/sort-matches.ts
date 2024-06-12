export function sortMatches<T extends { date: string; time: string }>(
  matches: T[]
) {
  const matchMap = new Map<string, T[]>();
  matches.forEach((match) => {
    if (!matchMap.has(match.date)) {
      matchMap.set(match.date, []);
    }
    matchMap.get(match.date)!.push(match);
  });
  Array.from(matchMap.values()).forEach((matches) => {
    matches.sort((a, b) => a.time.localeCompare(b.time));
  });
  //
  const matchMapEntries = Array.from(matchMap.entries()).sort(([a], [b]) =>
    new Date(a) > new Date(b) ? 1 : -1
  );
  //
  return matchMapEntries;
}
