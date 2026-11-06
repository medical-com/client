import { CalendarClock, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  DoctorScheduleException,
  DoctorScheduleExceptionPayload,
  UpdateDoctorScheduleExceptionPayload,
} from "../../hooks";

type ExceptionPanelProps = {
  doctorId: string;
  exceptions: DoctorScheduleException[];
  isLoading: boolean;
  error?: string;
  createException: (
    data: DoctorScheduleExceptionPayload,
  ) => Promise<DoctorScheduleException>;
  updateException: (
    data: UpdateDoctorScheduleExceptionPayload,
  ) => Promise<DoctorScheduleException>;
  deleteException: (data: { id: string; doctorId: string }) => Promise<{
    success: boolean;
  }>;
  isSaving: boolean;
  saveError?: string;
};

export const DoctorScheduleExceptionPanel = ({
  doctorId,
  exceptions,
  isLoading,
  error,
  createException,
  updateException,
  deleteException,
  isSaving,
  saveError,
}: ExceptionPanelProps) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<DoctorScheduleException>();

  const save = async (values: DoctorScheduleExceptionPayload) => {
    if (editing) await updateException({ ...values, id: editing.id });
    else await createException(values);
    setOpen(false);
  };

  const remove = async (exception: DoctorScheduleException) => {
    if (!window.confirm("Delete this schedule exception?")) return;
    await deleteException({ id: exception.id, doctorId });
  };

  return (
    <section className="mt-10 border-t border-primary/10 pt-6">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-extrabold tracking-[0.2em] text-accent">
            OVERRIDES
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold">
            Schedule exceptions
          </h2>
        </div>
        <Button
          type="button"
          onClick={() => {
            setEditing(undefined);
            setOpen(true);
          }}
          className="rounded-[5px]"
        >
          <Plus className="size-4" />
          Add exception
        </Button>
      </div>

      {isLoading && (
        <p className="text-sm text-primary/50">Loading exceptions...</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {!isLoading && !error && exceptions.length === 0 && (
        <p className="rounded-[5px] border border-dashed border-primary/15 px-5 py-8 text-center text-sm text-primary/50">
          No schedule exceptions yet.
        </p>
      )}
      {!isLoading && !error && exceptions.length > 0 && (
        <div className="overflow-hidden rounded-[5px] border border-primary/10">
          <div className="divide-y divide-primary/10">
            {exceptions.map((exception) => (
              <div
                key={exception.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <CalendarClock className="mt-0.5 size-4 text-accent" />
                  <div>
                    <p className="font-semibold">
                      {formatDateTime(exception.startAt)} –{" "}
                      {formatDateTime(exception.endAt)}
                    </p>
                    <p className="mt-1 text-xs text-primary/50">
                      {exception.type === "available"
                        ? "Additional availability"
                        : "Unavailable"}
                      {exception.reason && ` · ${exception.reason}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditing(exception);
                      setOpen(true);
                    }}
                    className="rounded-[5px] border-primary/10"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => void remove(exception)}
                    className="rounded-[5px] border-destructive/20 text-destructive hover:bg-destructive/5"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ExceptionDialog
        key={`${editing?.id ?? "new"}-${open}`}
        doctorId={doctorId}
        exception={editing}
        open={open}
        onOpenChange={setOpen}
        onSave={save}
        isSaving={isSaving}
        error={saveError}
      />
    </section>
  );
};

const ExceptionDialog = ({
  doctorId,
  exception,
  open,
  onOpenChange,
  onSave,
  isSaving,
  error,
}: {
  doctorId: string;
  exception?: DoctorScheduleException;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: DoctorScheduleExceptionPayload) => Promise<void>;
  isSaving: boolean;
  error?: string;
}) => {
  const [values, setValues] = useState(() =>
    getInitialValues(doctorId, exception),
  );
  const update = (field: keyof DoctorScheduleExceptionPayload, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/10" />
        <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-lg bg-background text-sm text-primary shadow-lg outline-none">
          <div className="flex items-start justify-between border-b border-primary/10 p-6">
            <DialogPrimitive.Title className="font-serif text-2xl font-bold">
              {exception ? "Edit exception" : "Add exception"}
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close exception form"
                />
              }
            >
              <X />
            </DialogPrimitive.Close>
          </div>
          <form
            id="doctor-exception-form"
            className="grid gap-5 p-6"
            onSubmit={async (event) => {
              event.preventDefault();
              await onSave(values);
            }}
          >
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <FormField
              label="Starts"
              type="datetime-local"
              value={values.startAt}
              onChange={(value) => update("startAt", value)}
            />
            <FormField
              label="Ends"
              type="datetime-local"
              value={values.endAt}
              onChange={(value) => update("endAt", value)}
            />
            <label className="grid gap-2 text-xs font-bold text-primary/60">
              Type
              <select
                value={values.type}
                onChange={(event) => update("type", event.target.value)}
                className="h-10 rounded-[5px] border border-primary/10 bg-background px-3 text-sm font-normal"
              >
                <option value="unavailable">Unavailable</option>
                <option value="available">Additional availability</option>
              </select>
            </label>
            <FormField
              label="Reason (optional)"
              value={values.reason ?? ""}
              onChange={(value) => update("reason", value)}
            />
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
              form="doctor-exception-form"
              disabled={isSaving}
              className="rounded-[5px]"
            >
              {isSaving ? "Saving..." : "Save exception"}
            </Button>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

const getInitialValues = (
  doctorId: string,
  exception?: DoctorScheduleException,
): DoctorScheduleExceptionPayload => ({
  doctorId,
  startAt: exception
    ? toDateTimeLocal(exception.startAt)
    : toDateTimeLocal(new Date().toISOString()),
  endAt: exception
    ? toDateTimeLocal(exception.endAt)
    : toDateTimeLocal(new Date(Date.now() + 60 * 60 * 1000).toISOString()),
  type: exception?.type ?? "unavailable",
  reason: exception?.reason ?? null,
});

const toDateTimeLocal = (value: string) => {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  return new Date(date.getTime() - offset * 60_000).toISOString().slice(0, 16);
};

const formatDateTime = (value: string) =>
  new Date(value).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const FormField = ({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: string;
  type?: React.ComponentProps<typeof Input>["type"];
  onChange: (value: string) => void;
}) => (
  <label className="grid gap-2 text-xs font-bold text-primary/60">
    {label}
    <Input
      required={label !== "Reason (optional)"}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 rounded-[5px] border-primary/10 bg-background text-sm font-normal text-primary"
    />
  </label>
);
