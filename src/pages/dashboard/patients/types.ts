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
