import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { request } from "@/lib/api";

export type ProfileAppointment = {
  id: string;
  startAt: string;
  endAt: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";
  notes: string | null;
  service: { id: string; name: string; duration: number };
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
  };
};

export type ProfileAppointmentDetail = ProfileAppointment & {
  medicalRecord?: {
    id: string;
    diagnosis: string | null;
    prescription: string | null;
  };
};

type ProfileAppointmentsResponse = {
  data: ProfileAppointment[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};

export function useListProfileAppointmentsQuery(enabled: boolean, page: number) {
  return useQuery({
    queryKey: ["profile", "appointments", page],
    queryFn: () =>
      request<ProfileAppointmentsResponse>(
        `/profile/appointments?${new URLSearchParams({
          page: String(page),
          limit: "10",
        }).toString()}`,
      ),
    enabled,
    retry: false,
  });
}

export function useFindProfileAppointmentQuery(appointmentId?: string) {
  return useQuery({
    queryKey: ["profile", "appointments", "find-one", appointmentId],
    queryFn: () =>
      request<ProfileAppointmentDetail>(
        `/profile/appointments/find-one?${new URLSearchParams({
          appointmentId: appointmentId ?? "",
        }).toString()}`,
      ),
    enabled: Boolean(appointmentId),
    retry: false,
  });
}

export function useCancelProfileAppointmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId: string) =>
      request<{ success: boolean }>(
        `/profile/appointments/cancel?${new URLSearchParams({
          appointmentId,
        }).toString()}`,
        { method: "PATCH" },
      ),
    onSuccess: (_, appointmentId) => {
      queryClient.invalidateQueries({ queryKey: ["profile", "appointments"] });
      queryClient.invalidateQueries({
        queryKey: ["profile", "appointments", "find-one", appointmentId],
      });
    },
  });
}
