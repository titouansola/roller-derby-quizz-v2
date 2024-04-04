import { MeetingDto } from '../types/meeting-dto';

export function MeetingDetails({ meeting }: { meeting: MeetingDto }) {
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
        {meeting.matches.map((match, index) => (
          <div key={index}>
            <h3>
              {match.team1} vs {match.team2}
            </h3>
            <p>{match.time}</p>
            <p>{match.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
