import { useTranslation } from 'react-i18next';
import { ValidatedForm, useFieldArray } from 'remix-validated-form';
import { Input } from '~/features/ui/form/Input';
import { Date } from '~/features/ui/form/Date';
import { MeetingDto } from '../types/meeting-dto';
import { meetingFormValidator } from '../form/meeting-form';

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
      <Date name="startDate" label="meeting.start_date" />
      <Date name="endDate" label="meeting.end_date" />
      <Input name="location" label="meeting.location" />
      <Input name="description" label="meeting.description" />
      <Date
        name="applicationLimitDate"
        label="meeting.application_limit_date"
      />
      <p>{t('meeting.matches')}</p>
      {matches.map(({ key }, index) => (
        <div key={key}>
          <h3>Match {index + 1}</h3>
          <Input name={`matches[${index}].team1`} label="meeting.match.team1" />
          <Input name={`matches[${index}].team2`} label="meeting.match.team2" />
          <Input name={`matches[${index}].time`} label="meeting.match.time" />
          <Input
            name={`matches[${index}].day`}
            label="meeting.match.day"
            type="number"
          />
          <div>
            <button type="button" onClick={() => remove(index)}>
              X
            </button>
          </div>
        </div>
      ))}
      <div>
        <button type="button" onClick={() => push({})}>
          {t('add')}
        </button>
      </div>
      <button type="submit" name="_action" value="update">
        {t('confirm')}
      </button>
    </ValidatedForm>
  );
}
