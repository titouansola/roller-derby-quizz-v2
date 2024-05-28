import { useControlField } from 'remix-validated-form';
import { Date } from '~/features/ui/form/Date';

export function ApplicationLimitDates() {
  const [startDate] = useControlField<string>('startDate');
  const [headRefLimitDate] = useControlField<string>('headRefLimitDate');
  const [applicationLimitDate] = useControlField<string>(
    'applicationLimitDate'
  );
  //
  return (
    <>
      <Date
        name={'headRefLimitDate'}
        label={'meeting.head_ref_limit_date'}
        max={applicationLimitDate ?? startDate}
        required
      />
      <Date
        name={'applicationLimitDate'}
        label={'meeting.application_limit_date'}
        min={headRefLimitDate}
        max={startDate}
        required
      />
    </>
  );
}
