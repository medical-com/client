import type { SectionProps } from "../types";

export const Section = ({ title, description, children }: SectionProps) => {
  return (
    <div className="border-t border-primary/10 pt-6">
      <p className="text-xs font-extrabold tracking-[0.2em] text-accent">
        {title}
      </p>

      {description && (
        <p className="mt-1 font-serif text-sm text-primary/50">
          {description}
        </p>
      )}

      <div className="mt-6">{children}</div>
    </div>
  );
};
