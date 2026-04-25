'use client';

import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'default' | 'ghost' | 'pro' | 'outline';

const variants: Record<ButtonVariant, string> = {
  default: 'btn btn-default',
  ghost: 'btn btn-ghost',
  pro: 'btn btn-pro',
  outline: 'btn btn-outline'
};

export function Button({
  className = '',
  variant = 'default',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return <button className={`${variants[variant]} ${className}`.trim()} {...props} />;
}
