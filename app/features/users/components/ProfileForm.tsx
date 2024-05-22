import { redirect, useFetcher } from '@remix-run/react';
import { ValidatedForm } from 'remix-validated-form';
import { ConnectedUser } from '~/db/schemas';
import { Input } from '~/features/ui/form/Input';
import { Button } from '~/features/ui/components/Button';
import { profileValidator } from '../form/profile-form';
import { ProfileFormFieldset } from './ProfileFormFieldset';
import { SignOutButton } from '@clerk/remix';
import { RouteEnum } from '~/features/ui/enums/route-enum';

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
        <SignOutButton
          signOutCallback={() => {
            redirect(RouteEnum.ROOT);
          }}
        >
          <Button label="sign_out" full />
        </SignOutButton>
      </div>
    </>
  );
}
