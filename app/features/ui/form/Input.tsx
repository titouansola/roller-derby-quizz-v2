import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';

export function Input({
  name,
  label,
  hidden,
}: {
  name: string;
  label?: string;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps } = useField(name);
  return (
    <div>
      {!!label && <label htmlFor={name}>{t(label)}</label>}
      <input {...getInputProps({ id: name, hidden })} />
    </div>
  );
}
