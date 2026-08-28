import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { AppointmentFormValues } from "../types";

export const PersonalInformationStep = ({
  form,
}: {
  form: UseFormReturn<AppointmentFormValues, any>;
}) => {
  return (
    <div className="grid gap-7 sm:grid-cols-2">
      <Controller
        name="firstName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>First name</FieldLabel>

            <Input
              {...field}
              placeholder="John"
              autoComplete="given-name"
              aria-invalid={fieldState.invalid}
            />

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Controller
        name="secondName"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Second name</FieldLabel>

            <Input
              {...field}
              placeholder="Doe"
              autoComplete="family-name"
              aria-invalid={fieldState.invalid}
            />

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Controller
        name="address"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="sm:col-span-2">
            <FieldLabel>Address</FieldLabel>

            <Input
              {...field}
              placeholder="123 Main Street, New York, NY 10001"
              autoComplete="street-address"
              aria-invalid={fieldState.invalid}
            />

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Controller
        name="dateOfBirth"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Date of birth</FieldLabel>

            <Input
              {...field}
              type="date"
              autoComplete="bday"
              aria-invalid={fieldState.invalid}
            />

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Controller
        name="phone"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>Phone number</FieldLabel>

            <Input
              {...field}
              type="tel"
              placeholder="+1 (555) 123-4567"
              autoComplete="tel"
              aria-invalid={fieldState.invalid}
            />

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel>E-mail</FieldLabel>

            <Input
              {...field}
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              aria-invalid={fieldState.invalid}
            />

            <FieldError errors={[fieldState.error]} />
          </Field>
        )}
      />
    </div>
  );
};
