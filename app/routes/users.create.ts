import { ActionFunctionArgs } from '@remix-run/node';
import { userService } from '~/features/users/services/user.service.server';
import { createUserPayloadSchema } from '~/features/users/types/create-user-payload';

export async function action(args: ActionFunctionArgs) {
  const body = await args.request.json();
  const payload = createUserPayloadSchema.parse(body);
  await userService.createOrUpdate({
    externalId: payload.data.id,
    email: payload.data.email_addresses[0].email_address,
  });
  return new Response('OK', { status: 200 });
}
