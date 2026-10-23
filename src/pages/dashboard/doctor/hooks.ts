import { useQuery } from "@tanstack/react-query";

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
