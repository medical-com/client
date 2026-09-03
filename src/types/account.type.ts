export enum AccountRole {
  ADMIN = "admin",
  RECEPTIONIST = "receptionist",
  DOCTOR = "doctor",
  PATIENT = "patient",
}

export type Account = {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  dateOfBirth: string;
  role: string;
  createdAt: string;
};
