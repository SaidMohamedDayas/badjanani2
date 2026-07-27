import Link from "next/link";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

/**
 * NewsCard
 * Props:
 * - item: { id, title, date, excerpt, tag }
 * - href: lien de destination (default: "/actualites")
 */
export default function NewsCard({ item, href = "/actualites" }) {
  return (
    <Card as="article" hoverable className="h-full border-blue-100">
      <div className="flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between gap-3">
          <Badge variant="default">{item.tag}</Badge>
          <time className="text-xs text-slate-500">{item.date}</time>
        </div>

        <h3 className="text-lg font-semibold leading-tight text-slate-900">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {item.excerpt}
        </p>

        <div className="mt-5">
          <Button as={Link} href={href} variant="outline" size="sm">
            Lire la suite
          </Button>
        </div>
      </div>
    </Card>
  );
}
