import { cn } from "@/lib/utils";
import { steps } from "../constants";

export const Progress = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: number;
  setCurrentStep: (step: number) => void;
}) => {
  return (
    <div className="mt-12 max-w-5xl">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;

          const isComplete = index < currentStep;

          return (
            <button
              key={step.number}
              type="button"
              disabled={index > currentStep}
              onClick={() => {
                if (index < currentStep) {
                  setCurrentStep(index);
                }
              }}
              className={cn(
                "border-t-2 pt-3 text-left transition-colors duration-150",
                isActive || isComplete ? "border-accent" : "border-primary/10",
                index > currentStep ? "cursor-default" : "cursor-pointer",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-extrabold tracking-[0.18em] sm:text-xs",
                  isActive || isComplete ? "text-accent" : "text-primary/30",
                )}
              >
                {step.number}
              </span>

              <span
                className={cn(
                  "mt-2 hidden font-serif text-sm font-bold sm:block",
                  isActive ? "text-primary" : "text-primary/40",
                )}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
