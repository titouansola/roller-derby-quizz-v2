import { ActionFunctionArgs } from "@remix-run/node";
import { QuestionForm } from "~/common/components/form/QuestionForm";
import { questionValidator } from "~/common/models/form/question.form";
import { checkAuth } from "~/common/services/auth.server";
import { questionService } from "~/common/services/question.server";

export default function Component() {
  return <QuestionForm />;
}

export async function action(args: ActionFunctionArgs) {
  await checkAuth(args);
  const formData = await args.request.formData();
  const { data, error } = await questionValidator.validate(formData);
  if (!!error) {
    throw new Error("BAD_REQUEST");
  }
  await questionService.create(data);
  return null;
}
