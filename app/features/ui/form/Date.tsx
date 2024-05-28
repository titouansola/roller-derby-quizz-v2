import { useControlField, useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

export function Date({
  name,
  label,
  min,
  max,
  required,
  hidden,
}: {
  name: string;
  label?: string;
  min?: string;
  max?: string;
  required?: boolean;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps, error } = useField(name);
  const [value, setValue] = useControlField<string>(name);
  return (
    <div className="form-control">
      {!!label && (
        <label htmlFor={name} className={cx(required && 'required-field')}>
          {t(label)}
        </label>
      )}
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
