import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

import type { AppointmentCardProps } from "../types";

export const AppointmentCard = ({ appointment, top }: AppointmentCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() =>
        navigate(`/dashboard/receptionist/appointment/${appointment.id}`)
      }
      style={{ top: `${top + 4}px` }}
      className="
        absolute left-1 right-1
        min-h-21
        overflow-hidden
        rounded-sm
        border border-accent/20
        bg-orange-300
        p-3 text-left
        hover:-translate-y-0.5
        hover:shadow-[3px_3px_0_var(--color-highlight)]
      "
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-extrabold tracking-wide text-accent">
          {appointment.time}
        </span>

        <Clock className="size-3 text-accent/60" />
      </div>

      <p className="mt-2 truncate font-serif text-sm font-bold">
        {appointment.patient}
      </p>

      <p className="mt-1 truncate text-[10px] leading-4 text-primary/55">
        {appointment.doctor}
      </p>

      <p className="mt-1 truncate text-[10px] leading-4 text-primary/55">
        {appointment.type}
      </p>
    </button>
  );
};
