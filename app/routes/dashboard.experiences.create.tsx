import { SignedIn } from '@clerk/remix';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { ExperienceForm } from '~/features/experience/components/ExperienceForm';
import { experienceFormValidator } from '~/features/experience/form/experience-form';
import { experienceService } from '~/features/experience/services/experience-service.server';
import { userService } from '~/features/users/services/user.service.server';

export default function Component() {
  const { t } = useTranslation();
  //
  return (
    <SignedIn>
      <h1>{t('experiences.create')}</h1>
      <ExperienceForm />
    </SignedIn>
  );
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const formData = await args.request.formData();
  const { data, error } = await experienceFormValidator.validate(formData);
  if (error || !data) {
    return validationError(error);
  }
  await experienceService.insertExperience({ ...data, userId: user.id });
  return redirect('/dashboard');
}
