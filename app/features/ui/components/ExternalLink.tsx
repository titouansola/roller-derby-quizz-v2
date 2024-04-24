import { ExternalLinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function ExternalLink({ href, label }: { href: string; label: string }) {
  const { t } = useTranslation();
  return (
    <a
      href={href}
      className="flex gap-1 items-center text-blue-600 cursor-pointer"
      target="_blank"
      rel="noreferrer"
    >
      <ExternalLinkIcon size={18} />
      {t(label)}
    </a>
  );
}
