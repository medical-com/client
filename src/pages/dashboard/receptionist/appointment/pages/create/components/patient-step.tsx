import { Check, Search, UserRound, UserRoundPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BookingSection } from "./booking-section";
import type { PatientSearchField, PatientStepProps } from "../types";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = Array.from(
  { length: new Date().getFullYear() - 1899 },
  (_, index) => String(new Date().getFullYear() - index),
);
const days = Array.from({ length: 31 }, (_, index) => String(index + 1));

export const PatientStep = ({
  mode,
  search,
  searchField,
  patients,
  selectedPatient,
  newPatient,
  loading,
  onModeChange,
  onSearchChange,
  onSearchFieldChange,
  onSearch,
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
        <div className="grid gap-2 sm:grid-cols-[180px_minmax(0,1fr)_auto]">
          <select
            value={searchField}
            onChange={(event) =>
              onSearchFieldChange(event.target.value as PatientSearchField)
            }
            className="h-10 rounded-[5px] border border-primary/15 bg-background px-3 text-sm outline-none focus:border-accent"
            aria-label="Patient search field"
          >
            <option value="name">Name</option>
            <option value="pesel">PESEL</option>
            <option value="email">Email</option>
            <option value="phone">Phone number</option>
          </select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/40" />
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={`Search by ${searchField === "phone" ? "phone number" : searchField}`}
              className="h-10 rounded-[5px] border-primary/15 pl-9"
            />
          </div>
          <button
            type="button"
            onClick={onSearch}
            disabled={!search.trim() || loading}
            className="h-10 rounded-[5px] bg-primary px-4 text-sm font-bold text-background transition-colors hover:bg-primary/85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Search
          </button>
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
          {!loading && search.trim() && patients.length === 0 && (
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
            ["email", "Email"],
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
              required={true}
              type={field === "email" ? "email" : "text"}
              className="h-10 rounded-[5px] border-primary/15"
            />
          </label>
        ))}
        <label>
          <span className="mb-1.5 block text-xs font-bold text-primary/60">
            Phone number
          </span>
          <Input
            value={newPatient.phone || "+48"}
            onChange={(event) => {
              const digits = event.target.value
                .replace(/^\+48/, "")
                .replace(/\D/g, "")
                .slice(0, 9);
              onNewPatientChange("phone", digits ? `+48${digits}` : "");
            }}
            placeholder="+48 123 456 789"
            required
            type="tel"
            inputMode="numeric"
            className="h-10 rounded-[5px] border-primary/15"
          />
        </label>
        <div className="sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold text-primary/60">
            Date of birth
          </span>
          <div className="grid grid-cols-3 gap-2 sm:w-fit sm:grid-cols-[88px_128px_88px]">
            <select
              value={newPatient.dateOfBirth.slice(0, 4)}
              onChange={(event) =>
                onNewPatientChange("dateOfBirth", event.target.value)
              }
              required
              className="h-10 rounded-[5px] border border-primary/15 bg-background px-2 text-sm outline-none focus:border-accent"
              aria-label="Birth year"
            >
              <option value="">Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <select
              value={newPatient.dateOfBirth.slice(5, 7)}
              onChange={(event) => {
                const year = newPatient.dateOfBirth.slice(0, 4);
                onNewPatientChange(
                  "dateOfBirth",
                  year ? `${year}-${event.target.value}` : "",
                );
              }}
              disabled={!newPatient.dateOfBirth.slice(0, 4)}
              required
              className="h-10 rounded-[5px] border border-primary/15 bg-background px-2 text-sm outline-none focus:border-accent disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Birth month"
            >
              <option value="">Month</option>
              {months.map((month, index) => (
                <option key={month} value={String(index + 1).padStart(2, "0")}>
                  {month}
                </option>
              ))}
            </select>
            <select
              value={newPatient.dateOfBirth.slice(8, 10)}
              onChange={(event) => {
                const year = newPatient.dateOfBirth.slice(0, 4);
                const month = newPatient.dateOfBirth.slice(5, 7);
                onNewPatientChange(
                  "dateOfBirth",
                  year && month ? `${year}-${month}-${event.target.value}` : "",
                );
              }}
              disabled={!newPatient.dateOfBirth.slice(5, 7)}
              required
              className="h-10 rounded-[5px] border border-primary/15 bg-background px-2 text-sm outline-none focus:border-accent disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Birth day"
            >
              <option value="">Day</option>
              {days.map((day) => (
                <option key={day} value={day.padStart(2, "0")}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    )}
  </BookingSection>
);
