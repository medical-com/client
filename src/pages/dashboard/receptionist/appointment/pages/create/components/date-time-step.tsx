import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BookingSection } from "./booking-section";
import type { DateTimeStepProps } from "../types";

export const DateTimeStep = ({
  serviceSelected,
  weekStart,
  weekDates,
  selectedDate,
  selectedTime,
  slots,
  loading,
  error = false,
  onWeekChange,
  onDateSelect,
  onTimeSelect,
  parseDateKey,
  formatDateKey,
  dateLabel,
}: DateTimeStepProps) => (
  <BookingSection number={3} title="Select date and time">
    {!serviceSelected ? (
      <p className="text-sm text-primary/50">
        Choose a medical service first to see availability.
      </p>
    ) : (
      <>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-bold">
            {parseDateKey(weekStart).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous week"
              onClick={() => onWeekChange(-7)}
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next week"
              onClick={() => onWeekChange(7)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
          {weekDates.map((date) => {
            const key = formatDateKey(date);
            const disabled =
              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
              date.getDay() === 0;
            return (
              <button
                key={key}
                type="button"
                disabled={disabled}
                onClick={() => onDateSelect(date)}
                className={cn(
                  "rounded-[5px] border px-2 py-3 text-center transition-colors",
                  selectedDate === key
                    ? "border-primary bg-primary text-background"
                    : "border-primary/10 hover:border-accent hover:bg-accent/5",
                  disabled && "cursor-not-allowed opacity-30",
                )}
              >
                <span className="block text-[10px] font-bold uppercase tracking-wider opacity-60">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </span>
                <span className="mt-1 block font-serif text-xl font-bold">
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </div>
        <div className="mt-6 border-t border-primary/10 pt-5">
          <p className="text-xs font-extrabold tracking-[0.18em] text-accent">
            AVAILABLE TIMES · {dateLabel(selectedDate)}
          </p>
          {loading && (
            <p className="mt-4 flex items-center gap-2 text-sm text-primary/50">
              <LoaderCircle className="size-4 animate-spin" /> Checking
              availability...
            </p>
          )}
          {!loading && slots.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onTimeSelect(slot)}
                  className={cn(
                    "rounded-[5px] border px-3 py-2.5 text-sm font-bold",
                    selectedTime === slot
                      ? "border-primary bg-primary text-background"
                      : "border-primary/15 hover:border-accent hover:bg-accent/5",
                  )}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
          {!loading && slots.length === 0 && (
            <p className="mt-4 text-sm text-primary/50">
              {error
                ? "Availability could not be loaded. Please try again."
                : "No appointments are available on this date. Try another day."}
            </p>
          )}
        </div>
      </>
    )}
  </BookingSection>
);
