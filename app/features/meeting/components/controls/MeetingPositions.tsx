import { useTranslation } from 'react-i18next';
import { useFormContext } from 'remix-validated-form';
import {
  RefereePosition,
  nonSkatingOfficials,
  skatingOfficials,
} from '~/db/schemas';
import { Checkbox } from '~/features/ui/form/Checkbox';

export function MeetingPositions() {
  const { t } = useTranslation();
  const { fieldErrors } = useFormContext();
  console.log(fieldErrors);
  //
  return (
    <div>
      <h3 className="text-[20px]">{t('meeting.available_positions')}</h3>
      <div className="flex">
        <div className="grow">
          <h4>{t('meeting.skating_officials')}</h4>
          <div className="flex flex-col gap-2">
            {skatingOfficials.map((position) => (
              <MeetingPosition key={position} position={position} skating />
            ))}
          </div>
        </div>
        <div className="grow">
          <h4>{t('meeting.non_skating_officials')}</h4>
          <div className="flex flex-col gap-2">
            {nonSkatingOfficials.map((position) => (
              <MeetingPosition key={position} position={position} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MeetingPosition({
  position,
  skating = false,
}: {
  position: RefereePosition;
  skating?: boolean;
}) {
  return (
    <Checkbox
      name={`positions.${skating ? 'skating' : 'nonSkating'}.${position}`}
      label={position}
    />
  );
}
