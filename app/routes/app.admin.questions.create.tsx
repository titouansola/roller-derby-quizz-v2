import { validationError } from 'remix-validated-form';
import { handleErrors } from '~/features/common/utils/handle-errors';
import { QuestionForm } from '~/features/questions/components/QuestionForm';
import { questionValidator } from '~/features/questions/form/question-form';
import { questionService } from '~/features/questions/services/question-service.server';
import { toastService } from '~/features/toasts/services/toast.service.server';
import { userService } from '~/features/users/services/user.service.server';

export default function Component() {
  return <QuestionForm />;
}

export const action = handleErrors(async (args) => {
  await userService.currentUserIsAdmin(args);
  const formData = await args.request.formData();
  const { data, error } = await questionValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await questionService.create(data);
  return toastService.createResponseCreatedToast();
});
