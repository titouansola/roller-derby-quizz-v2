import { useTranslation } from 'react-i18next';
import { allPositionInterests } from '~/db/schemas';
import { refereePositions } from '~/features/referee/constants/referee-positions';
import { Checkbox } from '~/features/ui/form/Checkbox';

export function ApplicationPositionsForm() {
  const { t } = useTranslation();
  //
  return (
    <table>
      <thead>
        <tr>
          <th></th>
          {allPositionInterests.map((v) => (
            <th key={v}>{t(`interest.${v.toLowerCase()}`)}</th>
          ))}
          <th>{t('interest.as-ghost')}</th>
        </tr>
      </thead>
      <tbody>
        {refereePositions.map(({ position, skating }, index) => {
          const baseName = `positions.${skating ? 'SO' : 'NSO'}.${position}`;
          return (
            <tr key={index}>
              <td>
                {position}
                <input
                  type="checkbox"
                  name={`${baseName}.skating`}
                  defaultChecked={skating}
                  hidden
                />
              </td>
              {allPositionInterests.map((interest, index) => (
                <td key={index}>
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
