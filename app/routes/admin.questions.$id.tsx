import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { QuestionForm } from "~/common/components/form/QuestionForm";
import { questionValidator } from "~/common/models/form/question.form";
import { checkAuth } from "~/common/services/auth.server";
import { questionService } from "~/common/services/question.server";

function goBack() {
  return redirect("/admin/questions");
}

export async function loader(args: LoaderFunctionArgs) {
  await checkAuth(args);
  const id = args.params.id!;
  const question = await questionService.get(id);
  return !question ? goBack() : json(question);
}

export default function Component() {
  const question = useLoaderData<typeof loader>();
  return <QuestionForm question={question} />;
}

export async function action(args: ActionFunctionArgs) {
  await checkAuth(args);
  const formData = await args.request.formData();
  const { data, error } = await questionValidator.validate(formData);
  if (!!error) {
    throw new Error("BAD_REQUEST");
  }
  await questionService.update(data);
  return goBack();
}
