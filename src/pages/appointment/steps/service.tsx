import { Controller, type UseFormReturn } from "react-hook-form";
import type { AppointmentFormValues } from "../types";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { doctors, services } from "../constants";

export const ServiceStep = ({
  form,
}: {
  form: UseFormReturn<AppointmentFormValues, any>;
}) => {
  return (
    <div className="grid gap-8">
      <Controller
        name="service"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>What service do you need?</FieldLabel>

            <select
              {...field}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "outline-none transition-colors",
                "focus:border-accent focus:ring-2 focus:ring-accent/10",
                fieldState.invalid && "border-destructive",
              )}
              aria-invalid={fieldState.invalid}
            >
              <option value="">Select a service</option>

              {services.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label}
                </option>
              ))}
            </select>

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Controller
        name="doctor"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Choose a doctor</FieldLabel>

            <select
              {...field}
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                "outline-none transition-colors",
                "focus:border-accent focus:ring-2 focus:ring-accent/10",
                fieldState.invalid && "border-destructive",
              )}
              aria-invalid={fieldState.invalid}
            >
              <option value="">Select a doctor</option>

              {doctors.map((doctor) => (
                <option key={doctor.value} value={doctor.value}>
                  {doctor.label}
                </option>
              ))}
            </select>

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
    </div>
  );
};
