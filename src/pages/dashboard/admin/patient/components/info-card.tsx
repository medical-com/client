import type { InfoCardProps } from "../types";

export const InfoCard = ({ icon, label, value }: InfoCardProps) => {
  return (
    <div className="bg-background p-6">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-primary/40">
          {label}
        </p>

        <span className="text-accent">{icon}</span>
      </div>

      <p className="mt-5 font-serif text-lg font-bold">{value}</p>
    </div>
  );
};
