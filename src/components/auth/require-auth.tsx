import { Navigate, Outlet } from "react-router-dom";

import { useMe } from "@/pages/auth/hooks";

export const RequireAuth = () => {
  const { data: account, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-primary/50">Loading...</p>
      </div>
    );
  }

  if (!account) return <Navigate to="/auth/login" replace />;

  return <Outlet />;
};
