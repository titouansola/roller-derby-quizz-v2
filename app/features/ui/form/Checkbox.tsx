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
  return (
    <div>
      <label>
        <input {...getInputProps({ hidden, type, value })} />
        {!!label && t(label)}
      </label>
    </div>
  );
}
