import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  useFindAppointmentQuery,
  useUpdateAppointmentStatusMutation,
} from "@/pages/dashboard/hooks/appointments";

const DoctorAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const appointmentQuery = useFindAppointmentQuery(id);
  const updateStatusMutation = useUpdateAppointmentStatusMutation();
  const appointment = appointmentQuery.data;

  if (appointmentQuery.isLoading) {
    return <main className="p-8">Loading appointment...</main>;
  }
  if (appointmentQuery.isError || !appointment) {
    return (
      <main className="p-8">
        <p className="text-destructive">Appointment could not be loaded.</p>
      </main>
    );
  }

  const start = new Date(appointment.startAt);
  const end = new Date(appointment.endAt);
  const duration = Math.round((end.getTime() - start.getTime()) / 60000);
  const completed = appointment.status === "completed";

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={() => navigate("/dashboard/doctor/appointments")}
          className="mb-8 flex items-center gap-2 text-xs font-bold text-primary/50 transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" />
          Back to my appointments
        </button>

        <section className="mb-10">
          <p className="mb-4 text-xs font-extrabold tracking-[0.22em] text-accent">
            APPOINTMENT
          </p>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
                {appointment.patient.firstName} {appointment.patient.lastName}
              </h1>
              <p className="mt-3 font-serif text-lg text-primary/60">
                {appointment.service.name}
              </p>
            </div>
            <span
              className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${
                completed
                  ? "bg-blue-100 text-blue-700"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              {completed ? "Completed" : appointment.status}
            </span>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-8">
            <section className="overflow-hidden rounded-[5px] border border-primary/10">
              <div className="border-b border-primary/10 px-5 py-4">
                <p className="text-xs font-extrabold tracking-[0.2em] text-accent">
                  APPOINTMENT INFORMATION
                </p>
              </div>
              <dl className="divide-y divide-primary/10 text-sm">
                <div className="grid gap-1 px-5 py-4 sm:grid-cols-3">
                  <dt className="font-bold text-primary/45">Date</dt>
                  <dd className="font-serif font-bold sm:col-span-2">
                    {start.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </dd>
                </div>
                <div className="grid gap-1 px-5 py-4 sm:grid-cols-3">
                  <dt className="font-bold text-primary/45">Time</dt>
                  <dd className="font-serif font-bold sm:col-span-2">
                    {start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}{" "}
                    · {duration} minutes
                  </dd>
                </div>
                <div className="grid gap-1 px-5 py-4 sm:grid-cols-3">
                  <dt className="font-bold text-primary/45">Patient</dt>
                  <dd className="font-serif font-bold sm:col-span-2">
                    {appointment.patient.firstName}{" "}
                    {appointment.patient.lastName}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="overflow-hidden rounded-[5px] border border-primary/10">
              <div className="border-b border-primary/10 px-5 py-4">
                <p className="text-xs font-extrabold tracking-[0.2em] text-accent">
                  PATIENT INFORMATION
                </p>
              </div>
              <dl className="divide-y divide-primary/10 text-sm">
                <div className="grid gap-1 px-5 py-4 sm:grid-cols-3">
                  <dt className="font-bold text-primary/45">Date of birth</dt>
                  <dd className="font-serif font-bold sm:col-span-2">
                    {new Date(
                      appointment.patient.dateOfBirth,
                    ).toLocaleDateString()}
                  </dd>
                </div>
                <div className="grid gap-1 px-5 py-4 sm:grid-cols-3">
                  <dt className="font-bold text-primary/45">Phone</dt>
                  <dd className="font-serif font-bold sm:col-span-2">
                    {appointment.patient.phone}
                  </dd>
                </div>
                <div className="grid gap-1 px-5 py-4 sm:grid-cols-3">
                  <dt className="font-bold text-primary/45">Email</dt>
                  <dd className="font-serif font-bold sm:col-span-2">
                    {appointment.patient.email}
                  </dd>
                </div>
              </dl>
            </section>
          </div>

          <section className="h-fit overflow-hidden rounded-[5px] border border-primary/10">
            <div className="border-b border-primary/10 px-5 py-4">
              <p className="text-xs font-extrabold tracking-[0.2em] text-accent">
                VISIT NOTES
              </p>
            </div>
            <div className="p-5">
              <p className="text-sm leading-6 text-primary/70">
                {appointment.notes || "No notes were added."}
              </p>
              <Button
                type="button"
                disabled={completed || updateStatusMutation.isPending}
                onClick={() =>
                  id &&
                  updateStatusMutation.mutate({
                    id,
                    status: "completed",
                  })
                }
                className="mt-5 w-full rounded-[5px] bg-primary text-background hover:bg-primary/90"
              >
                {completed ? (
                  <>
                    <CheckCircle2 className="mr-2 size-4" />
                    Appointment completed
                  </>
                ) : (
                  "Complete appointment"
                )}
              </Button>
              {updateStatusMutation.isError && (
                <p className="mt-3 text-sm text-destructive">
                  The appointment status could not be updated.
                </p>
              )}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default DoctorAppointment;
