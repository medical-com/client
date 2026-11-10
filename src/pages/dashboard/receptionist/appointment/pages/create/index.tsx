import { ArrowLeft, CalendarDays, Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  useListPatientQuery,
  type ClientPatientListItem,
} from "@/pages/dashboard/admin/patient/hooks";
import { mockDoctors, mockServices } from "./mock-data";
import { DateTimeStep } from "./components/date-time-step";
import { DoctorStep } from "./components/doctor-step";
import { PatientStep } from "./components/patient-step";
import { ReviewStep } from "./components/review-step";
import { ServiceStep } from "./components/service-step";
import type { NewPatient, PatientMode } from "./types";
import { useListServiceQuery } from "@/pages/dashboard/hooks/services/query";
import { useListAvailableDatesQuery } from "../../hooks";
import { useCreateAppointmentMutation } from "../../hooks";
import { useListDoctorQuery } from "@/pages/dashboard/hooks/doctor/query";

const emptyNewPatient: NewPatient = {
  firstName: "",
  lastName: "",
  pesel: "",
  phone: "",
  email: "",
  dateOfBirth: "",
};

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDateKey = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const dateLabel = (value: string) =>
  parseDateKey(value).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

const getNextWeekday = (value?: string) => {
  const candidate = value ? parseDateKey(value) : new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  candidate.setHours(0, 0, 0, 0);
  if (candidate < today) candidate.setTime(today.getTime());
  while (candidate.getDay() === 0) candidate.setDate(candidate.getDate() + 1);
  return candidate;
};

