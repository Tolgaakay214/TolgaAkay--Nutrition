export function SectionHead({
  eyebrow,
  title,
  action
}: {
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-11 flex flex-wrap items-end justify-between gap-6">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-serif text-[clamp(26px,3vw,36px)] font-medium leading-tight text-ink text-balance">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
