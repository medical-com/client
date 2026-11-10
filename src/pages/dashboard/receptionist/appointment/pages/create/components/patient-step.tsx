import { Check, Search, UserRound, UserRoundPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BookingSection } from "./booking-section";
import type { PatientStepProps } from "../types";

export const PatientStep = ({
  mode,
  search,
  patients,
  selectedPatient,
  newPatient,
  loading,
  onModeChange,
  onSearchChange,
  onSelect,
  onNewPatientChange,
}: PatientStepProps) => (
  <BookingSection number={4} title="Select or create a patient">
    <div className="mb-5 flex gap-2 border-b border-primary/10 pb-3">
      {[
        ["existing", "Existing patient", UserRound],
        ["new", "New patient", UserRoundPlus],
      ].map(([value, label, Icon]) => (
        <button
          key={value as string}
          type="button"
          onClick={() => onModeChange(value as "existing" | "new")}
          className={cn(
            "flex items-center gap-2 border-b-2 px-2 pb-2 text-sm font-bold",
            mode === value
              ? "border-accent text-primary"
              : "border-transparent text-primary/45",
          )}
        >
          <Icon className="size-4" /> {label as string}
        </button>
      ))}
    </div>
    {mode === "existing" ? (
      <>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/40" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search name, PESEL, or phone number"
            className="h-10 rounded-[5px] border-primary/15 pl-9"
          />
        </div>
        <div className="mt-3 divide-y divide-primary/10 rounded-[5px] border border-primary/10">
          {loading && (
            <p className="p-4 text-sm text-primary/50">Searching patients...</p>
          )}
          {patients.map((patient) => (
            <button
              key={patient.id}
              type="button"
              onClick={() => onSelect(patient)}
              className={cn(
                "flex w-full items-center justify-between p-3 text-left",
                selectedPatient?.id === patient.id
                  ? "bg-accent/10"
                  : "hover:bg-accent/5",
              )}
            >
              <span>
                <span className="block text-sm font-bold">
                  {patient.firstName} {patient.lastName}
                </span>
                <span className="mt-1 block text-xs text-primary/50">
                  {patient.phone} · PESEL {patient.pesel || "—"}
                </span>
              </span>
              {selectedPatient?.id === patient.id && (
                <Check className="size-4 text-accent" />
              )}
            </button>
          ))}
          {!loading && search && patients.length === 0 && (
            <p className="p-4 text-sm text-primary/50">
              No matching patients found.
            </p>
          )}
        </div>
      </>
    ) : (
      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            ["firstName", "First name"],
            ["lastName", "Last name"],
            ["pesel", "PESEL"],
            ["phone", "Phone number"],
            ["email", "Email"],
            ["dateOfBirth", "Date of birth"],
          ] as const
        ).map(([field, label]) => (
          <label
            key={field}
            className={field === "email" ? "sm:col-span-2" : ""}
          >
            <span className="mb-1.5 block text-xs font-bold text-primary/60">
              {label}
            </span>
            <Input
              value={newPatient[field]}
              onChange={(event) =>
                onNewPatientChange(field, event.target.value)
              }
              required={
                true
              }
              type={
                field === "email"
                  ? "email"
                  : field === "dateOfBirth"
                    ? "date"
                    : "text"
              }
              className="h-10 rounded-[5px] border-primary/15"
            />
          </label>
        ))}
      </div>
    )}
  </BookingSection>
);
