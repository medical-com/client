import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/lib/api";

export type ServiceCategory =
  | "general"
  | "specialist"
  | "surgery"
  | "dental"
  | "vision"
  | "mental_health"
  | "physical_therapy";

export type ClientService = {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  duration: number;
  doctorIds: string[];
  createdAt: string;
  updatedAt: string;
};

export type ServicePayload = Omit<
  ClientService,
  "id" | "createdAt" | "updatedAt"
>;
export type UpdateServicePayload = Partial<ServicePayload> & { id: string };

type ServiceListResponse = {
  data: ClientService[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};

export const serviceCategories: ServiceCategory[] = [
  "general",
  "specialist",
  "surgery",
  "dental",
  "vision",
  "mental_health",
  "physical_therapy",
];

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

export function useFindOneServiceQuery(id?: string) {
  return useQuery({
    queryKey: ["dashboard", "service", "find-one", id],
    queryFn: () =>
      request<ClientService>(
        `/dashboard/service/find-one?id=${encodeURIComponent(id!)}`,
      ),
    enabled: Boolean(id && id !== "new"),
    retry: false,
  });
}

export function useCreateServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ServicePayload) =>
      request<ClientService>("/dashboard/service/create", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "service", "list"],
      }),
  });
}

export function useUpdateServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateServicePayload) =>
      request<ClientService>("/dashboard/service/update", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (service) => {
      queryClient.setQueryData(
        ["dashboard", "service", "find-one", service.id],
        service,
      );
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "service", "list"],
      });
    },
  });
}

export function useDeleteServiceMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      request<{ success: boolean }>("/dashboard/service/delete", {
        method: "POST",
        body: JSON.stringify({ id }),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["dashboard", "service"] }),
  });
}
