// Copy-to-clipboard — the app island's one shared side-effect helper (clipboard, never the
// filesystem). Extracted from the Packages explorer so every copy-only lens (Packages, Tools)
// shares the same secure-context fallback behavior.
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API needs a secure context; file:// / plain-http static serves fall back to the
    // legacy execCommand path so copy still works from the built bundle.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
