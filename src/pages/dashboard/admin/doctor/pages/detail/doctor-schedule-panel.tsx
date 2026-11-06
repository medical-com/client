import { CalendarDays, Pencil, Plus, X } from "lucide-react";
import { useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  DoctorSchedule,
  DoctorSchedulePayload,
  UpdateDoctorSchedulePayload,
} from "../../hooks";

const dayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type DoctorSchedulePanelProps = {
  doctorId: string;
  schedules: DoctorSchedule[];
  isLoading: boolean;
  error?: string;
  createSchedule: (data: DoctorSchedulePayload) => Promise<DoctorSchedule>;
  updateSchedule: (
    data: UpdateDoctorSchedulePayload,
  ) => Promise<DoctorSchedule>;
  isSaving: boolean;
  saveError?: string;
};

export const DoctorSchedulePanel = ({
  doctorId,
  schedules,
  isLoading,
  error,
  createSchedule,
  updateSchedule,
  isSaving,
  saveError,
}: DoctorSchedulePanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<DoctorSchedule>();

  const openCreate = () => {
    setEditingSchedule(undefined);
    setIsOpen(true);
  };

  const openEdit = (schedule: DoctorSchedule) => {
    setEditingSchedule(schedule);
    setIsOpen(true);
  };

  const save = async (values: DoctorSchedulePayload) => {
    if (editingSchedule) {
      await updateSchedule({ ...values, id: editingSchedule.id });
    } else {
      await createSchedule(values);
    }
    setIsOpen(false);
  };

  return (
    <section className="mt-10 ">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-extrabold tracking-[0.2em] text-accent">
            AVAILABILITY
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold">
            Doctor schedule
          </h2>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={openCreate}
          className="rounded-[5px] border-primary/10"
        >
          <Plus className="size-4" />
          Add schedule
        </Button>
      </div>

      {isLoading && (
        <p className="text-sm text-primary/50">Loading schedule...</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {!isLoading && !error && schedules.length === 0 && (
        <div className="rounded-[5px] border border-dashed border-primary/15 px-5 py-8 text-center text-sm text-primary/50">
          No schedule entries yet.
        </div>
      )}
      {!isLoading && !error && schedules.length > 0 && (
        <div className="overflow-hidden rounded-[5px] border border-primary/10">
          <div className="divide-y divide-primary/10">
            {schedules.map((schedule) => (
              <div
                key={schedule.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-4 text-accent" />
                  <div>
                    <p className="font-semibold">
                      {dayNames[schedule.dayOfWeek - 1]}{" "}
                      <span className="font-normal text-primary/60">
                        {schedule.startTime.slice(0, 5)}–
                        {schedule.endTime.slice(0, 5)}
                      </span>
                    </p>
                    <p className="mt-1 text-xs text-primary/50">
                      From {formatDate(schedule.validFrom)}
                      {schedule.validTo &&
                        ` to ${formatDate(schedule.validTo)}`}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => openEdit(schedule)}
                  className="rounded-[5px] border-primary/10"
                >
                  <Pencil className="size-3.5" />
                  Edit
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <ScheduleDialog
        key={`${editingSchedule?.id ?? "new"}-${isOpen}`}
        doctorId={doctorId}
        schedule={editingSchedule}
        open={isOpen}
        onOpenChange={setIsOpen}
        onSave={save}
        isSaving={isSaving}
        error={saveError}
      />
    </section>
  );
};

const ScheduleDialog = ({
  doctorId,
  schedule,
  open,
  onOpenChange,
  onSave,
  isSaving,
  error,
}: {
  doctorId: string;
  schedule?: DoctorSchedule;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: DoctorSchedulePayload) => Promise<void>;
  isSaving: boolean;
  error?: string;
}) => {
  const [values, setValues] = useState(() =>
    getInitialValues(doctorId, schedule),
  );

  const update = (
    field: keyof DoctorSchedulePayload,
    value: string | number | null,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSave(values);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/10" />
        <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-lg bg-background text-sm text-primary shadow-lg outline-none">
          <div className="flex items-start justify-between border-b border-primary/10 p-6">
            <DialogPrimitive.Title className="font-serif text-2xl font-bold">
              {schedule ? "Edit schedule" : "Add schedule"}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close schedule form"
                />
              }
            >
              <X />
            </DialogPrimitive.Close>
          </div>
          <form
            id="doctor-schedule-form"
            onSubmit={submit}
            className="grid gap-5 p-6"
          >
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <label className="grid gap-2 text-xs font-bold text-primary/60">
              Day of week
              <select
                value={values.dayOfWeek}
                onChange={(event) =>
                  update("dayOfWeek", Number(event.target.value))
                }
                className="h-10 rounded-[5px] border border-primary/10 bg-background px-3 text-sm font-normal"
              >
                {dayNames.map((day, index) => (
                  <option key={day} value={index + 1}>
                    {day}
                  </option>
                ))}
              </select>
            </label>
            <FormField
              label="Start time"
              type="time"
              value={values.startTime}
              onChange={(value) => update("startTime", value)}
            />
            <FormField
              label="End time"
              type="time"
              value={values.endTime}
              onChange={(value) => update("endTime", value)}
            />
            <FormField
              label="Valid from"
              type="date"
              value={values.validFrom}
              onChange={(value) => update("validFrom", value)}
            />
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="doctor-schedule-valid-to"
                  className="text-xs font-bold text-primary/60"
                >
                  Valid to (optional)
                </label>
                {schedule && values.validTo && (
                  <button
                    type="button"
                    onClick={() => update("validTo", null)}
                    className="text-xs font-bold text-accent transition-colors hover:text-primary"
                  >
                    Remove date
                  </button>
                )}
              </div>
              <Input
                id="doctor-schedule-valid-to"
                type="date"
                value={values.validTo ?? ""}
                onChange={(event) =>
                  update("validTo", event.target.value || null)
                }
                className="h-10 rounded-[5px] border-primary/10 bg-background text-sm font-normal text-primary"
              />
            </div>
          </form>
          <div className="flex flex-col-reverse gap-2 border-t border-primary/10 p-6 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSaving}
              className="rounded-[5px] border-primary/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="doctor-schedule-form"
              disabled={isSaving}
              className="rounded-[5px]"
            >
              {isSaving ? "Saving..." : "Save schedule"}
            </Button>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

const getInitialValues = (
  doctorId: string,
  schedule?: DoctorSchedule,
): DoctorSchedulePayload => ({
  doctorId,
  dayOfWeek: schedule?.dayOfWeek ?? 1,
  startTime: schedule?.startTime.slice(0, 5) ?? "09:00",
  endTime: schedule?.endTime.slice(0, 5) ?? "17:00",
  validFrom: schedule
    ? formatDateInput(schedule.validFrom)
    : new Date().toISOString().slice(0, 10),
  validTo: schedule?.validTo ? formatDateInput(schedule.validTo) : null,
});

const formatDateInput = (value: string) => value.slice(0, 10);
const formatDate = (value: string) =>
  new Date(`${formatDateInput(value)}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const FormField = ({
  label,
  value,
  type,
  onChange,
}: {
  label: string;
  value: string;
  type: React.ComponentProps<typeof Input>["type"];
  onChange: (value: string) => void;
}) => (
  <label className="grid gap-2 text-xs font-bold text-primary/60">
    {label}
    <Input
      required={label !== "Valid to (optional)"}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 rounded-[5px] border-primary/10 bg-background text-sm font-normal text-primary"
    />
  </label>
);
