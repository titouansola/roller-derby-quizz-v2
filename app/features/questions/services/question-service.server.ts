import { eq, notInArray, sql } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertQuestion, questionTable } from '~/db/schemas';

class QuestionService {
  public async create(question: InsertQuestion) {
    await db.insert(questionTable).values(question);
  }

  public async get(id: number) {
    const question = await db.query.questionTable.findFirst({
      where: (questionTable, { eq }) => eq(questionTable.id, id),
    });
    if (!question) {
      throw new Error(`Question with id ${id} not found`);
    }
    return question;
  }

  public async getRandom(avoidIds: number[]) {
    return db.query.questionTable.findFirst({
      where: (questionTable) =>
        notInArray(questionTable.id, avoidIds.concat(0)),
      orderBy: sql`random()`,
    });
  }

  public getAll() {
    return db.query.questionTable.findMany();
  }

  public async update(question: InsertQuestion) {
    if (!question.id) {
      throw new Error('Question id is required');
    }
    await db
      .update(questionTable)
      .set(question)
      .where(eq(questionTable.id, question.id));
  }

  public async delete(id: number) {
    await db.delete(questionTable).where(eq(questionTable.id, id));
  }
}

export const questionService = new QuestionService();
