import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';

export function Input({
  name,
  type = 'text',
  label,
  hidden,
}: {
  name: string;
  type?: 'text' | 'email' | 'number';
  label?: string;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps, error } = useField(name);
  return (
    <div>
      {!!label && <label htmlFor={name}>{t(label)}</label>}
      <input {...getInputProps({ id: name, type, hidden })} />
      {!!error && <span>{error}</span>}
    </div>
  );
}
