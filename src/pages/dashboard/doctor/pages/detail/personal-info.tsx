import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DetailDataTable } from "@/components/detail-data-table";
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
      <DetailDataTable
        ariaLabel="Doctor personal information"
        sections={[
          {
            label: "Professional information",
            rows: [
              { label: "Full name", value: fullName },
              { label: "Specialty", value: doctor.specialization },
              { label: "License number", value: doctor.licenseNumber },
              { label: "Date of birth", value: dateOfBirth },
              { label: "PESEL", value: doctor.pesel },
            ],
          },
          {
            label: "Contact",
            rows: [
              { label: "Email", value: doctor.email },
              { label: "Phone", value: doctor.phone },
            ],
          },
        ]}
      />
    </>
  );
};
