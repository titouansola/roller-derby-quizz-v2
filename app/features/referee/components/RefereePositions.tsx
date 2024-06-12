import { useTranslation } from 'react-i18next';
import { Layout } from '~/features/ui/layout/Layout';
import { formatDate } from '~/features/common/utils/format-date';
import { formatTime } from '~/features/common/utils/format-time';
import { RefereePositionDto } from '../types/referee-position-dto';

export function RefereePositions({
  positions,
}: {
  positions: RefereePositionDto[];
}) {
  const { t } = useTranslation();
  //
  return (
    <Layout>
      <h4>{t('meeting.referee.positions')}</h4>
      <div className="flex flex-col gap-4">
        {positions.map(({ label, date, time, positions }, key) => (
          <div key={key} className="pl-2 border-l">
            <div>{`${label} - ${formatDate(date)} ${formatTime(time)}`}</div>
            <div className="font-bold">{positions.join(', ')}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
