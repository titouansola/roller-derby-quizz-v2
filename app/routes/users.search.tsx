import { LoaderFunctionArgs, json } from '@remix-run/node';
import { userService } from '~/features/users/services/user.service.server';

export async function loader(args: LoaderFunctionArgs) {
  await userService.getCurrentUser(args);
  const url = new URL(args.request.url);
  const query = url.searchParams.get('search');
  if (!query) {
    throw new Error('No search query provided');
  }
  const users = await userService.findUsers(query);
  return json(users);
}
