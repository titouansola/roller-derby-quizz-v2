import { SQLWrapper, and, eq, like } from 'drizzle-orm';
import { db } from '~/db/db.server';
import {
  InsertMeeting,
  MeetingAdminRole,
  meetingAdminTable,
  meetingTable,
} from '~/db/schemas';
import { toMeetingDto } from '../utils/meeting-mapper';
import { SearchMeetingDto } from '../types/search-meeting-dto';

class MeetingService {
  public async getUserMeetings(userId: string) {
    const rows = await db
      .select({ meetingTable })
      .from(meetingTable)
      .innerJoin(
        meetingAdminTable,
        eq(meetingAdminTable.meetingId, meetingTable.id)
      )
      .where(eq(meetingAdminTable.userId, userId));
    //
    return rows.map(({ meetingTable }) => toMeetingDto(meetingTable));
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

  public async checkUserRights(
    meetingId: number,
    userId: string,
    role?: MeetingAdminRole
  ) {
    const userRights = await db.query.meetingAdminTable.findFirst({
      where: (meetingAdminTable) => {
        const where = [
          eq(meetingAdminTable.meetingId, meetingId),
          eq(meetingAdminTable.userId, userId),
        ];
        if (role) {
          where.push(eq(meetingAdminTable.role, role));
        }
        return and(...where);
      },
    });
    if (!userRights) {
      throw new Error('You do not have rights to access this meeting');
    }
    return userRights;
  }

  public async create(meeting: InsertMeeting, userId: string) {
    const [{ meetingId }] = await db
      .insert(meetingTable)
      .values(meeting)
      .returning({ meetingId: meetingTable.id });
    //
    await db
      .insert(meetingAdminTable)
      .values({ meetingId, userId, role: 'OWNER' });
  }

  public async updateMeetingDetails(meeting: InsertMeeting) {
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
