import { ArrowLeft, CalendarDays, Mail, MapPin, Phone } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Separator } from "@/components/ui/separator";
import { AppointmentItem } from "./components/appointment-item";
import { ContactField } from "./components/contact-field";
import { InfoCard } from "./components/info-card";
import { StatusBadge } from "./components/status-badge";
import { getMockPatient } from "./constants";

const DashboardPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const patient = getMockPatient(id);

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/patients")}
          className="
            mb-8 flex items-center gap-2
            text-xs font-bold text-primary/50
            transition-colors
            hover:text-primary
          "
        >
          <ArrowLeft className="size-4" />
          Back to patients
        </button>

        {/* Header */}
        <section className="mb-10">
          <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
            PATIENT
          </p>

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                {patient.name}
              </h1>

              <p className="mt-3 font-serif text-lg text-primary/60">
                {patient.age} years old · {patient.dateOfBirth}
              </p>
            </div>

            <StatusBadge status={patient.status} />
          </div>
        </section>

        {/* Patient information */}
        <section className="mb-10 grid gap-px overflow-hidden rounded-[5px] bg-primary/10 sm:grid-cols-3">
          <InfoCard
            icon={<Phone className="size-5" />}
            label="PHONE"
            value={patient.phone}
          />

          <InfoCard
            icon={<Mail className="size-5" />}
            label="EMAIL"
            value={patient.email}
          />

          <InfoCard
            icon={<CalendarDays className="size-5" />}
            label="LAST VISIT"
            value={patient.lastVisit}
          />
        </section>

        {/* Content */}
        <section className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Contact */}
          <div className="border-t border-primary/10 pt-6">
            <p className="mb-6 text-xs font-extrabold tracking-[0.2em] text-accent">
              CONTACT INFORMATION
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <ContactField label="Full name" value={patient.name} />

              <ContactField
                label="Date of birth"
                value={patient.dateOfBirth}
              />

              <ContactField
                label="Phone"
                value={patient.phone}
                icon={<Phone className="size-4" />}
              />

              <ContactField
                label="Email"
                value={patient.email}
                icon={<Mail className="size-4" />}
              />

              <ContactField
                label="Address"
                value={patient.address}
                icon={<MapPin className="size-4" />}
              />
            </div>

            <Separator className="my-8 bg-primary/10" />

            <div>
              <p className="mb-3 text-xs font-bold text-primary/45">
                MEDICAL NOTES
              </p>

              <p className="font-serif text-base leading-7 text-primary/70">
                {patient.notes}
              </p>
            </div>
          </div>

          {/* Appointments */}
          <div className="border-t border-primary/10 pt-6">
            <p className="mb-6 text-xs font-extrabold tracking-[0.2em] text-accent">
              RECENT APPOINTMENTS
            </p>

            <div className="grid gap-3">
              {patient.appointments.map((appointment) => (
                <AppointmentItem key={appointment.id} appointment={appointment} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPatient;
