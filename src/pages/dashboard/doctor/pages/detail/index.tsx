import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { DoctorEditForm } from "../../components/doctor-edit-form";
import { DoctorSchedulePanel } from "./doctor-schedule-panel";
import {
  useCreateDoctorScheduleMutation,
  useFindOneDoctorQuery,
  useListDoctorScheduleQuery,
  useUpdateDoctorMutation,
  useUpdateDoctorScheduleMutation,
} from "../../hooks";
import { PageMessage, SectionTab } from "./components";
import { PersonalInfo } from "./personal-info";
import type { DoctorDetailSection } from "./types";

const DashboardDoctor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeSection, setActiveSection] =
    useState<DoctorDetailSection>("personal");
  const { data: doctor, isLoading, error } = useFindOneDoctorQuery(id);
  const updateDoctorMutation = useUpdateDoctorMutation();
  const scheduleQuery = useListDoctorScheduleQuery(id);
  const createScheduleMutation = useCreateDoctorScheduleMutation();
  const updateScheduleMutation = useUpdateDoctorScheduleMutation();
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (isLoading) {
    return (
      <PageMessage
        message="Loading doctor..."
        onBack={() => navigate("/dashboard/doctors")}
      />
    );
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

        <nav
          aria-label="Doctor detail sections"
          className="mb-8 flex gap-6 border-b border-primary/10"
        >
          <SectionTab
            active={activeSection === "personal"}
            onClick={() => setActiveSection("personal")}
          >
            Personal information
          </SectionTab>
          <SectionTab
            active={activeSection === "schedule"}
            onClick={() => setActiveSection("schedule")}
          >
            Schedule
          </SectionTab>
        </nav>

        {activeSection === "personal" ? (
          <PersonalInfo doctor={doctor} onEdit={() => setIsEditOpen(true)} />
        ) : (
          <DoctorSchedulePanel
            doctorId={doctor.id}
            schedules={scheduleQuery.data?.data ?? []}
            isLoading={scheduleQuery.isLoading}
            error={
              scheduleQuery.error instanceof Error
                ? scheduleQuery.error.message
                : undefined
            }
            createSchedule={createScheduleMutation.mutateAsync}
            updateSchedule={updateScheduleMutation.mutateAsync}
            isSaving={
              createScheduleMutation.isPending ||
              updateScheduleMutation.isPending
            }
            saveError={
              (createScheduleMutation.error ??
                updateScheduleMutation.error) instanceof Error
                ? (createScheduleMutation.error ?? updateScheduleMutation.error)
                    ?.message
                : undefined
            }
          />
        )}

        <DoctorEditForm
          doctor={doctor}
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          isSaving={updateDoctorMutation.isPending}
          error={
            updateDoctorMutation.error instanceof Error
              ? updateDoctorMutation.error.message
              : undefined
          }
          onSave={async (formValues) => {
            try {
              await updateDoctorMutation.mutateAsync({
                id: doctor.id,
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                phoneNumber: formValues.phone,
                dateOfBirth: formValues.dateOfBirth,
                pesel: formValues.pesel,
                licenseNumber: formValues.licenseNumber,
                specialization: formValues.specialization,
              });
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

export default DashboardDoctor;
