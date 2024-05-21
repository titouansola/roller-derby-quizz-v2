import { renderToStream } from '@react-pdf/renderer';
import { LoaderFunctionArgs } from '@remix-run/node';
import { matchService } from '~/features/match/services/match-service.server';
import { Extract } from '~/features/meeting/components/extract/Extract';
import { meetingService } from '~/features/meeting/services/meeting-service.server';
import { refereeService } from '~/features/referee/services/referee.service.server';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  await userService.getConnectedOrRedirect(args);
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    return new Response('Not found', { status: 404 });
  }
  const [meeting, matches, referees] = await Promise.all([
    meetingService.getMeetingById(id),
    matchService.getMeetingMatches(id),
    refereeService.fetchMeetingReferees(id),
  ]);
  //
  const stream = await renderToStream(
    <Extract meeting={meeting} matches={matches} referees={referees} />
  );
  //
  const body: Buffer = await new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
  //
  const headers = new Headers({ 'Content-Type': 'application/pdf' });
  return new Response(body, { status: 200, headers });
}
