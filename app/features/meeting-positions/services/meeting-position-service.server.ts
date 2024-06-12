import { eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertMeetingPosition, meetingPositionTable } from '~/db/schemas';

class MeetingPositionService {
  public async getMeetingPositions(meetingId: number) {
    return db.query.meetingPositionTable.findMany({
      where: eq(meetingPositionTable.meetingId, meetingId),
    });
  }

  public async updateMeetingPositions(
    meetingId: number,
    positions: InsertMeetingPosition[]
  ) {
    await db
      .delete(meetingPositionTable)
      .where(eq(meetingPositionTable.id, meetingId));
    await db.insert(meetingPositionTable).values(positions);
  }
}

export const meetingPositionService = new MeetingPositionService();
