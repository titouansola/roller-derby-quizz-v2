import { SignIn } from '@clerk/remix';

export default function Component() {
  return (
    <div>
      <h1>Sign in</h1>
      <SignIn />
    </div>
  );
}
