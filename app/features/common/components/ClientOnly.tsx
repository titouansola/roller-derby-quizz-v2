import { ReactNode } from 'react';
import { useHydrated } from '../utils/useHydrated';

export function ClientOnly({ children }: { children(): ReactNode }) {
  return useHydrated() ? children() : null;
}
