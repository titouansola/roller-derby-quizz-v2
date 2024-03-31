import { eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertQuestion, SelectQuestion, questionTable } from '~/db/schemas';

class QuestionService {
  public async create(insertQuestion: InsertQuestion) {
    await db.insert(questionTable).values(insertQuestion);
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

  public getAll() {
    return db.query.questionTable.findMany();
  }

  public async update(selectQuestion: SelectQuestion) {
    await db
      .update(questionTable)
      .set(selectQuestion)
      .where(eq(questionTable.id, selectQuestion.id));
  }

  public async delete(id: number) {
    await db.delete(questionTable).where(eq(questionTable.id, id));
  }
}

export const questionService = new QuestionService();
