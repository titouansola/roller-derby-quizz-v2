import { useTranslation } from 'react-i18next';
import { ExperienceForm } from '~/features/experience/components/ExperienceForm';

export default function Component() {
  const { t } = useTranslation();
  //
  return (
    <>
      <h1>{t('dashboard.experiences.create')}</h1>
      <ExperienceForm />
    </>
  );
}
