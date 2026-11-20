import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { request } from "@/lib/api";

export type AvailableDate = {
  date: string;
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
  };
  serviceId: string;
  slots: string[];
};

type AvailableDatesResponse = {
  data: AvailableDate[];
};

export type AppointmentStatus =
  | "scheduled"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";
export type AppointmentPatientSearchField =
  | "name"
  | "pesel"
  | "email"
  | "phone";

export type AppointmentMedicalRecord = {
  id: string;
  appointment_id: string;
  diagnosis: string;
  prescription: string;
  created_at: string;
  updated_at: string;
};

type AppointmentMedicalRecordListResponse = {
  data: AppointmentMedicalRecord[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};

export type ClientAppointment = {
  id: string;
  startAt: string;
  endAt: string;
  status: AppointmentStatus;
  notes: string | null;
  service: { id: string; name: string; duration: number };
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
  };

  patient: {
    id: string;
    firstName: string;
    lastName: string;
    pesel: string;
    email: string;
    phone: string;
    dateOfBirth: string;
  };
};

type AppointmentListResponse = {
  data: ClientAppointment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
};

export function useListAppointmentsQuery(
  from: string,
  to: string,
  patientName = "",
  doctorId = "",
  serviceId = "",
  patientSearchField: AppointmentPatientSearchField = "name",
  status = "",
) {
  return useQuery({
    queryKey: [
      "dashboard",
      "appointment",
      "list",
      from,
      to,
      patientName,
      doctorId,
      serviceId,
      patientSearchField,
      status,
    ],
    queryFn: () => {
      const params = new URLSearchParams({ from, to, limit: "100" });
      if (patientName.trim()) {
        const patientSearchParam =
          patientSearchField === "name"
            ? "patientName"
            : patientSearchField === "pesel"
              ? "patientPesel"
              : patientSearchField === "email"
                ? "patientEmail"
                : "patientPhone";
        params.set(patientSearchParam, patientName.trim());
      }
      if (doctorId) params.set("doctorId", doctorId);
      if (serviceId) params.set("serviceId", serviceId);
      if (status) params.set("status", status);
      return request<AppointmentListResponse>(
        `/dashboard/appointment/list?${params.toString()}`,
      );
    },
    enabled: Boolean(from && to),
    retry: false,
  });
}

export function useFindAppointmentQuery(id?: string) {
  return useQuery({
    queryKey: ["dashboard", "appointment", "find-one", id],
    queryFn: () =>
      request<ClientAppointment>(
        `/dashboard/appointment/find-one?id=${encodeURIComponent(id ?? "")}`,
      ),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useUpdateAppointmentStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; status: AppointmentStatus }) =>
      request<{ status: AppointmentStatus }>(
        "/dashboard/appointment/update-status",
        {
          method: "PATCH",
          body: JSON.stringify(data),
        },
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "appointment", "find-one", variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "appointment", "list"],
      });
    },
  });
}

export function useFindAppointmentMedicalRecordQuery(appointmentId?: string) {
  return useQuery({
    queryKey: [
      "dashboard",
      "appointment",
      "medical-record",
      "find-one",
      appointmentId,
    ],
    queryFn: () =>
      request<AppointmentMedicalRecord>(
        `/dashboard/appointment/medical-record/find-one?appointmentId=${encodeURIComponent(appointmentId ?? "")}`,
      ),
    enabled: Boolean(appointmentId),
    retry: false,
  });
}

export function useListAppointmentMedicalRecordsQuery(page = 1, limit = 100) {
  return useQuery({
    queryKey: [
      "dashboard",
      "appointment",
      "medical-record",
      "list",
      page,
      limit,
    ],
    queryFn: () =>
      request<AppointmentMedicalRecordListResponse>(
        `/dashboard/appointment/medical-record/list?${new URLSearchParams({
          page: String(page),
          limit: String(limit),
        }).toString()}`,
      ),
    retry: false,
  });
}

export function useCreateAppointmentMedicalRecordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      appointmentId: string;
      diagnosis: string;
      prescription: string;
    }) =>
      request<AppointmentMedicalRecord>(
        "/dashboard/appointment/medical-record/create",
        {
          method: "POST",
          body: JSON.stringify(data),
        },
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "dashboard",
          "appointment",
          "medical-record",
          "find-one",
          variables.appointmentId,
        ],
      });
    },
  });
}

export function useUpdateAppointmentMedicalRecordMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      id: string;
      appointmentId: string;
      diagnosis: string;
      prescription: string;
    }) =>
      request<AppointmentMedicalRecord>(
        "/dashboard/appointment/medical-record/update",
        {
          method: "PATCH",
          body: JSON.stringify({
            id: data.id,
            diagnosis: data.diagnosis,
            prescription: data.prescription,
          }),
        },
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "dashboard",
          "appointment",
          "medical-record",
          "find-one",
          variables.appointmentId,
        ],
      });
    },
  });
}

export type CreateAppointmentPayload = {
  serviceId: string;
  doctorId: string | null;
  patientId: string | null;
  date: string;
  time: string;
  newPatient?: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    pesel: string;
  };
  notes: string;
  notification: boolean;
};

export type CreateAppointmentResponse = {
  data: {
    id: string;
    doctor_id: string;
    patient_id: string;
    service_id: string;
    start_at: string;
    end_at: string;
  };
};

export function useCreateAppointmentMutation() {
  return useMutation({
    mutationFn: (data: CreateAppointmentPayload) =>
      request<CreateAppointmentResponse>("/dashboard/appointment", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}

export function useListAvailableDatesQuery(
  doctorId: string | null,
  serviceId: string,
  from: string,
  to: string,
) {
  return useQuery({
    queryKey: [
      "dashboard",
      "appointment",
      "available-dates",
      doctorId,
      serviceId,
      from,
      to,
    ],
    queryFn: () => {
      const params = new URLSearchParams({ serviceId, from, to });
      if (doctorId) params.set("doctorId", doctorId);
      return request<AvailableDatesResponse>(
        `/dashboard/appointment/available-dates?${params.toString()}`,
      );
    },
    enabled: Boolean(serviceId && from && to),
    retry: false,
  });
}
