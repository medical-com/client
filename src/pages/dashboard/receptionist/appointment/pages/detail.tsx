import { ArrowLeft, Copy } from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { StatusBadge } from "../components/status-badge";
import { StatusButton } from "../components/status-button";
import { statusOptions } from "../constants";
import {
  useFindAppointmentQuery,
  useUpdateAppointmentStatusMutation,
  type AppointmentStatus,
} from "@/pages/dashboard/hooks/appointments";
import { Button } from "@/components/ui/button";

const DashboardAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const appointmentQuery = useFindAppointmentQuery(id);
  const updateStatusMutation = useUpdateAppointmentStatusMutation();
  const appointment = appointmentQuery.data;

  if (appointmentQuery.isLoading)
    return <p className="p-8">Loading appointment...</p>;
  if (appointmentQuery.isError || !appointment) {
    return (
      <p className="p-8 text-destructive">Appointment could not be loaded.</p>
    );
  }

  const start = new Date(appointment.startAt);
  const end = new Date(appointment.endAt);
  const duration = Math.round((end.getTime() - start.getTime()) / 60000);
  const date = start.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const handleStatusChange = (status: AppointmentStatus) => {
    if (status !== appointment.status && id) {
      updateStatusMutation.mutate({ id, status });
    }
  };

  const recreateAppointment = () => {
    const dateKey = [
      start.getFullYear(),
      String(start.getMonth() + 1).padStart(2, "0"),
      String(start.getDate()).padStart(2, "0"),
    ].join("-");
    const params = new URLSearchParams({
      doctorId: appointment.doctor.id,
      serviceId: appointment.service.id,
      patientId: appointment.patient.id,
      date: dateKey,
      time: start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    });
    if (appointment.notes) params.set("notes", appointment.notes);
    navigate(
      `/dashboard/receptionist/appointments/create?${params.toString()}`,
    );
  };

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="mx-auto w-full max-w-360 px-5 py-10 sm:px-8 lg:px-10">
        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/receptionist/appointments")}
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
                {appointment.patient.firstName} {appointment.patient.lastName}
              </h1>

              <p className="mt-3 font-serif text-lg text-primary/60">
                {appointment.service.name}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={appointment.status} />
              <Button
                type="button"
                variant="outline"
                onClick={recreateAppointment}
                className="rounded-[5px] border-primary/15"
              >
                <Copy className="mr-2 size-4" />
                Recreate appointment
              </Button>
            </div>
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
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-primary/10">
                    <tr>
                      <th className="w-1/3 px-5 py-4 font-bold text-primary/45">
                        Date
                      </th>
                      <td className="px-5 py-4 font-serif font-bold">{date}</td>
                    </tr>
                    <tr>
                      <th className="px-5 py-4 font-bold text-primary/45">
                        Time
                      </th>
                      <td className="px-5 py-4 font-serif font-bold">
                        {time} · {duration} minutes
                      </td>
                    </tr>
                    <tr>
                      <th className="px-5 py-4 font-bold text-primary/45">
                        Doctor
                      </th>
                      <td className="px-5 py-4 font-serif font-bold">
                        Dr. {appointment.doctor.firstName}{" "}
                        {appointment.doctor.lastName}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-5 py-4 font-bold text-primary/45">
                        Service
                      </th>
                      <td className="px-5 py-4 font-serif font-bold">
                        {appointment.service.name}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-5 py-4 align-top font-bold text-primary/45">
                        Notes
                      </th>
                      <td className="px-5 py-4 leading-6 text-primary/70">
                        {appointment.notes || "No notes were added."}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="overflow-hidden rounded-[5px] border border-primary/10">
              <div className="border-b border-primary/10 px-5 py-4">
                <p className="text-xs font-extrabold tracking-[0.2em] text-accent">
                  PATIENT INFORMATION
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <tbody className="divide-y divide-primary/10">
                    <tr>
                      <th className="w-1/3 px-5 py-4 font-bold text-primary/45">
                        Full name
                      </th>
                      <td className="px-5 py-4 font-serif font-bold">
                        {appointment.patient.firstName}{" "}
                        {appointment.patient.lastName}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-5 py-4 font-bold text-primary/45">
                        Date of birth
                      </th>
                      <td className="px-5 py-4 font-serif font-bold">
                        {new Date(
                          appointment.patient.dateOfBirth,
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-5 py-4 font-bold text-primary/45">
                        Phone
                      </th>
                      <td className="px-5 py-4 font-serif font-bold">
                        {appointment.patient.phone}
                      </td>
                    </tr>
                    <tr>
                      <th className="px-5 py-4 font-bold text-primary/45">
                        Email
                      </th>
                      <td className="px-5 py-4 font-serif font-bold">
                        {appointment.patient.email}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <section className="h-fit overflow-hidden rounded-[5px] border border-primary/10">
            <div className="border-b border-primary/10 px-5 py-4">
              <p className="text-xs font-extrabold tracking-[0.2em] text-accent">
                APPOINTMENT STATUS
              </p>
            </div>
            <div className="p-5">
              <StatusBadge status={appointment.status} />
              <p className="mt-4 text-sm leading-6 text-primary/50">
                Update the appointment status as the patient progresses through
                their visit.
              </p>
              <div className="mt-5 grid gap-2">
                {statusOptions.map((status) => (
                  <StatusButton
                    key={status.value}
                    status={status.value}
                    label={status.label}
                    active={appointment.status}
                    disabled={updateStatusMutation.isPending}
                    onClick={() => handleStatusChange(status.value)}
                  />
                ))}
              </div>
              {updateStatusMutation.isError && (
                <p className="mt-4 text-sm text-destructive">
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

export default DashboardAppointment;
