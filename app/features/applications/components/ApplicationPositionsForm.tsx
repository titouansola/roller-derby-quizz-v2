import { useTranslation } from 'react-i18next';
import { positionInterestEnum, refereePositionEnum } from '~/db/schemas';
import { Checkbox } from '~/features/ui/form/Checkbox';
import { Input } from '~/features/ui/form/Input';

export function ApplicationPositionsForm({
  matchIndex,
}: {
  matchIndex: number;
}) {
  const { t } = useTranslation();
  //
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {positionInterestEnum.enumValues.map((v) => (
            <th key={v}>{t(`interest.${v.toLowerCase()}`)}</th>
          ))}
          <th>{t('interest.as-ghost')}</th>
        </tr>
      </thead>
      <tbody>
        {refereePositionEnum.enumValues.map((position) => {
          const baseName = `positions[${matchIndex}].${position}`;
          return (
            <tr key={position}>
              <td>
                {position}
                <Input name={`${baseName}.id`} hidden />
              </td>
              {positionInterestEnum.enumValues.map((interest) => (
                <td key={interest}>
                  <Checkbox
                    name={`${baseName}.interest`}
                    value={interest}
                    type="radio"
                  />
                </td>
              ))}
              <td>
                <Checkbox name={`${baseName}.asGhost`} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