const ReceptionistCreateAppointment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedDoctorId = searchParams.get("doctorId") ?? undefined;
  const preselectedDate = searchParams.get("date") ?? undefined;
  const preselectedTime = searchParams.get("time") ?? undefined;
  const initialDate = formatDateKey(getNextWeekday(preselectedDate));

  const [doctorSearch, setDoctorSearch] = useState("");
  const [doctorId, setDoctorId] = useState(preselectedDoctorId ?? "");
  const [serviceId, setServiceId] = useState("");
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(preselectedTime ?? "");
  const [weekStart, setWeekStart] = useState(initialDate);
  const [patientMode, setPatientMode] = useState<PatientMode>("existing");
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] =
    useState<ClientPatientListItem | null>(null);
  const [newPatient, setNewPatient] = useState(emptyNewPatient);
  const [notes, setNotes] = useState("");
  const [notification, setNotification] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const doctorQuery = useListDoctorQuery(doctorSearch, 20, 1, serviceId);
  const serviceQuery = useListServiceQuery("", 1, 100);
  const patientSearchField = /^\d[\d\s()+-]*$/.test(patientSearch)
    ? "phone"
    : "name";
  const patientQuery = useListPatientQuery(patientSearchField, patientSearch);

  const allDoctors = useMemo(() => {
    if (!serviceId) return [];

    const listedDoctors = doctorQuery.isLoading
      ? []
      : doctorQuery.data
        ? doctorQuery.data.data
        : mockDoctors.filter((doctor) =>
            `${doctor.firstName} ${doctor.lastName} ${doctor.specialization}`
              .toLowerCase()
              .includes(doctorSearch.toLowerCase()),
          );
    return listedDoctors;
  }, [doctorQuery.data, doctorQuery.isLoading, doctorSearch, serviceId]);

  const services = serviceQuery.data?.data?.length
    ? serviceQuery.data.data
    : mockServices;
  const doctors = allDoctors;
  const doctor = doctors.find((item) => item.id === doctorId);
  const service = services.find((item) => item.id === serviceId);

  const weekDates = useMemo(() => {
    const start = parseDateKey(weekStart);
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      return date;
    });
  }, [weekStart]);

  const weekEnd = formatDateKey(
    weekDates[weekDates.length - 1] ?? parseDateKey(weekStart),
  );
  const availabilityQuery = useListAvailableDatesQuery(
    doctorId,
    serviceId,
    weekStart,
    weekEnd,
  );
  const createAppointmentMutation = useCreateAppointmentMutation();

  const slots = useMemo(() => {
    return Array.from(
      new Set(
        availabilityQuery.data?.data
          .filter((item) => item.date === selectedDate)
          .flatMap((item) => item.slots) ?? [],
      ),
    ).sort();
  }, [availabilityQuery.data, selectedDate]);
  const selectedAvailability = availabilityQuery.data?.data.find(
    (item) => item.date === selectedDate && item.slots.includes(selectedTime),
  );
  const selectedDoctor =
    doctor ??
    doctors.find((item) => item.id === selectedAvailability?.doctor.id) ??
    (selectedAvailability
      ? {
          id: selectedAvailability.doctor.id,
          firstName: selectedAvailability.doctor.firstName,
          lastName: selectedAvailability.doctor.lastName,
          specialization: "",
        }
      : undefined);

  useEffect(() => {
    if (selectedTime && !slots.includes(selectedTime)) setSelectedTime("");
  }, [selectedTime, slots]);

  const patients = (patientQuery.data?.data ?? []).filter((patient) =>
    `${patient.firstName} ${patient.lastName} ${patient.pesel} ${patient.phone}`
      .toLowerCase()
      .includes(patientSearch.toLowerCase()),
  );
  const canContinue =
    Boolean(service && selectedDate && selectedTime) &&
    (patientMode === "existing"
      ? Boolean(selectedPatient)
      : Boolean(
          newPatient.firstName &&
            newPatient.lastName &&
            newPatient.phone &&
            newPatient.email &&
            newPatient.dateOfBirth &&
            newPatient.pesel,
        ));

  const updateDoctor = (id: string) => {
    setDoctorId(id);
    setSelectedTime("");
  };
  const updateService = (id: string) => {
    setServiceId(id);
    setDoctorId("");
    setSelectedTime("");
  };
  const updateDate = (date: Date) => {
    if (date < new Date(new Date().setHours(0, 0, 0, 0)) || date.getDay() === 0)
      return;
    setSelectedDate(formatDateKey(date));
    setSelectedTime("");
  };
  const createAppointment = () => {
    if (!serviceId || !selectedTime) return;

    createAppointmentMutation.mutate(
      {
        serviceId,
        doctorId: doctorId || null,
        patientId: selectedPatient?.id ?? null,
        date: selectedDate,
        time: selectedTime,
        newPatient:
          patientMode === "new"
            ? {
                firstName: newPatient.firstName,
                lastName: newPatient.lastName,
                email: newPatient.email,
                phoneNumber: newPatient.phone,
                dateOfBirth: newPatient.dateOfBirth,
                pesel: newPatient.pesel,
              }
            : undefined,
        notes,
        notification,
      },
      {
        onSuccess: () => setSubmitted(true),
      },
    );
  };

  if (submitted) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-3xl items-center px-5 py-10 sm:px-8">
        <div className="w-full rounded-[5px] border border-primary/10 bg-background p-8 text-center shadow-[6px_6px_0_var(--color-highlight)]">
          <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Check className="size-7" />
          </span>
          <p className="mt-6 text-xs font-extrabold tracking-[0.2em] text-accent">
            APPOINTMENT CONFIRMED
          </p>
          <h1 className="mt-2 font-serif text-3xl font-bold">
            You’re all set.
          </h1>
          <p className="mx-auto mt-3 max-w-md text-primary/60">
            The appointment has been prepared for {dateLabel(selectedDate)} at{" "}
            {selectedTime} with{" "}
            {selectedDoctor
              ? `Dr. ${selectedDoctor.firstName} ${selectedDoctor.lastName}`
              : "the selected doctor"}.
          </p>
          <Button
            className="mt-7 bg-primary text-background hover:bg-primary/85"
            onClick={() => navigate("/dashboard/receptionist/appointments")}
          >
            Back to appointments
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-360 px-5 py-8 sm:px-8 lg:px-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/dashboard/receptionist/appointments")}
            className="mb-4 flex items-center gap-2 text-sm font-bold text-primary/50 hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Appointments
          </button>
          <p className="mb-3 text-xs font-extrabold tracking-[0.22em] text-accent">
            RECEPTION DESK
          </p>
          <h1 className="font-serif text-4xl font-bold tracking-[-0.04em] sm:text-5xl">
            Book an appointment
          </h1>
          <p className="mt-3 font-serif text-lg text-primary/60">
            Select a service first, then find the right time before collecting
            patient details.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-primary/50">
          <CalendarDays className="size-4" /> Single-visit booking
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)]">
        <div className="grid gap-6">
          <ServiceStep
            services={services}
            selectedServiceId={serviceId}
            onSelect={updateService}
          />
          <DoctorStep
            serviceSelected={Boolean(serviceId)}
            search={doctorSearch}
            onSearchChange={setDoctorSearch}
            doctors={doctors}
            selectedDoctorId={doctorId}
            loading={doctorQuery.isLoading}
            onSelect={updateDoctor}
          />
          <DateTimeStep
            serviceSelected={Boolean(service)}
            weekStart={weekStart}
            weekDates={weekDates}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            slots={slots}
            loading={availabilityQuery.isLoading}
            error={availabilityQuery.isError}
            onWeekChange={(offset) => {
              const date = parseDateKey(weekStart);
              date.setDate(date.getDate() + offset);
              setWeekStart(formatDateKey(date));
            }}
            onDateSelect={updateDate}
            onTimeSelect={setSelectedTime}
            parseDateKey={parseDateKey}
            formatDateKey={formatDateKey}
            dateLabel={dateLabel}
          />
          <PatientStep
            mode={patientMode}
            search={patientSearch}
            patients={patients}
            selectedPatient={selectedPatient}
            newPatient={newPatient}
            loading={patientQuery.isLoading}
            onModeChange={(mode) => {
              setPatientMode(mode);
              if (mode === "existing") setNewPatient(emptyNewPatient);
              else setSelectedPatient(null);
            }}
            onSearchChange={(value) => {
              setPatientSearch(value);
              setSelectedPatient(null);
            }}
            onSelect={setSelectedPatient}
            onNewPatientChange={(field, value) =>
              setNewPatient((current) => ({ ...current, [field]: value }))
            }
          />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ReviewStep
            doctor={selectedDoctor}
            service={service}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            patientMode={patientMode}
            selectedPatient={selectedPatient}
            newPatient={newPatient}
            notes={notes}
            notification={notification}
            canContinue={canContinue}
            isSubmitting={createAppointmentMutation.isPending}
            errorMessage={createAppointmentMutation.error?.message}
            onNotesChange={setNotes}
            onNotificationChange={setNotification}
            onConfirm={createAppointment}
            dateLabel={dateLabel}
          />
        </aside>
      </div>
    </main>
  );
};

export default ReceptionistCreateAppointment;
