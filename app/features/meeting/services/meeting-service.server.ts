import { SQLWrapper, and, eq, like } from 'drizzle-orm';
import { db } from '~/db/db.server';
import {
  InsertMeeting,
  MatchPositions,
  UpdateMeeting,
  meetingTable,
  refereePositionEnum,
} from '~/db/schemas';
import { toMeetingDto } from '../utils/meeting-mapper';
import { SearchMeetingDto } from '../types/search-meeting-dto';
import { TogglePositionDto } from '~/features/applications/form/toggle-position-form';

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

  public async create(meeting: Omit<InsertMeeting, 'positions'>) {
    await db.insert(meetingTable).values({
      ...meeting,
      positions: meeting.matches.map(() =>
        refereePositionEnum.enumValues.reduce(
          (acc, position) => Object.assign(acc, { [position]: null }),
          {} as MatchPositions
        )
      ),
    });
  }

  public async update(meeting: UpdateMeeting) {
    if (!meeting.id) {
      throw new Error('Meeting id is required for update');
    }
    await db
      .update(meetingTable)
      .set(meeting)
      .where(eq(meetingTable.id, meeting.id));
  }

  public async updatePositions(meetingId: number, dto: TogglePositionDto) {
    const meeting = await db.query.meetingTable.findFirst({
      where: (meetingTable) => eq(meetingTable.id, meetingId),
    });
    if (!meeting) {
      throw new Error(`Meeting with id ${meetingId} not found`);
    }
    //
    const positions = meeting.positions[dto.matchIndex][dto.position];
    const index = positions.findIndex((p) => p.userId === dto.userId);
    if (index >= 0) {
      positions.splice(index, 1);
    } else {
      positions.push({ userId: dto.userId, asGhost: dto.asGhost });
    }
    // FIXME: I don't know why but it seems that we need to wait between two sql queries (socket hang up issue)
    await new Promise((resolve) => setTimeout(resolve, 1));
    //
    await db
      .update(meetingTable)
      .set({ positions: meeting.positions })
      .where(eq(meetingTable.id, meetingId));
  }
}

export const meetingService = new MeetingService();
