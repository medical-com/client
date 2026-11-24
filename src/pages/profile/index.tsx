import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DetailDataTable } from "@/components/detail-data-table";
import { Button } from "@/components/ui/button";
import {
  useCancelProfileAppointmentMutation,
  useFindProfileAppointmentQuery,
  useListProfileAppointmentsQuery,
} from "@/pages/profile/hooks";
import { useAuth, useMe } from "@/pages/auth/hooks";
import { AccountRole } from "@/types/account.type";
import { hasPermission } from "@/lib/utils";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const Profile = () => {
  const navigate = useNavigate();
  const { data: account } = useMe();
  const { logout, isLoggingOut } = useAuth();
  const [appointmentPage, setAppointmentPage] = useState(1);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string>();
  const [activeSection, setActiveSection] = useState<
    "profile" | "appointments"
  >("profile");
  const isPatient = account?.role === AccountRole.PATIENT;
  const appointmentsQuery = useListProfileAppointmentsQuery(
    Boolean(isPatient),
    appointmentPage,
  );
  const appointmentQuery = useFindProfileAppointmentQuery(
    selectedAppointmentId,
  );
  const cancelAppointmentMutation = useCancelProfileAppointmentMutation();

  if (!account) return null;

  const initials =
    `${account.firstName.charAt(0)}${account.lastName.charAt(0)}`.toUpperCase();
  const roleLabel =
    account.role.charAt(0).toUpperCase() + account.role.slice(1);

  const handleSignOut = async () => {
    await logout();
    navigate("/auth/login");
  };

  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm("Cancel this appointment?")) {
      cancelAppointmentMutation.mutate(appointmentId);
    }
  };

  const fields = [
    { label: "FIRST NAME", value: account.firstName },
    { label: "LAST NAME", value: account.lastName },
    { label: "EMAIL", value: account.email },
    { label: "PHONE", value: account.phone },
    { label: "DATE OF BIRTH", value: formatDate(account.dateOfBirth) },
    { label: "PESEL", value: account.pesel },
    { label: "ROLE", value: roleLabel },
    {
      label: "EMAIL VERIFICATION",
      value: account.emailVerified ? "Verified" : "Not verified",
      accent: account.emailVerified,
    },
    { label: "MEMBER SINCE", value: formatDate(account.createdAt) },
    { label: "ACCOUNT ID", value: account.id, mono: true },
  ];

  return (
    <div className="bg-background text-primary">
      <main>
        {/* Hero */}
        <section className="mx-auto max-w-360 px-5 pt-14 pb-10 sm:px-[6vw] lg:pt-16">
          <p className="mb-3 text-xs font-extrabold tracking-[0.22em] text-accent">
            ACCOUNT
          </p>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h1 className="font-serif text-2xl font-bold tracking-[-0.02em] sm:text-3xl">
              Your account
            </h1>

            <div className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center bg-primary font-serif text-sm font-bold text-background">
                {initials}
              </div>

              <div>
                <p className="font-serif text-sm font-bold sm:text-base">
                  {account.firstName} {account.lastName}
                </p>

                <p className="mt-0.5 text-xs text-primary/50">{roleLabel}</p>
              </div>
            </div>
          </div>
        </section>

        {isPatient && (
          <nav
            aria-label="Profile sections"
            className="mx-auto max-w-360 px-5 sm:px-[6vw]"
          >
            <div className="flex border-b border-primary/10">
              <button
                type="button"
                aria-current={activeSection === "profile" ? "page" : undefined}
                onClick={() => setActiveSection("profile")}
                className={`border-b-2 px-4 py-3 text-xs font-bold transition-colors ${
                  activeSection === "profile"
                    ? "border-accent text-primary"
                    : "border-transparent text-primary/50 hover:text-primary"
                }`}
              >
                Profile info
              </button>
              <button
                type="button"
                aria-current={
                  activeSection === "appointments" ? "page" : undefined
                }
                onClick={() => setActiveSection("appointments")}
                className={`border-b-2 px-4 py-3 text-xs font-bold transition-colors ${
                  activeSection === "appointments"
                    ? "border-accent text-primary"
                    : "border-transparent text-primary/50 hover:text-primary"
                }`}
              >
                Appointments
              </button>
            </div>
          </nav>
        )}

        {(!isPatient || activeSection === "profile") && (
          <section className="border-y border-primary/10">
            <div
              className="
                mx-auto grid max-w-360 gap-x-8 gap-y-6
                px-5 py-10 sm:px-[6vw]
                sm:grid-cols-2 lg:grid-cols-3
              "
            >
              {fields.map((field) => (
                <div key={field.label}>
                  <p className="text-[10px] font-extrabold tracking-[0.18em] text-primary/40">
                    {field.label}
                  </p>

                  <p
                    className={`
                      mt-1.5 wrap-break-word text-sm font-semibold
                      ${field.mono ? "font-mono text-xs" : ""}
                      ${field.accent === false ? "text-primary/40" : ""}
                      ${field.accent === true ? "text-accent" : ""}
                    `}
                  >
                    {field.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {isPatient && activeSection === "appointments" && (
          <section className="mx-auto max-w-360 px-5 py-10 sm:px-[6vw]">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-extrabold tracking-[0.22em] text-accent">
                  YOUR VISITS
                </p>
                <h2 className="font-serif text-xl font-bold tracking-[-0.02em]">
                  {selectedAppointmentId
                    ? "Appointment details"
                    : "Appointments"}
                </h2>
              </div>
              {!selectedAppointmentId && (
                <p className="text-xs text-primary/50">
                  Scheduled appointments can be cancelled here.
                </p>
              )}
            </div>

            {cancelAppointmentMutation.isError && (
              <p className="mb-4 text-sm text-destructive" role="alert">
                {cancelAppointmentMutation.error.message ||
                  "The appointment could not be cancelled."}
              </p>
            )}

            {selectedAppointmentId ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedAppointmentId(undefined)}
                  className="mb-5"
                >
                  <ArrowLeft />
                  Back to appointments
                </Button>

                {appointmentQuery.isLoading ? (
                  <p className="py-5 text-sm text-primary/50">
                    Loading appointment details...
                  </p>
                ) : appointmentQuery.isError || !appointmentQuery.data ? (
                  <p className="py-5 text-sm text-destructive" role="alert">
                    Appointment details could not be loaded.
                  </p>
                ) : (
                  <>
                    <DetailDataTable
                      ariaLabel="Appointment details"
                      sections={[
                        {
                          label: "Appointment",
                          rows: [
                            {
                              label: "Date",
                              value: formatDate(appointmentQuery.data.startAt),
                            },
                            {
                              label: "Time",
                              value: new Date(
                                appointmentQuery.data.startAt,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              }),
                            },
                            {
                              label: "Service",
                              value: appointmentQuery.data.service.name,
                            },
                            {
                              label: "Doctor",
                              value: `Dr. ${appointmentQuery.data.doctor.firstName} ${appointmentQuery.data.doctor.lastName}`,
                            },
                            {
                              label: "Status",
                              value: appointmentQuery.data.status.replace(
                                "_",
                                " ",
                              ),
                            },
                            {
                              label: "Notes",
                              value:
                                appointmentQuery.data.notes ||
                                "No additional notes",
                            },
                          ],
                        },
                        {
                          label: "Medical record",
                          rows: appointmentQuery.data.medicalRecord
                            ? [
                                {
                                  label: "Diagnosis",
                                  value:
                                    appointmentQuery.data.medicalRecord
                                      .diagnosis || "Not provided",
                                },
                                {
                                  label: "Prescription",
                                  value:
                                    appointmentQuery.data.medicalRecord
                                      .prescription || "Not provided",
                                },
                              ]
                            : [
                                {
                                  label: "Record",
                                  value:
                                    "No medical record has been added.",
                                },
                              ],
                        },
                      ]}
                    />
                    {appointmentQuery.data.status === "scheduled" && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="lg"
                        disabled={cancelAppointmentMutation.isPending}
                        onClick={() =>
                          handleCancelAppointment(appointmentQuery.data.id)
                        }
                        className="mt-6 bg-red-600 font-bold text-white hover:bg-red-700"
                      >
                        {cancelAppointmentMutation.isPending
                          ? "Cancelling..."
                          : "Cancel appointment"}
                      </Button>
                    )}
                  </>
                )}
              </>
            ) : appointmentsQuery.isLoading ? (
              <p className="py-8 text-sm text-primary/50">
                Loading appointments...
              </p>
            ) : appointmentsQuery.isError ? (
              <p className="py-8 text-sm text-destructive" role="alert">
                Appointments could not be loaded.
              </p>
            ) : appointmentsQuery.data?.data.length ? (
              <>
                <div className="overflow-x-auto rounded-[5px] border border-primary/10">
                  <table className="w-full min-w-[640px] border-collapse text-left">
                    <thead className="bg-primary/3">
                      <tr className="border-b border-primary/10 text-[10px] font-extrabold tracking-[0.15em] text-primary/45">
                        <th className="px-4 py-3" scope="col">
                          DATE & TIME
                        </th>
                        <th className="px-4 py-3" scope="col">
                          SERVICE
                        </th>
                        <th className="px-4 py-3" scope="col">
                          DOCTOR
                        </th>
                        <th className="px-4 py-3" scope="col">
                          STATUS
                        </th>
                        <th className="px-4 py-3" scope="col">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointmentsQuery.data.data.map((appointment) => {
                        const start = new Date(appointment.startAt);

                        return (
                          <tr
                            key={appointment.id}
                            className="border-b border-primary/10 last:border-b-0"
                          >
                            <td className="px-4 py-4 text-sm">
                              <span className="block font-semibold">
                                {start.toLocaleDateString()}
                              </span>
                              <span className="mt-1 block text-xs text-primary/50">
                                {start.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm font-medium">
                              {appointment.service.name}
                            </td>
                            <td className="px-4 py-4 text-sm">
                              Dr. {appointment.doctor.firstName}{" "}
                              {appointment.doctor.lastName}
                            </td>
                            <td className="px-4 py-4">
                              <span className="inline-flex rounded-[5px] border border-primary/10 px-2 py-1 text-[10px] font-bold capitalize text-primary/60">
                                {appointment.status.replace("_", " ")}
                              </span>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setSelectedAppointmentId(appointment.id)
                                  }
                                >
                                  View
                                </Button>
                                {appointment.status === "scheduled" && (
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="lg"
                                    disabled={
                                      cancelAppointmentMutation.isPending
                                    }
                                    onClick={() =>
                                      handleCancelAppointment(appointment.id)
                                    }
                                    className="bg-red-600 font-bold text-white hover:bg-red-700"
                                  >
                                    {cancelAppointmentMutation.isPending &&
                                    cancelAppointmentMutation.variables ===
                                      appointment.id
                                      ? "Cancelling..."
                                      : "Cancel"}
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="text-xs text-primary/50">
                    Page {appointmentsQuery.data.pagination.page} of{" "}
                    {Math.max(appointmentsQuery.data.pagination.totalPages, 1)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={appointmentPage === 1}
                      onClick={() =>
                        setAppointmentPage((current) => current - 1)
                      }
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={!appointmentsQuery.data.pagination.hasNextPage}
                      onClick={() =>
                        setAppointmentPage((current) => current + 1)
                      }
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <p className="border-y border-primary/10 py-8 text-sm text-primary/50">
                You don’t have any appointments yet.
              </p>
            )}
          </section>
        )}

        {/* Dashboard button */}
        <section className="mx-auto max-w-360 md:flex">
          {hasPermission(account.role as AccountRole, [AccountRole.ADMIN]) && (
            <div className="py-10 sm:px-[6vw]">
              <button
                type="button"
                onClick={() => navigate("/dashboard/admin")}
                className="
                bg-primary px-5 py-3
                text-sm font-bold text-background
                shadow-[5px_5px_0_var(--color-highlight)]
                transition-all duration-150
                hover:translate-x-0.5 hover:translate-y-0.5
                hover:shadow-[3px_3px_0_var(--color-highlight)]
              "
              >
                Go to Admin Dashboard
              </button>
            </div>
          )}

          {hasPermission(account.role as AccountRole, [
            AccountRole.RECEPTIONIST,
          ]) && (
            <div className="py-10 sm:px-[6vw]">
              <button
                type="button"
                onClick={() => navigate("/dashboard/receptionist")}
                className="
                bg-primary px-5 py-3
                text-sm font-bold text-background
                shadow-[5px_5px_0_var(--color-highlight)]
                transition-all duration-150
                hover:translate-x-0.5 hover:translate-y-0.5
                hover:shadow-[3px_3px_0_var(--color-highlight)]
              "
              >
                Go to Receptionist Dashboard
              </button>
            </div>
          )}

          {hasPermission(account.role as AccountRole, [AccountRole.DOCTOR]) && (
            <div className="py-10 sm:px-[6vw]">
              <button
                type="button"
                onClick={() => navigate("/dashboard/doctor")}
                className="
                bg-primary px-5 py-3
                text-sm font-bold text-background
                shadow-[5px_5px_0_var(--color-highlight)]
                transition-all duration-150
                hover:translate-x-0.5 hover:translate-y-0.5
                hover:shadow-[3px_3px_0_var(--color-highlight)]
              "
              >
                Go to Doctor Dashboard
              </button>
            </div>
          )}
        </section>

        {/* Sign out */}
        <section className="mx-auto max-w-360 px-5 py-10 sm:px-[6vw]">
          <p className="mb-4 max-w-xl text-sm leading-6 text-primary/65">
            Signing out will end your current session on this device.
          </p>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="
              bg-primary px-5 py-3
              text-sm font-bold text-background
              shadow-[5px_5px_0_var(--color-highlight)]
              transition-all duration-150
              hover:translate-x-0.5 hover:translate-y-0.5
              hover:shadow-[3px_3px_0_var(--color-highlight)]
              disabled:pointer-events-none disabled:opacity-50
              focus-visible:outline-2
              focus-visible:outline-offset-4
              focus-visible:outline-accent
            "
          >
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </button>
        </section>
      </main>
    </div>
  );
};

export default Profile;
