import { asc, eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertUserHistory, userHistoryTable } from '~/db/schemas';

class UserHistoryService {
  public getUserHistory(userId: string) {
    return db.query.userHistoryTable.findMany({
      where: eq(userHistoryTable.userId, userId),
      orderBy: asc(userHistoryTable.date),
      limit: 10,
    });
  }

  public addUserHistory(userHistory: InsertUserHistory) {
    return db.insert(userHistoryTable).values(userHistory);
  }
}

export const userHistoryService = new UserHistoryService();
