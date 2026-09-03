import type { Patient, PatientDetail, SearchField } from "./types";

export const searchFieldOptions: { value: SearchField; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
];

export const patients: Patient[] = [
  {
    id: 1,
    name: "James Miller",
    email: "james.miller@example.com",
    phone: "+1 (555) 201-3344",
    lastVisit: "August 27, 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+1 (555) 123-4567",
    lastVisit: "August 27, 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Anna Taylor",
    email: "anna.taylor@example.com",
    phone: "+1 (555) 349-8821",
    lastVisit: "August 25, 2026",
    status: "Active",
  },
  {
    id: 4,
    name: "Noah Davis",
    email: "noah.davis@example.com",
    phone: "+1 (555) 774-2210",
    lastVisit: "August 28, 2026",
    status: "Active",
  },
  {
    id: 5,
    name: "Olivia Brown",
    email: "olivia.brown@example.com",
    phone: "+1 (555) 662-9034",
    lastVisit: "August 26, 2026",
    status: "Active",
  },
  {
    id: 6,
    name: "Liam Wilson",
    email: "liam.wilson@example.com",
    phone: "+1 (555) 410-6678",
    lastVisit: "July 12, 2026",
    status: "Inactive",
  },
  {
    id: 7,
    name: "Sophia Wilson",
    email: "sophia.wilson@example.com",
    phone: "+1 (555) 887-1123",
    lastVisit: "August 24, 2026",
    status: "Active",
  },
  {
    id: 8,
    name: "Charlotte Smith",
    email: "charlotte.smith@example.com",
    phone: "+1 (555) 556-7789",
    lastVisit: "June 30, 2026",
    status: "Inactive",
  },
];

// Temporary data.
// Later this will come from your API using the patient `id`.
export const getMockPatient = (id?: string): PatientDetail => ({
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
