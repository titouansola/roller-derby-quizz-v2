import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [
    { title: 'Roller Club' },
    { name: 'description', content: 'Welcome to Roller Club!' },
  ];
};

export default function Index() {
  return (
    <>
      <h1>Landing Page</h1>
    </>
  );
}
