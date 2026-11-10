import type { AppointmentDetail, Day } from "./types";

export const days: Day[] = [
  {
    name: "MON",
    date: 24,
    appointments: [
      {
        id: 1,
        time: "09:00",
        patient: "James Miller",
        doctor: "Dr. Michael Carter",
        type: "General consultation",
        duration: 60,
      },
      {
        id: 2,
        time: "11:30",
        patient: "Emma Wilson",
        doctor: "Dr. Michael Carter",
        type: "Follow-up",
        duration: 60,
      },
    ],
  },
  {
    name: "TUE",
    date: 25,
    appointments: [
      {
        id: 3,
        time: "10:00",
        patient: "Anna Taylor",
        doctor: "Dr. Michael Carter",
        type: "Initial consultation",
        duration: 60,
      },
      {
        id: 4,
        time: "14:00",
        patient: "Noah Davis",
        doctor: "Dr. Michael Carter",
        type: "General consultation",
        duration: 60,
      },
    ],
  },
  {
    name: "WED",
    date: 26,
    appointments: [
      {
        id: 5,
        time: "09:30",
        patient: "Olivia Brown",
        doctor: "Dr. Michael Carter",
        type: "Follow-up",
        duration: 60,
      },
      {
        id: 6,
        time: "13:00",
        patient: "Liam Wilson",
        doctor: "Dr. Michael Carter",
        type: "General consultation",
        duration: 60,
      },
    ],
  },
  {
    name: "THU",
    date: 27,
    appointments: [
      {
        id: 7,
        time: "09:00",
        patient: "Emma Wilson",
        doctor: "Dr. Michael Carter",
        type: "General consultation",
        duration: 60,
      },
      {
        id: 8,
        time: "10:30",
        patient: "James Miller",
        doctor: "Dr. Michael Carter",
        type: "Follow-up",
        duration: 60,
      },
      {
        id: 9,
        time: "12:00",
        patient: "Olivia Brown",
        doctor: "Dr. Michael Carter",
        type: "Initial consultation",
        duration: 60,
      },
      {
        id: 10,
        time: "14:30",
        patient: "Noah Davis",
        doctor: "Dr. Michael Carter",
        type: "General consultation",
        duration: 60,
      },
      {
        id: 11,
        time: "16:00",
        patient: "Sophia Wilson",
        doctor: "Dr. Michael Carter",
        type: "Follow-up",
        duration: 60,
      },
    ],
  },
  {
    name: "FRI",
    date: 28,
    appointments: [
      {
        id: 12,
        time: "09:00",
        patient: "Noah Davis",
        doctor: "Dr. Michael Carter",
        type: "Follow-up",
        duration: 60,
      },
      {
        id: 13,
        time: "11:00",
        patient: "Charlotte Smith",
        doctor: "Dr. Michael Carter",
        type: "General consultation",
        duration: 60,
      },
    ],
  },
  {
    name: "SAT",
    date: 29,
    appointments: [],
  },
  {
    name: "SUN",
    date: 30,
    appointments: [],
  },
];

export const hours = [
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

export const statusOptions = [
  "Confirmed",
  "Checked in",
  "Completed",
  "Cancelled",
];

// Temporary data.
// Later this will come from your API using the appointment `id`.
export const getMockAppointment = (id?: string): AppointmentDetail => ({
  id,
  time: "09:00",
  date: "Thursday, August 27, 2026",
  duration: "60 minutes",
  patient: {
    name: "Emma Wilson",
    dateOfBirth: "March 14, 1994",
    phone: "+1 (555) 123-4567",
    email: "emma.wilson@example.com",
  },
  type: "General consultation",
  doctor: "Dr. Michael Carter",
  status: "Confirmed",
  notes: "Patient requested a general health consultation.",
});
