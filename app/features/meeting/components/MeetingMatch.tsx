import { useCallback, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { RefereePosition, refereePositionEnum } from '~/db/schemas';
import { ApplicationDto } from '~/features/applications/types/applications-by-user-dto';
import { getPositionApplications } from '~/features/applications/utils/get-position-applications';
import { MatchDto } from '~/features/match/types/match-dto';
import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';
import { Button } from '~/features/ui/components/Button';
import { MeetingMatchReferee } from './MeetingMatchReferee';
import { getMatchLabel } from '~/features/match/utils/get-match-label';
import { refereePositions } from '~/features/referee/constants/referee-positions';
import { AddRefereeModal } from '~/features/referee/components/AddRefereeModal';

export function MeetingMatch({
  match,
  applications,
  referees,
}: {
  match: MatchDto;
  applications: ApplicationDto[];
  referees: MeetingRefereeDto[];
}) {
  const [showModal, setShowModal] = useState<RefereePosition | null>(null);
  const closeModal = useCallback(() => setShowModal(null), []);
  //
  return (
    <div className="mb-8">
      <h3 className="mb-4 font-bold">{getMatchLabel(match)}</h3>

      <div className="flex flex-col gap-2">
        {refereePositions.map(({ position, skating }, index) => {
          const positionalReferees = referees.filter(
            (referee) =>
              referee.position === position && referee.skating === skating
          );
          const positionalApplications = getPositionApplications(
            applications,
            position,
            skating,
            positionalReferees
          );
          //
          return (
            <div
              key={index}
              className="flex items-center gap-8 border-b pb-2 text-[12px]"
            >
              <div className="flex basis-[22%] items-center justify-between font-semibold">
                {position}
                <Button
                  Icon={PlusIcon}
                  onClick={() => setShowModal(position)}
                  round
                  small
                />
                <AddRefereeModal
                  show={showModal === position}
                  close={closeModal}
                  matchId={match.id}
                  position={position}
                  skating={skating}
                />
              </div>

              <div className="flex basis-[78%] items-center gap-2 overflow-auto">
                {positionalReferees.map((referee, index) => (
                  <MeetingMatchReferee
                    key={index}
                    referee={referee}
                    matchId={match.id}
                    accepted
                  />
                ))}
                {positionalApplications.map((positionalApplication, index) => (
                  <MeetingMatchReferee
                    key={index}
                    referee={positionalApplication}
                    matchId={match.id}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
