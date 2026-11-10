import type { BookingSectionProps } from "../types";

export const BookingSection = ({
  number,
  title,
  children,
}: BookingSectionProps) => (
  <section className="rounded-[5px] border border-primary/10 bg-background p-5 sm:p-6">
    <div className="mb-5 flex items-center gap-3">
      <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-background">
        {number}
      </span>
      <h2 className="font-serif text-xl font-bold">{title}</h2>
    </div>
    {children}
  </section>
);
