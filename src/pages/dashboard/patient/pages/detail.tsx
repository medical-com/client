import { ArrowLeft, CalendarDays, Mail, Phone } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { ContactField } from "../components/contact-field";
import { InfoCard } from "../components/info-card";
import { useFindOnePatientQuery } from "../hooks";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const getAge = (value: string) => {
  const birthDate = new Date(value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const birthdayHasNotPassed =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
      today.getDate() < birthDate.getDate());

  if (birthdayHasNotPassed) age -= 1;

  return age;
};

const DashboardPatient = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: patient, isLoading, error } = useFindOnePatientQuery(id);

  if (isLoading) {
    return (
      <PageMessage message="Loading patient..." onBack={() => navigate("/dashboard/patients")} />
    );
  }

  if (error || !patient) {
    return (
      <PageMessage
        message="Failed to load patient."
        onBack={() => navigate("/dashboard/patients")}
      />
    );
  }

  const fullName = `${patient.firstName} ${patient.lastName}`.trim();
  const dateOfBirth = formatDate(patient.dateOfBirth);

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
              <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">{fullName}</h1>

              <p className="mt-3 font-serif text-lg text-primary/60">
                {getAge(patient.dateOfBirth)} years old · {dateOfBirth}
              </p>
            </div>
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
            label="DATE OF BIRTH"
            value={dateOfBirth}
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
              <ContactField label="Full name" value={fullName} />

              <ContactField label="Date of birth" value={dateOfBirth} />

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

              <ContactField label="PESEL" value={patient.pesel} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const PageMessage = ({
  message,
  onBack,
}: {
  message: string;
  onBack: () => void;
}) => (
  <div className="min-h-screen bg-background px-5 py-10 text-primary">
    <button
      type="button"
      onClick={onBack}
      className="flex items-center gap-2 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
    >
      <ArrowLeft className="size-4" />
      Back to patients
    </button>
    <p className="mt-10 text-center text-sm text-primary/50">{message}</p>
  </div>
);

export default DashboardPatient;
