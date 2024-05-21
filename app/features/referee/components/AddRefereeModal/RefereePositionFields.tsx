import { Input } from '~/features/ui/form/Input';
import { Checkbox } from '~/features/ui/form/Checkbox';

export function RefereePositionFields() {
  return (
    <>
      <Input name="matchId" hidden />
      <Input name="position" hidden />
      <Checkbox name="skating" hidden />
    </>
  );
}
