import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { doctorAppointments, doctorCalendarHours } from "../../constants";

const weekDates = [
  "2026-08-24",
  "2026-08-25",
  "2026-08-26",
  "2026-08-27",
  "2026-08-28",
  "2026-08-29",
  "2026-08-30",
];

const formatDay = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
  });

const formatDate = (date: string) =>
  new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [weekOffset, setWeekOffset] = useState(0);
  const displayedWeekDates = useMemo(
    () =>
      weekDates.map((date) => {
        const displayedDate = new Date(`${date}T12:00:00`);
        displayedDate.setDate(displayedDate.getDate() + weekOffset * 7);
        return displayedDate.toISOString().slice(0, 10);
      }),
    [weekOffset],
  );

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
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-[5px] border-primary/10"
                onClick={() => setWeekOffset((offset) => offset + 1)}
              >
                <ChevronRight className="size-4" />
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
                    key={date}
                    className="border-l border-primary/10 px-4 py-4 text-center"
                  >
                    <p className="text-[10px] font-extrabold tracking-[0.18em] text-primary/40">
                      {formatDay(date).toUpperCase()}
                    </p>
                    <p className="mt-1 font-serif text-2xl font-bold">
                      {formatDate(date)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-[72px_repeat(7,minmax(130px,1fr))]">
                <div>
                  {doctorCalendarHours.map((hour) => (
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
                    key={date}
                    className="relative border-l border-primary/10"
                  >
                    {doctorCalendarHours.map((hour) => (
                      <div
                        key={`${date}-${hour}`}
                        className="h-24 border-b border-primary/10"
                      />
                    ))}
                    {doctorAppointments
                      .filter((appointment) => appointment.date === date)
                      .map((appointment) => {
                        const hour = Number(appointment.time.slice(0, 2));
                        const minute = Number(appointment.time.slice(3));
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
                                {appointment.time}
                              </span>
                              <Clock className="size-3 text-accent/60" />
                            </div>
                            <p className="mt-2 truncate font-serif text-sm font-bold">
                              {appointment.patient.name}
                            </p>
                            <p className="mt-1 truncate text-[10px] text-primary/55">
                              {appointment.type}
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

        {weekOffset !== 0 && (
          <p className="mt-4 text-sm text-primary/50">
            This demo calendar uses local constants, so changing weeks keeps the
            sample appointments in the displayed reference week.
          </p>
        )}
      </main>
    </div>
  );
};

export default DoctorAppointments;
