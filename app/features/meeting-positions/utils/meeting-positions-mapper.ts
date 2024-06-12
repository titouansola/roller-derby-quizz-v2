import {
  InsertMeetingPosition,
  NonSkatingOfficial,
  RefereePosition,
  SelectMeetingPosition,
  SkatingOfficial,
} from '~/db/schemas';
import { MeetingPositionsSchema } from '~/features/meeting/form/meeting-form';

export function toMeetingPositionsSchema(
  data: SelectMeetingPosition[]
): MeetingPositionsSchema {
  const positions: MeetingPositionsSchema = {
    skating: {},
    nonSkating: {},
  };
  //
  data.forEach(({ position, skating }) => {
    if (skating) {
      positions.skating[position as SkatingOfficial] = true;
    } else {
      positions.nonSkating[position as NonSkatingOfficial] = true;
    }
  });
  //
  return positions;
}

export function toInsertablePositions(
  meetingId: number,
  positions: MeetingPositionsSchema
): InsertMeetingPosition[] {
  return [
    ...transformPositions(meetingId, positions.skating, true),
    ...transformPositions(meetingId, positions.nonSkating, false),
  ];
}

function transformPositions(
  meetingId: number,
  positions: MeetingPositionsSchema[keyof MeetingPositionsSchema],
  skating: boolean
): InsertMeetingPosition[] {
  const entities: InsertMeetingPosition[] = [];
  //
  Object.entries(positions).forEach(([position, selected]) => {
    if (selected) {
      entities.push({
        meetingId,
        skating,
        position: position as RefereePosition,
      });
    }
  });
  //
  return entities;
}
