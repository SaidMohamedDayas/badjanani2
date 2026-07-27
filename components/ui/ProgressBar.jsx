function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * ProgressBar
 * Props:
 * - value: nombre entre 0 et 100
 * - label: libellé visible optionnel
 * - showValue: affiche le pourcentage (default: true)
 * - className: classes Tailwind supplémentaires
 * - barClassName: classes pour la barre de progression
 * - trackClassName: classes pour la piste
 * - ariaLabel: label accessibilité si aucun label visible
 */
export default function ProgressBar({
  value = 0,
  label,
  showValue = true,
  className = "",
  barClassName = "",
  trackClassName = "",
  ariaLabel,
}) {
  const safeValue = clamp(Number.isFinite(value) ? value : 0, 0, 100);

  return (
    <div className={cx("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-2 flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-700">{label}</span>
          {showValue && (
            <span className="font-medium text-slate-900">{safeValue}%</span>
          )}
        </div>
      )}

      <div
        role="progressbar"
        aria-label={ariaLabel || (typeof label === "string" ? label : "Progression")}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
        className={cx(
          "h-2.5 w-full overflow-hidden rounded-full bg-slate-200",
          trackClassName
        )}
      >
        <div
          className={cx(
            "h-full rounded-full bg-slate-900 transition-[width] duration-300 ease-out",
            barClassName
          )}
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}

// Exemples:
// <ProgressBar value={35} label="Profil complété" />
// <ProgressBar value={80} showValue={false} ariaLabel="Progression du cours" />
