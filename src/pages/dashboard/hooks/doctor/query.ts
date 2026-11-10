import { useQuery } from "@tanstack/react-query";
import type { DoctorListResponse } from "./types";
import { request } from "@/lib/api";

export function useListDoctorQuery(
  search: string,
  limit = 10,
  page = 1,
  serviceId?: string,
) {
  return useQuery({
    queryKey: ["dashboard", "doctor", "list", search, limit, page, serviceId],
    queryFn: () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      const normalizedSearch = search.trim();

      if (normalizedSearch) {
        const [firstName, ...lastNameParts] = normalizedSearch.split(/\s+/);
        params.set("firstName", firstName);

        if (lastNameParts.length > 0) {
          params.set("lastName", lastNameParts.join(" "));
        }
      }
      if (serviceId) params.set("serviceId", serviceId);

      return request<DoctorListResponse>(
        `/dashboard/doctor/list?${params.toString()}`,
      );
    },
    enabled: serviceId !== "",
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
