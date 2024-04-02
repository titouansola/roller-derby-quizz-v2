import { useTranslation } from 'react-i18next';
import { positionInterestEnum, refereePositionEnum } from '~/db/schemas';
import { Checkbox } from '~/features/ui/form/Checkbox';

export function ApplicationInterestForm() {
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
        </tr>
      </thead>
      <tbody>
        {refereePositionEnum.enumValues.map((position) => (
          <tr key={position}>
            <td>{position}</td>
            {positionInterestEnum.enumValues.map((interest) => (
              <td key={interest}>
                <Checkbox
                  name={`positions.${position}`}
                  value={interest}
                  type="radio"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
