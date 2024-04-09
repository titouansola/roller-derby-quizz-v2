import { useTranslation } from 'react-i18next';
import { useControlField, useField } from 'remix-validated-form';

const name = 'applicationLimitDate';

export function ApplicationLimitDate() {
  const { t } = useTranslation();
  const { getInputProps, error } = useField(name);
  const [startDate] = useControlField<string>('startDate');
  return (
    <div>
      <label htmlFor={name}>{t('meeting.application_limit_date')}</label>
      <input {...getInputProps({ id: name, type: 'date', max: startDate })} />
      {!!error && <span>{error}</span>}
    </div>
  );
}
