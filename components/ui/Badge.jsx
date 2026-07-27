function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Badge
 * Props:
 * - children: texte/contenu du badge
 * - variant: "default" | "success" | "warning" | "neutral" (default: "default")
 * - className: classes Tailwind supplémentaires
 * - ariaLabel: label accessibilité optionnel
 */
export default function Badge({
  children,
  variant = "default",
  className = "",
  ariaLabel,
}) {
  const variants = {
    default: "bg-slate-900/5 text-slate-700 ring-slate-200",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    warning: "bg-amber-50 text-amber-700 ring-amber-200",
    neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  };

  return (
    <span
      aria-label={ariaLabel}
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        variants[variant] || variants.default,
        className
      )}
    >
      {children}
    </span>
  );
}

// Exemples:
// <Badge>Nouveau</Badge>
// <Badge variant="success">Disponible</Badge>
