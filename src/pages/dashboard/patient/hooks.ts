import { useQuery } from "@tanstack/react-query";

import { ApiError, request } from "@/lib/api";
import type { WithPagination } from "@/types/pagination.type";

export type ClientPatientListItem = {
  id: string;
  firstName: string;
  lastName: string;
  pesel: string;
  email: string;
  phone: string;
  dateOfBirth: string;
};

export type ClientPatient = ClientPatientListItem;

export type PatientListQueryResponse = WithPagination<ClientPatientListItem>;

export function useFindOnePatientQuery(id?: string) {
  return useQuery({
    queryKey: ["dashboard", "patient", "find-one", id],
    queryFn: () =>
      request<ClientPatient>(
        `/dashboard/patient/find-one?id=${encodeURIComponent(id!)}`,
        { method: "GET" },
      ),
    enabled: Boolean(id),
    retry: false,
  });
}

export function useListPatientQuery(
  searchField: "name" | "email" | "phone",
  search: string,
) {
  return useQuery({
    queryKey: ["dashboard", "patient", "list", searchField, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: "1",
        limit: "10",
      });

      const normalizedSearch = search.trim();

      if (normalizedSearch.length > 0) {
        if (searchField === "name") {
          params.set("name", normalizedSearch);
        }

        if (searchField === "email") {
          params.set("email", normalizedSearch);
        }

        if (searchField === "phone") {
          params.set("phoneNumber", normalizedSearch);
        }
      }

      try {
        return await request<PatientListQueryResponse>(
          `/dashboard/patient/list?${params.toString()}`,
          {
            method: "GET",
          },
        );
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          return {
            data: [],
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 0,
            hasNextPage: false,
          };
        }

        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
