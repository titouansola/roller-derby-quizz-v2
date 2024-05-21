import { formatDate } from '~/features/common/utils/format-date';
import { getDateDifference } from '~/features/common/utils/get-date-difference';
import { MeetingDto } from '~/features/meeting/types/meeting-dto';
import { Checkbox } from '~/features/ui/form/Checkbox';

export function ApplicationDayAvailabilitiesForm({
  meeting,
}: {
  meeting: MeetingDto;
}) {
  const startDate = new Date(meeting.startDate);
  const endDate = new Date(meeting.endDate);
  const days = getDateDifference(startDate, endDate) + 1;
  //
  return new Array(days)
    .fill(null)
    .map((_, day) => (
      <Checkbox
        key={day}
        name={`availabilities[${day}].selected`}
        label={formatDate(
          new Date(startDate.getTime() + day * 24 * 60 * 60 * 1000)
        )}
      />
    ));
}
