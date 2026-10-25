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
