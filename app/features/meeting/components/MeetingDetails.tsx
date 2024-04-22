import { MatchDto } from '~/features/match/types/match-dto';
import { MeetingDto } from '../types/meeting-dto';

export function MeetingDetails({
  meeting,
  matches,
}: {
  meeting: MeetingDto;
  matches: MatchDto[];
}) {
  return (
    <div>
      <h1>{meeting.title}</h1>
      <p>
        {meeting.startDate}
        {!!meeting.endDate && ` - ${meeting.endDate}`}
      </p>
      <p>{meeting.location}</p>
      <p>{meeting.description}</p>
      <div>
        {matches.map((match, index) => (
          <div key={index}>
            <h3>
              {match.team1} vs {match.team2}
            </h3>
            <p>{match.time}</p>
            <p>{match.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
