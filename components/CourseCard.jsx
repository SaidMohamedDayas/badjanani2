import Link from "next/link";
import Card from "./ui/Card";
import Badge from "./ui/Badge";
import Button from "./ui/Button";

/**
 * CourseCard
 * Props:
 * - course: { id, title, date, time, teacher, tag }
 * - href: lien vers le cours/programme (default: "/live")
 */
export default function CourseCard({ course, href = "/live" }) {
  return (
    <Card
      as="article"
      hoverable
      className="flex h-full flex-col justify-between border-blue-100"
      ariaLabel={`Cours: ${course.title}`}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <Badge variant="neutral">{course.tag}</Badge>
          <span className="text-xs font-medium text-slate-500">{course.date}</span>
        </div>

        <div>
          <h3 className="text-lg font-semibold leading-tight text-slate-900">
            {course.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            {course.time} · {course.teacher}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Button as={Link} href={href} variant="outline" size="sm" className="w-full">
          Voir le détail
        </Button>
      </div>
    </Card>
  );
}
