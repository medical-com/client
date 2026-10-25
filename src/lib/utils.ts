import { AccountRole } from "@/types/account.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hasPermission(
  role: AccountRole,
  accessRoles: AccountRole[],
): boolean {
  if (role === AccountRole.ADMIN) return true;

  return accessRoles.includes(role);
}
