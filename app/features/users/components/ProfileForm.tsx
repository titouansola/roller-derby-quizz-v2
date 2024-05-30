import { useFetcher } from '@remix-run/react';
import { SignOutButton } from '@clerk/remix';
import { ValidatedForm } from 'remix-validated-form';
import { ConnectedUser } from '~/db/schemas';
import { Input } from '~/features/ui/form/Input';
import { Button } from '~/features/ui/components/Button';
import { ProfileFormFieldset } from './ProfileFormFieldset';
import { profileValidator } from '../form/profile-form';

export function ProfileForm({ user }: { user: ConnectedUser }) {
  const fetcher = useFetcher();
  //
  return (
    <>
      <ValidatedForm
        method="POST"
        validator={profileValidator}
        fetcher={fetcher}
        defaultValues={user}
      >
        <fieldset>
          <Input name="id" hidden />
          <Input name="externalId" hidden />
          <Input name="email" hidden />
          <Input name="role" hidden />

          <ProfileFormFieldset />

          <Button label="save" full />
        </fieldset>
      </ValidatedForm>
      <div className="mt-8">
        <SignOutButton>
          <Button label="sign_out" full />
        </SignOutButton>
      </div>
    </>
  );
}
