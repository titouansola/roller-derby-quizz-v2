import { Text, View } from '@react-pdf/renderer';
import { ExtractReferees } from './ExtractReferees';
import { ExtractApplicationDto } from '~/features/applications/types/extract-applications-dto';
import { MatchDto } from '~/features/match/types/match-dto';
import { SelectManualApplication, refereePositionEnum } from '~/db/schemas';
import { formatTime } from '~/features/common/utils/formatTime';
import { formatDate } from '~/features/common/utils/formatDate';

export function ExtractMatch({
  match,
  matchApplications,
  manualApplications,
}: {
  match: MatchDto;
  matchApplications: ExtractApplicationDto;
  manualApplications: SelectManualApplication[];
}) {
  const hasApplications = !!matchApplications || manualApplications.length > 0;
  return (
    <View wrap={false} style={{ marginBottom: 45 }}>
      <Text
        style={{
          fontSize: 13,
          textAlign: 'center',
          marginBottom: 5,
        }}
      >
        {match.team1} vs {match.team2} - {formatDate(match.date)}{' '}
        {formatTime(match.time)}
      </Text>

      {!hasApplications && (
        <Text style={{ textAlign: 'center' }}>
          Il n&apos;y a aucun arbitre pour ce match.
        </Text>
      )}

      {hasApplications &&
        refereePositionEnum.enumValues.map((position) => {
          const appliedReferees = matchApplications?.[position];
          const manualReferees = manualApplications.filter(
            (ma) => ma.position === position
          );
          const referees = [
            ...manualReferees.filter(({ asGhost }) => !asGhost),
            ...(appliedReferees?.filter(({ asGhost }) => !asGhost) ?? []),
            ...manualReferees.filter(({ asGhost }) => asGhost),
            ...(appliedReferees?.filter(({ asGhost }) => asGhost) ?? []),
          ];
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
                <ExtractReferees referees={referees} />
              </div>
            </div>
          );
        })}
    </View>
  );
}
