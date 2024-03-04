import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Roller Derby Quizz" },
    { name: "description", content: "Welcome to Roller Derby Quizz!" },
  ];
};

export default function Index() {
  return <main>Landing Page</main>;
}
