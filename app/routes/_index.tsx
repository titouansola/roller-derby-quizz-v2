import type { MetaFunction } from '@remix-run/node';
import { Footer } from '~/features/landing-page/sections/Footer';
import { Header } from '~/features/landing-page/sections/Header';
import { Hero } from '~/features/landing-page/sections/Hero';
import { HowDoesItWork } from '~/features/landing-page/sections/HowDoesItWork';
import { MinimalSkills } from '~/features/landing-page/sections/MinimalSkills';
import { UVP } from '~/features/landing-page/sections/UVP';

export const meta: MetaFunction = () => {
  return [
    { title: 'Roller Club' },
    { name: 'description', content: 'Welcome to Roller Club!' },
  ];
};

export default function Index() {
  return (
    <main className="h-screen overflow-auto">
      <Header />
      <div className="max-w-2xl m-auto">
        <Hero />
        <UVP />
        <HowDoesItWork />
        <MinimalSkills />
      </div>
      <Footer />
    </main>
  );
}
