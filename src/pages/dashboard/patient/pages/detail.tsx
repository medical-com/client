import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { DetailDataTable } from "@/components/detail-data-table";
import { Button } from "@/components/ui/button";
import { PatientEditForm } from "../components/patient-edit-form";
import {
  useFindOnePatientQuery,
  useUpdatePatientMutation,
  type ClientPatient,
} from "../hooks";

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
  const { data, isLoading, error } = useFindOnePatientQuery(id);
  const updatePatientMutation = useUpdatePatientMutation();
  const [editedPatient, setEditedPatient] = useState<ClientPatient>();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const patient = editedPatient ?? data;

  if (isLoading) {
    return (
      <PageMessage
        message="Loading patient..."
        onBack={() => navigate("/dashboard/patients")}
      />
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
              <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                {fullName}
              </h1>

              <p className="mt-3 font-serif text-lg text-primary/60">
                {getAge(patient.dateOfBirth)} years old · {dateOfBirth}
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditOpen(true)}
              className="rounded-[5px] border-primary/10"
            >
              <Pencil />
              Edit patient
            </Button>
          </div>
        </section>

        <DetailDataTable
          ariaLabel="Patient personal information"
          sections={[
            {
              label: "Personal information",
              rows: [
                { label: "Full name", value: fullName },
                { label: "Date of birth", value: dateOfBirth },
                { label: "Age", value: `${getAge(patient.dateOfBirth)} years` },
                { label: "PESEL", value: patient.pesel },
              ],
            },
            {
              label: "Contact",
              rows: [
                { label: "Phone", value: patient.phone },
                { label: "Email", value: patient.email },
              ],
            },
          ]}
        />

        <PatientEditForm
          patient={patient}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          isSaving={updatePatientMutation.isPending}
          error={
            updatePatientMutation.error instanceof Error
              ? updatePatientMutation.error.message
              : undefined
          }
          onSave={async (formValues) => {
            try {
              const updatedPatient = await updatePatientMutation.mutateAsync({
                id: patient.id,
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                phoneNumber: formValues.phone,
                dateOfBirth: formValues.dateOfBirth,
                pesel: formValues.pesel,
              });
              setEditedPatient(updatedPatient);
              return true;
            } catch {
              return false;
            }
          }}
        />
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
