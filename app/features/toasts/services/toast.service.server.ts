import { createCookieSessionStorage } from '@remix-run/node';
import { Toast } from '../types/toast.type';

class ToastService {
  private css = createCookieSessionStorage({
    cookie: {
      name: '__toast',
      secrets: ['FJHG456ugh869OoçkgiH5R7TUIYU'],
    },
  });

  /* General */

  public async putToast(toast: Toast, headers = new Headers()) {
    const session = await this.css.getSession();
    session.flash('toast', toast);
    headers.set('Set-Cookie', await this.css.commitSession(session));
    return headers;
  }

  public async popToast(request: Request) {
    const session = await this.css.getSession(request.headers.get('Cookie'));
    const toast = (session.get('toast') ?? null) as Toast | null;
    const headers = new Headers();
    headers.set('Set-Cookie', await this.css.commitSession(session));
    return { toast, headers };
  }

  public async createResponseWithToast(toast: Toast, headers?: Headers) {
    return new Response(null, {
      status: 200,
      headers: await this.putToast(toast, headers),
    });
  }

  /* Typed reponses */

  public async createResponseCreatedToast(headers?: Headers) {
    return new Response(null, {
      status: 200,
      headers: await this.putCreatedToast(headers),
    });
  }

  public async createResponseUpdatedToast(headers?: Headers) {
    return new Response(null, {
      status: 200,
      headers: await this.putUpdatedToast(headers),
    });
  }

  public async createResponseDeletedToast(headers?: Headers) {
    return new Response(null, {
      status: 200,
      headers: await this.putDeletedToast(headers),
    });
  }

  public async createResponseErrorToast(message?: string, headers?: Headers) {
    return new Response(null, {
      status: 500,
      headers: await this.putErrorToast(message, headers),
    });
  }

  /* Typed toasts */

  public async putCreatedToast(headers?: Headers) {
    return this.putToast(
      { type: 'success', message: 'toast.created' },
      headers
    );
  }

  public async putUpdatedToast(headers?: Headers) {
    return this.putToast(
      { type: 'success', message: 'toast.updated' },
      headers
    );
  }

  public async putDeletedToast(headers?: Headers) {
    return this.putToast(
      { type: 'success', message: 'toast.deleted' },
      headers
    );
  }

  public async putErrorToast(message?: string, headers?: Headers) {
    return this.putToast(
      { type: 'error', message: message ?? 'toast.error' },
      headers
    );
  }
}

export const toastService = new ToastService();
