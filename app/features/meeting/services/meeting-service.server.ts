import { SQLWrapper, and, eq, like, lt, sql } from 'drizzle-orm';
import { db } from '~/db/db.server';
import {
  InsertMeeting,
  matchTable,
  meetingAdminTable,
  meetingTable,
  refereeTable,
  userTable,
} from '~/db/schemas';
import { toMeetingDto } from '../utils/meeting-mapper';
import { SearchMeetingDto } from '../types/search-meeting-dto';
import { MeetingAdminDto } from '../types/meeting-admin-dto';
import { InternalError } from '~/features/common/types/internal-error';

class MeetingService {
  public async getUserMeetings(userId: number) {
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

  public async getUserMeetingsRefering(userId: number) {
    const rows = await db
      .select({ meetingTable })
      .from(meetingTable)
      .innerJoin(matchTable, eq(matchTable.meetingId, meetingTable.id))
      .innerJoin(refereeTable, eq(refereeTable.matchId, matchTable.id))
      .where(eq(refereeTable.userId, userId))
      .groupBy(meetingTable.id);
    //
    return rows.map(({ meetingTable }) => toMeetingDto(meetingTable));
  }

  public async getMeetingById(meetingId: number) {
    const meeting = await db.query.meetingTable.findFirst({
      where: (meetingTable) => eq(meetingTable.id, meetingId),
    });
    if (!meeting) {
      throw new InternalError(`Meeting with id ${meetingId} not found`);
    }
    return toMeetingDto(meeting);
  }

  public async searchMeetings(params: SearchMeetingDto) {
    const meetings = await db.query.meetingTable.findMany({
      where: (meetingTable) => {
        const where: SQLWrapper[] = [
          eq(meetingTable.published, true),
          eq(meetingTable.cancelled, false),
          sql`${meetingTable.endDate} > NOW()`,
        ];
        if (!!params.location) {
          where.push(like(meetingTable.location, params.location));
        }
        return and(...where);
      },
    });
    return meetings.map(toMeetingDto);
  }

  public async doChecks(
    meetingId: number,
    userId: number,
    options?: { ownership?: boolean; acceptCancelled?: boolean }
  ) {
    // Check meeting constraints
    const meeting = await db.query.meetingTable.findFirst({
      where: (meetingTable) => eq(meetingTable.id, meetingId),
    });
    if (!meeting) {
      throw new InternalError('Meeting not found');
    }
    if (!options?.acceptCancelled && meeting.cancelled) {
      throw new InternalError('Meeting is cancelled');
    }
    // Check User Rights
    const userRights = await db.query.meetingAdminTable.findFirst({
      where: (meetingAdminTable) => {
        const where = [
          eq(meetingAdminTable.meetingId, meetingId),
          eq(meetingAdminTable.userId, userId),
        ];
        if (options?.ownership) {
          where.push(eq(meetingAdminTable.role, 'OWNER'));
        }
        return and(...where);
      },
    });
    if (!userRights) {
      throw new InternalError(
        'You do not have rights to do this operation on this meeting'
      );
    }
    return userRights;
  }

  public async getMeetingAdmins(meetingId: number): Promise<MeetingAdminDto[]> {
    const meetingAdmins = await db
      .select({
        id: meetingAdminTable.id,
        meetingId: meetingAdminTable.meetingId,
        userId: meetingAdminTable.userId,
        role: meetingAdminTable.role,
        derbyName: userTable.derbyName,
      })
      .from(meetingAdminTable)
      .innerJoin(userTable, eq(meetingAdminTable.userId, userTable.id))
      .where(eq(meetingAdminTable.meetingId, meetingId));
    //
    return meetingAdmins.map(({ derbyName, ...data }) => ({
      ...data,
      derbyName: derbyName ?? '',
    }));
  }

  public async addMeetingAdmin(meetingId: number, userId: number) {
    await db
      .insert(meetingAdminTable)
      .values({ meetingId, userId, role: 'HEAD_REF' });
  }

  public async removeMeetingAdmin(id: number) {
    const admin = await db.query.meetingAdminTable.findFirst({
      where: (meetingAdminTable) => eq(meetingAdminTable.id, id),
    });
    if (!admin) {
      throw new InternalError('Meeting admin not found');
    }
    if (admin.role === 'OWNER') {
      throw new InternalError('Cannot remove owner from meeting admins');
    }
    await db.delete(meetingAdminTable).where(eq(meetingAdminTable.id, id));
  }

  public async create(meeting: InsertMeeting, userId: number) {
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
      throw new InternalError('error.no_id_provided');
    }
    await db
      .update(meetingTable)
      .set(meeting)
      .where(eq(meetingTable.id, meeting.id));
  }

  public async publishMeeting(meetingId: number) {
    await db
      .update(meetingTable)
      .set({ published: true })
      .where(eq(meetingTable.id, meetingId));
  }

  public async cancelMeeting(meetingId: number) {
    await db
      .update(meetingTable)
      .set({ cancelled: true })
      .where(eq(meetingTable.id, meetingId));
  }

  public async deleteMeeting(meetingId: number) {
    await db.delete(meetingTable).where(eq(meetingTable.id, meetingId));
  }
}

export const meetingService = new MeetingService();
