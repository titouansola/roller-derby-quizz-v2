import { Text } from '@react-pdf/renderer';
import { MeetingRefereeDto } from '~/features/referee/types/meeting-referee-dto';

export function ExtractReferees({
  referees,
}: {
  referees: MeetingRefereeDto[];
}) {
  return referees.map((referee, index) => (
    <Text key={index}>
      {referee.derbyName} {referee.asGhost && '(G)'}
    </Text>
  ));
}
