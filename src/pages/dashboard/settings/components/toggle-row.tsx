import type { ToggleRowProps } from "../types";

export const ToggleRow = ({
  label,
  description,
  enabled,
  onToggle,
}: ToggleRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 rounded-[5px] border border-primary/10 p-4">
      <div>
        <p className="text-sm font-bold">{label}</p>
        <p className="mt-1 text-xs text-primary/50">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={onToggle}
        className={`
          relative h-6 w-11 shrink-0 rounded-full
          transition-colors
          ${enabled ? "bg-accent" : "bg-primary/15"}
        `}
      >
        <span
          className={`
            absolute top-0.5 size-5 rounded-full bg-background
            shadow transition-transform
            ${enabled ? "translate-x-5" : "translate-x-0.5"}
          `}
        />
      </button>
    </div>
  );
};
