import { Mail, Pencil, Phone, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ClientDoctor } from "../../hooks";

export const PersonalInfo = ({
  doctor,
  onEdit,
}: {
  doctor: ClientDoctor;
  onEdit: () => void;
}) => {
  const fullName = `Dr. ${doctor.firstName} ${doctor.lastName}`.trim();
  const dateOfBirth = new Date(doctor.dateOfBirth).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-extrabold tracking-[0.2em] text-accent">
            PERSONAL INFORMATION
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold">
            Doctor details
          </h2>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={onEdit}
          className="rounded-[5px] border-primary/10"
        >
          <Pencil />
          Edit doctor
        </Button>
      </div>
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
            <InfoField label="Date of birth" value={dateOfBirth} />
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
    </>
  );
};

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
