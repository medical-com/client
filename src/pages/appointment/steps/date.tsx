import type { AppointmentFormValues } from "../types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateKey, isPastDate, isSameDay } from "../utils";
import type { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { appointmentTimes } from "../constants";

export const DateStep = ({
  form,
  calendarWeek,
  setCalendarWeek,
}: {
  form: UseFormReturn<AppointmentFormValues, any>;
  calendarWeek: Date;
  setCalendarWeek: React.Dispatch<React.SetStateAction<Date>>;
}) => {
  const selectedDate = form.watch("date");
  const selectedTime = form.watch("time");
  return (
    <div>
      {/* Calendar header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-extrabold tracking-[0.18em] text-accent">
            SELECT A DAY
          </p>

          <h3 className="mt-2 font-serif text-2xl font-bold">
            {calendarWeek.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h3>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() =>
              setCalendarWeek((current) => {
                const previous = new Date(current);

                previous.setDate(previous.getDate() - 7);

                return previous;
              })
            }
            aria-label="Previous week"
          >
            <ChevronLeft />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() =>
              setCalendarWeek((current) => {
                const next = new Date(current);

                next.setDate(next.getDate() + 7);

                return next;
              })
            }
            aria-label="Next week"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      {/* Weekly calendar */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({
          length: 7,
        }).map((_, index) => {
          const date = new Date(calendarWeek);

          date.setDate(calendarWeek.getDate() + index);

          const dateKey = formatDateKey(date);

          const selected = selectedDate === dateKey;

          const today = isSameDay(date, new Date());

          const sunday = date.getDay() === 0;

          const unavailable = sunday || isPastDate(date);

          return (
            <button
              key={dateKey}
              type="button"
              disabled={unavailable}
              onClick={() => {
                form.setValue("date", dateKey, {
                  shouldValidate: true,
                });

                form.setValue("time", "");
              }}
              className={cn(
                `
                        flex min-h-24
                        flex-col items-center
                        justify-center
                        rounded-[5px]
                        border px-2 py-3
                        transition-all duration-150
                      `,

                selected &&
                  `
                          border-primary
                          bg-primary
                          text-background
                          shadow-[3px_3px_0_var(--color-highlight)]
                        `,

                !selected &&
                  !unavailable &&
                  `
                          border-primary/10
                          hover:border-accent
                          hover:bg-accent/5
                        `,

                unavailable && "cursor-not-allowed opacity-30",
              )}
            >
              <span
                className={cn(
                  "text-[10px] font-extrabold uppercase tracking-[0.12em]",
                  selected ? "text-background/60" : "text-primary/40",
                )}
              >
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </span>

              <span className="mt-1 font-serif text-2xl font-bold">
                {date.getDate()}
              </span>

              {today && (
                <span className="mt-1 text-[9px] font-bold uppercase tracking-wider text-accent">
                  Today
                </span>
              )}
            </button>
          );
        })}
      </div>

      {form.formState.errors.date && (
        <p className="mt-3 text-sm font-medium text-destructive">
          {form.formState.errors.date.message}
        </p>
      )}

      {/* Time */}
      <div className="mt-10 border-t border-primary/10 pt-8">
        <p className="text-xs font-extrabold tracking-[0.18em] text-accent">
          SELECT A TIME
        </p>

        <h3 className="mt-2 font-serif text-2xl font-bold">Available times</h3>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {appointmentTimes.map((time) => {
            const selected = selectedTime === time;

            const disabled = !selectedDate;

            return (
              <button
                key={time}
                type="button"
                disabled={disabled}
                onClick={() =>
                  form.setValue("time", time, {
                    shouldValidate: true,
                  })
                }
                className={cn(
                  `
                            rounded-[5px]
                            border
                            px-4 py-3
                            text-sm font-bold
                            transition-all
                          `,

                  selected
                    ? "border-primary bg-primary text-background"
                    : "border-primary/15 bg-background text-primary",

                  !disabled &&
                    !selected &&
                    "hover:border-accent hover:bg-accent/5",

                  disabled && "cursor-not-allowed opacity-30",
                )}
              >
                {time}
              </button>
            );
          })}
        </div>

        {form.formState.errors.time && (
          <p className="mt-3 text-sm font-medium text-destructive">
            {form.formState.errors.time.message}
          </p>
        )}

        {!selectedDate && (
          <p className="mt-4 font-serif text-sm text-primary/45">
            Please select a day to see available appointment times.
          </p>
        )}
      </div>
    </div>
  );
};
