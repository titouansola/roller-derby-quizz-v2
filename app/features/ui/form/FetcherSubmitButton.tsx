import { useTranslation } from 'react-i18next';

export function FetcherSubmitButton({
  actionName,
  label,
}: {
  actionName: string;
  label?: string;
}) {
  const { t } = useTranslation();
  return (
    <button type="submit" name="_action" value={actionName}>
      {t(label ?? 'save')}
    </button>
  );
}
