import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';

export function Input({
  name,
  type = 'text',
  label,
  hidden,
}: {
  name: string;
  type?: 'text' | 'email' | 'number' | 'time';
  label?: string;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps, error } = useField(name);
  const props = { id: name, type, hidden };
  //
  if (hidden) {
    return <input {...getInputProps(props)} />;
  }
  //
  return (
    <div className="form-control">
      {!!label && <label htmlFor={name}>{t(label)}</label>}
      <input {...getInputProps(props)} />
      {!!error && <span>{error}</span>}
    </div>
  );
}
