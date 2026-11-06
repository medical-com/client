export type Patient = {
  id: string;
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

export type AppointmentItemProps = {
  appointment: PatientAppointment;
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
