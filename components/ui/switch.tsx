'use client';

import type { Dispatch, SetStateAction } from 'react';

export function SwitchPill({
  checked,
  onCheckedChange,
  label
}: {
  checked: boolean;
  onCheckedChange: Dispatch<SetStateAction<boolean>>;
  label: string;
}) {
  return (
    <button className={`switch ${checked ? 'is-on' : ''}`} onClick={() => onCheckedChange((v) => !v)}>
      {label}
    </button>
  );
}
