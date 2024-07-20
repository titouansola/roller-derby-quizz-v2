import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';

export function Checkbox({
  name,
  label,
  type = 'checkbox',
  value,
  hidden,
}: {
  name: string;
  label?: string;
  type?: 'checkbox' | 'radio';
  value?: string;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps } = useField(name);
  const props = { type, value };
  //
  if (hidden) {
    return <input {...getInputProps(props)} hidden />;
  }
  //
  return (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input {...getInputProps(props)} />
      {!!label && t(label)}
    </label>
  );
}
