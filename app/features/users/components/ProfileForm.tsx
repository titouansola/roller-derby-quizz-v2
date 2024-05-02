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
        <Input name="firstName" label="account.first_name" />
        <Input name="lastName" label="account.last_name" />
        <Input name="pronouns" label="account.pronouns" />
        <Input name="derbyName" label="account.derby_name" />
        <Input name="derbyCV" label="account.derby_cv" type="url" />
        <Input name="email" label="account.email" />
        <Input name="country" label="account.country" />
        <Input name="license" label="account.license" />
        <Button label="save" full />
      </fieldset>
    </ValidatedForm>
  );
}
