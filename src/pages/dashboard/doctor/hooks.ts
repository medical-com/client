import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { request } from "@/lib/api";

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

export function useFindOneDoctorQuery(id?: string) {
  return useQuery({
    queryKey: ["dashboard", "doctor", "find-one", id],
    queryFn: () =>
      request<ClientDoctor>(
        `/dashboard/doctor/find-one?id=${encodeURIComponent(id!)}`,
      ),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useListDoctorQuery(search: string) {
  return useQuery({
    queryKey: ["dashboard", "doctor", "list", search],
    queryFn: () => {
      const params = new URLSearchParams({ page: "1", limit: "10" });
      const normalizedSearch = search.trim();

      if (normalizedSearch) {
        const [firstName, ...lastNameParts] = normalizedSearch.split(/\s+/);
        params.set("firstName", firstName);

        if (lastNameParts.length > 0) {
          params.set("lastName", lastNameParts.join(" "));
        }
      }

      return request<DoctorListResponse>(
        `/dashboard/doctor/list?${params.toString()}`,
      );
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useUpdateDoctorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDoctorPayload) =>
      request<ClientDoctor>("/dashboard/doctor/update", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (doctor) => {
      queryClient.setQueryData(
        ["dashboard", "doctor", "find-one", doctor.id],
        doctor,
      );
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "doctor", "list"],
      });
    },
  });
}

export function useCreateDoctorMutation() {
  return useMutation({
    mutationFn: (data: CreateDoctorPayload) =>
      request<{ success: boolean }>("/dashboard/doctor/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}

export function useListDoctorScheduleQuery(doctorId?: string) {
  return useQuery({
    queryKey: ["dashboard", "doctor", "schedule", "list", doctorId],
    queryFn: () =>
      request<DoctorScheduleListResponse>(
        `/dashboard/doctor/schedule/list?doctorId=${encodeURIComponent(doctorId!)}`,
      ),
    enabled: Boolean(doctorId),
    retry: false,
  });
}

export function useCreateDoctorScheduleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DoctorSchedulePayload) =>
      request<DoctorSchedule>("/dashboard/doctor/schedule/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "doctor", "schedule", "list", variables.doctorId],
      });
    },
  });
}

export function useUpdateDoctorScheduleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDoctorSchedulePayload) =>
      request<DoctorSchedule>("/dashboard/doctor/schedule/update", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "doctor", "schedule", "list", variables.doctorId],
      });
    },
  });
}

export function useListDoctorScheduleExceptionsQuery(doctorId?: string) {
  return useQuery({
    queryKey: ["dashboard", "doctor", "schedule-exception", "list", doctorId],
    queryFn: () =>
      request<{ data: DoctorScheduleException[] }>(
        `/dashboard/doctor/schedule-exception/list?doctorId=${encodeURIComponent(doctorId!)}&limit=100`,
      ),
    enabled: Boolean(doctorId),
    retry: false,
  });
}

export function useCreateDoctorScheduleExceptionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DoctorScheduleExceptionPayload) =>
      request<DoctorScheduleException>(
        "/dashboard/doctor/schedule-exception/create",
        { method: "POST", body: JSON.stringify(data) },
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "dashboard",
          "doctor",
          "schedule-exception",
          "list",
          variables.doctorId,
        ],
      });
    },
  });
}

export function useUpdateDoctorScheduleExceptionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateDoctorScheduleExceptionPayload) =>
      request<DoctorScheduleException>(
        "/dashboard/doctor/schedule-exception/update",
        { method: "POST", body: JSON.stringify(data) },
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "dashboard",
          "doctor",
          "schedule-exception",
          "list",
          variables.doctorId,
        ],
      });
    },
  });
}

export function useDeleteDoctorScheduleExceptionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; doctorId: string }) =>
      request<{ success: boolean }>(
        "/dashboard/doctor/schedule-exception/delete",
        { method: "POST", body: JSON.stringify({ id: data.id }) },
      ),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          "dashboard",
          "doctor",
          "schedule-exception",
          "list",
          variables.doctorId,
        ],
      });
    },
  });
}
