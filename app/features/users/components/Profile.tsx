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
      validator={profileValidator}
      fetcher={fetcher}
      defaultValues={user}
    >
      <Input name="id" hidden />
      <Input name="role" hidden />
      <Input name="firstName" label="dashboard.firstName" />
      <Input name="lastName" label="dashboard.lastName" />
      <Input name="derbyName" label="dashboard.derbyName" />
      <Input name="email" label="dashboard.email" />
      <Input name="pronouns" label="dashboard.pronouns" />
      <Input name="country" label="dashboard.country" />
      <Input name="license" label="dashboard.license" />
      <FetcherSubmitButton actionName="save-profile" />
    </ValidatedForm>
  );
}
