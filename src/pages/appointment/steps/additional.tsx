import { Controller, type UseFormReturn } from "react-hook-form";
import type { AppointmentFormValues } from "../types";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";

export const AdditionalStep = ({
  form,
}: {
  form: UseFormReturn<AppointmentFormValues, any>;
}) => {
  return (
    <Controller
      name="additionalInfo"
      control={form.control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>Additional information</FieldLabel>

          <textarea
            {...field}
            rows={8}
            placeholder="Tell us anything else that may help us prepare for your visit..."
            className={cn(
              `
                      flex w-full rounded-md
                      border border-input
                      bg-background
                      px-3 py-2
                      text-sm
                      shadow-xs
                      outline-none
                      transition-colors
                      placeholder:text-muted-foreground
                      focus:border-accent
                      focus:ring-2
                      focus:ring-accent/10
                      resize-none
                    `,
              fieldState.invalid && "border-destructive",
            )}
            aria-invalid={fieldState.invalid}
          />

          <FieldError errors={[fieldState.error]} />

          <p className="mt-2 font-serif text-sm leading-6 text-primary/45">
            Please do not include highly sensitive medical information in this
            form. Your doctor can discuss those details with you during your
            appointment.
          </p>
        </Field>
      )}
    />
  );
};
