import { useFetcher } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Input } from '~/features/ui/form/Input';
import { UserDto } from '../types';
import { profileValidator } from '../form/profile-form';

export function Profile({ user }: { user: UserDto }) {
  const fetcher = useFetcher();
  //
  return (
    <ValidatedForm
      method="POST"
      validator={profileValidator}
      fetcher={fetcher}
      defaultValues={user}
    >
      <Input name="id" hidden />
      <Input name="role" hidden />
      <Input name="firstName" label="profile.firstName" />
      <Input name="lastName" label="profile.lastName" />
      <Input name="derbyName" label="profile.derbyName" />
      <Input name="email" label="profile.email" />
      <Input name="pronouns" label="profile.pronouns" />
      <Input name="country" label="profile.country" />
      <Input name="license" label="profile.license" />
      <FetcherSubmitButton actionName="save-profile" />
    </ValidatedForm>
  );
}
