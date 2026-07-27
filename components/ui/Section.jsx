function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Section
 * Props:
 * - title: titre principal (string | node)
 * - subtitle: sous-titre (string | node)
 * - children: contenu de section
 * - className: classes Tailwind supplémentaires
 * - titleClassName: classes supplémentaires pour le titre
 * - subtitleClassName: classes supplémentaires pour le sous-titre
 * - as: tag HTML/React (default: "section")
 * - ariaLabel: label accessibilité si nécessaire
 */
export default function Section({
  title,
  subtitle,
  children,
  className = "",
  titleClassName = "",
  subtitleClassName = "",
  as: Tag = "section",
  ariaLabel,
}) {
  return (
    <Tag aria-label={ariaLabel} className={cx("py-10 sm:py-14", className)}>
      {(title || subtitle) && (
        <div className="mb-6 sm:mb-8">
          {title && (
            <h2
              className={cx(
                "text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl",
                titleClassName
              )}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={cx(
                "mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base",
                subtitleClassName
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </Tag>
  );
}

// Exemples:
// <Section title="Nos cours" subtitle="Apprenez à votre rythme">...</Section>
// <Section as="div" className="bg-white">...</Section>
