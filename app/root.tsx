import { ClerkApp, ClerkErrorBoundary } from '@clerk/remix';
import { rootAuthLoader } from '@clerk/remix/ssr.server';
import { LinksFunction, LoaderFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { i18next } from '~/features/i18n/i18next.server';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next/react';

// @ts-expect-error - tailwind is a css file to be requested by the browser
import stylesheet from './tailwind.css?url';
import { userService } from './features/users/services/user.service.server';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
];

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(args, async ({ request }) => {
    const [locale, user] = await Promise.all([
      i18next.getLocale(request),
      userService.getIfConnected(args),
    ]);
    return { locale, user };
  });
};

export const handle = {
  i18n: 'common',
};

export const ErrorBoundary = ClerkErrorBoundary();

function App() {
  const { locale } = useLoaderData<{ locale: string }>();
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
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App);
