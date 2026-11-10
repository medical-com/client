import type { ClientDoctor } from "@/pages/dashboard/admin/doctor/hooks";
import type { ClientPatientListItem } from "@/pages/dashboard/admin/patient/hooks";
import type { ClientService } from "@/pages/dashboard/hooks/services/types";

export type PatientMode = "existing" | "new";

export type NewPatient = {
  firstName: string;
  lastName: string;
  pesel: string;
  phone: string;
  email: string;
  dateOfBirth: string;
};

export type BookingSectionProps = {
  number: number;
  title: string;
  children: React.ReactNode;
};

export type DoctorStepProps = {
  serviceSelected: boolean;
  search: string;
  onSearchChange: (value: string) => void;
  doctors: ClientDoctor[];
  selectedDoctorId: string;
  loading: boolean;
  onSelect: (id: string) => void;
};

export type ServiceStepProps = {
  services: ClientService[];
  selectedServiceId: string;
  onSelect: (id: string) => void;
};

export type DateTimeStepProps = {
  serviceSelected: boolean;
  weekStart: string;
  weekDates: Date[];
  selectedDate: string;
  selectedTime: string;
  slots: string[];
  loading: boolean;
  error?: boolean;
  onWeekChange: (offset: number) => void;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  parseDateKey: (value: string) => Date;
  formatDateKey: (date: Date) => string;
  dateLabel: (value: string) => string;
};

export type PatientStepProps = {
  mode: PatientMode;
  search: string;
  patients: ClientPatientListItem[];
  selectedPatient: ClientPatientListItem | null;
  newPatient: NewPatient;
  loading: boolean;
  onModeChange: (mode: PatientMode) => void;
  onSearchChange: (value: string) => void;
  onSelect: (patient: ClientPatientListItem) => void;
  onNewPatientChange: (field: keyof NewPatient, value: string) => void;
};

export type ReviewStepProps = {
  doctor:
    | (Pick<ClientDoctor, "id" | "firstName" | "lastName" | "specialization">)
    | undefined;
  service: ClientService | undefined;
  selectedDate: string;
  selectedTime: string;
  patientMode: PatientMode;
  selectedPatient: ClientPatientListItem | null;
  newPatient: NewPatient;
  notes: string;
  notification: boolean;
  canContinue: boolean;
  isSubmitting: boolean;
  errorMessage?: string;
  onNotesChange: (value: string) => void;
  onNotificationChange: (value: boolean) => void;
  onConfirm: () => void;
  dateLabel: (value: string) => string;
};
