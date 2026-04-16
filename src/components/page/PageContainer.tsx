import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export function PageContainer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mx-auto w-full max-w-page px-8 py-8', className)} {...rest} />
  );
}
