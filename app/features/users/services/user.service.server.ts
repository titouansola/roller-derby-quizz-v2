import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { hasRole } from '~/features/users/utils/has-role';
import { authService } from '~/features/users/services/auth.service.server';
import { Role, UserDto } from '~/features/users/types';

class UserService {
  public async getCurrentUser(args: LoaderFunctionArgs | ActionFunctionArgs) {
    const user = await authService.currentUser(args);
    if (!user) {
      throw redirect('/sign-in');
    }
    return user;
  }

  public async getCurrentIfConnected(
    args: LoaderFunctionArgs | ActionFunctionArgs
  ) {
    return authService.currentUser(args);
  }

  public async currentUserIsAdmin(
    args: LoaderFunctionArgs | ActionFunctionArgs
  ) {
    const user = await this.getCurrentUser(args);
    if (!hasRole(Role.ADMIN, user)) {
      throw redirect('/');
    }
  }

  public async currentUserIsSuperAdmin(
    args: LoaderFunctionArgs | ActionFunctionArgs
  ) {
    const user = await this.getCurrentUser(args);
    if (!hasRole(Role.SUPER_ADMIN, user)) {
      throw redirect('/');
    }
  }

  public async getUserById(userId: string) {
    return authService.getUserById(userId);
  }

  public getUsers() {
    return authService.getUsers();
  }

  public findUsers(query: string) {
    return authService.findUsers(query);
  }

  public async toggleUserAdminRole(userId: string) {
    const user = await authService.getUserById(userId);
    user.role = hasRole(Role.ADMIN, user) ? Role.REGULAR : Role.ADMIN;
    await authService.updateUser(user);
  }

  public update(user: UserDto) {
    return authService.updateUser(user);
  }
}

export const userService = new UserService();
