import { and, eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import {
  InsertApplication,
  InsertApplicationAvailability,
  InsertApplicationPosition,
  applicationAvailabilityTable,
  applicationPositionTable,
  applicationTable,
  userTable,
} from '~/db/schemas';
import {
  toApplicationPositionsDto,
  toMyApplicationDto,
} from '../utils/application-mapper';

class ApplicationService {
  public async getMeetingApplications(meetingId: number) {
    const rows = await db
      .select({
        application: applicationTable,
        user: userTable,
        position: applicationPositionTable,
        availability: applicationAvailabilityTable,
      })
      .from(applicationTable)
      .innerJoin(userTable, eq(applicationTable.userId, userTable.id))
      .innerJoin(
        applicationPositionTable,
        eq(applicationTable.id, applicationPositionTable.applicationId)
      )
      .innerJoin(
        applicationAvailabilityTable,
        eq(applicationTable.id, applicationAvailabilityTable.applicationId)
      )
      .where(eq(applicationTable.meetingId, meetingId));
    //
    return toApplicationPositionsDto(rows);
  }

  public async getMyApplicationToMeeting(
    userExternalId: string,
    meetingId: number
  ) {
    const rows = await db
      .select({
        application: applicationTable,
        position: applicationPositionTable,
        availability: applicationAvailabilityTable,
      })
      .from(applicationTable)
      .innerJoin(userTable, eq(applicationTable.userId, userTable.id))
      .innerJoin(
        applicationPositionTable,
        eq(applicationTable.id, applicationPositionTable.applicationId)
      )
      .innerJoin(
        applicationAvailabilityTable,
        eq(applicationTable.id, applicationAvailabilityTable.applicationId)
      )
      .where(
        and(
          eq(userTable.externalId, userExternalId),
          eq(applicationTable.meetingId, meetingId)
        )
      );
    //
    return toMyApplicationDto(rows);
  }

  public async create(
    application: InsertApplication,
    positions: InsertApplicationPosition[],
    availabilities: InsertApplicationAvailability[]
  ) {
    const [{ applicationId }] = await db
      .insert(applicationTable)
      .values(application)
      .returning({ applicationId: applicationTable.id });
    //
    positions.forEach((p) => (p.applicationId = applicationId));
    availabilities.forEach((a) => (a.applicationId = applicationId));
    await db.insert(applicationPositionTable).values(positions);
    await db.insert(applicationAvailabilityTable).values(availabilities);
  }

  public async update(
    application: InsertApplication,
    positions: InsertApplicationPosition[],
    availabilities: InsertApplicationAvailability[]
  ) {
    const applicationId = application.id;
    if (!applicationId) {
      throw new Error('Application id is required');
    }
    await db
      .update(applicationTable)
      .set(application)
      .where(eq(applicationTable.id, applicationId));
    //
    await db
      .delete(applicationPositionTable)
      .where(eq(applicationPositionTable.applicationId, applicationId));
    await db
      .delete(applicationAvailabilityTable)
      .where(eq(applicationAvailabilityTable.applicationId, applicationId));
    //
    positions.forEach((p) => (p.applicationId = applicationId));
    availabilities.forEach((a) => (a.applicationId = applicationId));
    await db.insert(applicationPositionTable).values(positions);
    await db.insert(applicationAvailabilityTable).values(availabilities);
  }
}

export const applicationService = new ApplicationService();
