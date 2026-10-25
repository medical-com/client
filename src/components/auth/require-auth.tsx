import { Navigate, Outlet } from "react-router-dom";

import { useMe } from "@/pages/auth/hooks";
import type { AccountRole } from "@/types/account.type";
import { hasPermission } from "@/lib/utils";

export const RequireAuth = ({ roles }: { roles?: AccountRole[] }) => {
  const { data: account, isLoading } = useMe();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-primary/50">Loading...</p>
      </div>
    );
  }

  if (!account || (roles && !hasPermission(account.role as AccountRole, roles)))
    return <Navigate to="/auth/login" replace />;

  return <Outlet />;
};
