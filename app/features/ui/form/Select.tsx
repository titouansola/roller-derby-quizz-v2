import { useField } from 'remix-validated-form';
import { SelectOption, isSelectOption } from '../types/select-option';
import { useTranslation } from 'react-i18next';

export function Select({
  name,
  label,
  options,
  multiple,
}: {
  name: string;
  label: string;
  options: SelectOption[];
  multiple?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps, error } = useField(name);
  return (
    <div>
      <label htmlFor={name}>{label}</label>
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
