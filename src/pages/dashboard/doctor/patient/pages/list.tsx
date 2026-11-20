import { ChevronRight, ClipboardList } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AppointmentPatientSearch } from "@/pages/dashboard/receptionist/appointment/components/appointment-patient-search";
import {
  useListAppointmentMedicalRecordsQuery,
  useListAppointmentsQuery,
  type AppointmentPatientSearchField,
} from "@/pages/dashboard/hooks/appointments";

const DoctorPatientRecords = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialPatientName = searchParams.get("patientName")?.trim() ?? "";
  const autoSearch = searchParams.get("autoSearch") === "true";
  const [search, setSearch] = useState(initialPatientName);
  const [searchField, setSearchField] =
    useState<AppointmentPatientSearchField>("name");
  const [submittedSearch, setSubmittedSearch] = useState(
    autoSearch ? initialPatientName : "",
  );
  const [submittedSearchField, setSubmittedSearchField] =
    useState<AppointmentPatientSearchField>("name");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [submittedDateFrom, setSubmittedDateFrom] = useState("");
  const [submittedDateTo, setSubmittedDateTo] = useState("");
  const [hasSearched, setHasSearched] = useState(
    autoSearch && Boolean(initialPatientName),
  );

  const nextDate = useMemo(() => {
    if (!submittedDateTo) return "2100-01-01";
    const date = new Date(`${submittedDateTo}T00:00:00`);
    date.setDate(date.getDate() + 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, [submittedDateTo]);

  const appointmentsQuery = useListAppointmentsQuery(
    hasSearched ? submittedDateFrom || "2000-01-01" : "",
    hasSearched ? nextDate : "",
    submittedSearch,
    "",
    "",
    submittedSearchField,
  );
  const recordsQuery = useListAppointmentMedicalRecordsQuery();

  const appointments = useMemo(
    () => appointmentsQuery.data?.data ?? [],
    [appointmentsQuery.data?.data],
  );
  const records = useMemo(
    () => recordsQuery.data?.data ?? [],
    [recordsQuery.data?.data],
  );

  const patients = useMemo(() => {
    const grouped = new Map<
      string,
      {
        id: string;
        firstName: string;
        lastName: string;
        pesel: string;
        phone: string;
        email: string;
        appointments: typeof appointments;
      }
    >();

    for (const appointment of appointments) {
      const existing = grouped.get(appointment.patient.id);
      if (existing) {
        existing.appointments.push(appointment);
      } else {
        grouped.set(appointment.patient.id, {
          id: appointment.patient.id,
          firstName: appointment.patient.firstName,
          lastName: appointment.patient.lastName,
          pesel: appointment.patient.pesel,
          phone: appointment.patient.phone,
          email: appointment.patient.email,
          appointments: [appointment],
        });
      }
    }

    return [...grouped.values()].sort((a, b) =>
      `${a.lastName} ${a.firstName}`.localeCompare(
        `${b.lastName} ${b.firstName}`,
      ),
    );
  }, [appointments]);

  const submitSearch = () => {
    setSubmittedSearch(search.trim());
    setSubmittedSearchField(searchField);
    setSubmittedDateFrom(dateFrom);
    setSubmittedDateTo(dateTo);
    setHasSearched(true);
  };

  const recordByAppointment = useMemo(
    () => new Map(records.map((record) => [record.appointment_id, record])),
    [records],
  );

  const appointmentRows = useMemo(
    () =>
      patients
        .flatMap((patient) =>
          patient.appointments.map((appointment) => ({ patient, appointment })),
        )
        .sort(
          (a, b) =>
            new Date(b.appointment.startAt).getTime() -
            new Date(a.appointment.startAt).getTime(),
        ),
    [patients],
  );

  return (
    <div className="min-h-screen bg-background text-primary">
      <main className="m-6 py-8">
        <section className="mb-7 border-b border-primary/10 pb-7">
          <h1 className="font-serif text-2xl font-bold tracking-[-0.04em]">
            Patient records
          </h1>
        </section>

        <section className="flex items-center mb-6  pb-4 gap-3">
          <AppointmentPatientSearch
            value={search}
            field={searchField}
            onChange={setSearch}
            onFieldChange={setSearchField}
            onSearch={submitSearch}
            showSearchButton={false}
            showAllButton={false}
          />
          <label className="grid gap-1.5 mb-5">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary/45">
              Date from
            </span>
            <Input
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              className="h-9 w-36 rounded-[5px] border border-primary/15"
            />
          </label>
          <label className="grid gap-1.5 mb-5">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary/45">
              Date to
            </span>
            <Input
              type="date"
              value={dateTo}
              min={dateFrom || undefined}
              onChange={(event) => setDateTo(event.target.value)}
              className="h-9 w-36 rounded-[5px] border border-primary/15"
            />
          </label>
          <Button
            type="button"
            onClick={submitSearch}
            className="h-9 rounded-[5px] bg-primary px-4 text-xs font-bold text-background hover:bg-primary/85"
          >
            Search
          </Button>
        </section>

        {appointmentsQuery.isLoading || recordsQuery.isLoading ? (
          <p className="text-sm text-primary/50">Loading patient records...</p>
        ) : appointmentsQuery.isError || recordsQuery.isError ? (
          <p className="text-sm text-destructive">
            Patient records could not be loaded.
          </p>
        ) : !hasSearched ? (
          <div className="py-12 text-center text-primary/45">
            <ClipboardList className="mx-auto size-6" />
            <p className="mt-2 text-sm">
              Enter a patient or date and click Search.
            </p>
          </div>
        ) : patients.length === 0 ? (
          <div className="py-12 text-center text-primary/50">
            <ClipboardList className="mx-auto size-6" />
            <p className="mt-2 text-sm">No patients found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-primary/15 text-[10px] font-extrabold uppercase tracking-[0.14em] text-primary/45">
                  <th className="py-3 pr-5 font-extrabold">Patient</th>
                  <th className="py-3 pr-5 font-extrabold">PESEL</th>
                  <th className="py-3 pr-5 font-extrabold">Contact</th>
                  <th className="py-3 pr-5 font-extrabold">Appointment</th>
                  <th className="py-3 pr-5 font-extrabold">Medical record</th>
                  <th className="w-24 py-3 text-right font-extrabold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointmentRows.map(({ patient, appointment }) => {
                  const appointmentDate = new Date(appointment.startAt);
                  const record = recordByAppointment.get(appointment.id);

                  return (
                    <tr
                      key={appointment.id}
                      className="border-b border-primary/10 transition-colors hover:bg-primary/[0.025]"
                    >
                      <td className="py-4 pr-5">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/dashboard/doctor/appointments/${appointment.id}`,
                            )
                          }
                          className="text-left"
                        >
                          <span className="font-serif text-base font-bold">
                            {patient.firstName} {patient.lastName}
                          </span>
                        </button>
                      </td>
                      <td className="py-4 pr-5 text-primary/65">
                        {patient.pesel}
                      </td>
                      <td className="py-4 pr-5">
                        <p className="text-primary/75">{patient.phone}</p>
                        <p className="mt-0.5 max-w-48 truncate text-xs text-primary/45">
                          {patient.email}
                        </p>
                      </td>
                      <td className="py-4 pr-5">
                        <p className="font-medium">
                          {appointmentDate.toLocaleDateString()}
                        </p>
                        <p className="mt-0.5 text-xs text-primary/45">
                          {appointmentDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                          {" · "}
                          {appointment.service.name}
                        </p>
                      </td>
                      <td className="max-w-64 py-4 pr-5">
                        {record ? (
                          <p className="truncate text-primary/65">
                            {record.diagnosis}
                          </p>
                        ) : (
                          <span className="text-primary/45">
                            Not documented
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-right">
                        {record ? (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/dashboard/doctor/appointments/${appointment.id}`,
                              )
                            }
                            className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-primary"
                          >
                            Open
                            <ChevronRight className="size-3.5" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/dashboard/doctor/appointments/${appointment.id}`,
                              )
                            }
                            className="text-xs font-bold text-accent hover:text-primary"
                          >
                            Add record
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default DoctorPatientRecords;
