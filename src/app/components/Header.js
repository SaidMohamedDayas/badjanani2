"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../../../components/ui/Container";
import Button from "../../../components/ui/Button";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/live", label: "Cours" },
  { href: "/audios", label: "Audios" },
  { href: "/actualites", label: "Actualités" },
  { href: "/centre-social", label: "Centre social" },
  { href: "/cotisation", label: "Cotisation" },
];

function isActivePath(pathname, href) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopNav({ pathname }) {
  return (
    <nav aria-label="Navigation principale">
      <ul className="hidden items-center gap-1 md:flex">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
              className={[
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                isActivePath(pathname, item.href)
                  ? "bg-blue-50 text-blue-800"
                  : "text-slate-700 hover:bg-blue-50 hover:text-blue-800",
              ].join(" ")}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function MobileQuickNav({ pathname }) {
  const coursesActive = isActivePath(pathname, "/live");
  const audiosActive = isActivePath(pathname, "/audios");

  return (
    <nav aria-label="Navigation rapide mobile" className="md:hidden">
      <div className="flex items-center gap-2">
        <Button
          as={Link}
          href="/live"
          size="sm"
          aria-current={coursesActive ? "page" : undefined}
          variant={coursesActive ? "primary" : "outline"}
          className={
            coursesActive
              ? "bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-500"
              : ""
          }
        >
          Cours
        </Button>
        <Button
          as={Link}
          href="/audios"
          size="sm"
          aria-current={audiosActive ? "page" : undefined}
          variant={audiosActive ? "primary" : "outline"}
          className={
            audiosActive
              ? "bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-500"
              : ""
          }
        >
          Audios
        </Button>
      </div>
    </nav>
  );
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-blue-100/80 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="rounded-lg text-base font-semibold tracking-tight text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Accueil Badjanani2"
        >
          <span className="text-blue-700">Badjanani</span>2
        </Link>

        <div className="flex items-center gap-2">
          <DesktopNav pathname={pathname} />
          <MobileQuickNav pathname={pathname} />
        </div>
      </Container>
    </header>
  );
}
