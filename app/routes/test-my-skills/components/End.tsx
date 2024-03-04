export function End({
  score,
  total,
  hardReset,
}: {
  score: number;
  total: number;
  hardReset: () => void;
}) {
  return (
    <div>
      <h3>End</h3>
      <p>
        Score : {score} / {total}
      </p>
      <button onClick={hardReset}>Restart</button>
    </div>
  );
}
