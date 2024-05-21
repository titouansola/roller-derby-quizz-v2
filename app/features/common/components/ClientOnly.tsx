import { ReactNode } from 'react';
import { useHydrated } from '../utils/use-hydrated';

export function ClientOnly({ children }: { children(): ReactNode }) {
  return useHydrated() ? children() : null;
}
