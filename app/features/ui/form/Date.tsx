import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';

export function Date({
  name,
  label,
  hidden,
}: {
  name: string;
  label?: string;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps, error } = useField(name);
  return (
    <div>
      {!!label && <label htmlFor={name}>{t(label)}</label>}
      <input {...getInputProps({ id: name, type: 'date', hidden })} />
      {!!error && <span>{error}</span>}
    </div>
  );
}