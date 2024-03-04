import { QuestionDto } from "~/common/models/dto/question.dto";
import { useRunner } from "../hooks/useRunner";
import { End } from "./End";
import { MainForm } from "./MainForm";

export function Runner({ questions }: { questions: QuestionDto[] }) {
  const runner = useRunner(questions);
  return !runner.question ? (
    <End {...runner} total={questions.length} />
  ) : (
    <MainForm {...runner} />
  );
}
