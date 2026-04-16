import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-900 disabled:bg-ink-300',
  secondary:
    'bg-white text-ink-900 border border-ink-200 hover:bg-ink-50 active:bg-ink-100',
  ghost:
    'bg-transparent text-ink-700 hover:bg-ink-100 active:bg-ink-200',
  danger:
    'bg-white text-danger-text border border-ink-200 hover:bg-danger-bg',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-2.5 text-xs',
  md: 'h-9 px-3.5 text-sm',
};

export function Button({
  variant = 'secondary',
  size = 'md',
  leftIcon,
  rightIcon,
  className,
  children,
  ...rest
}: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-ink-400 focus:ring-offset-1 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...rest}
    >
      {leftIcon ? <span className="-ml-0.5 inline-flex items-center">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="-mr-0.5 inline-flex items-center">{rightIcon}</span> : null}
    </button>
  );
}
