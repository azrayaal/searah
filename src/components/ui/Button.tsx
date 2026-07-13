import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'onDark' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-navy-deep text-white hover:bg-[#071333] active:bg-[#050f26] shadow-raised hover:shadow-lifted',
  secondary:
    'border border-navy-deep/15 bg-white text-navy-deep hover:border-ocean hover:text-ocean',
  ghost: 'text-ocean hover:text-ocean-dark hover:underline underline-offset-4',
  onDark: 'bg-white text-navy-deep hover:bg-sky-soft',
  danger: 'bg-crimson text-white hover:bg-[#7d0925]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-caption',
  md: 'h-11 px-6 text-body-sm md:h-11',
  lg: 'h-12 px-7 text-body-sm md:h-[52px] md:px-8',
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

function classesFor({ variant = 'primary', size = 'md', fullWidth, className }: BaseProps) {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-btn font-sans font-semibold',
    'transition-all duration-300 ease-premium disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    sizes[size],
    variant === 'ghost' && 'h-auto px-0',
    fullWidth && 'w-full',
    className,
  );
}

export function Button({
  children,
  icon,
  iconPosition = 'right',
  ...props
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { variant, size, fullWidth, className, ...rest } = props;
  return (
    <button
      className={classesFor({ children, variant, size, fullWidth, className })}
      {...rest}
    >
      {icon && iconPosition === 'left' ? icon : null}
      {children}
      {icon && iconPosition === 'right' ? icon : null}
    </button>
  );
}

interface ButtonLinkProps extends BaseProps {
  href: string;
  external?: boolean;
  ariaLabel?: string;
}

export function ButtonLink({
  href,
  external,
  children,
  icon,
  iconPosition = 'right',
  ariaLabel,
  ...props
}: ButtonLinkProps) {
  const className = classesFor({ children, ...props });
  const content = (
    <>
      {icon && iconPosition === 'left' ? icon : null}
      {children}
      {icon && iconPosition === 'right' ? icon : null}
    </>
  );

  if (external || href.startsWith('http') || href === '#') {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        {...(external || href.startsWith('http')
          ? { target: '_blank', rel: 'noreferrer noopener' }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={className} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
