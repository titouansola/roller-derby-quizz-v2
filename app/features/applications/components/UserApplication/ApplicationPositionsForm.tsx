import { useTranslation } from 'react-i18next';
import { SelectMeetingPosition, allPositionInterests } from '~/db/schemas';
import { Checkbox } from '~/features/ui/form/Checkbox';

export function ApplicationPositionsForm({
  positions,
}: {
  positions: SelectMeetingPosition[];
}) {
  const { t } = useTranslation();
  //
  return (
    <table className="reset text-[12px] text-left">
      <thead>
        <tr>
          <th></th>
          {allPositionInterests.map((v) => (
            <th key={v}>{t(`interest.${v.toLowerCase()}`)}</th>
          ))}
          <th className={'border-l pl-2'}>{t('interest.as-ghost')}</th>
        </tr>
      </thead>
      <tbody>
        {positions.map(({ position, skating }, index) => {
          const baseName = `positions.${skating ? 'SO' : 'NSO'}.${position}`;
          return (
            <tr key={index} className={'h-[50px] border-b'}>
              <td className={'pr-4'}>
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
              <td className={'border-l text-center'}>
                <Checkbox name={`${baseName}.asGhost`} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
