import {
  SelectApplication,
  SelectApplicationPosition,
  refereePositionEnum,
} from '~/db/schemas';
import { userService } from '~/features/users/services/user.service.server';
import { ApplicationsByUserDto } from '../types/applications-by-user-dto';
import {
  ApplicationPositionsDto,
  UserApplicationDto,
} from '../types/user-application-dto';
import {
  ExtractApplicationDto,
  ExtractApplicationsDto,
} from '../types/extract-applications-dto';
import { UserDto } from '~/features/users/types';

export async function toApplicationPositionsDto(
  rows: {
    application: SelectApplication;
    position: SelectApplicationPosition;
  }[]
) {
  const dto: ApplicationsByUserDto = {};
  for (const { application, position } of rows) {
    if (!dto[application.id]) {
      dto[application.id] = {
        user: await userService.getUserById(application.userId),
        application,
        positions: [],
      };
    }
    dto[application.id].positions.push(position);
  }
  return dto;
}

export async function toExtractApplicationsDto(
  rows: {
    application: SelectApplication;
    position: SelectApplicationPosition;
  }[]
) {
  const dto: ExtractApplicationsDto = {};
  const userMap = new Map<string, UserDto>();
  //
  for (const { application, position } of rows) {
    if (!dto[position.matchId]) {
      dto[position.matchId] = refereePositionEnum.enumValues.reduce(
        (acc, value) => ({ ...acc, [value]: [] }),
        {} as ExtractApplicationDto
      );
    }
    if (!userMap.has(application.userId)) {
      userMap.set(
        application.userId,
        await userService.getUserById(application.userId)
      );
    }
    const user = userMap.get(application.userId)!;
    dto[position.matchId][position.position].push({
      derbyName: user.derbyName,
      asGhost: position.asGhost,
    });
  }
  //
  return dto;
}

export function toUserApplicationPositionsDto(
  rows: {
    application: SelectApplication;
    position: SelectApplicationPosition;
  }[]
) {
  if (rows.length === 0) {
    return null;
  }
  const dto: UserApplicationDto = {
    application: rows[0].application,
    matchPositions: {},
  };
  //
  const positionMap = new Map<number, SelectApplicationPosition[]>();
  for (const { position } of rows) {
    if (!positionMap.has(position.matchId)) {
      positionMap.set(position.matchId, []);
    }
    positionMap.get(position.matchId)!.push(position);
  }
  for (const positions of positionMap.values()) {
    dto.matchPositions[`match-${positions[0].matchId}`] = positions.reduce(
      (acc, position) => ({ ...acc, [position.position]: position }),
      {} as ApplicationPositionsDto
    );
  }
  //
  return dto;
}
