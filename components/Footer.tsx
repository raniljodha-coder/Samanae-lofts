import Link from "next/link";
import Image from "next/image";
import { getSite } from "../lib/content";

export default function Footer() {
  const site = getSite();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-jungle text-papel">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image
            src="/logo.png"
            alt=""
            width={64}
            height={56}
            className="h-14 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-papel/70 leading-[1.7]">
            A small cluster of lofts on a hillside in {site.location}. Opening{" "}
            {site.openingDate}.
          </p>
        </div>

        <div>
          <p className="eyebrow text-mar">Visit</p>
          <ul className="mt-5 space-y-3">
            {[
              { href: "/lofts", label: "The lofts" },
              { href: "/stay", label: "Stay with us" },
              { href: "/invest", label: "Build here" },
              { href: "/journey", label: "Our journey" },
              { href: "/samana", label: "Samaná" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-papel/70 hover:text-flor">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-mar">Get in touch</p>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="text-papel/70 hover:text-flor"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-papel/70 hover:text-flor"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-papel/70 hover:text-flor"
              >
                Find us on the map
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-papel/10 py-7 font-mono text-[11px] uppercase tracking-[0.16em] text-papel/45 sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {site.name} · {site.location}
        </span>
        <span className="text-flor">{site.tagline}</span>
      </div>
    </footer>
  );
}
