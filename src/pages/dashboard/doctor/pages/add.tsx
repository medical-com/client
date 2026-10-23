import { ArrowLeft, UserRoundPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DashboardAddDoctor = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => navigate("/dashboard/doctors")}
          className="mb-8 flex items-center gap-2 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to doctors
        </button>

        <section className="mb-10">
          <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
            NEW RECORD
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Add doctor
          </h1>
          <p className="mt-3 font-serif text-lg text-primary/60">
            Create a professional record for a new member of the care team.
          </p>
        </section>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          className="max-w-3xl border-t border-primary/10 pt-6"
        >
          <div className="mb-8 grid gap-6 sm:grid-cols-2">
            <FormField
              label="First name"
              name="firstName"
              placeholder="Michael"
              required
            />
            <FormField
              label="Last name"
              name="lastName"
              placeholder="Carter"
              required
            />
            <FormField
              label="Specialty"
              name="specialty"
              placeholder="General Medicine"
              required
            />
            <FormField
              label="License number"
              name="licenseNumber"
              placeholder="MD-48291"
              required
            />
            <FormField
              label="Email address"
              name="email"
              type="email"
              placeholder="doctor@meridian.example"
              required
            />
            <FormField
              label="Phone number"
              name="phone"
              placeholder="+1 (555) 201-8890"
              required
            />
            <FormField
              label="Clinic address"
              name="address"
              placeholder="24 Meridian Avenue"
              required
            />
            <FormField
              label="Availability"
              name="availability"
              placeholder="Monday - Friday, 9:00 AM - 5:00 PM"
              required
            />
          </div>

          <div className="flex flex-col gap-3 border-t border-primary/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            {submitted ? (
              <p className="text-sm font-semibold text-accent">
                Doctor record created. Returning to the directory...
              </p>
            ) : (
              <p className="text-sm text-primary/45">
                All fields are required.
              </p>
            )}

            <Button
              type={submitted ? "button" : "submit"}
              onClick={
                submitted ? () => navigate("/dashboard/doctors") : undefined
              }
              className="h-10 rounded-[5px] bg-primary px-4 text-background hover:bg-primary/85"
            >
              <UserRoundPlus className="size-4" />
              {submitted ? "Return to doctors" : "Create doctor"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

const FormField = ({
  label,
  name,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) => (
  <div className="grid gap-2">
    <Label htmlFor={name} className="text-xs font-bold text-primary/60">
      {label}
    </Label>
    <Input
      id={name}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="h-11 rounded-[5px] border-primary/10 bg-background"
    />
  </div>
);

export default DashboardAddDoctor;
