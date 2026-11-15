import type { StatusButtonProps } from "../types";

const statusDotColors: Record<string, string> = {
  scheduled: "bg-sky-500",
  confirmed: "bg-emerald-500",
  completed: "bg-blue-500",
  cancelled: "bg-red-500",
  no_show: "bg-amber-500",
};

export const StatusButton = ({
  status,
  active,
  label,
  disabled,
  onClick,
}: StatusButtonProps) => {
  const isActive = status === active;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isActive}
      className={`
        flex items-center justify-between
        rounded-[5px]
        border
        px-4 py-3
        text-left text-sm font-semibold
        transition-colors
        ${
          isActive
            ? "border-primary bg-primary text-background"
            : "border-primary/10 hover:bg-primary/5"
        }
      `}
    >
      <span>{label}</span>

      <span
        className={`
          size-2 rounded-full
          ${statusDotColors[status] ?? "bg-primary/20"}
        `}
      />
    </button>
  );
};
