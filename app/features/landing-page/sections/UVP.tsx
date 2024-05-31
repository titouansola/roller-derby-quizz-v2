import { useTranslation } from 'react-i18next';
import {
  LucideIcon,
  ClipboardCheckIcon,
  WatchIcon,
  MessageCircleMoreIcon,
} from 'lucide-react';
import cx from 'classnames';
import { Layout } from '~/features/ui/layout/Layout';
import { Panel } from '~/features/landing-page/components/Panel';
import {
  ColorClassName,
  colorClassnames,
} from '~/features/landing-page/constants/color-classnames';

const panels: PanelUVPProps[] = [
  {
    backgroundColor: 'primary',
    icon: ClipboardCheckIcon,
    title: 'landing.uvp.organisation_title',
    content: 'landing.uvp.organisation_content',
    ctaColor: 'dark',
    ctaLabel: 'landing.uvp.organisation_cta_label',
    reversed: false,
  },
  {
    backgroundColor: 'dark',
    icon: WatchIcon,
    title: 'landing.uvp.fast_title',
    content: 'landing.uvp.fast_content',
    ctaColor: 'secondary',
    ctaLabel: 'landing.uvp.fast_cta_label',
    reversed: true,
  },
  {
    backgroundColor: 'secondary',
    icon: MessageCircleMoreIcon,
    title: 'landing.uvp.communication_title',
    content: 'landing.uvp.communication_content',
    ctaColor: 'dark',
    ctaLabel: 'landing.uvp.communication_cta_label',
    reversed: false,
  },
];

export function UVP() {
  const { t } = useTranslation();
  return (
    <Layout>
      <section className="mb-14">
        <h2 className="section-title">{t('landing.uvp.section_title')}</h2>
        <div className="flex flex-col gap-6">
          {panels.map((panel, key) => (
            <PanelUVP key={key} {...panel} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

function PanelUVP(props: PanelUVPProps) {
  const { t } = useTranslation();
  //
  return (
    <Panel color={props.backgroundColor}>
      <div
        className={cx(
          'flex items-center gap-4',
          props.reversed && 'flex-row-reverse'
        )}
      >
        <div className="text-dark rounded-full bg-light p-8">
          <props.icon size={100} strokeWidth={1} />
        </div>
        <div className="grow">
          <h3 className="text-[18px] font-bold mb-2">{t(props.title)}</h3>
          <p className="text-[13px] mb-4">{t(props.content)}</p>
          <button
            className={`${colorClassnames[props.ctaColor]} w-full py-1 text-[13px] font-bold rounded-full`}
          >
            {t(props.ctaLabel)}
          </button>
        </div>
      </div>
    </Panel>
  );
}

type PanelUVPProps = {
  backgroundColor: ColorClassName;
  icon: LucideIcon;
  title: string;
  content: string;
  ctaColor: ColorClassName;
  ctaLabel: string;
  reversed: boolean;
};
