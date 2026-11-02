import { ChevronRight, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { PatientRowProps } from "../types";

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const PatientRow = ({ patient }: PatientRowProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/dashboard/patient/${patient.id}`)}
      className="
        flex w-full items-center gap-4
        px-5 py-4 text-left
        transition-colors
        hover:bg-primary/5
      "
    >
      <Avatar className="size-10 rounded-[5px]">
        <AvatarFallback className="rounded-[5px] bg-primary text-xs font-bold text-background">
          {getInitials(patient.name)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate font-serif text-base font-bold">
          {patient.name}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-primary/50">
          <span className="flex items-center gap-1.5">
            <Mail className="size-3.5" />
            {patient.email}
          </span>

          <span className="flex items-center gap-1.5">
            <Phone className="size-3.5" />
            {patient.phone}
          </span>
        </div>
      </div>

      <ChevronRight className="size-4 shrink-0 text-primary/30" />
    </button>
  );
};
