import { Outlet } from '@remix-run/react';
import { SignedIn } from '@clerk/remix';
import { Layout } from '~/features/ui/layout/Layout';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';
import { RouteEnum } from '~/features/ui/enums/route-enum';

export default function Component() {
  return (
    <SignedIn>
      <NavigationBar>
        <NavigationBar.Links>
          <NavigationBar.Link
            label="account.information"
            path={RouteEnum.ACCOUNT_INFORMATION}
          />
          <NavigationBar.Link
            label="menu.minimal_skills"
            path={RouteEnum.ACCOUNT_HISTORY}
          />
        </NavigationBar.Links>
      </NavigationBar>
      <Layout>
        <Outlet />
      </Layout>
    </SignedIn>
  );
}
