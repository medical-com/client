import type { ClientDoctor } from "@/pages/dashboard/admin/doctor/hooks";
import type { ClientService } from "@/pages/dashboard/hooks/services/types";

export const mockDoctors: ClientDoctor[] = [
  {
    id: "mock-doctor-carter",
    firstName: "Michael",
    lastName: "Carter",
    pesel: "",
    email: "michael.carter@clinic.example",
    phone: "",
    dateOfBirth: "",
    licenseNumber: "MD-1042",
    specialization: "Family medicine",
  },
  {
    id: "mock-doctor-nowak",
    firstName: "Anna",
    lastName: "Nowak",
    pesel: "",
    email: "anna.nowak@clinic.example",
    phone: "",
    dateOfBirth: "",
    licenseNumber: "MD-2188",
    specialization: "Cardiology",
  },
  {
    id: "mock-doctor-lee",
    firstName: "David",
    lastName: "Lee",
    pesel: "",
    email: "david.lee@clinic.example",
    phone: "",
    dateOfBirth: "",
    licenseNumber: "MD-3091",
    specialization: "Dermatology",
  },
];

export const mockServices: ClientService[] = [
  {
    id: "mock-service-consultation",
    name: "General consultation",
    description: "A comprehensive consultation with your doctor.",
    category: "general",
    duration: 60,
    doctorIds: mockDoctors.map((doctor) => doctor.id),
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "mock-service-follow-up",
    name: "Follow-up visit",
    description: "Review progress and adjust your care plan.",
    category: "specialist",
    duration: 30,
    doctorIds: mockDoctors.map((doctor) => doctor.id),
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "mock-service-specialist",
    name: "Specialist consultation",
    description: "A focused specialist assessment.",
    category: "specialist",
    duration: 90,
    doctorIds: [mockDoctors[1].id, mockDoctors[2].id],
    createdAt: "",
    updatedAt: "",
  },
];

export const mockOccupiedSlots = ["09:30", "11:00", "13:30", "16:00"];
