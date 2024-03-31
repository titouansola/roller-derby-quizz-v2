import { eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import {
  InsertExperience,
  SelectExperience,
  experienceTable,
} from '~/db/schemas';

class ExperienceService {
  public async getUserDerbyCV(userId: string) {
    return db.query.experienceTable.findMany({
      where: (experienceTable, { eq }) => eq(experienceTable.userId, userId),
    });
  }

  public async getExperienceById(id: number) {
    const experience = await db.query.experienceTable.findFirst({
      where: (experienceTable, { eq }) => eq(experienceTable.id, id),
    });
    if (!experience) {
      throw new Error(`Experience with id ${id} not found`);
    }
    return experience;
  }

  public async insertExperience(experience: InsertExperience) {
    await db.insert(experienceTable).values(experience);
  }

  public async updateExperience(experience: SelectExperience) {
    await db
      .update(experienceTable)
      .set(experience)
      .where(eq(experienceTable.id, experience.id));
  }

  public async deleteExperience(id: number) {
    await db.delete(experienceTable).where(eq(experienceTable.id, id));
  }
}

export const experienceService = new ExperienceService();
