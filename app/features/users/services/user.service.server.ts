import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { getAuth } from '@clerk/remix/ssr.server';
import { and, count, eq, like } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertUser, ListedUser, userTable } from '~/db/schemas';
import { hasRole } from '~/features/users/utils/has-role';
import { toConnectedUser } from '../utils/user-mapper';
import { RouteEnum } from '~/features/ui/enums/route-enum';

class UserService {
  public async getUserId(args: LoaderFunctionArgs | ActionFunctionArgs) {
    const { userId } = await getAuth(args);
    return userId;
  }

  public async getConnectedOrRedirect(
    args: LoaderFunctionArgs | ActionFunctionArgs
  ) {
    const userId = await this.getUserId(args);
    if (!userId) {
      throw redirect(RouteEnum.SIGN_IN);
    }
    return this.getUserByExternalId(userId);
  }

  public async getIfConnected(args: LoaderFunctionArgs | ActionFunctionArgs) {
    const userId = await this.getUserId(args);
    if (!userId) {
      return null;
    }
    return this.getUserByExternalId(userId);
  }

  public async currentUserIsAdmin(
    args: LoaderFunctionArgs | ActionFunctionArgs
  ) {
    const user = await this.getConnectedOrRedirect(args);
    if (!hasRole('ADMIN', user)) {
      throw redirect(RouteEnum.ROOT);
    }
  }

  public async currentUserIsSuperAdmin(
    args: LoaderFunctionArgs | ActionFunctionArgs
  ) {
    const user = await this.getConnectedOrRedirect(args);
    if (!hasRole('SUPER_ADMIN', user)) {
      throw redirect(RouteEnum.ROOT);
    }
  }

  public async isEmailInUse(email: string) {
    const [row] = await db
      .select({ count: count(userTable.id) })
      .from(userTable)
      .where(eq(userTable.email, email));
    return row.count > 0;
  }

  public getListedUsers(): Promise<ListedUser[]> {
    return db
      .select({
        id: userTable.id,
        civilName: userTable.civilName,
        derbyName: userTable.derbyName,
        role: userTable.role,
      })
      .from(userTable);
  }

  public async findUsers(query: string): Promise<ListedUser[]> {
    return db
      .select({
        id: userTable.id,
        civilName: userTable.civilName,
        derbyName: userTable.derbyName,
        role: userTable.role,
      })
      .from(userTable)
      .where(
        and(
          like(userTable.civilName, `%${query}`),
          like(userTable.derbyName, `%${query}`)
        )
      )
      .limit(10);
  }

  public async toggleUserAdminRole(userId: number) {
    // TODO: See if there's a faster way to do this (one request)
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.id, userId),
    });
    if (!user) {
      throw new Error('User not found');
    }
    user.role = hasRole('ADMIN', user) ? 'REGULAR' : 'ADMIN';
    await db.update(userTable).set(user).where(eq(userTable.id, userId));
  }

  public async getOrCreate(values: InsertUser) {
    const [{ id }] = await db
      .insert(userTable)
      .values(values)
      .onConflictDoNothing({ target: userTable.email })
      .returning({ id: userTable.id });
    return id;
  }

  public async createOrUpdate(values: InsertUser) {
    const [{ id }] = await db
      .insert(userTable)
      .values(values)
      .onConflictDoUpdate({
        target: userTable.email,
        set: values,
      })
      .returning({ id: userTable.id });
    return id;
  }

  public update(user: InsertUser) {
    if (!user.id) {
      throw new Error('User id is required');
    }
    return db.update(userTable).set(user).where(eq(userTable.id, user.id));
  }

  private async getUserByExternalId(externalId: string) {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.externalId, externalId),
    });
    if (!user) {
      throw new Error('User not found');
    }
    return toConnectedUser(user);
  }
}

export const userService = new UserService();
