import { and, eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertApplication, applicationTable } from '~/db/schemas';
import { userService } from '~/features/users/services/user.service.server';
import { ApplicationListDto } from '../types/application-dto';
import {
  toApplicationDto,
  toApplicationListDto,
} from '../utils/application-mapper';

class ApplicationService {
  public async findMeetingApplications(meetingId: number) {
    const applications = await db.query.applicationTable.findMany({
      where: (applicationTable) => eq(applicationTable.meetingId, meetingId),
    });
    const applicationList: ApplicationListDto[] = [];
    for (const application of applications) {
      const user = await userService.getUserById(application.userId);
      applicationList.push(toApplicationListDto(application, user));
    }
    return applicationList;
  }

  public async findUserApplicationToMeeting(userId: string, meetingId: number) {
    const application = await db.query.applicationTable.findFirst({
      where: (applicationTable) => {
        return and(
          eq(applicationTable.userId, userId),
          eq(applicationTable.meetingId, meetingId)
        );
      },
    });
    return !!application ? toApplicationDto(application) : null;
  }

  public async create(application: InsertApplication) {
    await db.insert(applicationTable).values(application);
  }

  public async update(application: InsertApplication) {
    if (!application.id) {
      throw new Error('Application id is required');
    }
    await db
      .update(applicationTable)
      .set(application)
      .where(eq(applicationTable.id, application.id));
  }
}

export const applicationService = new ApplicationService();
