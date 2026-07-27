import Link from "next/link";
import Button from "./ui/Button";
import Badge from "./ui/Badge";

/**
 * AudioRow
 * Props:
 * - audio: { id, title, date, duration, url }
 */
export default function AudioRow({ audio }) {
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge variant="default">Audio</Badge>
          <span className="text-xs text-slate-500">{audio.date}</span>
          <span className="text-xs text-slate-500" aria-label={`Durée ${audio.duration}`}>
            {audio.duration}
          </span>
        </div>
        <h3 className="truncate text-base font-medium text-slate-900 sm:text-lg">
          {audio.title}
        </h3>
      </div>

      <Button
        as={Link}
        href={audio.url}
        variant="secondary"
        size="sm"
        className="shrink-0"
        ariaLabel={`Écouter l'audio ${audio.title}`}
      >
        Écouter
      </Button>
    </li>
  );
}
