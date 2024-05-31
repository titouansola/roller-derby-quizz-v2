import { useTranslation } from 'react-i18next';
import { Layout } from '~/features/ui/layout/Layout';

export function MinimalSkills() {
  const { t } = useTranslation();
  return (
    <Layout>
      <section className="flex flex-col items-end mb-20">
        <div className="w-full bg-dark px-8 pt-8 pb-10 rounded-t-2xl rounded-bl-2xl shadow-panel">
          <h2 className="text-alternate text-[24px] font-bold mb-1">
            {t('landing.mst.title')}
          </h2>
          <p className="text-grey text-[13px] mb-4">
            {t('landing.mst.subtitle')}
          </p>
          <p className="text-light mb-2 font-semibold">
            {t('landing.mst.content')}
          </p>
        </div>
        <div className="bg-dark px-3 pb-3 rounded-b-[1.5rem] -translate-y-[50%] shadow-panel">
          <button className="bg-alternate px-9 py-1 rounded-full font-bold">
            {t('landing.mst.cta_label')}
          </button>
        </div>
      </section>
    </Layout>
  );
}
