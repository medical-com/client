import type { StatusButtonProps } from "../types";

export const StatusButton = ({ status, active }: StatusButtonProps) => {
  const isActive = status === active;

  return (
    <button
      type="button"
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
      <span>{status}</span>

      <span
        className={`
          size-2 rounded-full
          ${isActive ? "bg-accent" : "bg-primary/20"}
        `}
      />
    </button>
  );
};
