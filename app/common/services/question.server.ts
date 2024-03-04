import { db } from "~/common/utils/db.server";
import { ObjectId } from "mongodb";
import { QuestionEntity } from "../models/entities/question.entity";
import { QuestionDto } from "../models/dto/question.dto";
import { QuestionMapper } from "../models/mappers/question.mapper.server";

class QuestionService {
  private model = db.collection<QuestionEntity>("question");

  public async create(question: QuestionDto) {
    const entity = QuestionMapper.toEntity(question);
    return this.model.insertOne(entity);
  }

  public async get(id: string) {
    const entity = await this.model.findOne({ _id: new ObjectId(id) });
    return entity ? QuestionMapper.toDto(entity) : null;
  }

  public async getAll() {
    const entities = await this.model.find().toArray();
    return entities.map(QuestionMapper.toDto);
  }

  public async update(question: QuestionDto) {
    const entity = QuestionMapper.toEntity(question);
    return this.model.findOneAndUpdate({ _id: entity._id }, { $set: entity });
  }

  public async delete(id: string) {
    await this.model.findOneAndDelete({ _id: new ObjectId(id) });
  }
}

export const questionService = new QuestionService();
