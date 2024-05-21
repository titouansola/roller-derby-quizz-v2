import { Link } from '@remix-run/react';
import { ChevronLeftIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MatchDto } from '~/features/match/types/match-dto';
import {
  getFullMatchLabel,
  getMatchLabel,
} from '~/features/match/utils/get-match-label';
import { formatDate } from '~/features/common/utils/format-date';
import { formatTime } from '~/features/common/utils/format-time';
import { Layout } from '~/features/ui/layout/Layout';
import { NavigationBar } from '~/features/ui/layout/NavigationBar';
import { MeetingDto } from '../types/meeting-dto';

export function MeetingDetails({
  meeting,
  matches,
}: {
  meeting: MeetingDto;
  matches: MatchDto[];
}) {
  const { t } = useTranslation();
  return (
    <>
      <NavigationBar>
        <Link to="../.." relative="path">
          <ChevronLeftIcon />
        </Link>
        <p className="grow font-semibold text-center">{t('meeting.details')}</p>
      </NavigationBar>
      <Layout>
        <div className="flex flex-col gap-2 mb-12">
          <h3 className="font-black">{meeting.title}</h3>
          <p>
            <span className="font-semibold">{t('meeting.dates')} :</span>&nbsp;
            {formatDate(meeting.startDate)}
            {!!meeting.endDate && ` - ${formatDate(meeting.endDate)}`}
          </p>
          <p>
            <span className="font-semibold">{t('meeting.location')} :</span>
            &nbsp;
            {meeting.location}
          </p>
          <p>
            <span className="font-semibold">{t('meeting.description')} :</span>
            <br />
            {meeting.description}
          </p>
          <p className="font-semibold">{t('meeting.matches')} :</p>
          <div className="flex flex-col gap-2">
            {matches.map((match, index) => (
              <ul className="pl-4" key={index}>
                <li className="list-disc">{getFullMatchLabel(match)}</li>
              </ul>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
}
