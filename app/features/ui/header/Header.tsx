import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/remix';
import { Link } from '@remix-run/react';
import { Role } from '~/features/users/user-metadata.type';
import { HasRole } from '~/features/users/components/HasRole';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t } = useTranslation();
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>Roller Derby Quizz</div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link to={'/'}>{t('home')}</Link>
          <Link to={'/quizz'}>{t('training')}</Link>
          <HasRole role={Role.ADMIN}>
            <Link to={'/admin/questions'}>{t('admin')}</Link>
          </HasRole>
        </nav>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
}
