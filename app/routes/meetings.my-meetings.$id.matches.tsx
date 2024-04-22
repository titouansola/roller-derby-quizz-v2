import { useOutletContext } from '@remix-run/react';
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { validationError } from 'remix-validated-form';
import { Layout } from '~/features/ui/layout/Layout';
import { MeetingOutletContextData } from '~/features/meeting/types/meeting-outlet-context-data';
import { userService } from '~/features/users/services/user.service.server';
import {
  matchFormValidator,
  matchIdFormValidator,
} from '~/features/match/form/match-form';
import { MatchDto } from '~/features/match/types/match-dto';
import { matchService } from '~/features/match/services/match-service.server';
import { MatchList } from '~/features/match/components/MatchList';
import { DeleteMatchModal } from '~/features/match/components/DeleteMatchModal';
import { MatchModal } from '~/features/match/components/MatchModal';

export default function Component() {
  const { meeting, matches } = useOutletContext<MeetingOutletContextData>();
  const { t } = useTranslation();
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
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-8">
          <MatchList
            matches={matches}
            onEditMatch={onEditMatch}
            onDeleteMatch={onDeleteMatch}
          />
        </div>
        <button onClick={onCreateMatch}>{t('add')}</button>
      </div>
      <DeleteMatchModal matchId={toBeDeleted} closeModal={closeModal} />
      <MatchModal
        meeting={meeting}
        editedMatch={editedMatch}
        matchModalOpened={matchModalOpened}
        closeModal={closeModal}
      />
    </Layout>
  );
}

export async function action(args: ActionFunctionArgs) {
  const meetingId = parseInt(args.params.id ?? '0');
  if (!(meetingId > 0)) {
    return redirect('/meetings/my-meetings');
  }
  await userService.getCurrentUser(args);
  const formData = await args.request.formData();
  const action = formData.get('_action');
  switch (action) {
    case 'create':
      return createMatch(meetingId, formData);
    case 'update':
      return updateMatch(meetingId, formData);
    case 'delete':
      return deleteMatch(formData);
    default:
      throw new Error('Invalid action');
  }
}

async function createMatch(meetingId: number, formData: FormData) {
  const { data, error } = await matchFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await matchService.create({ meetingId, ...data });
  return null;
}

async function updateMatch(meetingId: number, formData: FormData) {
  const { data: dataMI, error: errorMI } =
    await matchIdFormValidator.validate(formData);
  if (!!errorMI) {
    return validationError(errorMI);
  }
  const { data, error } = await matchFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await matchService.update({ id: dataMI.id, meetingId, ...data });
  return null;
}

async function deleteMatch(formData: FormData) {
  const { data, error } = await matchIdFormValidator.validate(formData);
  if (!!error) {
    return validationError(error);
  }
  await matchService.delete(data.id);
  return null;
}
