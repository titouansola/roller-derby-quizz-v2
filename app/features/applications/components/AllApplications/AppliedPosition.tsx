import { useCallback, useState } from 'react';
import { Ghost } from 'lucide-react';
import classNames from 'classnames';
import { AppliedPositionModel } from '../../types/applied-position-model';
import { ManualApplicationModal } from '../ManualApplication/ManualApplicationModal';
import { ChooseRefereeModal } from './ChooseRefereeModal';

export function AppliedPosition({
  appliedPosition,
  manuallyAdded,
}: {
  appliedPosition: AppliedPositionModel;
  manuallyAdded?: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = useCallback(() => setShowModal((prev) => !prev), []);
  const accepted = appliedPosition.status === 'ACCEPTED';
  const rejected = appliedPosition.status === 'REJECTED';
  //
  return (
    <>
      <button
        className={classNames(
          'flex items-center gap-1 border whitespace-nowrap rounded-full px-3 py-1',
          accepted && 'border-black',
          rejected && 'opacity-50'
        )}
        onClick={toggleModal}
      >
        {appliedPosition.asGhost && <Ghost size={14} />}
        {appliedPosition.derbyName}
      </button>
      {manuallyAdded ? (
        <ManualApplicationModal
          show={showModal}
          close={toggleModal}
          manualApplication={appliedPosition}
        />
      ) : (
        <ChooseRefereeModal
          show={showModal}
          close={toggleModal}
          application={appliedPosition}
        />
      )}
    </>
  );
}
