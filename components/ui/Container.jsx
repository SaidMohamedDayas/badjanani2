function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Container
 * Props:
 * - children: contenu
 * - className: classes Tailwind supplémentaires
 * - as: tag HTML/React à rendre (default: "div")
 * - size: "md" | "lg" | "xl" | "2xl" | "full" (default: "xl")
 */
export default function Container({
  children,
  className = "",
  as: Tag = "div",
  size = "xl",
}) {
  const sizeMap = {
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-6xl",
    "2xl": "max-w-7xl",
    full: "max-w-none",
  };

  return (
    <Tag
      className={cx(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size] || sizeMap.xl,
        className
      )}
    >
      {children}
    </Tag>
  );
}

// Exemples:
// <Container><p>Contenu</p></Container>
// <Container as="section" size="2xl" className="py-12">...</Container>
