import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';

export function Checkbox({
  name,
  label,
  value,
  hidden,
}: {
  name: string;
  label: string;
  value?: string;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps } = useField(name);
  return (
    <div>
      <label>
        <input {...getInputProps({ hidden, type: 'checkbox', value })} />
        {t(label)}
      </label>
    </div>
  );
}
