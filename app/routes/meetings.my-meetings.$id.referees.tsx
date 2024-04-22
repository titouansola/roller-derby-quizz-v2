import { Link, useOutletContext } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { AllApplications } from '~/features/applications/components/AllApplications/AllApplications';
import { MeetingOutletContextData } from '~/features/meeting/types/meeting-outlet-context-data';
import { Layout } from '~/features/ui/layout/Layout';

export default function Component() {
  const { t } = useTranslation();
  const { matches, applications } =
    useOutletContext<MeetingOutletContextData>();
  return (
    <>
      <Layout>
        <Link to={'extract'} target="_blank" rel="noreferrer">
          <button>{t('meeting.extract')}</button>
        </Link>
        <AllApplications applications={applications} matches={matches} />
      </Layout>
    </>
  );
}
