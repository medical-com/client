import { request } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import type { ServiceListResponse } from "./types";

export function useListServiceQuery(search: string, page = 1, limit = 10) {
  return useQuery({
    queryKey: ["dashboard", "service", "list", search, page, limit],
    queryFn: () => {
      const params = new URLSearchParams();
      if (search.trim()) {
        params.append("name", search.trim());
      }
      params.append("page", String(page));
      params.append("limit", String(limit));

      return request<ServiceListResponse>(
        `/dashboard/service/list?${params.toString()}`,
      );
    },
    staleTime: 60_000,
    retry: false,
  });
}
