import { Link, useFetcher } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { ValidatedForm } from 'remix-validated-form';
import { CheckIcon, ShareIcon, TrashIcon } from 'lucide-react';
import { UserApplicationDto } from '~/features/applications/types/user-application-dto';
import { Modal } from '~/features/ui/layout/Modal';
import { Button } from '~/features/ui/components/Button';
import { FetcherSubmitButton } from '~/features/ui/form/FetcherSubmitButton';
import { Input } from '~/features/ui/form/Input';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { acceptRefereeFormValidator } from '../form/accept-referee-form';
import { MeetingRefereeDto } from '../types/meeting-referee-dto';

export function RefereeModal({
  show,
  close,
  referee,
  matchId,
  accepted,
}: {
  show: boolean;
  close: () => void;
  referee: MeetingRefereeDto | UserApplicationDto;
  matchId: number;
  accepted: boolean;
}) {
  const { t } = useTranslation();
  const fetcher = useFetcher();

  if (!show) {
    return null;
  }

  return (
    <Modal onClose={close}>
      <Modal.Title>
        {t('referee.modal_title')} : {referee.position}
      </Modal.Title>

      <div className="flex flex-col gap-4">
        <div>
          <p>{t('account.civil_name')}</p>
          <p className="font-bold">{referee.civilName}</p>
        </div>
        <div>
          <p>{t('account.pronouns')}</p>
          <p className="font-bold">{referee.pronouns}</p>
        </div>
        <div>
          <p>{t('account.derby_name')}</p>
          <p className="font-bold">{referee.derbyName}</p>
        </div>
        <div>
          <p>{t('account.league')}</p>
          <p className="font-bold">{referee.league}</p>
        </div>
        {!!referee.derbyCVUrl && (
          <Link
            to={referee.derbyCVUrl}
            target="_blank"
            rel="noreferrer"
            className="flex gap-2 font-bold"
          >
            <ShareIcon />
            {t('account.derby_cv')}
          </Link>
        )}
        <div>
          <p>{t('account.emergency_contact')}</p>
          <p className="font-bold">{referee.emergencyContact}</p>
        </div>
        <div>
          <p>{t('account.medical_information')}</p>
          <p className="font-bold">{referee.medicalInformation}</p>
        </div>
        {!!referee.notes && (
          <div>
            <p>{t('account.notes')}</p>
            <p className="font-bold">{referee.notes}</p>
          </div>
        )}
      </div>

      <ValidatedForm
        method="POST"
        defaultValues={{ ...referee, matchId }}
        validator={acceptRefereeFormValidator}
        fetcher={fetcher}
      >
        <Input name="id" hidden />
        <Input name="userId" hidden />
        <Input name="matchId" hidden />
        <Input name="position" hidden />
        <Input name="notes" hidden />
        <Checkbox name="skating" hidden />
        <Checkbox name="asGhost" hidden />

        <Modal.Footer>
          <Button
            label="cancel"
            type="button"
            variant={'outline'}
            onClick={close}
          />
          <FetcherSubmitButton
            Icon={accepted ? TrashIcon : CheckIcon}
            label={accepted ? 'referee.remove' : 'referee.accept'}
            actionName={accepted ? 'remove_referee' : 'accept_referee'}
            fetcher={fetcher}
            uiAction={close}
          />
        </Modal.Footer>
      </ValidatedForm>
    </Modal>
  );
}
