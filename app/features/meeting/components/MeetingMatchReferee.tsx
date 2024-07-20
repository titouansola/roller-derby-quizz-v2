import { useCallback, useState } from 'react';
import { GhostIcon, TriangleAlertIcon } from 'lucide-react';
import cx from 'classnames';
import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';
import { UserApplicationDto } from '~/features/applications/types/user-application-dto';
import { RefereeModal } from '~/features/referee/components/RefereeModal';
import { isUserApplication } from '~/features/referee/utils/is-user-application';

export function MeetingMatchReferee({
  referee,
  matchId,
  accepted = false,
  isDoublon = false,
}: {
  referee: MeetingRefereeDto | UserApplicationDto;
  matchId: number;
  accepted?: boolean;
  isDoublon?: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);
  //
  return (
    <>
      <button
        className={cx(
          'flex items-center gap-1 border-2 whitespace-nowrap rounded-full px-3 py-1',
          accepted && [
            'font-semibold',
            isDoublon
              ? 'bg-danger border-danger text-white'
              : 'bg-primary-active text-light border-primary-active font-semibold',
          ],
          isUserApplication(referee) && {
            'border-dark': referee.interest === 'STRONG',
            'border-grey': referee.interest === 'MEDIUM',
          }
        )}
        onClick={toggleModal}
      >
        {isDoublon && <TriangleAlertIcon size={14} />}
        {referee.asGhost && <GhostIcon size={14} />}
        {referee.derbyName}
        {isUserApplication(referee) && (
          <span>
            {referee.interest === 'STRONG' && '++'}
            {referee.interest === 'MEDIUM' && '+'}
          </span>
        )}
      </button>
      <RefereeModal
        show={showModal}
        close={toggleModal}
        referee={referee}
        accepted={accepted}
        matchId={matchId}
      />
    </>
  );
}
