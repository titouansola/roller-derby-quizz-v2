import { Text } from '@react-pdf/renderer';

type Referee = {
  derbyName: string;
  asGhost: boolean;
};

export function ExtractReferees({ referees }: { referees: Referee[] }) {
  return referees.map((referee, index) => (
    <Text key={index}>
      {referee.derbyName} {referee.asGhost && '(G)'}
    </Text>
  ));
}
