import { useCallback, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import {
  RefereePosition,
  SelectApplicationPosition,
  SelectManualApplication,
  refereePositionEnum,
} from '~/db/schemas';
import { MatchDto } from '~/features/match/types/match-dto';
import { ApplicationsByUserDto } from '../../types/applications-by-user-dto';
import { ManualApplicationModal } from '../ManualApplication/ManualApplicationModal';
import { AppliedPosition } from './AppliedPosition';
import { Button } from '~/features/ui/components/Button';

export function MatchApplications({
  match,
  matchPositions,
  applications,
  manualApplications,
}: {
  match: MatchDto;
  matchPositions: SelectApplicationPosition[];
  applications: ApplicationsByUserDto;
  manualApplications: SelectManualApplication[];
}) {
  const [showModal, setShowModal] = useState<RefereePosition | null>(null);
  const closeModal = useCallback(() => setShowModal(null), []);
  //
  return (
    <div className="mb-8">
      <h3 className="mb-4 font-bold">
        {match.team1} vs {match.team2}
      </h3>
      <div className="flex flex-col gap-2">
        {refereePositionEnum.enumValues.map((position) => (
          <div
            key={position}
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
              <ManualApplicationModal
                show={showModal === position}
                close={closeModal}
                matchId={match.id}
                position={position}
              />
            </div>
            <div className="flex basis-[78%] items-center gap-2 overflow-auto">
              {manualApplications
                .filter((a) => a.position === position)
                .map((manualApplication) => (
                  <AppliedPosition
                    key={manualApplication.id}
                    appliedPosition={manualApplication}
                    manuallyAdded
                  />
                ))}
              {matchPositions
                .filter((p) => p.position === position)
                .map((positionApplication) => {
                  const { user } =
                    applications[positionApplication.applicationId];
                  return (
                    <AppliedPosition
                      key={positionApplication.id}
                      appliedPosition={{
                        ...positionApplication,
                        derbyName: user.derbyName,
                        derbyCV: user.derbyCV,
                      }}
                    />
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
