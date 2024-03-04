import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { questionService } from "~/common/services/question.server";
import { Runner } from "./components/Runner";

export async function loader() {
  const questions = await questionService.getAll();
  return json(questions);
}

export default function Component() {
  const questions = useLoaderData<typeof loader>();

  if (questions.length === 0) {
    return <div>No question available!</div>;
  }

  return (
    <main>
      <Runner questions={questions} />
    </main>
  );
}
