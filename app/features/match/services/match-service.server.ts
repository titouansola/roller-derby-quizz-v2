import { eq, not, sql } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertMatch, matchTable } from '~/db/schemas';
import { toMatchDto } from '../utils/match-mapper';

class MatchService {
  public async getMeetingMatches(meetingId: number) {
    const matches = await db.query.matchTable.findMany({
      where: eq(matchTable.meetingId, meetingId),
    });
    return matches.map(toMatchDto);
  }

  public async create(match: InsertMatch) {
    await db.insert(matchTable).values(match);
  }

  public async update(match: InsertMatch) {
    if (!match.id) {
      throw new Error('Match ID is required');
    }
    await db.update(matchTable).set(match).where(eq(matchTable.id, match.id));
  }

  public async delete(id: number) {
    await db.delete(matchTable).where(eq(matchTable.id, id));
  }

  public async toggleMatchValidation(id: number) {
    await db
      .update(matchTable)
      .set({ validated: not(matchTable.validated) })
      .where(eq(matchTable.id, id));
  }
}

export const matchService = new MatchService();
