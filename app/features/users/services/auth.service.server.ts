import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { getAuth } from '@clerk/remix/ssr.server';
import { createClerkClient } from '@clerk/remix/api.server';
import { UserDto } from '../types';
import { toUser, toUserMetadata } from '../utils/user-mapper';

class AuthService {
  private userClient = createClerkClient({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  }).users;

  public async currentUser(args: LoaderFunctionArgs | ActionFunctionArgs) {
    const auth = await getAuth(args);
    if (!auth.userId) {
      return null;
    }
    const user = await this.userClient.getUser(auth.userId);
    return toUser(user);
  }

  public async getUserById(userId: string) {
    const user = await this.userClient.getUser(userId);
    return toUser(user);
  }

  public async getUsers() {
    const users = await this.userClient.getUserList();
    return users.map(toUser);
  }

  public async findUsers(query: string) {
    const users = await this.userClient.getUserList({ query, limit: 10 });
    return users.map(toUser);
  }

  public async updateUser(user: UserDto) {
    const publicMetadata = toUserMetadata(user);
    await this.userClient.updateUser(user.id, {
      firstName: user.firstName,
      lastName: user.lastName,
    });
    await this.userClient.updateUserMetadata(user.id, { publicMetadata });
  }
}

export const authService = new AuthService();
