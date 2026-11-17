import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/lib/api";
import type {
  ClientService,
  ServicePayload,
  UpdateServicePayload,
} from "../../hooks/services/types";
export { useListServiceQuery } from "../../hooks/services/query";
export {
  serviceCategories,
  type ClientService,
  type ServiceCategory,
} from "../../hooks/services/types";

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
