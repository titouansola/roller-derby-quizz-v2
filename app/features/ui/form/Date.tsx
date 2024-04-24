import { useControlField, useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';

export function Date({
  name,
  label,
  min,
  max,
  hidden,
}: {
  name: string;
  label?: string;
  min?: string;
  max?: string;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps, error } = useField(name);
  const [value, setValue] = useControlField<string>(name);
  return (
    <div className="form-control">
      {!!label && <label htmlFor={name}>{t(label)}</label>}
      <input
        {...getInputProps({
          id: name,
          type: 'date',
          //
          value: value ?? '',
          onChange: (e) => setValue(e.target.value),
          //
          min,
          max,
          hidden,
        })}
      />
      {!!error && <span>{error}</span>}
    </div>
  );
}
