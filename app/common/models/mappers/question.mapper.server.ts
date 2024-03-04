import { ObjectId } from "mongodb";
import {
  AnswerDto,
  QuestionDto,
  answerDtoSchema,
  questionDtoSchema,
} from "../dto/question.dto";
import {
  AnswerEntity,
  QuestionEntity,
  answerEntitySchema,
  questionEntitySchema,
} from "../entities/question.entity";

export const QuestionMapper = {
  toDto(entity: QuestionEntity): QuestionDto {
    return questionDtoSchema.parse({
      id: entity._id.toHexString(),
      label: entity.label,
      explanations: entity.explanations ?? "",
      answers: entity.answers.map(AnswerMapper.toDto),
    });
  },
  //
  toEntity(dto: QuestionDto): QuestionEntity {
    return questionEntitySchema.parse({
      _id: new ObjectId(dto.id),
      label: dto.label,
      explanations: dto.explanations ?? "",
      answers: dto.answers.map(AnswerMapper.toEntity),
    });
  },
};

const AnswerMapper = {
  toDto(entity: AnswerEntity): AnswerDto {
    return answerDtoSchema.parse({
      ...entity,
    });
  },
  //
  toEntity(dto: AnswerDto): AnswerEntity {
    return answerEntitySchema.parse({
      ...dto,
    });
  },
};
