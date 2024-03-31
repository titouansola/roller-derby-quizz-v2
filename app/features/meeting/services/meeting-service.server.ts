import { eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import {
  InsertApplication,
  InsertMeeting,
  SelectMeeting,
  applicationTable,
  meetingTable,
} from '~/db/schemas';
import { MeetingDto } from '../types/meeting-dto';
import { userService } from '~/features/users/services/user.service.server';
import { toMeetingDto } from '../utils/meeting-mapper';
import { toApplicationDto } from '../utils/application-mapper';

class MeetingService {
  public async getUserMeetings(userId: string) {
    // Request
    const rows = await db
      .select({ meeting: meetingTable, application: applicationTable })
      .from(meetingTable)
      .leftJoin(
        applicationTable,
        eq(meetingTable.id, applicationTable.meetingId)
      )
      .where(eq(meetingTable.ownerId, userId));
    // Agregate
    const meetingMap = new Map<number, MeetingDto>();
    for (const { meeting, application } of rows) {
      const meetingDto = meetingMap.get(meeting.id) ?? toMeetingDto(meeting);
      meetingMap.set(meeting.id, meetingDto);
      if (application) {
        const user = await userService.getUserById(application.userId);
        meetingDto.applications.push(toApplicationDto(application, user));
      }
    }
    //
    return Array.from(meetingMap.values());
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

  public async createMeeting(meeting: InsertMeeting) {
    await db.insert(meetingTable).values(meeting);
  }

  public async updateMeeting(meeting: SelectMeeting) {
    await db
      .update(meetingTable)
      .set(meeting)
      .where(eq(meetingTable.id, meeting.id));
  }

  public async addApplicationToMeeting(application: InsertApplication) {
    await db.insert(applicationTable).values(application);
  }
}

export const meetingService = new MeetingService();
