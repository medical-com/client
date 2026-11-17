import type { AppointmentItemProps } from "../types";

export const AppointmentItem = ({ appointment }: AppointmentItemProps) => {
  return (
    <div className="rounded-[5px] border border-primary/10 p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="font-serif text-sm font-bold">{appointment.type}</p>

        <span className="rounded-[5px] border border-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary/50">
          {appointment.status}
        </span>
      </div>

      <p className="mt-1 text-xs text-primary/50">{appointment.doctor}</p>

      <p className="mt-3 text-[10px] font-extrabold tracking-[0.15em] text-accent">
        {appointment.date}
      </p>
    </div>
  );
};
