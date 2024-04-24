import { and, eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import {
  ApplicationStatus,
  InsertApplication,
  InsertApplicationPosition,
  applicationPositionTable,
  applicationTable,
} from '~/db/schemas';
import {
  toApplicationPositionsDto,
  toExtractApplicationsDto,
  toUserApplicationPositionsDto,
} from '../utils/application-mapper';

class ApplicationService {
  public async getMeetingApplications(meetingId: number) {
    const rows = await db
      .select({
        application: applicationTable,
        position: applicationPositionTable,
      })
      .from(applicationTable)
      .innerJoin(
        applicationPositionTable,
        eq(applicationTable.id, applicationPositionTable.applicationId)
      )
      .where(eq(applicationTable.meetingId, meetingId));
    //
    return toApplicationPositionsDto(rows);
  }

  public async extractApplications(meetingId: number) {
    const rows = await db
      .select({
        application: applicationTable,
        position: applicationPositionTable,
      })
      .from(applicationTable)
      .innerJoin(
        applicationPositionTable,
        eq(applicationTable.id, applicationPositionTable.applicationId)
      )
      .where(
        and(
          eq(applicationTable.meetingId, meetingId),
          eq(applicationPositionTable.status, 'ACCEPTED')
        )
      );
    //
    return toExtractApplicationsDto(rows);
  }

  public async getUserApplicationToMeeting(userId: string, meetingId: number) {
    const rows = await db
      .select({
        application: applicationTable,
        position: applicationPositionTable,
      })
      .from(applicationTable)
      .innerJoin(
        applicationPositionTable,
        eq(applicationTable.id, applicationPositionTable.applicationId)
      )
      .where(
        and(
          eq(applicationTable.userId, userId),
          eq(applicationTable.meetingId, meetingId)
        )
      );
    //
    return toUserApplicationPositionsDto(rows);
  }

  public async create(
    application: InsertApplication,
    positions: InsertApplicationPosition[]
  ) {
    const [{ applicationId }] = await db
      .insert(applicationTable)
      .values(application)
      .returning({ applicationId: applicationTable.id });
    //
    positions.forEach((position) => (position.applicationId = applicationId));
    //
    await db.insert(applicationPositionTable).values(positions);
  }

  public async update(
    application: InsertApplication,
    positions: InsertApplicationPosition[]
  ) {
    if (!application.id) {
      throw new Error('Application id is required');
    }
    await db
      .update(applicationTable)
      .set(application)
      .where(eq(applicationTable.id, application.id));
    //
    await db
      .delete(applicationPositionTable)
      .where(eq(applicationPositionTable.applicationId, application.id));
    //
    await db.insert(applicationPositionTable).values(positions);
  }

  public async updateStatus(id: number, status: ApplicationStatus) {
    await db
      .update(applicationPositionTable)
      .set({ status })
      .where(eq(applicationPositionTable.id, id));
  }
}

export const applicationService = new ApplicationService();
