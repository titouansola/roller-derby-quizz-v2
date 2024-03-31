import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import { ExperienceForm } from '~/features/experience/components/ExperienceForm';
import { experienceFormValidator } from '~/features/experience/form/experience-form';
import { experienceService } from '~/features/experience/services/experience-service.server';
import { userService } from '~/features/users/services/user.service.server';

export default function Component() {
  const { t } = useTranslation();
  //
  return (
    <>
      <h1>{t('dashboard.experiences.create')}</h1>
      <ExperienceForm />
    </>
  );
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const formData = await args.request.formData();
  const { data, error } = await experienceFormValidator.validate(formData);
  if (error || !data) {
    throw new Error('MALFORMED_FORM_REQUEST');
  }
  await experienceService.insertExperience({ ...data, userId: user.id });
  return redirect('/dashboard');
}
