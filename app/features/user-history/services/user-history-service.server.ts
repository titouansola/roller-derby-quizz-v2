import { desc, eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertUserHistory, userHistoryTable } from '~/db/schemas';

export class UserHistoryService {
  public getUserHistory(userId: string) {
    return db.query.userHistoryTable.findMany({
      where: eq(userHistoryTable.userId, userId),
      orderBy: desc(userHistoryTable.date),
    });
  }

  public addUserHistory(userHistory: InsertUserHistory) {
    return db.insert(userHistoryTable).values(userHistory);
  }
}

export const userHistoryService = new UserHistoryService();
