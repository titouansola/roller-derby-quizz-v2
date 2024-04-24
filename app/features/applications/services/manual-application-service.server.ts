import { and, eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import {
  ApplicationStatus,
  InsertManualApplication,
  manualApplicationTable,
} from '~/db/schemas';

class ManualApplicationService {
  public async getMeetingManualApplications(
    meetingId: number,
    status?: ApplicationStatus
  ) {
    return db.query.manualApplicationTable.findMany({
      where: (manualApplicationTable) => {
        const where = [eq(manualApplicationTable.meetingId, meetingId)];
        if (status) {
          where.push(eq(manualApplicationTable.status, status));
        }
        return and(...where);
      },
    });
  }

  public async create(manualApplication: InsertManualApplication) {
    await db.insert(manualApplicationTable).values(manualApplication);
  }

  public async update(manualApplication: InsertManualApplication) {
    if (!manualApplication.id) {
      throw new Error('Manual application id is required for update');
    }
    await db
      .update(manualApplicationTable)
      .set(manualApplication)
      .where(eq(manualApplicationTable.id, manualApplication.id));
  }

  public async delete(id: number) {
    await db
      .delete(manualApplicationTable)
      .where(eq(manualApplicationTable.id, id));
  }
}

export const manualApplicationService = new ManualApplicationService();
