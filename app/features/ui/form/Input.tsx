import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

export function Input({
  name,
  type = 'text',
  label,
  placeholder = label,
  required,
  hidden,
}: {
  name: string;
  type?: 'text' | 'email' | 'number' | 'time' | 'url';
  label?: string;
  placeholder?: string;
  required?: boolean;
  hidden?: boolean;
}) {
  const { t } = useTranslation();
  const { getInputProps, error } = useField(name);
  const props = { id: name, type, hidden, placeholder: t(placeholder ?? '') };
  //
  if (hidden) {
    return <input {...getInputProps(props)} />;
  }
  //
  return (
    <div className="form-control">
      {!!label && (
        <label htmlFor={name} className={cx(required && 'required-field')}>
          {t(label)}
        </label>
      )}
      <input className={cx(!!error && 'error')} {...getInputProps(props)} />
      {!!error && <span>{error}</span>}
    </div>
  );
}
