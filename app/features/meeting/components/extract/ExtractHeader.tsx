import { Text, View } from '@react-pdf/renderer';
import { MeetingDto } from '../../types/meeting-dto';

export function ExtractHeader({ meeting }: { meeting: MeetingDto }) {
  const isOneDay = meeting.startDate === meeting.endDate;
  return (
    <View style={{ textAlign: 'center' }} fixed>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>{meeting.title}</Text>
      <div style={{ marginBottom: 30 }}>
        <Text>
          {isOneDay ? (
            new Date(meeting.startDate).toLocaleDateString()
          ) : (
            <>
              {new Date(meeting.startDate).toLocaleDateString()} -{' '}
              {new Date(meeting.endDate).toLocaleDateString()}
            </>
          )}
        </Text>
        <Text>{meeting.location}</Text>
      </div>
    </View>
  );
}
