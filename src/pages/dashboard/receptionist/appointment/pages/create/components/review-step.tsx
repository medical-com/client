import { Clock3, Plus, Stethoscope, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingSection } from "./booking-section";
import type { ReviewStepProps } from "../types";

export const ReviewStep = ({
  doctor,
  service,
  selectedDate,
  selectedTime,
  patientMode,
  selectedPatient,
  newPatient,
  notes,
  notification,
  canContinue,
  isSubmitting,
  errorMessage,
  onNotesChange,
  onNotificationChange,
  onConfirm,
  dateLabel,
}: ReviewStepProps) => (
  <BookingSection number={5} title="Review and confirm">
    <div className="space-y-4 text-sm">
      <div className="flex items-start gap-3">
        <Stethoscope className="mt-0.5 size-4 text-accent" />
        <div>
          <p className="font-bold">
            {doctor
              ? `Dr. ${doctor.firstName} ${doctor.lastName}`
              : "Any doctor"}
          </p>
          <p className="text-xs text-primary/50">
            {doctor?.specialization ?? "Choose the best available doctor"}
          </p>
        </div>
        {errorMessage && (
          <p className="mt-4 rounded-[5px] bg-destructive/10 p-3 text-sm text-destructive">
            {errorMessage}
          </p>
        )}
      </div>
      <div className="flex items-start gap-3">
        <Clock3 className="mt-0.5 size-4 text-accent" />
        <div>
          <p className="font-bold">{service?.name ?? "Service not selected"}</p>
          <p className="text-xs text-primary/50">
            {service
              ? `${service.duration} minutes · ${dateLabel(selectedDate)}${selectedTime ? ` · ${selectedTime}` : ""}`
              : "Select a service and time above"}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <UserRound className="mt-0.5 size-4 text-accent" />
        <div>
          <p className="font-bold">
            {selectedPatient
              ? `${selectedPatient.firstName} ${selectedPatient.lastName}`
              : patientMode === "new" && newPatient.firstName
                ? `${newPatient.firstName} ${newPatient.lastName}`
                : "Patient not selected"}
          </p>
          <p className="text-xs text-primary/50">
            {selectedPatient?.phone ??
              newPatient.phone ??
              "Choose or create a patient"}
          </p>
        </div>
      </div>
    </div>
    <div className="mt-6 border-t border-primary/10 pt-5">
      <label className="block text-xs font-bold text-primary/60">
        Organizational notes (optional)
      </label>
      <textarea
        value={notes}
        onChange={(event) => onNotesChange(event.target.value)}
        rows={3}
        placeholder="Anything the care team should know?"
        className="mt-2 w-full resize-none rounded-[5px] border border-primary/15 bg-background p-3 text-sm outline-none focus:border-accent"
      />
      <label className="mt-4 flex items-center gap-2 text-sm text-primary/70">
        <input
          type="checkbox"
          checked={notification}
          onChange={(event) => onNotificationChange(event.target.checked)}
          className="accent-accent"
        />
        Send confirmation notification
      </label>
    </div>
    <Button
      type="button"
      disabled={!canContinue || isSubmitting}
      onClick={onConfirm}
      className="mt-6 h-11 w-full rounded-[5px] bg-primary text-background shadow-[4px_4px_0_var(--color-highlight)] hover:bg-primary/85"
    >
      <Plus className="size-4" />{" "}
      {isSubmitting ? "Confirming..." : "Confirm appointment"}
    </Button>
    {!canContinue && (
      <p className="mt-3 text-center text-xs text-primary/45">
        Complete the service, time, and patient details to continue.
      </p>
    )}
  </BookingSection>
);
