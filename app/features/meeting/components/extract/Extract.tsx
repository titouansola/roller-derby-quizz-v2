import { Document, Page, Text } from '@react-pdf/renderer';
import { ExtractApplicationsDto } from '~/features/applications/types/extract-applications-dto';
import { MeetingDto } from '../../types/meeting-dto';
import { ExtractHeader } from './ExtractHeader';
import { ExtractMatch } from './ExtractMatch';
import { MatchDto } from '~/features/match/types/match-dto';

export function Extract({
  meeting,
  applications,
  matches,
}: {
  meeting: MeetingDto;
  applications: ExtractApplicationsDto;
  matches: MatchDto[];
}) {
  return (
    <Document>
      <Page style={{ padding: 50, fontSize: 10 }}>
        <Text
          style={{
            position: 'absolute',
            top: 30,
            left: 50,
            color: 'grey',
          }}
          fixed
        >
          Roller Club
        </Text>
        <ExtractHeader meeting={meeting} />
        {matches.map((match, index) => {
          const matchApplications = applications[index];
          return (
            <ExtractMatch
              key={index}
              match={match}
              matchApplications={matchApplications}
            />
          );
        })}
        <Text
          style={{
            position: 'absolute',
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
