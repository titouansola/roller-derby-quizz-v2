import { useCallback, useState } from 'react';
import { GhostIcon } from 'lucide-react';
import classNames from 'classnames';
import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';
import { UserApplicationDto } from '~/features/applications/types/user-application-dto';
import { RefereeModal } from '~/features/referee/components/RefereeModal';

export function MeetingMatchReferee({
  referee,
  matchId,
  accepted = false,
}: {
  referee: MeetingRefereeDto | UserApplicationDto;
  matchId: number;
  accepted?: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);
  //
  return (
    <>
      <button
        className={classNames(
          'flex items-center gap-1 border whitespace-nowrap rounded-full px-3 py-1',
          accepted && 'border-black'
        )}
        onClick={toggleModal}
      >
        {referee.asGhost && <GhostIcon size={14} />}
        {referee.derbyName}
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
