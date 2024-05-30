import { Await, AwaitProps } from '@remix-run/react';
import { Suspense } from 'react';
import { Loader } from './Loader';

export function Suspended<Resolve>(props: AwaitProps<Resolve>) {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center my-4">
          <Loader wide />
        </div>
      }
    >
      <Await {...props} />
    </Suspense>
  );
}
