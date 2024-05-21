import { Text, View } from '@react-pdf/renderer';
import { refereePositionEnum } from '~/db/schemas';
import { MatchDto } from '~/features/match/types/match-dto';
import { getFullMatchLabel } from '~/features/match/utils/get-match-label';
import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';
import { ExtractReferees } from './ExtractReferees';

export function ExtractMatch({
  match,
  referees,
}: {
  match: MatchDto;
  referees: MeetingRefereeDto[];
}) {
  const hasReferees = referees.length > 0;
  return (
    <View wrap={false} style={{ marginBottom: 45 }}>
      <Text
        style={{
          fontSize: 13,
          textAlign: 'center',
          marginBottom: 5,
        }}
      >
        {getFullMatchLabel(match)}
      </Text>

      {!hasReferees && (
        <Text style={{ textAlign: 'center' }}>
          Il n&apos;y a aucun arbitre pour ce match.
        </Text>
      )}

      {hasReferees &&
        refereePositionEnum.enumValues.map((position) => {
          const positionedReferees = referees.filter(
            (referee) => referee.position === position
          );
          //
          return (
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
                <ExtractReferees referees={positionedReferees} />
              </div>
            </div>
          );
        })}
    </View>
  );
}
