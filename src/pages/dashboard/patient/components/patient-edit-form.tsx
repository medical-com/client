import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ClientPatient } from "../hooks";

type PatientFormValues = Pick<
  ClientPatient,
  "firstName" | "lastName" | "email" | "phone" | "pesel" | "dateOfBirth"
>;

type PatientEditFormProps = {
  patient: ClientPatient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (patient: PatientFormValues) => Promise<boolean>;
  isSaving: boolean;
  error?: string;
};

const getDateInputValue = (value: string) => value.slice(0, 10);

export const PatientEditForm = ({
  patient,
  open,
  onOpenChange,
  onSave,
  isSaving,
  error,
}: PatientEditFormProps) => {
  const [formValues, setFormValues] = useState<PatientFormValues>(() => ({
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.email,
    phone: patient.phone,
    pesel: patient.pesel,
    dateOfBirth: getDateInputValue(patient.dateOfBirth),
  }));

  const updateFormValue = (field: keyof PatientFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const savePatient = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const saved = await onSave(formValues);

    if (saved) {
      onOpenChange(false);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/10" />
        <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-lg bg-background text-sm text-primary shadow-lg outline-none">
          <div className="flex items-start justify-between border-b border-primary/10 p-6">
            <div>
              <DialogPrimitive.Title className="font-serif text-2xl font-bold">
                Edit patient
              </DialogPrimitive.Title>
            </div>

            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close edit patient form"
                />
              }
            >
              <X />
            </DialogPrimitive.Close>
          </div>

          <form
            id="edit-patient-form"
            onSubmit={savePatient}
            className="grid gap-5 p-6"
          >
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <FormField
              label="First name"
              value={formValues.firstName}
              onChange={(value) => updateFormValue("firstName", value)}
            />
            <FormField
              label="Last name"
              value={formValues.lastName}
              onChange={(value) => updateFormValue("lastName", value)}
            />
            <FormField
              label="Email"
              type="email"
              value={formValues.email}
              onChange={(value) => updateFormValue("email", value)}
            />
            <FormField
              label="Phone"
              type="tel"
              value={formValues.phone}
              onChange={(value) => updateFormValue("phone", value)}
            />
            <FormField
              label="Date of birth"
              type="date"
              value={formValues.dateOfBirth}
              onChange={(value) => updateFormValue("dateOfBirth", value)}
            />
            <FormField
              label="PESEL"
              value={formValues.pesel}
              onChange={(value) => updateFormValue("pesel", value)}
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
              form="edit-patient-form"
              disabled={isSaving}
              className="rounded-[5px]"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

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
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 rounded-[5px] border-primary/10 bg-background text-sm font-normal text-primary"
    />
  </label>
);
