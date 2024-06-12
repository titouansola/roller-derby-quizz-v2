import { and, eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import {
  InsertReferee,
  matchTable,
  refereeTable,
  userTable,
} from '~/db/schemas';
import { toMeetingReferees, toRefereePositions } from '../utils/referee-mapper';

class RefereeService {
  public async create(referee: InsertReferee) {
    await db.insert(refereeTable).values(referee);
  }

  public async delete(id: number) {
    await db.delete(refereeTable).where(eq(refereeTable.id, id));
  }

  public async fetchMeetingReferees(meetingId: number) {
    const rows = await db
      .select({
        user: userTable,
        referee: refereeTable,
      })
      .from(refereeTable)
      .innerJoin(userTable, eq(refereeTable.userId, userTable.id))
      .where(eq(refereeTable.meetingId, meetingId));
    //
    return toMeetingReferees(rows);
  }

  public async fetchMyPositions(userId: number, meetingId: number) {
    const rows = await db
      .select({ referee: refereeTable, match: matchTable })
      .from(refereeTable)
      .innerJoin(matchTable, eq(matchTable.id, refereeTable.matchId))
      .where(
        and(
          eq(refereeTable.userId, userId),
          eq(matchTable.meetingId, meetingId)
        )
      );
    return toRefereePositions(rows);
  }
}

export const refereeService = new RefereeService();
