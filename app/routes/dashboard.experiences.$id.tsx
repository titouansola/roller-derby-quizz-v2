import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { ExperienceForm } from '~/features/experience/components/ExperienceForm';
import { experienceFormValidator } from '~/features/experience/form/experience-form';
import { experienceService } from '~/features/experience/services/experience-service.server';
import { userService } from '~/features/users/services/user.service.server';

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  if (!id) {
    return redirect('/dashboard');
  }
  const experience = await experienceService.getExperienceById(parseInt(id));
  return json(experience);
}

export default function Component() {
  const experience = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  //
  return (
    <>
      <h1>{t('experiences.update')}</h1>
      <ExperienceForm experience={experience} />
    </>
  );
}

export async function action(args: ActionFunctionArgs) {
  const user = await userService.getCurrentUser(args);
  const formData = await args.request.formData();
  const { data, error } = await experienceFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await experienceService.updateExperience({
    id: data.id!,
    userId: user.id,
    ...data,
    date: data.date ?? null,
    location: data.location ?? null,
    notes: data.notes ?? null,
  });
  return redirect('/dashboard');
}
