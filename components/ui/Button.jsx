const VARIANTS = {
  primary:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-400 disabled:bg-slate-400",
  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-300 disabled:bg-slate-100 disabled:text-slate-400",
  outline:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus-visible:ring-slate-300 disabled:text-slate-400 disabled:border-slate-200",
};

const SIZES = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm sm:text-base",
  lg: "h-12 px-5 text-base",
};

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Button
 * Props:
 * - children: contenu du bouton
 * - as: composant/élément à rendre (ex: Link, "a"), défaut "button"
 * - variant: "primary" | "secondary" | "outline" (default: "primary")
 * - size: "sm" | "md" | "lg" (default: "md")
 * - className: classes Tailwind supplémentaires
 * - type: type HTML si rendu en <button> (default: "button")
 * - ariaLabel: libellé accessibilité si le texte visible n'est pas suffisant
 * - disabled: désactive le bouton
 * - ...props: autres props HTML (href, onClick, etc.)
 */
export default function Button({
  children,
  as: Comp = "button",
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ariaLabel,
  disabled = false,
  ...props
}) {
  const commonProps = {
    "aria-label": ariaLabel,
    className: cx(
      "inline-flex items-center justify-center gap-2 rounded-xl font-medium shadow-sm transition-colors duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed",
      VARIANTS[variant] || VARIANTS.primary,
      SIZES[size] || SIZES.md,
      className
    ),
    ...props,
  };

  if (Comp === "button") {
    return (
      <button type={type} disabled={disabled} {...commonProps}>
        {children}
      </button>
    );
  }

  return (
    <Comp
      {...commonProps}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : commonProps.tabIndex}
    >
      {children}
    </Comp>
  );
}

// Exemples:
// <Button>Réserver</Button>
// <Button variant="secondary" size="sm">Annuler</Button>
// <Button variant="outline" size="lg" ariaLabel="Ouvrir le menu">Menu</Button>
// <Button as={Link} href="/cours">Voir le programme</Button>
