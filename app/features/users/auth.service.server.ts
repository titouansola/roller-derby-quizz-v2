import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { getAuth } from '@clerk/remix/ssr.server';
import { clerkClient } from '~/features/users/utils/get-clerk-client.server';

class AuthService {
  private userClient = clerkClient.users;

  public async currentUser(args: LoaderFunctionArgs | ActionFunctionArgs) {
    const auth = await getAuth(args);
    if (!auth.userId) {
      throw redirect('/sign-in');
    }
    return this.userClient.getUser(auth.userId);
  }

  public getUserById(userId: string) {
    return this.userClient.getUser(userId);
  }

  public getUsers() {
    return this.userClient.getUserList();
  }

  public async updateUser(userId: string, publicMetadata: UserPublicMetadata) {
    await this.userClient.updateUserMetadata(userId, { publicMetadata });
  }
}

export const authService = new AuthService();
