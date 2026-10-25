import { ArrowLeft, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateDoctorMutation } from "../hooks";

type DoctorForm = {
  firstName: string;
  lastName: string;
  pesel: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  licenseNumber: string;
  specialization: string;
};

const initialForm: DoctorForm = {
  firstName: "",
  lastName: "",
  pesel: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  licenseNumber: "",
  specialization: "",
};

const DashboardAddDoctor = () => {
  const navigate = useNavigate();
  const createDoctorMutation = useCreateDoctorMutation();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof DoctorForm, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await createDoctorMutation.mutateAsync(form);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
        <button type="button" onClick={() => navigate("/dashboard/doctors")} className="mb-8 flex items-center gap-2 text-xs font-bold text-primary/50 hover:text-primary">
          <ArrowLeft className="size-4" /> Back to doctors
        </button>
        <section className="mb-10">
          <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">NEW RECORD</p>
          <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">Add doctor</h1>
          <p className="mt-3 font-serif text-lg text-primary/60">Send an invitation to a new member of the care team.</p>
        </section>
        {submitted ? (
          <section className="max-w-3xl border-t border-primary/10 pt-6">
            <p className="text-sm font-semibold text-accent">Invitation sent. The doctor will be added after confirming the email.</p>
            <Button type="button" onClick={() => navigate("/dashboard/doctors")} className="mt-6">Return to doctors</Button>
          </section>
        ) : (
          <form onSubmit={submit} className="max-w-3xl border-t border-primary/10 pt-6">
            <div className="mb-8 grid gap-6 sm:grid-cols-2">
              <FormField label="First name" name="firstName" value={form.firstName} onChange={update} required />
              <FormField label="Last name" name="lastName" value={form.lastName} onChange={update} required />
              <FormField label="PESEL" name="pesel" value={form.pesel} onChange={update} required />
              <FormField label="Email address" name="email" type="email" value={form.email} onChange={update} required />
              <FormField label="Phone number" name="phoneNumber" type="tel" value={form.phoneNumber} onChange={update} required />
              <FormField label="Date of birth" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={update} required />
              <FormField label="License number" name="licenseNumber" value={form.licenseNumber} onChange={update} required />
              <FormField label="Specialization" name="specialization" value={form.specialization} onChange={update} required />
            </div>
            {createDoctorMutation.error && <p className="mb-4 text-sm text-destructive" role="alert">{createDoctorMutation.error.message}</p>}
            <div className="flex justify-end border-t border-primary/10 pt-6">
              <Button type="submit" disabled={createDoctorMutation.isPending} className="h-10 rounded-[5px] bg-primary px-4 text-background hover:bg-primary/85">
                <UserRoundPlus className="size-4" /> {createDoctorMutation.isPending ? "Sending..." : "Create doctor"}
              </Button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

const FormField = ({
  label, name, value, onChange, type = "text", required = false,
}: {
  label: string;
  name: keyof DoctorForm;
  value: string;
  onChange: (field: keyof DoctorForm, value: string) => void;
  type?: string;
  required?: boolean;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={name} className="text-xs font-bold text-primary/60">{label}</Label>
    <Input id={name} name={name} type={type} value={value} onChange={(event) => onChange(name, event.target.value)} required={required} className="h-11 rounded-[5px] border-primary/10 bg-background" />
  </div>
);

export default DashboardAddDoctor;
