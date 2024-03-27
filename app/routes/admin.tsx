import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/remix';
import { Link, Outlet } from '@remix-run/react';

export default function Component() {
  return (
    <div>
      <SignedIn>
        Admin
        <div>
          <Link to={'users'}>Utilisateurs</Link>
        </div>
        <div>
          <Link to={'questions'}>Questions</Link>
        </div>
        <Outlet />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
