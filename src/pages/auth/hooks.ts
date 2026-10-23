import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  ConfirmEmailPayload,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "./types";
import { ApiError, request } from "@/lib/api";
import type { Account } from "@/types/account.type";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const { data } = await request<{ data: Account | null }>("/auth/me");
        return data;
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
      request<{ clientAccount: Account }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),

    onSuccess: ({ clientAccount }) => {
      queryClient.setQueryData(["me"], clientAccount);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterPayload) =>
      request<{ success: boolean }>("/auth/register", {
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

  const confirmEmailMutation = useMutation({
    mutationFn: (data: ConfirmEmailPayload) =>
      request<{ success: boolean }>("/auth/confirm-email", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordPayload) =>
      request<{ success: boolean }>("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordPayload) =>
      request<{ success: boolean }>("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    confirmEmail: confirmEmailMutation.mutateAsync,
    forgotPassword: forgotPasswordMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,

    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isConfirmingEmail: confirmEmailMutation.isPending,
    isSendingResetLink: forgotPasswordMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,

    loginError: loginMutation.error as ApiError | null,
    registerError: registerMutation.error as ApiError | null,
    confirmEmailError: confirmEmailMutation.error as ApiError | null,
    forgotPasswordError: forgotPasswordMutation.error as ApiError | null,
    resetPasswordError: resetPasswordMutation.error as ApiError | null,
  };
}
