export type ClientDoctor = {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  licenseNumber: string;
  specialization: string;
};

export type DoctorListResponse = {
  data: ClientDoctor[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};

export type UpdateDoctorPayload = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  pesel: string;
  licenseNumber: string;
  specialization: string;
};

export type CreateDoctorPayload = Omit<UpdateDoctorPayload, "id">;

export type DoctorSchedule = {
  id: string;
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  validFrom: string;
  validTo: string | null;
};

export type DoctorScheduleListResponse = {
  data: DoctorSchedule[];
  pagination: DoctorListResponse["pagination"];
};

export type DoctorSchedulePayload = {
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  validFrom: string;
  validTo: string | null;
};

export type UpdateDoctorSchedulePayload = DoctorSchedulePayload & {
  id: string;
};

export type DoctorScheduleException = {
  id: string;
  doctorId: string;
  startAt: string;
  endAt: string;
  type: "available" | "unavailable";
  reason: string | null;
};

export type DoctorScheduleExceptionPayload = {
  doctorId: string;
  startAt: string;
  endAt: string;
  type: DoctorScheduleException["type"];
  reason: string | null;
};

export type UpdateDoctorScheduleExceptionPayload =
  DoctorScheduleExceptionPayload & { id: string };
