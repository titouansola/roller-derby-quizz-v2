import { useTranslation } from 'react-i18next';
import { ValidatedForm, useFieldArray } from 'remix-validated-form';
import { Input } from '~/features/ui/form/Input';
import { MeetingDto } from '../types/meeting-dto';
import { meetingFormValidator } from '../form/meeting-form';
import { MeetingDates } from './controls/MeetingDates';
import { ApplicationLimitDate } from './controls/ApplicationLimitDate';
import { MatchForm } from './MatchForm';

export function MeetingForm({ meeting }: { meeting?: MeetingDto }) {
  const { t } = useTranslation();
  const [matches, { push, remove }] = useFieldArray('matches', {
    formId: 'meeting',
  });
  //
  return (
    <ValidatedForm
      method="POST"
      id="meeting"
      validator={meetingFormValidator}
      defaultValues={meeting}
    >
      <Input name="id" hidden />
      <Input name="title" label="meeting.title" />
      <MeetingDates />
      <Input name="location" label="meeting.location" />
      <Input name="description" label="meeting.description" />
      <ApplicationLimitDate />
      <h2>{t('meeting.matches')}</h2>
      {matches.map(({ key }, index) => (
        <MatchForm key={key} index={index} onRemove={remove} />
      ))}
      <div>
        <button type="button" onClick={() => push({ day: 1 })}>
          {t('add')}
        </button>
      </div>
      <button type="submit" name="_action" value="update">
        {t('confirm')}
      </button>
    </ValidatedForm>
  );
}
