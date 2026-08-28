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
