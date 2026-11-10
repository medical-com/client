import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Search,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppointmentCard } from "../components/appointment-card";
import { AppointmentFilterDropdown } from "../components/appointment-filter-dropdown";
import { hours } from "../constants";
import { useListAppointmentsQuery } from "../hooks";
import type { Day } from "../types";
import { useListDoctorQuery } from "@/pages/dashboard/hooks/doctor/query";
import { useListServiceQuery } from "@/pages/dashboard/hooks/services/query";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

const formatDate = (date: Date) => date.toISOString().slice(0, 10);
const startOfWeek = (date: Date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  const day = result.getDay() || 7;
  result.setDate(result.getDate() - day + 1);
  return result;
};

const DashboardAppointments = () => {
  const navigate = useNavigate();
  const [weekStart, setWeekStart] = useState(() => startOfWeek(new Date()));
  const [search, setSearch] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const doctorsQuery = useListDoctorQuery("", 100);
  const servicesQuery = useListServiceQuery("", 1, 100);
  const weekDates = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const date = new Date(weekStart);
        date.setDate(date.getDate() + index);
        return date;
      }),
    [weekStart],
  );
  const weekEnd = new Date(weekDates[6] ?? weekStart);
  weekEnd.setDate(weekEnd.getDate() + 1);
  const appointmentsQuery = useListAppointmentsQuery(
    formatDate(weekStart),
    formatDate(weekEnd),
    search,
    doctorId,
    serviceId,
  );
  const days: Day[] = weekDates.map((date) => ({
    name: date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
    date: date.getDate(),
    appointments: (appointmentsQuery.data?.data ?? [])
      .filter(
        (appointment) =>
          formatDate(new Date(appointment.startAt)) === formatDate(date),
      )
      .map((appointment) => ({
        id: appointment.id,
        time: new Date(appointment.startAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        patient: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
        doctor: `Dr. ${appointment.doctor.firstName} ${appointment.doctor.lastName}`,
        type: appointment.service.name,
        duration: appointment.service.duration,
      })),
  }));
  const weekLabel = `${weekStart.toLocaleDateString("en-US", { month: "long", day: "numeric" })} – ${weekDates[6]?.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-extrabold tracking-[0.22em] text-accent">
                RECEPTION DESK
              </p>

              <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                Appointments
              </h1>

              <p className="mt-3 font-serif text-lg text-primary/60">
                Manage your clinic schedule and patient visits.
              </p>
            </div>

            <Button
              onClick={() =>
                navigate("/dashboard/receptionist/appointments/create")
              }
              className="
                rounded-[5px]
                bg-primary text-background
                shadow-[4px_4px_0_var(--color-highlight)]
                transition-all
                hover:translate-x-0.5
                hover:translate-y-0.5
                hover:bg-primary
                hover:shadow-[2px_2px_0_var(--color-highlight)]
              "
            >
              <Plus className="mr-2 size-4" />
              New appointment
            </Button>
          </div>
        </section>

        {/* Controls */}
        <section className="mb-6 flex flex-col gap-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            {/* Date navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-[5px] border-primary/10"
                onClick={() => {
                  const date = new Date(weekStart);
                  date.setDate(date.getDate() - 7);
                  setWeekStart(date);
                }}
              >
                <ChevronLeft className="size-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="size-9 rounded-[5px] border-primary/10"
                onClick={() => {
                  const date = new Date(weekStart);
                  date.setDate(date.getDate() + 7);
                  setWeekStart(date);
                }}
              >
                <ChevronRight className="size-4" />
              </Button>

              <Button
                variant="outline"
                className="ml-2 rounded-[5px] border-primary/10"
                onClick={() =>
                  navigate("/dashboard/receptionist/appointments/day")
                }
              >
                Today
              </Button>

              <h2 className="ml-2 font-serif text-lg font-bold">{weekLabel}</h2>
            </div>
          </div>

          {/* Search */}
          <div className="relative  flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary/40" />

            <Input
              placeholder="Search patients..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 w-2/9 rounded-[5px] border-primary/10 bg-background pl-9"
            />

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

        {/* Calendar */}
        <section className="overflow-hidden rounded-[5px] border border-primary/10">
          <div className="overflow-x-auto">
            <div className="min-w-250">
              {/* Days header */}
              <div className="grid grid-cols-[72px_repeat(7,minmax(130px,1fr))] border-b border-primary/10">
                <div />

                {days.map((day) => {
                  const isToday = day.date === 27;

                  return (
                    <div
                      key={day.date}
                      className={`
                        border-l border-primary/10
                        px-4 py-4 text-center
                        ${isToday ? "bg-accent/4" : ""}
                      `}
                    >
                      <p className="text-[10px] font-extrabold tracking-[0.18em] text-primary/40">
                        {day.name}
                      </p>

                      <p
                        className={`
                          mt-1 font-serif text-2xl font-bold
                          ${isToday ? "text-accent" : ""}
                        `}
                      >
                        {day.date}
                      </p>

                      {isToday && (
                        <span className="mx-auto mt-2 block size-1.5 rounded-full bg-accent" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Time grid */}
              <div className="grid grid-cols-[72px_repeat(7,minmax(130px,1fr))]">
                {/* Time column */}
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

                {/* Days */}
                {days.map((day) => (
                  <div
                    key={day.date}
                    className={`
                      relative border-l border-primary/10
                      ${day.date === 27 ? "bg-accent/2.5" : ""}
                    `}
                  >
                    {/* Hour lines */}
                    {hours.map((hour) => (
                      <div
                        key={hour}
                        className="h-24 border-b border-primary/10"
                      />
                    ))}

                    {/* Appointments */}
                    {day.appointments.map((appointment) => {
                      const hour = parseInt(appointment.time.split(":")[0]);
                      const minutes = parseInt(appointment.time.split(":")[1]);

                      const top = (hour - 8) * 96 + (minutes / 60) * 96;

                      return (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          top={top}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap gap-6 text-xs text-primary/50">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-accent" />
            Confirmed
          </div>

          <div className="flex items-center gap-2">
            <Clock className="size-3.5" />
            60 minute appointment
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="size-3.5" />
            Clinic hours 08:00 – 18:00
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardAppointments;
