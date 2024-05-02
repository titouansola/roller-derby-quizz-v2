import { Outlet } from '@remix-run/react';
import { SignedIn } from '@clerk/remix';
import { Layout } from '~/features/ui/layout/Layout';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';

export default function Component() {
  return (
    <SignedIn>
      <NavigationBar>
        <NavigationBar.Links>
          <NavigationBar.Link label="account.information" path="information" />
          <NavigationBar.Link label="menu.minimal_skills" path="history" />
        </NavigationBar.Links>
      </NavigationBar>
      <Layout>
        <Outlet />
      </Layout>
    </SignedIn>
  );
}
