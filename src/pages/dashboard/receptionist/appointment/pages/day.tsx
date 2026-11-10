import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppointmentCard } from "../components/appointment-card";
import { AppointmentFilterDropdown } from "../components/appointment-filter-dropdown";
import { hours } from "../constants";
import { useListAppointmentsQuery } from "../hooks";
import { useListDoctorQuery } from "@/pages/dashboard/hooks/doctor/query";
import { useListServiceQuery } from "@/pages/dashboard/hooks/services/query";

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

const DashboardAppointmentDay = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [search, setSearch] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const doctorsQuery = useListDoctorQuery("", 100);
  const servicesQuery = useListServiceQuery("", 1, 100);

  const nextDate = useMemo(() => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    return date;
  }, [selectedDate]);

  const appointmentsQuery = useListAppointmentsQuery(
    formatDate(selectedDate),
    formatDate(nextDate),
    search,
    doctorId,
    serviceId,
  );
  const appointments = useMemo(
    () => appointmentsQuery.data?.data ?? [],
    [appointmentsQuery.data?.data],
  );
  const appointmentLanes = useMemo(() => {
    const sorted = [...appointments].sort(
      (a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime(),
    );
    const lanes: (typeof sorted)[] = [];

    for (const appointment of sorted) {
      const start = new Date(appointment.startAt).getTime();
      const lane = lanes.find((items) => {
        const last = items[items.length - 1];
        return last && new Date(last.endAt).getTime() <= start;
      });

      if (lane) lane.push(appointment);
      else lanes.push([appointment]);
    }

    return lanes;
  }, [appointments]);
  const dateLabel = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const isToday = formatDate(selectedDate) === formatDate(new Date());

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-4 w-full">
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-extrabold tracking-[0.22em] text-accent">
                RECEPTION DESK
              </p>
              <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                Daily appointments
              </h1>
              <p className="mt-3 font-serif text-lg text-primary/60">
                {dateLabel}
              </p>
            </div>
            <Button
              onClick={() =>
                navigate("/dashboard/receptionist/appointments/create")
              }
              className="rounded-[5px] bg-primary text-background shadow-[4px_4px_0_var(--color-highlight)] hover:bg-primary/85"
            >
              <Plus className="mr-2 size-4" />
              New appointment
            </Button>
          </div>
        </section>

        <section className="mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-9 rounded-[5px] border-primary/10"
              onClick={() =>
                setSelectedDate((date) => {
                  const previous = new Date(date);
                  previous.setDate(previous.getDate() - 1);
                  return previous;
                })
              }
              aria-label="Previous day"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-9 rounded-[5px] border-primary/10"
              onClick={() =>
                setSelectedDate((date) => {
                  const next = new Date(date);
                  next.setDate(next.getDate() + 1);
                  return next;
                })
              }
              aria-label="Next day"
            >
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="ml-1 rounded-[5px] border-primary/10"
              onClick={() => setSelectedDate(new Date())}
              disabled={isToday}
            >
              Today
            </Button>
            <Button
              variant="outline"
              className="rounded-[5px] border-primary/10"
              onClick={() => navigate("/dashboard/receptionist/appointments")}
            >
              Week
            </Button>
            <span className="ml-2 font-serif text-lg font-bold">
              {dateLabel}
            </span>
          </div>

          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/40" />
            <Input
              placeholder="Search patients..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 rounded-[5px] border-primary/10 bg-background pl-9"
            />
          </div>
          <div className="flex flex-col gap-3 rounded-[5px] border border-primary/10 bg-primary/[0.02] p-3 sm:flex-row">
            <AppointmentFilterDropdown
              label="Doctor"
              placeholder="All doctors"
              value={doctorId}
              onChange={setDoctorId}
              disabled={doctorsQuery.isLoading || doctorsQuery.isError}
              options={
                doctorsQuery.data?.data.map((doctor) => ({
                  value: doctor.id,
                  label: `Dr. ${doctor.firstName} ${doctor.lastName}`,
                })) ?? []
              }
            />
            <AppointmentFilterDropdown
              label="Service"
              placeholder="All services"
              value={serviceId}
              onChange={setServiceId}
              disabled={servicesQuery.isLoading || servicesQuery.isError}
              options={
                servicesQuery.data?.data.map((service) => ({
                  value: service.id,
                  label: service.name,
                })) ?? []
              }
            />
          </div>
        </section>

        <section className="overflow-hidden rounded-[5px] border border-primary/10">
          <div className="grid grid-cols-[72px_1fr] border-b border-primary/10">
            <div />
            <div className={isToday ? "bg-accent/4 px-4 py-4" : "px-4 py-4"}>
              <p className="text-[10px] font-extrabold tracking-[0.18em] text-primary/40">
                {selectedDate
                  .toLocaleDateString("en-US", { weekday: "short" })
                  .toUpperCase()}
              </p>
              <p
                className={`mt-1 font-serif text-2xl font-bold ${isToday ? "text-accent" : ""}`}
              >
                {selectedDate.getDate()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[72px_1fr]">
            <div>
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-24 border-b border-primary/10 px-3 pt-2 text-right"
                >
                  <span className="text-[10px] font-bold text-primary/35">
                    {hour}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-24 border-b border-l border-primary/10"
                />
              ))}
              {appointmentLanes.map((lane, laneIndex) => (
                <div
                  key={laneIndex}
                  className="absolute inset-y-0"
                  style={{
                    left: `${(laneIndex / appointmentLanes.length) * 100}%`,
                    width: `${100 / appointmentLanes.length}%`,
                  }}
                >
                  {lane.map((appointment) => {
                    const start = new Date(appointment.startAt);
                    const minutesFromEight =
                      (start.getHours() - 8) * 60 + start.getMinutes();
                    return (
                      <AppointmentCard
                        key={appointment.id}
                        appointment={{
                          id: appointment.id,
                          time: formatTime(start),
                          patient: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                          doctor: `Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
                          type: appointment.service.name,
                          duration: appointment.service.duration,
                        }}
                        top={(minutesFromEight / 60) * 96}
                      />
                    );
                  })}
                </div>
              ))}
              {appointmentsQuery.isLoading && (
                <p className="p-6 text-sm text-primary/50">
                  Loading appointments...
                </p>
              )}
              {!appointmentsQuery.isLoading &&
                !appointmentsQuery.isError &&
                appointments.length === 0 && (
                  <div className="absolute inset-0 flex min-h-48 items-center justify-center">
                    <div className="text-center text-primary/50">
                      <CalendarDays className="mx-auto size-6" />
                      <p className="mt-2 text-sm">No appointments scheduled.</p>
                    </div>
                  </div>
                )}
              {appointmentsQuery.isError && (
                <p className="p-6 text-sm text-destructive">
                  Appointments could not be loaded.
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="mt-5 flex items-center gap-2 text-xs text-primary/50">
          <Clock className="size-3.5" />
          Clinic hours 08:00 – 18:00
        </div>
      </main>
    </div>
  );
};

export default DashboardAppointmentDay;
