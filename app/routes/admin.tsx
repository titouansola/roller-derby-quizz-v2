import { Outlet } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/node';
import { userService } from '~/features/users/services/user.service.server';
import { HasRole } from '~/features/users/components/HasRole';
import { Layout } from '~/features/ui/layout/Layout';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';

export async function loader(args: LoaderFunctionArgs) {
  await userService.currentUserIsAdmin(args);
  return null;
}

export default function Component() {
  return (
    <>
      <NavigationBar>
        <NavigationBar.Links>
          <NavigationBar.Link path="questions" label="questions" />
          <HasRole userRole={'SUPER_ADMIN'}>
            <NavigationBar.Link path="question-tags" label="question_tags" />
            <NavigationBar.Link path="users" label="users" />
          </HasRole>
        </NavigationBar.Links>
      </NavigationBar>

      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}
