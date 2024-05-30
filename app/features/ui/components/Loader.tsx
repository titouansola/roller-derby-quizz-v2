import { Loader2Icon } from 'lucide-react';

export function Loader({ wide = false }: { wide?: boolean }) {
  return <Loader2Icon className="animate-spin" size={wide ? 48 : 24} />;
}
