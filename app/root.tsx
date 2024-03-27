import { ClerkApp, ClerkErrorBoundary } from '@clerk/remix';
import { rootAuthLoader } from '@clerk/remix/ssr.server';
import { cssBundleHref } from '@remix-run/css-bundle';
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
import { Header } from '~/features/ui/header/Header';
import { i18next } from '~/features/i18n/i18next.server';
import { useTranslation } from 'react-i18next';
import { useChangeLanguage } from 'remix-i18next/react';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = (args) => {
  return rootAuthLoader(args, async ({ request }) => {
    const locale = await i18next.getLocale(request);
    return { locale };
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
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App);
