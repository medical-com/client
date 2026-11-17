import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { BookingSection } from "./booking-section";
import type { ServiceStepProps } from "../types";

export const ServiceStep = ({
  services,
  selectedServiceId,
  onSelect,
}: ServiceStepProps) => (
  <BookingSection number={1} title="Select a medical service">
    <div className="grid gap-2 sm:grid-cols-2">
      {services.map((service) => (
        <button
          key={service.id}
          type="button"
          onClick={() => onSelect(service.id)}
          className={cn(
            "rounded-[5px] border p-4 text-left transition-colors",
            selectedServiceId === service.id
              ? "border-primary bg-primary text-background"
              : "border-primary/10 hover:border-accent hover:bg-accent/5",
          )}
        >
          <span className="block text-sm font-bold">{service.name}</span>
          <span
            className={cn(
              "mt-2 flex items-center gap-3 text-xs",
              selectedServiceId === service.id
                ? "text-background/60"
                : "text-primary/50",
            )}
          >
            <span>
              <Clock3 className="mr-1 inline size-3.5" />
              {service.duration} min
            </span>
            <span>Price on file</span>
          </span>
        </button>
      ))}
    </div>
  </BookingSection>
);
