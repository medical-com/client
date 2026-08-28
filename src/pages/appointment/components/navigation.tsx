import { Button } from "@/components/ui/button";
import { steps } from "../constants";
import { AppointmentStep, type AppointmentFormValues } from "../types";
import type { UseFormReturn } from "react-hook-form";

export const FormNavigation = ({
  form,
  currentStep,
  handleBack,
  handleNext,
}: {
  form: UseFormReturn<AppointmentFormValues, any>;
  currentStep: number;
  handleBack: () => void;
  handleNext: () => void;
}) => {
  return (
    <div className="mt-10 flex flex-col-reverse gap-4 border-t border-primary/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
      {currentStep > 0 ? (
        <Button type="button" variant="outline" size="lg" onClick={handleBack}>
          ← Back
        </Button>
      ) : (
        <div />
      )}

      {currentStep < steps.length - 1 ? (
        <Button
          key="continue"
          type="button"
          size="lg"
          onClick={handleNext}
          className="
                  rounded-[5px]
                  shadow-[5px_5px_0_var(--color-highlight)]
                  transition-all duration-150
                  hover:translate-x-0.5
                  hover:translate-y-0.5
                  hover:shadow-[3px_3px_0_var(--color-highlight)]
                "
        >
          Continue
          <span className="ml-7">→</span>
        </Button>
      ) : (
        <Button
          key="submit"
          type="submit"
          size="lg"
          disabled={
            currentStep !== AppointmentStep.AdditionalInformation ||
            form.formState.isSubmitting
          }
          className="
                  rounded-[5px]
                  shadow-[5px_5px_0_var(--color-highlight)]
                  transition-all duration-150
                  hover:translate-x-0.5
                  hover:translate-y-0.5
                  hover:shadow-[3px_3px_0_var(--color-highlight)]
                "
        >
          {form.formState.isSubmitting ? "Sending..." : "Request appointment"}

          {!form.formState.isSubmitting && <span className="ml-7">→</span>}
        </Button>
      )}
    </div>
  );
};
