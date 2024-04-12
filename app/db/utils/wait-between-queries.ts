export function waitBetweenQueries() {
  return new Promise((resolve) => setTimeout(resolve, 1));
}
