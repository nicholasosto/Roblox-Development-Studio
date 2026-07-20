// The shared copy-flash hook — each region owns its own flash so the confirmation appears
// beside the control it confirms (the Packages inspector's footer pattern), never up in a
// distant header. 4s dwell: long enough to read after a glance away, short enough to feel
// transactional.
import { useEffect, useState } from 'react';
import { copyText } from '../clipboard';

export const FLASH_MS = 4_000;

export function useCopyFlash(): {
  flash: string | null;
  copy: (label: string, text: string) => Promise<void>;
} {
  const [flash, setFlash] = useState<string | null>(null);
  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(null), FLASH_MS);
    return () => window.clearTimeout(t);
  }, [flash]);
  const copy = async (label: string, text: string) => {
    const ok = await copyText(text);
    // Failure text points at the escape hatch: every copy control shows its full
    // command on hover/focus (Tooltip or title attr), so a blocked clipboard still
    // leaves a path.
    setFlash(ok ? `Copied ${label}` : 'Copy failed — the command shows on hover');
  };
  return { flash, copy };
}
