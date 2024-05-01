import { SQLWrapper, and, eq, like } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertMeeting, meetingAdminTable, meetingTable } from '~/db/schemas';
import { toMeetingDto } from '../utils/meeting-mapper';
import { SearchMeetingDto } from '../types/search-meeting-dto';
import { MeetingAdminDto } from '../types/meeting-admin-dto';
import { userService } from '~/features/users/services/user.service.server';
import { toMeetingAdminDto } from '../utils/meeting-admin-mapper';

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

  public async doChecks(
    meetingId: number,
    userId: string,
    options?: { ownership?: boolean; acceptCancelled?: boolean }
  ) {
    // Check meeting constraints
    const meeting = await db.query.meetingTable.findFirst({
      where: (meetingTable) => eq(meetingTable.id, meetingId),
    });
    if (!meeting) {
      throw new Error('Meeting not found');
    }
    if (!options?.acceptCancelled && meeting.cancelled) {
      throw new Error('Meeting is cancelled');
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
      throw new Error(
        'You do not have rights to do this operation on this meeting'
      );
    }
    return userRights;
  }

  public async getMeetingAdmins(meetingId: number) {
    const admins = await db.query.meetingAdminTable.findMany({
      where: (meetingAdminTable) => eq(meetingAdminTable.meetingId, meetingId),
    });
    const adminDtos: MeetingAdminDto[] = [];
    for (const admin of admins) {
      const user = await userService.getUserById(admin.userId);
      adminDtos.push(toMeetingAdminDto(admin, user));
    }
    return adminDtos;
  }

  public async addMeetingAdmin(meetingId: number, userId: string) {
    await db
      .insert(meetingAdminTable)
      .values({ meetingId, userId, role: 'HEAD_REF' });
  }

  public async removeMeetingAdmin(id: number) {
    const admin = await db.query.meetingAdminTable.findFirst({
      where: (meetingAdminTable) => eq(meetingAdminTable.id, id),
    });
    if (!admin) {
      throw new Error('Meeting admin not found');
    }
    if (admin.role === 'OWNER') {
      throw new Error('Cannot remove owner from meeting admins');
    }
    await db.delete(meetingAdminTable).where(eq(meetingAdminTable.id, id));
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

  public async cancelMeeting(meetingId: number) {
    await db
      .update(meetingTable)
      .set({ cancelled: true })
      .where(eq(meetingTable.id, meetingId));
  }
}

export const meetingService = new MeetingService();
