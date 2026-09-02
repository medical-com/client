export enum AccountGroup {
  ADMIN = "admin",
  RECEPTIONIST = "receptionist",
  DOCTOR = "doctor",
  PATIENT = "patient",
}

export enum AccountPermission {
  READ_ACCOUNTS = "read_accounts",
  WRITE_ACCOUNTS = "write_accounts",

  ACCESS_DASHBOARD = "access_dashboard",
}

export type Account = {
  id: string;
  patientId: string;
  email: string;
  emailVerified: boolean;
  group: AccountGroup;
  permissions?: AccountPermission[];
  createdAt: string;
};
