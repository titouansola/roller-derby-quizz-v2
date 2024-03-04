import { FormEventHandler } from "react";
import { QuestionDto } from "~/common/models/dto/question.dto";

export function MainForm({
  question,
  checked,
  result,
  onToggle,
  onConfirm,
}: {
  question: QuestionDto;
  checked: number[];
  result: boolean | null;
  onConfirm: FormEventHandler;
  onToggle: (index: number) => void;
}) {
  return (
    <form onSubmit={onConfirm}>
      <h3>{question.label}</h3>
      {question.answers.map((answer, index) => (
        <div key={index}>
          <input
            id={answer.label}
            type="checkbox"
            checked={checked.includes(index)}
            onChange={() => onToggle(index)}
          />
          <label htmlFor={answer.label}>{answer.label}</label>
          {result !== null && <span>{answer.isRight ? "true" : "false"}</span>}
        </div>
      ))}
      {result !== null && (result ? "Bravo !" : "Raté")}
      <button type="submit" disabled={checked.length === 0}>
        Confirm
      </button>
    </form>
  );
}
