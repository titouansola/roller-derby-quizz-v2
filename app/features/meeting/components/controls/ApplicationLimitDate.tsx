import { useControlField } from 'remix-validated-form';
import { Date } from '~/features/ui/form/Date';

export function ApplicationLimitDate() {
  const [startDate] = useControlField<string>('startDate');
  return (
    <>
      <Date
        name={'applicationLimitDate'}
        label={'meeting.application_limit_date'}
        max={startDate}
      />
      {/* TODO add head application limit date */}
      {/* <div className="form-control">
        <label htmlFor={name}>{t('meeting.application_limit_date')}</label>
        <input {...getInputProps({ id: name, type: 'date', max: startDate })} />
        {!!error && <span>{error}</span>}
      </div> */}
    </>
  );
}
