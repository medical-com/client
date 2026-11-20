import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useFindAppointmentQuery,
  useUpdateAppointmentStatusMutation,
} from "@/pages/dashboard/hooks/appointments";
import {
  MedicalRecordForm,
  type MedicalRecordFormHandle,
} from "@/pages/dashboard/doctor/appointment/components/medical-record-form";
import { DetailDataTable } from "@/components/detail-data-table";
import { Button } from "@/components/ui/button";

const DoctorAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const appointmentQuery = useFindAppointmentQuery(id);
  const updateStatusMutation = useUpdateAppointmentStatusMutation();
  const medicalRecordRef = useRef<MedicalRecordFormHandle>(null);
  const [hasVisitRecord, setHasVisitRecord] = useState(false);
  const [isRecordPending, setIsRecordPending] = useState(false);
  const appointment = appointmentQuery.data;

  if (appointmentQuery.isLoading) {
    return (
      <main className="px-8 py-10 text-sm text-primary/50">
        Loading appointment...
      </main>
    );
  }
  if (appointmentQuery.isError || !appointment) {
    return (
      <main className="px-8 py-10 text-sm text-destructive">
        Appointment could not be loaded.
      </main>
    );
  }

  const start = new Date(appointment.startAt);
  const end = new Date(appointment.endAt);
  const duration = Math.round((end.getTime() - start.getTime()) / 60000);
  const completed = appointment.status === "completed";

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="m-6 py-8">
        <button
          type="button"
          onClick={() => navigate("/dashboard/doctor/appointments")}
          className="mb-7 flex items-center gap-2 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Appointments
        </button>

        <header className="border-b border-primary/10 pb-7">
          <section className="mb-7 flex items-center justify-between border-b border-primary/10 pb-7">
            <h1 className="font-serif text-2xl font-bold tracking-[-0.04em]">
              Patient Appointment
            </h1>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                navigate(
                  `/dashboard/doctor/patients?patientName=${encodeURIComponent(
                    `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                  )}&autoSearch=true`,
                )
              }
              className="rounded-[5px] border-primary/15"
            >
              Patient records
            </Button>
          </section>
          <DetailDataTable
            compact
            ariaLabel="Patient personal information"
            sections={[
              {
                label: "Appointment information",
                rows: [
                  { label: "Status", value: appointment.status },
                  { label: "Service", value: appointment.service.name },
                  { label: "Duration", value: `${duration} min` },
                  {
                    label: "Date",
                    value: `${start.toLocaleDateString()} ${start.toLocaleTimeString(
                      [],
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )} - ${end.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}`,
                  },
                ],
              },
              {
                label: "Patient information",
                rows: [
                  {
                    label: "Name",
                    value: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
                  },
                  { label: "Phone", value: appointment.patient.phone },
                  { label: "Email", value: appointment.patient.email },
                ],
              },
            ]}
          />
        </header>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary/45">
            Visit record
          </p>
          {appointment.notes && (
            <p className="mt-6 border-l-2 border-accent/50 pl-4 text-sm leading-6 text-primary/55">
              <span className="font-bold text-primary/70">Visit note: </span>
              {appointment.notes}
            </p>
          )}
          <div className="mt-7">
            <MedicalRecordForm
              ref={medicalRecordRef}
              appointmentId={appointment.id}
              onValidityChange={setHasVisitRecord}
              onPendingChange={setIsRecordPending}
            />
          </div>
          {!completed && (
            <Button
              type="button"
              disabled={
                !hasVisitRecord ||
                isRecordPending ||
                updateStatusMutation.isPending ||
                updateStatusMutation.isSuccess
              }
              onClick={() =>
                medicalRecordRef.current?.submit(() => {
                  if (id) {
                    updateStatusMutation.mutate({
                      id,
                      status: "completed",
                    });
                  }
                })
              }
              className="mt-5 rounded-[5px] bg-primary text-background hover:bg-primary/90"
            >
              <CheckCircle2 className="mr-2 size-4" />
              {isRecordPending || updateStatusMutation.isPending
                ? "Saving and completing..."
                : "Complete appointment"}
            </Button>
          )}
          {updateStatusMutation.isSuccess && (
            <p className="mt-3 text-sm text-emerald-700">
              Appointment completed.
            </p>
          )}
          {updateStatusMutation.isError && (
            <p className="mt-3 text-sm text-destructive">
              The appointment status could not be updated.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default DoctorAppointment;
