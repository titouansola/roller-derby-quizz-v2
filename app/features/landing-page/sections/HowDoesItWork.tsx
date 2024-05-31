import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import { Layout } from '~/features/ui/layout/Layout';
import { ChevronRightIcon } from 'lucide-react';

export function HowDoesItWork() {
  const { t } = useTranslation();
  //
  return (
    <Layout>
      <section className="mb-14">
        <h2 className="section-title">{t('landing.hdiw.section_title')}</h2>
        <div className="flex flex-col gap-14">
          <Step index={1} lines={3} arrow />
          <Step index={2} lines={3} arrow rightSide />
          <Step index={3} lines={2} />
          <Step index={4} lines={3} last />
        </div>
      </section>
    </Layout>
  );
}

function Step({
  index,
  lines,
  arrow = false,
  rightSide = false,
  last = false,
}: {
  index: number;
  lines: number;
  arrow?: boolean;
  rightSide?: boolean;
  last?: boolean;
}) {
  const { t } = useTranslation();
  //
  return (
    <div
      className={cx(
        'relative flex flex-col w-fit',
        rightSide && 'ml-auto',
        last &&
          'items-center m-auto px-8 py-4 border-4 border-primary rounded-2xl'
      )}
    >
      <h3 className={cx('mb-1 text-[21px] font-bold', last && 'text-center')}>
        {t(`landing.hdiw.step${index}.title`)}
      </h3>
      <ul className={cx('flex flex-col', rightSide && 'items-end')}>
        {new Array(lines).fill(null).map((_, lineIndex) => (
          <li key={lineIndex} className="flex items-center gap-1">
            <ChevronRightIcon size={16} strokeWidth={1} />
            {t(`landing.hdiw.step${index}.line${lineIndex + 1}`)}
          </li>
        ))}
      </ul>
      <Arrow show={arrow} fromRight={rightSide} />
      {last && (
        <button className="mt-4 px-8 py-2 bg-dark rounded-full text-[13px] text-light font-bold">
          {t(`landing.hdiw.step${index}.cta_label`)}
        </button>
      )}
    </div>
  );
}

function Arrow({
  show,
  fromRight = false,
}: {
  show: boolean;
  fromRight?: boolean;
}) {
  const { t } = useTranslation();
  //
  if (!show) {
    return null;
  }
  //
  return (
    <img
      src="/img/arrow_illustration.png"
      alt={t('landing.hdiw.arrow_img_alt')}
      className={cx(
        'absolute w-28 top-1/2',
        fromRight
          ? '-scale-x-100 origin-top-left -rotate-[30deg]'
          : 'left-full origin-top-left rotate-[30deg]'
      )}
    />
  );
}
