import { PropsWithChildren } from 'react';
import { Layout } from './Layout';
import { useHref, useLocation, useNavigate } from '@remix-run/react';
import { Button } from '../components/Button';

export function NavigationBar({ children }: PropsWithChildren) {
  return (
    <Layout>
      <div className="flex items-end justify-center h-[44px] mb-8">
        <div className="flex items-center justify-between w-full">
          {children}
        </div>
      </div>
    </Layout>
  );
}

NavigationBar.Links = function NavigationBarLinks({
  children,
}: PropsWithChildren) {
  return <nav className="flex justify-center grow gap-2">{children}</nav>;
};

NavigationBar.Link = function NavigationBarLink(props: {
  label: string;
  path: string;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const path = useHref(props.path, { relative: 'path' });
  const isCurrent = location.pathname.match(props.path) !== null;
  //
  const to = () => {
    if (!isCurrent) {
      navigate(path);
    }
  };
  //
  return (
    <Button
      role={'link'}
      variant={'nav'}
      label={props.label}
      aria-current={isCurrent ? 'page' : 'false'}
      onClick={to}
      small
    />
  );
};
