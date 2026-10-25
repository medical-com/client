import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ClientDoctor } from "../hooks";

type DoctorFormValues = Pick<
  ClientDoctor,
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "pesel"
  | "dateOfBirth"
  | "licenseNumber"
  | "specialization"
>;

type DoctorEditFormProps = {
  doctor: ClientDoctor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (doctor: DoctorFormValues) => Promise<boolean>;
  isSaving: boolean;
  error?: string;
};

const getDateInputValue = (value: string) => value.slice(0, 10);

export const DoctorEditForm = ({
  doctor,
  open,
  onOpenChange,
  onSave,
  isSaving,
  error,
}: DoctorEditFormProps) => {
  const [formValues, setFormValues] = useState<DoctorFormValues>(() => ({
    firstName: doctor.firstName,
    lastName: doctor.lastName,
    email: doctor.email,
    phone: doctor.phone,
    pesel: doctor.pesel,
    dateOfBirth: getDateInputValue(doctor.dateOfBirth),
    licenseNumber: doctor.licenseNumber,
    specialization: doctor.specialization,
  }));

  const updateFormValue = (field: keyof DoctorFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const saveDoctor = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await onSave(formValues)) onOpenChange(false);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/10" />
        <DialogPrimitive.Popup className="fixed top-1/2 left-1/2 z-50 flex max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto rounded-lg bg-background text-sm text-primary shadow-lg outline-none">
          <div className="flex items-start justify-between border-b border-primary/10 p-6">
            <DialogPrimitive.Title className="font-serif text-2xl font-bold">
              Edit doctor
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Close edit doctor form"
                />
              }
            >
              <X />
            </DialogPrimitive.Close>
          </div>

          <form
            id="edit-doctor-form"
            onSubmit={saveDoctor}
            className="grid gap-5 p-6"
          >
            {error && (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <FormField label="First name" value={formValues.firstName} onChange={(value) => updateFormValue("firstName", value)} />
            <FormField label="Last name" value={formValues.lastName} onChange={(value) => updateFormValue("lastName", value)} />
            <FormField label="Specialization" value={formValues.specialization} onChange={(value) => updateFormValue("specialization", value)} />
            <FormField label="License number" value={formValues.licenseNumber} onChange={(value) => updateFormValue("licenseNumber", value)} />
            <FormField label="Email" type="email" value={formValues.email} onChange={(value) => updateFormValue("email", value)} />
            <FormField label="Phone" type="tel" value={formValues.phone} onChange={(value) => updateFormValue("phone", value)} />
            <FormField label="Date of birth" type="date" value={formValues.dateOfBirth} onChange={(value) => updateFormValue("dateOfBirth", value)} />
            <FormField label="PESEL" value={formValues.pesel} onChange={(value) => updateFormValue("pesel", value)} />
          </form>

          <div className="flex flex-col-reverse gap-2 border-t border-primary/10 p-6 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving} className="rounded-[5px] border-primary/10">
              Cancel
            </Button>
            <Button type="submit" form="edit-doctor-form" disabled={isSaving} className="rounded-[5px]">
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
