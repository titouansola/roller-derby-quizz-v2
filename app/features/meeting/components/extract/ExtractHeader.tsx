import { Text, View } from '@react-pdf/renderer';
import { MeetingDto } from '../../types/meeting-dto';
import { formatDate } from '~/features/common/utils/formatDate';

export function ExtractHeader({ meeting }: { meeting: MeetingDto }) {
  const isOneDay = meeting.startDate === meeting.endDate;
  return (
    <View style={{ textAlign: 'center' }} fixed>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>{meeting.title}</Text>
      <div style={{ marginBottom: 30 }}>
        <Text>
          {isOneDay ? (
            formatDate(meeting.startDate)
          ) : (
            <>
              {formatDate(meeting.startDate)} - {formatDate(meeting.endDate)}
            </>
          )}
        </Text>
        <Text>{meeting.location}</Text>
      </div>
    </View>
  );
}
