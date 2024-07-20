import { Link } from '@remix-run/react';
import { MeetingDto } from '../types/meeting-dto';
import { formatDate } from '~/features/common/utils/format-date';
import { ChevronRightIcon } from 'lucide-react';

export function MeetingCard({
  meeting,
  path,
}: {
  meeting: MeetingDto;
  path: string;
}) {
  return (
    <Link
      to={path}
      className="relative block rounded-lg p-4 bg-primary-background hover:bg-primary"
    >
      <h3>{meeting.title}</h3>
      <p>
        {formatDate(meeting.startDate)}
        {!!meeting.endDate && ` - ${formatDate(meeting.endDate)}`}
      </p>
      <p className="font-light text-[14px]">{meeting.location}</p>
      <div className="absolute top-1/2 right-4 -translate-y-1/2">
        <ChevronRightIcon size={32} />
      </div>
    </Link>
  );
}
