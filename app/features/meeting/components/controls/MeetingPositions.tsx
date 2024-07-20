import { useTranslation } from 'react-i18next';
import {
  RefereePosition,
  nonSkatingOfficials,
  skatingOfficials,
} from '~/db/schemas';
import { Checkbox } from '~/features/ui/form/Checkbox';

export function MeetingPositions() {
  const { t } = useTranslation();
  //
  return (
    <div>
      <h2>{t('meeting.available_positions')}</h2>
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
