import {
  ConnectedUser,
  InsertApplication,
  InsertApplicationAvailability,
  InsertApplicationPosition,
  NonSkatingOfficial,
  PositionInterest,
  RefereePosition,
  SelectApplication,
  SelectApplicationAvailability,
  SelectApplicationPosition,
  SelectUser,
  SkatingOfficial,
  nonSkatingOfficials,
  skatingOfficials,
} from '~/db/schemas';
import { ApplicationsByUserDto } from '../types/applications-by-user-dto';
import { MyApplicationDto } from '../types/my-application-dto';
import {
  ApplicationFormData,
  PositionInterestFormData,
} from '../form/application-form';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { MatchDto } from '~/features/match/types/match-dto';
import { getDateDifference } from '~/features/common/utils/get-date-difference';

export function toApplicationPositionsDto(
  rows: {
    user: SelectUser;
    application: SelectApplication;
    position: SelectApplicationPosition;
    availability: SelectApplicationAvailability;
  }[]
) {
  const applicationMap = new Map<
    number,
    {
      user: SelectUser;
      application: SelectApplication;
      positions: Map<number, SelectApplicationPosition>;
      availabilities: Map<number, SelectApplicationAvailability>;
    }
  >();
  // Isolate data by application
  for (const { user, application, position, availability } of rows) {
    if (!applicationMap.has(application.id)) {
      applicationMap.set(application.id, {
        user,
        application,
        positions: new Map(),
        availabilities: new Map(),
      });
    }
    const mappedApplication = applicationMap.get(application.id)!;
    mappedApplication.positions.set(position.id, position);
    mappedApplication.availabilities.set(availability.id, availability);
  }
  // Convert to DTO
  const dto: ApplicationsByUserDto = {};
  for (const [applicationId, data] of applicationMap.entries()) {
    dto[applicationId] = {
      user: data.user,
      application: data.application,
      positions: Array.from(data.positions.values()),
      availabilities: Array.from(data.availabilities.values()),
    };
  }
  return dto;
}

export function toMyApplicationDto(
  rows: {
    application: SelectApplication;
    position: SelectApplicationPosition;
    availability: SelectApplicationAvailability;
  }[]
) {
  if (rows.length === 0) {
    return null;
  }
  const dto: MyApplicationDto = {
    application: rows[0].application,
    positions: {
      SO: skatingOfficials.reduce(
        (acc, role) => ({
          ...acc,
          [role]: { interest: 'NONE', asGhost: false },
        }),
        {}
      ),
      NSO: nonSkatingOfficials.reduce(
        (acc, role) => ({
          ...acc,
          [role]: { interest: 'NONE', asGhost: false },
        }),
        {}
      ),
    },
    availabilities: {},
  };
  //
  for (const { position, availability } of rows) {
    if (position.skating) {
      const role = position.position as SkatingOfficial;
      dto.positions.SO[role] = position;
    } else {
      const role = position.position as NonSkatingOfficial;
      dto.positions.NSO[role] = position;
    }
    if (!dto.availabilities[availability.id]) {
      dto.availabilities[availability.id] = availability;
    }
  }
  //
  return dto;
}

export function toApplicationFormData(
  user: ConnectedUser | null,
  myApplication: MyApplicationDto | null,
  meeting: MeetingDto,
  matches: MatchDto[]
): ApplicationFormData | undefined {
  if (!user) return;
  //
  const availabilities = Object.values(myApplication?.availabilities ?? {});
  return {
    email: user.email,
    civilName: user.civilName ?? '',
    pronouns: user.pronouns ?? '',
    derbyName: user.derbyName ?? '',
    league: user.league ?? '',
    emergencyContact: user.emergencyContact ?? '',
    medicalInformation: user.medicalInformation ?? '',
    derbyCVUrl: user.derbyCVUrl,
    //
    id: myApplication?.application?.id,
    notes: myApplication?.application?.notes ?? null,
    //
    positions: myApplication?.positions ?? { SO: {}, NSO: {} },
    //
    availabilities: meeting.useMatchAvailability
      ? getMatchAvailabilities(matches, availabilities)
      : getDayAvailabilities(meeting, availabilities),
  };
}

export function toInsertableApplication(
  data: ApplicationFormData,
  meetingId: number,
  userId: number
) {
  const application: InsertApplication = {
    id: data.id,
    meetingId,
    userId,
    notes: data.notes,
  };
  //
  const positions: InsertApplicationPosition[] = [
    ...flattenPositions(data.positions.SO, true),
    ...flattenPositions(data.positions.NSO, false),
  ];
  //
  const availabilities = data.availabilities.reduce(
    (acc, availability, index) => {
      if (!availability.selected) return acc;
      return [
        ...acc,
        {
          applicationId: 0, // Will be defined by service
          day: !availability.matchId ? index : null,
          matchId: availability.matchId,
        },
      ];
    },
    [] as InsertApplicationAvailability[]
  );
  //
  return { application, positions, availabilities };
}

function flattenPositions(
  positions: Partial<Record<RefereePosition, PositionInterestFormData>>,
  skating: boolean
): InsertApplicationPosition[] {
  return Object.entries(positions)
    .filter(([, { interest }]) => interest !== 'NONE')
    .map(([position, data]) => ({
      position: position as RefereePosition,
      applicationId: 0, // Will be defined by service
      skating,
      interest: data.interest as PositionInterest,
      asGhost: data.asGhost,
    }));
}

function getMatchAvailabilities(
  matches: MatchDto[],
  availabilities: SelectApplicationAvailability[]
) {
  return matches.map(({ id: matchId }) => ({
    matchId,
    selected: availabilities.some(
      (availability) => availability.matchId === matchId
    ),
  }));
}

function getDayAvailabilities(
  meeting: MeetingDto,
  availabilities: SelectApplicationAvailability[]
) {
  const startDate = new Date(meeting.startDate);
  const endDate = new Date(meeting.endDate);
  const days = getDateDifference(startDate, endDate);
  return new Array(days).fill(null).map((_, day) => ({
    selected: availabilities.some((availability) => availability.day === day),
  }));
}
