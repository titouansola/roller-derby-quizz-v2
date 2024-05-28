import { useControlField } from 'remix-validated-form';
import { Date } from '~/features/ui/form/Date';

const startDateName = 'startDate';
const endDateName = 'endDate';

export function MeetingDates() {
  const [startDate] = useControlField<string>(startDateName);
  const [endDate] = useControlField<string>(endDateName);
  return (
    <>
      <Date
        name={startDateName}
        label={'meeting.start_date'}
        max={endDate}
        required
      />
      <Date
        name={endDateName}
        label={'meeting.end_date'}
        min={startDate}
        required
      />
    </>
  );
}
