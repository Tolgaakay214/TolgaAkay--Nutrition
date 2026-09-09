// Simple line-art cattle icons for the homepage's dairy/beef segment links.
// Kept in the same stroke-only, currentColor style as the icons in
// ExpertiseGrid.tsx (viewBox 0 0 32 32, strokeWidth ~1.6) rather than
// photographic — a cow face (round ears, small coat spots) versus a bull
// face (swept horns, nose ring) is enough to tell the two apart at a glance.

export function CowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <circle cx="8" cy="13" r="4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24" cy="13" r="4" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="16" cy="19" rx="9" ry="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 15c1.5-1.5 4-1 4 1s-2 3-4 2-1.5-1.5 0-3Z" fill="currentColor" opacity="0.3" />
      <path d="M20.5 23c1-1 3 0 2.5 1.5s-2.5 1.5-3 .5-.5-1.5.5-2Z" fill="currentColor" opacity="0.3" />
      <circle cx="13" cy="22" r="1" fill="currentColor" />
      <circle cx="19" cy="22" r="1" fill="currentColor" />
    </svg>
  );
}

export function BullIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 12C9 9 5 4 3 5c-1 .5 1 4 4 6c2 1.5 4 2 5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 12C23 9 27 4 29 5c1 .5-1 4-4 6c-2 1.5-4 2-5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <ellipse cx="16" cy="19" rx="9" ry="8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="25" r="1.8" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="21" r="1" fill="currentColor" />
      <circle cx="20" cy="21" r="1" fill="currentColor" />
    </svg>
  );
}
