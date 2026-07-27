function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Card
 * Props:
 * - children: contenu
 * - className: classes Tailwind supplémentaires
 * - as: tag HTML/React (default: "div")
 * - padding: "none" | "sm" | "md" | "lg" (default: "md")
 * - hoverable: active un léger effet hover (default: false)
 * - ariaLabel: label accessibilité optionnel
 */
export default function Card({
  children,
  className = "",
  as: Tag = "div",
  padding = "md",
  hoverable = false,
  ariaLabel,
}) {
  const paddingMap = {
    none: "",
    sm: "p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  };

  return (
    <Tag
      aria-label={ariaLabel}
      className={cx(
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        hoverable && "transition-shadow duration-200 hover:shadow-md",
        paddingMap[padding] || paddingMap.md,
        className
      )}
    >
      {children}
    </Tag>
  );
}

// Exemples:
// <Card>Contenu</Card>
// <Card hoverable padding="lg" className="h-full">...</Card>
