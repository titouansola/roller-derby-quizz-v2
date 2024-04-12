import { renderToStream } from '@react-pdf/renderer';
import { LoaderFunctionArgs } from '@remix-run/node';
import { applicationService } from '~/features/applications/services/application-service.server';
import { Extract } from '~/features/meeting/components/extract/Extract';
import { meetingService } from '~/features/meeting/services/meeting-service.server';

export async function loader(args: LoaderFunctionArgs) {
  // await userService.getCurrentUser(args);
  const id = parseInt(args.params.id ?? '0');
  if (!(id > 0)) {
    return new Response('Not found', { status: 404 });
  }
  const [meeting, applications] = await Promise.all([
    meetingService.getMeetingById(id),
    applicationService.extractApplications(id),
  ]);
  //
  const stream = await renderToStream(
    <Extract meeting={meeting} applications={applications} />
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
