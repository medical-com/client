import { Search, Stethoscope, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BookingSection } from "./booking-section";
import type { DoctorStepProps } from "../types";

export const DoctorStep = ({
  serviceSelected,
  search,
  onSearchChange,
  doctors,
  selectedDoctorId,
  loading,
  onSelect,
}: DoctorStepProps) => (
  <BookingSection number={2} title="Select a doctor">
    {!serviceSelected && (
      <p className="text-sm text-primary/50">
        Choose a medical service first to see available doctors.
      </p>
    )}
    {serviceSelected && <div className="relative">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/40" />
      <Input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by name or specialization"
        className="h-10 rounded-[5px] border-primary/15 pl-9"
      />
    </div>}
    {serviceSelected && <div className="mt-3 grid gap-2 sm:grid-cols-2">
      {loading && (
        <p className="col-span-full py-3 text-sm text-primary/50">
          Loading doctors...
        </p>
      )}
      {doctors.map((doctor) => (
        <button
          key={doctor.id}
          type="button"
          onClick={() => onSelect(doctor.id)}
          className={cn(
            "flex items-start gap-3 rounded-[5px] border p-3 text-left transition-colors",
            selectedDoctorId === doctor.id
              ? "border-primary bg-primary text-background"
              : "border-primary/10 hover:border-accent hover:bg-accent/5",
          )}
        >
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full",
              selectedDoctorId === doctor.id
                ? "bg-background/15"
                : "bg-accent/10 text-accent",
            )}
          >
            <Stethoscope className="size-4" />
          </span>
          <span>
            <span className="block text-sm font-bold">
              Dr. {doctor.firstName} {doctor.lastName}
            </span>
            <span
              className={cn(
                "mt-1 block text-xs",
                selectedDoctorId === doctor.id
                  ? "text-background/60"
                  : "text-primary/50",
              )}
            >
              {doctor.specialization}
            </span>
          </span>
        </button>
      ))}
      {!loading && (
        <button
          type="button"
          onClick={() => onSelect("")}
          className={cn(
            "flex items-start gap-3 rounded-[5px] border p-3 text-left transition-colors",
            selectedDoctorId === ""
              ? "border-primary bg-primary text-background"
              : "border-primary/10 hover:border-accent hover:bg-accent/5",
          )}
        >
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full",
              selectedDoctorId === ""
                ? "bg-background/15"
                : "bg-accent/10 text-accent",
            )}
          >
            <Users className="size-4" />
          </span>
          <span>
            <span className="block text-sm font-bold">Any doctor</span>
            <span
              className={cn(
                "mt-1 block text-xs",
                selectedDoctorId === ""
                  ? "text-background/60"
                  : "text-primary/50",
              )}
            >
              Show all available times
            </span>
          </span>
        </button>
      )}
    </div>}
    {serviceSelected && !loading && doctors.length === 0 && (
      <p className="py-3 text-sm text-primary/50">
        No doctors match your search.
      </p>
    )}
  </BookingSection>
);
