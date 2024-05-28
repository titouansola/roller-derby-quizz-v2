import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { SelectOption, isSelectOption } from '../types/select-option';

export function Select({
  name,
  label,
  options,
  multiple,
  required,
}: {
  name: string;
  label: string;
  options: SelectOption[];
  multiple?: boolean;
  required?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps, error } = useField(name);
  return (
    <div className="form-control">
      <label htmlFor={name} className={cx(required && 'required-field')}>
        {label}
      </label>
      <select {...getInputProps({ id: name, multiple })}>
        {options.map((option, index) => (
          <option
            key={index}
            value={isSelectOption(option) ? option.value : option}
          >
            {t(isSelectOption(option) ? option.label : option)}
          </option>
        ))}
      </select>
      {!!error && <div>{error}</div>}
    </div>
  );
}
