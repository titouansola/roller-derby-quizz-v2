import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';

export function TextArea({
  name,
  label,
  rows = 5,
  hidden,
}: {
  name: string;
  label?: string;
  rows?: number;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps, error } = useField(name);
  const props = { id: name, hidden, rows };
  //
  if (hidden) {
    return <textarea {...getInputProps(props)} />;
  }
  //
  return (
    <div className="form-control">
      {!!label && <label htmlFor={name}>{t(label)}</label>}
      <textarea {...getInputProps(props)} />
      {!!error && <span>{error}</span>}
    </div>
  );
}
