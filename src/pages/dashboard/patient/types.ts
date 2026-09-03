export type Patient = {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  status: "Active" | "Inactive";
};

export type PatientRowProps = {
  patient: Patient;
};

export type SearchField = "name" | "email" | "phone";

export type PatientAppointment = {
  id: number;
  date: string;
  type: string;
  doctor: string;
  status: string;
};

export type PatientDetail = {
  id?: string;
  name: string;
  dateOfBirth: string;
  age: number;
  phone: string;
  email: string;
  address: string;
  status: string;
  lastVisit: string;
  notes: string;
  appointments: PatientAppointment[];
};

export type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export type ContactFieldProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type AppointmentItemProps = {
  appointment: PatientAppointment;
};
