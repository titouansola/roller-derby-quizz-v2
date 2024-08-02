import { SignUp } from '@clerk/remix';
import { SignLayout } from '~/features/users/components/SignLayout';

export default function Component() {
  return (
    <SignLayout>
      <SignUp />
    </SignLayout>
  );
}
