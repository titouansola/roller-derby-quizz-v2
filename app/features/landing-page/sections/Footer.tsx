import { Link } from '@remix-run/react';
import { ExternalLinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Logo } from '~/features/common/components/Logo';
import { RouteEnum } from '~/features/ui/enums/route-enum';

const linkGroups: LinkGroupProps[] = [
  {
    title: 'Roller Club',
    links: [
      { to: RouteEnum.MEETINGS, label: 'landing.footer.meetings' },
      { to: RouteEnum.MINIMAL_SKILLS, label: 'landing.footer.minimal_skills' },
      // TODO :
      // { to: RouteEnum.ABOUT, label: 'landing.footer.about' },
      // { to: RouteEnum.CONTACT, label: 'landing.footer.contact' },
    ],
  },
  {
    title: 'landing.footer.useful_links',
    links: [
      { to: '', label: 'landing.footer.wftda' },
      { to: '', label: 'landing.footer.rules_of_roller_derby' },
    ],
  },
];

export function Footer() {
  const { t } = useTranslation();
  //
  return (
    <footer className="flex flex-col gap-10 bg-dark text-light px-4 pt-8 pb-[81px]">
      <div className="flex">
        <div className="flex gap-6 grow flex-wrap">
          {linkGroups.map((linkGroup, key) => (
            <LinkGroup key={key} {...linkGroup} />
          ))}
        </div>
        <Logo size={3} />
      </div>
      <p className="text-center text-[11px] text-grey font-normal">
        {t('landing.footer.signature')}
      </p>
    </footer>
  );
}

function LinkGroup(props: LinkGroupProps) {
  const { t } = useTranslation();
  //
  return (
    <div>
      <h4 className="text-[18px] mb-3">{t(props.title)}</h4>
      <ul className="flex flex-col gap-2">
        {props.links.map((link, key) => (
          <li key={key}>
            <Link
              className="flex items-center gap-1 text-alternate"
              to={link.to}
            >
              <ExternalLinkIcon size={16} />
              {t(link.label)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

type LinkGroupProps = {
  title: string;
  links: { to: string; label: string }[];
};
