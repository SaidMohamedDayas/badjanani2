import Link from "next/link";
import Container from "../../../components/ui/Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-blue-100 bg-white/95">
      <Container className="py-6">
        <div className="flex flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-slate-900">
              © {year} Badjanani 2 - Tous droits réservés
            </p>
            <p className="mt-1">Réalisé par Techmoh</p>
          </div>

          <nav aria-label="Liens du pied de page">
            <ul className="flex flex-wrap items-center gap-2 sm:justify-end">
              <li>
                <Link
                  href="/live"
                  className="rounded-md px-2 py-1 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Live
                </Link>
              </li>
              <li>
                <Link
                  href="/audios"
                  className="rounded-md px-2 py-1 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Audios
                </Link>
              </li>
              <li>
                <Link
                  href="/cotisation"
                  className="rounded-md px-2 py-1 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  Cotisation
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
