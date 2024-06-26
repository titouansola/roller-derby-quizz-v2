import { useOutletContext } from '@remix-run/react';
import { redirect } from '@remix-run/node';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { Layout } from '~/features/ui/layout/Layout';
import { MeetingOutletContextData } from '~/features/meeting/types/meeting-outlet-context-data';
import { userService } from '~/features/users/services/user.service.server';
import { matchFormValidator } from '~/features/match/form/match-form';
import { MatchDto } from '~/features/match/types/match-dto';
import { matchService } from '~/features/match/services/match-service.server';
import { MatchList } from '~/features/match/components/MatchList';
import { DeleteMatchModal } from '~/features/match/components/DeleteMatchModal';
import { MatchModal } from '~/features/match/components/MatchModal';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { idFormValidator } from '~/features/common/form/id-form';
import { Button } from '~/features/ui/components/Button';
import { RouteEnum } from '~/features/ui/enums/route-enum';
import { handleErrors } from '~/features/common/utils/handle-errors';
import { toastService } from '~/features/toasts/services/toast.service.server';

export default function Component() {
  const { t } = useTranslation();
  const { meeting, matches } = useOutletContext<MeetingOutletContextData>();
  const [matchModalOpened, setMatchModalOpened] = useState(false);
  const [editedMatch, setEditedMatch] = useState<MatchDto | undefined>(
    undefined
  );
  const [toBeDeleted, setToBeDeleted] = useState(0);
  //
  const onCreateMatch = () => {
    setMatchModalOpened(true);
  };
  const onEditMatch = (match: MatchDto) => () => {
    setEditedMatch(match);
  };
  const onDeleteMatch = (id: number) => () => {
    setToBeDeleted(id);
  };
  const closeModal = () => {
    setToBeDeleted(0);
    setMatchModalOpened(false);
    setEditedMatch(undefined);
  };
  //
  return (
    <Layout grow>
      <div className="flex flex-col h-full">
        <h2>{t('meeting.matches')}</h2>
        <div className="flex flex-col justify-between grow">
          <div className="flex flex-col gap-8">
            <MatchList
              matches={matches}
              onEditMatch={onEditMatch}
              onDeleteMatch={onDeleteMatch}
            />
          </div>
          <Button label="add" onClick={onCreateMatch} />
        </div>
        <DeleteMatchModal matchId={toBeDeleted} closeModal={closeModal} />
        <MatchModal
          meeting={meeting}
          editedMatch={editedMatch}
          matchModalOpened={matchModalOpened}
          closeModal={closeModal}
        />
      </div>
    </Layout>
  );
}

export const action = handleErrors(async (args) => {
  const user = await userService.getConnectedOrRedirect(args);
  const meetingId = parseInt(args.params.id ?? '0');
  if (!(meetingId > 0)) {
    return redirect(RouteEnum.MY_MEETINGS);
  }
  await meetingService.doChecks(meetingId, user.id, { ownership: true });
  //
  const formData = await args.request.formData();
  const action = formData.get('_action');
  switch (action) {
    case 'create':
      return createMatch(meetingId, formData);
    case 'update':
      return updateMatch(meetingId, formData);
    case 'delete':
      return deleteMatch(formData);
  }
  return null;
});

async function createMatch(meetingId: number, formData: FormData) {
  const { data, error } = await matchFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await matchService.create({ meetingId, ...data });
  return toastService.createResponseCreatedToast();
}

async function updateMatch(meetingId: number, formData: FormData) {
  const { data: dataMI, error: errorMI } =
    await idFormValidator.validate(formData);
  if (!!errorMI) {
    return validationError(errorMI);
  }
  const { data, error } = await matchFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await matchService.update({ id: dataMI.id, meetingId, ...data });
  return toastService.createResponseUpdatedToast();
}

async function deleteMatch(formData: FormData) {
  const { data, error } = await idFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await matchService.delete(data.id);
  return toastService.createResponseDeletedToast();
}
