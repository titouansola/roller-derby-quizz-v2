import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';

export function Checkbox({
  name,
  label,
  hidden,
}: {
  name: string;
  label: string;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps } = useField(name);
  return (
    <div>
      <input {...getInputProps({ id: name, hidden, type: 'checkbox' })} />
      <label htmlFor={name}>{t(label)}</label>
    </div>
  );
}
