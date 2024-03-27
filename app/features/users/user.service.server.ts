import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { authService } from '~/features/users/auth.service.server';
import { hasRole } from '~/features/users/utils/has-role';
import { Role, UserMetadata } from '~/features/users/user-metadata.type';

class UserService {
  public async currentUserIsAdmin(
    args: LoaderFunctionArgs | ActionFunctionArgs
  ) {
    const user = await authService.currentUser(args);
    if (!hasRole(Role.ADMIN, user)) {
      throw redirect('/');
    }
  }

  public async currentUserIsSuperAdmin(
    args: LoaderFunctionArgs | ActionFunctionArgs
  ) {
    const user = await authService.currentUser(args);
    if (!hasRole(Role.SUPER_ADMIN, user)) {
      throw redirect('/');
    }
  }

  public getUsers() {
    return authService.getUsers();
  }

  public async toggleUserAdminRole(userId: string) {
    const user = await authService.getUserById(userId);
    const metadata: UserMetadata = user.publicMetadata ?? {};
    //
    if (hasRole(Role.ADMIN, user)) {
      metadata.role = null;
    } else {
      metadata.role = Role.ADMIN;
    }
    //
    await this.updateUserMetadata(userId, metadata);
  }

  public updateUserMetadata(userId: string, metadata: UserMetadata) {
    return authService.updateUser(userId, metadata);
  }
}

export const userService = new UserService();
