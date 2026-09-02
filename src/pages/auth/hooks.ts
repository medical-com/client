import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { LoginPayload, RegisterPayload } from "./types";
import { ApiError, request } from "@/lib/api";
import type { Account } from "@/types/account.type";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const { account } = await request<{ account: Account }>("/auth/me");
        return account;
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) return null;
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}

export function useAuth() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (data: LoginPayload) =>
      request<{ account: Account }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: ({ account }) => {
      queryClient.setQueryData(["me"], account);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterPayload) =>
      request<{ account: Account }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });

  const logoutMutation = useMutation({
    mutationFn: () => request<void>("/auth/logout", { method: "POST" }),

    onSuccess: () => {
      queryClient.setQueryData(["me"], null);
    },
  });

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,

    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,

    loginError: loginMutation.error as ApiError | null,
    registerError: registerMutation.error as ApiError | null,
  };
}
