import { Document, Page, Text } from '@react-pdf/renderer';
import { MatchDto } from '~/features/match/types/match-dto';
import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';
import { MeetingDto } from '../../types/meeting-dto';
import { ExtractHeader } from './ExtractHeader';
import { ExtractMatch } from './ExtractMatch';

export function Extract({
  meeting,
  matches,
  referees,
}: {
  meeting: MeetingDto;
  matches: MatchDto[];
  referees: MeetingRefereeDto[];
}) {
  return (
    <Document>
      <Page style={{ padding: 50, fontSize: 10 }}>
        <Text
          style={{
            position: 'absolute',
            top: 30,
            left: 50,
            color: 'grey',
          }}
          fixed
        >
          Roller Club
        </Text>
        <ExtractHeader meeting={meeting} />
        {matches.map((match) => {
          const matchReferees = referees.filter(
            (referee) => referee.matchId === match.id
          );
          return (
            <ExtractMatch
              key={match.id}
              match={match}
              referees={matchReferees}
            />
          );
        })}
        <Text
          style={{
            position: 'absolute',
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
