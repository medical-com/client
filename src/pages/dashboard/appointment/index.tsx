import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { InfoCard } from "./components/info-card";
import { PatientField } from "./components/patient-field";
import { StatusBadge } from "./components/status-badge";
import { StatusButton } from "./components/status-button";
import { getMockAppointment, statusOptions } from "./constants";

const DashboardAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const appointment = getMockAppointment(id);

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/appointments")}
          className="
            mb-8 flex items-center gap-2
            text-xs font-bold text-primary/50
            transition-colors
            hover:text-primary
          "
        >
          <ArrowLeft className="size-4" />
          Back to appointments
        </button>

        {/* Header */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
            APPOINTMENT
          </p>

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                {appointment.patient.name}
              </h1>

              <p className="mt-3 font-serif text-lg text-primary/60">
                {appointment.type}
              </p>
            </div>

            <StatusBadge status={appointment.status} />
          </div>
        </section>

        {/* Appointment information */}
        <section className="mb-10 grid gap-px overflow-hidden rounded-[5px] bg-primary/10 sm:grid-cols-3">
          <InfoCard
            icon={<CalendarDays className="size-5" />}
            label="DATE"
            value={appointment.date}
          />

          <InfoCard
            icon={<Clock className="size-5" />}
            label="TIME"
            value={`${appointment.time} · ${appointment.duration}`}
          />

          <InfoCard
            icon={<User className="size-5" />}
            label="DOCTOR"
            value={appointment.doctor}
          />
        </section>

        {/* Content */}
        <section className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Patient */}
          <div className="border-t border-primary/10 pt-6">
            <p className="mb-6 text-xs font-extrabold tracking-[0.2em] text-accent">
              PATIENT INFORMATION
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <PatientField
                label="Full name"
                value={appointment.patient.name}
              />

              <PatientField
                label="Date of birth"
                value={appointment.patient.dateOfBirth}
              />

              <PatientField
                label="Phone"
                value={appointment.patient.phone}
                icon={<Phone className="size-4" />}
              />

              <PatientField
                label="Email"
                value={appointment.patient.email}
                icon={<Mail className="size-4" />}
              />
            </div>

            <Separator className="my-8 bg-primary/10" />

            <div>
              <p className="mb-3 text-xs font-bold text-primary/45">
                APPOINTMENT NOTES
              </p>

              <p className="font-serif text-base leading-7 text-primary/70">
                {appointment.notes}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="border-t border-primary/10 pt-6">
            <p className="mb-6 text-xs font-extrabold tracking-[0.2em] text-accent">
              APPOINTMENT STATUS
            </p>

            <div className="rounded-[5px] border border-primary/10 p-6">
              <p className="font-serif text-xl font-bold">
                {appointment.status}
              </p>

              <p className="mt-2 text-sm leading-6 text-primary/50">
                Update the appointment status as the patient progresses through
                their visit.
              </p>

              <div className="mt-6 grid gap-2">
                {statusOptions.map((status) => (
                  <StatusButton
                    key={status}
                    status={status}
                    active={appointment.status}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardAppointment;
