import { ActionFunction, ActionFunctionArgs } from '@remix-run/node';
import { toastService } from '~/features/toasts/services/toast.service.server';
import { InternalError } from '../types/internal-error';

export function handleErrors(action: ActionFunction) {
  return async (args: ActionFunctionArgs) => {
    try {
      return await action(args);
    } catch (error: any) {
      if (error instanceof InternalError) {
        return toastService.createResponseErrorToast(error.message);
      }
      return new Response('error.unknown', { status: 500 });
    }
  };
}
