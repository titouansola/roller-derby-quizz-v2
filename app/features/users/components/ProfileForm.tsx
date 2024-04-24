import { useFetcher } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import { Input } from '~/features/ui/form/Input';
import { profileValidator } from '../form/profile-form';
import { UserDto } from '../types';

export function ProfileForm({ user }: { user: UserDto }) {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  //
  return (
    <ValidatedForm
      method="POST"
      validator={profileValidator}
      fetcher={fetcher}
      defaultValues={user}
    >
      <fieldset>
        <Input name="id" hidden />
        <Input name="role" hidden />
        <Input name="firstName" label="profile.first_name" />
        <Input name="lastName" label="profile.last_name" />
        <Input name="pronouns" label="profile.pronouns" />
        <Input name="derbyName" label="profile.derby_name" />
        <Input name="derbyCV" label="profile.derby_cv" type="url" />
        <Input name="email" label="profile.email" />
        <Input name="country" label="profile.country" />
        <Input name="license" label="profile.license" />
      </fieldset>
      <button className="btn full">{t('save')}</button>
    </ValidatedForm>
  );
}
