import { ClerkApp } from '@clerk/remix';
import { rootAuthLoader } from '@clerk/remix/ssr.server';
import { LinksFunction, LoaderFunction, json } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next/react';
import { i18next } from '~/features/i18n/i18next.server';
import { ToastRenderer } from '~/features/toasts/components/ToastRenderer';
import { Toast } from '~/features/toasts/types/toast.type';
import { userService } from './features/users/services/user.service.server';
import { toastService } from './features/toasts/services/toast.service.server';
// @ts-expect-error - tailwind is a css file to be requested by the browser
import stylesheet from './tailwind.css?url';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(args, async ({ request }) => {
    const [locale, user, { toast, headers }] = await Promise.all([
      i18next.getLocale(request),
      userService.getIfConnected(args),
      toastService.popToast(request),
    ]);
    return json({ locale, user, toast }, { headers });
  });
};

export const handle = {
  i18n: 'common',
};

function App() {
  const { locale, toast } = useLoaderData<{ locale: string; toast: Toast }>();
  const { i18n } = useTranslation();
  useChangeLanguage(locale);
  //
  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ToastRenderer toast={toast} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App);
