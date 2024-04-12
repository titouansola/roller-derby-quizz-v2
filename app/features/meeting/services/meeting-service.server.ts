import { SQLWrapper, and, eq, like } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertMeeting, meetingTable } from '~/db/schemas';
import { toMeetingDto } from '../utils/meeting-mapper';
import { SearchMeetingDto } from '../types/search-meeting-dto';

class MeetingService {
  public async getUserMeetings(userId: string) {
    const meetings = await db.query.meetingTable.findMany({
      where: (meetingTable) => eq(meetingTable.ownerId, userId),
    });
    return meetings.map(toMeetingDto);
  }

  public async getMeetingById(meetingId: number) {
    const meeting = await db.query.meetingTable.findFirst({
      where: (meetingTable) => eq(meetingTable.id, meetingId),
    });
    if (!meeting) {
      throw new Error(`Meeting with id ${meetingId} not found`);
    }
    return toMeetingDto(meeting);
  }

  public async searchMeetings(params: SearchMeetingDto) {
    const meetings = await db.query.meetingTable.findMany({
      where: (meetingTable) => {
        const where: SQLWrapper[] = [];
        if (!!params.location) {
          where.push(like(meetingTable.location, params.location));
        }
        return and(...where);
      },
    });
    return meetings.map(toMeetingDto);
  }

  public async create(meeting: InsertMeeting) {
    await db.insert(meetingTable).values(meeting);
  }

  public async update(meeting: InsertMeeting) {
    if (!meeting.id) {
      throw new Error('Meeting id is required for update');
    }
    await db
      .update(meetingTable)
      .set(meeting)
      .where(eq(meetingTable.id, meeting.id));
  }
}

export const meetingService = new MeetingService();
