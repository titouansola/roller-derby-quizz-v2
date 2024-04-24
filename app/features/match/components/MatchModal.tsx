import { useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Modal } from '~/features/ui/layout/Modal';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { matchFormValidator } from '../form/match-form';
import { MatchDto } from '../types/match-dto';
import { MatchForm } from './MatchForm';

export function MatchModal({
  meeting,
  editedMatch,
  matchModalOpened,
  closeModal,
}: {
  meeting: MeetingDto;
  editedMatch: MatchDto | undefined;
  matchModalOpened: boolean;
  closeModal: () => void;
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  if (!matchModalOpened && !editedMatch) {
    return null;
  }

  return (
    <Modal onClose={closeModal}>
      <Modal.Title>{t('meeting.match')}</Modal.Title>
      <ValidatedForm
        method="POST"
        validator={matchFormValidator}
        defaultValues={editedMatch}
        fetcher={fetcher}
        className="flex flex-col gap-8"
      >
        <MatchForm minDate={meeting.startDate} maxDate={meeting.endDate} />
        <Modal.Footer>
          <FetcherSubmitButton
            actionName={!!editedMatch ? 'update' : 'create'}
            uiAction={closeModal}
            fetcher={fetcher}
          />
        </Modal.Footer>
      </ValidatedForm>
    </Modal>
  );
}
