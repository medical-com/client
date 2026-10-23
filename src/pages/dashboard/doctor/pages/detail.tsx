import {
  ArrowLeft,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { useFindOneDoctorQuery } from "../hooks";

const DashboardDoctor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: doctor, isLoading, error } = useFindOneDoctorQuery(id);

  if (isLoading) {
    return <PageMessage message="Loading doctor..." onBack={() => navigate("/dashboard/doctors")} />;
  }

  if (error || !doctor) {
    return (
      <PageMessage
        message="Failed to load doctor."
        onBack={() => navigate("/dashboard/doctors")}
      />
    );
  }

  const fullName = `Dr. ${doctor.firstName} ${doctor.lastName}`.trim();
  const dateOfBirth = new Date(doctor.dateOfBirth).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => navigate("/dashboard/doctors")}
          className="mb-8 flex items-center gap-2 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to doctors
        </button>

        <section className="mb-10">
          <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
            DOCTOR
          </p>

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                {fullName}
              </h1>
              <p className="mt-3 font-serif text-lg text-primary/60">
                {doctor.specialization}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10 grid gap-px overflow-hidden rounded-[5px] bg-primary/10 sm:grid-cols-3">
          <InfoBlock
            icon={<Phone className="size-5" />}
            label="PHONE"
            value={doctor.phone}
          />
          <InfoBlock
            icon={<Mail className="size-5" />}
            label="EMAIL"
            value={doctor.email}
          />
          <InfoBlock
            icon={<ShieldCheck className="size-5" />}
            label="LICENSE NUMBER"
            value={doctor.licenseNumber}
          />
        </section>

        <section className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="border-t border-primary/10 pt-6">
            <p className="mb-6 text-xs font-extrabold tracking-[0.2em] text-accent">
              PROFESSIONAL INFORMATION
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <InfoField label="Full name" value={fullName} />
              <InfoField label="Specialty" value={doctor.specialization} />
              <InfoField
                label="License number"
                value={doctor.licenseNumber}
                icon={<ShieldCheck className="size-4" />}
              />
              <InfoField
                label="Date of birth"
                value={dateOfBirth}
              />
              <InfoField label="PESEL" value={doctor.pesel} />
            </div>
          </div>

          <div className="border-t border-primary/10 pt-6">
            <p className="mb-6 text-xs font-extrabold tracking-[0.2em] text-accent">
              CONTACT
            </p>
            <div className="grid gap-6">
              <InfoField
                label="Email"
                value={doctor.email}
                icon={<Mail className="size-4" />}
              />
              <InfoField
                label="Phone"
                value={doctor.phone}
                icon={<Phone className="size-4" />}
              />
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
      Back to doctors
    </button>
    <p className="mt-10 text-center text-sm text-primary/50">{message}</p>
  </div>
);

const InfoBlock = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="bg-background p-5">
    <div className="mb-4 text-accent">{icon}</div>
    <p className="text-[10px] font-extrabold tracking-[0.18em] text-primary/40">
      {label}
    </p>
    <p className="mt-2 text-sm font-semibold text-primary/75">{value}</p>
  </div>
);

const InfoField = ({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div>
    <p className="mb-2 text-xs font-bold text-primary/45">{label}</p>
    <p className="flex items-center gap-2 font-serif text-base text-primary/80">
      {icon && <span className="text-accent">{icon}</span>}
      {value}
    </p>
  </div>
);

export default DashboardDoctor;
