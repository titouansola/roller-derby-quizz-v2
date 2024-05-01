import { Link } from '@remix-run/react';
import { MeetingDto } from '../types/meeting-dto';
import { formatDate } from '~/features/common/utils/formatDate';

export function MeetingCard({
  meeting,
  path,
}: {
  meeting: MeetingDto;
  path: string;
}) {
  return (
    <Link to={path} className="block border rounded p-2 hover:bg-gray-100">
      <h3>{meeting.title}</h3>
      <p>
        {formatDate(meeting.startDate)}
        {!!meeting.endDate && ` - ${formatDate(meeting.endDate)}`}
      </p>
      <p className="font-light text-[14px]">{meeting.location}</p>
    </Link>
  );
}
