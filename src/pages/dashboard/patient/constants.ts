import type { Patient } from "./types";

// Temporary data.
// Later this will come from your API using the patient `id`.
export const getMockPatient = (id?: string): Patient => ({
  id,
  name: "Emma Wilson",
  dateOfBirth: "March 14, 1994",
  age: 32,
  phone: "+1 (555) 123-4567",
  email: "emma.wilson@example.com",
  address: "482 Maple Street, Springfield",
  status: "Active",
  lastVisit: "August 27, 2026",
  notes: "No known allergies. Patient is generally in good health.",
  appointments: [
    {
      id: 1,
      date: "August 27, 2026",
      type: "General consultation",
      doctor: "Dr. Michael Carter",
      status: "Confirmed",
    },
    {
      id: 2,
      date: "May 3, 2026",
      type: "Follow-up",
      doctor: "Dr. Michael Carter",
      status: "Completed",
    },
    {
      id: 3,
      date: "January 18, 2026",
      type: "Vaccination",
      doctor: "Dr. Emily Smith",
      status: "Completed",
    },
  ],
});
