import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { useField } from 'remix-validated-form';

export function CheckboxGroup({
  label,
  name,
  children,
}: PropsWithChildren<{ label: string; name: string }>) {
  const { error } = useField(name);
  const { t } = useTranslation();
  return (
    <fieldset>
      <legend>{t(label)}</legend>
      {children}
      {!!error && <p>{error}</p>}
    </fieldset>
  );
}
