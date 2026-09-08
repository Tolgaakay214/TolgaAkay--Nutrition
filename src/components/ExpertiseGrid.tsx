const items = [
  {
    title: 'Transition Cow Nutrition',
    desc: 'Feeding strategy across the close-up and fresh periods.',
    path: 'M6 20c4-10 16-10 20 0M22 15l4 5-6 1'
  },
  {
    title: 'Dairy Cow Nutrition',
    desc: 'Ration design for milk yield, components, and health.',
    path: 'M16 6c5 7 8 11 8 15a8 8 0 1 1-16 0c0-4 3-8 8-15Z'
  },
  {
    title: 'DCAD & Mineral Nutrition',
    desc: 'Cation-anion balance and macro/trace mineral supply.',
    path: 'M16 5v22M8 11l-4 8h8l-4-8ZM24 11l-4 8h8l-4-8ZM6 8h20'
  },
  {
    title: 'Rumen Health',
    desc: 'Fermentation stability and subacute acidosis risk.',
    path: 'M12 15a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6ZM19 13a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6ZM16 20a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6ZM21 19a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6Z',
    ellipse: true
  },
  {
    title: 'Feed Additives',
    desc: 'Where bypass and functional additives change outcomes.',
    path: 'M16 13v9',
    capsule: true
  },
  {
    title: 'TMR & Feeding Management',
    desc: 'Mix order, moisture, and delivery consistency.',
    path: 'M16 6v20M9 10c0 4 14 4 14 8M9 22c0-4 14-4 14-8'
  },
  {
    title: 'Particle Size & PSPS',
    desc: 'Penn State Particle Separator interpretation.',
    bars: true
  },
  {
    title: 'Feed Evaluation',
    desc: 'Reading NDF, NDFd, starch and CP fractions correctly.',
    path: 'M13 5h6M14 5v6l-6 12a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-12V5M11 18h10'
  },
  {
    title: 'Metabolic Disease Prevention',
    desc: 'Ketosis, DA, and hypocalcemia — a feeding-first view.',
    path: 'M5 18h5l3-8 4 14 3-10 2 4h5',
    open: true
  },
  {
    title: 'Applied Ruminant Nutrition',
    desc: 'Turning physiology and research into farm decisions.',
    molecule: true
  }
];

function Icon({ item }: { item: (typeof items)[number] }) {
  if (item.ellipse) {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <ellipse cx="16" cy="17" rx="11" ry="9" stroke="currentColor" strokeWidth="1.6" />
        <path d={item.path} fill="currentColor" />
      </svg>
    );
  }
  if (item.capsule) {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="7" y="13" width="18" height="9" rx="4.5" stroke="currentColor" strokeWidth="1.6" />
        <path d={item.path} stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (item.bars) {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="6" y="7" width="20" height="4.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="8" y="13.5" width="16" height="4.5" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10" y="20" width="12" height="4.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  if (item.molecule) {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="23" cy="9" r="2.6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="23" r="2.6" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 10.5l4 9.5M21 10.5l-4 9.5M11.5 9h9" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d={item.path}
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap={item.open ? 'round' : undefined}
        strokeLinejoin={item.open ? 'round' : undefined}
      />
    </svg>
  );
}

export function ExpertiseGrid() {
  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.title} className="bg-ivory p-7 transition-colors hover:bg-ivory-2">
          <div className="mb-5 h-[30px] w-[30px] text-bronze">
            <Icon item={item} />
          </div>
          <h3 className="font-sans text-[16.5px] font-semibold text-ink">{item.title}</h3>
          <p className="mt-2 text-[13.5px] text-ink-soft">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}
