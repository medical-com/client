import type { Appointment } from "./types";

export const statusOptions = [
  "Confirmed",
  "Checked in",
  "Completed",
  "Cancelled",
];

// Temporary data.
// Later this will come from your API using the appointment `id`.
export const getMockAppointment = (id?: string): Appointment => ({
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
