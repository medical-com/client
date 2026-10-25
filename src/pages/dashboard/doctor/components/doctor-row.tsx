import { ChevronRight, Mail, Phone, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { DoctorRowProps } from "../types";

const getInitials = (name: string) =>
  name
    .replace("Dr. ", "")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export const DoctorRow = ({ doctor }: DoctorRowProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/dashboard/doctor/${doctor.id}`)}
      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-primary/5"
    >
      <Avatar className="size-10 rounded-[5px]">
        <AvatarFallback className="rounded-[5px] bg-primary text-xs font-bold text-background">
          {getInitials(doctor.name)}
        </AvatarFallback>
      </Avatar>

      <div className="min-w-0 flex-1">
        <p className="truncate font-serif text-base font-bold">{doctor.name}</p>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-primary/50">
          <span className="flex items-center gap-1.5">
            <Stethoscope className="size-3.5" />
            {doctor.specialty}
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="size-3.5" />
            {doctor.email}
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <Phone className="size-3.5" />
            {doctor.phone}
          </span>
        </div>
      </div>

      <ChevronRight className="size-4 shrink-0 text-primary/30" />
    </button>
  );
};
