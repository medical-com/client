import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useListAppointmentsQuery } from "@/pages/dashboard/hooks/appointments";

const calendarHours = Array.from({ length: 10 }, (_, index) => {
  const hour = String(index + 8).padStart(2, "0");
  return `${hour}:00`;
});

const toCalendarDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const startOfWeek = (date: Date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  const day = result.getDay() || 7;
  result.setDate(result.getDate() - day + 1);
  return result;
};

const formatDay = (date: Date) =>
  date.toLocaleDateString("en-US", {
    weekday: "short",
  });

const formatDisplayDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [weekOffset, setWeekOffset] = useState(0);
  const displayedWeekDates = useMemo(() => {
    const weekStart = startOfWeek(new Date());
    weekStart.setDate(weekStart.getDate() + weekOffset * 7);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + index);
      return date;
    });
  }, [weekOffset]);
  const weekEnd = new Date(displayedWeekDates[6] ?? new Date());
  weekEnd.setDate(weekEnd.getDate() + 1);
  const appointmentsQuery = useListAppointmentsQuery(
    toCalendarDate(displayedWeekDates[0] ?? new Date()),
    toCalendarDate(weekEnd),
  );
  const appointments = appointmentsQuery.data?.data ?? [];

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">
        <section className="mb-8">
          <p className="mb-3 text-xs font-extrabold tracking-[0.22em] text-accent">
            DOCTOR DASHBOARD
          </p>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                My appointments
              </h1>
              <p className="mt-3 font-serif text-lg text-primary/60">
                Review your schedule and complete patient visits.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-[5px] border-primary/10"
                onClick={() => setWeekOffset((offset) => offset - 1)}
                aria-label="Previous week"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-[5px] border-primary/10"
                onClick={() => setWeekOffset((offset) => offset + 1)}
                aria-label="Next week"
              >
                <ChevronRight className="size-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-[5px] border-primary/10"
                onClick={() => setWeekOffset(0)}
                disabled={weekOffset === 0}
              >
                Today
              </Button>
              <Button
                variant="outline"
                className="rounded-[5px] border-primary/10"
                onClick={() =>
                  navigate("/dashboard/doctor/appointments/day")
                }
              >
                Day
              </Button>
              <Button
                variant="outline"
                className="rounded-[5px] border-primary/10"
                disabled
              >
                Week
              </Button>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[5px] border border-primary/10">
          <div className="overflow-x-auto">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[72px_repeat(7,minmax(130px,1fr))] border-b border-primary/10">
                <div />
                {displayedWeekDates.map((date) => (
                  <div
                    key={toCalendarDate(date)}
                    className="border-l border-primary/10 px-4 py-4 text-center"
                  >
                    <p className="text-[10px] font-extrabold tracking-[0.18em] text-primary/40">
                      {formatDay(date).toUpperCase()}
                    </p>
                    <p className="mt-1 font-serif text-2xl font-bold">
                      {formatDisplayDate(date)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-[72px_repeat(7,minmax(130px,1fr))]">
                <div>
                  {calendarHours.map((hour) => (
                    <div
                      key={hour}
                      className="h-24 border-b border-primary/10 px-2 pt-2 text-right text-[10px] font-bold text-primary/35"
                    >
                      {hour}
                    </div>
                  ))}
                </div>
                {displayedWeekDates.map((date) => (
                  <div
                    key={toCalendarDate(date)}
                    className="relative border-l border-primary/10"
                  >
                    {calendarHours.map((hour) => (
                      <div
                        key={`${toCalendarDate(date)}-${hour}`}
                        className="h-24 border-b border-primary/10"
                      />
                    ))}
                    {appointments
                      .filter(
                        (appointment) =>
                          toCalendarDate(new Date(appointment.startAt)) ===
                          toCalendarDate(date),
                      )
                      .map((appointment) => {
                        const start = new Date(appointment.startAt);
                        const hour = start.getHours();
                        const minute = start.getMinutes();
                        const top = (hour - 8 + minute / 60) * 96;

                        return (
                          <button
                            type="button"
                            key={appointment.id}
                            onClick={() =>
                              navigate(
                                `/dashboard/doctor/appointments/${appointment.id}`,
                              )
                            }
                            style={{ top }}
                            className={`absolute left-1 right-1 min-h-20 rounded-sm border p-3 text-left transition hover:-translate-y-0.5 hover:shadow-[3px_3px_0_var(--color-highlight)] ${
                              appointment.status === "completed"
                                ? "border-blue-300 bg-blue-100"
                                : "border-emerald-300 bg-emerald-100"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-[10px] font-extrabold tracking-wide text-accent">
                                {start.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: false,
                                })}
                              </span>
                              <Clock className="size-3 text-accent/60" />
                            </div>
                            <p className="mt-2 truncate font-serif text-sm font-bold">
                              {appointment.patient.firstName}{" "}
                              {appointment.patient.lastName}
                            </p>
                            <p className="mt-1 truncate text-[10px] text-primary/55">
                              {appointment.service.name}
                            </p>
                          </button>
                        );
                      })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {appointmentsQuery.isLoading && (
          <p className="mt-4 text-sm text-primary/50">
            Loading appointments...
          </p>
        )}
        {appointmentsQuery.isError && (
          <p className="mt-4 text-sm text-destructive">
            Appointments could not be loaded.
          </p>
        )}

        {weekOffset !== 0 && (
          <p className="mt-4 text-sm text-primary/50">
            Showing the selected week.
          </p>
        )}
      </main>
    </div>
  );
};

export default DoctorAppointments;
