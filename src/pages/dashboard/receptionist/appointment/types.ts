export type Appointment = {
  id: number;
  time: string;
  patient: string;
  type: string;
  duration: number;
};

export type Day = {
  name: string;
  date: number;
  appointments: Appointment[];
};

export type AppointmentCardProps = {
  appointment: Appointment;
  top: number;
};

export type Patient = {
  name: string;
  dateOfBirth: string;
  phone: string;
  email: string;
};

export type AppointmentDetail = {
  id?: string;
  time: string;
  date: string;
  duration: string;
  patient: Patient;
  type: string;
  doctor: string;
  status: string;
  notes: string;
};

export type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export type PatientFieldProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export type StatusButtonProps = {
  status: string;
  active: string;
};
