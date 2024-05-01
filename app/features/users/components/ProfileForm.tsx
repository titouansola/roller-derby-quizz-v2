import { useFetcher } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import { Input } from '~/features/ui/form/Input';
import { Button } from '~/features/ui/components/Button';
import { profileValidator } from '../form/profile-form';
import { UserDto } from '../types';

export function ProfileForm({ user }: { user: UserDto }) {
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
        <Button label="save" full />
      </fieldset>
    </ValidatedForm>
  );
}
