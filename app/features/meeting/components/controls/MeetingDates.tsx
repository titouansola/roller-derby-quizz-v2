import { useTranslation } from 'react-i18next';
import { useControlField, useField } from 'remix-validated-form';

const startDateName = 'startDate';
const endDateName = 'endDate';

export function MeetingDates() {
  const { t } = useTranslation();
  const { getInputProps: startDateInputProps, error: startDateError } =
    useField(startDateName);
  const { getInputProps: endDateInputProps, error: endDateError } =
    useField(endDateName);
  const [startDate, setStartDate] = useControlField<string>(startDateName);
  const [endDate, setEndDate] = useControlField<string>(endDateName);
  //
  return (
    <>
      {/* START DATE */}
      <div>
        <label htmlFor={startDateName}>{t('meeting.start_date')}</label>
        <input
          {...startDateInputProps({
            id: startDateName,
            type: 'date',
            value: startDate ?? '',
            max: endDate ?? '',
            onChange: (e) => setStartDate(e.target.value),
          })}
        />
        {!!startDateError && <span>{startDateError}</span>}
      </div>
      {/* END DATE */}
      <div>
        <label htmlFor={endDateName}>{t('meeting.end_date')}</label>
        <input
          {...endDateInputProps({
            id: endDateName,
            type: 'date',
            value: endDate ?? '',
            min: startDate ?? '',
            onChange: (e) => setEndDate(e.target.value),
          })}
        />
        {!!endDateError && <span>{endDateError}</span>}
      </div>
    </>
  );
}
