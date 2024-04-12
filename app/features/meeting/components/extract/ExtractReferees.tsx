import { Text } from '@react-pdf/renderer';
import { ExtractUserApplicationDto } from '~/features/applications/types/extract-applications-dto';

export function ExtractReferees({
  referees,
}: {
  referees: ExtractUserApplicationDto[];
}) {
  return referees.map((referee, index) => (
    <Text key={index}>
      {referee.derbyName} {referee.asGhost && '(G)'}
    </Text>
  ));
}
