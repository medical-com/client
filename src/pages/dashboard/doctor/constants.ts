export type DoctorAppointment = {
  id: string;
  date: string;
  time: string;
  patient: {
    name: string;
    dateOfBirth: string;
    phone: string;
    email: string;
  };
  type: string;
  duration: number;
  status: "confirmed" | "completed";
  description: string;
};

export const doctorAppointments: DoctorAppointment[] = [
  {
    id: "doctor-appointment-1",
    date: "2026-08-24",
    time: "09:00",
    patient: {
      name: "James Miller",
      dateOfBirth: "1986-05-12",
      phone: "+1 (555) 210-3010",
      email: "james.miller@example.com",
    },
    type: "General consultation",
    duration: 60,
    status: "confirmed",
    description: "",
  },
  {
    id: "doctor-appointment-2",
    date: "2026-08-25",
    time: "10:00",
    patient: {
      name: "Anna Taylor",
      dateOfBirth: "1991-09-24",
      phone: "+1 (555) 210-3011",
      email: "anna.taylor@example.com",
    },
    type: "Initial consultation",
    duration: 60,
    status: "confirmed",
    description: "",
  },
  {
    id: "doctor-appointment-3",
    date: "2026-08-27",
    time: "09:00",
    patient: {
      name: "Emma Wilson",
      dateOfBirth: "1994-03-14",
      phone: "+1 (555) 123-4567",
      email: "emma.wilson@example.com",
    },
    type: "General consultation",
    duration: 60,
    status: "confirmed",
    description: "",
  },
  {
    id: "doctor-appointment-4",
    date: "2026-08-27",
    time: "10:30",
    patient: {
      name: "James Miller",
      dateOfBirth: "1986-05-12",
      phone: "+1 (555) 210-3010",
      email: "james.miller@example.com",
    },
    type: "Follow-up",
    duration: 60,
    status: "confirmed",
    description: "",
  },
  {
    id: "doctor-appointment-5",
    date: "2026-08-27",
    time: "12:00",
    patient: {
      name: "Olivia Brown",
      dateOfBirth: "1989-11-08",
      phone: "+1 (555) 210-3012",
      email: "olivia.brown@example.com",
    },
    type: "Initial consultation",
    duration: 60,
    status: "completed",
    description: "Patient is continuing the recommended treatment plan.",
  },
  {
    id: "doctor-appointment-6",
    date: "2026-08-28",
    time: "09:00",
    patient: {
      name: "Noah Davis",
      dateOfBirth: "1978-01-19",
      phone: "+1 (555) 210-3013",
      email: "noah.davis@example.com",
    },
    type: "Follow-up",
    duration: 60,
    status: "confirmed",
    description: "",
  },
];

export const doctorCalendarHours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];
