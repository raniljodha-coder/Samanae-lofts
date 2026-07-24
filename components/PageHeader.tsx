export default function PageHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <header className="bg-jungle pb-20 pt-36 text-papel sm:pb-24 sm:pt-44">
      <div className="shell">
        <p className="eyebrow text-mar">{eyebrow}</p>
        <h1 className="h-xl mt-6 max-w-[16ch]">{title}</h1>
        {lede ? (
          <p className="lede mt-8 max-w-[52ch] text-papel/75">{lede}</p>
        ) : null}
      </div>
    </header>
  );
}
