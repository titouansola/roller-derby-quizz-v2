import { useTranslation } from 'react-i18next';
import { Layout } from '~/features/ui/layout/Layout';

export function Hero() {
  const { t } = useTranslation();
  return (
    <Layout>
      <section className="flex flex-col items-end mt-14 mb-20">
        <div className="w-full bg-dark px-8 pt-8 pb-10 rounded-t-2xl rounded-bl-2xl shadow-panel">
          <h1 className="text-light text-[28px] font-bold">
            {t('landing.hero.title')}
          </h1>
          <p className="text-grey">{t('landing.hero.subtitle')}</p>
        </div>
        <div className="bg-dark px-3 pb-3 rounded-b-[1.5rem] -translate-y-[50%] shadow-panel">
          <button className="bg-alternate px-9 py-1 rounded-full font-bold">
            {t('landing.hero.cta_label')}
          </button>
        </div>
      </section>
    </Layout>
  );
}
