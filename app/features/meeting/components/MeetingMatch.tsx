import { useOutletContext } from '@remix-run/react';
import { useCallback, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, PlusIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { RefereePosition } from '~/db/schemas';
import { ApplicationDto } from '~/features/applications/types/applications-by-user-dto';
import { getPositionApplications } from '~/features/applications/utils/get-position-applications';
import { MatchDto } from '~/features/match/types/match-dto';
import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';
import { Button } from '~/features/ui/components/Button';
import { MeetingMatchReferee } from './MeetingMatchReferee';
import {
  getMatchDateTime,
  getMatchLabel,
} from '~/features/match/utils/get-match-label';
import { AddRefereeModal } from '~/features/referee/components/AddRefereeModal/AddRefereeModal';
import { identifyRefereeDoublons } from '../utils/identify-referee-doublons';
import { MeetingOutletContextData } from '../types/meeting-outlet-context-data';

export function MeetingMatch({
  match,
  applications,
  referees,
  opened,
  toggleOpened,
}: {
  match: MatchDto;
  applications: ApplicationDto[];
  referees: MeetingRefereeDto[];
  opened: boolean;
  toggleOpened: (id: number) => void;
}) {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState<RefereePosition | null>(null);
  const closeModal = useCallback(() => setShowModal(null), []);
  const refereeDoublons = identifyRefereeDoublons(referees);
  const derbyNameDoublons = Array.from(refereeDoublons.values());
  const { meetingPositions } = useOutletContext<MeetingOutletContextData>();
  //
  return (
    <div className="mb-8">
      <div className="flex justify-between">
        <div>
          <h4 className="mb-0 font-bold">{getMatchLabel(match)}</h4>
          <p>{getMatchDateTime(match)}</p>
        </div>
        <button className="h-fit" onClick={() => toggleOpened(match.id)}>
          {opened ? <ChevronDownIcon size={28} /> : <ChevronUpIcon size={28} />}
        </button>
      </div>

      <div className={cx(opened ? 'mt-4' : 'overflow-hidden h-0')}>
        {derbyNameDoublons.length > 0 && (
          <p className="mb-4">
            {t('referee.doublons')}
            <br />
            {derbyNameDoublons.join(', ')}
          </p>
        )}
        <div className="flex flex-col gap-2">
          {meetingPositions.map(({ position, skating }, index) => {
            const positionalReferees = referees.filter(
              (referee) =>
                referee.position === position && referee.skating === skating
            );
            const [strongApplications, mediumApplications] =
              getPositionApplications(
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
                  {positionalReferees.length === 0 && <span>ø</span>}
                  {positionalReferees.map((referee, index) => (
                    <MeetingMatchReferee
                      key={index}
                      referee={referee}
                      matchId={match.id}
                      isDoublon={refereeDoublons.has(referee.userId)}
                      accepted
                    />
                  ))}
                  <span>|</span>
                  {strongApplications.length === 0 && <span>ø</span>}
                  {strongApplications.map((positionalApplication, index) => (
                    <MeetingMatchReferee
                      key={index}
                      referee={positionalApplication}
                      matchId={match.id}
                    />
                  ))}
                  <span>|</span>
                  {mediumApplications.length === 0 && <span>ø</span>}
                  {mediumApplications.map((positionalApplication, index) => (
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
    </div>
  );
}
