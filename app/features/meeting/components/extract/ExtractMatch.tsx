import { Text, View } from '@react-pdf/renderer';
import { ExtractReferees } from './ExtractReferees';
import { ExtractApplicationDto } from '~/features/applications/types/extract-applications-dto';
import { MatchDto } from '~/features/match/types/match-dto';

export function ExtractMatch({
  match,
  matchApplications,
}: {
  match: MatchDto;
  matchApplications: ExtractApplicationDto;
}) {
  return (
    <View wrap={false} style={{ marginBottom: 45 }}>
      <Text
        style={{
          fontSize: 13,
          textAlign: 'center',
          marginBottom: 5,
        }}
      >
        {match.team1} vs {match.team2} -{' '}
        {new Date(match.date).toLocaleDateString()} {match.time}
      </Text>
      {!matchApplications && (
        <Text style={{ textAlign: 'center' }}>
          Il n&apos;y a aucun arbitre pour ce match.
        </Text>
      )}
      {!!matchApplications &&
        Object.entries(matchApplications).map(([position, referees]) => (
          <div
            key={position}
            style={{
              display: 'flex',
              flexDirection: 'row',
              padding: '5pt 0',
              borderBottom: '1pt solid #999999',
            }}
          >
            <Text style={{ width: 50, fontWeight: 'bold' }}>{position}</Text>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
              <ExtractReferees
                referees={referees.filter(({ asGhost }) => !asGhost)}
              />
              <ExtractReferees
                referees={referees.filter(({ asGhost }) => asGhost)}
              />
            </div>
          </div>
        ))}
    </View>
  );
}
