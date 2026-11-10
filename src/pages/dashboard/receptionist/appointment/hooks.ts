import { useMutation, useQuery } from "@tanstack/react-query";

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

export type ClientAppointment = {
  id: string;
  startAt: string;
  endAt: string;
  status: string;
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
    ],
    queryFn: () => {
      const params = new URLSearchParams({ from, to, limit: "100" });
      if (patientName.trim()) params.set("patientName", patientName.trim());
      if (doctorId) params.set("doctorId", doctorId);
      if (serviceId) params.set("serviceId", serviceId);
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
