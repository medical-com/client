import {
  AccountGroup,
  type Account,
  type AccountPermission,
} from "@/types/account.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const hasPermission = (
  account: Account,
  permission: AccountPermission | AccountPermission[],
): boolean => {
  if (account.group === AccountGroup.ADMIN) return true;
  if (!account.permissions) return false;
  if (Array.isArray(permission))
    return permission.every((perm) => account.permissions?.includes(perm));

  return account.permissions?.includes(permission);
};
