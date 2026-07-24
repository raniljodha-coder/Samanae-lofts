import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-jungle text-papel">
      <div className="shell">
        <p className="eyebrow text-mar">404</p>
        <h1 className="h-xl mt-6 max-w-[14ch]">That page is not on the hillside</h1>
        <p className="lede mt-7 max-w-[40ch] text-papel/70">
          The link may be from the old site. Everything is one click away from the
          home page.
        </p>
        <Link href="/" className="btn-flor mt-9">Back to the start</Link>
      </div>
    </section>
  );
}
