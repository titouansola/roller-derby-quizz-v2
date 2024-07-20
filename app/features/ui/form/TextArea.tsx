import { useField } from 'remix-validated-form';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

export function TextArea({
  name,
  label,
  rows = 5,
  required,
  hidden,
}: {
  name: string;
  label?: string;
  rows?: number;
  required?: boolean;
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
      {!!label && (
        <label htmlFor={name} className={cx(required && 'required-field')}>
          {t(label)}
        </label>
      )}
      <textarea className={cx(!!error && 'error')} {...getInputProps(props)} />
      {!!error && <span>{error}</span>}
    </div>
  );
}
