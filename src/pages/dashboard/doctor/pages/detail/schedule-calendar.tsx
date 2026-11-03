import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { addDays, format, startOfWeek } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  useListDoctorScheduleExceptionsQuery,
  useListDoctorScheduleQuery,
} from "@/pages/dashboard/doctor/hooks";
import type {
  DoctorSchedule,
  DoctorScheduleException,
} from "@/pages/dashboard/doctor/hooks";

const HOURS = Array.from({ length: 11 }, (_, index) => index + 8);

type CalendarProps = {
  doctorId?: string;
};

const Calendar = ({ doctorId }: CalendarProps) => {
  const [weekStart, setWeekStart] = useState(() =>
    startOfWeek(new Date(), { weekStartsOn: 1 }),
  );

  const scheduleQuery = useListDoctorScheduleQuery(doctorId);
  const exceptionQuery = useListDoctorScheduleExceptionsQuery(doctorId);

  const days = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart],
  );

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">
        <section className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous week"
              onClick={() => setWeekStart((date) => addDays(date, -7))}
              className="size-9 rounded-[5px] border-primary/10"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }))
              }
              className="rounded-[5px] border-primary/10"
            >
              Today
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next week"
              onClick={() => setWeekStart((date) => addDays(date, 7))}
              className="size-9 rounded-[5px] border-primary/10"
            >
              <ChevronRight className="size-4" />
            </Button>
            <p className="ml-2 font-serif text-lg font-bold">
              {format(weekStart, "MMM d")} –{" "}
              {format(addDays(weekStart, 6), "MMM d, yyyy")}
            </p>
          </div>
        </section>

        {scheduleQuery.error || exceptionQuery.error ? (
          <p className="mb-4 text-sm text-destructive">
            Failed to load the doctor schedule.
          </p>
        ) : null}

        <section className="overflow-hidden rounded-[5px] border border-primary/10">
          <div className="overflow-x-auto">
            <div className="min-w-225">
              <div className="grid grid-cols-[72px_repeat(7,minmax(115px,1fr))] border-b border-primary/10">
                <div />
                {days.map((day) => (
                  <div
                    key={day.toISOString()}
                    className="border-l border-primary/10 px-3 py-4 text-center"
                  >
                    <p className="text-[10px] font-extrabold tracking-[0.18em] text-primary/40">
                      {format(day, "EEE")}
                    </p>
                    <p className="mt-1 font-serif text-2xl font-bold">
                      {format(day, "d")}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-[72px_repeat(7,minmax(115px,1fr))]">
                <div>
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className="flex h-16 items-center justify-end border-b border-primary/10 px-3"
                    >
                      <span className="text-[10px] font-bold text-primary/35">
                        {formatHour(hour)}
                      </span>
                    </div>
                  ))}
                </div>

                {days.map((day) => (
                  <div
                    key={day.toISOString()}
                    className="border-l border-primary/10"
                  >
                    {HOURS.map((hour) => {
                      const status = getCellStatus(
                        day,
                        hour,
                        scheduleQuery.data?.data ?? [],
                        exceptionQuery.data?.data ?? [],
                      );

                      return (
                        <div
                          key={hour}
                          className={`h-16 border-b border-primary/10 p-1.5 ${
                            status === "working"
                              ? "bg-emerald-100"
                              : "bg-red-100"
                          }`}
                          aria-label={`${format(day, "EEEE")} ${formatHour(hour)}: ${
                            status === "working"
                              ? "doctor works"
                              : "doctor is not working"
                          }`}
                        >
                          <div
                            className={`flex h-full items-center justify-center rounded-sm text-[10px] font-bold ${
                              status === "working"
                                ? "bg-emerald-200/70 text-emerald-900"
                                : "bg-red-200/70 text-red-900"
                            }`}
                          >
                            {status === "working" ? "Working" : "Not working"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 flex flex-wrap gap-6 text-xs text-primary/50">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500" />
            Doctor works
          </div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500" />
            Doctor does not work
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-3.5" />
            Hourly schedule
          </div>
        </div>
      </main>
    </div>
  );
};

const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

const getCellStatus = (
  day: Date,
  hour: number,
  schedules: DoctorSchedule[],
  exceptions: DoctorScheduleException[],
) => {
  const date = format(day, "yyyy-MM-dd");
  const time = `${formatHour(hour)}:00`;
  const schedule = schedules.find(
    (entry) =>
      entry.dayOfWeek === day.getDay() ||
      (entry.dayOfWeek === 7 && day.getDay() === 0),
  );
  const isWithinSchedule = schedule
    ? date >= schedule.validFrom.slice(0, 10) &&
      (!schedule.validTo || date <= schedule.validTo.slice(0, 10)) &&
      time >= schedule.startTime.slice(0, 8) &&
      time < schedule.endTime.slice(0, 8)
    : false;

  const exception = exceptions.find((entry) => {
    const start = new Date(entry.startAt);
    const end = new Date(entry.endAt);
    const cellStart = new Date(`${date}T${time}`);
    const cellEnd = new Date(cellStart.getTime() + 60 * 60 * 1000);
    return start < cellEnd && end > cellStart;
  });

  if (exception)
    return exception.type === "available" ? "working" : "not-working";
  return isWithinSchedule ? "working" : "not-working";
};

export default Calendar;
