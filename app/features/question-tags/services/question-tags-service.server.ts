import { eq } from 'drizzle-orm';
import { db } from '~/db/db.server';
import { InsertQuestionTag, questionTagTable } from '~/db/schemas';

class QuestionTagsService {
  public async getAll() {
    return db.query.questionTagTable.findMany();
  }

  public async create(tag: InsertQuestionTag) {
    return db.insert(questionTagTable).values(tag);
  }

  public async update(tag: InsertQuestionTag) {
    if (!tag.id) {
      throw new Error('Tag id is required for update');
    }
    return db
      .update(questionTagTable)
      .set(tag)
      .where(eq(questionTagTable.id, tag.id));
  }

  public async delete(tagId: number) {
    return db.delete(questionTagTable).where(eq(questionTagTable.id, tagId));
  }
}

export const questionTagsService = new QuestionTagsService();
